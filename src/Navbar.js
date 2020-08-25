import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: "auto"
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const {history} = props;
  const redirectContacts = () => {
    history.push("/contacts")
  }
  const redirectHome = () => {
    history.push("/")
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography align="left" variant="h6" className={classes.title}>
            Contact-UI
          </Typography>
          <Button onClick={redirectHome} color="inherit">Home</Button>
          <Button onClick={redirectContacts} color="inherit">Contacts</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}