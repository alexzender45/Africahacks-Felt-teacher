import './App.css';
import Home from './pages/home';
import SchoolLogin from './pages/school/school-login';
import TeacherLogin from './pages/teacher/teacher-login';
import RegisterTeacher from './pages/teacher/register-teacher';
import RegisterSchool from './pages/school/register-school';
import './App.css';

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
        <Route path='/teacher/register'>
          <RegisterTeacher />
        </Route>
        <Route path='/school/register'>
          <RegisterSchool />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
