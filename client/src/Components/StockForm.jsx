import { useState, useEffect } from "react";
import PhotoInput from "./PhotoInput";
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
  const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState(false);

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

  const showConfirmDeleteModal = () => {
    setIsConfirmDeleteModal(true);
  }

  const handleClose = () => {
    setIsConfirmDeleteModal(false);
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
      <h1>Stock Form</h1>
      <form onSubmit={onSubmit}>
        <div className='mb-3'>
          <label htmlFor='Ticker'>Ticker</label>
          <input type='text' id='Ticker' name='Ticker' value={data.Ticker} className='form-control' onChange={onChange}/>
        </div>
        <div className='mb-3'>
          <label htmlFor='About'>About</label>
          <input type='text' id='About' name='About' value={data.About} className='form-control' onChange={onChange}/>
        </div>
        <div className='mb-3'>
          <label htmlFor='Images'>Images</label>
          <PhotoInput id='Images' name='Images' value={data.Images} valueUrl={data.ImagesUrl} className='card' onChange={onChange}>
            <div className='card-body'>
              Click here or drag-and-drop here.
            </div>
          </PhotoInput>
          </div>
          <div className='d-flex justify-content-between'>
            <button type='submit' className='btn btn-primary'>Submit</button>
            <button onClick={showConfirmDeleteModal} type='button' className='btn btn-danger'>Delete</button>
          </div>
          <Modal centered show={isConfirmDeleteModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this stock?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
              <Button variant="danger" onClick={onDelete}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
      </form>
    </div>
  );
}

export default StockForm;