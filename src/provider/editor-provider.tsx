"use client";

import { createContext, useContext, useRef, useState } from "react";

import { Chord } from "@/interface/chord";

type EditorContextProviderProps = {
  children: React.ReactNode;
  text?: string | undefined;
  chords?: { [key: number]: Chord | "" };
  songTitle?: string | undefined;
};

type EditorContextType = {
  text: string;
  setText: (text: string) => void;
  chords: { [key: number]: Chord | "" };
  setChords: (chords: { [key: number]: Chord | "" }) => void;
  setChord: (index: number, chord: Chord | "") => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  songTitle?: string | undefined;
  setSongTitle: (songTitle: string) => void;
};

const EditorContext = createContext({} as EditorContextType);

export const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used within an EditorContextProvider");
  }

  return context;
};

export const EditorContextProvider = ({
  children,
  chords: initialChords = {},
  text: initialText = "",
  songTitle: initialSongTitle,
}: EditorContextProviderProps) => {
  const [text, setText] = useState<string>(initialText);
  const [songTitle, setSongTitle] = useState<string | undefined>(initialSongTitle);
  const [chords, setChords] = useState<{ [key: number]: Chord | "" }>(initialChords);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <EditorContext.Provider
      value={{
        text,
        setText,
        chords,
        setChords,
        setChord: (index, chord) => {
          setChords({ ...chords, [index]: chord });
        },
        textareaRef,
        songTitle,
        setSongTitle,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
