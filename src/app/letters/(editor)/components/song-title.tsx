'use client';

import React, { useState } from 'react';

import { AutosizeTextarea } from '@/components/autosize-textarea';
import { cn } from '@/lib/utils';
import { useEditor } from '@/provider/editor-provider';

interface Props {
  className?: string;
}

export function SongTitle({ className }: Props) {
  const { songTitle, setSongTitle } = useEditor();

  const [isEditing, setIsEditing] = useState<boolean>(true);

  return (
    <div
      className={cn('bg-background sticky top-[64px] z-20', className)}
      onClick={() => setIsEditing(true)}
      role="button"
      tabIndex={0}
    >
      {isEditing || !songTitle ? (
        <AutosizeTextarea
          className={cn(
            'font-heading placeholder:text-muted h-[80px] w-full resize-none appearance-none border-none bg-transparent p-4 text-5xl font-bold outline-hidden'
          )}
          placeholder="Title song"
          value={songTitle ?? ''}
          onBlur={() => setIsEditing(false)}
          onChange={e => setSongTitle(e.target.value)}
        />
      ) : (
        <h1 className={cn('h-[80px] truncate p-4 text-5xl font-bold outline-hidden')}>{songTitle}</h1>
      )}
    </div>
  );
}
