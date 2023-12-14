import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';

import { userPermissions } from '../../../shared';
import {
  createUser,
  editUser,
  IBaseUser,
  selectActiveModal,
  selectEditingUserData,
  setActiveModal, setEditingUserData
} from '../../../store/users';
import { omit } from '../../../shared/utils/omit';

import { Dropdown } from '../../base-components';

import { ModalWrapper } from '../modalWrapper/ModalWrapper';

import styles from './userDataForm.module.scss';
import { FormFields, ISendInvitationFields } from './types';
import { defaultValues, fieldsArray } from './constants';


export const UserDataForm = () => {
  const dispatch = useDispatch();

  const editingUserData = useSelector(selectEditingUserData);
  const activeModal = useSelector(selectActiveModal);


  const { handleSubmit, control, reset } = useForm<ISendInvitationFields>({
    mode: 'all',
    defaultValues: editingUserData ? omit(editingUserData, 'permissions') : defaultValues,
  });

  const [permissionsListShown, setPermissionsListShown] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<string[]>([]);

  const closeModal = () => {
    dispatch(setEditingUserData(null));
    dispatch(setActiveModal(null));
  };
  const onSubmit = (values: FormFields) => {
    const newUser: IBaseUser = {
      ...values,
      permissions: permissions,
    };

    const action = editingUserData ? editUser(newUser) :createUser(newUser);

    dispatch(action);
    closeModal();
  };
  
  const applyButtonText = useMemo(
    () =>
      editingUserData ? 'Редактировать' : 'Создать',
    [editingUserData]
  );


  useEffect(() => () => {
    if(!editingUserData) reset();
  }, [dispatch, reset]);

  useEffect(() => {
    if(editingUserData?.permissions)
      setPermissions(editingUserData.permissions);
  }, [editingUserData]);

  return (
    <ModalWrapper onClose={closeModal}>
      <div className={styles.wrapper}>
        <h2 className={styles.wrapper__title}>Отправьте приглашение</h2>
        <Form className={styles.wrapper__form} onFinish={handleSubmit(onSubmit)}>
          {fieldsArray.map(userField => (
            <Controller
              key={userField.name}
              name={userField.name}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  key={userField.name}
                  className={styles.wrapper__input}
                  placeholder={userField.placeholder}
                  name={userField.name}
                  type={'text'}
                />
              )}
            />
          ))}

          <Dropdown
            name="permissions"
            isShown={permissionsListShown}
            setShown={setPermissionsListShown}
            options={userPermissions}
            selected={permissions}
            setSelected={setPermissions}
          />

          <Button
            className={styles.wrapper__btn}
            htmlType="submit"
          >
            {applyButtonText}
          </Button>
        </Form>
      </div>
    </ModalWrapper>
  );
};
