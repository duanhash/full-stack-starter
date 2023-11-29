import { Link } from 'react-router-dom';

const Item = ({ id, title }) => {
  return (
    <div className='card mb-3'>
      {id}: {title} <Link to={`/detail/${id}`}>Link</Link>
    </div>
  )
}

export default Item;