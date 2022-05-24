import ListCardFolder from './MainPage/ListCardFolder';
import '../components/MainPage/listcard.css';
import ListCardNPC from './MainPage/ListCardNPC';
import AddNPCButton from './MainPage/AddNPCButton';
import AddFolderButton from './MainPage/AddFolderButton';
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { getNPCs } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setNPCharacters } from '../redux/NPCharactersSlice';
resetServerContext();

const MainList = () => {
  const NPCharacters = useSelector(
    (state: any) => state.NPCharactersSlice.names
  );
  // TODO dispatch nie działa
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
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(NPCharacters);
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
              <ListCardNPC name={file} key={`NPC-${i}`} />
            </>
          );
        })}
      <AddNPCButton />
      <AddFolderButton />
    </ul>
  );
};

export default MainList;
