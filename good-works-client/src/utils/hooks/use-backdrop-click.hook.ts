import { MutableRefObject, useEffect, useRef } from 'react';

export function useStableRef<T>(value: T): MutableRefObject<T> {
  const ref = useRef<T>(value);

  ref.current = value;

  return ref;
}


export function useBackdropClick(
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void,
  active: boolean,
) {
  const stableCallback = useStableRef(callback);
  const stableActive = useStableRef(active);

  useEffect(() => {
    const handler = (event: Event) => {
      if (!stableActive.current) {
        return;
      }

      if (ref.current && !event.composedPath().includes(ref.current)) {
        stableCallback.current();
        event.stopPropagation();
      }
    };

    document.addEventListener('mousedown', handler, { capture: true });

    return () => document.removeEventListener('click', handler);
  }, []);
}
