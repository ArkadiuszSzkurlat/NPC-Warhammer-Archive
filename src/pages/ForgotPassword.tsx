import { TextField, Button, Alert } from '@mui/material';
import { MouseEventHandler, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      emailRef.current !== null &&
        (await resetPassword(emailRef.current.value));

      setMessage('Na mail został wysłany link z dalszymi instrukcjami');
    } catch (err) {
      setError('Nie udało się zresetować hasła');
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        <TextField label="E-mail" inputRef={emailRef} type="email" />

        <Button variant="contained" type="submit" disabled={loading}>
          Zresetuj Hasło
        </Button>

        <Button onClick={() => navigate('/login')}>Zaloguj się</Button>
        <Button onClick={() => navigate('/signup')}>Zarejestruj się</Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
