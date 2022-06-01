import React from 'react';
import MainPage from './pages/MainPage';
import NPCPage from './pages/NPCPage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import brown from '@mui/material/colors/brown';
import cyan from '@mui/material/colors/cyan';

import AuthProvider from './contexts/AuthContext';

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
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<MainPage />}></Route>
            </Route>
            <Route path="/NPCPage" element={<PrivateRoute />}>
              <Route path="/NPCPage" element={<NPCPage />}></Route>
            </Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/LogIn" element={<LogIn />}></Route>
            <Route path="/Forgot-password" element={<ForgotPassword />}></Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
