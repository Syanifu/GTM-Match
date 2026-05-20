import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminDashboard } from './AdminDashboard';

export default async function AdminPage() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/admin/login');
    }
  } catch {
    redirect('/admin/login');
  }

  return <AdminDashboard />;
}
