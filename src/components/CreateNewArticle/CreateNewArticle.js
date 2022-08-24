import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';

import { fetchAddArticle } from '../../services/realWorldBlogService';
import ArticleForm from '../Forms/ArticleForm';
import Error from '../Error/Error';

const CreateNewArticle = () => {
  const error = useSelector((state) => state.singleArticle.errorMessage);
  const loading = useSelector((state) => state.singleArticle.loading);

  return (
    <Fragment>
      {error.message ? (
        <Error message={error.message} />
      ) : (
        <div>
          <div>{loading && <BeatLoader cssOverride={{ textAlign: 'center' }} color={'#1890FF'} />}</div>
          <ArticleForm name={'Create new article'} fetchArticleData={fetchAddArticle} />
        </div>
      )}
    </Fragment>
  );
};

export default CreateNewArticle;
