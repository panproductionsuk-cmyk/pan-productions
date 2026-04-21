import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { uploadProductionFile, isSupabaseStorageUrl } from '@/lib/storageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const productionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  titleEn: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(['On Sale', 'Upcoming', 'Current', 'Past']),
  category: z.enum(['theatre', 'music', 'art', 'film']),
  descriptionEn: z.string().min(1, 'Description required'),
  descriptionTr: z.string().optional(),
  image: z.string().url().optional(),
  dates: z.string().min(1, 'Dates required'),
  eventDate: z.string().optional(),
  venue: z.string().min(1, 'Venue required'),
  duration: z.string().optional(),
  ticketPrice: z.string().optional(),
  ticketLink: z.string().url().optional(),
  showInProductions: z.boolean().default(true),
  showInMarketing: z.boolean().default(false),
});

// Helper to parse date from dates string (e.g., "15 March 2024, 19:00" -> "2024-03-15")
const parseSortDate = (dates: string): string => {
  const today = new Date().toISOString().split('T')[0];
  try {
    // Try to extract a date from the string
    const dateMatch = dates.match(/(\d{1,2})\s*(\w+)\s*(\d{4})/);
    if (dateMatch) {
      const [, day, month, year] = dateMatch;
      const monthMap: Record<string, string> = {
        'january': '01', 'february': '02', 'march': '03', 'april': '04',
        'may': '05', 'june': '06', 'july': '07', 'august': '08',
        'september': '09', 'october': '10', 'november': '11', 'december': '12',
        'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
        'jun': '06', 'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
      };
      const monthNum = monthMap[month.toLowerCase()] || '01';
      return `${year}-${monthNum}-${day.padStart(2, '0')}`;
    }
    return today;
  } catch {
    return today;
  }
};

type ProductionFormData = z.infer<typeof productionSchema>;

interface AdminProductionFormProps {
  productionId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const AdminProductionForm = ({ productionId, onSuccess, onCancel }: AdminProductionFormProps) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const { register, handleSubmit, formState: { errors }, reset, control, watch, setValue } = useForm<ProductionFormData>({
    resolver: zodResolver(productionSchema),
    defaultValues: {
      showInProductions: true,
      showInMarketing: false,
    },
  });

  const imageField = watch('image');

  useEffect(() => {
    if (productionId && supabase) {
      // Fetch production from Supabase for editing
      const fetchProduction = async () => {
        const { data: prod, error } = await supabase
          .from('productions')
          .select('*')
          .eq('id', productionId)
          .single();

        if (error) {
          console.error('Error fetching production:', error);
          toast.error('Failed to load production');
          return;
        }

        if (prod) {
          reset({
            title: prod.title,
            titleEn: prod.title_en || '',
            author: prod.author || '',
            status: prod.status as any,
            category: prod.category as any,
            descriptionEn: prod.description_en || '',
            descriptionTr: prod.description_tr || '',
            image: prod.image || '',
            dates: prod.dates || '',
            eventDate: prod.event_date || '',
            venue: prod.venue || '',
            duration: prod.duration || '',
            ticketPrice: prod.ticket_price || '',
            ticketLink: prod.ticket_link || '',
            showInProductions: prod.show_in_productions ?? true,
            showInMarketing: prod.show_in_marketing ?? false,
          });
          if (prod.image) {
            setPreviewUrl(prod.image);
          }
        }
      };

      fetchProduction();
    }
  }, [productionId, reset]);

  // Update preview when image URL changes
  useEffect(() => {
    if (imageField && !imageField.endsWith('.mp4')) {
      setPreviewUrl(imageField);
    }
  }, [imageField]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadProductionFile(file);
      if (url) {
        setValue('image', url);
        setPreviewUrl(url);
        toast.success('File uploaded successfully');
      } else {
        toast.error('Failed to upload file');
      }
    } finally {
      setUploading(false);
    }
  };

  // Update preview when image URL changes
  useEffect(() => {
    if (imageField && !imageField.endsWith('.mp4')) {
      setPreviewUrl(imageField);
    }
  }, [imageField]);

  const onSubmit = async (data: ProductionFormData) => {
    if (!supabase) {
      toast.error('Supabase not configured');
      return;
    }

    setLoading(true);
    try {
      // Auto-generate event_date from dates field if not provided
      const eventDate = data.eventDate || parseSortDate(data.dates);
      
      const productionData = {
        title: data.title,
        title_en: data.titleEn,
        author: data.author,
        status: data.status,
        category: data.category,
        description_en: data.descriptionEn,
        description_tr: data.descriptionTr,
        image: data.image,
        dates: data.dates,
        event_date: eventDate,
        venue: data.venue,
        duration: data.duration,
        ticket_price: data.ticketPrice,
        ticket_link: data.ticketLink,
        show_in_productions: data.showInProductions,
        show_in_marketing: data.showInMarketing,
      };

      if (productionId) {
        // Update existing
        const { error } = await supabase
          .from('productions')
          .update(productionData)
          .eq('id', productionId);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('productions')
          .insert([{ ...productionData, id: data.title.toLowerCase().replace(/\s+/g, '-') }]);

        if (error) throw error;
      }

      onSuccess();
    } catch (err) {
      console.error('Form error:', err);
      toast.error('Failed to save production');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground">Title</label>
          <Input {...register('title')} placeholder="Production title" className="mt-2" />
          {errors.title && <span className="text-sm text-destructive">{errors.title.message}</span>}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Title (EN)</label>
          <Input {...register('titleEn')} placeholder="English title" className="mt-2" />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Author</label>
          <Input {...register('author')} placeholder="Author/Director" className="mt-2" />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Status</label>
          <select {...register('status')} className="mt-2 w-full px-3 py-2 border border-input rounded-md bg-background">
            <option value="On Sale">On Sale</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Current">Current</option>
            <option value="Past">Past</option>
          </select>
          {errors.status && <span className="text-sm text-destructive">{errors.status.message}</span>}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Category</label>
          <select {...register('category')} className="mt-2 w-full px-3 py-2 border border-input rounded-md bg-background">
            <option value="theatre">Theatre</option>
            <option value="music">Music</option>
            <option value="art">Art</option>
            <option value="film">Film</option>
          </select>
          {errors.category && <span className="text-sm text-destructive">{errors.category.message}</span>}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Venue</label>
          <Input {...register('venue')} placeholder="Venue name" className="mt-2" />
          {errors.venue && <span className="text-sm text-destructive">{errors.venue.message}</span>}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Dates</label>
          <Input {...register('dates')} placeholder="e.g., 15 March 2024, 19:00" className="mt-2" />
          {errors.dates && <span className="text-sm text-destructive">{errors.dates.message}</span>}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Sort Date (for ordering)</label>
          <Input {...register('sortDate')} type="date" className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Auto-detected from Dates field. Override to control position in list.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Duration</label>
          <Input {...register('duration')} placeholder="e.g., 90 minutes" className="mt-2" />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Ticket Price</label>
          <Input {...register('ticketPrice')} placeholder="e.g., £25.00" className="mt-2" />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Ticket Link</label>
          <Input {...register('ticketLink')} type="url" placeholder="https://..." className="mt-2" />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Image/Video</label>
          
          {/* File Upload Area */}
          <div className="mt-2 relative">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-input rounded-lg cursor-pointer hover:bg-accent/50 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click or drag image/video</p>
                <p className="text-xs text-muted-foreground">JPG, PNG, WebP, MP4 (max 50MB)</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept=".jpg,.jpeg,.png,.webp,.mp4"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Preview */}
          {previewUrl && (
            <div className="mt-4 relative">
              {previewUrl.endsWith('.mp4') ? (
                <video 
                  src={previewUrl} 
                  className="max-h-48 rounded-lg" 
                  controls 
                />
              ) : (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-48 rounded-lg object-cover" 
                />
              )}
              <button
                type="button"
                onClick={() => {
                  setValue('image', '');
                  setPreviewUrl('');
                }}
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Manual URL Input */}
          <div className="mt-3">
            <label className="text-xs text-muted-foreground mb-1 block">Or paste URL manually</label>
            <Input 
              {...register('image')} 
              type="url" 
              placeholder="https://..." 
              className="text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supports Supabase Storage URLs, Google Drive links, or direct image/video URLs
            </p>
          </div>

          {uploading && (
            <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Description (English)</label>
        <textarea
          {...register('descriptionEn')}
          placeholder="English description"
          className="mt-2 w-full px-3 py-2 border border-input rounded-md bg-background min-h-24"
        />
        {errors.descriptionEn && <span className="text-sm text-destructive">{errors.descriptionEn.message}</span>}
      </div>

      <div>
        <label className="text-sm font-medium text-foreground">Description (Turkish)</label>
        <textarea
          {...register('descriptionTr')}
          placeholder="Turkish description"
          className="mt-2 w-full px-3 py-2 border border-input rounded-md bg-background min-h-24"
        />
      </div>

      <div className="flex flex-col gap-4 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold text-foreground">Visibility Settings</h3>
        
        <div className="flex items-center gap-3">
          <Controller
            name="showInProductions"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  id="productions"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label htmlFor="productions" className="text-sm font-medium text-foreground cursor-pointer">
                  Show in Productions page
                </label>
              </>
            )}
          />
        </div>

        <div className="flex items-center gap-3">
          <Controller
            name="showInMarketing"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox
                  id="marketing"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label htmlFor="marketing" className="text-sm font-medium text-foreground cursor-pointer">
                  Show in PR & Marketing Archive
                </label>
              </>
            )}
          />
        </div>

        <p className="text-xs text-muted-foreground">
          Uncheck both to hide from all pages. At least one can be checked to control visibility independently.
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Production'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AdminProductionForm;
