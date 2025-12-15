'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getSelection, setCaretPosition, setCaretToEnd } from '@/lib/caret-utils';
import { cn } from '@/lib/utils';
import { useEditor } from '@/provider/editor-provider';
import { ChordMarker } from './chord-marker';

interface Props {
  readonly?: boolean;
  className?: string;
}

export function ChordEditor({ readonly = false }: Props) {
  const { text, setText, chords } = useEditor();
  const [blocks, setBlocks] = useState<{ id: string; content: string }[]>(
    text.split('\n').map((line, index) => ({ id: `block-${index}`, content: line }))
  );
  const editorRef = useRef<HTMLDivElement>(null);
  const isComposingRef = useRef(false);
  const caretPositionsRef = useRef<Map<string, number>>(new Map());
  const editingBlocksRef = useRef<Set<string>>(new Set());
  const blockRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Sincronizar contenido del DOM solo cuando el bloque no está siendo editado
  useEffect(() => {
    blocks.forEach(block => {
      const element = blockRefs.current.get(block.id);

      if (element && !editingBlocksRef.current.has(block.id)) {
        const currentContent = element.innerText || element.textContent || '';

        if (currentContent !== block.content) {
          const selection = getSelection(element);
          const cursorPosition = selection.selectionStart || 0;

          element.innerText = block.content;

          // Restaurar posición del cursor si había una guardada
          if (caretPositionsRef.current.has(block.id)) {
            const savedPosition = caretPositionsRef.current.get(block.id)!;
            setCaretPosition(element, savedPosition);
            caretPositionsRef.current.delete(block.id);
          } else if (cursorPosition > 0) {
            // Intentar mantener la posición del cursor
            const newPosition = Math.min(cursorPosition, block.content.length);
            setCaretPosition(element, newPosition);
          }
        }
      }
    });
  }, [blocks]);

  useEffect(() => {
    // Solo actualizar bloques si no estamos en medio de una composición (IME)
    // y si no hay bloques siendo editados activamente
    if (!isComposingRef.current && editingBlocksRef.current.size === 0) {
      const newBlocks = text.split('\n').map((line, index) => ({ id: `block-${index}`, content: line }));
      setBlocks(newBlocks);
    }
  }, [text]);

  // Manejador del teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    const element = e.currentTarget;
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;
    const currentBlock = blocks[index];

    // Ctrl/Cmd + A: Seleccionar todo
    if (e.key === 'a' && ctrlOrCmd) {
      e.preventDefault();
      const editor = editorRef.current;

      if (!editor) return;

      const range = document.createRange();

      range.selectNodeContents(editor);
      const sel = window.getSelection();

      sel!.removeAllRanges();
      sel!.addRange(range);
      return;
    }

    // Ctrl/Cmd + C: Copiar
    if (e.key === 'c' && ctrlOrCmd) {
      // Permitir el comportamiento por defecto del navegador
      return;
    }

    // Ctrl/Cmd + V: Pegar
    if (e.key === 'v' && ctrlOrCmd) {
      // Permitir el comportamiento por defecto del navegador
      // El evento onInput se encargará de actualizar el estado
      return;
    }

    // Ctrl/Cmd + X: Cortar
    if (e.key === 'x' && ctrlOrCmd) {
      // Permitir el comportamiento por defecto del navegador
      // El evento onInput se encargará de actualizar el estado
      return;
    }

    // Ctrl/Cmd + Z: Deshacer (no implementado, pero prevenimos el comportamiento por defecto)
    if (e.key === 'z' && ctrlOrCmd && !e.shiftKey) {
      e.preventDefault();
      // TODO: Implementar deshacer si es necesario
      return;
    }

    // Ctrl/Cmd + Shift + Z o Ctrl/Cmd + Y: Rehacer
    if ((e.key === 'z' && ctrlOrCmd && e.shiftKey) || (e.key === 'y' && ctrlOrCmd)) {
      e.preventDefault();
      // TODO: Implementar rehacer si es necesario
      return;
    }

    // Tab: Insertar tabulación (comportamiento estándar de textarea)
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const sel = window.getSelection();

      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const tabNode = document.createTextNode('\t');

      range.deleteContents();
      range.insertNode(tabNode);
      range.setStartAfter(tabNode);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);

      // Disparar evento input para actualizar el estado
      element.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }

    // Shift + Tab: Comportamiento por defecto (navegación)
    if (e.key === 'Tab' && e.shiftKey) {
      // Permitir navegación hacia atrás
      return;
    }

    // Enter: Nueva línea
    if (e.key === 'Enter') {
      e.preventDefault();
      const sel = document.getSelection();

      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const offset = range.startOffset;

      // Si el cursor está al inicio del bloque y hay un bloque anterior, mover al final del anterior
      if (offset === 0 && index > 0) {
        const prevBlock = blockRefs.current.get(blocks[index - 1].id);

        if (prevBlock) {
          setCaretToEnd(prevBlock);
        }
        return;
      }

      // Si el cursor no está al final del bloque, divido el bloque según el cursor
      if (offset !== currentBlock.content.length) {
        const before = currentBlock.content.slice(0, offset);
        const after = currentBlock.content.slice(offset);
        const updatedBlocks = [...blocks];

        updatedBlocks[index] = { ...currentBlock, content: before };
        updatedBlocks.splice(index + 1, 0, {
          id: 'block-' + Date.now(),
          content: after,
        });
        setText(updatedBlocks.map(block => block.content).join('\n'));

        requestAnimationFrame(() => {
          const nextBlockId = updatedBlocks[index + 1].id;
          const nextBlockElem = blockRefs.current.get(nextBlockId);

          if (nextBlockElem) {
            setCaretToEnd(nextBlockElem);
          }
        });
      } else {
        // Si el cursor está al final de la linea añadir una nueva linea abajo
        const updatedBlocks = [...blocks];

        updatedBlocks.splice(index + 1, 0, {
          id: 'block-' + Date.now(),
          content: '',
        });
        setBlocks(updatedBlocks);
        setText(updatedBlocks.map(block => block.content).join('\n'));

        requestAnimationFrame(() => {
          const nextBlockId = updatedBlocks[index + 1].id;
          const nextBlockElem = blockRefs.current.get(nextBlockId);

          if (nextBlockElem) {
            setCaretToEnd(nextBlockElem);
          }
        });
      }
      return;
    }

    // Backspace: Eliminar caracteres
    if (e.key === 'Backspace') {
      const sel = window.getSelection();

      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const offset = range.startOffset;
      const hasSelection = range.toString().length > 0;

      // Si hay selección, permitir el comportamiento por defecto
      if (hasSelection) return;

      // Si el cursor está al inicio del bloque y hay un bloque anterior, fusionar con el anterior
      if (offset === 0 && index > 0) {
        e.preventDefault();
        const prevBlock = blocks[index - 1];
        const updatedBlocks = [...blocks];

        // Fusionar el contenido del bloque actual con el anterior
        updatedBlocks[index - 1] = {
          ...prevBlock,
          content: prevBlock.content + currentBlock.content,
        };
        updatedBlocks.splice(index, 1);
        setText(updatedBlocks.map(block => block.content).join('\n'));

        requestAnimationFrame(() => {
          const mergedBlockElem = blockRefs.current.get(prevBlock.id);

          if (mergedBlockElem) {
            // Mover el cursor al final del contenido del bloque anterior
            setCaretPosition(mergedBlockElem, prevBlock.content.length);
          }
        });
        return;
      }

      // Si el bloque está vacío y hay más de un bloque, eliminar el bloque
      if (currentBlock.content === '' && blocks.length > 1) {
        e.preventDefault();
        const updatedBlocks = [...blocks];

        updatedBlocks.splice(index, 1);
        const prevBlock = updatedBlocks[index - 1];

        setText(updatedBlocks.map(block => block.content).join('\n'));

        requestAnimationFrame(() => {
          const prevBlockElem = blockRefs.current.get(prevBlock.id);

          if (prevBlockElem) {
            setCaretToEnd(prevBlockElem);
          }
        });
        return;
      }

      // Permitir el comportamiento por defecto (eliminar un carácter)
      return;
    }

    // Delete: Eliminar caracteres hacia adelante
    if (e.key === 'Delete') {
      const sel = window.getSelection();

      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const offset = range.startOffset;
      const hasSelection = range.toString().length > 0;

      // Si hay selección, permitir el comportamiento por defecto
      if (hasSelection) return;

      // Si el cursor está al final del bloque y hay un bloque siguiente, fusionar con el siguiente
      if (offset === currentBlock.content.length && index < blocks.length - 1) {
        e.preventDefault();
        const nextBlock = blocks[index + 1];
        const updatedBlocks = [...blocks];

        // Fusionar el contenido del bloque siguiente con el actual
        updatedBlocks[index] = {
          ...currentBlock,
          content: currentBlock.content + nextBlock.content,
        };
        updatedBlocks.splice(index + 1, 1);
        setText(updatedBlocks.map(block => block.content).join('\n'));

        requestAnimationFrame(() => {
          const mergedBlockElem = blockRefs.current.get(currentBlock.id);

          if (mergedBlockElem) {
            // Mantener el cursor en la misma posición (al final del contenido original)
            setCaretPosition(mergedBlockElem, currentBlock.content.length);
          }
        });
        return;
      }

      // Permitir el comportamiento por defecto
      return;
    }

    // Home: Ir al inicio de la línea
    if (e.key === 'Home') {
      e.preventDefault();
      const sel = window.getSelection();

      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);

      if (e.ctrlKey || e.metaKey) {
        // Ctrl/Cmd + Home: Ir al inicio del primer bloque
        const firstBlock = blockRefs.current.get(blocks[0].id);

        if (firstBlock) {
          const newRange = document.createRange();

          newRange.selectNodeContents(firstBlock);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
          firstBlock.focus();
        }
      } else {
        // Home: Ir al inicio de la línea actual
        range.setStart(element, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      return;
    }

    // End: Ir al final de la línea
    if (e.key === 'End') {
      e.preventDefault();
      const sel = window.getSelection();

      if (!sel || sel.rangeCount === 0) return;

      if (e.ctrlKey || e.metaKey) {
        // Ctrl/Cmd + End: Ir al final del último bloque
        const lastBlock = blockRefs.current.get(blocks[blocks.length - 1].id);

        if (lastBlock) {
          setCaretToEnd(lastBlock);
        }
      } else {
        // End: Ir al final de la línea actual
        setCaretToEnd(element);
      }
      return;
    }

    // Flechas arriba/abajo: Navegación entre bloques
    if (e.key === 'ArrowUp') {
      const sel = window.getSelection();

      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const offset = range.startOffset;

      // Si el cursor está al inicio del bloque y hay un bloque anterior, mover al bloque anterior
      if (offset === 0 && index > 0) {
        e.preventDefault();
        const prevBlock = blockRefs.current.get(blocks[index - 1].id);

        if (prevBlock) {
          setCaretToEnd(prevBlock);
        }
        return;
      }

      // Permitir el comportamiento por defecto para navegación básica
      return;
    }

    if (e.key === 'ArrowDown') {
      const sel = window.getSelection();

      if (!sel || sel.rangeCount === 0) return;

      const range = sel.getRangeAt(0);
      const offset = range.startOffset;
      const currentContent = element.innerText || element.textContent || '';

      // Si el cursor está al final del bloque y hay un bloque siguiente, mover al bloque siguiente
      if (offset === currentContent.length && index < blocks.length - 1) {
        e.preventDefault();
        const nextBlock = blockRefs.current.get(blocks[index + 1].id);

        if (nextBlock) {
          const newRange = document.createRange();

          newRange.selectNodeContents(nextBlock);
          newRange.collapse(true);
          sel.removeAllRanges();
          sel.addRange(newRange);
          nextBlock.focus();
        }
        return;
      }

      // Permitir el comportamiento por defecto para navegación básica
      return;
    }

    // Flechas izquierda/derecha: Navegación dentro del bloque
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      // Permitir el comportamiento por defecto
      // Ctrl/Cmd + flecha para saltar palabras también funciona por defecto
      return;
    }

    // Permitir todos los demás caracteres (letras, números, símbolos, etc.)
    // El comportamiento por defecto del contentEditable los manejará
  };

  // Manejador del input, se llama cuando el contenido editable cambia
  const handleInput = (e: React.FormEvent<HTMLDivElement>, index: number) => {
    const element = e.currentTarget;
    const newContent = element.innerText || element.textContent || '';
    const updatedBlocks = [...blocks];
    const currentBlock = blocks[index];

    // Solo actualizar si el contenido realmente cambió
    if (currentBlock.content !== newContent) {
      // Guardar la posición actual del cursor antes de actualizar
      const selection = getSelection(element);
      const cursorPosition = selection.selectionStart || 0;

      updatedBlocks[index].content = newContent;
      setText(updatedBlocks.map(block => block.content).join('\n'));

      // Guardar la posición del cursor usando el ID del bloque para restaurarla después del re-render
      caretPositionsRef.current.set(currentBlock.id, cursorPosition);
    }
  };

  const renderChordMarkers = (line: string, lineIndex: number) => {
    const words = line.split(' ');
    const markers: React.ReactNode[] = [];
    let charCount = 0;

    words.forEach((word, wordIndex) => {
      if (word.trim().length > 0) {
        const lineStart = text.split('\n').slice(0, lineIndex).join('\n').length + lineIndex;
        const wordMarkers: React.ReactNode[] = [];
        const numMarkers = Math.max(1, Math.floor(word.length / 2));

        for (let i = 0; i < numMarkers; i++) {
          const absoluteIndex = lineStart + charCount + word.length + i;

          wordMarkers.push(
            <ChordMarker
              key={`market-${lineIndex}-${wordIndex}-${i}-${absoluteIndex}`}
              chord={
                chords[absoluteIndex] || (
                  <div className="bg-border mx-auto aspect-square h-[10px] w-[10px] rounded-full" />
                )
              }
              readonly={readonly}
              onRemove={() => {}}
              onSelectChordAction={() => {}}
            />
          );
        }

        markers.push(
          <div
            key={`word-${word}-${lineIndex}-${wordIndex}`}
            className="absolute flex h-6 items-center justify-evenly font-mono text-base"
            style={{
              left: `${charCount}ch`,
              width: `${word.length}ch`,
              top: '-0.5rem',
              pointerEvents: 'none',
            }}
          >
            {wordMarkers}
          </div>
        );
      }

      charCount += word.length + 1; // +1 for the space
    });

    return markers;
  };

  return (
    <div className="relative h-full w-full font-mono text-base" dir="ltr">
      <div ref={editorRef} className="relative h-full w-full font-mono text-base" dir="ltr">
        {blocks.map((block, index) => (
          <React.Fragment key={block.id}>
            <div className={cn('absolute font-mono', readonly && 'pointer-events-none')}>
              {renderChordMarkers(block.content, index)}
            </div>
            <div
              ref={el => {
                if (el) {
                  blockRefs.current.set(block.id, el);
                  // Inicializar contenido solo si el elemento está vacío y no está siendo editado
                  if (!editingBlocksRef.current.has(block.id) && (!el.innerText || el.innerText !== block.content)) {
                    el.innerText = block.content;
                  }
                } else {
                  blockRefs.current.delete(block.id);
                }
              }}
              contentEditable
              role="textbox"
              aria-multiline="true"
              aria-label={readonly ? 'Editor de texto (solo lectura)' : 'Editor de texto'}
              aria-readonly={readonly}
              aria-autocomplete="none"
              aria-haspopup="false"
              suppressContentEditableWarning
              tabIndex={readonly ? -1 : 0}
              className="leading-12 outline-hidden whitespace-pre-wrap font-mono text-base"
              id={block.id}
              onInput={e => handleInput(e, index)}
              onKeyDown={e => handleKeyDown(e, index)}
              onPaste={e => {
                // Permitir pegar, pero limpiar el formato
                e.preventDefault();
                const text = e.clipboardData.getData('text/plain');
                const sel = window.getSelection();

                if (!sel || sel.rangeCount === 0) return;

                const range = sel.getRangeAt(0);

                range.deleteContents();
                const textNode = document.createTextNode(text);

                range.insertNode(textNode);
                range.setStartAfter(textNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);

                // Disparar evento input para actualizar el estado
                e.currentTarget.dispatchEvent(new Event('input', { bubbles: true }));
              }}
              onFocus={() => {
                editingBlocksRef.current.add(block.id);
              }}
              onBlur={() => {
                editingBlocksRef.current.delete(block.id);
              }}
              onCompositionStart={() => {
                isComposingRef.current = true;
                editingBlocksRef.current.add(block.id);
              }}
              onCompositionEnd={() => {
                isComposingRef.current = false;
                setTimeout(() => {
                  editingBlocksRef.current.delete(block.id);
                }, 0);
              }}
              spellCheck={false}
              suppressHydrationWarning
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
