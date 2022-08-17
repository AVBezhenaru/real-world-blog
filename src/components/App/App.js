import { Routes, Route } from 'react-router-dom';

import ArticleList from '../ArticleList/ArticleList';
import Article from '../Article/Article';
import Header from '../Header/Header';

import style from './App.module.scss';

function App() {
  return (
    <div className={style.App}>
      <Header />

      <div className={style.body}>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<Article />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
