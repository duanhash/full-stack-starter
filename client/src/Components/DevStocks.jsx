import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const DevStocks = ({ id, Ticker, About, ImagesUrl }) => {
  const { user } = useAuthContext();

  return (
    <div className='tw-bg-neutral card mb-3'> 
      <img src={ImagesUrl} className='card-img-top' />
        {id}: {Ticker} <Link to={`/detail/${id}`}>Link</Link>
        { user && <Link to={`/dev/stocks/${id}/edit`}>Edit</Link> }
    </div>
  );
}

export default DevStocks;