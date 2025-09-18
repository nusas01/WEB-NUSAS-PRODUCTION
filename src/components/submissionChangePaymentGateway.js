import React, { useState } from 'react';
import { 
  Send, 
  Play, 
  Check,
  Key, 
  ChevronDown, 
  ChevronRight, 
  Store, 
  User, 
  Calendar, 
  Clock,
  CreditCard,
  Phone,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Menu,
  Settings,
  TestTube,
  Hourglass, 
  RefreshCcw,
  BadgeAlert,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
    navbarSlice
} from '../reducers/reducers'
import { 
    useElementHeight,
    formatDate,
} from './helper';
import Sidebar from './sidebar';
import {
    Toast, 
    ToastPortal,
} from './alert'
import {
    AccessKeyModal,
    ConfirmationModal,
} from './model'
import {
    deployAppTestingSlice,
    startChangePaymentGatewaySlice,
    finishedChangePaymentGatewaySlice,
    sendEmailUpdateChangePaymentGatewaySlice,
    transactionSubmissionPaidSlice,
    changePaymentGatewayFailedSlice,
} from '../reducers/post'
import {
    deployAppTesting,
    startChangePaymentGatewayTenant,
    finishedChangePaymentGatewayTenant,
    sendEmailUpdateChangePaymentGateway,
    changePaymentGatewayFailed,
} from '../actions/post'
import {
    accessKeyStoreTestingSlice,
    accessKeySlice,
    tenantSubmissionChangePaymentSlice,
} from '../reducers/get'
import {
    createAccessKeyMaintananceTenant,
    createAccessKeyStore,
    getTenantSubmissionChangePaymentGateway,
} from '../actions/get'
import { useEffect } from 'react';

const PaymentGatewayDashboard = () => {
    const dispatch = useDispatch()
    const [expandedRows, setExpandedRows] = useState(new Set());
    const [toast, setToast] = useState(null);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false });
    const [accessKeyModal, setAccessKeyModal] = useState({ isOpen: false, data: null, accessKey: null });
    const [loading, setLoading] = useState({});

    const { setIsOpen } = navbarSlice.actions
    const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted?.navbar || {})

    const { ref: headerRef, height: headerHeight } = useElementHeight();
  
    // Toast helper functions
    const showToast = (message, type) => {
        setToast({ message, type, id: Date.now() });
    };

    const closeToast = () => {
        setToast(null);
    };


    // Mock state management (replace with actual Redux selectors)
    const {resetErrorTenantSubmissionChangePayment} = tenantSubmissionChangePaymentSlice.actions
    const {
        dataTenantSubmissionChangePayment: storeData,
        errorTenantSubmissionChangePayment, 
        loadingTenantSubmissionChangePayment,
    } = useSelector((state) => state.persisted.tenantSubmissionChangePayment)

    useEffect(() => {
        if (storeData.length === 0) {
            dispatch(getTenantSubmissionChangePaymentGateway());
        }
    }, [])

    useEffect(() => {
        setLoading({ ...loading, getAllStore: loadingTenantSubmissionChangePayment });
    }, [loadingTenantSubmissionChangePayment])

    useEffect(() => {
        if (errorTenantSubmissionChangePayment) {
            showToast(errorTenantSubmissionChangePayment, 'error');
            dispatch(resetErrorTenantSubmissionChangePayment())
            setLoading({})
        }
    }, [errorTenantSubmissionChangePayment])

    // const handleGetAllStoreRequiredVerified = async () => {
    //     if (storeData.length > 0) return; // Don't fetch if data already exists

    //     setLoading({ ...loading, getAllStore: true });
    //     try {
    //     const response = await mockApiCall('getAllStoreRequiredVerified', sampleData);
    //     setStoreData(response.data);
    //     } catch (error) {
    //     showToast(error.message, 'error');
    //     } finally {
    //     setLoading({ ...loading, getAllStore: false });
    //     }
    // };
    
    // Sample data
    // const sampleData = [
    //     {
    //     id: "req_001",
    //     status: "PROCESS",
    //     created_at: "2025-01-15T10:30:00Z",
    //     maintenance_time: "2025-01-20T02:00:00Z",
    //     business_id: "BIZ_12345",
    //     api_key: "ak_test_123456789",
    //     secret_key_webhook: "sk_webhook_987654321",
    //     tenant: {
    //         id: "tenant_001",
    //         email: "merchant@example.com",
    //         phone_number: "+628123456789",
    //         stores: [
    //         { id: "store_001", expiration_access: true },
    //         { id: "store_002", expiration_access: false }
    //         ]
    //     },
    //     transaction: {
    //         id: "txn_001",
    //         status: "PAID",
    //         xendit_transaction_id: "xendit_12345"
    //     }
    //     },
    //     {
    //     id: "req_002",
    //     status: "PROCESS",
    //     created_at: "2025-01-16T14:20:00Z",
    //     maintenance_time: "2025-01-21T03:00:00Z",
    //     business_id: "",
    //     api_key: "",
    //     secret_key_webhook: "",
    //     tenant: {
    //         id: "tenant_002",
    //         email: "shop@example.com",
    //         phone_number: "+628987654321",
    //         stores: [
    //         { id: "store_003", expiration_access: true }
    //         ]
    //     },
    //     transaction: {
    //         id: "txn_002",
    //         status: "PAID",
    //         xendit_transaction_id: "xendit_67890"
    //     }
    //     }
    // ];

    // Mock API functions (replace with actual API calls)
    const mockApiCall = (action, data = null, shouldFail = false) => {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
            reject(new Error(`Failed to ${action}. Please try again.`));
            } else {
            resolve({
                success: true,
                data: data || { message: `${action} completed successfully` },
                access_key_maintanance: action === 'createAccessKeyMaintananceTenant' ? 'ak_test_maintenance_' + Math.random().toString(36).substr(2, 9) : undefined
            });
            }
        }, 1000);
        });
    };

    // handle create access key for maintenance tenant
    const [itemCreateAccessKey, setItemCreateAccessKey] = useState(null);
    const [storeIdCreateAccessKey, setStoreIdCreateAccessKey] = useState(null);
    const { resetErrorAccessKeyStoreTesting, resetAccessKeyStoreTesting } = accessKeyStoreTestingSlice.actions
    const { 
        dataAccessKeyStoreTesting,
        errorAccessKeyStoreTesting,
        loadingAccessKeyStoreTesting,
    } = useSelector((state) => state.accessKeyStoreTestingState)

    useEffect(() => {
        if (dataAccessKeyStoreTesting) {
            setAccessKeyModal({
                isOpen: true,
                data: itemCreateAccessKey,
                accessKey: dataAccessKeyStoreTesting,
            });
            setLoading({})
        }
    }, [dataAccessKeyStoreTesting])

    useEffect(() => {
        if (errorAccessKeyStoreTesting) {
            showToast(errorAccessKeyStoreTesting, 'error');
            dispatch(resetErrorAccessKeyStoreTesting());
            setItemCreateAccessKey(null);
            setStoreIdCreateAccessKey(null);
            setLoading({})
        }
    }, [errorAccessKeyStoreTesting])

    useEffect(() => {
        setLoading({ ...loading, [`createAccessKey_${storeIdCreateAccessKey}`]: loadingAccessKeyStoreTesting });
    }, [loadingAccessKeyStoreTesting])

    const handleCreateAccessKeyMaintananceTenant = (storeId, item) => {
        setItemCreateAccessKey(item);
        setStoreIdCreateAccessKey(storeId);
        setConfirmModal({
            isOpen: true,
            title: 'Create Testing Key',
            message: 'Are you sure you want to create a testing access key for this tenant?',
            type: 'info',
            onConfirm: () => { 
                dispatch(createAccessKeyMaintananceTenant(item.tenant.id, storeId))
                setConfirmModal({ isOpen: false });
            },
        });
    };


    // Handle create access key for store
    const {resetAccessKey} = accessKeySlice.actions
    const {
        accessKeyData, 
        accessKeyError, 
        loadingAccessKey,
    } = useSelector((state) => state.accessKeyState)

    useEffect(() => {
        if (accessKeyData) {
            setAccessKeyModal({
                isOpen: true,
                data: itemCreateAccessKey,
                accessKey: accessKeyData,
            });
            setLoading({})
        }
    }, [accessKeyData])

    useEffect(() => {
        if (accessKeyError) {
            showToast(accessKeyError, 'error');
            dispatch(resetAccessKey());
            setItemCreateAccessKey(null);
            setLoading({})
        }
    }, [accessKeyError])

    useEffect(() => {
        setLoading({ ...loading, [`createAccess_${storeIdCreateAccessKey}`]: loadingAccessKey });
    }, [loadingAccessKey])

    const handleCreateAccessKeyStore = async (storeId, item) => {
        setItemCreateAccessKey(item);
        setStoreIdCreateAccessKey(storeId);
        setConfirmModal({
        isOpen: true,
        title: 'Create Store Access Key',
        message: 'Are you sure you want to create an access key for this store?',
        type: 'info',
        onConfirm: () => {
            setConfirmModal({ isOpen: false });
            dispatch(createAccessKeyStore(storeId, item.tenant.id))
        }
        });
    };


    // handle send email 
    const [emailSendEmail, setEmailSendEmail] = useState(null)
    const {resetSendEmailUpdateChangePaymentGateway} = sendEmailUpdateChangePaymentGatewaySlice.actions
    const {
        sendEmailUpdateChangePaymentGatewaySuccess, 
        sendEmailUpdateChangePaymentGatewayError,
        loadingSendEmailUpdateChangePaymentGateway,
    } = useSelector((state) => state.sendEmailUpdateChangePaymentGatewayState)

    useEffect(() => {
        if (sendEmailUpdateChangePaymentGatewaySuccess) {
            showToast('Email sent successfully!', 'success');
            dispatch(resetSendEmailUpdateChangePaymentGateway());
            setLoading({})
        }
    }, [sendEmailUpdateChangePaymentGatewaySuccess])

    useEffect(() => {
        if (sendEmailUpdateChangePaymentGatewayError) {
            showToast(sendEmailUpdateChangePaymentGatewayError, 'error');
            dispatch(resetSendEmailUpdateChangePaymentGateway());
            setLoading({})
        }
    }, [sendEmailUpdateChangePaymentGatewayError])

    useEffect(() => {
        setLoading({ ...loading, [`sendEmail_${emailSendEmail}`]: loadingSendEmailUpdateChangePaymentGateway });
        setEmailSendEmail(null);
    }, [loadingSendEmailUpdateChangePaymentGateway])

    const handleSendEmailRequiredCredentialPaymentGateway = (email) => {
        setEmailSendEmail(email);
        setConfirmModal({
        isOpen: true,
        title: 'Send Email',
        message: `Are you sure you want to send credential requirement email to ${email}?`,
        type: 'info',
        onConfirm: () => {
            setConfirmModal({ isOpen: false });
            dispatch(sendEmailUpdateChangePaymentGateway({email:email}));
        },
        });
    };


    // handle start change payment gateway
    const [startAndFinishId, setStartAndFinishId] = useState(null);
    const {resetStartChangePaymentGateway} = startChangePaymentGatewaySlice.actions 
    const {
        startChangePaymentGatewaySuccess,
        startChangePaymentGatewayError,
        loadingStartChangePaymentGateway,
    } = useSelector((state) => state.startChangePaymentGatewayState)

    useEffect(() => {
        if (startChangePaymentGatewaySuccess) {
            showToast('Payment gateway change process started successfully!', 'success');
            dispatch(resetStartChangePaymentGateway());
            setLoading({})
        }
    }, [startChangePaymentGatewaySuccess])

    useEffect(() => {
        if (startChangePaymentGatewayError) {
            showToast(startChangePaymentGatewayError, 'error');
            dispatch(resetStartChangePaymentGateway());
            setLoading({})
        }
    }, [startChangePaymentGatewayError])

    useEffect(() => {
        setLoading({ ...loading, [`start_${startAndFinishId}`]: loadingStartChangePaymentGateway });
        setStartAndFinishId(null);
    }, [loadingStartChangePaymentGateway])

    const handleStartChangePaymentGatewayTenant = (id, tenantId) => {
        setStartAndFinishId(id);
        setConfirmModal({
        isOpen: true,
        title: 'Start Payment Gateway Change',
        message: 'Are you sure you want to start the payment gateway change process for this tenant?',
        type: 'info',
        onConfirm: () => {
            setConfirmModal({ isOpen: false });
            dispatch(startChangePaymentGatewayTenant({
                id: id, 
                tenant_id: tenantId,
            }))
        }
        });
    };


    // handle finished change payment gateway
    const {resetFinishedChangePaymentGateway} = finishedChangePaymentGatewaySlice.actions
    const {
        finishedChangePaymentGatewaySuccess, 
        finishedChangePaymentGatewayError, 
        loadingFinishedChangePaymentGateway,
    } = useSelector((state) => state.finishedChangePaymentGatewayState)

    useEffect(() => {
        if (finishedChangePaymentGatewaySuccess) {
            showToast('Payment gateway change finished successfully!', 'success');
            dispatch(resetFinishedChangePaymentGateway());
            setLoading({})
        }
    }, [finishedChangePaymentGatewaySuccess])

    useEffect(() => {
        if (finishedChangePaymentGatewayError) {
            showToast(finishedChangePaymentGatewayError, 'error');
            dispatch(resetFinishedChangePaymentGateway());
            setLoading({})
        }
    }, [finishedChangePaymentGatewayError])

    useEffect(() => {
        setLoading({ ...loading, [`finish_${startAndFinishId}`]: loadingFinishedChangePaymentGateway });
        setStartAndFinishId(null);
    }, [loadingFinishedChangePaymentGateway])

    const handleFinishedChangePaymentGatewayTenant = (id, tenantId) => {
        setStartAndFinishId(id);
        setConfirmModal({
        isOpen: true,
        title: 'Finish Payment Gateway Change',
        message: 'Are you sure you want to mark the payment gateway change as finished for this tenant?',
        type: 'success',
        onConfirm: () => {
            setConfirmModal({ isOpen: false });
            dispatch(finishedChangePaymentGatewayTenant({
                id: id,
                tenant_id: tenantId,
            }))
        }
        });
    };



    // handle deploy app testing
    const {resetDeployAppTesting} = deployAppTestingSlice.actions
    const {
        deployAppTestingSuccess,
        deployAppTestingError,
        loadingDeployAppTesting,
    } = useSelector((state) => state.deployAppTestingState)

    useEffect(() => {
        if (deployAppTestingSuccess) {
            showToast('Test application deployed successfully!', 'success');
            dispatch(resetDeployAppTesting());
            setLoading({})
        }
    }, [deployAppTestingSuccess])

    useEffect(() => {
        if (deployAppTestingError) {
            showToast(deployAppTestingError, 'error');
            dispatch(resetDeployAppTesting());
            setLoading({})
        }
    }, [deployAppTestingError])

    useEffect(() => {
        setLoading({ ...loading, deployTesting: loadingDeployAppTesting });
    }, [loadingDeployAppTesting])


    // handle submission change payment gateway failed
    const {resetChangePaymentGatewayFailed} = changePaymentGatewayFailedSlice.actions
    const {
        changePaymentGatewayFailedSuccess,
        changePaymentGatewayFailedError,
        loadingChangePaymentGatewayFailed,
    } = useSelector((state) => state.changePaymentGatewayFailedState)

    useEffect(() => {
        if (changePaymentGatewayFailedSuccess) {
            showToast(changePaymentGatewayFailedSuccess, 'success');
            dispatch(getTenantSubmissionChangePaymentGateway());
        }
    }, [changePaymentGatewayFailedSuccess])

    useEffect(() => {
        if (changePaymentGatewayFailedError) {
            showToast(changePaymentGatewayFailedError, 'error');
        }
    }, [changePaymentGatewayFailedError])

    useEffect(() => {
        setLoading({ ...loading, [`changePaymentGatewayFailed_${startAndFinishId}`]: loadingSendEmailUpdateChangePaymentGateway });
    }, [loadingChangePaymentGatewayFailed])

    const handleChangePaymentGatewayFailed = (id, email) => {
        setStartAndFinishId(id)
        dispatch(changePaymentGatewayFailed({
            id: id,
            email: email,
        }))
    }


    const dataToDisplay = storeData;


    // handle loading false 
    useEffect(() => {
        if (
            !loadingTenantSubmissionChangePayment 
            || !loadingAccessKey
            || !loadingAccessKeyStoreTesting
            || !loadingSendEmailUpdateChangePaymentGateway
            || !loadingStartChangePaymentGateway
            || !loadingFinishedChangePaymentGateway 
            || !loadingDeployAppTesting
            || !loadingChangePaymentGatewayFailed
        ) {
            setLoading({})
        }
    }, [
        loadingTenantSubmissionChangePayment,
        loadingAccessKeyStoreTesting,
        loadingAccessKey,
        loadingSendEmailUpdateChangePaymentGateway,
        loadingStartChangePaymentGateway,
        loadingFinishedChangePaymentGateway,
        loadingDeployAppTesting,
        loadingChangePaymentGatewayFailed,
    ])
    

    const handleDeployAppTesting = () => {
        setConfirmModal({
        isOpen: true,
        title: 'Deploy Test Application',
        message: 'Are you sure you want to deploy the testing application? This process may take a few minutes.',
        type: 'info',
        onConfirm: () => {
            setConfirmModal({ isOpen: false });
            dispatch(deployAppTesting());
        }
        });
    };

    const handleRefresh = () => {
        dispatch(getTenantSubmissionChangePaymentGateway());
    };

    const toggleRow = (id) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
        newExpanded.delete(id);
        } else {
        newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
    };

    const isCredentialsComplete = (item) => {
        return item.business_id && item.api_key && item.secret_key_webhook;
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
        PROCESS: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
        PAID: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle2 }
        };
        
        const config = statusConfig[status] || statusConfig.PROCESS;
        const Icon = config.icon;
        
        return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
            <Icon className="w-3 h-3" />
            {status}
        </span>
        );
    };
    
    return (
        <div className='flex'>
            {((isMobileDeviceType && isOpen) || !isMobileDeviceType) && (
                <div className='w-1/10 z-50 min-w-[290px]'>
                <Sidebar
                activeMenu={"Submission Change Credentials"}
                />
                </div>
            )}

            <div className='flex-1'>
                <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
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
                                            <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-800 truncate">Submission Change Credentials</h1>
                                            <p className='text-xs text-gray-400'>List of tenant submission change payment gateway</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={handleRefresh}
                                        disabled={loading.refresh}
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-50"
                                    >
                                        <RefreshCcw className={`w-4 h-4 mr-2 ${loading.refresh ? 'animate-spin' : ''}`} />
                                        {loading.refresh ? 'Refreshing...' : 'Refresh'}
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
                    <div className="max-w-7xl mx-auto" style={{marginTop: headerHeight}}>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                <p className="text-2xl font-bold text-gray-900">{dataToDisplay.length}</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-lg">
                                <CreditCard className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                <p className="text-sm font-medium text-gray-600">Complete Credentials</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {dataToDisplay.filter(isCredentialsComplete).length}
                                </p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-lg">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                <p className="text-sm font-medium text-gray-600">Pending Credentials</p>
                                <p className="text-2xl font-bold text-amber-600">
                                    {dataToDisplay.filter(item => !isCredentialsComplete(item)).length}
                                </p>
                                </div>
                                <div className="bg-amber-100 p-3 rounded-lg">
                                <AlertCircle className="w-6 h-6 text-amber-600" />
                                </div>
                            </div>
                            </div>
                            
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                <p className="text-sm font-medium text-gray-600">Total Stores</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {dataToDisplay.reduce((acc, item) => acc + item.tenant.stores.length, 0)}
                                </p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-lg">
                                <Store className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            </div>
                        </div>

                        {/* Main Table */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Data Perubahan Account Payment Gateway</h2>
                            <p className="text-gray-600 mt-1">Klik pada baris untuk melihat detail stores</p>
                            </div>

                            <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Info</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credentials Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    <th className="w-12"></th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {dataToDisplay.map((item) => (
                                    <React.Fragment key={item.id}>
                                    {/* Main Row */}
                                    <tr 
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                        onClick={() => toggleRow(item.id)}
                                    >
                                        <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="font-medium text-gray-900">{item.id}</div>
                                            <div className="flex items-center gap-2">
                                            {getStatusBadge(item.status)}
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(item.created_at)}
                                            </div>
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-900">{item.tenant.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Phone className="w-3 h-3" />
                                            {item.tenant.phone_number}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Store className="w-3 h-3" />
                                            {item.tenant.stores.length} Store(s)
                                            </div>
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            {isCredentialsComplete(item) ? (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span className="text-sm font-medium">Complete</span>
                                            </div>
                                            ) : (
                                            <div className="flex items-center gap-2 text-amber-600">
                                                <AlertCircle className="w-4 h-4" />
                                                <span className="text-sm font-medium">Incomplete</span>
                                            </div>
                                            )}
                                            <div className="text-xs text-gray-500">
                                            Business ID: {item.business_id ? '✓' : '✗'}<br />
                                            API Key: {item.api_key ? '✓' : '✗'}<br />
                                            Webhook Secret: {item.secret_key_webhook ? '✓' : '✗'}
                                            </div>
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-gray-400" />
                                            <span className="font-medium text-gray-900">{item.transaction.id}</span>
                                            </div>
                                            {getStatusBadge(item.transaction.status)}
                                            <div className="text-xs text-gray-500">
                                            Xendit: {item.transaction.xendit_transaction_id}
                                            </div>
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex gap-2">
                                            {!isCredentialsComplete(item) ? (
                                            <button 
                                                onClick={() => handleSendEmailRequiredCredentialPaymentGateway(item.tenant.email)}
                                                disabled={!!loading[`sendEmail_${item.tenant.email}`]}
                                                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                            >
                                                <Send className="w-3 h-3" />
                                                {!!loading[`sendEmail_${item.tenant.email}`] ? 'Sending...' : 'Send Email'}
                                            </button>
                                            ) : (
                                            <div className="flex gap-2">
                                                <button 
                                                onClick={() => handleStartChangePaymentGatewayTenant(item.id, item.tenant.id)}
                                                disabled={!!loading[`start_${item.id}`]}
                                                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                                >
                                                <Play className="w-3 h-3" />
                                                {!!loading[`start_${item.id}`] ? 'Starting...' : 'Start'}
                                                </button>
                                                <button 
                                                onClick={() => handleChangePaymentGatewayFailed(item.id, item.tenant.email)}
                                                disabled={!!loading[`changePaymentGatewayFailed_${item.id}`]}
                                                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                                >
                                                <BadgeAlert className="w-3 h-3" />
                                                {!!loading[`changePaymentGatewayFailed_${item.tenant.id}`] ? 'Sending...' : 'Credentials Failed'}
                                                </button>
                                                <button 
                                                onClick={() => handleFinishedChangePaymentGatewayTenant(item.id, item.tenant.id)}
                                                disabled={!!loading[`finish_${item.id}`]}
                                                className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                                >
                                                <Check className="w-3 h-3" />
                                                {!!loading[`finish_${item.id}`] ? 'Processing...' : 'Finished'}
                                                </button>
                                            </div>
                                            )}
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            {expandedRows.has(item.id) ? 
                                            <ChevronDown className="w-4 h-4" /> : 
                                            <ChevronRight className="w-4 h-4" />
                                            }
                                        </button>
                                        </td>
                                    </tr>
                                    
                                    {/* Expanded Stores Row */}
                                    {expandedRows.has(item.id) && (
                                        <tr>
                                        <td colSpan="6" className="px-6 py-4 bg-gray-50">
                                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                <Store className="w-5 h-5 text-gray-600" />
                                                Stores untuk {item.tenant.email}
                                            </h3>
                                            
                                            {item.tenant.stores.length > 0 ? (
                                                <div className="grid gap-3">
                                                {item.tenant.stores.map((store, index) => (
                                                    <div key={store.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-gray-900 text-white p-2 rounded-lg">
                                                            <Store className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                            <div className="font-medium text-gray-900">Store ID: {store.id}</div>
                                                            <div className="flex items-center gap-2 text-sm">
                                                                {store.expiration_access ? (
                                                                <span className="flex items-center gap-1 text-green-600">
                                                                    <CheckCircle2 className="w-3 h-3" />
                                                                    Access Valid
                                                                </span>
                                                                ) : (
                                                                <span className="flex items-center gap-1 text-red-600">
                                                                    <AlertCircle className="w-3 h-3" />
                                                                    Access Expired
                                                                </span>
                                                                )}
                                                            </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className='flex gap-2'>

                                                            <button 
                                                                onClick={() => handleCreateAccessKeyMaintananceTenant(store.id, item)}
                                                                disabled={!!loading[`createTesting_${item.tenant.id}`]}
                                                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
                                                            >
                                                                <Key className="w-4 h-4" />
                                                                {!!loading[`createTesting_${item.tenant.id}`] ? 'Creating...' : 'Create Testing Key'}
                                                            </button>

                                                            <button 
                                                                onClick={() => handleCreateAccessKeyStore(store.id, item)}
                                                                disabled={!!loading[`createAccess_${store.id}`]}
                                                                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                                                            >
                                                                <Key className="w-4 h-4" />
                                                                {!!loading[`createAccess_${store.id}`] ? 'Creating...' : 'Create Access Key'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 text-gray-500">
                                                <Store className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                                <p>Tidak ada store yang tersedia</p>
                                                </div>
                                            )}
                                            </div>
                                        </td>
                                        </tr>
                                    )}
                                    </React.Fragment>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        </div>

                        {/* Toast Notifications */}
                        <ToastPortal> 
                            <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]'>
                                {toast && (
                                    <Toast
                                        message={toast.message}
                                        type={toast.type}
                                        onClose={closeToast}
                                        duration={toast.type === 'success' ? 5000 : 0}
                                    />
                                )}
                            </div>
                        </ToastPortal>

                        {/* Confirmation Modal */}
                        <ConfirmationModal
                            isOpen={confirmModal.isOpen}
                            onClose={() => setConfirmModal({ isOpen: false })}
                            onConfirm={confirmModal.onConfirm}
                            title={confirmModal.title}
                            message={confirmModal.message}
                            type={confirmModal.type}
                        />

                        {/* Access Key Modal */}
                        <AccessKeyModal
                            isOpen={accessKeyModal.isOpen}
                            onClose={() => { 
                                setAccessKeyModal({ isOpen: false, data: null, accessKey: null })
                                setItemCreateAccessKey(null);
                                setStoreIdCreateAccessKey(null);
                                dispatch(resetAccessKeyStoreTesting())
                                dispatch(resetAccessKey())
                                dispatch(resetChangePaymentGatewayFailed())
                            }}
                            data={accessKeyModal.data}
                            accessKey={accessKeyModal.accessKey}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGatewayDashboard;