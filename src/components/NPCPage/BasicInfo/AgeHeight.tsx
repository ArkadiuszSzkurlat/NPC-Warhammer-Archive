import { IconButton, Typography } from '@mui/material';
import React from 'react';
import CasinoIcon from '@mui/icons-material/Casino';
import { NPCArchetype, RaceType } from '../../../types/types';
import { races } from './charactersData';

const AgeHeight = ({
  editable,
  handleSingleItemChange,
  infoType,
  NPC,
  setNPC,
}: {
  editable: boolean;
  infoType: string;
  handleSingleItemChange: (inputValue: string, type: string) => Promise<void>;
  NPC: any;
  setNPC: any;
}) => {
  const infoTypeLowerCase = infoType.toLocaleLowerCase();

  const randomAgeHeightGenerator = (infoType: string) => {
    const raceInfo = races.find((e: RaceType) => e.name === NPC.race);

    if (!raceInfo) {
      alert('Niestety do tej rasy aktualnie nie ma losowania statystyk');
      return;
    }
    const DiceThrow = () => Math.floor(Math.random() * (10 - 1)) + 1;
    const initial: number =
      infoType === 'Age' ? raceInfo.initialAge : raceInfo.initialHeight;
    const dice: number =
      infoType === 'Age' ? raceInfo.diceThrowsAge : raceInfo.diceThrowsHeight;

    const calculate = () => {
      let endValue = initial;
      for (let i = 0; i < dice; i++) {
        endValue += DiceThrow();
      }
      return endValue;
    };
    setNPC((prevState: NPCArchetype) => ({
      ...prevState,
      [infoTypeLowerCase]: calculate(),
    }));
    console.log(NPC);
  };

  return (
    <div
      className="npc-mainInfo--BasicInfo"
      style={{ justifyContent: 'flex-start' }}
    >
      <Typography variant="body1" className="npc-mainInfo--BasicInfo--label">
        {`${infoType === 'Age' ? 'Wiek' : 'Wzrost'}: `}
      </Typography>
      <input
        style={{ display: 'inline-block' }}
        type="number"
        value={NPC[infoTypeLowerCase]}
        disabled={!editable}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleSingleItemChange(e.target.value, infoType);
        }}
      />
      <IconButton
        disabled={!editable}
        onClick={() => {
          randomAgeHeightGenerator(infoType);
        }}
      >
        <CasinoIcon style={{ fontSize: 40 }} />
      </IconButton>
    </div>
  );
};

export default AgeHeight;
