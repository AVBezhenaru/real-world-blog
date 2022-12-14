import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './Form.module.scss';

const ArticleForm = ({ name, articleProps, fetchArticleData, slug }) => {
  const loading = useSelector((state) => state.singleArticle.loading);
  const inputRef = useRef(null);
  const [tags, setTags] = useState(articleProps ? articleProps.tagList : []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickAdd = (e) => {
    e.preventDefault();
    inputRef.current.value && setTags([...tags, inputRef.current.value]);
    inputRef.current.value = '';
    inputRef.current.focus();
  };

  const handleClickDelete = (e, index) => {
    e.preventDefault();
    const list = [...tags];
    list.splice(index, 1);
    setTags(list);
  };

  const handleChangeEdit = (e, index) => {
    const list = [...tags];
    list[index] = e.target.value;
    setTags(list);
  };

  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (date) => {
    const articleData = {
      article: {
        title: date.title,
        description: date.description,
        body: date.text,
        tagList: !inputRef.current.value ? tags : [...tags, inputRef.current.value],
      },
    };
    clearErrors();
    dispatch(fetchArticleData([articleData, slug])).then((data) => {
      data && navigate(`/articles/${data.payload.article.slug}`);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.article__form}>
        <h1>{name}</h1>
        <label>
          Title
          <input
            className={errors?.title && style.error__color}
            placeholder="Title"
            {...register('title', { required: 'Required field' })}
            defaultValue={articleProps ? articleProps.title : ''}
          />
          {errors?.title && <p>{errors.title.message}</p>}
        </label>
        <label>
          Short description
          <input
            className={errors?.description && style.error__color}
            placeholder="Description"
            {...register('description', { required: 'Required field' })}
            defaultValue={articleProps ? articleProps.description : ''}
          />
          {errors?.description && <p>{errors.description.message}</p>}
        </label>
        <label>
          Text
          <textarea
            rows="8"
            className={errors?.text && style.error__color}
            placeholder="Text"
            {...register('text', { required: 'Required field' })}
            defaultValue={articleProps ? articleProps.body : ''}
          />
          {errors?.text && <p>{errors.text.message}</p>}
        </label>
        <label className={style.tags}>
          Tags
          {tags.map((tag, index) => {
            return (
              <div className={style.tags__wrap} key={index}>
                <input value={tag} onChange={(e) => handleChangeEdit(e, index)} />
                <button onClick={(e) => handleClickDelete(e, index)} className={style.tags__button_delete}>
                  Delete
                </button>
              </div>
            );
          })}
          <div className={style.tags__wrap}>
            <input ref={inputRef} />
            <button className={style.tags__button_add} onClick={handleClickAdd}>
              Add tag
            </button>
          </div>
        </label>
        <input type="submit" value="Send" className={style.send__btn} disabled={loading} />
      </form>
    </div>
  );
};

export default ArticleForm;
