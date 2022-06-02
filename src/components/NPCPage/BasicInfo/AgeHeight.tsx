import { Typography } from '@mui/material';
import React from 'react';

const AgeHeight = ({
  editable,
  handleSingleItemChange,
  infoType,
  NPC,
}: {
  editable: boolean;
  infoType: string;
  handleSingleItemChange: (inputValue: string, type: string) => Promise<void>;
  NPC: any;
}) => {
  //infoType ma być string
  return (
    <div
      className="npc-mainInfo--BasicInfo"
      style={{ justifyContent: 'flex-start' }}
    >
      <Typography variant="body1" className="npc-mainInfo--BasicInfo--label">
        {`${infoType === 'age' ? 'Wiek' : 'Wzrost'}: `}
      </Typography>
      <input
        style={{ display: 'inline-block' }}
        type="number"
        value={NPC[infoType]}
        disabled={!editable}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleSingleItemChange(e.target.value, infoType);
        }}
      />
    </div>
  );
};

export default AgeHeight;
