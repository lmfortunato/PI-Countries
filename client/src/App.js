import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/Landing/Landing';
import Home from './components/Home/Home';
import Activity from './components/Activity/Activity';
import CountryDetail from './components/CountryDetail/CountryDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          <Route path="/home/:id" component={CountryDetail}/>
          <Route path="/activity" component={Activity}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
