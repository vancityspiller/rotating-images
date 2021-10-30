import * as React from 'react';
import { useState } from 'react';

import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ImageIcon from '@mui/icons-material/Image';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Snackbar } from '@mui/material';

// -------------------------------------------------------------------------- //

export default function Accounts({setUser}) {

    const [alert, setAlert] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const user = {
            username: data.get('username'),
            password: data.get('password')
        };

        const response = await axios.post(
            "http://localhost:5000/api/account",
            user
        );

        if(response.data === 'PASS_INCORRECT') {
            setAlert(true);
            return;
        }
        else setUser(response.data);
    };

    return (
        <Container component="main" maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Avatar sx={{ m: 1, bgcolor: 'tomato'}}>
                    <ImageIcon />
                </Avatar>
                
                <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.primary"
                >
                Rotating Images
                </Typography>

                <Typography variant="h6" align="center" color="text.secondary" marginBottom={4}>
                    Sign in to continue
                </Typography>
           
                <Typography variant="caption" display="block">
                    If the account doesn't exist, it will be created
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
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
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color='primary'
                    >
                    Sign In
                    </Button>
                </Box>
            </Box>

            <Snackbar open={alert} autoHideDuration={6000} onClose={() => setAlert(false)}>
                <Alert onClose={() => setAlert(false)} severity="error" sx={{ width: '100%' }}>
                    Invalid Password!
                </Alert>
            </Snackbar>
        </Container>
    );
}