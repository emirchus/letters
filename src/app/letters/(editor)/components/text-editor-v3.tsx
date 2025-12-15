'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Chord } from '@/interface/chord';
import { cn } from '@/lib/utils';
import { useEditor } from '@/provider/editor-provider';
import { ChordMarker } from './chord-marker';

interface Props {
  readonly?: boolean;
  className?: string;
}

interface WordPosition {
  word: string;
  startIndex: number;
  endIndex: number;
  lineIndex: number;
  charIndex: number;
  tokenId: string; // ID único del token basado en posición y contenido
}

interface MarkerPosition {
  top: number;
  left: number;
  width: number;
}

interface LineSection {
  lineIndex: number;
  words: WordPosition[];
  lineText: string;
}

const LineMarkersSection = React.memo(
  ({
    section,
    text,
    chords,
    readonly,
    setChord,
    getMarkerPosition,
  }: {
    section: LineSection;
    text: string;
    chords: Record<string, Chord | React.ReactNode>;
    readonly: boolean;
    setChord: (tokenId: string, chord: Chord | '') => void;
    getMarkerPosition: (wordPos: WordPosition) => MarkerPosition | null;
  }) => {
    // Si es una línea vacía, mostrar markers incrementales al inicio
    if (section.words.length === 0 && section.lineText.trim().length === 0) {
      const emptyLineTokenId = `line-${section.lineIndex}-empty`;

      // Contar cuántos acordes ya hay en esta línea vacía
      let markerCount = 0;
      while (chords[`${emptyLineTokenId}-marker-${markerCount}`]) {
        markerCount++;
      }

      // Mostrar un marker adicional (incremental)
      const nextMarkerIndex = markerCount;
      const emptyLineMarkerTokenId = `${emptyLineTokenId}-marker-${nextMarkerIndex}`;

      // Crear una posición virtual para la línea vacía (inicio de la línea)
      const virtualWordPos: WordPosition = {
        word: '',
        startIndex: 0,
        endIndex: 0,
        lineIndex: section.lineIndex,
        charIndex: 0,
        tokenId: emptyLineTokenId,
      };

      const position = getMarkerPosition(virtualWordPos);

      if (!position) return null;

      // Renderizar todos los markers existentes + el nuevo
      const markers: React.ReactNode[] = [];

      // Renderizar markers existentes
      for (let i = 0; i < markerCount; i++) {
        const existingMarkerTokenId = `${emptyLineTokenId}-marker-${i}`;
        markers.push(
          <ChordMarker
            key={`marker-${existingMarkerTokenId}`}
            chord={
              chords[existingMarkerTokenId] || (
                <div className="bg-border mx-auto aspect-square h-[10px] w-[10px] rounded-full" />
              )
            }
            readonly={readonly}
            onRemove={() => {}}
            onSelectChordAction={chord => {
              setChord(existingMarkerTokenId, chord);
            }}
          />
        );
      }

      // Renderizar el nuevo marker (vacío)
      markers.push(
        <ChordMarker
          key={`marker-${emptyLineMarkerTokenId}`}
          chord={
            chords[emptyLineMarkerTokenId] || (
              <div className="bg-border mx-auto aspect-square h-[10px] w-[10px] rounded-full" />
            )
          }
          readonly={readonly}
          onRemove={() => {}}
          onSelectChordAction={chord => {
            setChord(emptyLineMarkerTokenId, chord);
          }}
        />
      );

      return (
        <motion.div
          key={`empty-line-marker-${section.lineIndex}`}
          className="absolute flex h-6 items-center justify-start gap-2 pointer-events-auto"
          initial={{ opacity: 0, y: -5, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -5, scale: 0.8, filter: 'blur(10px)' }}
          transition={{
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
            bounce: 0.5,
            damping: 10,
            stiffness: 100,
          }}
          style={{
            top: `${position.top - 10}px`,
            left: `${position.left}px`, // Al inicio de la línea
            width: 'auto',
            transformOrigin: 'center top',
          }}
        >
          {markers}
        </motion.div>
      );
    }

    // Líneas con contenido: renderizar markers normalmente
    return (
      <>
        {section.words.map((wordPos, wordIndex) => {
          const numMarkers = Math.max(1, Math.floor(wordPos.word.length / 2));
          const markers: React.ReactNode[] = [];

          for (let i = 0; i < numMarkers; i++) {
            // Usar tokenId + índice del marker dentro de la palabra
            const markerTokenId = `${wordPos.tokenId}-marker-${i}`;

            markers.push(
              <ChordMarker
                key={`marker-${markerTokenId}`}
                chord={
                  chords[markerTokenId] || (
                    <div className="bg-border mx-auto aspect-square h-[10px] w-[10px] rounded-full" />
                  )
                }
                readonly={readonly}
                onRemove={() => {}}
                onSelectChordAction={chord => {
                  setChord(markerTokenId, chord);
                }}
              />
            );
          }

          const position = getMarkerPosition(wordPos);

          if (!position) return null;

          return (
            <motion.div
              key={`word-marker-${section.lineIndex}-${wordIndex}`}
              className="absolute flex h-6 items-center justify-evenly pointer-events-auto"
              initial={{ opacity: 0, y: -5, scale: 0.8, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -5, scale: 0.8, filter: 'blur(10px)' }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
                delay: wordIndex * 0.1, // Stagger animation por palabra
                bounce: 0.5,
                damping: 10,
                stiffness: 100,
              }}
              style={{
                top: `${position.top - 10}px`,
                left: `${position.left}px`,
                width: `${position.width}px`,
                transformOrigin: 'center top', // Animación desde arriba
              }}
            >
              {markers}
            </motion.div>
          );
        })}
      </>
    );
  },
  (prevProps, nextProps) => {
    // Re-renderizar si la línea cambió
    if (
      prevProps.section.lineText !== nextProps.section.lineText ||
      prevProps.section.lineIndex !== nextProps.section.lineIndex ||
      prevProps.readonly !== nextProps.readonly
    ) {
      return false; // Necesita re-render
    }

    // Verificar si algún acorde relevante para esta sección cambió
    const relevantTokens = new Set<string>();

    // Si es una línea vacía, verificar todos los acordes de la línea vacía (incrementales)
    if (prevProps.section.words.length === 0 && prevProps.section.lineText.trim().length === 0) {
      const emptyLineTokenId = `line-${prevProps.section.lineIndex}-empty`;
      // Verificar hasta 10 markers (límite razonable)
      for (let i = 0; i < 10; i++) {
        const tokenId = `${emptyLineTokenId}-marker-${i}`;
        if (prevProps.chords[tokenId] || nextProps.chords[tokenId]) {
          relevantTokens.add(tokenId);
        }
      }
    } else {
      // Líneas con contenido: verificar acordes de palabras
      prevProps.section.words.forEach(wordPos => {
        const numMarkers = Math.max(1, Math.floor(wordPos.word.length / 2));
        for (let i = 0; i < numMarkers; i++) {
          relevantTokens.add(`${wordPos.tokenId}-marker-${i}`);
        }
      });
    }

    // Comparar acordes relevantes
    for (const tokenId of relevantTokens) {
      const prevChord = prevProps.chords[tokenId];
      const nextChord = nextProps.chords[tokenId];

      // Si el acorde cambió, necesita re-render
      if (prevChord !== nextChord) {
        return false; // Necesita re-render
      }
    }

    // Si nada cambió, no necesita re-render
    return true; // No necesita re-render
  }
);

LineMarkersSection.displayName = 'LineMarkersSection';

export function ChordEditorV3({ readonly = false }: Props) {
  const { text, setText, chords, setChord, setChords } = useEditor();
  const textareaElementRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const positionCacheRef = useRef<Map<string, MarkerPosition>>(new Map());
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [debouncedText, setDebouncedText] = useState(text);
  const hasMigratedRef = useRef(false);
  const copiedChordsRef = useRef<Record<string, Chord | ''>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);

  // Migrar acordes antiguos (índices numéricos) a tokens si es necesario
  useEffect(() => {
    if (hasMigratedRef.current) return;

    // Verificar si hay acordes con índices numéricos (sistema antiguo)
    const numericKeys = Object.keys(chords).filter(key => /^\d+$/.test(key));

    if (numericKeys.length > 0 && debouncedText) {
      // Migrar acordes antiguos a tokens
      const lines = debouncedText.split('\n');
      const migratedChords: Record<string, Chord | ''> = {};
      let absoluteIndex = 0;

      lines.forEach((line, lineIndex) => {
        const words = line.split(' ');

        words.forEach((word, wordIndex) => {
          if (word.trim().length > 0) {
            const cleanWord = word.trim().toLowerCase();
            const tokenId = `line-${lineIndex}-word-${wordIndex}-${cleanWord}`;
            const numMarkers = Math.max(1, Math.floor(word.length / 2));

            for (let i = 0; i < numMarkers; i++) {
              const oldIndex = absoluteIndex + i;
              const markerTokenId = `${tokenId}-marker-${i}`;

              // Si existe un acorde en el índice antiguo, migrarlo al token
              if (chords[oldIndex] !== undefined) {
                migratedChords[markerTokenId] = chords[oldIndex];
              }
            }

            absoluteIndex += word.length + 1;
          } else if (wordIndex < words.length - 1) {
            absoluteIndex += 1;
          }
        });

        if (lineIndex < lines.length - 1) {
          absoluteIndex += 1;
        }
      });

      // Actualizar con los acordes migrados
      if (Object.keys(migratedChords).length > 0) {
        setChords(migratedChords);
      }

      hasMigratedRef.current = true;
    }
  }, [chords, debouncedText, setChords]);

  // Debounce del texto para evitar recálculos excesivos
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedText(text);
      // Limpiar cache cuando cambia el texto
      positionCacheRef.current.clear();
    }, 150); // 150ms de debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [text]);

  // Calcular posiciones de palabras y dividirlas por secciones (líneas)
  const lineSections = useMemo(() => {
    const lines = debouncedText.split('\n');
    const sections: LineSection[] = [];
    let absoluteIndex = 0;

    lines.forEach((line, lineIndex) => {
      const words: WordPosition[] = [];
      const lineWords = line.split(' ');
      let charIndex = 0;

      lineWords.forEach((word, wordIndex) => {
        if (word.trim().length > 0) {
          // Generar token ID único basado en el contenido de la palabra y su posición relativa
          // El token se mantiene estable incluso si se añade/elimina texto antes
          // Formato: línea-palabra-contenido para que sea único y estable
          const cleanWord = word.trim().toLowerCase();
          const tokenId = `line-${lineIndex}-word-${wordIndex}-${cleanWord}`;

          words.push({
            word,
            startIndex: absoluteIndex,
            endIndex: absoluteIndex + word.length,
            lineIndex,
            charIndex,
            tokenId,
          });
          charIndex += word.length + 1; // +1 for space after word
          absoluteIndex += word.length + 1;
        } else if (wordIndex < lineWords.length - 1) {
          // Espacio entre palabras
          absoluteIndex += 1;
          charIndex += 1;
        }
      });

      // Nueva línea: incrementar absoluteIndex pero no charIndex (se resetea en la siguiente línea)
      if (lineIndex < lines.length - 1) {
        absoluteIndex += 1; // +1 for newline character
      }

      // Incluir sección si tiene palabras O si es una línea vacía (para permitir acordes)
      if (words.length > 0 || line.trim().length === 0) {
        sections.push({
          lineIndex,
          words,
          lineText: line,
        });
      }
    });

    return sections;
  }, [debouncedText]);

  // Ajustar altura del textarea (mínimo la altura del contenedor)
  const adjustHeight = useCallback(() => {
    const textarea = textareaElementRef.current;
    const container = containerRef.current;
    if (!textarea || !container) return;

    const containerHeight = container.clientHeight;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;

    // Usar el máximo entre scrollHeight y containerHeight para asegurar altura mínima
    textarea.style.height = `${Math.max(scrollHeight, containerHeight)}px`;
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);

  // Inicializar con líneas vacías si el texto está vacío
  useEffect(() => {
    if (hasInitializedRef.current || text.length > 0) return;

    const container = containerRef.current;
    const textarea = textareaElementRef.current;
    if (!container || !textarea) return;

    // Calcular altura disponible del contenedor
    const containerHeight = container.clientHeight;

    // Obtener el line-height del textarea (leading-12 = 3rem = 48px)
    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(computedStyle.lineHeight) || 48; // fallback a 48px si no se puede parsear

    // Calcular cuántas líneas caben (redondear hacia abajo)
    const maxLines = Math.floor(containerHeight / lineHeight);

    // Inicializar con líneas vacías (mínimo 1 línea)
    if (maxLines > 0) {
      const initialLines = '\n'.repeat(Math.max(1, maxLines - 1));
      setText(initialLines);
      hasInitializedRef.current = true;
    }
  }, [text, setText]);

  // Ajustar altura cuando cambia el texto (mínimo la altura del contenedor)
  useEffect(() => {
    const textarea = textareaElementRef.current;
    const container = containerRef.current;
    if (!textarea || !container) return;

    const containerHeight = container.clientHeight;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;

    // Usar el máximo entre scrollHeight y containerHeight para asegurar altura mínima
    textarea.style.height = `${Math.max(scrollHeight, containerHeight)}px`;
  }, []);

  // Obtener posición de un marcador usando un div oculto que replica el textarea
  // Con cache para evitar recálculos innecesarios
  const getMarkerPosition = useCallback(
    (wordPos: WordPosition): MarkerPosition | null => {
      const textarea = textareaElementRef.current;
      if (!textarea) return null;

      // Generar clave de cache
      const cacheKey = `${wordPos.lineIndex}-${wordPos.charIndex}-${wordPos.word}`;

      // Verificar cache
      if (positionCacheRef.current.has(cacheKey)) {
        return positionCacheRef.current.get(cacheKey)!;
      }

      // Crear un div oculto que replica exactamente el estilo del textarea
      const mirror = document.createElement('div');
      const computedStyle = window.getComputedStyle(textarea);

      // Copiar todos los estilos relevantes para que el layout sea idéntico
      mirror.style.position = 'absolute';
      mirror.style.visibility = 'hidden';
      mirror.style.whiteSpace = computedStyle.whiteSpace;
      mirror.style.font = computedStyle.font;
      mirror.style.fontSize = computedStyle.fontSize;
      mirror.style.fontFamily = computedStyle.fontFamily;
      mirror.style.fontWeight = computedStyle.fontWeight;
      mirror.style.lineHeight = computedStyle.lineHeight;
      mirror.style.letterSpacing = computedStyle.letterSpacing;
      mirror.style.padding = computedStyle.padding;
      mirror.style.border = computedStyle.border;
      mirror.style.borderWidth = computedStyle.borderWidth;
      mirror.style.borderStyle = computedStyle.borderStyle;
      mirror.style.boxSizing = computedStyle.boxSizing;
      mirror.style.width = computedStyle.width;
      mirror.style.wordWrap = computedStyle.wordWrap;
      mirror.style.overflowWrap = computedStyle.overflowWrap;
      mirror.style.textAlign = computedStyle.textAlign;
      mirror.style.direction = computedStyle.direction;
      mirror.style.wordBreak = computedStyle.wordBreak;
      mirror.style.tabSize = computedStyle.tabSize;

      // Establecer el contenido del textarea en el mirror, preservando saltos de línea
      mirror.textContent = debouncedText;

      // Agregar al mismo contenedor que el textarea para que las posiciones sean relativas
      const container = textarea.parentElement;
      if (!container) return null;

      mirror.style.top = '0';
      mirror.style.left = '0';
      container.appendChild(mirror);

      try {
        // Calcular índices de caracteres absolutos en el texto completo
        const lines = debouncedText.split('\n');

        // Si es una línea vacía, calcular posición basada en lineHeight
        if (wordPos.word.length === 0 && wordPos.charIndex === 0) {
          // Calcular posiciones relativas al textarea, considerando el padding
          const paddingTop = parseFloat(computedStyle.paddingTop) || 24;
          const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
          const lineHeight = parseFloat(computedStyle.lineHeight) || 48; // leading-12 = 48px

          // Calcular el top basado en el índice de línea y el lineHeight
          // Multiplicar lineIndex por lineHeight para obtener la posición vertical
          const top = paddingTop + wordPos.lineIndex * lineHeight - 8; // Offset para posicionar arriba

          // Limpiar el mirror ya que no lo necesitamos para líneas vacías
          container.removeChild(mirror);

          const position: MarkerPosition = {
            top,
            left: paddingLeft, // Al inicio de la línea
            width: 20, // Ancho base para el marker de línea vacía
          };

          // Guardar en cache
          positionCacheRef.current.set(cacheKey, position);

          return position;
        }

        // Calcular el índice del inicio de la línea actual
        let lineStart = 0;
        for (let i = 0; i < wordPos.lineIndex; i++) {
          lineStart += lines[i].length + 1; // +1 for newline
        }

        const startCharIndex = lineStart + wordPos.charIndex;
        const endCharIndex = startCharIndex + wordPos.word.length;

        // Crear un rango para medir la posición de la palabra
        const range = document.createRange();
        const walker = document.createTreeWalker(mirror, NodeFilter.SHOW_TEXT, null);

        let currentPos = 0;
        let startNode: Node | null = null;
        let endNode: Node | null = null;
        let startOffset = 0;
        let endOffset = 0;

        // Encontrar los nodos de texto que contienen la palabra
        let node: Node | null = null;
        while ((node = walker.nextNode())) {
          const nodeLength = node.textContent?.length || 0;

          if (!startNode && currentPos + nodeLength >= startCharIndex) {
            startNode = node;
            startOffset = startCharIndex - currentPos;
          }

          if (!endNode && currentPos + nodeLength >= endCharIndex) {
            endNode = node;
            endOffset = endCharIndex - currentPos;
            break;
          }

          currentPos += nodeLength;
        }

        if (!startNode || !endNode) {
          container.removeChild(mirror);
          return null;
        }

        // Establecer el rango
        range.setStart(startNode, Math.max(0, startOffset));
        range.setEnd(endNode, Math.max(0, endOffset));

        // Obtener las posiciones
        const rect = range.getBoundingClientRect();
        const textareaRect = textarea.getBoundingClientRect();

        // Limpiar
        container.removeChild(mirror);

        // Calcular posiciones relativas al textarea, considerando el padding
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
        const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;

        const position: MarkerPosition = {
          top: rect.top - textareaRect.top + paddingTop - 8, // Offset para posicionar arriba
          left: rect.left - textareaRect.left + paddingLeft,
          width: rect.width,
        };

        // Guardar en cache
        positionCacheRef.current.set(cacheKey, position);

        return position;
      } catch {
        if (mirror.parentElement) {
          mirror.parentElement.removeChild(mirror);
        }
        return null;
      }
    },
    [debouncedText]
  );

  // Renderizar markers por secciones (líneas)
  const renderChordMarkers = useMemo(() => {
    return lineSections.map(section => (
      <LineMarkersSection
        key={`section-${section.lineIndex}`}
        section={section}
        text={debouncedText}
        chords={chords}
        readonly={readonly}
        setChord={setChord}
        getMarkerPosition={getMarkerPosition}
      />
    ));
  }, [lineSections, debouncedText, chords, readonly, setChord, getMarkerPosition]);

  // Números de línea (mínimo 1 línea)
  const lineNumbers = useMemo(() => {
    const lines = debouncedText.split('\n');
    return lines.length > 0 ? lines : [''];
  }, [debouncedText]);

  return (
    <div ref={containerRef} className="relative h-svh w-full font-mono text-base" dir="ltr">
      {/* Gutter con números de línea */}
      <div className="absolute inset-y-0 left-0 w-full leading-6 select-none text-right text-sm text-muted-foreground/70">
        {lineNumbers.map((_, idx) => (
          <div key={`line-number-${idx}`} className="h-12 w-full flex items-center justify-start">
            <div className="h-[80%] w-full border-b ml-2"></div>
          </div>
        ))}
      </div>

      {/* Contenido principal desplazado por el gutter */}
      <div className="relative h-full w-full">
        {/* Overlay para markers */}
        <div ref={overlayRef} className="absolute inset-0 pointer-events-none z-10">
          <AnimatePresence mode="popLayout">{renderChordMarkers}</AnimatePresence>
        </div>

        {/* Textarea real - comportamiento nativo perfecto */}
        <textarea
          ref={textareaElementRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onCopy={() => {
            // Cuando se copia texto, guardar los acordes asociados
            const textarea = textareaElementRef.current;
            if (!textarea) return;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const copiedText = text.slice(start, end);

            if (copiedText.length === 0) return;

            // Calcular qué líneas y palabras se están copiando
            const linesBefore = text.slice(0, start).split('\n');
            const startLineIndex = linesBefore.length - 1;
            const copiedLines = copiedText.split('\n');

            copiedChordsRef.current = {};

            // Calcular las líneas completas del texto para mapear correctamente
            const allLines = text.split('\n');
            const startLineText = linesBefore[linesBefore.length - 1] ?? '';
            const baseWordOffset = startLineText.split(' ').filter(w => w.trim().length > 0).length;

            // Detectar si el texto copiado comienza con un salto de línea
            const startsWithNewline = copiedText.startsWith('\n');

            // Índice relativo para mapear acordes (ignora líneas vacías al inicio)
            let relativeLineIndexForChords = 0;

            copiedLines.forEach((copiedLine, relativeLineIndex) => {
              // Si la línea está vacía y es la primera, es porque hay un salto de línea al inicio
              if (copiedLine.trim().length === 0 && relativeLineIndex === 0 && startsWithNewline) {
                // Saltar esta línea vacía, no incrementar relativeLineIndexForChords
                return;
              }

              const absoluteLineIndex = startLineIndex + relativeLineIndex;

              // Verificar que la línea existe en el texto original
              if (absoluteLineIndex >= allLines.length) return;

              const copiedWords = copiedLine.split(' ').filter(w => w.trim().length > 0);

              copiedWords.forEach((copiedWord, wordIndex) => {
                const cleanWord = copiedWord.trim().toLowerCase();
                // Si es la primera línea con contenido y hay un salto de línea al inicio,
                // el wordIndex empieza desde 0 (es una nueva línea)
                const isFirstContentLine = startsWithNewline && relativeLineIndexForChords === 0;
                const originalWordIndex = isFirstContentLine
                  ? wordIndex
                  : relativeLineIndex === 0
                    ? baseWordOffset + wordIndex
                    : wordIndex;
                const originalTokenId = `line-${absoluteLineIndex}-word-${originalWordIndex}-${cleanWord}`;
                const numMarkers = Math.max(1, Math.floor(copiedWord.length / 2));

                // Guardar los acordes asociados usando una clave relativa
                // Usar relativeLineIndexForChords para ignorar líneas vacías al inicio
                for (let i = 0; i < numMarkers; i++) {
                  const originalMarkerTokenId = `${originalTokenId}-marker-${i}`;
                  const relativeKey = `${relativeLineIndexForChords}-${wordIndex}-${i}`;

                  if (chords[originalMarkerTokenId]) {
                    copiedChordsRef.current[relativeKey] = chords[originalMarkerTokenId];
                  }
                }
              });

              // Solo incrementar si la línea tenía contenido
              if (copiedLine.trim().length > 0) {
                relativeLineIndexForChords++;
              }
            });

            // Permitir que el comportamiento por defecto continúe
          }}
          onPaste={e => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text/plain');
            const textarea = textareaElementRef.current;

            if (!textarea) return;

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            // Usar el valor actual del textarea en lugar del estado para evitar desincronización
            const currentText = textarea.value;
            const beforeText = currentText.slice(0, start);
            const afterText = currentText.slice(end);
            const newText = beforeText + pastedText + afterText;

            // Calcular en qué línea estamos insertando
            const linesBefore = beforeText.split('\n');
            const insertLineIndex = linesBefore.length - 1;

            // Analizar el texto pegado y mapear acordes copiados
            const pastedLines = pastedText.split('\n');
            const newChords: Record<string, Chord | ''> = { ...chords };

            // Detectar si el texto pegado comienza con un salto de línea
            const startsWithNewline = pastedText.startsWith('\n');

            // Calcular offset de palabras en la línea donde se inserta (para pegar en mitad de línea)
            const startLineText = linesBefore[linesBefore.length - 1] ?? '';
            const baseWordOffset = startLineText.split(' ').filter(w => w.trim().length > 0).length;

            // Índice relativo para mapear acordes (ignora líneas vacías al inicio)
            let relativeLineIndexForChords = 0;

            pastedLines.forEach((pastedLine, pastedLineIndex) => {
              // Si la línea está vacía y es la primera, es porque hay un salto de línea al inicio
              if (pastedLine.trim().length === 0 && pastedLineIndex === 0 && startsWithNewline) {
                // Saltar esta línea vacía, no incrementar relativeLineIndexForChords
                return;
              }

              const pastedWords = pastedLine.split(' ').filter(w => w.trim().length > 0);

              pastedWords.forEach((pastedWord, wordIndex) => {
                const cleanPastedWord = pastedWord.trim().toLowerCase();
                const numMarkers = Math.max(1, Math.floor(pastedWord.length / 2));

                // Calcular la nueva posición en el texto pegado
                // Si el texto comienza con \n, la primera línea real está en pastedLineIndex 1
                // pero debe insertarse en insertLineIndex + 1 (nueva línea)
                let newLineIndex: number;
                if (startsWithNewline) {
                  // Si comienza con \n, pastedLineIndex 0 es vacía, pastedLineIndex 1 es la primera línea real
                  // que debe ir en insertLineIndex + 1 (nueva línea)
                  newLineIndex = insertLineIndex + pastedLineIndex;
                } else {
                  newLineIndex = insertLineIndex + pastedLineIndex;
                }

                // Si es la primera línea con contenido y hay un salto de línea al inicio,
                // el texto se pega en una nueva línea, así que wordIndex empieza desde 0
                const isFirstContentLine = startsWithNewline && relativeLineIndexForChords === 0;
                const newWordIndex = isFirstContentLine
                  ? wordIndex
                  : pastedLineIndex === 0
                    ? baseWordOffset + wordIndex
                    : wordIndex;
                const newTokenId = `line-${newLineIndex}-word-${newWordIndex}-${cleanPastedWord}`;

                // Copiar acordes desde el clipboard si existen
                // Usar relativeLineIndexForChords para la clave relativa (ignora líneas vacías)
                for (let i = 0; i < numMarkers; i++) {
                  const relativeKey = `${relativeLineIndexForChords}-${wordIndex}-${i}`;
                  const newMarkerTokenId = `${newTokenId}-marker-${i}`;

                  // Si hay un acorde copiado para esta posición relativa, usarlo
                  if (copiedChordsRef.current[relativeKey]) {
                    newChords[newMarkerTokenId] = copiedChordsRef.current[relativeKey];
                  }
                }
              });

              // Solo incrementar si la línea tenía contenido
              if (pastedLine.trim().length > 0) {
                relativeLineIndexForChords++;
              }
            });

            // Actualizar texto y acordes
            setText(newText);
            setChords(newChords);

            // Restaurar posición del cursor después del texto pegado
            setTimeout(() => {
              const newCursorPos = start + pastedText.length;
              textarea.setSelectionRange(newCursorPos, newCursorPos);
              textarea.focus();
            }, 0);
          }}
          readOnly={readonly}
          className="relative w-full h-full min-h-full leading-12 outline-hidden whitespace-pre-wrap font-mono text-base resize-none bg-transparent"
          style={{
            caretColor: 'currentColor',
            paddingLeft: '0.25rem', // pequeño padding para alinear con markers tras el gutter
          }}
          spellCheck={false}
          aria-label={readonly ? 'Editor de texto (solo lectura)' : 'Editor de texto'}
          aria-multiline="true"
        />
      </div>
    </div>
  );
}
