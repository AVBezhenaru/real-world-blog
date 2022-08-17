import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { format } from 'date-fns';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';

import { fetchGetArticles } from '../../services/realWorldBlogService';

import style from './ArticleList.module.scss';

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articleList);
  const articleCount = useSelector((state) => state.articles.articleCount);
  const loading = useSelector((state) => state.articles.loading);
  const error = useSelector((state) => state.articles.error);
  const errorMessage = useSelector((state) => state.articles.errorMessage);

  useEffect(() => {
    dispatch(fetchGetArticles(0));
  }, [dispatch]);

  return (
    <Fragment>
      {error ? (
        <div className={style.article__error_message}>{errorMessage}</div>
      ) : (
        <Fragment>
          <ul>
            {articles.map((article) => {
              return (
                <li key={article.slug} className={style.article}>
                  <div className={style.article__left}>
                    <div className={style.article__header}>
                      <Link to={`/articles/${article.slug}`} className={style.article__title}>
                        {article.title}
                      </Link>
                      <button className={style.article__like_btn}>&#9825;</button>
                      <h3 className={style.article__likes}>{article.favoritesCount}</h3>
                    </div>
                    <ul className={style.article__tags}>
                      {article.tagList.length
                        ? /* eslint-disable */
                          article.tagList.map((tag) => {
                            return (
                              <li key={`${new Date().getMilliseconds()} ${tag}`} className={style.article__tags_item}>
                                {tag}
                              </li>
                            );
                          })
                        : ''}
                    </ul>
                    <p className={style.article__text}>{article.body}</p>
                  </div>
                  <div className={style.article__right}>
                    <div className={style.article__info}>
                      <div className={style.article__author}>{article.author.username}</div>
                      <div className={style.article__date}>{format(new Date(article.createdAt), 'MMMM dd yyyy')}</div>
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
              shape="rounded"
              count={Math.ceil(articleCount / 5)}
              color="primary"
              onChange={(_, page) => {
                dispatch(fetchGetArticles((page - 1) * 5));
              }}
            />
          </div>
          {loading ? <BeatLoader cssOverride={{ textAlign: 'center' }} color={'#1890FF'} /> : ''}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ArticleList;
