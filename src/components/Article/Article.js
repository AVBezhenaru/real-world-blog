import React, { Fragment, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import {
  fetchGetSingleArticle,
  fetchDeleteArticle,
  fetchUnFavoriteArticle,
  fetchFavoriteArticle,
} from '../../services/realWorldBlogService';
import Error from '../Error/Error';
import style from '../Article/Article.module.scss';

const Article = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { slug } = useParams();
  const article = useSelector((state) => state.singleArticle.article);
  const username = useSelector((state) => state.user.username);
  const error = useSelector((state) => state.singleArticle.errorMessage);
  const token = localStorage.getItem('token');
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchGetSingleArticle(slug));
  }, [dispatch]);

  return (
    <Fragment>
      {error ? (
        <Error message={error} />
      ) : (
        <Fragment>
          {article !== null && (
            <div key={article.slug} className={style.article}>
              <div className={style.article__header}>
                <div className={style.article__left_header}>
                  <Link to={`/articles/${article.slug}`} className={style.article__title}>
                    {article.title}
                  </Link>
                  <button
                    className={style.article__like_btn}
                    onClick={() => {
                      article.favorited
                        ? token && dispatch(fetchUnFavoriteArticle(article.slug))
                        : token && dispatch(fetchFavoriteArticle(article.slug));
                    }}
                  >
                    <svg className={article.favorited ? style.active : style.like} viewBox="0 0 100 100">
                      <path className={style.heart} d="M 90,40 a 20 20 0 1 0 -40,-25 a 20 20 0 1 0 -40,25 l 40,50  z" />
                    </svg>
                  </button>
                  <h3 className={style.article__likes}>{article.favoritesCount}</h3>
                  <ul className={style.article__tags}>
                    {article.tagList.length
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
                <div className={style.article__right_header}>
                  <div className={style.article__info}>
                    <div className={style.article__author}>{article.author.username}</div>
                    <div className={style.article__date}>{format(new Date(article.createdAt), 'MMMM dd yyyy')}</div>
                  </div>
                  <div className={style.article__author__img}>
                    <img src={article.author.image} alt="" />
                  </div>
                  {article.author.username === username && (
                    <div className={style.control__btns}>
                      <button className={style.control__btns_delete} onClick={() => setIsOpened(true)}>
                        Delete
                      </button>
                      <Link to={`/articles/${slug}/edit`} className={style.control__btns_edit}>
                        Edit
                      </Link>
                      {isOpened && (
                        <div className={style.modal}>
                          <p>Are you sure to delete this article?</p>
                          <div className={style.btns}>
                            <button onClick={() => setIsOpened(false)}>No</button>
                            <button
                              onClick={() =>
                                dispatch(fetchDeleteArticle(slug)).then((data) => data && navigate('/articles'))
                              }
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className={style.article__full_text}>
                <Markdown>{article.body}</Markdown>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Article;
