import React from 'react';
import { Avatar, Card, IconButton, Typography, Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import avatarImage from '../../resources/images/face.jpg';
import './listcard.css';
import { useNavigate } from 'react-router-dom';
import { deleteNPC, getSpecificNPC, getNPCs } from '../../firebase';
import { useDispatch } from 'react-redux';
import { changeNPCStats, changeNPCDirectory } from '../../redux/NPCSlice';
import { setNPCharacters } from '../../redux/NPCharactersSlice';

const ListCardNPC = ({
  name,
  folderName,
}: {
  name: string;
  folderName: string;
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editButtonHandler = (e: any): void => {
    getSpecificNPC(e.target.value).then((NPCstats: any) =>
      dispatch(changeNPCStats(NPCstats.data()))
    );
    navigate('/npcpage');
  };

  const deleteButtonHandler = (): void => {
    if (window.confirm('Na pewno chcesz usunąć postać?')) {
      deleteNPC(name);
      getNPCs()
        .then((res) => {
          if (res) {
            dispatch(setNPCharacters([...res]));
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
