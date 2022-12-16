import { Route, Redirect, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import PatientForm from './components/patientForm';
import Patients from './components/patients';
import ResearchProjects from './components/researchProjects';
import NotFound from './components/notFound'
import NavBar from './components/navBar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';
import Tests from './components/tests';

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <NavBar />
      <main className='container'>
        <Switch>
        <Route path='/register' component={RegisterForm} />
        <Route path='/login' component={LoginForm} />
        <Route path='/patients/:id' component={PatientForm} />
        <Route path='/patients' component={Patients} />
        <Route path='/researchProjects' component={ResearchProjects} />
        <Route path='/tests' component={Tests} />
        <Route path='/not-found' component={NotFound} />
        <Redirect from='/' exact to='/patients' />
        <Redirect to='/not-found' />
        </Switch>
      </main>
      </React.Fragment>
    ); 
  }
}
export default App;