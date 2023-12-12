import { ChangeEvent, useState } from 'react';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';

import { userPermissions } from '../../../shared';
import { AppDispatch } from '../../../store';
import { EModalNames, setActiveModal } from '../../../store/users';

import { Dropdown } from '../../base-components';

import { ModalWrapper } from '../modalWrapper/ModalWrapper';

import styles from './sendInvitationModal.module.scss';

export const SendInvitationModal = () => {
  const [email, setEmail] = useState<string>();
  const [isDropdownShown, setDropdownShown] = useState<boolean>(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendInvite = () => {
    dispatch(setActiveModal(EModalNames.SEND_INVITATION_SUCCESS));
  };


  return (
    <ModalWrapper onClose={handleClose}>
      <div className={styles.wrapper}>
        <h2>Отправить  приглашение</h2>
        <Input
          placeholder="Введите email"
          rootClassName={styles.wrapper__input}
          value={email}
          onChange={handleEmailChange}
        />
        <Dropdown
          name="permissions"
          isShown={isDropdownShown}
          setShown={setDropdownShown}
          options={userPermissions}
          selected={selectedPermissions}
          setSelected={setSelectedPermissions}
        />

        <Button
          className={styles.wrapper__button}
          onClick={handleSendInvite}
        >
          Отправить  приглашение
        </Button>
      </div>
    </ModalWrapper>
  );
};