import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';


const themeOne = createMuiTheme({
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

const themeTwo = createMuiTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#2979ff',
        },
    },
    typography: {
        useNextVariants: true,
    },
})

export {
    themeOne, 
    themeTwo,
}