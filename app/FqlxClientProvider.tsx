'use client';

import { useAuth } from '@clerk/nextjs';
import { FqlxProvider } from 'fauna-typed';
import { useEffect, useState } from 'react';
import { View } from 'reshaped';
import { useRouter, usePathname } from 'next/navigation';
import Loader from '../components/Loader';
import { DISCOVERYMODE } from '../__mocks__/flow';

const FAUNA_ENDPOINT = 'https://db.fauna.com';

interface FqlxClientProviderProps {
  readonly children: React.ReactNode;
}

export default function FqlxClientProvider({
  children,
}: FqlxClientProviderProps) {
  const [token, setToken] = useState('');
  const { userId, getToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const fetchToken = async () => {
    const localToken = await getToken({ template: 'fauna' });
    if (localToken !== token) {
      setToken(
        localToken ?? process.env.NEXT_PUBLIC_FAUNA_DISCOVERY_TOKEN ?? 'invalid'
      );
    }
  };

  useEffect(() => {
    let intervalId: any = null;

    const startInterval = () => {
      intervalId = setInterval(fetchToken, 55000);
    };

    const stopInterval = () => {
      clearInterval(intervalId);
    };

    startInterval();

    return () => {
      stopInterval();
    };
  }, []);

  useEffect(() => {
    fetchToken();
  }, [userId]);

  useEffect(() => {
    // Redirect to sign-in screen, If clerk token invalid
    if (token === 'invalid') {
      router.push(`/${DISCOVERYMODE}/treatments`);
    }
  }, [token]);

  return (
    <>
      {!token && <Loader />}

      {/* Only render children when sign-in route active */}
      {['/sign-in', '/sign-up'].includes(pathname) && children}

      {token && token !== 'invalid' && (
        <FqlxProvider
          config={{
            fqlxSecret: token,
            endpoint: new URL(FAUNA_ENDPOINT),
          }}
          loader={<Loader />}
        >
          <View height='100svh'>{children}</View>
        </FqlxProvider>
      )}
    </>
  );
}
