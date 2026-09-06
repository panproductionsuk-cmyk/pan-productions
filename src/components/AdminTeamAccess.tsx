import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AdminUser {
  email: string;
  name: string | null;
  created_at?: string;
}

interface AdminTeamAccessProps {
  currentUserEmail: string | null;
}

const AdminTeamAccess = ({ currentUserEmail }: AdminTeamAccessProps) => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [saving, setSaving] = useState(false);

  const requireSupabase = () => {
    if (!supabase) {
      toast.error('Supabase not configured');
      return false;
    }
    return true;
  };

  const fetchAdmins = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('admin_users')
      .select('email, name, created_at')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Fetch admins error:', error);
      toast.error('Failed to load team members');
    } else {
      setAdmins((data as AdminUser[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async () => {
    if (!requireSupabase()) return;
    const email = newEmail.trim().toLowerCase();
    const name = newName.trim();

    if (!name) {
      toast.error('Name is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Enter a valid email address');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase!
        .from('admin_users')
        .insert([{ email, name }]);
      if (error) throw error;
      toast.success('Admin added');
      setNewName('');
      setNewEmail('');
      fetchAdmins();
    } catch (err) {
      console.error('Add admin error:', err);
      toast.error('Failed to add admin. The email may already exist.');
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (email: string) => {
    if (!requireSupabase()) return;
    if (email === currentUserEmail) {
      toast.error('You cannot remove your own access');
      return;
    }
    if (!confirm(`Remove "${email}" from admin access?`)) return;

    try {
      const { error } = await supabase!
        .from('admin_users')
        .delete()
        .eq('email', email);
      if (error) throw error;
      toast.success('Admin removed');
      fetchAdmins();
    } catch (err) {
      console.error('Remove admin error:', err);
      toast.error('Failed to remove admin');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Access ({admins.length})</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            People who can sign in to the admin panel with Google
          </p>
        </CardHeader>
        <CardContent>
          {/* Add new admin form */}
          <div className="mb-6 p-4 border border-border rounded-lg bg-muted/50">
            <h3 className="font-semibold text-foreground mb-4">Add Admin</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Full name"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="mt-2"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleAdd} disabled={saving}>
                <Plus className="w-4 h-4 mr-2" />
                {saving ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading team members...</div>
          ) : admins.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No team members yet</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.email}>
                      <TableCell className="font-medium">{admin.name || '—'}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {admin.email}
                        {admin.email === currentUserEmail && (
                          <span className="ml-2 text-xs text-primary">(you)</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemove(admin.email)}
                          disabled={admin.email === currentUserEmail}
                          title={
                            admin.email === currentUserEmail
                              ? 'You cannot remove your own access'
                              : 'Remove admin'
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

export default AdminTeamAccess;
