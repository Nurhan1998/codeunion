import { Dispatch, FC, MouseEvent, SetStateAction, useMemo, useRef } from 'react';
import { Button, Checkbox } from 'antd';

import useOutsideClick from '../../../shared/utils/useOutsideClick';
import { TNullable } from '../../../store/users';
import cn from '../../../shared/utils/classNames';

import { ArrowIcon } from '../../Icons/ArrowIcon';

import styles from './dropdown.module.scss';

interface IDropdownProps {
  name: string
  isShown: boolean
  setShown: Dispatch<SetStateAction<boolean>>
  options: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
  selected: string[]
}

export const Dropdown: FC<IDropdownProps> = ({
  name,
  isShown,
  setShown,
  options,
  setSelected,
  selected
}) => {
  const dropdownRef = useRef<TNullable<HTMLDivElement>>(null);
  const isAllSelected = useMemo(() => options.length === selected.length, [options,selected ]);

  const handleListShownClick = () => {
    const updateState = (prevState: boolean) => {
      if(prevState) {
        setSelected(selected);
      }
      return !prevState;
    };

    setShown(updateState);
  };


  const handleCheckboxClick = (label: string) => (e: MouseEvent)  => {
    e.stopPropagation();

    const controlCheckboxes = (prevState: string[]) => {
      const isSelected = prevState.some(elem => elem === label);

      return  isSelected ? prevState.filter(elem => elem !== label) : [...prevState, label];
    };

    setSelected(controlCheckboxes);
  };

  const handleAllClick = () => {
    if(isAllSelected) {
      setSelected([]);

      return;
    }
    setSelected([...options]);
  };

  useOutsideClick(dropdownRef,() => setShown(false));

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <Button
        className={styles.listController}
        onClick={handleListShownClick}
      >
        <span className={styles.listControllerTitle}>Выберите право доступа</span>
        <span className={cn(styles.listControllerImg, {
          [styles.listControllerImg_active]: isShown
        })}>
          <ArrowIcon />
        </span>
      </Button>
      {isShown && (
        <div className={styles.dropdown__list}>
          <div className={styles.dropdown__listWrapper}>
            <div className={styles.dropdown__listRow}>
              <Checkbox
                id="all"
                key={'all'}
                checked={isAllSelected}
                onClick={handleAllClick}
              />
              <span className={styles.dropdown__listRowTitle}>Все</span>
            </div>

            {options.map(label => {
              const id = name+label;
              return (
                <div key={id} className={styles.dropdown__listRow}>
                  <Checkbox
                    id={id}
                    key={label}
                    checked={selected.includes(label)}
                    onClick={handleCheckboxClick(label)}
                  />
                  <span className={styles.dropdown__listRowTitle}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};