import { FC, PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';

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

    const popupStyles: ICursorPosition = {
      top: cursorPosition.top,
      left: cursorPosition.left
    };

    if (typeof popupWidth === 'number') {
      popupStyles.left = popupStyles.left - popupWidth;
    }

    if (typeof popupHeight === 'number') {
      popupStyles.top = popupStyles.top - (popupHeight / 2) - 20;
    }


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
