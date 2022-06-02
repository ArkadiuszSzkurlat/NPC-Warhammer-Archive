import * as React from 'react';
import {
  Autocomplete,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material/';

const Race = ({
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
  const racesNames = ['Człowiek', 'Krasnolud', 'Niziołek', 'Elf', 'Gnom'];
  return (
    <div className="npc-mainInfo--BasicInfo">
      <Typography
        className="npc-mainInfo--BasicInfo--label"
        variant="body1"
      >{`Rasa: `}</Typography>
      <Autocomplete
        freeSolo
        className="npc-mainInfo--BasicInfo--Autocomplete"
        fullWidth
        disabled={!editable}
        inputValue={NPC[infoType]}
        options={racesNames}
        onInputChange={(e, newInputValue) => {
          handleSingleItemChange(newInputValue, 'race');
        }}
        renderInput={(params) => <TextField {...params} />}
      ></Autocomplete>
    </div>
  );
};

export default Race;
