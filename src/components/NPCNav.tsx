import { Link, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { addEditNPC, deleteNPC } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NPCNav = ({
  editable,
  setEditable,
  saved,
  setSaved,
}: {
  editable: boolean;
  setEditable: any;
  saved: boolean;
  setSaved: any;
}) => {
  const navigate = useNavigate();
  const NPCSlice = useSelector((state: any) => state.NPCSlice);
  const [NPC, setNPC] = useState(NPCSlice);

  useEffect(() => {
    setNPC(NPCSlice);
  }, [NPCSlice]);
  // FIXME Hook powinien się zmieniać po zapisaniu na false
  const saveButtonHandler = (): void => {
    setSaved(true);
    if (saved === false) {
      console.log(NPC);
      if (NPC.name) {
        addEditNPC(NPC);
      } else {
        alert('Postać musi mieć przynajmniej imię');
      }

      setTimeout(() => {
        setSaved(false);
      }, 500);
    }
  };

  const deleteButtonHandler = (): void => {
    //TODO usunięcie postaci z bazy, lepiej żeby popuot był z material ui
    if (window.confirm('Na pewno chcesz usunąć postać?')) {
      deleteNPC(NPC.name);
      navigate('/');
    } else {
      console.log('Anulowałeś usuwanie postaci');
    }
  };

  return (
    <div className="nav">
      <Link href="./">
        <Button
          size="small"
          sx={{ color: 'black' }}
          startIcon={<ArrowBackIosNewIcon />}
        >
          Wróć
        </Button>
      </Link>
      <Button
        size="small"
        sx={{ color: saved ? '#b05217' : 'black' }}
        startIcon={<SaveIcon />}
        onClick={saveButtonHandler}
      >
        Zapisz
      </Button>
      <Button
        size="small"
        sx={{ color: editable ? '#b05217' : 'black' }}
        onClick={() => {
          setEditable(!editable);
        }}
        startIcon={<EditIcon />}
      >
        Edytuj
      </Button>
      <Button
        size="small"
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
