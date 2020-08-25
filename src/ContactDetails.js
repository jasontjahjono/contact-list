import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from './Navbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import sizes from './styles/sizes';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  container: {
    width: "30%",
    margin: "auto",
    [sizes.down("lg")]: {
      width: "40%"
    },
    [sizes.down("md")]: {
      width: "55%"
    },
    [sizes.down("sm")]: {
      width: "70%"
    },
    [sizes.down("xs")]: {
      width: "85%"
    },
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
    marginTop: "3rem"
  },
  content: {
    padding: "1rem",
    margin: "2rem"
  },
  info: {
    margin: "1rem",
    "& p": {
      margin: "0.3rem",
    },
    "& h4": {
      margin: "0.5rem",
    }
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  name: {
    margin: "0.5rem"
  },
  workInfo: {
    fontWeight: "300",
    margin: "0.3rem",
    fontStyle: "italic",
  },
  button: {
    "& a": {
      textDecoration: "none"
    }
  }
}));

function ContactDetails(props) {
  const classes = useStyles();
  const {id, contacts, history} = props;
  const findContact = () => {
    return contacts.find(contact => contact._id === id)
  }
  const contact = findContact();
  return (
    <div className={classes.root}>
      <Navbar history={history}/>
      <div className={classes.container}>
        <div className={classes.avatar}>
          <Avatar className={classes.large}>{contact.contact_name[0]}</Avatar>
        </div>
        <h2 className={classes.name}>{contact.contact_name}</h2>
        <h4 className={classes.workInfo}>{contact.workInfo}</h4>
        <Paper elevation={2} className={classes.content}>
          <div className={classes.info}>
            <p>Phone</p>
            <h4>{contact.phone}</h4>
          </div>
          <div className={classes.info}>
            <p>Email</p>
            <h4>{contact.email}</h4>
          </div>
          <div className={classes.info}>
            <p>Address</p>
            <h4>{contact.address}</h4>
          </div>
          <div className={classes.info}>
            <p>Birthday</p>
            <h4>
              <Moment format="D MMM YYYY" withTitle>
                {contact.birthday}
              </Moment>
            </h4>
          </div>
        </Paper>
        <div className={classes.button}>
          <Link to="/contacts">
            <Button variant="contained" color="primary">Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;