import { useSelector, useDispatch } from "react-redux";
import { setStockRoute } from "../Features/home/homeSlice";
import { getStockData } from "../Features/search/searchSlice";

import { Link } from "react-router-dom";

const Table = ({ data, title }) => {
  const dispatch = useDispatch();

  return (
    <div className="tw-grid tw-flex-shrink tw-h-full tw-w-full tw-px-8 tw-card tw-bg-neutral tw-rounded-box tw-place-items-center tw-overflow-hidden">
      <div className="tw-overflow-x-auto tw-w-full">
        <h1 className="tw-flex tw-justify-center tw-py-4 tw-text-3xl tw-text-white">
          {title}
        </h1>
        <table className="tw-table tw-table-xs sm:tw-table-xs md:tw-table-lg lg:tw-table-sm">
          <thead>
            <tr>
              <th />
              <th />
              <th className="tw-text-white">Price</th>
              <th className="tw-text-white">Volume</th>
            </tr>
          </thead>
          <tbody>
            {data.body.map((stock, number) => (
              <tr className="hover:tw-bg-secondary" key={stock.symbol + "TopGainLoss"}>
                <th className="tw-text-white">{number + 1}</th>
                <td
                  className="tw-text-white"
                  onClick={() => {
                    dispatch(getStockData(stock.symbol));
                    dispatch(setStockRoute(stock.symbol));
                  }}
                >
                  <Link to={`Stocks/${stock.symbol}`}>
                    {stock.symbol}
                  </Link>{" "}
                </td>
                <td className="tw-text-white">
                  {"$" + stock.regularMarketPrice + " "}
                  <div
                    className={`tw-inline-flex tw-gap-2 tw-self-end tw-rounded tw-px-1 tw-py-2 ${
                      parseFloat(stock.regularMarketChange) < 0
                        ? "tw-text-red-600"
                        : "tw-text-green-600"
                    } `}
                  >
                    {parseFloat(stock.regularMarketChange) < 0 ? '↘︎' : '↗︎'}
                    <span className="tw-text-sm tw-font-medium tw-pt-[1px]">{`${parseFloat(
                      stock.regularMarketChange
                    ).toFixed(2)} (${parseFloat(
                      stock.regularMarketChangePercent
                    ).toFixed(2) + "%"})`}</span>
                  </div>
                </td>
                <td className="tw-text-white">{stock.regularMarketVolume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TopGainLoss = () => {
  const { gainData, loseData, activeData } = useSelector((state) => state.home);

  return (
    <div className="tw-flex tw-flex-col tw-w-full 2xl:tw-flex-row tw-gap-x-8 tw-px-12 tw-justify-around">
      {gainData === null || (
        <Table data={gainData} title={"Top Gainers"} />
      )}
      <div className="tw-divider xs:tw-divider-horizontal" />
      {loseData === null || (
        <Table data={loseData} title={"Top Losers"} />
      )}
      <div className="tw-divider xs:tw-divider-horizontal" />
      {activeData === null || (
        <Table
          data={activeData}
          title={"Most Active"}
        />
      )}
    </div>
  );
};

export default TopGainLoss;