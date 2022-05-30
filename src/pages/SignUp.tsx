import { TextField, Button, Alert } from '@mui/material';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { signup } = useAuth();

  const [error, setError] = useState('');
  const [registerSuccesful, setRegisterSuccesful] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      passwordRef.current &&
      passwordConfirmRef.current &&
      passwordRef.current.value !== passwordConfirmRef.current.value
    ) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);

      emailRef.current &&
        passwordRef.current &&
        signup(emailRef.current.value, passwordRef.current.value);

      setRegisterSuccesful(true);
      setTimeout(() => {
        setRegisterSuccesful(false);
      }, 30000);
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
        {registerSuccesful && (
          <Alert severity="success">
            Udało się! Możesz się zalogować i zapisywać swoich BN-ów
          </Alert>
        )}

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
