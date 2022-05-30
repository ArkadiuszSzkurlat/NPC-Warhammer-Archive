import { TextField, Button, Alert } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LogIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      if (emailRef.current && passwordRef.current) {
        await login(emailRef.current.value, passwordRef.current.value);
      }
      navigate('/');
    } catch (err) {
      setError('Nie udało się zalogować. Sprawdź poprawność danych');
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="E-mail" inputRef={emailRef} type="email" />
        <TextField label="Hasło" inputRef={passwordRef} type="password" />

        <Button variant="contained" type="submit" disabled={loading}>
          Zaloguj się
        </Button>

        <Button onClick={() => navigate('/forgot-password')}>
          Zapomniałeś hasła?
        </Button>
        <Button onClick={() => navigate('/signup')}>Zarejestruj się</Button>
      </form>
    </div>
  );
};

export default LogIn;
