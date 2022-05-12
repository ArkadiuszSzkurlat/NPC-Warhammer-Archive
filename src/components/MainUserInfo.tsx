import {
  Typography,
  IconButton,
  Modal,
  Box,
  Paper,
  Link,
  Button,
  ClickAwayListener,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
  const { currentUser, logout, deleteAccount } = useAuth();

  const [openLogout, setOpenLogout] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const navigate = useNavigate();

  const handleUserLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserDelete = async () => {
    try {
      await deleteAccount(currentUser);
      navigate('./login');
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = (
    stateValue: boolean,
    StateHook: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    StateHook(!stateValue);
  };
  const handleClose = (
    StateHook: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    StateHook(false);
  };

  return (
    <div className="user-info">
      <Link href="/" underline="none" sx={{ color: 'white' }}>
        <Typography variant="h6">{currentUser.email}</Typography>
      </Link>
      <ClickAwayListener
        onClickAway={() => {
          handleClose(setOpenSettings);
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => {
              handleOpen(openSettings, setOpenSettings);
            }}
          >
            <SettingsIcon style={{ fontSize: 42, color: 'white' }} />
          </IconButton>
          {openSettings && (
            <Paper className="settings-popup">
              <Button
                fullWidth
                sx={{ color: 'red' }}
                onClick={() => {
                  handleOpen(openDelete, setOpenDelete);
                }}
              >
                Usuń Konto
              </Button>
            </Paper>
          )}
        </Box>
      </ClickAwayListener>

      <IconButton
        onClick={() => {
          handleOpen(openLogout, setOpenLogout);
        }}
      >
        <MeetingRoomRoundedIcon style={{ fontSize: 42, color: 'white' }} />
      </IconButton>
      {/* Logout Modal */}
      <Modal
        open={openLogout}
        onClose={() => {
          handleClose(setOpenLogout);
        }}
      >
        <Paper className="modal-popup">
          <Typography id="modal-modal-title" variant="body1" component="h2">
            Czy na pewno chcesz się wylogować?
          </Typography>
          <div className="modal-pupup--buttons">
            <Button onClick={handleUserLogout}>Tak</Button>
            <Button
              onClick={() => {
                handleClose(setOpenLogout);
              }}
            >
              Nie
            </Button>
          </div>
        </Paper>
      </Modal>

      {/* Delete Account Modal */}

      <Modal
        open={openDelete}
        onClose={() => {
          handleClose(setOpenDelete);
        }}
      >
        <Paper className="modal-popup">
          <Typography variant="body1" component="h2">
            Czy na pewno chcesz się usunąć konto?
          </Typography>
          <div className="modal-pupup--buttons">
            <Button onClick={handleUserDelete}>Tak</Button>
            <Button
              onClick={() => {
                handleClose(setOpenDelete);
              }}
            >
              Nie
            </Button>
          </div>
          <Typography variant="body2" component="h2">
            TA DECYZJA JEST NIEODWRACALNA!
          </Typography>
        </Paper>
      </Modal>
    </div>
  );
};

export default UserInfo;
