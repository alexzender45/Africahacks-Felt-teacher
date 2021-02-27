import Iroute from '../interfaces/route'
import HomePage from '../pages/homepage'
import Login from '../pages/login'
import Profile from '../pages/profile'
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
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify,
  },
]

export default Routes
