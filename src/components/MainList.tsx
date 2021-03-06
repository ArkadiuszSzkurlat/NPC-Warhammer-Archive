import React, { useState } from 'react';
import ListCardFolder from './MainPage/ListCardFolder';
import '../components/MainPage/listcard.css';
import ListCardNPC from './MainPage/ListCardNPC';
import AddNPCButton from './MainPage/AddNPCButton';
import AddFolderButton from './MainPage/AddFolderButton';
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   resetServerContext,
// } from 'react-beautiful-dnd';
import { useEffect } from 'react';
import { getNPCs, getFolders } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setNPCharacters, setFolders } from '../redux/NPCharactersSlice';
import { Folders, NpcInitialRootState, NPCWithAvatar } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

// resetServerContext();

const MainList = () => {
  const NPCharacters = useSelector(
    (state: NpcInitialRootState) => state.NPCharactersSlice.npcs
  );
  const foldersFromStore: Folders[] = useSelector(
    (state: NpcInitialRootState) => state.NPCharactersSlice.folders
  );
  const [folders, setFolders] = useState(foldersFromStore);

  useEffect(() => {
    setFolders(foldersFromStore);
  }, [foldersFromStore]);
  const dispatch = useDispatch();

  useEffect(() => {
    getNPCs()
      .then((res) => {
        if (res) {
          dispatch(setNPCharacters(res));
        }
        return null;
      })
      .catch((err) => {
        console.log(err);
      });
    getFolders()
      .then((folders) => {
        if (folders) {
          dispatch(() => {
            setFolders([...folders]);
          });
        }
        return folders;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ul className="listOfNPC">
      {NPCharacters &&
        NPCharacters.map((file: NPCWithAvatar, i: number) => {
          return (
            <>
              <ListCardNPC
                name={file.name}
                key={`NPC-Card-${i}`}
                folderName="main"
                avatarURL={file.avatarURL}
              />
            </>
          );
        })}
      <AddNPCButton folderName="main" />
      {folders &&
        folders.map((folder: Folders, i: number) => {
          return (
            <>
              <ListCardFolder
                name={folder.name}
                key={uuidv4()}
                data={folder.files}
              />
            </>
          );
        })}
      <AddFolderButton setFolders={setFolders} />
    </ul>
  );
};

export default MainList;
