import './style.css';
import MainUserInfo from '../components/MainUserInfo';
import NPCNav from '../components/NPCNav';
import NPCInfo from '../components/NPCPage/NPCInfo';
import { useEffect, useState } from 'react';
import { NPCArchetype } from '../redux/NPCSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const NPCPage = () => {
  const NPCSlice = useSelector((state: RootState) => state.NPCSlice);
  const [editable, setEditable] = useState(false);
  const [saved, setSaved] = useState(false);
  const [NPC, setNPC] = useState<NPCArchetype>(NPCSlice);

  useEffect(() => {
    setNPC(NPCSlice);
  }, [NPCSlice]);
  return (
    <div className="mainpage-container mainpage-container--NPCPAGE">
      <MainUserInfo />
      <NPCNav
        editable={editable}
        setEditable={setEditable}
        saved={saved}
        setSaved={setSaved}
      />
      <NPCInfo editable={editable} NPC={NPC} setNPC={setNPC} saved={saved} />
    </div>
  );
};

export default NPCPage;
