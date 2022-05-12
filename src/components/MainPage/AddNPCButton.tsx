import { IconButton, Link } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import './listcard.css';

const AddNPCButton = () => {
  return (
    <div className="AddNPCButton">
      <Link href="NPCPage" underline="none">
        <IconButton
          sx={{
            position: 'absolute',
            color: 'rgba(0,0,0,0.7)',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <AddRoundedIcon sx={{ fontSize: '100px' }} />
        </IconButton>
      </Link>
    </div>
  );
};

export default AddNPCButton;
