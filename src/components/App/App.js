import { Routes, Route } from 'react-router-dom';

import ArticleList from '../ArticleList/ArticleList';
import Article from '../Article/Article';
import Header from '../Header/Header';
import SignUp from '../Forms/SignUp';
import SignIn from '../Forms/SignIn';
import EditProfile from '../Forms/EditProfile';
import Auth from '../hoc/Auth';

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
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route
            path="/profile"
            element={
              <Auth>
                <EditProfile />
              </Auth>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
