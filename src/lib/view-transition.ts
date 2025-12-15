export function startViewTransition<T>(callback: () => T) {
  if (typeof document !== "undefined" && document.startViewTransition != undefined) {
    document.startViewTransition(callback);
  } else {
    callback();
  }
}
