import { useState, useEffect } from "react";
import PhotoInput from "./PhotoInput";
import { useNavigate, useParams } from 'react-router-dom';

const StockForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    Ticker: '',
    Company: '',
    Founded: '',
    About: '',
    Industry: '',
    Images: '',
  })

  useEffect(() => {
    if (id) {
      fetch(`/api/stocks/${id}`)
        .then(response => response.json())
        .then(json => {setData(json)});
    }
  }, [id])

  const onChange = (e) => {
    const newData = {...data};
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let method = 'POST'

    try {
      let path = '/api/stocks';
      
      if (id) {
        path = `/api/stocks/${id}`;
        method = 'PATCH';
      }

      const response = await fetch(path, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const json = await response.json();
      console.log(json);
      navigate('/dev/home');
    } catch (err) {
      console.log(err);
    }
  }

  const onDelete = async () => {
    try {
      await fetch(`/api/stocks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate('/dev/home')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='container'>
      <h1 className='tw-text-white'>Stock Form</h1>
      <form onSubmit={onSubmit}>
        <div className='mb-3 tw-text-white'>
          <label htmlFor='Ticker'>Ticker</label>
          <input type='text' id='Ticker' name='Ticker' value={data.Ticker} className='form-control' onChange={onChange}/>
        </div>
        <div className='mb-3 tw-text-white'>
          <label htmlFor='About'>About</label>
          <input type='text' id='About' name='About' value={data.About} className='form-control' onChange={onChange}/>
        </div>
        <div className='mb-3 tw-text-white'>
          <label htmlFor='Images'>Images</label>
          <PhotoInput id='Images' name='Images' value={data.Images} valueUrl={data.ImagesUrl} className='card' onChange={onChange}>
            <div className='card-body'>
              Click here or drag-and-drop here.
            </div>
          </PhotoInput>
          </div>
          <div className='d-flex justify-content-between'>
            <button type='submit' className='tw-btn tw-btn-outline tw-btn-info hover:tw-text-white'>Submit</button>
            <button onClick={()=>document.getElementById('my_modal_5').showModal()} type='button' className='tw-btn tw-btn-outline tw-btn-error hover:tw-text-white'>Delete</button>
            <dialog id="my_modal_5" className="tw-modal tw-modal-bottom sm:tw-modal-middle">
              <div className="tw-modal-box">
                <h3 className="tw-font-bold tw-text-3xl tw-text-white">Delete</h3>
                <p className="tw-py-4 tw-text-white tw-text-lg">Are you sure you want to delete this stock?</p>
                <div className="tw-modal-action">
                  <form method="dialog">
                    <button className='tw-btn tw-btn-outline tw-btn-success hover:tw-text-white tw-mr-3' onClick={onDelete}>Yes</button>
                    <button className="tw-btn tw-btn-outline tw-btn-error hover:tw-text-white">No</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
      </form>
    </div>
  );
}

export default StockForm;