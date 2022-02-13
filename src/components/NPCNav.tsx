import { Link, Button } from '@mui/material';
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const NPCNav = ({
  editable,
  setEditable,
}: {
  editable: any;
  setEditable: any;
}) => {
  const [age, setAge] = useState();

  return (
    <div className='nav'>
      <Link href='./'>
        <Button
          size='small'
          sx={{ color: 'black' }}
          startIcon={<ArrowBackIosNewIcon />}
        >
          Wróć
        </Button>
      </Link>
      <Button size='small' sx={{ color: 'black' }} startIcon={<SaveIcon />}>
        Zapisz
      </Button>
      <Button
        size='small'
        sx={{ color: editable ? '#b05217' : 'black' }}
        onClick={() => {
          setEditable(!editable);
        }}
        startIcon={<EditIcon />}
      >
        Edytuj
      </Button>
      <Button size='small' sx={{ color: 'black' }} startIcon={<DeleteIcon />}>
        Usuń
      </Button>
    </div>
  );
};

export default NPCNav;
