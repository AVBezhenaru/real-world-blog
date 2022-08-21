import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../../store/userSlice';
import { fetchGetCurrentUser } from '../../services/realWorldBlogService';
import UserProfile from '../UserProfile/UserProfile';

import style from './Header.module.scss';

const Header = () => {
  let username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  token && !username && dispatch(fetchGetCurrentUser(token));

  const logOutFunc = () => {
    localStorage.clear();
    dispatch(logOut());
  };

  return (
    <header className={style.header}>
      <div className={style.header__left}>
        <Link to="/articles" className={style.header__title}>
          Realworld Blog
        </Link>
      </div>
      {username ? (
        <UserProfile username={username} logOutFunc={logOutFunc} />
      ) : (
        <div className={style.header__right}>
          <Link to="/sign-in" className={style.header__sign_in}>
            Sign In
          </Link>
          <Link to="/sign-up" className={style.header__sign_up}>
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
