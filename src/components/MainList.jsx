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
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

resetServerContext();

let files = [
  {
    id: uuidv4(),
    type: 'NPC',
    data: {
      name: 'Reaper Rogaś',
      race: 'Niziołek',
      class: 'N/A',
      status: 'Brąz 5',
      age: 17,
      height: 110,
      stats: [45, 56, 45, 35, 45, 26, 35, 36, 42, 33],
      skills: ['Magia Prosta (51)', 'Alchemia (76)'],
      talents: ['Widzenie w ciemmności', 'Oburęczność'],
      items: ['Broń +6', 'Czapka', 'Skórzana kurta (PP 1)'],
      description:
        'Rogaś to niziołek banita, całe życie zajmuje się napadaniem na ludzi. Nie atakuje on jednak bezbronnych ludzi ale stara się wybierać swoje cele ze względu na ich podejście do niższych warstw społecznych',
    },
  },
  {
    id: uuidv4(),
    type: 'NPC',
    data: {
      name: 'Clementine',
      race: 'Człowiek',
      class: 'N/A',
      status: 'Złoto 1',
      age: 17,
      height: 110,
      stats: [45, 56, 45, 35, 45, 26, 35, 36, 42, 33],
      skills: ['Magia Prosta (51)', 'Alchemia (76)'],
      talents: ['Widzenie w ciemmności', 'Oburęczność'],
      items: ['Broń +6', 'Czapka', 'Skórzana kurta (PP 1)'],
      description:
        'Rogaś to niziołek banita, całe życie zajmuje się napadaniem na ludzi. Nie atakuje on jednak bezbronnych ludzi ale stara się wybierać swoje cele ze względu na ich podejście do niższych warstw społecznych',
    },
  },
  {
    id: uuidv4(),
    type: 'files',
    name: 'Ubersreik',
    data: [
      {
        id: uuidv4(),
        type: 'NPC',
        data: {
          name: 'Galmarnel',
          race: 'Elf',
          class: 'N/A',
          status: 'Brąz 3',
          age: 17,
          height: 110,
          stats: [45, 56, 45, 35, 45, 26, 35, 36, 42, 33],
          skills: ['Magia Prosta (51)', 'Alchemia (76)'],
          talents: ['Widzenie w ciemmności', 'Oburęczność'],
          items: ['Broń +6', 'Czapka', 'Skórzana kurta (PP 1)'],
          description:
            'Rogaś to niziołek banita, całe życie zajmuje się napadaniem na ludzi. Nie atakuje on jednak bezbronnych ludzi ale stara się wybierać swoje cele ze względu na ich podejście do niższych warstw społecznych',
        },
      },
      {
        id: uuidv4(),
        type: 'NPC',
        data: {
          name: 'Kara',
          race: 'Człowiek',
          class: 'Ochroniarz',
          status: 'Srebro 3',
          age: 17,
          height: 110,
          stats: [45, 56, 45, 35, 45, 26, 35, 36, 42, 33],
          skills: ['Magia Prosta (51)', 'Alchemia (76)'],
          talents: ['Widzenie w ciemmności', 'Oburęczność'],
          items: ['Broń +6', 'Czapka', 'Skórzana kurta (PP 1)'],
          description:
            'Rogaś to niziołek banita, całe życie zajmuje się napadaniem na ludzi. Nie atakuje on jednak bezbronnych ludzi ale stara się wybierać swoje cele ze względu na ich podejście do niższych warstw społecznych',
        },
      },
    ],
  },
];

const MainList = () => {
  const [characters, updateCharacters] = useState(files);
  const [mainListSnapshot, setMainListSnapshot] = useState();
  const Reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleonDragEnd = (result) => {
    console.log('RESULT', result);
    if (!result.destination) return;
    const items = Array.from(characters);

    console.log('ITEMS', items);

    if (result.source.droppableId === 'mainList') {
      const selectedCharacters = Reorder(
        items,
        result.source.index,
        result.destination.index
      );
      updateCharacters(selectedCharacters);
    } else {
      const indexOfItem = items.findIndex((item) => {
        return item.name === result.type;
      });

      const newList = Reorder(
        items[indexOfItem].data,
        result.source.index,
        result.destination.index
      );

      items[indexOfItem].data = newList;

      updateCharacters(items);

      console.log(items);
    }
  };

  return (
    <DragDropContext onDragEnd={handleonDragEnd}>
      <Droppable droppableId="mainList">
        {(provided, snapshot) => {
          setMainListSnapshot(snapshot);
          return (
            <ul
              className="listOfNPC"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {characters.map((file, i) => {
                if (file.type === 'files') {
                  return (
                    <Draggable key={file.id} draggableId={file.id} index={i}>
                      {(provided) => (
                        <ListCardFolder
                          name={file.name}
                          data={file.data}
                          index={i}
                          provided={provided}
                          snapshot={mainListSnapshot}
                        />
                      )}
                    </Draggable>
                  );
                } else if (file.type === 'NPC') {
                  return (
                    <Draggable key={file.id} draggableId={file.id} index={i}>
                      {(provided) => (
                        <ListCardNPC
                          name={file.data.name}
                          index={i}
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  );
                } else return;
              })}
              {!snapshot.isDraggingOver && (
                <AddFolderButton snapshot={mainListSnapshot} />
              )}

              {provided.placeholder}
            </ul>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default MainList;
