import React from 'react';
import { useState } from 'react';

import Accounts from './pages/accounts';
import ImageManager from './pages/image-manager';

// -------------------------------------------------------------------------- //

import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
		  	main: '#F0265B',
		},
		secondary: {
		  	main: '#767676',
		},
	},
});

// -------------------------------------------------------------------------- //

export default function App() {

	const [user, setUser] = useState(null);

    return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				{ user === null && <Accounts setUser={setUser}/> }
				{ user != null && <ImageManager user={user} />}
			</ThemeProvider>
		</React.Fragment>
    );
}