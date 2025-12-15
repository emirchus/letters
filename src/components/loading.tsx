import { Loader } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function Loading({ className }: Props) {
  return (
    <div className={cn('flex h-4 w-4 items-center justify-center', className)}>
      <Loader className="h-4 w-4 animate-spin" />
    </div>
  );
}
