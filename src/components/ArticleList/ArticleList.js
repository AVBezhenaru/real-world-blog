import React, { Fragment, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { format } from 'date-fns';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';

import { setPage } from '../../store/articleSlice';
import { fetchGetArticles, fetchFavoriteArticle, fetchUnFavoriteArticle } from '../../services/realWorldBlogService';
import Error from '../Error/Error';

import style from './ArticleList.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articleList);
  const articleCount = useSelector((state) => state.articles.articleCount);
  const loading = useSelector((state) => state.articles.loading);
  const error = useSelector((state) => state.articles.error);
  const errorMessage = useSelector((state) => state.articles.errorMessage);
  const loadFavorite = useSelector((state) => state.singleArticle.loading);
  const pageNumber = useSelector((state) => state.articles.pageNumber);
  const token = localStorage.getItem('token');

  useEffect(() => {
    !loadFavorite && dispatch(fetchGetArticles((pageNumber - 1) * 5));
  }, [pageNumber, loadFavorite]);

  return (
    <Fragment>
      {error ? (
        <Error message={errorMessage.message} />
      ) : (
        <Fragment>
          {articles === null ? (
            <BeatLoader cssOverride={{ textAlign: 'center' }} color={'#1890FF'} />
          ) : (
            <div>
              <ul>
                {articles.map((article) => {
                  return (
                    <li key={article.slug} className={style.article}>
                      <div className={style.article__left}>
                        <div className={style.article__header}>
                          <Link to={`/articles/${article.slug}`} className={style.article__title}>
                            {article.title}
                          </Link>
                          <button
                            disabled={loadFavorite}
                            className={style.article__like_btn}
                            onClick={() => {
                              article.favorited
                                ? token && dispatch(fetchUnFavoriteArticle(article.slug))
                                : token && dispatch(fetchFavoriteArticle(article.slug));
                            }}
                          >
                            <svg className={article.favorited ? style.active : style.like} viewBox="0 0 100 100">
                              <path
                                className={style.heart}
                                d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z"
                              />
                            </svg>
                          </button>
                          <h3 className={style.article__likes}>{article.favoritesCount}</h3>
                        </div>
                        <ul className={style.article__tags}>
                          {article.tagList !== null && article.tagList.length
                            ? /* eslint-disable */
                              article.tagList.map((tag, index) => {
                                return (
                                  <li key={index} className={style.article__tags_item}>
                                    {tag}
                                  </li>
                                );
                              })
                            : ''}
                        </ul>
                        <p className={style.article__text}>{article.description}</p>
                      </div>
                      <div className={style.article__right}>
                        <div className={style.article__info}>
                          <div className={style.article__author}>{article.author.username}</div>
                          <div className={style.article__date}>
                            {format(new Date(article.createdAt), 'MMMM dd yyyy')}
                          </div>
                        </div>
                        <div className={style.article__author__img}>
                          <img src={article.author.image} alt="" />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className={style.article__pagination}>
                <Pagination
                  page={pageNumber}
                  shape="rounded"
                  count={Math.ceil(articleCount / 5)}
                  color="primary"
                  disabled={loading}
                  onChange={(_, page) => {
                    dispatch(setPage(page));
                  }}
                />
              </div>
              {loading ? <BeatLoader cssOverride={{ textAlign: 'center' }} color={'#1890FF'} /> : ''}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default memo(ArticleList);
