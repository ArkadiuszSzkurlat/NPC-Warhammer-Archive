import { TextField, Button, Alert } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const navigate = useNavigate();

  const { signup } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      setError(
        'Nie udało się stworzyć konta. Konto z takim mailem już istnieje, hasło jest za krótkie lub błędnie potwierdzone'
      );
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
        <TextField
          label="Potwierdź Hasło"
          inputRef={passwordConfirmRef}
          type="password"
        />

        <Button disabled={loading} variant="contained" type="submit">
          Zarejestruj się
        </Button>

        <Button onClick={() => navigate('/login')}>Zaloguj się</Button>
      </form>
    </div>
  );
};

export default SignUp;
