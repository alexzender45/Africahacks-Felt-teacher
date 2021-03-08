import Iroute from '../interfaces/route'
import Faqs from '../pages/faqs'
import HomePage from '../pages/homepage'
import Login from '../pages/login'
import PrivateProfile from '../pages/profile/private'
import PublicProfile from '../pages/profile/public'
import SearchParents from '../pages/search/parent'
import SearchTeacher from '../pages/search/teacher'
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
    name: 'Private Profile',
    component: PrivateProfile,
  },
  {
    path: '/public',
    name: 'Public Profile',
    component: PublicProfile,
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify,
  },
  {
    path: '/faqs',
    name: 'FAQS',
    component: Faqs,
  },
  {
    path: '/teachers',
    name: 'Teachers',
    component: SearchTeacher,
  },
  {
    path: '/parents',
    name: 'Parents',
    component: SearchParents,
  },
]

export default Routes
