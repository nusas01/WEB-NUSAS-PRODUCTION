import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Shield, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { signupSlice } from '../reducers/post';
import { signup } from '../actions/post';
import { Toast, ToastPortal } from './alert';
import { useNavigate } from 'react-router-dom';

export default function SignupComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    code_verification_internal: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast,setToast] = useState(null)

  // Validation functions
  const validateName = (name) => {
    if (!name) return 'Name is required';
    if (name.length < 6) return 'Name must be at least 6 characters';
    if (name.length > 50) return 'Name must not exceed 50 characters';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (password.length > 50) return 'Password must not exceed 50 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character';
    return '';
  };

  const validateCode = (code) => {
    if (!code) return 'Verification code is required';
    return '';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const {resetSignup} = signupSlice.actions
  const {
    signupSuccess,
    signupError,
    loadingSignup: isSubmitting,
    signupErrorField: errorField,
  } = useSelector((state) => state.signupState)

  useEffect(() => {
    if (signupError) {
        setToast({
            type: "error",
            message: signupError
        })
    }
  }, [signupError])

  useEffect(() => {
    if (signupSuccess) {
      navigate('/signup/verification')
      setFormData({
        name: '',
        email: '',
        password: '',
        code_verification_internal: '',
      })
    }
  }, [signupSuccess])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      code_verification_internal: validateCode(formData.code_verification_internal)
    };
    
    // Cek kalau semua value error kosong/falsy
    const hasError = Object.values(newErrors).some(err => err);

    if (!hasError) {
        dispatch(signup(formData));
    } else {
        setErrors(newErrors);
    }
  };


  const getPasswordStrength = () => {
    const password = formData.password;
    let score = 0;
    
    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    
    return score;
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {toast && (
            <ToastPortal> 
                <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-100'>
                <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={() => { 
                    setToast(null)
                    dispatch(resetSignup())
                }} 
                duration={3000}
                />
                </div>
            </ToastPortal>
        )}

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us and start your journey today
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6">
          <div className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                    (errors.email || errorField[0]?.Email) ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {(errors.email || errorField[0]?.Email) && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email || errorField[0]?.Email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded ${
                          passwordStrength >= level
                            ? level <= 2
                              ? 'bg-red-400'
                              : level === 3
                              ? 'bg-yellow-400'
                              : 'bg-green-400'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {passwordStrength <= 2 && 'Weak password'}
                    {passwordStrength === 3 && 'Good password'}
                    {passwordStrength === 4 && 'Strong password'}
                  </p>
                </div>
              )}
              
              {errors.password && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Verification Code Field */}
            <div>
              <label htmlFor="code_verification_internal" className="block text-sm font-medium text-gray-900 mb-2">
                Verification Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="code_verification_internal"
                  name="code_verification_internal"
                  type="password"
                  value={formData.code_verification_internal}
                  onChange={(e) => handleInputChange('code_verification_internal', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 ${
                    ( errors.code_verification_internal || errorField[0]?.code_verification_internal) ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 focus:bg-white'
                  }`}
                  placeholder="Enter verification code"
                />
              </div>
              {(errors.code_verification_internal || errorField[0]?.code_verification_internal) && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.code_verification_internal || errorField[0]?.code_verification_internal}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                </div>
              ) : (
                <div className="flex items-center">
                  Signup
                </div>
              )}
            </button>
        </div>
    </form>
    </div>
    </div>
)}
