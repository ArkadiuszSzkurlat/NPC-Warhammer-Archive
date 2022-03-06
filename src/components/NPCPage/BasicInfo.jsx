import { Typography } from '@mui/material';

const BasicInfo = ({ handleSingleItemChange, editable, NPC, infoType }) => {
  return (
    <Typography variant='body1'>
      {infoType.pl + ': '}
      <input
        type='text'
        value={NPC[infoType.eng]}
        disabled={!editable}
        onChange={(e) => {
          handleSingleItemChange(e, infoType.eng);
        }}
      />
    </Typography>
  );
};

export default BasicInfo;
