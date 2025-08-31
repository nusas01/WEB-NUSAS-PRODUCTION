import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import PrivateRoute from './reducers/privateRoute';
import { ScrollToTop } from './components/helper';
import StoreDeploymentDashboard from './components/storeRequiredDeploy'
import {
  fetchAuthStatusLogin,
} from './actions/get'
import { useDispatch, useSelector } from 'react-redux';
import LoginComponent from './components/login';
import { useEffect, useCallback } from 'react';
import PaymentGatewayDashboard from './components/submissionChangePaymentGateway'
import TransactionDashboard from './components/transaction';
import TransactionSubmissionChangePaymentGatewayDashboard from './components/transactionChangePaymentGateway';
import {statusExpiredUserTokenSlice} from './reducers/expToken'
import {loginStatusSlice} from './reducers/get'

// Pisahkan component yang menggunakan useNavigate
function AppContent() {
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  
  const {setLoginStatus} = loginStatusSlice.actions
  const { loggedIn } = useSelector((state) => state.persisted.loginStatus)
  
  useEffect(() => {
    if (!loggedIn) {
      dispatch(fetchAuthStatusLogin())
    }
  }, [loggedIn, dispatch])
  
  console.log("status login: ", loggedIn)
  
  // hanndle expired token user
  const {clearStatusExpiredUserToken} = statusExpiredUserTokenSlice.actions 
  const {statusExpiredUserToken} = useSelector((state) => state.statusExpiredUserTokenState)

  useEffect(() => {
    if (statusExpiredUserToken) {
      navigate("/login");
      dispatch(clearStatusExpiredUserToken());
      dispatch(setLoginStatus(false));
    }
  }, [statusExpiredUserToken, navigate, dispatch]);

  return (
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
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;