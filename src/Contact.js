import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  contactName: {
    margin: "0 0.6rem",
    alignSelf: "center"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  icon: {
    margin: "0.5rem"
  },
  phoneGroup: {
    padding: "0.4rem"
  },
  phone: {
    margin: "0.3rem",
    "& span": {
      fontWeight: 600
    }
  },
  delete: {
    alignSelf: "center",
    position: "absolute",
    right: "5%"
  }
}));

function Contact(props) {
  const classes = useStyles();
  const {name, phone, id, openDelete, history} = props;
  const redirectDetails = () => {
    history.push(`/contacts/${id}`);
  }
  return (
    <Accordion>
      <AccordionSummary>
        <Avatar>{name[0]}</Avatar>
        <h3 className={classes.contactName}>{name}</h3>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <div>
          <PhoneRoundedIcon className={classes.icon}/>
          <ChatBubbleRoundedIcon className={classes.icon} />
          <InfoRoundedIcon className={classes.icon} onClick={redirectDetails}/>
          <DeleteRoundedIcon className={classes.icon} onClick={() => openDelete(id)}/>
        </div>
        <div className={classes.phoneGroup}>
          <p className={classes.phone}><span>Phone: </span>{phone}</p>
        </div>
      </AccordionDetails>
    </Accordion>

  );
}

export default Contact;