import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useStaticContext } from './StaticContext';
import { useDispatch, useSelector } from "react-redux";
import { getHomeData } from "./Features/home/homeSlice";
import { News, TopGainLoss } from "./Components";
import { Spinner } from "./Components";


const Home = () => {
  const dispatch = useDispatch();
  const staticContext = useStaticContext();
  const { globalNews, gainData, isLoading } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    if (globalNews && gainData) {
      console.log(globalNews);
      console.log(gainData);
    } else {
      dispatch(getHomeData());
    }
  }, []);

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <>
      <Helmet>
        <title>Home - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <>
        <section className="tw-mx-auto tw-max-w-screen-xl tw-pb-4 tw-px-4 sm:tw-px-8 tw-z-10">
          <div className="tw-text-center tw-space-y-4">
            <h1 className="tw-text-secondary tw-font-bold tw-text-4xl md:tw-text-5xl">
              Welcome to my
              <span className="tw-text-white"> Stock Screener</span>
            </h1>
            <p className="tw-text-white tw-max-w-xl tw-mx-auto tw-leading-relaxed">
              Don't navigate to the stocks page until you have searched up a stock
              or clicked on a link to a stock. You can use the search bar in the
              top right to search for any U.S. stock. You can scroll down to find
              today's top gainers and losers, most active stocks, and global stock
              news. The code to this project and my contact info can be found by
              clicking the icons in the footer at the bottom of the page.
            </p>
          </div>
        </section>
        <section className="tw-z-10 tw-mt-20 tw-relative">
          <TopGainLoss />
        </section>
        <section className="tw-z-10 tw-mt-20 tw-relative">
          <News newsData={globalNews} />
        </section>
      </>
    </>
  );
};

export default Home;
