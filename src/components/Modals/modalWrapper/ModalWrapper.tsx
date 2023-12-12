import { PropsWithChildren, FC, useRef } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import useOutsideClick from '../../../shared/utils/useOutsideClick';
import { TNullable } from '../../../store/users';

import styles from './modalWrapper.module.scss';

type IModalWrapperProps = {
  onClose: () => void
}
export const ModalWrapper: FC<PropsWithChildren<IModalWrapperProps>> = ({ onClose, children }) => {
  const modalRef = useRef<TNullable<HTMLDivElement>>(null);

  useOutsideClick(modalRef, onClose);

  return (
    <div className={styles.wrapper} ref={modalRef}>
      <div className={styles.wrapper__icon} onClick={onClose}>
        <CloseOutlined />
      </div>
      {children}
    </div>
  );
};
