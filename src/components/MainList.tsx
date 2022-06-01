import React from 'react';
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
import { Folders, NpcInitialRootState } from '../types/types';
// resetServerContext();

const MainList = () => {
  const NPCharacters = useSelector(
    (state: NpcInitialRootState) => state.NPCharactersSlice.names
  );
  console.log(NPCharacters);
  const folders: Folders[] = useSelector(
    (state: NpcInitialRootState) => state.NPCharactersSlice.folders
  );
  console.log(folders);
  const dispatch = useDispatch();
  // const [mainListSnapshot, setMainListSnapshot] = useState();
  // const Reorder = (list, startIndex, endIndex) => {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);
  //   return result;
  // };

  useEffect(() => {
    getNPCs()
      .then((res) => {
        if (res) {
          dispatch(setNPCharacters([...res]));
        }
        return null;
      })
      .catch((err) => {
        console.log(err);
      });
    getFolders()
      .then((folders) => {
        if (folders) {
          dispatch(setFolders([...folders]));
        }
        return folders;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleonDragEnd = (result) => {
  //   console.log('RESULT', result);
  //   if (!result.destination) return;
  //   const items = Array.from(characters);

  //   console.log('ITEMS', items);

  //   if (result.source.droppableId === 'mainList') {
  //     const selectedCharacters = Reorder(
  //       items,
  //       result.source.index,
  //       result.destination.index
  //     );
  //     updateCharacters(selectedCharacters);
  //   } else {
  //     const indexOfItem = items.findIndex((item) => {
  //       return item.name === result.type;
  //     });

  //     const newList = Reorder(
  //       items[indexOfItem].data,
  //       result.source.index,
  //       result.destination.index
  //     );

  //     items[indexOfItem].data = newList;

  //     updateCharacters(items);

  //     console.log(items);
  //   }
  // };

  return (
    <ul className="listOfNPC">
      {NPCharacters &&
        NPCharacters.map((file: string, i: number) => {
          return (
            <>
              <ListCardNPC name={file} key={`NPC-Card-${i}`} />
            </>
          );
        })}
      <AddNPCButton folderName="main" />
      {folders &&
        folders.map((folder: Folders, i: number) => {
          console.log(folder);
          return (
            <>
              <ListCardFolder
                name={folder.name}
                key={`list-card-${i}`}
                data={folder.files}
              />
            </>
          );
        })}
      <AddFolderButton />
    </ul>
  );
};

export default MainList;
