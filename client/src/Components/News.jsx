import { useState } from "react";
import { Spinner } from "../Components";

const News = ({ newsData, isLoading }) => {
  const [visible, setVisible] = useState(4);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <div className="tw=container tw-w-full tw-px-20 tw-mx-auto tw-p-6 tw-space-y-6 sm:tw-space-y-12 tw-relative">
      {newsData === null || (
        <>
          <a href={newsData[0].article_url} target="_blank">
            <div className="tw-card lg:tw-card-side tw-bg-neutral tw-shadow-xl lg:tw-px-8 tw-h-full tw-w-[95%] tw-mx-auto">
              <figure>
                <img
                  src={newsData[0].image_url}
                  alt="Banner Image"
                  className="tw-object-cover tw-overflow-hidden"
                />
              </figure>
              <div className="tw-card-body tw-h-96 tw-overflow-y-scroll">
                <h2 className="tw-card-title tw-text-white">{newsData[0].title}</h2>
                <span className="tw-text-xs tw-text-white">
                  {new Date(newsData[0].published_utc).toUTCString()}
                </span>
                <p className="tw-text-white">{newsData[0].description}</p>
                <div className="tw-card-actions tw-justify-start">
                  {newsData[0].keywords &&
                    newsData[0].keywords.map(topic => (
                      <div
                        className="tw-badge tw-badge-outline tw-text-white tw-outline-white"
                        key={newsData[0].id}
                      >{`#${topic}`}</div>
                    ))}
                  {newsData[0].tickers.map(ticker => (
                    <div
                      className="tw-badge tw-badge-outline tw-text-white tw-outline-white"
                      key={newsData[0].id}
                    >{`${ticker}`}</div>
                  ))}
                </div>
              </div>
            </div>
          </a>
          <div className="tw-grid tw-grid-cols-1 tw-gap-y-10 tw-gap-x-10 tw-justify-items-center lg:tw-grid-cols-3 tw-z-20">
            {newsData.slice(1, visible).map(article => (
              <a
                href={article.article_url}
                target="_blank"
                className="tw-mx-auto tw-max-w-sm"
                key={article.id}
              >
                <div className="tw-card tw-w-full tw-bg-neutral tw-shadow-xl">
                  <figure>
                    <img
                      src={article.image_url}
                      alt="Banner Image"
                      className="tw-object-cover tw-overflow-hidden tw-h-40 tw-w-full"
                    />
                  </figure>
                  <div className="tw-card-body tw-h-56 tw-overflow-y-scroll">
                    <h2 className="tw-card-title tw-text-white">{article.title}</h2>
                    <span className="tw-text-xs tw-text-white">
                      {new Date(article.published_utc).toUTCString()}
                    </span>
                    <p className="tw-text-white">{article.description}</p>
                    <div className="tw-card-actions tw-justify-start">
                      {article.keywords &&
                        article.keywords.map(topic => (
                          <div
                            className="tw-badge tw-badge-outline tw-text-white tw-outline-white"
                            key={article.id}
                          >{`#${topic}`}</div>
                        ))}
                      {article.tickers.map(ticker => (
                        <div
                          className="tw-badge tw-badge-outline tw-text-white tw-outline-white"
                          key={article.id}
                        >{`${ticker}`}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
      {visible < 13 ? (
        <div className="tw-flex tw-justify-center tw-pb-16">
          <button
            type="button"
            className="tw-px-6 tw-py-3 tw-text-sm tw-rounded-md hover:tw-underline tw-bg-neutral tw-text-white"
            onClick={showMoreItems}
          >
            Load more articles...
          </button>
        </div>
      ) : (
        <div className="tw-pb-16"></div>
      )}
    </div>
  );
};

export default News;