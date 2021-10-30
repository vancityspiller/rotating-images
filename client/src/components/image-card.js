import React, { useState } from 'react';

import { Button, Card, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Link, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ImageCard({card, index, handleDelete, handleEdit}) {

    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState(card);

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Card
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="img"
                    height={200}
                    image={card}
                    alt={card}
                />

                <CardContent>
                    <Typography>
                    <Link href={card} target="_blank">Open</Link>
                    </Typography>
                </CardContent>

                <CardActions>
                    <IconButton aria-label="edit" onClick={() => setOpen(true)}>
                        <EditIcon/>
                    </IconButton>

                    <IconButton aria-label="share" onClick={() => handleDelete(index)}>
                        <DeleteForeverIcon />
                    </IconButton>
                </CardActions>
            </Card>

            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit URL</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Edit image URL
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="url"
                label="URL"
                type="url"
                fullWidth
                variant="standard"
                onChange={(Event) => setUrl(Event.target.value)}
                defaultValue={card}
            />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => { handleEdit(index, url); setOpen(false) }}>Edit</Button>
            </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}