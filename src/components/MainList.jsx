import ListCardFolder from './MainPage/ListCardFolder';
import '../components/MainPage/listcard.css';
import ListCardNPC from './MainPage/ListCardNPC';
import AddNPCButton from './MainPage/AddNPCButton';
import AddFolderButton from './MainPage/AddFolderButton';

let files = [
  {
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
    type: 'files',
    name: 'Ubersreik',
    data: [
      { type: 'files', data: [] },
      {
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
  return (
    <div className="list">
      {files.map((file, i) => {
        if (file.type === 'files') {
          return <ListCardFolder name={file.name} data={file.data} index={i} />;
        } else return;
      })}

      <div className="listOfNPC">
        {files.map((file, i) => {
          if (file.type === 'NPC') {
            return <ListCardNPC name={file.data.name} index={i} />;
          } else return;
        })}
        <AddNPCButton />
      </div>
      <AddFolderButton />
    </div>
  );
};

export default MainList;
