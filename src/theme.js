import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: red,
        secondary: {
            main: '#f44336',
        },
    },
    typography: {
        useNextVariants: true,
    },
});

export default theme