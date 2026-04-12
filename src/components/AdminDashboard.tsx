import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAllProductions } from '@/hooks/useSupabaseProductions';
import { supabase } from '@/lib/supabase';
import AdminProductionForm from './AdminProductionForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit2, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { logout } = useAdminAuth();
  const { productions, loading, refetch } = useAllProductions();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id: string) => {
    if (!supabase) {
      toast.error('Supabase not configured');
      return;
    }

    if (!confirm('Are you sure you want to delete this production?')) return;

    try {
      const { error } = await supabase
        .from('productions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Production deleted');
      refetch();
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete production');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Productions Manager</h1>
            <p className="text-muted-foreground mt-1">Manage all productions and events</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Add New Button */}
        {!showForm && !editingId && (
          <div className="mb-6">
            <Button onClick={() => setShowForm(true)}>
              + Add New Production
            </Button>
          </div>
        )}

        {/* Form */}
        {(showForm || editingId) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Production' : 'Create New Production'}</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminProductionForm
                productionId={editingId || undefined}
                onSuccess={() => {
                  setShowForm(false);
                  setEditingId(null);
                  toast.success(editingId ? 'Production updated' : 'Production created');
                  refetch();
                }}
                onCancel={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              />
            </CardContent>
          </Card>
        )}

        {/* Productions Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Productions ({productions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading productions...</div>
            ) : productions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No productions yet</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Productions</TableHead>
                      <TableHead>Marketing</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productions.map((prod) => (
                      <TableRow key={prod.id}>
                        <TableCell className="font-medium">{prod.title}</TableCell>
                        <TableCell>
                          <Badge variant={prod.status === 'On Sale' ? 'default' : 'secondary'}>
                            {prod.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">{prod.category}</TableCell>
                        <TableCell>
                          <Badge variant={prod.show_in_productions ? 'default' : 'outline'}>
                            {prod.show_in_productions ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={prod.show_in_marketing ? 'default' : 'outline'}>
                            {prod.show_in_marketing ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{prod.dates}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(prod.id)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(prod.id)}
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
    </div>
  );
};

export default AdminDashboard;
