type UnauthorizedListener = () => void;

let onUnauthorized: UnauthorizedListener | null = null;

export const sessionEvents = {
  setOnUnauthorized(listener: UnauthorizedListener | null) {
    onUnauthorized = listener;
  },
  notifyUnauthorized() {
    onUnauthorized?.();
  },
};
