import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import Markdown from 'markdown-to-jsx';

import { fetchGetSingleArticle } from '../../services/realWorldBlogService';
import style from '../Article/Article.module.scss';

const Article = () => {
  const dispatch = useDispatch();
  let { slug } = useParams();
  let article = useSelector((state) => state.singleArticle.article);
  const error = useSelector((state) => state.singleArticle.error);
  const errorMessage = useSelector((state) => state.singleArticle.errorMessage);

  useEffect(() => {
    dispatch(fetchGetSingleArticle(slug));
  }, [slug]);

  return (
    <Fragment>
      {error ? (
        <div className={style.article__error_message}>{errorMessage}</div>
      ) : (
        <Fragment>
          {article === null ? (
            <BeatLoader cssOverride={{ textAlign: 'center' }} color={'#1890FF'} />
          ) : (
            <div key={article.slug} className={style.article}>
              <div className={style.article__header}>
                <Link to={`/articles/${article.slug}`} className={style.article__title}>
                  {article.title}
                </Link>
                <h3 className={style.article__likes}>{article.favoritesCount}</h3>
                <div className={style.article__right_header}>
                  <div className={style.article__info}>
                    <div className={style.article__author}>{article.author.username}</div>
                    <div className={style.article__date}>{format(new Date(article.createdAt), 'MMMM dd yyyy')}</div>
                  </div>
                  <div className={style.article__author__img}>
                    <img src={article.author.image} alt="" />
                  </div>
                </div>
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
              <p className={style.article__text}>{article.description}</p>
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
