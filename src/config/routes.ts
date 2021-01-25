import Iroute from '../interfaces/route'
import HomePage from '../pages/homepage'
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
]

export default Routes
