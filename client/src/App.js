import './App.css';
import Home from './pages/home';
import SchoolLogin from './pages/school/school-login';
import TeacherLogin from './pages/teacher/teacher-login';
import RegisterTeacher from './pages/teacher/register-teacher';
import RegisterSchool from './pages/school/register-school';
import RecoverPassword from './pages/recover-password';
import VerifyPassword from './pages/verify-password';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CompleteProfile from './pages/teacher/complete-profile';
import AllTeachers from './pages/all-teachers';
import Profile from './pages/teacher/profile';

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
        <Route path='/recover-password'>
          <RecoverPassword />
        </Route>
        <Route path='/verify-password'>
          <VerifyPassword />
        </Route>
        <Route path='/teacher/complete-profile/:id'>
          <CompleteProfile />
        </Route>
        <Route path='/all-teachers'>
          <AllTeachers />
        </Route>
        <Route path='/teacher/:id'>
          <Profile />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
