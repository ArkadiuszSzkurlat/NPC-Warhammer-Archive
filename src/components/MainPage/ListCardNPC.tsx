import { Avatar, Card, IconButton, Typography, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import avatarImage from '../../resources/images/face.jpg';
import './listcard.css';
import { useNavigate } from 'react-router-dom';
import { deleteNPC, getSpecificNPC } from '../../firebase';

const ListCardNPC = ({ name }: { name: any }) => {
  const navigate = useNavigate();

  const editButtonHandler = (e: any): void => {
    getSpecificNPC(e.target.value);
    navigate('/npcpage');
  };

  const deleteButtonHandler = (): void => {
    if (window.confirm('Na pewno chcesz usunąć postać?')) {
      deleteNPC(name);
      navigate('/');
    } else {
      console.log('Anulowałeś usuwanie postaci');
    }
  };

  return (
    <Card className="listCardNPC">
      <img className="listCardNPC-avatar" alt="avatar" src={avatarImage} />
      <Typography className="listCardNPC-text" variant="body1">
        {name}
      </Typography>
      <div className="listCardNPC-fade">
        <Button
          variant="contained"
          color="primary"
          size="small"
          value={name}
          onClick={editButtonHandler}
        >
          Edytuj
        </Button>
        <IconButton
          sx={{
            position: 'absolute',
            color: 'black',
            background: '#9c1f1f',
            top: 0,
            right: 0,
            width: '32.5px',
            height: '32.5px',
            borderRadius: '0 0 0 20px',
          }}
          size="small"
          onClick={deleteButtonHandler}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default ListCardNPC;
