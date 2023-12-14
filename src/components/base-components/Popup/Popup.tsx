import { FC, PropsWithChildren, useLayoutEffect, useMemo, useRef, useState } from 'react';

import useOutsideClick from '../../../shared/utils/useOutsideClick';
import { TNullable } from '../../../store/users';

import { ICursorPosition } from './types';


interface IUserActionsProps {
  onClose: (e: MouseEvent) => void,
  cursorPosition: ICursorPosition,
  className?: string
}
export const Popup: FC<PropsWithChildren<IUserActionsProps>> =
  ({ className, children, onClose, cursorPosition  }) => {
    const modalRef = useRef<TNullable<HTMLDivElement>>(null);
    const [popupWidth, setPopupWidth] = useState<number | undefined>();
    const [popupHeight, setPopupHeight] = useState<number | undefined>();


    const popupStyles = useMemo<ICursorPosition>(() => {
      const styles: ICursorPosition = {
        top: cursorPosition.top,
        left: cursorPosition.left
      };
      const isWidthActive = typeof popupWidth === 'number';
      const isHeightActive = typeof popupHeight === 'number';
      const rootWidth = document.getElementById('root')?.clientWidth;

      const isMobile = rootWidth ? rootWidth < 400 : false;

      if (isWidthActive) {
        const gap = isMobile ? popupWidth - 40  : popupWidth + 100;

        styles.left = styles.left - gap;
      }

      if (isHeightActive) {
        const gap = isMobile ? 50 : (popupHeight / 2) + 30;

        styles.top = styles.top - gap;
      }

      return styles;
    }, [popupHeight,popupWidth, cursorPosition]);



    useLayoutEffect(() => {
      if (modalRef.current) {
        setPopupWidth(modalRef.current.getBoundingClientRect().width);
        setPopupHeight(modalRef.current.getBoundingClientRect().height);
      }
    }, [modalRef]);

    useOutsideClick(modalRef, onClose);


    return (
      <div className={className} ref={modalRef} style={popupStyles}>
        {children}
      </div>
    );
  };
