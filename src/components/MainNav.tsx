import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Link,
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

const MainNav = () => {
  const [age, setAge] = useState();
  return (
    <div className='nav'>
      <Link href='NPCPage' underline='none'>
        <Button size='small' startIcon={<AddIcon />} sx={{ color: '#000' }}>
          Dodaj Postać
        </Button>
      </Link>
      <FormControl size='small' style={{ width: '40%' }}>
        <InputLabel id='demo-simple-select-label'>Filtruj</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={age}
          label='Age'
          sx={{ color: 'white' }}
        >
          <MenuItem value={10}>Nazwa</MenuItem>
          <MenuItem value={20}>Gwiazdki</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default MainNav;
