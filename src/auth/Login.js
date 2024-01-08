import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useHistory

  const auth = getAuth();

  useEffect(() => {
    const token = localStorage.getItem("token-uid");

    if (token) {
      navigate("/Home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      localStorage.setItem("token-uid", user.uid);
      localStorage.setItem("email", user.email);
      alert('Logged in successfully!');
      navigate('/Home', { replace: true });
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login-container">
        <div className="column-right">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100%',
                marginBottom: '20%',
              }}
            >
              <Typography component="h1" variant="h5">
                METXTRACT ADVISER LOGIN
              </Typography>
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                onClick={handleLogin}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Button onClick={() => navigate('/Home')} variant="text">
                I am a student
              </Button>
              <Button onClick={() => navigate('/Register')} variant="text">
                Don't have an account? Sign Up
              </Button>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
