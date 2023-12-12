import { ReactNode } from 'react';

import { Logo } from '../../components/Icons/Logo';
import { UnionIcon } from '../../components/Icons/UnionIcon';
import { ProfileIcon } from '../../components/Icons/ProfileIcon';
import { DocIcon } from '../../components/Icons/DocIcon';
import { MessageIcon } from '../../components/Icons/MessageIcon';
import { ImagesIcon } from '../../components/Icons/ImagesIcon';
import { CommunityIcon } from '../../components/Icons/CommunityIcon';
import { DealIcon } from '../../components/Icons/DealIcon';
import { CoinDollarIcon } from '../../components/Icons/CoinDollarIcon';
import { CoinsIcon } from '../../components/Icons/CoinsIcon';
import { ExitIcon } from '../../components/Icons/ExitIcon';
import { UserIcon } from '../../components/Icons/UserIcon';

export interface IMenuItem {
    key: string
    icon: ReactNode
}
export const menuItems: Array<IMenuItem> = [
  {
    key: 'logo',
    icon: <Logo />
  },
  {
    key: 'avatar',
    icon: <UserIcon />
  },
  {
    key: 'union',
    icon: <UnionIcon />
  },
  {
    key: 'profile',
    icon: <ProfileIcon />
  },
  {
    key: 'docs',
    icon: <DocIcon />
  },
  {
    key: 'messages',
    icon: <MessageIcon />
  },
  {
    key: 'images',
    icon: <ImagesIcon />
  },
  {
    key: 'community',
    icon: <CommunityIcon />
  },
  {
    key: 'deals',
    icon: <DealIcon />
  },
  {
    key: 'dollar',
    icon: <CoinDollarIcon />
  },
  {
    key: 'coins',
    icon: <CoinsIcon />
  },
  {
    key: 'exit',
    icon: <ExitIcon />
  },
];