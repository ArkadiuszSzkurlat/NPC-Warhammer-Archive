import React from 'react';
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
  editable: boolean;
  text: string;
  index: number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    thing: string,
    i: string
  ) => void;
  itemType: string;
  deleteItem: (
    e: React.MouseEvent<HTMLElement>,
    item: string,
    i: string
  ) => void;
}) => {
  const i = index.toString();

  return (
    <li className="npc_skills-list-item" style={{ paddingBottom: '5px' }}>
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
          onClick={(e: React.MouseEvent<HTMLElement>) => {
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
