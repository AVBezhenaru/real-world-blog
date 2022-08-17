import React from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.header__left}>
        <Link to="/articles" className={style.header__title}>
          Realworld Blog
        </Link>
      </div>
      <div className={style.header__right}>
        <Link to="/" className={style.header__sign_in}>
          Sign In
        </Link>
        <Link to="/" className={style.header__sign_up}>
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
