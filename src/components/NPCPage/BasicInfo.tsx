import React from 'react';
import { Typography } from '@mui/material';

const BasicInfo = ({
  handleSingleItemChange,
  editable,
  NPC,
  infoType,
}: {
  handleSingleItemChange: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => Promise<void>;
  editable: boolean;
  NPC: any;
  infoType: { eng: string; pl: string };
}) => {
  // console.log(NPC);
  return (
    <Typography variant="body1" className="npc-mainInfo--BasicInfo">
      {infoType.pl + ': '}
      <input
        style={{ display: 'inline-block' }}
        type="text"
        value={NPC[infoType.eng]}
        disabled={!editable}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleSingleItemChange(e, infoType.eng);
        }}
      />
    </Typography>
  );
};

export default BasicInfo;
