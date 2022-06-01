import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, IconButton, Portal } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListCardNPC from './ListCardNPC';
import AddNPCButton from './AddNPCButton';
import { deleteFolder, getFolders } from '../../firebase';
import { setFolders } from '../../redux/NPCharactersSlice';
import { useDispatch } from 'react-redux';

const ListCardFolder = ({
  name,
  data,
  i,
}: {
  name: string;
  data: any;
  i: number;
}) => {
  const [clicked, setClicked] = useState(false);
  const [editable, setEditable] = useState(true);
  const [nameTest, setNameTest] = useState(name);
  const [star, setStar] = useState(true);
  const dispatch = useDispatch();

  const deleteFolderButtonHandler = () => {
    if (
      window.confirm(
        'Na pewno chcesz usunąć folder wraz ze wszystkimi bohaterami?'
      )
    ) {
      deleteFolder(name);
      getFolders()
        .then((res) => {
          if (res) {
            // Do naprawienia
            setTimeout(() => {
              dispatch(setFolders([...res]));
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
          <StarIcon
            // @ts-ignore: Unreachable code error
            sx={{ color: star && '#c9c600' }}
          />
        </IconButton>
        <IconButton onClick={deleteFolderButtonHandler}>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton
          // @ts-ignore: Unreachable code error
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
      {clicked && (
        <ul className="listOfNPC">
          {data &&
            data.map((file: any, i: number) => {
              return (
                <ListCardNPC
                  name={file}
                  folderName={name}
                  key={`list-card-NPC-${i}`}
                />
              );
            })}

          <AddNPCButton folderName={name} />
        </ul>
      )}
    </>
  );
};

export default ListCardFolder;
