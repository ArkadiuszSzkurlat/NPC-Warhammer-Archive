import React from 'react';
import { TextField, Autocomplete, Typography } from '@mui/material/';
import { classes } from './charactersData';

const Class = ({
  editable,
  handleSingleItemChange,
  NPC,
  infoType,
}: {
  editable: boolean;
  handleSingleItemChange: (inputValue: string, type: string) => Promise<void>;
  NPC: any;
  infoType: string;
}) => {
  return (
    <div className="npc-mainInfo--BasicInfo">
      <Typography
        className="npc-mainInfo--BasicInfo--label"
        variant="body1"
      >{`Klasa: `}</Typography>
      <Autocomplete
        className="npc-mainInfo--BasicInfo--Autocomplete"
        freeSolo
        fullWidth
        disabled={!editable}
        disablePortal
        options={classes}
        inputValue={NPC[infoType]}
        onInputChange={(e, newInputValue) => {
          handleSingleItemChange(newInputValue, 'class');
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  );
};

export default Class;
