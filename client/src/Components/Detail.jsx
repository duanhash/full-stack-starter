import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`/api/stocks/${id}`)
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <main className="container">
      <h1>{data?.Title}</h1>
    </main>
  );
}

export default Detail;