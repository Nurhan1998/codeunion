import * as React from 'react';
import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Input, List as AntdList } from 'antd';

import {
  EModalNames,
  fetchInitialData,
  IBaseUser,
  selectActiveModal,
  selectUsersDataState,
  setActiveModal,
  TNullable
} from '../../store/users';
import { AppDispatch } from '../../store';
import cn from '../../shared/utils/classNames';
import { UserActionsPopup } from '../../components/Popups/UserActionsPopup/UserActionsPopup';
import { PointsIcon } from '../../components/Icons/PointsIcon';
import { ICursorPosition } from '../../components/base-components';
import { SearchIcon } from '../../components/Icons/SearchIcon';

import styles from './list.module.scss';
import { getCurrentModal } from './utils';


interface IDropdownState {
  isOpened: boolean,
  userData: TNullable<IBaseUser>,
  cursorPosition: TNullable<ICursorPosition>
}

export const List = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector(selectUsersDataState);
  const activeModal = useSelector(selectActiveModal);

  const [searchInputText, setSearchInputText] = useState<string>('');
  const [dropdownState, setDropdownState] = useState<IDropdownState>({
    isOpened: false,
    userData: null,
    cursorPosition: null
  });

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);


  const handleCloseModal = useCallback(() => {
    dispatch(setActiveModal(null));
  }, [dispatch]);

  const handleControlActionsDropdown = (e?: MouseEvent | ReactMouseEvent, user?: IBaseUser) => {
    if(!user) {
      setDropdownState(prevState => ({
        ...prevState,
        isOpened: false,
        userData: null,
        cursorPosition: null
      }));

      return;
    } else {
      const node = e?.target as HTMLElement;

      setDropdownState(prevState => ({
        ...prevState,
        isOpened: true,
        userData: user,
        cursorPosition: {
          top: node.getBoundingClientRect().top,
          left: node.getBoundingClientRect().left,
        }
      }));
    }
  };

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputText(e.target.value);
  };

  const handleCreateNewUser = () => {
    dispatch(setActiveModal(EModalNames.CREATE_USER));
  };


  const currentModal = useMemo<ReactNode>(() =>
    getCurrentModal(handleCloseModal, activeModal),
  [handleCloseModal, activeModal]
  );


  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Главная</h2>
        <div className={styles.header__actions}>
          <div className={cn(styles.header__search, styles.search)}>
            <Input
              className={styles.search__input}
              value={searchInputText}
              onChange={handleSearchTextChange}
            />
            <SearchIcon className={styles.search__icon}/>
          </div>


          <Button onClick={handleCreateNewUser}>
            Добавить пользователя
          </Button>
        </div>
      </div>
      <AntdList
        loading={{
          spinning: loading,
          size: 'large',
        }}
        rootClassName={cn(styles.list, {
          [styles.list_loading]: loading
        })}
        itemLayout="horizontal"
        dataSource={data ?? []}
        renderItem={item => (
          <AntdList.Item>
            <AntdList.Item.Meta
              avatar={
                <Avatar
                  className={styles.wrapper__image}
                  src={item.image}
                />
              }
              title={
                <div className={styles.wrapper__name}>
                  {item.email}
                  <span
                    className={cn(styles.wrapper__name, styles.wrapper__email)}
                  >
                    {item.email}
                  </span>
                </div>
              }
              description={
                <div className={styles.permissions}>
                  <div className={styles.permissions__list}>
                    {item.permissions &&
                      item.permissions.map(elem => (
                        <div key={elem} className={styles['permissions__list-item']}>
                          {elem}
                        </div>
                      ))
                    }
                  </div>

                  <button
                    className={styles.permissions__actions}
                    onClick={e => handleControlActionsDropdown(e,item)}
                  >
                    <PointsIcon />
                  </button>
                </div>
              }
            />
          </AntdList.Item>
        )}
      />
      <>{currentModal}</>
      {dropdownState.isOpened && dropdownState.cursorPosition && (
        <UserActionsPopup
          onClose={handleControlActionsDropdown}
          cursorPosition={dropdownState.cursorPosition}
          userData={dropdownState.userData} />
      )}
    </div>
  );
};


