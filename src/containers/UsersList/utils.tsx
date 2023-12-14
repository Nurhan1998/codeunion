import * as React from 'react';
import { ReactNode } from 'react';

import { EModalNames, TNullable } from '../../store/users';
import { ConfirmationModal } from '../../components/Modals/confirmationModal/ConfiramationModal';
import { SendInvitationModal } from '../../components/Modals/sendInvitationModal/SendInvitationModal';
import { UserDataForm } from '../../components/Modals/editUserForm/UserDataForm';


export const getCurrentModal = (handleClose: () => void, activeModal: TNullable<EModalNames>): ReactNode => {
  if(activeModal === null) return activeModal;

  const modals = {
    [EModalNames.SEND_INVITATION_SUCCESS]:
  <ConfirmationModal
    onClose={handleClose}
    btnText="Закрыть"
    title="Приглашение отправлено на почту example@email.com"
  />,
    [EModalNames.SEND_INVITATION]: <SendInvitationModal/>,
    [EModalNames.CREATE_USER]: <UserDataForm/>,
    [EModalNames.EDIT_USER]: <UserDataForm/>,
    [EModalNames.DELETE_USER_SUCCESS]:
  <ConfirmationModal
    onClose={handleClose}
    title="Пользователь успешно удален"
    btnText="Закрыть"
  />,
  };

  return modals[activeModal];
};

