import React, { useState } from 'react';
import { Card, Avatar, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListCardNPC from './ListCardNPC';
import AddNPCButton from './AddNPCButton';
import { deleteFolder, getFolders } from '../../firebase';
import { setFolders } from '../../redux/NPCharactersSlice';
import { useDispatch } from 'react-redux';

const ListCardFolder = ({ name, data }: { name: string; data: string[] }) => {
  console.log(name);
  const [clicked, setClicked] = useState(false);
  const [editable, setEditable] = useState(true);
  const [nameTest, setNameTest] = useState(name);
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
          if (!res) return;
          dispatch(setFolders([...res]));
          return null;
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNameTest(e.target.value);
          }}
        />
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
            data.map((file: string, i: number) => {
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
