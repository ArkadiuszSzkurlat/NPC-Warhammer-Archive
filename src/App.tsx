import MainPage from './pages/MainPage';
import NPCPage from './pages/NPCPage';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import brown from '@mui/material/colors/brown';
import cyan from '@mui/material/colors/cyan';

let theme = createTheme({
  palette: {
    primary: brown,
    secondary: cyan,
  },
});

theme = responsiveFontSizes(theme);
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/NPCPage' element={<NPCPage />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
