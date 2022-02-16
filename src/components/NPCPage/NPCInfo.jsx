import { ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './npcinfo.css';
import AvatarImg from './face.jpg';
import StatInput from './StatInput';
import Skill from './Skill';

const NPCInfo = ({ editable, NPC, setNPC, saved }) => {
  const [NPCStats, setNPCStats] = useState(NPC.stats);

  //Zmienia staty postaci
  const handleChangeNPCStats = (e, i) => {
    const { name, value } = e.target;
    const valueNumber = Number(value);

    let NPCStatsLET = NPC.stats;
    NPCStatsLET[name] = valueNumber;

    setNPCStats((prevState) => ({
      ...prevState,
      [name]: valueNumber,
    }));
  };

  //zmiana skillów
  const handleChangeSkill = async (e, i) => {
    const { name, value } = e.target;
    console.log(name, value);

    let NPCSkills = NPC.skills;
    NPCSkills[name] = value;

    setNPC((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //zapis zmian
  let started = true;
  useEffect(() => {
    if (!editable && saved) {
      let NPCStatsLET = Object.values(NPCStats);
      setNPC((prevState) => ({
        ...prevState,
        stats: NPCStatsLET,
      }));
    } else if (editable && saved) {
      alert('Musisz wyłączyć opcje edytowania');
    }
  }, [saved]);

  useEffect(() => {
    console.log(NPC);
  }, [NPC]);
  return (
    <div className='npc'>
      {/* TOP */}
      <div className='npc-top'>
        {/* IMG */}
        <div className='npc-top-avatar'>
          <img src={AvatarImg} className='npc-top-avatar-img' alt='avatar' />
          {/* TODO Dodać możliwość zmiany nazwy postaci */}
          <Typography variant='h6' className='npc-top-avatar-nickname'>
            Reaper Rogaś
          </Typography>
        </div>
        {/* Main info */}
        {/* TODO dodać możliwość edycji najważniejszych cech */}
        <div style={{ color: 'white' }}>
          <Typography variant='body1'>Rasa: {NPC.mainInfo.race}</Typography>
          <Typography variant='body1'>Klasa: {NPC.mainInfo.class}</Typography>
          <Typography variant='body1'>Status: {NPC.mainInfo.status}</Typography>
          <Typography variant='body1'>Wiek: {NPC.mainInfo.age}</Typography>
          <Typography variant='body1'>Wzrost: {NPC.mainInfo.height}</Typography>
        </div>
      </div>
      {/* STATS */}
      <table>
        <tr>
          <th>WW</th>
          <th>US</th>
          <th>S</th>
          <th>Wt</th>
          <th>I</th>
          <th>Zw</th>
          <th>Zr</th>
          <th>Int</th>
          <th>Sw</th>
          <th>Ogd</th>
        </tr>
        <tr>
          {NPC.stats &&
            NPC.stats.map((stat, index) => {
              return (
                <th>
                  <StatInput
                    stat={stat}
                    index={index}
                    editable={editable}
                    handleChange={handleChangeNPCStats}
                  />
                </th>
              );
            })}
        </tr>
      </table>
      {/* SKILLS */}
      <div className='npc_skills'>
        <Typography variant='body1' className='npc_skills-title'>
          Umiejętności/talenty
        </Typography>
        {/* TODO Dodać możliwość dodawania i usuwania całych rekordów */}
        <ul>
          {NPC.skills.map((skill, index) => (
            <Skill
              style={{ paddingBottom: '5px' }}
              text={skill}
              index={index}
              editable={editable}
              handleChange={handleChangeSkill}
            />
          ))}
        </ul>
      </div>
      <div className='npc_skills'>
        {/* TODO Dodać możliwość dodawania, usuwania i edycji przedmiotów */}
        <Typography variant='body1' className='npc_skills-title'>
          Przedmioty
        </Typography>
        <ul>
          {NPC.items.map((item) => (
            <li style={{ paddingBottom: '5px' }}>{item}</li>
          ))}
        </ul>
      </div>
      <div className='npc_skills'>
        {/* TODO Dodać możliwość edycji opisu */}
        <Typography variant='body1' className='npc_skills-title'>
          Opis postaci
        </Typography>
        <Typography variant='body1' style={{ margin: '1em' }}>
          {NPC.description}
        </Typography>
      </div>
    </div>
  );
};

export default NPCInfo;
