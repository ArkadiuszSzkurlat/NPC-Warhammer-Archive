import React from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddItem = ({
  itemType,
  addListItem,
}: {
  itemType: string;
  addListItem: (itemType: string) => void;
}) => {
  return (
    <IconButton
      sx={{ color: '#2e2e2e', padding: '0' }}
      aria-label="upload picture"
      component="span"
      size="small"
      onClick={() => {
        addListItem(itemType);
      }}
    >
      <AddIcon />
    </IconButton>
  );
};

export default AddItem;
