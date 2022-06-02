import { TextField, Autocomplete, Typography } from '@mui/material';
import React, { useState } from 'react';
import { statusTypes } from './charactersData';

const Status = ({
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
      <Typography className="npc-mainInfo--BasicInfo--label" variant="body1">
        Status
      </Typography>
      <Autocomplete
        freeSolo
        className="npc-mainInfo--BasicInfo--Autocomplete"
        disabled={!editable}
        disablePortal
        fullWidth
        options={statusTypes}
        renderInput={(params) => <TextField {...params} />}
        inputValue={NPC[infoType]}
        onInputChange={(e, newInputValue) => {
          handleSingleItemChange(newInputValue, infoType);
        }}
      />
    </div>
  );
};

export default Status;
