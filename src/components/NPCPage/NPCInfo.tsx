import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './npcinfo.css';
import StatInput from './StatInput';
import Skill from './Skill';
import AddItem from './AddItem';
import { useDispatch } from 'react-redux';
import { changeNPCStats } from '../../redux/NPCSlice';
import { NPCArchetype, RaceType } from '../../types/types';
import Race from './BasicInfo/Race';
import Class from './BasicInfo/Class';
import Status from './BasicInfo/Status';
import AgeHeight from './BasicInfo/AgeHeight';
import CasinoIcon from '@mui/icons-material/Casino';
import { races } from './BasicInfo/charactersData';
import Avatar from './Avatar';

const NPCInfo = ({
  editable,
  NPC,
  setNPC,
}: {
  editable: boolean;
  NPC: any;
  setNPC: React.Dispatch<React.SetStateAction<NPCArchetype>>;
}) => {
  const dispatch = useDispatch();
  const [NPCStats, setNPCStats] = useState(NPC.stats);

  useEffect(() => {
    setNPCStats(NPC.stats);
  }, [NPC.stats]);

  //Zmienia staty postaci
  const handleChangeNPCStats = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;

    const NPCStatsLET = [...NPCStats];
    NPCStatsLET[+name] = +value;
    setNPCStats(NPCStatsLET);
    setNPC((prevState: NPCArchetype) => ({
      ...prevState,
      ['stats']: NPCStatsLET,
    }));
  };

  const singleListItemChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    thing: string
  ) => {
    const { name, value } = e.target;

    const NPCThings = [...NPC[thing]];
    NPCThings[+name] = value;
    setNPC((prevState: NPCArchetype) => ({
      ...prevState,
      [thing]: NPCThings,
    }));
  };

  const addListItem = async (thing: string) => {
    const NPCThings = [...NPC[thing]];
    NPCThings.push('');

    setNPC((prevState: NPCArchetype) => ({
      ...prevState,
      [thing]: NPCThings,
    }));
  };

  const deleteItem = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    thing: string,
    i: string
  ) => {
    const NPCThings = [...NPC[thing]];
    NPCThings.splice(+i, 1);

    setNPC((prevState: NPCArchetype) => ({
      ...prevState,
      [thing]: NPCThings,
    }));
  };

  const handleSingleItemChange = async (inputValue: string, type: string) => {
    setNPC((prevState: NPCArchetype) => ({
      ...prevState,
      [type]: inputValue,
    }));
  };

  const randomStatsGenerator = () => {
    const raceInfo = races.find((e: RaceType) => e.name === NPC.race);
    if (!raceInfo) {
      alert('Niestety do tej rasy aktualnie nie ma losowania statystyk');
      return;
    }
    const randomStats = raceInfo?.initialStats.map((stat) => {
      const DiceThrow = () => Math.floor(Math.random() * (10 - 1)) + 1;
      return stat + DiceThrow() + DiceThrow();
    });
    setNPCStats(randomStats);
    setNPC((prevState: NPCArchetype) => ({
      ...prevState,
      ['stats']: randomStats,
    }));
  };

  //zapis zmian
  useEffect(() => {
    setNPC((prevState: NPCArchetype) => ({
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
        <Avatar
          editable={editable}
          NPC={NPC}
          handleSingleItemChange={handleSingleItemChange}
        />
        {/* Main info */}
        <div className="npc-mainInfo">
          <Race
            NPC={NPC}
            editable={editable}
            handleSingleItemChange={handleSingleItemChange}
            infoType="race"
          ></Race>
          <Class
            NPC={NPC}
            editable={editable}
            handleSingleItemChange={handleSingleItemChange}
            infoType="class"
          ></Class>
          <Status
            NPC={NPC}
            editable={editable}
            handleSingleItemChange={handleSingleItemChange}
            infoType="status"
          ></Status>
          <AgeHeight
            editable={editable}
            handleSingleItemChange={handleSingleItemChange}
            infoType="Age"
            NPC={NPC}
            setNPC={setNPC}
          ></AgeHeight>
          <AgeHeight
            editable={editable}
            handleSingleItemChange={handleSingleItemChange}
            infoType="Height"
            NPC={NPC}
            setNPC={setNPC}
          ></AgeHeight>
        </div>

        <IconButton
          disabled={!editable}
          id="npc-top--statsGenerator"
          onClick={randomStatsGenerator}
        >
          <CasinoIcon style={{ fontSize: 40 }} />
        </IconButton>
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
            NPCStats.map((stat: number, i: number) => {
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
          {NPC.skills.map((skill: string, i: number) => (
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
          {NPC.talents.map((talent: string, i: number) => (
            <Skill
              text={talent}
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
            NPC.items.map((item: string, i: number) => (
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
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleSingleItemChange(e.target.value, 'description');
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NPCInfo;
