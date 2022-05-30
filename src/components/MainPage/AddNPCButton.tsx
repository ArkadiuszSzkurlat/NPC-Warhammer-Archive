import { IconButton, Link } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import './listcard.css';
import { changeNPCDirectory } from '../../redux/NPCSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddNPCButton = ({ folderName }: { folderName: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddButton = () => {
    dispatch(changeNPCDirectory(folderName));
    navigate('/NPCPage');
  };
  return (
    <div className="AddNPCButton">
      <IconButton
        sx={{
          position: 'absolute',
          color: 'rgba(0,0,0,0.7)',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
        }}
        onClick={handleAddButton}
      >
        <AddRoundedIcon sx={{ fontSize: '100px' }} />
      </IconButton>
    </div>
  );
};

export default AddNPCButton;
