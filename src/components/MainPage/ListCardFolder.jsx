import React, { useState } from 'react';
import { Card, Avatar, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListCardNPC from './ListCardNPC';

const ListCardFolder = ({ name, index }) => {
  const [clicked, setClicked] = useState(false);
  const [editable, setEditable] = useState(true);
  const [nameTest, setNameTest] = useState(name);
  const [star, setStar] = useState(true);

  return (
    <>
      <Card
        className="list-folderCard"
        sx={{ background: '#E3EDE6' }}
        elevation={8}
      >
        <Avatar variant="square" />

        <input
          className="list-folderCard--input"
          type="text"
          value={nameTest}
          disabled={editable}
          onChange={(e) => {
            setNameTest(e.target.value);
          }}
        />
        <IconButton onClick={() => setStar(!star)}>
          <StarIcon sx={{ color: star && '#c9c600' }} />
        </IconButton>
        <IconButton>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton
          sx={{ color: !editable && '#b05217' }}
          onClick={() => {
            setEditable(!editable);
          }}
        >
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
        <div className="listOfNPC">
          <ListCardNPC name="Rogaś" />
        </div>
      ) : null}
    </>
  );
};

export default ListCardFolder;
