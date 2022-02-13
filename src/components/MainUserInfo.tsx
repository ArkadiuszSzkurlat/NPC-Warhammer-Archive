import { Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';

const UserInfo = () => {
  return (
    <div className='user-info'>
      <Typography variant='h6'>BananowyKociołek1234</Typography>
      <IconButton>
        <SettingsIcon style={{ fontSize: 42, color: 'white' }} />
      </IconButton>
      <IconButton>
        <MeetingRoomRoundedIcon style={{ fontSize: 42, color: 'white' }} />
      </IconButton>
    </div>
  );
};

export default UserInfo;
