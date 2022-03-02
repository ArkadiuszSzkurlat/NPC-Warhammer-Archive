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

  const singleListItemChange = async (e, thing, i) => {
    const { name, value } = e.target;

    let NPCThings = NPC[thing];
    NPCThings[name] = value;

    setNPC((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSingleItemChange = async (e, type, i) => {
    const { name, value } = e.target;
    setNPC((prevState) => ({
      ...prevState,
      [type]: value,
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
          <input
            className='npc-top-avatar-nickname'
            type='text'
            value={NPC.name}
            disabled={!editable}
            onChange={(e) => {
              handleSingleItemChange(e, 'name');
            }}
          />
        </div>
        {/* Main info */}
        {/* TODO dodać możliwość edycji najważniejszych cech */}
        <div style={{ color: 'white' }}>
          <Typography variant='body1'>
            Rasa:{' '}
            <input
              type='text'
              value={NPC.race}
              disabled={!editable}
              onChange={(e) => {
                handleSingleItemChange(e, 'race');
              }}
            />
          </Typography>
          <Typography variant='body1'>
            Klasa:{' '}
            <input
              type='text'
              value={NPC.class}
              disabled={!editable}
              onChange={(e) => {
                handleSingleItemChange(e, 'class');
              }}
            />
          </Typography>
          <Typography variant='body1'>
            Status:{' '}
            <input
              type='text'
              value={NPC.status}
              disabled={!editable}
              onChange={(e) => {
                handleSingleItemChange(e, 'status');
              }}
            />
          </Typography>
          <Typography variant='body1'>
            Wiek:{' '}
            <input
              type='text'
              value={NPC.age}
              disabled={!editable}
              onChange={(e) => {
                handleSingleItemChange(e, 'age');
              }}
            />
          </Typography>
          <Typography variant='body1'>
            Wzrost:{' '}
            <input
              type='text'
              value={NPC.height}
              disabled={!editable}
              onChange={(e) => {
                handleSingleItemChange(e, 'height');
              }}
            />
          </Typography>
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
              itemType={'skills'}
              index={index}
              editable={editable}
              handleChange={singleListItemChange}
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
          {NPC.items.map((item, index) => (
            <Skill
              style={{ paddingBottom: '5px' }}
              text={item}
              index={index}
              itemType={'items'}
              editable={editable}
              handleChange={singleListItemChange}
            />
          ))}
        </ul>
      </div>
      <div className='npc_skills'>
        {/* TODO Dodać możliwość edycji opisu */}
        <Typography variant='body1' className='npc_skills-title'>
          Opis postaci
        </Typography>
        <textarea
          className='npc_skills--textArea'
          type='text'
          value={NPC.description}
          disabled={!editable}
          onChange={(e) => {
            handleSingleItemChange(e, 'description');
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NPCInfo;
