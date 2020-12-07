import './App.css';
import Home from './pages/home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Home />
      <Switch>
        <Route path='/home'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
