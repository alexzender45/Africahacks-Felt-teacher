import Iroute from '../interfaces/route'
import HomePage from '../pages/homepage'
import Login from '../pages/login'
import SignUp from '../pages/signup'

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
]

export default Routes
