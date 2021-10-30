import React from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, CircularProgress, Link, Snackbar } from '@mui/material';
import AddImage from '../components/add-image';
import ImageCard from '../components/image-card';

export default function ImageManager({user}) {

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState(null);

    const [loggedOpen, setLoggedOpen] = useState(true);
    const [dialogOpen, setDialog] = useState(false);
    const [imageStatus, setImageStatus] = useState("");

    useEffect(() => {
        axios
        .get(`https://spiller.vcmp.net/i/api/images/${user}`)
        .then((response) => {
            setImages(response.data);
            setLoading(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [user]);

    const handleAdd = (url) => {
        setImages(p => p.push(url));

        // close the dialog
        setDialog(false);
        updateImages("Image added!");
    }

    const handleDelete = (index) => {
        const p = images.filter((v, i) => {
            return i !== index;
        })
        setImages(p);

        return updateImages("Image deleted!", p);
    }

    const handleEdit = (index, value) => {
        const p = images.map((v, i) => {
            return i === index ? value : v;
        });

        setImages(p);

        return updateImages("Image edited!", p);
    }

    const updateImages = async (status, immediate) => {

        const response = await axios.post(
            `https://spiller.vcmp.net/i/api/update/${user}`,
            immediate === undefined ? images : immediate
        );

        if(response.data.acknowledged === true) {
            setImageStatus(status);
        }

        // fetch images again
        axios
        .get(`https://spiller.vcmp.net/i/api/images/${user}`)
        .then((response) => {
            setImages(response.data);
            setLoading(false);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <React.Fragment>

            {loading === true && <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '45vh' }}>
                <CircularProgress />
            </Box>}

            {loading === false &&
            <React.Fragment>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >

                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                    Rotating Images
                    </Typography>

                    <Typography variant="subtitle1" component="div" align="center" >
                        Click below button to add a new image to your collection 
                    </Typography>

                    <Typography variant="subtitle1" component="div" align="center" >
                        Your rotating link: <Link href={`https://spiller.vcmp.net/i/${user}`}>{`https://spiller.vcmp.net/i/${user}`}</Link>
                    </Typography>

                    <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    >
                    <Button variant="contained" onClick={() => setDialog(true)}>Add Image</Button>
                    </Stack>
                </Container>
                </Box>

                <Container sx={{ py: 2  }} maxWidth="md">
                    
                    {images.length === 0 && <Typography variant="subtitle1" component="div" align="center" >
                        No images found!
                    </Typography>}

                    {images.length > 0 && 
                    <Grid container spacing={4}>
                        {images.map((card, i) => (
                        <Grid item key={i} xs={12} sm={6} md={4}>
                            <ImageCard card={card} index={i} handleDelete={handleDelete}handleEdit={handleEdit} />
                        </Grid>
                        ))}
                    </Grid>
                    }
                </Container>

                <AddImage open={dialogOpen} setOpen={setDialog} handleAdd={handleAdd} />

                <Snackbar open={loggedOpen} autoHideDuration={4000} anchorOrigin={{vertical: 'bottom',
                    horizontal: 'center'}} onClose={() => setLoggedOpen(false)}>
                    <Alert onClose={() => setLoggedOpen(false)} severity="success" sx={{ width: '100%' }}>
                        Logged in succesfully!
                    </Alert>
                </Snackbar>

                <Snackbar open={imageStatus === "" ? false : true} autoHideDuration={4000} anchorOrigin={{vertical: 'bottom',
                    horizontal: 'center'}} onClose={() => setImageStatus("")}>
                    <Alert severity="info" sx={{ width: '100%' }}>
                        {imageStatus}
                    </Alert>
                </Snackbar>
            </React.Fragment>
            }
        </React.Fragment>
    );
}