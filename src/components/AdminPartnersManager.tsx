import React, { useState } from 'react';
import { useAllPartners } from '@/hooks/useSupabasePartners';
import { supabase, type Partner } from '@/lib/supabase';
import { uploadProductionFile } from '@/lib/storageUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Upload, Eye, EyeOff, Check, X, Plus } from 'lucide-react';
import { toast } from 'sonner';

const AdminPartnersManager = () => {
  const { partners, loading, refetch } = useAllPartners();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // New partner form state
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLogo, setNewLogo] = useState('');
  const [savingNew, setSavingNew] = useState(false);
  const [uploadingNew, setUploadingNew] = useState(false);

  const requireSupabase = () => {
    if (!supabase) {
      toast.error('Supabase not configured');
      return false;
    }
    return true;
  };

  const handleToggleVisible = async (partner: Partner) => {
    if (!requireSupabase()) return;
    try {
      const { error } = await supabase!
        .from('partners')
        .update({ visible: !partner.visible, updated_at: new Date().toISOString() })
        .eq('id', partner.id);
      if (error) throw error;
      toast.success(partner.visible ? 'Logo hidden' : 'Logo shown');
      refetch();
    } catch (err) {
      console.error('Toggle visibility error:', err);
      toast.error('Failed to update visibility');
    }
  };

  const handleReplaceLogo = async (partner: Partner, file: File) => {
    if (!requireSupabase()) return;
    setUploadingId(partner.id);
    try {
      const url = await uploadProductionFile(file, 'partners');
      if (!url) {
        toast.error('Failed to upload logo');
        return;
      }
      const { error } = await supabase!
        .from('partners')
        .update({ logo: url, updated_at: new Date().toISOString() })
        .eq('id', partner.id);
      if (error) throw error;
      toast.success('Logo replaced');
      refetch();
    } catch (err) {
      console.error('Replace logo error:', err);
      toast.error('Failed to replace logo');
    } finally {
      setUploadingId(null);
    }
  };

  const handleSaveName = async (partner: Partner) => {
    if (!requireSupabase()) return;
    if (!editName.trim()) {
      toast.error('Name cannot be empty');
      return;
    }
    try {
      const { error } = await supabase!
        .from('partners')
        .update({ name: editName.trim(), updated_at: new Date().toISOString() })
        .eq('id', partner.id);
      if (error) throw error;
      toast.success('Name updated');
      setEditingId(null);
      setEditName('');
      refetch();
    } catch (err) {
      console.error('Save name error:', err);
      toast.error('Failed to update name');
    }
  };

  const handleDelete = async (partner: Partner) => {
    if (!requireSupabase()) return;
    if (!confirm(`Delete "${partner.name}" from the carousel?`)) return;
    try {
      const { error } = await supabase!
        .from('partners')
        .delete()
        .eq('id', partner.id);
      if (error) throw error;
      toast.success('Partner deleted');
      refetch();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete partner');
    }
  };

  const handleNewLogoUpload = async (file: File) => {
    if (!requireSupabase()) return;
    setUploadingNew(true);
    try {
      const url = await uploadProductionFile(file, 'partners');
      if (!url) {
        toast.error('Failed to upload logo');
        return;
      }
      setNewLogo(url);
      toast.success('Logo uploaded');
    } finally {
      setUploadingNew(false);
    }
  };

  const handleCreate = async () => {
    if (!requireSupabase()) return;
    if (!newName.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!newLogo) {
      toast.error('Please upload a logo');
      return;
    }
    setSavingNew(true);
    try {
      const nextOrder = partners.length > 0
        ? Math.max(...partners.map((p) => p.sort_order)) + 1
        : 0;
      const { error } = await supabase!
        .from('partners')
        .insert([{ name: newName.trim(), logo: newLogo, sort_order: nextOrder, visible: true }]);
      if (error) throw error;
      toast.success('Partner added');
      setNewName('');
      setNewLogo('');
      setShowAdd(false);
      refetch();
    } catch (err) {
      console.error('Create error:', err);
      toast.error('Failed to add partner');
    } finally {
      setSavingNew(false);
    }
  };

  const visibleCount = partners.filter((p) => p.visible).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Partners &amp; Supporters ({partners.length})</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {visibleCount} shown in the carousel
              </p>
            </div>
            {!showAdd && (
              <Button onClick={() => setShowAdd(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Partner
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Add new partner form */}
          {showAdd && (
            <div className="mb-6 p-4 border border-border rounded-lg bg-muted/50">
              <h3 className="font-semibold text-foreground mb-4">New Partner</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Partner name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Logo</label>
                  <div className="mt-2 flex items-center gap-3">
                    {newLogo ? (
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg border border-border bg-background flex items-center justify-center overflow-hidden">
                        <img src={newLogo} alt="New logo preview" className="max-w-full max-h-full object-contain" />
                      </div>
                    ) : null}
                    <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-input rounded-md cursor-pointer hover:bg-accent/50 transition text-sm">
                      <Upload className="w-4 h-4" />
                      {uploadingNew ? 'Uploading...' : newLogo ? 'Change logo' : 'Upload logo'}
                      <input
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.webp,.svg"
                        disabled={uploadingNew}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleNewLogoUpload(file);
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button onClick={handleCreate} disabled={savingNew}>
                  {savingNew ? 'Saving...' : 'Add Partner'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAdd(false);
                    setNewName('');
                    setNewLogo('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading partners...</div>
          ) : partners.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No partners yet</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-32">Visible</TableHead>
                    <TableHead className="w-40">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((partner) => (
                    <TableRow key={partner.id} className={partner.visible ? '' : 'opacity-60'}>
                      <TableCell>
                        <div className="w-16 h-16 rounded-lg border border-border bg-background flex items-center justify-center overflow-hidden">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        {editingId === partner.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="max-w-xs"
                              autoFocus
                            />
                            <Button size="sm" variant="outline" onClick={() => handleSaveName(partner)}>
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingId(null);
                                setEditName('');
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="font-medium text-foreground hover:underline text-left"
                            onClick={() => {
                              setEditingId(partner.id);
                              setEditName(partner.name);
                            }}
                          >
                            {partner.name}
                          </button>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={partner.visible}
                            onCheckedChange={() => handleToggleVisible(partner)}
                            aria-label={`Toggle visibility for ${partner.name}`}
                          />
                          {partner.visible ? (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <label
                            className="inline-flex items-center justify-center h-9 px-3 rounded-md border border-input bg-background cursor-pointer hover:bg-accent transition text-sm"
                            title="Replace logo"
                          >
                            {uploadingId === partner.id ? (
                              <span className="text-xs">...</span>
                            ) : (
                              <Upload className="w-4 h-4" />
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept=".jpg,.jpeg,.png,.webp,.svg"
                              disabled={uploadingId === partner.id}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleReplaceLogo(partner, file);
                                e.target.value = '';
                              }}
                            />
                          </label>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(partner)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPartnersManager;
