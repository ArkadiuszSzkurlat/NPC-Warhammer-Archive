import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './npcinfo.css';
import AvatarImg from './face.jpg';
import StatInput from './StatInput';

const NPCInfo = ({ editable }) => {
  const [NPC, setNPC] = useState({
    mainInfo: {
      race: 'Niziołek',
      class: 'N/A',
      status: 'Brąz 5',
      age: 17,
      height: 110,
    },
    stats: [45, 56, 45, 35, 45, 26, 35, 36, 42, 33],
    skills: ['Magia Prosta (51)', 'Alchemia (76)'],
    items: ['Broń +6', 'Czapka', 'Skórzana kurta (PP 1)'],
    description:
      'Rogać to niziołek banita, całe życie zajmuje się napadaniem na ludzi. Nie atakuje on jednak bezbronnych ludzi ale stara się wybierać swoje cele ze względu na ich podejście do niższych warstw społęcznych',
  });

  const [NPCStats, setNPCStats] = useState(NPC.stats);

  const handleChangeNPCStats = async (e, i) => {
    const { name, value } = e.target;
    const valueNumber = Number(value);

    let NPCStatsLET = NPC.stats;
    NPCStatsLET[name] = valueNumber;

    setNPCStats((prevState) => ({
      ...prevState,
      [name]: valueNumber,
    }));
  };

  return (
    <div className='npc'>
      {/* TOP */}
      <div className='npc-top'>
        {/* IMG */}
        <div className='npc-top-avatar'>
          <img src={AvatarImg} className='npc-top-avatar-img' alt='avatar' />
          <Typography variant='h6' className='npc-top-avatar-nickname'>
            Reaper Rogaś
          </Typography>
        </div>
        {/* Main info */}
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
        <ul>
          {NPC.skills.map((skill) => (
            <li style={{ paddingBottom: '5px' }}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className='npc_skills'>
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
