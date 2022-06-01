import React from 'react';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './npcinfo.css';
import AvatarImg from '../../resources/images/face.jpg';
import StatInput from './StatInput';
import Skill from './Skill';
import BasicInfo from './BasicInfo';
import AddItem from './AddItem';
import { useDispatch } from 'react-redux';
import { changeNPCStats } from '../../redux/NPCSlice';

interface BasicInfoNPC {
  eng: string;
  pl: string;
}

const NPCInfo = ({
  editable,
  NPC,
  setNPC,
}: {
  editable: boolean;
  NPC: any;
  setNPC: any;
}) => {
  const dispatch = useDispatch();
  const [NPCStats, setNPCStats] = useState(NPC.stats);

  useEffect(() => {
    setNPCStats(NPC.stats);
  }, [NPC.stats]);

  const NPCBasicInfo: BasicInfoNPC[] = [
    { eng: 'race', pl: 'Rasa' },
    { eng: 'class', pl: 'Klasa' },
    { eng: 'status', pl: 'Status' },
    { eng: 'age', pl: 'Wiek' },
    { eng: 'height', pl: 'Wzrost' },
  ];

  //Zmienia staty postaci
  const handleChangeNPCStats = (e: any) => {
    const { name, value }: { name: number; value: number } = e.target;

    const NPCStatsLET = [...NPCStats];
    NPCStatsLET[name] = +value;
    setNPCStats(NPCStatsLET);
    setNPC((prevState: any) => ({
      ...prevState,
      ['stats']: NPCStatsLET,
    }));
  };

  const singleListItemChange = async (e: any, thing: string) => {
    const { name, value } = e.target;

    const NPCThings = [...NPC[thing]];
    NPCThings[name] = value;
    setNPC((prevState: any) => ({
      ...prevState,
      [thing]: NPCThings,
    }));
  };

  const addListItem = async (thing: any) => {
    const NPCThings = [...NPC[thing]];
    NPCThings.push('');

    setNPC((prevState: any) => ({
      ...prevState,
      [thing]: NPCThings,
    }));
  };

  const deleteItem = async (e: any, thing: string, i: any) => {
    const NPCThings = [...NPC[thing]];
    NPCThings.splice(i, 1);

    setNPC((prevState: any) => ({
      ...prevState,
      [thing]: NPCThings,
    }));
  };

  const handleSingleItemChange = async (e: any, type: any) => {
    const { value } = e.target;
    setNPC((prevState: any) => ({
      ...prevState,
      [type]: value,
    }));
  };

  //zapis zmian
  useEffect(() => {
    console.log(NPC);
    setNPC((prevState: any) => ({
      ...prevState,
      stats: NPCStats,
    }));
    dispatch(changeNPCStats(NPC));
  }, [editable]);

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
                key={`basic-info-${i}`}
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
          {NPCStats &&
            NPCStats.map((stat: any, i: any) => {
              return (
                <th key={`stat-input-${i}`}>
                  <StatInput
                    stat={stat}
                    index={i}
                    editable={editable}
                    handleChange={handleChangeNPCStats}
                    key={`stat-input-${i}`}
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
          {NPC.skills.map((skill: any, i: any) => (
            <Skill
              key={`skill-${i}`}
              text={skill}
              itemType={'skills'}
              index={i}
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
          {NPC.talents.map((item: any, i: any) => (
            <Skill
              text={item}
              key={`talent-${i}`}
              index={i}
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
            NPC.items.map((item: any, i: any) => (
              <Skill
                key={`item-${i}`}
                text={item}
                index={i}
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
