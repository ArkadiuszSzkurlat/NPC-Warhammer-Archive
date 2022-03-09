import ListCardFolder from './MainPage/ListCardFolder';
import '../components/MainPage/listcard.css';
import ListCardNPC from './MainPage/ListCardNPC';

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
    type: 'files',
    name: 'Ubersreik',
    data: [
      { type: 'files', data: [] },
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
    ],
  },
];

const MainList = () => {
  return (
    <div className='list'>
      {files.map((file) => {
        if (file.type === 'files') {
          return <ListCardFolder name={file.name} />;
        } else if (file.type === 'NPC') {
          return (
            <div className='listOfNPC'>
              <ListCardNPC name={file.data.name} />
              <ListCardNPC name={file.data.name} />
              <ListCardNPC name={file.data.name} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default MainList;
