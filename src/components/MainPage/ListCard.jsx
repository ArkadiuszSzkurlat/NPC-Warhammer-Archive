import React from 'react';
import { Card, Avatar, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ListCard = () => {
  return (
    <Card className='list-card ' sx={{ background: '#E3EDE6' }} elevation={8}>
      <Avatar variant='square' />
      <Typography variant='body1'>Ubersreik</Typography>
      <IconButton>
        <StarIcon sx={{ color: '#c9c600' }} />
      </IconButton>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <ArrowForwardIcon />
      </IconButton>
    </Card>
  );
};

export default ListCard;
