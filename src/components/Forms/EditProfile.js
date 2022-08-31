import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';

import { fetchUpdateCurrentUser } from '../../services/realWorldBlogService';
import Error from '../Error/Error';

import style from './Form.module.scss';

const EditProfile = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.errorMessage);
  const loading = useSelector((state) => state.user.loading);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (date) => {
    const user = {
      username: date.username,
      email: date.email,
      password: date.password,
      image: date.url,
    };
    clearErrors();
    dispatch(fetchUpdateCurrentUser({ user }));
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

  return (
    <Fragment>
      {error.message ? (
        <Error message={error.message} />
      ) : (
        <div>
          <div>{loading && <BeatLoader cssOverride={{ textAlign: 'center' }} color={'#1890FF'} />}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Edit Profile</h1>
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
              New password
              <input
                className={errors?.password && style.error__color}
                type="password"
                placeholder="New password"
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
              Avatar image (url)
              <input
                className={errors?.url && style.error__color}
                placeholder="Avatar image"
                {...register('url', {
                  required: 'Required field',
                  pattern: {
                    value: /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim,
                    message: 'Type valid url',
                  },
                })}
              />
              {errors?.url && <p>{errors.url.message}</p>}
            </label>

            <input type="submit" value="Save" disabled={loading} />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default EditProfile;
