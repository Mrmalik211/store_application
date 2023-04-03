import React, {useState} from 'react';
import {Box, Button, Modal, Typography} from '@mui/material';
import Cards from '../../components/Cards';
import './home.scss';
import {Input} from '@mui/icons-material';

import {useSelector} from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Home() {
  const {currentUser} = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="home">
      <div className="modal">
        {currentUser.isSeller === true && (
          <Button variant="contained" onClick={handleOpen}>
            Add Product
          </Button>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add A Product
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
              <form
                action=""
                style={{display: 'flex', flexDirection: 'column', gap: '20px'}}
              >
                <input
                  type="text"
                  placeholder="Title"
                  style={{padding: '10px'}}
                />
                <textarea
                  placeholder="Description"
                  rows={2}
                  cols={3}
                  style={{padding: '10px'}}
                ></textarea>
                <input
                  type="text"
                  placeholder="price"
                  style={{padding: '10px'}}
                />
                <input
                  type="text"
                  placeholder="category (Please write it e.g laptop, mobile)"
                  style={{padding: '10px'}}
                />
                <Button variant="contained">Upload</Button>
              </form>
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className="card">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  );
}

export default Home;
