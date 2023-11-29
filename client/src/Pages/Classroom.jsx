import { useState, useEffect } from 'react';
import Item from '../Components/Item';

const Classroom = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('/api/stocks')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <main className="container">
      {data?.map((stock) => (
        <Item key={stock.id} id={stock.id} title={stock.Title}/>
      ))}
    </main>
  )
};

export default Classroom