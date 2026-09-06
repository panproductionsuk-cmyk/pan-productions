import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    const verifyAdmin = async (session: Session | null) => {
      const email = session?.user?.email ?? null;

      if (!email) {
        if (!active) return;
        setIsAuthenticated(false);
        setCurrentUserEmail(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase!
        .from('admin_users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (!active) return;

      if (error || !data) {
        // Signed-in email is not on the admin allowlist.
        await supabase!.auth.signOut();
        if (!active) return;
        setIsAuthenticated(false);
        setCurrentUserEmail(null);
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      setCurrentUserEmail(email);
      setIsAuthenticated(true);
      setAccessDenied(false);
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => verifyAdmin(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer to avoid deadlocks when calling Supabase inside the callback.
      setTimeout(() => verifyAdmin(session), 0);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    if (!supabase) return;
    setAccessDenied(false);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://panproductions.co.uk/admin',
      },
    });
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setCurrentUserEmail(null);
    window.location.href = '/admin';
  };

  return {
    isAuthenticated,
    loading,
    accessDenied,
    currentUserEmail,
    signInWithGoogle,
    logout,
  };
};
