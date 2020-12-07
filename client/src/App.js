import './App.css';
import Home from './pages/home';
import SchoolLogin from './pages/school/school-login';
import TeacherLogin from './pages/teacher/teacher-login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/school/login'>
          <SchoolLogin />
        </Route>
        <Route path='/teacher/login'>
          <TeacherLogin />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
