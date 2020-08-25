import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import LandingPage from './LandingPage';
import ContactPage from './ContactPage';
import ContactDetails from './ContactDetails';
import axios from 'axios';
import './App.css';

function App() {
  const [contactData, setContactData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [currUser, setCurrUser] = useState();
  const [currContacts, setCurrContacts] = useState("");
  const [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(res => {
        setUserData(res.data);
      });
    axios.get('http://localhost:5000/contacts/')
      .then(res => {
        setContactData(res.data);
      });
  }, []);
  useEffect(() => {
    const contacts = contactData.filter(contact => contact.username === currUser.username);
    setCurrContacts(contacts);
  }, [isLoggedIn]);
  const login = (user) => {
    setCurrUser(user);
    setLogin(true);
  }
  const logout = () => {
    setCurrUser("");
    setCurrContacts("");
    setLogin(false);
  }
  const deleteContact = (id) => {
    axios.delete('http://localhost:5000/contacts/' + id);
    const newCurrentData = currContacts.filter(c => c._id !== id);
    const newData = contactData.filter(c => c._id !== id);
    setCurrContacts(newCurrentData);
    setContactData(newData);
  }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={(routeProps) => <LandingPage currUser={currUser} isLoggedIn={isLoggedIn} saveUser={login} logout={logout} userData={userData} {...routeProps}/>} />
        <Route exact path="/contacts" render={(routeProps) => <ContactPage isLoggedIn={isLoggedIn} deleteContact={deleteContact} currContacts={currContacts} {...routeProps} />} />
        <Route exact path="/contacts/:id" render={(routeProps) => <ContactDetails id={routeProps.match.params.id} contacts={currContacts} {...routeProps}/>} />
      </Switch>
    </div>
  );
}

export default App;
