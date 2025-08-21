import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import PrivateRoute from './reducers/privateRoute';
import { ScrollToTop } from './components/helper';
import StoreDeploymentDashboard from './components/storeRequiredDeploy'
import { 
  fetchAuthStatusLogin,
} from './actions/get'
import { useDispatch, useSelector } from 'react-redux';
import LoginComponent from './components/login';
import { useEffect } from 'react';
import PaymentGatewayDashboard from './components/submissionChangePaymentGateway'
import TransactionDashboard from './components/transaction';
import TransactionSubmissionChangePaymentGatewayDashboard from './components/transactionChangePaymentGateway';

function App() {
  const dispatch = useDispatch()

  const { loggedIn } = useSelector((state) => state.persisted.loginStatus)
  useEffect(() => {
    if (!loggedIn) {
      dispatch(fetchAuthStatusLogin())
    }
  }, [loggedIn])

  console.log("status login: ", loggedIn)

  return (
    <Router>
      <div>
        <ScrollToTop/>
          <Routes>
            <Route path="/login" element={<LoginComponent/>}/>

            <Route element={<PrivateRoute/>}>
              <Route path="/submission/change/payment/gateway" element={<PaymentGatewayDashboard/>}/>
              <Route path='/transactions' element={<TransactionDashboard/>}/>
              <Route path='/transactions/submission/change/payment/gateway' element={<TransactionSubmissionChangePaymentGatewayDashboard/>}/>
              <Route path='/store/required/deploy' element={<StoreDeploymentDashboard/>}/>
            </Route>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
