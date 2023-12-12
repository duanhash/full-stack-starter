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
    <main className="container">
      <h1>{data?.Ticker}</h1>
    </main>
  );
}

export default Detail;