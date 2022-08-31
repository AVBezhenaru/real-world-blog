import React, { useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';

import Error from '../Error/Error';
import { fetchLoginUser } from '../../services/realWorldBlogService';

import style from './Form.module.scss';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.errorMessage);
  const username = useSelector((state) => state.user.username);
  const loading = useSelector((state) => state.user.loading);

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (date) => {
    const user = {
      email: date.email,
      password: date.password,
    };
    clearErrors();
    dispatch(fetchLoginUser({ user }));
  };

  useEffect(() => {
    if (username) {
      return navigate('/');
    }
  }, [username]);

  return (
    <Fragment>
      {error.message ? (
        <Error message={error.message} />
      ) : (
        <div>
          <div>{loading && <BeatLoader cssOverride={{ textAlign: 'center' }} color={'#1890FF'} />}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign In</h1>

            <label>
              Email address
              <input
                className={errors?.email && style.error__color}
                {...register('email', {
                  required: 'Required field',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Type valid email',
                  },
                })}
              />
              {errors?.email && <p>{errors.email.message}</p>}
            </label>
            <label>
              Password
              <input
                className={errors?.password && style.error__color}
                type="password"
                {...register('password', {
                  required: 'You must specify a password',
                  minLength: {
                    value: 6,
                    message: 'Password must have at least 6 characters',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Password must have maximum 40 characters',
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </label>
            {error && <div className={style.error__message}>{'Email or password is invalid'}</div>}
            <input type="submit" value="Login" disabled={loading} />
            <b>
              Don’t have an account?
              <Link to="/sign-up" className={style.form__link}>
                Sign Up.
              </Link>
            </b>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default SignIn;
