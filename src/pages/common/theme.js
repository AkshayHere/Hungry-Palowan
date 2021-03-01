import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    typography: {
        fontFamily: [
            // 'Montserrat, Futura, "Gill Sans", "Gill Sans MT", "Century Gothic", CenturyGothic, sans-serif'
            'Noto Sans SC',
            // 'cursive',
        ]
    },
    palette: {
        primary: {
            main: "#FFFFFF",
        },
        secondary: {
            main: "#04E99E",
        },
    },
});