import React from 'react';
import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddImage({open, setOpen, handleAdd}) {

    const [url, setUrl] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Image</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To add a image, just enter the direct URL to it.
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
                />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleAdd(url)}>Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}