import { Chart, Company, Spinner, News } from "../Components";
import { useSelector } from "react-redux";

const Stocks = () => {
  const { isLoading, companyNews, profileData } = useSelector(
    (state) => state.search
  );

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <>
      <section className="tw-mt-24 tw-z-10 tw-relative">
        <div className="tw-w-full lg:tw-w-[75%] tw-mx-auto">
          <Chart />
        </div>
        <div className="tw-flex tw-justify-center tw-px-6 tw-relative tw-mt-24 ">
          <div className="tw-mr-8 lg:tw-mr-16 tw-h-96">
            <Company />
          </div>
          <div className="tw-h-96 tw-card tw-min-w-[60%] tw-w-[60%] tw-bg-neutral tw-rounded-box tw-flex tw-text-center tw-overflow-y-scroll">
            {profileData === null ? null : (
              <p className="tw-text-white tw-p-6">
                {profileData.longBusinessSummary}
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="tw-mt-24 tw-z-10 tw-relative">
        <News newsData={companyNews} />
      </section>
    </>
  );
};

export default Stocks;
