import React from 'react';
import { IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useDispatch } from 'react-redux';
import { addNewFolder, getFolders } from '../../firebase';
import { setFolders } from '../../redux/NPCharactersSlice';

const AddFolderButton = ({ setFolders }: { setFolders: any }) => {
  const dispatch = useDispatch();

  const addNewFolderButtonHandler = () => {
    const name = prompt('Jak chcesz nazwać folder?');
    if (name) {
      addNewFolder(name)
        .then(() => {
          getFolders()
            .then((res) => {
              if (res) {
                dispatch(() => {
                  setFolders([...res]);
                });
                setFolders([...res]);
              }
              return res;
            })
            .catch((err) => {
              console.log(err);
            });
          return null;
        })
        .catch((err) => console.log(err));
    }
    return null;
  };

  return (
    <div
      className="addFolderButton"
      // @ts-ignore: Unreachable code error
      sx={{ background: '#E3EDE6' }}
      elevation={8}
      onClick={addNewFolderButtonHandler}
    >
      <IconButton
        sx={{
          position: 'absolute',
          color: 'rgba(0,0,0,0.3)',
          top: 0,
          right: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <AddRoundedIcon sx={{ fontSize: '100px' }} />
      </IconButton>
    </div>
  );
};

export default AddFolderButton;
