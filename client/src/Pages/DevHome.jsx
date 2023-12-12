import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useStaticContext } from "../StaticContext";
import { useAuthContext } from "../AuthContext";

import { DevStocks } from "../Components";

const DevHome = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState();

  useEffect(() => {
    fetch('/api/stocks')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const staticContext = useStaticContext();
  return (
    <>
      <Helmet>
        <title>
         DevHome - {staticContext?.env?.VITE_SITE_TITLE ?? ''} 
        </title>
      </Helmet>
      <main className='container tw-text-white'>
        <h1>DevHome</h1>
        {user && <div className='mb-3'>
          <Link to='/dev/stocks/new'>Create a new Stock</Link>
        </div>}
        <div className='row'>
          {data?.map((record) => (
            <div key={record.id} className='col-3'>
              <DevStocks id={record.id} Ticker={record.Ticker} About={record.About} ImagesUrl={record.ImagesUrl}/>
            </div>  
          ))}
        </div>
      </main>
    </>
  );
};

export default DevHome;