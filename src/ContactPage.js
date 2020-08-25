import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ContactList from './ContactList';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import {blue, red} from "@material-ui/core/colors";
import sizes from './styles/sizes';

const useStyles = makeStyles(() => ({
  title: {
    marginTop: "2rem",
    fontSize: "5rem",
    [sizes.down("sm")]: {
      fontSize: "3.5rem"
    },
  },
  root: {
    "& a": {
      textDecoration: "none"
    },
  }
}));

function ContactPage(props) {
  const {isLoggedIn, currContacts, history, deleteContact} = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const classes = useStyles();
  const handleOpen = (id) => {
    setOpenDelete(true);
    setDeletingId(id)
  };
  const closeDialog = () => {
    setOpenDelete(false);
  };
  const handleDelete = () => {
    deleteContact(deletingId);
    setOpenDelete(false);
  };
  return (
    <>
      <Navbar history={history}/>
      {isLoggedIn
        ? <div className={classes.root}>
            <h1 className={classes.title}>Your Contacts</h1>
            <ContactList contacts={currContacts} openDelete={handleOpen} history={history}/>
          </div>
        : (
          <div className={classes.root}>
            <h1>Please Log In to Continue</h1>
            <Link to='/'>
              <Button variant="contained" color="primary">Home</Button>
            </Link>
          </div>
        )
      }
      <Dialog
        open={openDelete}
        onClose={closeDialog}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete This Contact?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
                <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                    <CloseIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

export default ContactPage;