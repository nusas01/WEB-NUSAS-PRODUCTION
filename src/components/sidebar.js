import { useState, useEffect, use } from "react"
import { 
  Store, 
  LogOut, 
  ChevronRight, 
  Menu, 
  X,
  Home,
  User2,
  WalletCards,
  Coins,
  Users,
} from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useDeviceDetection } from "./helper";
import { useSelector, useDispatch } from "react-redux";
import { navbarSlice } from "../reducers/reducers";
import { resetApp } from "../reducers/state"
import { fetchLogout } from "../actions/get";
import { logoutSlice } from "../reducers/get";
import { loginSlice } from "../reducers/post";
import { 
  Toast,
  ToastPortal, 
} from './alert'

const menuItems = [
  { Icon: Users, title: "Tenants", path: '/tenants',  key: 'Tenants'},
  { Icon: Store, title: "Store Required Deploy", path: '/store/required/deploy', key: 'Store Required Deploy'},
  { Icon: User2, title:"Submission Change Credentials", path: '/submission/change/payment/gateway', key:'Submission Change Credentials'},
  { Icon: WalletCards, title:"Transactions", path: '/transactions', key: 'Transactions'},
  { Icon: Coins, title:"Transactions Change Payment Gateway", path:'/transactions/submission/change/payment/gateway', key:'Transactions Change Payment Gateway'},
];

const Sidebar = ({activeMenu}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [toast, setToast] = useState(null)

  useDeviceDetection();
  const { setIsOpen } = navbarSlice.actions
  const {isOpen, isMobileDeviceType} = useSelector((state) => state.persisted.navbar)
  
  const handleNavigate = (value) => {
    navigate(value)

    if (isMobileDeviceType) {
      dispatch(setIsOpen(false))
    }
  }

  // handle logout
  const { resetLogin } = loginSlice.actions
  const { resetLogout } = logoutSlice.actions
  const { logoutSuccess, logoutError, loadingLogout } = useSelector((state) => state.logoutState)

  useEffect(() => {
    if (logoutSuccess) {
      (async () => {
        dispatch(resetLogout())
        await resetApp()
        navigate('/login')
      })()
    }
  }, [logoutSuccess])

  useEffect(() => {
    if (logoutError) {
      setToast({
        type: 'error',
        message: logoutError
      })

      const timer = setTimeout(() => {
        dispatch(resetLogout())
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [logoutError])

   // Render Desktop Sidebar
  const renderDesktopSidebar = () => (
    <div className="flex w-72 flex-col fixed inset-y-0 bg-white border-r border-gray-200 shadow-sm">
      {/* Desktop Header */}
      <div className="flex items-center px-4 py-2 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img src="/image/logo_nusas_2.png" alt="Nusas Logo" className="w-14 h-14" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Nusas Internal</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => handleNavigate(item.path)}
              className={`group flex items-center justify-between w-full rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                activeMenu === item.key ? 'bg-gray-100 text-gray-950 shadow-sm' : 'text-gray-700'
              }`}
            >
              <NavItem 
                Icon={item.Icon} 
                title={item.title}
                className="flex-1"
              />
              <ChevronRight className={`w-4 h-4 mr-3 transition-colors ${
                activeMenu === item.key ? 'text-gray-950' : 'text-gray-400 group-hover:text-gray-600'
              }`} />
            </div>
          ))}
        </div>
      </nav>

      {/* Desktop Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => dispatch(fetchLogout())}
          disabled={loadingLogout}
          className={`w-full flex items-center space-x-3 py-2 px-4 rounded-xl transition-colors text-white 
            ${loadingLogout ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'}
          `}
        >
          {loadingLogout ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 100 16v-4l-4 4 4 4v-4a8 8 0 01-8-8z" />
            </svg>
          ) : (
            <LogOut className="w-5 h-5" />
          )}
          <span className="font-medium">{loadingLogout ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );

  // Render Mobile/Tablet Header
  const renderMobileHeader = () => (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm border-b border-gray-200 relative z-40">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg flex items-center justify-center">
          <Home className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Nusas</h1>
      </div>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );

  // Render Mobile/Tablet Sidebar
  const renderMobileSidebar = () => (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        // onClick={handleOverlayClick}
      />
      
      {/* Sidebar Content */}
      <div className="relative w-full h-full bg-white flex flex-col">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-center shadow-sm">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Kasir</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(setIsOpen(false))}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex-1 px-6 py-6 overflow-y-auto">
          <div className="space-y-3">
            {menuItems.map((item) => (
              <div
                key={item.key}
                onClick={() => handleNavigate(item.path)}
                className={`group flex items-center justify-between w-full rounded-xl cursor-pointer transition-all duration-200 ${
                  activeMenu === item.key 
                    ? 'bg-blue-50 text-blue-700 shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <NavItem 
                  Icon={item.Icon} 
                  title={item.title}
                  className="flex-1 p-4"
                />
                <ChevronRight className={`w-4 h-4 mr-4 transition-colors ${
                  activeMenu === item.key ? 'text-blue-500' : 'text-gray-400'
                }`} />
              </div>
            ))}
          </div>
        </nav>

        {/* Mobile Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => dispatch(fetchLogout())}
            disabled={loadingLogout}
            className={`w-full flex items-center justify-center space-x-3 p-4 rounded-xl transition-colors shadow-sm text-white 
              ${loadingLogout ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-800'}
            `}
          >
            {loadingLogout ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 100 16v-4l-4 4 4 4v-4a8 8 0 01-8-8z" />
              </svg>
            ) : (
              <LogOut className="w-5 h-5" />
            )}
            <span className="font-medium">{loadingLogout ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (  
    <>
      {toast && (
          <ToastPortal> 
              <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]'>
              <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => { 
                setToast(null)
                dispatch(resetLogout())
              }} 
              duration={3000}
              />
              </div>
          </ToastPortal>
      )}

      {/* Conditional Rendering based on Device Type */}
      {!isMobileDeviceType && renderDesktopSidebar()}
      
      {isMobileDeviceType && (
        <>
          {renderMobileHeader()}
          {renderMobileSidebar()}
        </>
      )}
    </>
  );
};


const NavItem = ({ Icon, title }) => (
  <div className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition">
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{title}</span>
  </div>
);

export default Sidebar;
