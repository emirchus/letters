'use client';

export const getCaretCoordinates = (fromStart = true) => {
  let x, y;
  const isSupported = typeof window !== 'undefined' && typeof window.getSelection !== 'undefined';

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
  const isSupported = typeof window !== 'undefined' && typeof window.getSelection !== 'undefined';

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

export const setCaretToEnd = (element: HTMLElement) => {
  const isSupported = typeof window !== 'undefined' && typeof window.getSelection !== 'undefined';

  if (!isSupported) return;

  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(element);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus();
};

export const setCaretPosition = (element: HTMLElement, position: number) => {
  const isSupported = typeof window !== 'undefined' && typeof window.getSelection !== 'undefined';

  if (!isSupported) return;

  const range = document.createRange();
  const selection = window.getSelection();
  const textNode = element.firstChild || element;

  if (textNode.nodeType === Node.TEXT_NODE) {
    const textLength = textNode.textContent?.length || 0;
    const safePosition = Math.min(position, textLength);
    range.setStart(textNode, safePosition);
    range.setEnd(textNode, safePosition);
  } else {
    range.selectNodeContents(element);
    range.collapse(true);
    let currentPos = 0;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);

    let node;
    while ((node = walker.nextNode())) {
      const nodeLength = node.textContent?.length || 0;
      if (currentPos + nodeLength >= position) {
        range.setStart(node, position - currentPos);
        range.setEnd(node, position - currentPos);
        break;
      }
      currentPos += nodeLength;
    }
  }

  selection?.removeAllRanges();
  selection?.addRange(range);
  element.focus();
};
