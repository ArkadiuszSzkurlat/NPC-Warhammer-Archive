import { IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const AddFolderButton = () => {
  return (
    <div
      className="addFolderButton"
      // @ts-ignore: Unreachable code error
      sx={{ background: '#E3EDE6' }}
      elevation={8}
    >
      <IconButton
        sx={{
          position: 'absolute',
          color: 'rgba(0,0,0,0.3)',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <AddRoundedIcon sx={{ fontSize: '100px' }} />
      </IconButton>
    </div>
  );
};

export default AddFolderButton;
