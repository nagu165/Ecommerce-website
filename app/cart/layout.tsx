
import { ReactNode } from 'react';

export default function CartLayout({ children }: { children: ReactNode }) {
  return (
      <div className="container mx-auto px-4 py-8">
      {children}
      </div>
  );
}