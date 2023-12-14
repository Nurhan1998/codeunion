import { Button } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../../store';
import {
  deleteUser,
  EModalNames,
  IBaseUser,
  setActiveModal,
  setEditingUserData,
  TNullable
} from '../../../store/users';


import { Popup } from '../../base-components';
import { ICursorPosition } from '../../base-components';

import styles from './userActionsPopup.module.scss';


interface IUserActionsProps {
  userData: TNullable<IBaseUser>,
  onClose: (e?: MouseEvent) => void,
  cursorPosition: ICursorPosition
}
export const UserActionsPopup: FC<IUserActionsProps> = ({ userData, cursorPosition , onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const removeUserHandler = () => {
    if(!userData?.email) return;

    dispatch(deleteUser(userData.email));
    onClose();
    dispatch(setActiveModal(EModalNames.DELETE_USER_SUCCESS));
  };

  const sendInvitation = () => {
    onClose();
    dispatch(setActiveModal(EModalNames.SEND_INVITATION));
  };

  const editUserHandler = () => {
    if(!userData) return;

    onClose();
    dispatch(setActiveModal(EModalNames.EDIT_USER));
    dispatch(setEditingUserData(userData));
  };


  return (
    <Popup onClose={onClose} className={styles.wrapper} cursorPosition={cursorPosition}>
      <Button className={styles.wrapper__btn} onClick={editUserHandler}>
        Редактировать пользователя
      </Button>
      <Button className={styles.wrapper__btn} onClick={sendInvitation}>Отправить код повторно</Button>
      <Button className={styles.wrapper__btn} onClick={removeUserHandler}>
        Удалить
      </Button>
    </Popup>
  );
};
