import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Skill = ({
  editable,
  text,
  index,
  handleChange,
  itemType,
  deleteItem,
}: {
  editable: any;
  text: string;
  index: number;
  handleChange: any;
  itemType: string;
  deleteItem: any;
}) => {
  let i = index.toString();
  return (
    <li className="npc_skills-list-item">
      <input
        className="npc_skills-list-item-input"
        type="text"
        value={text}
        name={i}
        disabled={!editable}
        onChange={(e) => handleChange(e, itemType, i)}
      />
      {editable && (
        <IconButton
          sx={{ color: '#2e2e2e', padding: '0' }}
          aria-label="upload picture"
          component="span"
          size="small"
          onClick={(e: any) => {
            deleteItem(e, itemType, i);
          }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      )}
    </li>
  );
};

export default Skill;
