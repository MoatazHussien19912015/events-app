import logo from './logo.svg';
import './App.css';
import Layout from './components/shared/layout/Layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';
import AddEvent from './components/pages/AddEvent';
import { useSelector } from 'react-redux';


function App() {
  const token = useSelector((state)=> state.authReducer.user.token);
  return (
            
              <Switch>
                <Layout>
                <Route path="/add-event" render={props=>{
                  if(token) {return <AddEvent {...props} />} else {
                   return <Redirect to="/login"/>;
                  }
                }}  />
                <Route path="/register"  component={RegisterPage} />
                <Route path="/login"  component={LoginPage} />
                <Route path="/home" exact component={HomePage} />
                <Redirect from="*" to="/home"/>
                </Layout>
              </Switch>
            
  );
}

export default App;
{/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}