import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tick from '../assets/greenTick.png';
import Cross from '../assets/cross.png';
import Modal from '@mui/material/Modal';
import { height } from '@mui/system';

function CustomModal({ open, setOpen }) {
  return (
    <div>
      <Modal
        open={open.modalVal}
        onClose={() =>
          setOpen({
            modalVal: false,
          })
        }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'white',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              marginTop: 12,
            }}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
              }}
              src={open.modalStatus === 'success' ? Tick : Cross}
              alt={open.modalStatus === 'success' ? Tick : Cross}
            />
          </div>
          <h4 id="modal-modal-description" sx={{ mt: 2 }}>
            {open.modalText}
          </h4>
        </Box>
      </Modal>
    </div>
  );
}

export default CustomModal;
