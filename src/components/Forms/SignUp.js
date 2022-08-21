import React, { useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Error from '../Error/Error';
import { fetchRegisterUser } from '../../services/realWorldBlogService';

// import './Form.module.scss';
import style from './Form.module.scss';

const SignUp = () => {
  const error = useSelector((state) => state.user.errorMessage);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setError,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (date) => {
    const user = {
      username: date.username,
      email: date.email,
      password: date.password,
    };
    dispatch(fetchRegisterUser({ user }));
  };

  useEffect(() => {
    if (error.username) {
      setError('username', {
        message: `${error.username}`,
      });
    }
    if (error.email) {
      setError('email', {
        message: `${error.email}`,
      });
    }
  }, [error]);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Create new account</h1>
            <label>
              Username
              <input
                className={errors?.username && style.error__color}
                placeholder="some-username"
                {...register('username', {
                  required: 'Required field',
                  minLength: {
                    value: 3,
                    message: 'At least 3 characters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum 20 character',
                  },
                })}
              />
              {errors?.username && <p>{errors.username.message}</p>}
            </label>
            <label>
              Email address
              <input
                className={errors?.email && style.error__color}
                placeholder="alex@example.com"
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
            <label>
              Repeat password
              <input
                className={errors?.password_repeat && style.error__color}
                type="password"
                {...register('password_repeat', {
                  validate: (value) => value === watch('password') || 'The passwords do not match',
                })}
              />
              {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
            </label>
            <label className={style.checkBox__label}>
              <input
                type="checkbox"
                {...register('checkbox', {
                  required: 'I agree to the processing of my personal information',
                })}
              />
              I agree to the processing of my personal information
            </label>

            <input type="submit" value="Create" disabled={!isValid} />
            <b>
              Already have an account?{' '}
              <Link to="/sign-in" className={style.form__link}>
                Sign In.
              </Link>
            </b>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default SignUp;
