import { Typography } from '@mui/material';

const BasicInfo = ({
  handleSingleItemChange,
  editable,
  NPC,
  infoType,
}: {
  handleSingleItemChange: (e: any, type: any) => Promise<void>;
  editable: boolean;
  NPC: any;
  infoType: { eng: string; pl: string };
}) => {
  return (
    <Typography variant="body1">
      {infoType.pl + ': '}
      <input
        type="text"
        value={NPC[infoType.eng]}
        disabled={!editable}
        onChange={(e: any) => {
          handleSingleItemChange(e, infoType.eng);
        }}
      />
    </Typography>
  );
};

export default BasicInfo;
