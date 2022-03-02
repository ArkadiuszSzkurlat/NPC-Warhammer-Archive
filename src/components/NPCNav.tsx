import { Link, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

const NPCNav = ({
  editable,
  setEditable,
  saved,
  setSaved,
}: {
  editable: any;
  setEditable: any;
  saved: any;
  setSaved: any;
}) => {
  const [age, setAge] = useState();

  // FIXME Hook powinien się zmieniać po zapisaniu na false
  const saveButtonHandler = () => {
    setSaved(!saved);
  };

  const deleteButtonHandler = () => {
    //TODO usunięcie postaci z bazy, lepiej żeby popuot był z material ui
    if (window.confirm('Na pewno chcesz usunąć postać?')) {
      console.log('Usunąłeś postać');
    } else {
      console.log('Anulowałeś usuwanie postaci');
    }
  };

  useEffect(() => {
    console.log(saved);
  }, [saved]);

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
      <Button
        size='small'
        sx={{ color: saved ? '#b05217' : 'black' }}
        startIcon={<SaveIcon />}
        onClick={saveButtonHandler}
      >
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
      <Button
        size='small'
        sx={{ color: 'black' }}
        startIcon={<DeleteIcon />}
        onClick={deleteButtonHandler}
      >
        Usuń
      </Button>
    </div>
  );
};

export default NPCNav;
