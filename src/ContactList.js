import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Contact from './Contact';
import sizes from './styles/sizes';

const useStyles = makeStyles(() => ({
  root: {
    width: "20%",
    margin: "auto",
    [sizes.down("lg")]: {
      width: "30%"
    },
    [sizes.down("md")]: {
      width: "45%"
    },
    [sizes.down("sm")]: {
      width: "70%"
    },
    [sizes.down("xs")]: {
      width: "90%"
    },
  }
}));

function ContactList(props) {
  const classes = useStyles();
  const {contacts, openDelete, history} = props;
  return (
    <div className={classes.root}>
      {contacts.map(contact => (
        <Contact name={contact.contact_name} phone={contact.phone} id={contact._id} key={contact._id} openDelete={openDelete} history={history}/>
      ))}
    </div>
    
  );
}

export default ContactList;