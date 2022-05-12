import { Avatar, Card, IconButton, Typography, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import avatarImage from '../../resources/images/face.jpg';
import './listcard.css';
import { useNavigate } from 'react-router-dom';

const ListCardNPC = ({ name, provided }: { name: any; provided: any }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="listCardNPC"
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <img className="listCardNPC-avatar" alt="avatar" src={avatarImage} />
      <Typography className="listCardNPC-text" variant="body1">
        {name}
      </Typography>
      <div className="listCardNPC-fade">
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
        >
          <DeleteOutlineIcon />
        </IconButton>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            navigate('/npcpage');
          }}
        >
          Edytuj
        </Button>
      </div>
    </Card>
  );
};

export default ListCardNPC;
