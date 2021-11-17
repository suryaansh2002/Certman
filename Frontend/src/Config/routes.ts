import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import Dashboard from '../Pages/Dashboard';
import Generate from '../Pages/Generate';
import SingleCert from '../Pages/SingleCert';
import NotFound from '../Pages/NotFound';

const routes = [
	{
		path: '/login',
		component: Login,
		isPrivate: false,
	},
	{
		path: '/signup',
		component: SignUp ,
		isPrivate: false,
	},
	{
		path: '/dashboard',
		component: Dashboard,
		isPrivate: true,
	},
	{
		path: '/generate',
		component: Generate,
		isPrivate: true,
	},
	{
		path: '/single-cert/:_id',
		component: SingleCert,
		isPrivate: true,
	},
	
	{
		path: '/*',
		component: NotFound,
		isPrivate: true,
	},
];

export default routes;
