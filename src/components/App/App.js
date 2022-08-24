import { Routes, Route } from 'react-router-dom';

import ArticleList from '../ArticleList/ArticleList';
import Article from '../Article/Article';
import CreateNewArticle from '../CreateNewArticle/CreateNewArticle';
import EditArticle from '../EditArticle/EditArticle';
import Header from '../Header/Header';
import SignUp from '../Forms/SignUp';
import SignIn from '../Forms/SignIn';
import EditProfile from '../Forms/EditProfile';
import RequireAuth from '../hoc/RequireAuth';

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
          <Route
            path="/articles/:slug/edit"
            element={
              <RequireAuth>
                <EditArticle />
              </RequireAuth>
            }
          />
          <Route
            path="/new-article"
            element={
              <RequireAuth>
                <CreateNewArticle />
              </RequireAuth>
            }
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
