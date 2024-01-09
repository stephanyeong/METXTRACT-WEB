import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
  palette: {
    primary: {
      main: "#048CB4",
    },
  },
});

export default function Register() {
  const UID = uuidv4();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();
  const db = getFirestore(app);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      await setDoc(doc(db, "advisers", user.uid), {
        fullName: fullName,
        email: email,
        uid: user.uid,
        restriction: 1,
      });
      
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert(`Registration failed: ${error.message}`);
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
              <div>
                <img src="images/logo.png" alt="Logo" className="logo-auth"/>
              </div>
              <Typography component="h3" variant="h5" color={'black'}>
                METXTRACT ADVISER SIGN UP
              </Typography>
              <TextField
                onChange={(e) => setFullName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="fullName"
                autoFocus
              />
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
              />
              <TextField
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
              />
              <Button
                onClick={handleSignUp}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Button onClick={() => navigate('/')} variant="text">
                Already have an account? Sign In
              </Button>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}
