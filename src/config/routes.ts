import Iroute from '../interfaces/route'
import HomePage from '../pages/homepage'
import Login from '../pages/login'
import TeachersProfile from '../pages/profile/teachers'
import SignUp from '../pages/signup'
import Verify from '../pages/verify'

const Routes: Iroute[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/register',
    name: 'Register',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/teacher',
    name: 'Teacher Profile',
    component: TeachersProfile,
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify,
  },
]

export default Routes
