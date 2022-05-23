import './style.css';
import MainUserInfo from '../components/MainUserInfo';
import NPCNav from '../components/NPCNav';
import NPCInfo from '../components/NPCPage/NPCInfo';
import { useState } from 'react';

const NPCPage = () => {
  const [editable, setEditable] = useState(false);
  const [saved, setSaved] = useState(false);

  interface NPCArchetype {
    name: string;
    race: string;
    class: string;
    status: string;
    age: number;
    height: number;
    stats: Array<number>;
    skills: Array<string>;
    talents: Array<string>;
    items: Array<string>;
    description: string;
  }

  const [NPC, setNPC] = useState<NPCArchetype>({
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
  });

  return (
    <div className="mainpage-container mainpage-container--NPCPAGE">
      <MainUserInfo />
      <NPCNav
        editable={editable}
        setEditable={setEditable}
        saved={saved}
        setSaved={setSaved}
        NPC={NPC}
      />
      <NPCInfo editable={editable} NPC={NPC} setNPC={setNPC} saved={saved} />
    </div>
  );
};

export default NPCPage;
