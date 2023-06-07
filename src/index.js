import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette: {
        primary: {
            main: '#fff'
        },
        material: {
            main: 'rgb(236,102,82)'
        },
        light: {
            main: "#d5ebf7"
        }
    }
})

root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
);
