import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`/api/stocks/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [id]);

  return (
    <div className="tw-p-5 tw-mx-auto sm:tw-p-10 md:tw-p-16 tw-bg-base-100 tw-text-white">
      <div className="tw-flex tw-flex-col tw-max-w-3xl tw-mx-auto tw-overflow-hidden tw-rounded">
        <img src={data?.ImagesUrl} alt="Stock Image" className="tw-w-96 tw-mx-auto tw-h-60 sm:tw-h-96 tw-bg-base-100" />
        <div className="tw-p-6 tw-pb-12 tw-m-4 tw-mx-auto tw--mt-16 tw-space-y-6 lg:tw-max-w-2xl sm:tw-px-10 sm:tw-mx-12 lg:tw-rounded-md tw-bg-neutral">
          <div className="tw-space-y-2">
            <p className="tw-inline-block tw-text-2xl tw-font-semibold sm:tw-text-3xl">{data?.Ticker}</p>
          </div>
          <div className="tw-text-white">
            <p>{data?.About}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;