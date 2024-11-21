"use client";

const getCaretCoordinates = (fromStart = true) => {
  let x, y;
  const isSupported = typeof window !== "undefined" && typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    if (selection == null) return { x: 0, y: 0 };
    if (selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      range.collapse(fromStart ? true : false);
      const rect = range.getClientRects()[0];
      if (rect) {
        x = rect.left;
        y = rect.top;
      }
    }
  }
  return { x, y };
};

export const getSelection = (element: HTMLElement) => {
  let selectionStart, selectionEnd;
  const isSupported = typeof window !== "undefined" && typeof window.getSelection !== "undefined";
  if (isSupported && window.getSelection() != null) {
    const range = window.getSelection()!.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(element);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    selectionStart = preSelectionRange.toString().length;
    selectionEnd = selectionStart + range.toString().length;
  }
  return { selectionStart, selectionEnd };
};

export const setCaretToEnd = (element: Node & {
  focus: () => void;
}) => {
  const isSupported = typeof window !== "undefined" && typeof window.getSelection !== "undefined";
  if (!isSupported) return;
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus();
};
