import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import img from './img.png';
import style from './UserProfile.module.scss';

const UserProfile = ({ username, logOutFunc }) => {
  const avatar = useSelector((state) => state.user.img);
  return (
    <div className={style.user_profile}>
      <Link to="/new-article" className={style.create__article}>
        Create article
      </Link>
      <Link to="/profile" className={style.user__info}>
        <h2 className={style.user__name}>{username}</h2>
        <div className={style.user__img}>
          <img src={avatar ? avatar : img} alt="avatar" />
        </div>
      </Link>
      <button className={style.log_out} onClick={logOutFunc}>
        Log Out
      </button>
    </div>
  );
};

export default UserProfile;
