import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { loginSlice } from '../reducers/get'
import { login } from '../actions/get'
import {
    Toast, 
    ToastPortal
} from './alert'
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const {toast, setToast} = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { resetLogin } = loginSlice.actions
    const { loadingLogin, errorLogin, errorField, successLogin } = useSelector(state => state.login);

    useEffect(() => {
        if (errorLogin) {
            setToast({
                type: "error",
                message: "terjadi kesalahan saat login, silahkan coba lagi nanti."
            })
        }
    }, [errorLogin])

    useEffect(() => {
        if (successLogin) {
            navigate('/store/required/deploy')
            dispatch(resetLogin())
        }
    }, [successLogin])
    
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
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
        if (errorField && errorField[name]) {
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
        return errorField && errorField[field] ? errorField[field] : null;
    };

    const isFieldInvalid = (field) => {
        const hasError = getFieldError(field);
        const isEmpty = !formData[field].trim();
        const isTouched = touched[field];
        
        return hasError || (isTouched && isEmpty);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Mark all fields as touched
        setTouched({
        Email: true,
        Password: true
        });

        // Basic validation
        if (!formData.Email.trim() || !formData.Password.trim()) {
        return;
        }

        // Create FormData for multipart/form-data
        const submitData = new FormData();
        submitData.append('Email', formData.Email);
        submitData.append('Password', formData.Password);

        // Dispatch login action
        dispatch(login(submitData));
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
                    <div className="mx-auto h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <LogIn className="h-8 w-8 text-white" />
                    </div>
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
                    <label htmlFor="Email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className={`h-5 w-5 ${isFieldInvalid('Email') ? 'text-red-400' : 'text-gray-400'}`} />
                        </div>
                        <input
                        id="Email"
                        name="Email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.Email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('Email')}
                        className={`
                            w-full pl-10 pr-4 py-3 border rounded-xl text-gray-900 placeholder-gray-500 
                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                            transition-all duration-200 ease-in-out
                            ${isFieldInvalid('Email') 
                            ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                            : 'border-gray-300 bg-white hover:border-gray-400'
                            }
                        `}
                        placeholder="Masukkan email Anda"
                        />
                    </div>
                    {(getFieldError('Email') || (touched.Email && !formData.Email.trim())) && (
                        <p className="mt-2 text-sm text-red-600 font-medium">
                        {getFieldError('Email') || 'Email wajib diisi'}
                        </p>
                    )}
                    </div>

                    {/* Password Field */}
                    <div>
                    <label htmlFor="Password" className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className={`h-5 w-5 ${isFieldInvalid('Password') ? 'text-red-400' : 'text-gray-400'}`} />
                        </div>
                        <input
                        id="Password"
                        name="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.Password}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('Password')}
                        className={`
                            w-full pl-10 pr-12 py-3 border rounded-xl text-gray-900 placeholder-gray-500 
                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                            transition-all duration-200 ease-in-out
                            ${isFieldInvalid('Password') 
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
                    {(getFieldError('Password') || (touched.Password && !formData.Password.trim())) && (
                        <p className="mt-2 text-sm text-red-600 font-medium">
                        {getFieldError('Password') || 'Password wajib diisi'}
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
                        : 'bg-green-500 hover:bg-green-600 active:bg-green-700 shadow-lg hover:shadow-xl'
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
                    <button className="ml-1 font-semibold text-green-500 hover:text-green-600 transition-colors duration-200">
                        Reset disini
                    </button>
                    </p>
                </div>
                </div>

                {/* Success Demo */}
                {successLogin && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-700 text-sm font-medium text-center">
                    Login berhasil! Anda akan dialihkan...
                    </p>
                </div>
                )}
            </div>
        </div>
    );
};

export default LoginComponent;