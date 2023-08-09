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
            main: "#D5EBF7"
        }
    },
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                noOptions: {
                    fontSize: "16px",
                    color: "white",
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    color: "white",
                    fontSize: "14px",
                    border: "1px solid white"
                },
                icon: {
                    color: "white"
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    color: 'white'
                },
                expanded: {
                    backgroundColor: 'transparent',
                    color: 'white'
                },
                rounded: {
                    border: "1px solid white"
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    color: 'white'
                },
                expanded: {
                    backgroundColor: 'transparent',
                    color: 'white'
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    color: 'white'
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                    },
                },
                notchedOutline: {
                    borderColor: "white",
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: "white",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: {
                    color: "white",
                    "&.Mui-focused": {
                        color: "white",
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: 'white',
                },
            },
        },
        MuiRating: {
            styleOverrides: {
                iconEmpty: {
                    color: "rgba(255, 255, 255, 0.5)",
                },
            },
        },
    }
});

root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
);