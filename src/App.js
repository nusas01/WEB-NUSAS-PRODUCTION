import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import UserHome from './user/home';
import PrivateRoute from './reducers/privateRoute';
import { ScrollToTop } from './components/helper';
import StoreDeploymentDashboard from './components/storeRequiredDeploy'
import { 
  fetchAuthStatusLogin,
} from './actions/get'
import { useDispatch, useSelector } from 'react-redux';
import LoginComponent from './components/login';

function App() {
  const dispatch = useDispatch()

  const { loggedIn } = useSelector((state) => state.persisted.loginStatus)
  useEffect(() => {
    if (!loggedIn) {
      dispatch(fetchAuthStatusLogin())
    }
  }, [loggedIn])


  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route path="/login" element={<LoginComponent/>}/>

          <Route element={<PrivateRoute/>}>
            <Route path='/store/required/deploy' element={<StoreDeploymentDashboard/>}/>
          </Route>
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
