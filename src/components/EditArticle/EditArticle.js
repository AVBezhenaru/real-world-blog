import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import { fetchUpdateArticle } from '../../services/realWorldBlogService';
import Error from '../Error/Error';
import ArticleForm from '../Forms/ArticleForm';

const EditArticle = () => {
  const error = useSelector((state) => state.singleArticle.errorMessage);
  const article = useSelector((state) => state.singleArticle.article);
  const loading = useSelector((state) => state.singleArticle.loading);
  let { slug } = useParams();

  return (
    <Fragment>
      {error.message ? (
        <Error message={error.message} />
      ) : (
        <div>
          <div>{loading && <BeatLoader cssOverride={{ textAlign: 'center' }} color={'#1890FF'} />}</div>
          <ArticleForm name={'Edit article'} articleProps={article} fetchArticleData={fetchUpdateArticle} slug={slug} />
        </div>
      )}
    </Fragment>
  );
};

export default EditArticle;
