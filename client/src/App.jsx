import { Routes, Route } from 'react-router-dom';
import { store } from "./store";
import { Provider } from "react-redux";

import './App.scss';

import AuthContextProvider from './AuthContextProvider';
import { useStaticContext } from './StaticContext';
import AppRedirects from './AppRedirects';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import AdminRoutes from './Admin/AdminRoutes';
import InvitesRoutes from './Invites/InvitesRoutes';
import PasswordsRoutes from './Passwords/PasswordsRoutes';
import Register from './Register';
import UsersRoutes from './Users/UsersRoutes';
import Detail from './Detail';

function App() {
  const staticContext = useStaticContext();

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route
            path="*"
            element={
              <AppRedirects>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Stocks/:stock" element={<Detail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/passwords/*" element={<PasswordsRoutes />} />
                  <Route path="/invites/*" element={<InvitesRoutes />} />
                  {staticContext?.env?.VITE_FEATURE_REGISTRATION === 'true' && <Route path="/register" element={<Register />} />}
                  <Route path="/account/*" element={<UsersRoutes />} />
                  <Route path="/admin/*" element={<AdminRoutes />} />
                </Routes>
              </AppRedirects>
            }
          />
        </Routes>
      </Provider>
    </AuthContextProvider>
  );
}

export default App;
