import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getStockData, clearData } from "../features/search/SearchSlice";
import { setStockRoute } from "../features/home/homeSlice";
import { Link, useNavigate } from "react-router-dom";
import us_ticker_symbols from "../us_ticker_symbols";

const SearchResults = ({
  input,
  setInput,
  setAlert,
  setSearched,
  filteredResults,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="tw-w-full tw-bg-base-100 tw-flex tw-flex-col tw-shadow-xl tw-rounded-xl tw-max-h-[300px] tw-overflow-y-scroll tw-absolute tw-z-20">
      {input &&
        filteredResults.map(stock => (
          <Link to={`Stocks/${stock}`} key={stock}>
            <div
              className="tw-py-3 tw-px-5 tw-text-white hover:tw-bg-info"
              onClick={() => {
                setInput(stock);
                setAlert(false);
                setSearched(true);
                dispatch(getStockData(stock));
                dispatch(setStockRoute(stock));
              }}
            >
              {stock}
            </div>
          </Link>
        ))}
    </div>
  );
};

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [alert, setAlert] = useState(false);
  const [searched, setSearched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(input);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (us_ticker_symbols.includes(input)) {
      setSearched(true);
      dispatch(clearData());
      dispatch(getStockData(input));
      dispatch(setStockRoute(input));
      navigate(`Stocks/${input}`);
    } else {
      setAlert(true);
    }
  };

  const filteredResults = useMemo(() => {
    return us_ticker_symbols.filter((ticker_symbol) =>
      ticker_symbol.startsWith(input)
    );
  }, [input]);

  const searchItems = (e) => {
    setInput(e.target.value.toUpperCase());
    setAlert(false);
    setSearched(false);
  };

  return (
    <div className="tw-relative tw-w-full tw-mt-4 md:tw-mt-0 md:tw-w-48 tw-justify-end">
      <form onSubmit={handleSubmit}>
        <div className="tw-relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="tw-absolute tw-top-0 tw-bottom-0 tw-w-6 tw-h-6 tw-my-auto tw-text-white tw-left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="U.S. Tickers Only"
            value={input}
            className="tw-w-full tw-py-3 tw-pl-12 tw-pr-3 tw-text-white tw-border-isabelline tw-border-2 tw-rounded-md tw-outline-none tw-bg-base-100 focus:tw-border-info"
            onChange={searchItems}
          />
        </div>
      </form>
      {alert && (
        <div className="tw-absolute tw-w-full tw-z-10">
          <div className="tw-alert tw-alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="tw-stroke-current tw-shrink-0 tw-h-6 tw-w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Invalid Ticker Symbol</span>
          </div>
        </div>
      )}
      {searched || (
        <SearchResults
          input={input}
          setInput={setInput}
          setAlert={setAlert}
          setSearched={setSearched}
          filteredResults={filteredResults}
        />
      )}
    </div>
  );
};

export default SearchBar;