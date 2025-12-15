'use client';

import { createContext, useContext, useRef, useState } from 'react';

import { Chord } from '@/interface/chord';

type EditorContextProviderProps = {
  children: React.ReactNode;
  text?: string | undefined;
  chords?: { [key: string]: Chord | '' };
  songTitle?: string | undefined;
};

type EditorContextType = {
  text: string;
  setText: (text: string) => void;
  chords: { [key: string]: Chord | '' };
  setChords: (chords: { [key: string]: Chord | '' }) => void;
  setChord: (tokenId: string, chord: Chord | '') => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  songTitle?: string | undefined;
  setSongTitle: (songTitle: string) => void;
};

const EditorContext = createContext({} as EditorContextType);

export const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('useEditor must be used within an EditorContextProvider');
  }

  return context;
};

export function EditorContextProvider({
  children,
  chords: initialChords = {},
  text: initialText = '',
  songTitle: initialSongTitle,
}: EditorContextProviderProps) {
  const [text, setText] = useState<string>(initialText);
  const [songTitle, setSongTitle] = useState<string | undefined>(initialSongTitle);
  const [chords, setChords] = useState<{ [key: string]: Chord | '' }>(initialChords);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <EditorContext.Provider
      value={{
        text,
        setText,
        chords,
        setChords,
        setChord: (tokenId, chord) => {
          setChords(prev => {
            const next = { ...prev };
            if (chord === '') {
              delete next[tokenId];
            } else {
              next[tokenId] = chord;
            }
            return next;
          });
        },
        textareaRef,
        songTitle,
        setSongTitle,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
