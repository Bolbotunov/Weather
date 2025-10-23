import UserIcon from '@/assets/UserIcon.svg?react';
import { BlockSize, SubBlockSize } from '@/types/types';

import Block from '../Block';
import WeatherIconWrapper from '../ImageComponent';
import SubBlock from '../SubBlock';
import styles from './styles.module.scss';

import '@/styles/global.scss';

const UserBlock = ({ gridClass }: { gridClass?: string }) => {
  return (
    <Block size={BlockSize.UserBlock} gridClass={gridClass}>
      <div className={styles.wrapper}>
        <div className={styles.blockWrapper}>
          <SubBlock size={SubBlockSize.SignOutSubBlock}>Sign Out</SubBlock>
        </div>
        <div className={styles.blockWrapper}>
          <p className={styles.title}>Hello User</p>
          <WeatherIconWrapper icon={<UserIcon />} variant="small" />
        </div>
      </div>
      <div className={styles.taskWrapper}>
        <SubBlock size={SubBlockSize.UserSubBlock}>10-00 Task</SubBlock>
        <SubBlock size={SubBlockSize.UserSubBlock}>12-00 Task</SubBlock>
        <SubBlock size={SubBlockSize.UserSubBlock}>13-00 Task</SubBlock>
        <SubBlock size={SubBlockSize.UserSubBlock}>13-00 Task</SubBlock>
        <SubBlock size={SubBlockSize.UserSubBlock}>13-00 Task</SubBlock>
        <SubBlock size={SubBlockSize.UserSubBlock}>13-00 Task</SubBlock>
      </div>
    </Block>
  );
};

export default UserBlock;
