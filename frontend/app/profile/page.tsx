"use client";

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfileRedirecting() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata?.role as string;
      if (role === 'brand') {
        router.push('/dashboard/brand');
      } else if (role === 'writer') {
        router.push('/dashboard/writer');
      } else {
        router.push('/onboarding');
      }
    } else if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [user, isLoaded, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505]">
      <div className="spinner border-purple-500 w-10 h-10" />
    </div>
  );
}
