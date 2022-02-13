import './style.css';
import MainUserInfo from '../components/MainUserInfo';
import NPCNav from '../components/NPCNav';
import NPCInfo from '../components/NPCPage/NPCInfo';
import { useState } from 'react';

const NPCPage = () => {
  const [editable, setEditable] = useState(false);

  return (
    <div className='mainpage-container'>
      <MainUserInfo />
      <NPCNav editable={editable} setEditable={setEditable} />
      <NPCInfo editable={editable} />
    </div>
  );
};

export default NPCPage;
