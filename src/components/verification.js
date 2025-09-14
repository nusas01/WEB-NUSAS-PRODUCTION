import { useEffect, useState } from 'react';
import { 
  Shield, 
  Mail, 
  AlertCircle,
  CheckCircle,
  ArrowRight,
  LogIn
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Toast,
  ToastPortal,
} from './alert'
import {
  signupVerificationSlice
} from '../reducers/patch'
import {
  signupVerification
} from '../actions/patch'
import { useNavigate } from 'react-router-dom';
// Import your navigation hook or router
// import { useNavigate } from 'react-router-dom'; // for React Router
// import { useRouter } from 'next/router'; // for Next.js

export default function VerificationForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null)
  const [isVerified, setIsVerified] = useState(false);

  const {resetSignupVerification} = signupVerificationSlice.actions
  const {
    successSignupVerification,
    errorSignupVerification, 
    errorFieldsSignupVerification,
    loadingSignupVerification
  } = useSelector((state) => state.signupVerificationState)

  useEffect(() => {
    if (successSignupVerification) {
        setToast({
            type: 'success',
            message: successSignupVerification || ""
        })
        setCode('')
        setIsVerified(true) // Set verified state
    }
  }, [successSignupVerification])
 
  useEffect(() => {
    setIsVerifying(loadingSignupVerification)
  }, [loadingSignupVerification])

  useEffect(() => {
    if (errorSignupVerification) {
        setToast({
          type: 'error',
          message: errorSignupVerification,
        })
    }
  }, [errorSignupVerification])

  const handleCodeChange = (e) => {
    dispatch(resetSignupVerification())

    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
      if (value.length <= 8) {
        setCode(value);
        setError('');
      }
    };

  const handleVerify = () => {
    if (!code) {
      setError('Please enter the verification code');
      return;
    }

    if (code.length !== 8) {
      setError('Verification code must be 8 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    dispatch(signupVerification({code: code}))
  };

  // Success Screen Component
  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Success Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img src='/image/logo_nusas_2.png' className='w-20 h-20'/>
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Successful!</h1>
            <p className="text-gray-600 mb-2">
              Your account has been successfully verified
            </p>
            <p className="text-sm text-gray-900 font-medium">
              Welcome to nusas.id
            </p>
          </div>

          {/* Success Card */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="bg-green-100 rounded-full p-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Account Verified</h3>
                <p className="text-gray-600">
                  You can now access all features of your account
                </p>
              </div>

              {/* Navigate to Login Button */}
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:scale-105"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Continue to Login
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>

              {/* Alternative Actions */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">
                  What's next?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </button>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 mr-1" />
                    Home
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-green-800 font-medium mb-1">Verification Complete</p>
                <p className="text-green-700">
                  Your account is now active and ready to use. You can login with your credentials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original Verification Form (when not verified yet)
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {toast && (
            <ToastPortal> 
                <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-100'>
                <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={() => { 
                  setToast(null)
                  dispatch(resetSignupVerification())
                }} 
                duration={3000}
                />
                </div>
            </ToastPortal>
        )}

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src='/image/logo_nusas_2.png' className='w-20 h-20'/>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
          <p className="text-gray-600 mb-2">
            We've sent a 8-digit verification code to your email address
          </p>
          <p className="text-sm text-gray-900 font-medium">
            nusas.id
          </p>
        </div>

        {/* Verification Form */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <div className="space-y-6">
            {/* Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter Verification Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="00000000"
                  maxLength={8}
                  className={`block w-full px-4 py-4 text-center text-2xl font-mono tracking-widest border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                />
                {code.length > 0 && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-sm text-gray-500">
                      {code.length}/8
                    </span>
                  </div>
                )}
              </div>
              
              {errorFieldsSignupVerification?.code && (
                <div className="mt-2 flex items-center space-x-1 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errorFieldsSignupVerification?.code}</span>
                </div>
              )}
            </div>

            {/* Verify Button */}
            <button
              onClick={() => handleVerify()}
              disabled={isVerifying || code.length !== 8}
              className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Verify Account
                </>
              )}
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-blue-800 font-medium mb-1">Having trouble?</p>
              <p className="text-blue-700">
                Check your spam folder or contact our support team if you don't receive the verification code within 5 minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            This verification code will expire in 2 minutes
          </p>
        </div>
      </div>
    </div>
  );
}