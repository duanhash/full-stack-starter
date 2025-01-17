import { Routes, Route } from 'react-router-dom';
import { store } from "./store";
import { Provider } from "react-redux";

import './App.scss';

import AuthContextProvider from './AuthContextProvider';
import { useStaticContext } from './StaticContext';
import AppRedirects from './AppRedirects';
import Header from './Header';
import { StockForm, Footer, DevStocksDetail } from './Components'
import { Dow, ErrorPage, Stocks, DevHome } from './Pages';
import Home from './Home';
import Login from './Login';
import AdminRoutes from './Admin/AdminRoutes';
import InvitesRoutes from './Invites/InvitesRoutes';
import PasswordsRoutes from './Passwords/PasswordsRoutes';
import Register from './Register';
import UsersRoutes from './Users/UsersRoutes';

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
                  <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
                  <Route path="/Stocks/:stock" element={<Stocks />} errorElement={<ErrorPage />}/>
                  <Route path="/dev/stocks/new" element={<StockForm />} />
                  <Route path='/dev/stocks/:id/edit' element={<StockForm />} />
                  <Route path='/dev/detail/:id' element={<DevStocksDetail />} />
                  <Route path='/dev/home' element={<DevHome />} />
                  <Route path="/Indexes/Dow" element={<Dow />} errorElement={<ErrorPage />}/>
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
        {/* <Footer /> */}
      </Provider>
    </AuthContextProvider>
  );
}

export default App;
