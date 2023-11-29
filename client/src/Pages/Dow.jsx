import Airtable from "airtable";
import { useState, useEffect } from "react";
import { Spinner } from "../Components";

// const base = new Airtable({
//   apiKey: import.meta.env.VITE_AIRTABLE_PERSONAL_ACCESS_TOKEN,
// }).base("appJOKxKhNDGssp7W");

const Dow = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   base("Dow")
  //     .select({ view: "Grid view" })
  //     .eachPage((records) => {
  //       if (records !== null) {
  //         setIsLoading(false);
  //       }
  //       console.log(records);
  //       setData(records);
  //     });
  // }, []);
  useEffect(() => {
    fetch('/api/stocks')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
  }

  return (
    <section className="tw-z-10 tw-mt-24 tw-pb-24 tw-relative">
      {data?.map((record) => (
        <div
          className="tw-collapse tw-collapse-arrow tw-bg-neutral tw-text-white tw-w-[60%] tw-mx-auto tw-my-10"
          key={record.id}                                                                           
        >
          <input type="radio" name="tw-my-accordion-3" />
          <div className="tw-collapse-title tw-text-xl tw-font-medium">
            {`${record.Company} (${record.Ticker}) | ${record.Industry}`}
          </div>
          <div className="tw-collapse-content">
            <img
              src={record.ImagesUrl}
              alt="Banner Image"
              className="tw-object-cover tw-overflow-hidden tw-mx-auto tw-pb-4"
            />
            <p className="tw-text-2xl tw-text-center tw-pb-4">{`Est. ${record.Founded}`}</p>
            <p className="tw-text-lg">{record.About}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Dow;