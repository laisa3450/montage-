import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const router = useRouter();

  useEffect(() => {
    const handleReset = async () => {
      const { data, error } = await supabase.auth.updateUser({ password: window.prompt('Enter new password') });
      if (error) alert(error.message);
      else {
        alert('Password updated successfully');
        router.push('/login');
      }
    };
    handleReset();
  }, [router]);

  return <div>Processing password reset...</div>;
}
