import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/Landing/Landing';
import Home from './components/Home/Home';
import Activity from './components/Activity/Activity';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/home" component={Home}/>
          <Route path="/activity" component={Activity}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
