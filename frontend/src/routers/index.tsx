// Dependecies for routing import
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

// Pages for routing import
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import CategoryPage from '../pages/CategoryPage';
import LoginPage from '../pages/LoginPage';
import TagPage from '../pages/TagPage';
import RegisterPage from '../pages/RegisterPage';
import { ErrorPage } from '../components/Error';

// Components for routing import
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AccountActivation from '../components/AccountActivation';
import ForgotPasswordPage from '../pages/ForgotPswordPage';
import UserDashboardPage from '../pages/userDashbordPage';
import ResetPasswordActivation from '../components/resetPasswordActivation';
import ResetPasswordPage from '../pages/ResetPasswordPage';

const Index = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Routing here on clicking link in email */}
            <Route
              // make sure to set full route!!!
              path="/api/v1/users/activate/:token"
              element={<AccountActivation />}
            />
            <Route
              // make sure to set full route!!!
              path="/api/v1/users/verify-password/:token"
              element={<ResetPasswordActivation />}
            />
            <Route path="/article" element={<ArticlePage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/tag" element={<TagPage />} />
            <Route path="/user-dashbord" element={<UserDashboardPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter>
    </div>
  );
};

export default Index;
