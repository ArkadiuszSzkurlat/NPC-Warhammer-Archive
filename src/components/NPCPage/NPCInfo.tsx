import { ListItem, Typography, IconButton } from '@mui/material';
import { MouseEventHandler, useEffect, useState } from 'react';
import './npcinfo.css';
import AvatarImg from '../../resources/images/face.jpg';
import StatInput from './StatInput';
import Skill from './Skill';
import BasicInfo from './BasicInfo';
import AddItem from './AddItem';
import { AnyNaptrRecord } from 'dns';

interface BasicInfoNPC {
  eng: string;
  pl: string;
}

const NPCInfo = ({
  editable,
  NPC,
  setNPC,
  saved,
}: {
  editable: boolean;
  NPC: any;
  setNPC: any;
  saved: boolean;
}) => {
  const [NPCStats, setNPCStats] = useState(NPC.stats);

  let NPCBasicInfo: BasicInfoNPC[] = [
    { eng: 'race', pl: 'Rasa' },
    { eng: 'class', pl: 'Klasa' },
    { eng: 'status', pl: 'Status' },
    { eng: 'age', pl: 'Wiek' },
    { eng: 'height', pl: 'Wzrost' },
  ];

  //Zmienia staty postaci
  const handleChangeNPCStats = (e: any) => {
    const { name, value }: { name: string; value: string } = e.target;
    const valueNumber = Number(value);

    let NPCStatsLET = NPC.stats;
    NPCStatsLET[name] = valueNumber;

    setNPCStats((prevState: any) => ({
      ...prevState,
      [name]: valueNumber,
    }));
  };

  const singleListItemChange = async (e: any, thing: any, i: any) => {
    const { name, value } = e.target;

    let NPCThings = NPC[thing];
    NPCThings[name] = value;

    setNPC((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addListItem = async (thing: any) => {
    let NPCThings = NPC[thing];
    NPCThings.push('');

    setNPC((prevState: any) => ({
      ...prevState,
      [thing]: NPCThings,
    }));
  };

  const deleteItem = async (e: any, thing: any, i: any) => {
    let NPCThings = NPC[thing];
    NPCThings.splice(i, 1);

    setNPC((prevState: any) => ({
      ...prevState,
      [thing]: NPCThings,
    }));
  };

  const handleSingleItemChange = async (e: any, type: any) => {
    const { name, value } = e.target;
    setNPC((prevState: any) => ({
      ...prevState,
      [type]: value,
    }));
  };

  //zapis zmian
  let started = true;
  useEffect(() => {
    if (!editable && saved) {
      let NPCStatsLET = Object.values(NPCStats);
      setNPC((prevState: any) => ({
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
    <div className="npc">
      {/* TOP */}
      <div className="npc-top">
        {/* IMG */}
        <div className="npc-top-avatar">
          <img src={AvatarImg} className="npc-top-avatar-img" alt="avatar" />
          <input
            className="npc-top-avatar-nickname"
            type="text"
            value={NPC.name}
            disabled={!editable}
            onChange={(e) => {
              handleSingleItemChange(e, 'name');
            }}
          />
        </div>
        {/* Main info */}
        <div className="npc-mainInfo">
          {NPCBasicInfo.map((info, i) => {
            return (
              <BasicInfo
                handleSingleItemChange={handleSingleItemChange}
                editable={editable}
                NPC={NPC}
                infoType={info}
                key={i}
              />
            );
          })}
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
            NPC.stats.map((stat: any, index: any) => {
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
      <div className="npc_skills">
        <Typography variant="body1" className="npc_skills-title">
          Umiejętności
        </Typography>
        <ul className="npc_skills-list">
          {NPC.skills.map((skill: any, index: any) => (
            <Skill
              text={skill}
              itemType={'skills'}
              index={index}
              editable={editable}
              handleChange={singleListItemChange}
              deleteItem={deleteItem}
            />
          ))}
          {editable && (
            <AddItem addListItem={addListItem} itemType={'skills'} />
          )}
        </ul>
      </div>
      {/* Talents */}
      <div className="npc_skills">
        <Typography variant="body1" className="npc_skills-title">
          Talenty
        </Typography>
        <ul className="npc_skills-list">
          {NPC.talents.map((item: any, index: any) => (
            <Skill
              text={item}
              index={index}
              itemType={'talents'}
              editable={editable}
              handleChange={singleListItemChange}
              deleteItem={deleteItem}
            />
          ))}
          {editable && (
            <AddItem addListItem={addListItem} itemType={'talents'} />
          )}
        </ul>
      </div>
      {/* Items */}
      <div className="npc_skills">
        <Typography variant="body1" className="npc_skills-title">
          Przedmioty
        </Typography>
        <ul className="npc_skills-list">
          {NPC.items &&
            NPC.items.map((item: any, index: any) => (
              <Skill
                text={item}
                index={index}
                itemType={'items'}
                editable={editable}
                handleChange={singleListItemChange}
                deleteItem={deleteItem}
              />
            ))}

          {editable && <AddItem addListItem={addListItem} itemType={'items'} />}
        </ul>
      </div>
      <div className="npc_skills">
        <Typography variant="body1" className="npc_skills-title">
          Opis postaci
        </Typography>
        <textarea
          className="npc_skills--textArea"
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
