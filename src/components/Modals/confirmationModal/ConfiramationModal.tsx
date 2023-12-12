import { Button } from 'antd';
import { FC } from 'react';

import { ModalWrapper } from '../modalWrapper/ModalWrapper';

import styles from './confirmationModal.module.scss';


export interface IConfirmationModalProps {
    title: string
    onClose: () => void
    btnText: string
}

export const ConfirmationModal: FC<IConfirmationModalProps> = ({ btnText, title, onClose }) => (
  <ModalWrapper onClose={onClose}>
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      <Button className={styles.wrapper__btn} onClick={onClose}>
        {btnText}
      </Button>
    </div>
  </ModalWrapper>
);
