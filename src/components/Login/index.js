import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import { signIn } from '@/actions';
import emit from '@/utils/emit';
import Notice from '@/components/Notice';
import { enqueueSnackbar, addSnackbar } from '@/actions';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        position: 'relative',
        marginTop: theme.spacing.unit * 3,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        // padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Login extends Component {

    componentDidMount() {
        console.log('props', this.props);
        // TODO mock 
        // return;
        const { dispatch } = this.props;

        emit('login', { name: 'Kitten', password: '123456' }).then((res) => {
            if (res.success) {
                dispatch(signIn(res.data))
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    }, () => {
                        this.props.history.replace('/');
                    })
                }, 300);
            } else {
                this.setState({
                    noticeOpen: true,
                    loading: false,
                    noticeContent: res.msg,
                })
            }
        });

    }

    state = {
        loading: false,
        name: '',
        password: '',
        open: false,
        noticeOpen: false,
        noticeTitle: '',
        noticeContent: '',
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleNoticeClose = () => {
        this.setState({
            noticeOpen: false,
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
        }, () => {
            this.userAction();
        })
    }

    userAction = async (type = 'login') => {
        const { name, password } = this.state;
        const { dispatch } = this.props;
        if (!name) {
            console.log('请输入用户名');
            this.setState({
                noticeOpen: true,
                loading: false,
                noticeContent: '请输入用户名',
            })
            return;
        }
        if (!password) {
            console.log('请输入密码');
            this.setState({
                noticeOpen: true,
                loading: false,
                noticeContent: '请输入密码',
            })
            return;
        }
        const res = await emit(type, { name, password });
        if (res.success) {
            dispatch(signIn(res.data));
            setTimeout(() => {
                this.setState({
                    loading: false,
                }, () => {
                    this.props.history.replace('/');
                })
            }, 300);
        } else {
            // 登录失败的
            if (res.code === 5003) { // 账号不存在
                this.setState({
                    open: true,
                    loading: false,
                });
            } else {
                this.setState({
                    noticeOpen: true,
                    loading: false,
                    noticeContent: res.msg,
                })
            }
        }
    }

    handleRegister = () => {
        this.userAction('register');
    }

    handleSignInSuccess = () => {
        setTimeout(() => {
            this.setState({
                loading: false,
            }, () => {
                this.props.history.replace('/');
            })
        }, 800);
    }

    render() {
        const { classes } = this.props;
        const { loading } = this.state;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Username</InputLabel>
                            <Input id="name" name="name" autoFocus value={this.state.name} onChange={this.handleChange('name')} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" value={this.state.password} onChange={this.handleChange('password')} />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.submit}
                            disabled={loading}
                            onClick={this.handleSubmit}
                        >
                            Sign in
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </form>
                </Paper>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"提示"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            用户账号不存在，您可以直接点击下方注册按钮直接注册该账号并体验～
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={this.handleRegister} color="primary">
                            注册该账号
                        </Button>
                    </DialogActions>
                </Dialog>
                <Notice open={this.state.noticeOpen} content={this.state.noticeContent} handleClose={this.handleNoticeClose}></Notice>
            </main>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect()(withStyles(styles)(Login)));