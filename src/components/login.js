import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { loginSlice } from '../reducers/post';
import { login } from '../actions/post';
import { resetApp } from '../reducers/state'
import { logoutSlice } from '../reducers/get';
import {
    Toast, 
    ToastPortal
} from './alert'
import { useNavigate } from 'react-router-dom';
import { fetchAuthStatusLogin } from '../actions/get';

const LoginComponent = () => {
    const [toast, setToast] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { resetLogout } = logoutSlice.actions
    const { resetLogin } = loginSlice.actions
    const { loadingLogin, errorLogin, errorField, successLogin } = useSelector(state => state.loginState);

    // Local errors state to manage field errors
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (errorLogin) {
            setToast({
                type: "error",
                message: errorLogin
            })
        }
    }, [errorLogin])

    useEffect(() => {
        if (successLogin || successLogin === "Login Successfully") {
            setToast(null)
            dispatch(resetLogin())
            dispatch(resetLogout())
            navigate('/tenants')
        }
    }, [successLogin])

    // Unified error field handling mechanism
    useEffect(() => {
        if (errorField && Object.keys(errorField).length > 0) {
            const mergedErrors = errorField.reduce((acc, curr) => {
                return { ...acc, ...curr };
            }, {});
            
            // Convert server errors (uppercase) to match formData keys (lowercase)
            const normalizedErrors = {};
            Object.keys(mergedErrors).forEach(key => {
                const lowerKey = key.toLowerCase();
                normalizedErrors[lowerKey] = mergedErrors[key];
                // Keep original key as well for backward compatibility
                normalizedErrors[key] = mergedErrors[key];
            });
            
            setErrors(prev => ({
                ...prev,
                ...normalizedErrors
            }));
        }
    }, [errorField])

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
        
        // Clear field-specific errors when user starts typing
        if (errors && errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
            dispatch(resetLogin());
        }
    };

    const handleBlur = (field) => {
        setTouched(prev => ({
        ...prev,
        [field]: true
        }));
    };

    const getFieldError = (field) => {
        return errors && errors[field] ? errors[field] : null;
    };

    const isFieldInvalid = (field) => {
        const hasError = getFieldError(field);
        const formField = formData[field.toLowerCase()]; // Handle case mismatch
        const isEmpty = !formField || !formField.trim();
        const isTouched = touched[field];
        
        return hasError || (isTouched && isEmpty);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Mark all fields as touched
        setTouched({
        email: true,
        password: true
        });

        // Basic validation
        if (!formData.email.trim() || !formData.password.trim()) {
        return;
        }

        // Dispatch login action
        dispatch(login(formData));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {toast && (
                <ToastPortal> 
                    <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-100'>
                    <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => { 
                        setToast(null)
                        dispatch(resetLogin())
                    }} 
                    duration={3000}
                    />
                    </div>
                </ToastPortal>
            )}

            <div className="max-w-md w-full space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <img src="/image/logo_nusas_2.png" alt="Logo NUSAS" className="mx-auto h-20 w-20 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900">
                    Masuk ke Akun Anda
                    </h2>
                    <p className="mt-2 text-gray-600">
                    Silakan masukkan kredensial Anda untuk melanjutkan
                    </p>
                </div>

                {/* Login Form */}
                <div className="space-y-6">
                    {/* Email Field */}
                    <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 ${isFieldInvalid('email') ? 'text-red-400' : 'text-gray-400'}`} />
                        </div>
                        <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        className={`
                            w-full pl-10 pr-4 py-3 border rounded-xl text-gray-900 placeholder-gray-500 
                            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                            transition-all duration-200 ease-in-out
                            ${isFieldInvalid('email') 
                            ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                            : 'border-gray-300 bg-white hover:border-gray-400'
                            }
                        `}
                        placeholder="Masukkan email Anda"
                        />
                    </div>
                    {(getFieldError('email') || getFieldError('Email') || (touched.email && !formData.email.trim())) && (
                        <p className="mt-2 text-sm text-red-600 font-medium">
                        {getFieldError('email') || getFieldError('Email') || 'Email wajib diisi'}
                        </p>
                    )}
                    </div>

                    {/* Password Field */}
                    <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 ${isFieldInvalid('password') ? 'text-red-400' : 'text-gray-400'}`} />
                        </div>
                        <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('password')}
                        className={`
                            w-full pl-10 pr-12 py-3 border rounded-xl text-gray-900 placeholder-gray-500 
                            focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
                            transition-all duration-200 ease-in-out
                            ${isFieldInvalid('password') 
                            ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                            : 'border-gray-300 bg-white hover:border-gray-400'
                            }
                        `}
                        placeholder="Masukkan password Anda"
                        />
                        <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-green-500 transition-colors duration-200"
                        >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                        )}
                        </button>
                    </div>
                    {(getFieldError('password') || getFieldError('Password') || (touched.password && !formData.password.trim())) && (
                        <p className="mt-2 text-sm text-red-600 font-medium">
                        {getFieldError('password') || getFieldError('Password') || 'Password wajib diisi'}
                        </p>
                    )}
                    </div>

                    {/* Submit Button */}
                    <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loadingLogin}
                    className={`
                        w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white 
                        transition-all duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                        ${loadingLogin 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gray-900 hover:bg-gray-800 active:bg-gray-950 shadow-lg hover:shadow-xl'
                        }
                    `}
                    >
                    {loadingLogin ? (
                        <div className="flex items-center">
                        <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Sedang Masuk...
                        </div>
                    ) : (
                        <div className="flex items-center">
                        <LogIn className="h-5 w-5 mr-2" />
                        Masuk
                        </div>
                    )}
                    </button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                    Lupa password? 
                    <button 
                    onClick={() => navigate('/forgot/password')}
                    className="ml-1 font-semibold text-gray-900 hover:text-gray-800 transition-colors duration-200"
                    >
                        Reset disini
                    </button>
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;