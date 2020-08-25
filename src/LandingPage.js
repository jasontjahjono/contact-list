import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import useInputState from './hooks/useInputState';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import sizes from './styles/sizes';

const useStyles = makeStyles(() => ({
  root: {
    height: "calc(100vh - 64px)",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  introduction: {
    fontSize: "2.5rem",
    margin: 0,
    [sizes.down("sm")]: {
      fontSize: "1.5rem"
    },
    [sizes.down("xs")]: {
      fontSize: "1rem"
    }
  },
  title: {
    fontSize: "9rem",
    margin: 0,
    [sizes.down("sm")]: {
      fontSize: "6rem"
    },
    [sizes.down("xs")]: {
      fontSize: "4rem"
    }
  },
  buttonGroup: {
    "& a": {
      textDecoration: "none"
    },
  },
  button: {
    margin: "1rem 0.8rem",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  loginButton: {
    margin: "1rem",
  }
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const {currUser, isLoggedIn, saveUser, history, logout, userData} = props;
  const greeting = isLoggedIn ? `${currUser.name}` : "User";
  const [openLogin, setOpenLogin] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [email, updateEmail, resetEmail] = useInputState("");
  const [password, updatePassword, resetPassword] = useInputState("");

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };
  const handleSubmit = () => {
    const user = userData.find(user =>
      user.email === email &&
      user.password === password
    );
    if(!user) {
      resetEmail();
      resetPassword();
      setOpenError(true);
    } else {
      saveUser(user);
      resetEmail();
      resetPassword();
      setOpenLogin(false);
    }
  }
  return(
    <div>
      <Navbar history={history}/>
      <div className={classes.root}>
        <h2 className={classes.introduction}>Welcome, {greeting}, to</h2>
        <h1 className={classes.title}>Contact-UI</h1>
        <div className={classes.buttonGroup}>
          {isLoggedIn 
            ? <Button variant='contained' color='primary' className={classes.button} onClick={logout}>Logout</Button>
            : <Button variant='contained' color='primary' className={classes.button} onClick={handleOpenLogin}>Login</Button>
          }
          <Link to='/contacts'>
            <Button variant="contained" color="secondary" className={classes.button}>Contact List</Button>
          </Link>
        </div>
      </div>
      <Dialog open={openLogin} onClose={handleCloseLogin}>
        <DialogActions>
          <CloseRoundedIcon onClick={handleCloseLogin}/>
        </DialogActions>
        <DialogContent>
          <h1>Login</h1>
          <ValidatorForm onSubmit={handleSubmit} className={classes.form}>
            <TextValidator
              label="Email"
              onChange={updateEmail}
              name="email"
              value={email}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
            <TextValidator
              label="Password"
              onChange={updatePassword}
              name="password"
              value={password}
              type="password"
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <Button variant='contained' color='primary' type='submit' className={classes.loginButton}>Login</Button>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
      <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          Email or Password is Incorrect
        </Alert>
      </Snackbar>
    </div>
  )
}
