import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { allProductions, type Production } from '@/data/productions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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
  venue: z.string().min(1, 'Venue required'),
  duration: z.string().optional(),
  ticketPrice: z.string().optional(),
  ticketLink: z.string().url().optional(),
  showInProductions: z.boolean().default(true),
  showInMarketing: z.boolean().default(false),
});

type ProductionFormData = z.infer<typeof productionSchema>;

interface AdminProductionFormProps {
  productionId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const AdminProductionForm = ({ productionId, onSuccess, onCancel }: AdminProductionFormProps) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ProductionFormData>({
    resolver: zodResolver(productionSchema),
    defaultValues: {
      showInProductions: true,
      showInMarketing: false,
    },
  });

  useEffect(() => {
    if (productionId) {
      // Find production from local data for editing
      const prod = allProductions.find(p => p.id === productionId);
      if (prod) {
        reset({
          title: prod.title,
          titleEn: prod.titleEn,
          author: prod.author,
          status: prod.status as any,
          category: prod.category as any,
          descriptionEn: typeof prod.description === 'string' ? prod.description : prod.description.EN,
          descriptionTr: typeof prod.description === 'object' ? prod.description.TR : '',
          image: prod.image,
          dates: prod.dates,
          venue: prod.venue,
          duration: prod.duration,
          ticketPrice: prod.ticketPrice,
          ticketLink: prod.ticketLink,
          showInProductions: true,
          showInMarketing: prod.showInMarketing || false,
        });
      }
    }
  }, [productionId, reset]);

  const onSubmit = async (data: ProductionFormData) => {
    if (!supabase) {
      toast.error('Supabase not configured');
      return;
    }

    setLoading(true);
    try {
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
          <label className="text-sm font-medium text-foreground">Image URL</label>
          <Input {...register('image')} type="url" placeholder="https://..." className="mt-2" />
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
