interface CreateThrottledVibrationHandlerProps {
  intervalMs?: number;
  durationMs?: number;
}

export const createThrottledVibrationHandler = ({
  intervalMs = 100,
  durationMs = 8,
}: CreateThrottledVibrationHandlerProps = {}) => {
  let lastVibrationAt = 0;

  return () => {
    if (
      typeof navigator === 'undefined' ||
      typeof navigator.vibrate !== 'function'
    ) {
      return;
    }

    const now = performance.now();
    if (now - lastVibrationAt < intervalMs) {
      return;
    }

    lastVibrationAt = now;
    navigator.vibrate(durationMs);
  };
};
