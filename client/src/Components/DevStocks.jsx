import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const DevStocks = ({ id, Ticker, About, ImagesUrl }) => {
  const { user } = useAuthContext();

  return (
    <div className='tw-bg-neutral tw-text-white card mb-3'> 
      <img src={ImagesUrl} className='card-img-top' />
      <div className='tw-ml-3 tw-flex tw-flex-col'>
        {id}: {Ticker} <Link to={`/dev/detail/${id}`}>View</Link>
        { user && <Link to={`/dev/stocks/${id}/edit`}>Edit</Link> }
      </div>
    </div>
  );
}

export default DevStocks;