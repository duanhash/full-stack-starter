import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SearchBar } from './Components/index';
import { logo } from "../assets";
import { useSelector } from "react-redux";

import './Header.scss';
import Api from './Api';
import { useAuthContext } from './AuthContext';

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const [isNavbarShowing, setNavbarShowing] = useState(false);
  const { stockRoute } = useSelector((state) => state.home);

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Stocks", path: `Stocks/${stockRoute}` },
    { name: "DevHome", path: '/dev/home'}
  ];

  const navIndexes = [
    { name: "Dow", path: "Indexes/Dow" },
    { name: "Nasdaq", path: "Indexes/Nasdaq" },
    { name: "S&P 500", path: "Indexes/S&P500" },
  ];

  useEffect(
    function () {
      Api.users.me().then((response) => {
        if (response.status === 204) {
          setUser(null);
        } else {
          setUser(response.data);
        }
      });
    },
    [setUser]
  );

  async function onLogout(event) {
    event.preventDefault();
    await Api.auth.logout();
    setUser(null);
    hideNavbar();
    navigate('/');
  }

  function hideNavbar() {
    setNavbarShowing(false);
  }

  return (
    <nav className="tw-bg-base-100 tw-sticky tw-left-0 tw-right-0 tw-z-20 tw-top-0 tw-mb-24">
      <div className="tw-container tw-px-6 tw-py-2 tw-mx-auto md:tw-flex">
        <div className="tw-flex tw-items-center tw-justify-between">
          <Link to="/">
            <img width={50} height={50} src={logo} alt="Duan Logo" />
          </Link>
          <div className="tw-flex md:tw-hidden">
            <label className="tw-btn tw-btn-circle tw-swap tw-swap-rotate tw-bg-base-100 tw-border-base-100 tw-text-white hover:tw-bg-secondary">
              <input type="checkbox" onClick={() => setNavbarShowing(!isNavbarShowing)} />
              <svg
                className="tw-swap-off tw-fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              <svg
                className="tw-swap-on tw-fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>
        </div>
        <div
          className={`${
            isNavbarShowing ? "tw-translate-x-0 tw-opacity-100" : "tw-opacity-0 tw--translate-x-full"
          } tw-absolute tw-inset-x-0 tw-z-20 tw-w-full tw-px-6 tw-py-4 tw-transition-all tw-duration-300 tw-ease-in-out tw-bg-base-100 md:tw-mt-0 md:tw-p-0 md:tw-top-0 md:tw-relative md:tw-opacity-100 md:tw-translate-x-0 md:tw-flex md:tw-items-center md:tw-justify-between`}
        >
          <div className="tw-flex tw-flex-col tw-px-2 tw--mx-4 md:tw-flex-row md:tw-mx-10 md:tw-py-0">
            {navigation.map(item => (
              <Link to={item.path} key={item.path}>
                <label className="tw-px-2.5 tw-py-2 tw-text-white tw-bg-base-100 hover:tw-bg-secondary hover:tw-text-base-100 md:tw-mx-2 tw-btn tw-btn-ghost tw-rounded-btn">
                  {item.name}
                </label>
              </Link>
            ))}
            <div className="tw-dropdown tw-dropdown-bottom">
              <div tabIndex={0} role="button" className="tw-px-2.5 tw-py-2 tw-text-white tw-bg-base-100 hover:tw-bg-secondary hover:tw-text-base-100 md:tw-mx-2 tw-btn tw-btn-ghost tw-rounded-btn">
                Indexes
              </div>
              <ul
                tabIndex={0}
                className="tw-left-0 tw-menu tw-dropdown-content tw-z-20 tw-p-2 tw-shadow tw-text-white tw-bg-neutral tw-rounded-box tw-w-52 tw-mt-3"
              >
                {navIndexes.map(item => (
                  <Link to={item.path} key={item.path}>
                    <li className="tw-btn tw-btn-ghost tw-rounded-btn tw-w-full hover:tw-bg-secondary hover:tw-text-base-100">
                      {item.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className='tw-flex tw-flex-col tw-px-2 tw--mx-4 md:tw-flex-row md:tw-mx-10 md:tw-py-0 tw-justify-end'>
            <SearchBar />
            {user && (
              <div className='tw-dropdown tw-dropdown-bottom'>
                <div tabIndex={0} role='button' className={`${user.pictureUrl || 'tw-placeholder'} tw-avatar`}>
                  {user.pictureUrl ? <div className='tw-w-12 tw-ml-3 tw-mt-1 tw-rounded-full'>
                    <img src={user.pictureUrl}/>
                  </div> : <div className="tw-bg-neutral tw-text-neutral-content tw-rounded-full tw-mt-1 tw-ml-3 tw-w-12">
                    <span className="tw-text-3xl">{user.firstName[0]}</span>
                  </div>}
                  <ul
                    tabIndex={0}
                    className="tw-left-0 tw-menu tw-dropdown-content tw-z-20 tw-p-2 tw-shadow tw-text-white tw-bg-neutral tw-rounded-box tw-w-52 tw-mt-3"
                  >
                    {user.isAdmin && (
                      <Link to ='/admin' onClick={hideNavbar}>
                        <li className="tw-btn tw-btn-ghost tw-rounded-btn tw-w-full hover:tw-bg-secondary hover:tw-text-base-100">
                          Admin
                        </li>
                      </Link>
                    )}
                    <Link to="/account" onClick={hideNavbar}>
                      <li className="tw-btn tw-btn-ghost tw-rounded-btn tw-w-full hover:tw-bg-secondary hover:tw-text-base-100">
                        Account Settings
                      </li>
                    </Link>
                    <li className="tw-btn tw-btn-ghost tw-rounded-btn tw-w-full hover:tw-bg-secondary hover:tw-text-base-100">
                      <a href='/logout' onClick={onLogout}>
                        Log out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {!user && (
              <li>
                <Link to="/login" onClick={hideNavbar}>
                  <label className="tw-px-2.5 tw-py-2 tw-text-white tw-bg-base-100 tw-border-base-100 hover:tw-bg-secondary hover:tw-text-base-100 md:tw-mx-2 tw-btn tw-btn-ghost tw-rounded-btn">
                    Log In
                  </label>
                </Link>
              </li>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
