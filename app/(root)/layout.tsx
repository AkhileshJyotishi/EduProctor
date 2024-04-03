import { ReactNode } from 'react';

import StreamVideoProvider from '@/providers/StreamClientProvider';
import { RolesProvider } from '@/providers/RolesProvider';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <RolesProvider>
      <StreamVideoProvider>{children}</StreamVideoProvider>
      </RolesProvider>
    </main>
  );
};

export default RootLayout;
