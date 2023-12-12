import { useEffect, RefObject } from 'react';

export default function useOutsideClick<T extends HTMLElement | undefined = HTMLDivElement>(
  ref: RefObject<T>,
  handler: (e: MouseEvent) => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isScrollClick = event.target === document.getElementsByTagName('html')[0] &&
               event.clientX >= document.documentElement.offsetWidth;
      const isRefClick = ref?.current && ref.current.contains(event.target as Node);

      if(isScrollClick || isRefClick) {
        return;
      }

      handler(event);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}
