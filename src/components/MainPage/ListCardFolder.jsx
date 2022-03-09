import React, { useState } from 'react';
import { Card, Avatar, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListCardNPC from './ListCardNPC';

const ListCardFolder = ({ name }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <Card
        className='list-folderCard'
        sx={{ background: '#E3EDE6' }}
        elevation={8}
      >
        <Avatar variant='square' />
        <Typography variant='body1' style={{ width: '25%' }}>
          {name}
        </Typography>
        <IconButton>
          <StarIcon sx={{ color: '#c9c600' }} />
        </IconButton>
        <IconButton>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          {clicked ? <ArrowDownwardIcon /> : <ArrowForwardIcon />}
        </IconButton>
      </Card>
      {clicked ? (
        <div className='listOfNPC'>
          <ListCardNPC name='Rogaś' />
        </div>
      ) : null}
    </>
  );
};

export default ListCardFolder;
