import React, { useEffect, useState } from 'react';
import { 
  Mail, 
  Rocket, 
  CheckCircle, 
  Key, 
  Search,
  Globe,
  Hourglass,
  User,
  Calendar,
  Settings,
  TestTube,
  RefreshCcw,
  Menu,
  UserPlus,
  Plus,
  AlertCircle,
  Shield,
  BadgeAlert,
} from 'lucide-react';
import {
    Toast,
    ToastPortal,
} from './alert';
import Sidebar from './sidebar';
import {
    storesVerificationSlice,
    accessKeySlice,
    accountTestingCustomerStoreSlice,
    accessKeyStoreTestingSlice,
} from '../reducers/get'
import {
    sendEmailCredentialsSlice,
    deployAppSlice,
    deployFinishedSlice,
    deployAppTestingSlice,
    createAccountCustomerStoreTestingSlice,
    paymentGatewayFailedSlice,
} from '../reducers/post'
import {
    sendEmailRequiredCredentialsPayment,
    deployApp,
    deployFinished,
    deployAppTesting,
    createAccountTestingCustomerStore,
    paymentGatewayFailed,
} from '../actions/post'
import {
    navbarSlice
} from '../reducers/reducers'
import { useDispatch, useSelector } from 'react-redux';
import { 
    useElementHeight,
    formatDate,
} from './helper';
import {
    fetchStoresVerificationRequired,
    createAccessKeyStore,
    fetchAccountTestingCustomerStore,
    createAccessKeyMaintananceTenant,
} from '../actions/get'
import { type } from '@testing-library/user-event/dist/type';
import {
    AccessKeyModal
} from './model'

const StoreDeploymentDashboard = () => {
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [toast, setToast] = useState(null)
    const [loadingSpesifik, setLoadingSpesifik] = useState(null)
    const { setIsOpen } = navbarSlice.actions
    const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)

    const { ref: headerRef, height: headerHeight } = useElementHeight();



    // Mock data based on your structure
    const {resetErrorStoresVerification, removeStoresVerificationById} = storesVerificationSlice.actions
    const {
        storesVerificationData:storeData,
        storesVerificationError,
        loadingStoresVerification
    } = useSelector((state) => state.persisted.storesVerification)

    useEffect(() => {
        if (storeData.length === 0) {
            dispatch(fetchStoresVerificationRequired())
        }
    }, [storeData])

    useEffect(() => {
        if (storesVerificationError) {
            setToast({
                type: "error",
                message: storesVerificationError
            })
        }
    }, [storesVerificationError])



    // handle send email when credintials payment gateway empty
    const {resetSendEmailCredentials} = sendEmailCredentialsSlice.actions
    const {sendEmailCredentialsSuccess, sendEmailCredentialsError, loadingSendEmailCredentials} = useSelector((state) => state.sendEmailCredentialsState)

    useEffect(() => {
        if (sendEmailCredentialsSuccess) {
            setToast({
                type: 'success',
                message: sendEmailCredentialsSuccess,
            })
        }
    }, [sendEmailCredentialsSuccess])

    useEffect(() => {
        if (sendEmailCredentialsError) {
            setToast({
                type: 'error',
                message: sendEmailCredentialsError,
            })
        }
    }, [sendEmailCredentialsError])

    useEffect(() => {
        if (loadingSendEmailCredentials === false) {
            setLoadingSpesifik(null)
        } 
    }, [loadingSendEmailCredentials])

    const handleSendEmailRequiredCredentials = (storeId, email) => {
        dispatch(sendEmailRequiredCredentialsPayment({
            email: email,
        }))
        setLoadingSpesifik(storeId)
    };


    // handle create access key app store
    const [dataStoreCreateAccessKey, setDataStoreCreateAccessKey] = useState(null)
    const {resetAccessKey} = accessKeySlice.actions
    const {accessKeyData, accessKeyError, loadingAccessKey} = useSelector((state) => state.accessKeyState)

    useEffect(() => {
        if (accessKeyError) {
            setToast({
                type: 'error',
                message: accessKeyError,
            })
        }
    }, [accessKeyError])

    useEffect(() => {
        if (loadingAccessKey === false) {
            setLoadingSpesifik(null)
        } 
    }, [loadingAccessKey])

    const handleCreateAccessKey = (store, tenantId, storeId) => {
        setLoadingSpesifik(storeId)
        setDataStoreCreateAccessKey(store)
        dispatch(createAccessKeyStore(
            storeId,
            tenantId,
        ))
    };

     // handle create access key for maintenance store
    const {resetErrorAccessKeyStoreTesting, resetAccessKeyStoreTesting } = accessKeyStoreTestingSlice.actions
    const { 
        dataAccessKeyStoreTesting,
        errorAccessKeyStoreTesting,
        loadingAccessKeyStoreTesting,
    } = useSelector((state) => state.accessKeyStoreTestingState)

    useEffect(() => {
        if (errorAccessKeyStoreTesting) {
            setToast({
                type: 'error',
                message: errorAccessKeyStoreTesting,
            })
            dispatch(resetErrorAccessKeyStoreTesting());
            setDataStoreCreateAccessKey(null);
        }
    }, [errorAccessKeyStoreTesting])

     useEffect(() => {
        if (loadingAccessKeyStoreTesting === false) {
            setLoadingSpesifik(null)
        } 
    }, [loadingAccessKeyStoreTesting])

    const handleCreateAccessKeyMaintananceTenant = (storeId, item) => {
        setDataStoreCreateAccessKey(item);
        setLoadingSpesifik(storeId)
        dispatch(createAccessKeyMaintananceTenant(item.tenant.id, storeId))
    };



    // handle deploy app store
    const {resetDeployApp} = deployAppSlice.actions
    const {deployAppSuccess, deployAppError, loadingDeployApp} = useSelector((state) => state.deployAppState)

    useEffect(() => {
        if (deployAppSuccess) {
            setToast({
                type: 'success',
                message: deployAppSuccess,
            })
        }
    }, [deployAppSuccess])

    useEffect(() => {
        if (deployAppError) {
            setToast({
                type: 'error',
                message: deployAppError,
            })
        }
    }, [deployAppError])

    useEffect(() => {
        if (loadingDeployApp === false) {
            setLoadingSpesifik(null)
        } 
    }, [loadingDeployApp])

    const handleDeployApp = (tenantId, storeId) => {
        setLoadingSpesifik(storeId)
        dispatch(deployApp({
            tenant_id: tenantId,
            store_id: storeId,
        }))
    };


    // handle deploy finished
    const {resetDeployFinished} = deployFinishedSlice.actions
    const {deployFinishedSuccess, deployFinishedError, loadingDeployFinished} = useSelector((state) => state.deployFinishedState)

    useEffect(() => {
        if (deployFinishedSuccess) {
            setToast({
                type: 'success',
                message: deployFinishedSuccess,
            })
        }
    }, [deployFinishedSuccess])

    useEffect(() => {
        if (deployFinishedError) {
            setToast({
                type: 'error',
                message: deployFinishedError,
            })
        }
    }, [deployFinishedError])

    useEffect(() => {
        if (loadingDeployFinished === false) {
            setLoadingSpesifik(null)
        } 
    }, [loadingDeployFinished])

    const handleDeployFinished = (storeId) => {
        setLoadingSpesifik(storeId)
        dispatch(deployFinished({store_id: storeId}))
    };



    // handle deploy testing app
    const {resetDeployAppTesting} = deployAppTestingSlice.actions
    const {deployAppTestingSuccess, deployAppTestingError, loadingDeployAppTesting} = useSelector((state) => state.deployAppTestingState)

    useEffect(() => {
        if (deployAppTestingSuccess) {
            setToast({
                type: 'success',
                message: deployAppTestingSuccess,
            })
        }
    }, [deployAppTestingSuccess])

    useEffect(() => {
        if (deployAppTestingError) {
            setToast({
                type: 'error',
                message: deployAppTestingError,
            })
        }
    }, [deployAppTestingError])

    const handleTestDeploy = () => {
        dispatch(deployAppTesting())
    };



    // handle response get data account testing customer store
    const {resetErrorAccountTestingCustomerStore} = accountTestingCustomerStoreSlice.actions
    const {errorAccountTestingCustomerStore} = useSelector((state) => state.persisted.accountTestingCustomerStore)

    useEffect(() => {
        if (errorAccountTestingCustomerStore) {
            setToast({
                type: "error",
                message: errorAccountTestingCustomerStore
            })
        }
    }, [errorAccountTestingCustomerStore])



    // handle response create account testing customer store
    const {resetAccountCustomerStoreTesting} = createAccountCustomerStoreTestingSlice.actions
    const {accountCustomerStoreTestingSuccess, accountCustomerStoreTestingError} = useSelector((state) => state.createAccountCustomerStoreTestingState)

    useEffect(() => {
        if (accountCustomerStoreTestingSuccess) {
            setToast({
                type: "success",
                message: accountCustomerStoreTestingSuccess
            })
            dispatch(fetchAccountTestingCustomerStore())
        }
    }, [accountCustomerStoreTestingSuccess])

    useEffect(() => {
        if (accountCustomerStoreTestingError) {
            setToast({
                type: "error",
                message: accountCustomerStoreTestingError
            })
        }
    }, [accountCustomerStoreTestingError])



    // handle payment gateway failed
    const {resetPaymentGatewayFailed} = paymentGatewayFailedSlice.actions
    const {
        paymentGatewayFailedSuccess,
        paymentGatewayFailedError,
        loadingPaymentGatewayFailed,
    } = useSelector((state) => state.paymentGatewayFailedState)

    useEffect(() => {
        if (paymentGatewayFailedSuccess) {
            setToast({
                type: "success",
                message: paymentGatewayFailedSuccess
            })
            dispatch(fetchStoresVerificationRequired())
        }
    }, [paymentGatewayFailedSuccess])

    useEffect(() => {
        if (paymentGatewayFailedError) {
            setToast({
                type: "error",
                message: paymentGatewayFailedError
            })
        }
    }, [paymentGatewayFailedError])

    useEffect(() => {
        if (loadingPaymentGatewayFailed === false) {
            setLoadingSpesifik(null)
        } 
    }, [loadingPaymentGatewayFailed])

    const handlePaymentGatewayFailed = (tenantId, storeId, email) => {
        setLoadingSpesifik(storeId)
        dispatch(paymentGatewayFailed({
            tenant_id: tenantId, 
            email: email,
        }))
    }


    const isCredentialsEmpty = (tenant) => {
        return !tenant.bussnes_id || !tenant.api_key || !tenant.secret_key_webhook;
    };

    const isCredentialsFilled = (tenant) => {
        return tenant.bussnes_id && tenant.api_key && tenant.secret_key_webhook;
    };

    const getStatusBadge = (tenant) => {
        if (isCredentialsEmpty(tenant)) {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Needs Setup
            </span>
        );
        }
        return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Ready
        </span>
        );
    };

    const filteredData = storeData.filter(store => {
        const matchesSearch = store.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            store.tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filterStatus === 'needs-setup') {
        return matchesSearch && isCredentialsEmpty(store.tenant);
        }
        if (filterStatus === 'ready') {
        return matchesSearch && isCredentialsFilled(store.tenant);
        }
        return matchesSearch;
    });

    return (
        <div className='flex'>
            {((isMobileDeviceType && isOpen) || !isMobileDeviceType) && (
                <div className='w-1/10 z-50 min-w-[290px]'>
                <Sidebar
                activeMenu={"Store Required Deploy"}
                />
                </div>
            )}

            <div className='flex-1'>
                <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
                    {toast && (
                        <ToastPortal> 
                            <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]'>
                            <Toast 
                            message={toast.message} 
                            type={toast.type} 
                            onClose={() => { 
                                setToast(null)
                                dispatch(resetErrorStoresVerification())
                                dispatch(resetSendEmailCredentials())
                                dispatch(resetAccessKey())
                                dispatch(resetDeployApp())
                                dispatch(resetDeployFinished())
                                dispatch(resetDeployAppTesting())
                                dispatch(resetErrorAccountTestingCustomerStore())
                                dispatch(resetAccountCustomerStoreTesting())
                                dispatch(resetPaymentGatewayFailed())
                            }} 
                            duration={10000}
                            />
                            </div>
                        </ToastPortal>
                    )}

                    { (accessKeyData || dataAccessKeyStoreTesting) && (
                        <AccessKeyModal 
                        isOpen={accessKeyData || dataAccessKeyStoreTesting} 
                        onClose={() => {
                            dispatch(resetAccessKey())
                            dispatch(resetAccessKeyStoreTesting())
                            setDataStoreCreateAccessKey(null)
                        }}
                        accessKey={accessKeyData || dataAccessKeyStoreTesting}
                        data={dataStoreCreateAccessKey}
                        />
                    )}

                    <div className="max-w-7xl">
                        {/* Header */}
                            <div
                            ref={headerRef}
                            className={`fixed top-0 z-10 bg-white border-b border-gray-200 ${isMobileDeviceType && isOpen ? 'hidden' : ''}`}
                            style={{
                                left: (isMobileDeviceType) ? '0' : '288px',
                                width: isMobileDeviceType ? '100%' : 'calc(100% - 288px)',
                                height: '64px'
                            }}
                            >
                            <div className="h-full mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
                                <div className="flex items-center justify-between h-full gap-2 sm:gap-4">
                                    { !isMobileDeviceType && (
                                        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                                            <div className="w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md flex items-center justify-center shadow-lg flex-shrink-0">
                                                <Hourglass className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-800 truncate">Store Required Deploy</h1>
                                                <p className='text-xs taxt-gray-400'>List of store waiting deploy app</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-4">
                                        <button
                                        onClick={() => dispatch(fetchStoresVerificationRequired())}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors">
                                            <RefreshCcw className="w-4 h-4 mr-2" />
                                            Refresh
                                        </button>
                                    </div>

                                    <div className='flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0'>
                                        { isMobileDeviceType && (
                                            <button 
                                            onClick={() => dispatch(setIsOpen(true))}
                                            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-md sm:rounded-lg transition-colors touch-manipulation"
                                            aria-label="Open menu"
                                            >
                                            <Menu className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>  

                        {/* Main Content */}
                        <div className="max-w-6xl mx-auto " style={{marginTop: headerHeight}}>
                            <TestingAccountCard/>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                                    <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                        <Globe className="h-8 w-8 text-gray-900" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Total Stores</dt>
                                            <dd className="text-2xl font-bold text-gray-900">{storeData.length}</dd>
                                        </dl>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                                    <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                        <Mail className="h-8 w-8 text-red-600" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Needs Setup</dt>
                                            <dd className="text-2xl font-bold text-red-600">
                                            {storeData.filter(store => isCredentialsEmpty(store.tenant)).length}
                                            </dd>
                                        </dl>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                                    <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Ready to Deploy</dt>
                                            <dd className="text-2xl font-bold text-green-600">
                                            {storeData.filter(store => isCredentialsFilled(store.tenant)).length}
                                            </dd>
                                        </dl>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                                    <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                        <Rocket className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Deployed</dt>
                                            <dd className="text-2xl font-bold text-blue-600">0</dd>
                                        </dl>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="bg-white shadow-sm rounded-lg border border-gray-200 mb-6">
                            <div className="p-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="flex-1 min-w-0">
                                    <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                                        placeholder="Search by subdomain or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-gray-900 focus:border-gray-900 rounded-lg"
                                    >
                                    <option value="all">All Status</option>
                                    <option value="needs-setup">Needs Setup</option>
                                    <option value="ready">Ready to Deploy</option>
                                    </select>
                                </div>
                                </div>
                            </div>
                            </div>

                            {/* Table */}
                            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Store Info
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Owner
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData.map((store) => (
                                    <tr key={store.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                            <div className="h-10 w-10 rounded-lg bg-gray-900 flex items-center justify-center">
                                                <Globe className="h-5 w-5 text-white" />
                                            </div>
                                            </div>
                                            <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {store.subdomain}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {store.full_domain}
                                            </div>
                                            </div>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                <User className="h-4 w-4 text-gray-500" />
                                            </div>
                                            </div>
                                            <div className="ml-3">
                                            <div className="text-sm font-medium text-gray-900">
                                                {store.tenant.email}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {store.tenant.phone_number}
                                            </div>
                                            </div>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(store.tenant)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {formatDate(store.created_at)}
                                        </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                {/* Send Email Button - shows when credentials are empty */}
                                                {isCredentialsEmpty(store.tenant) && (
                                                <button
                                                    disabled={loadingSendEmailCredentials && loadingSpesifik === store.store_id}
                                                    onClick={() => handleSendEmailRequiredCredentials(store.store_id, store.tenant.email)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                    title="Send Payment Gateway Credentials Email"
                                                >
                                                    {(loadingSendEmailCredentials && loadingSpesifik === store.store_id) ? (
                                                        <span className="w-3 h-3 mr-1 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <Mail className="w-3 h-3 mr-1" />
                                                    )}
                                                    { (loadingSendEmailCredentials && loadingSpesifik === store.store_id) ? 'Sending...' : 'Email'}
                                                </button>
                                                )}

                                                {/* Create Access Key maintanance store - always shows */}
                                                <button
                                                disabled={loadingAccessKeyStoreTesting && loadingSpesifik === store.store_id}
                                                onClick={() => handleCreateAccessKeyMaintananceTenant(store.store_id, store)}
                                                className="inline-flex items-center px-3 py-1.5 border border-yellow-300 rounded-md text-xs font-medium text-yellow-700 bg-yellow-50 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                                                title="Create Access Key for Maintenance Store"
                                                >
                                                {(loadingAccessKeyStoreTesting && loadingSpesifik === store.store_id) ? (
                                                    <span className="w-3 h-3 mr-1 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Key className="w-3 h-3 mr-1" />
                                                )}
                                                {(loadingAccessKeyStoreTesting && loadingSpesifik === store.store_id) ? 'Creating...' : 'Access Key Testing'}
                                                </button>
                                                
                                                {/* Create Access Key - always shows */}
                                                <button
                                                    disabled={loadingAccessKey && loadingSpesifik === store.store_id}
                                                    onClick={() => handleCreateAccessKey(store, store.tenant_id, store.store_id)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                                    title="Create Access Key"
                                                >
                                                {(loadingAccessKey && loadingSpesifik === store.store_id) ? (
                                                    <span className="w-3 h-3 mr-1 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Key className="w-3 h-3 mr-1" />
                                                )}
                                                {(loadingAccessKey && loadingSpesifik === store.store_id) ? 'Creating...' : 'Access Key'}
                                                </button>

                                                {/* credentials payment gateway invalid */}
                                                {isCredentialsFilled(store.tenant) && (
                                                    <button
                                                        disabled={loadingPaymentGatewayFailed && loadingSpesifik === store.store_id}
                                                        onClick={() => handlePaymentGatewayFailed(store.tenant_id, store.store_id, store.tenant.email)}
                                                        className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                        title="Create Access Key"
                                                    >
                                                    {(loadingPaymentGatewayFailed && loadingSpesifik === store.store_id) ? (
                                                        <span className="w-3 h-3 mr-1 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <BadgeAlert className="w-3 h-3 mr-1" />
                                                    )}
                                                    {(loadingPaymentGatewayFailed && loadingSpesifik === store.store_id) ? 'Sending...' : 'Credentials Failed'}
                                                    </button>
                                                )}

                                                {/* Deploy App Button - shows when credentials are filled */}
                                                {isCredentialsFilled(store.tenant) && (
                                                <button
                                                    disabled={loadingDeployApp && loadingSpesifik === store.store_id}
                                                    onClick={() => handleDeployApp(store.tenant_id, store.store_id)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-md text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                    title="Deploy Application"
                                                >
                                                    {(loadingDeployApp && loadingSpesifik === store.store_id) ? (
                                                        <span className="w-3 h-3 mr-1 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <Rocket className="w-3 h-3 mr-1" />
                                                    )}
                                                    {(loadingDeployApp && loadingSpesifik === store.store_id) ? 'Deploying...' : 'Deploy'}
                                                </button>
                                                )}
                                                
                                                {/* Deploy Finished Button - shows when credentials are filled */}
                                                {isCredentialsFilled(store.tenant) && (
                                                <button
                                                    disabled={loadingDeployFinished && loadingSpesifik === store.store_id}
                                                    onClick={() => handleDeployFinished(store.store_id)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-green-300 rounded-md text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                                    title="Mark as Finished"
                                                >
                                                    {(loadingDeployFinished && loadingSpesifik === store.store_id) ? (
                                                        <span className="w-3 h-3 mr-1 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <CheckCircle className="w-3 h-3 mr-1" />
                                                    )}
                                                    {(loadingDeployFinished && loadingSpesifik === store.store_id) ? 'Finishing...' : 'Finished'}
                                                </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                            
                            {filteredData.length === 0 && (
                                <div className="text-center py-20">
                                <div className="text-gray-500">
                                    <Globe className="mx-auto h-12 w-12 mb-4 opacity-40" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No stores found</h3>
                                    <p className="text-sm">Try adjusting your search or filter criteria.</p>
                                </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default StoreDeploymentDashboard;

const TestingAccountCard = () => {
    const dispatch = useDispatch()
    const {dataAccountTestingCustomerStore: accountData, loadingAccountTestingCustomerStore} = useSelector((state) => state.persisted.accountTestingCustomerStore)

    useEffect(() => {
        if (!accountData) {
            dispatch(fetchAccountTestingCustomerStore())
        }
    }, [])


    const {loadingAccountCustomerStoreTesting} = useSelector((state) => state.createAccountCustomerStoreTestingState)


    if (loadingAccountTestingCustomerStore) {
        return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-4 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
            <span className="text-sm font-medium">Loading account...</span>
            </div>
        </div>
        )
    }

    // If no account data exists, show create account option
    if (!accountData) {
        return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-4">
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserPlus className="h-6 w-6 text-blue-600" />
                </div>
                </div>
                <div>
                <h3 className="text-lg font-semibold text-gray-900">Testing Customer Account</h3>
                <p className="text-sm text-gray-600 mt-1">
                    No testing account found. Create one to enable store testing functionality.
                </p>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <button
                onClick={() => dispatch(createAccountTestingCustomerStore())}
                disabled={loadingAccountCustomerStoreTesting}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium"
                >
                {loadingAccountCustomerStoreTesting ? (
                    <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Creating...</span>
                    </>
                ) : (
                    <>
                    <Plus className="h-4 w-4" />
                    <span>Create Account</span>
                    </>
                )}
                </button>
            </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                <p className="font-medium">Why create a testing account?</p>
                <p className="mt-1">A testing account allows you to simulate customer interactions and validate store functionality before deployment.</p>
                </div>
            </div>
            </div>
        </div>
        );
    }

    // If account data exists, show account information
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
                </div>
            </div>
            <div>
                <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900">Testing Customer Account</h3>
                <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium text-green-600">Active</span>
                </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                Account ready for testing store functionality
                </p>
            </div>
            </div>
            
            <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh account data"
            >
            <Settings className="h-5 w-5 text-gray-400" />
            </button>
        </div>

        {/* Account Details */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4 text-gray-500" />
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Account ID
                </label>
            </div>
            <p className="text-sm font-semibold text-gray-900">#{accountData.id}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4 text-gray-500" />
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Username
                </label>
            </div>
            <p className="text-sm font-semibold text-gray-900">{accountData.username}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Email
                </label>
            </div>
            <p className="text-sm font-semibold text-gray-900">{accountData.email}</p>
            </div>
        </div>

        {/* Usage Info */}
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-green-700">
                <p className="font-medium">Testing account is ready</p>
                <p className="mt-1">Use this account to test customer flows, payments, and store functionality before going live.</p>
            </div>
            </div>
        </div>
        </div>
    );
};
