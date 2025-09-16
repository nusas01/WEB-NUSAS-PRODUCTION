import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  CreditCard, 
  Search, 
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  Loader2,
  User,
  Store,
  Package,
  ExternalLink,
  TrendingUp,
  Activity,
  Eye,
  Settings,
  Menu, 
  Hourglass,
  RefreshCcw,
  X,
} from 'lucide-react';
import { navbarSlice } from '../reducers/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { 
    useElementHeight, 
    formatDate,
    formatCurrency,
} from './helper';
import Sidebar from './sidebar';
import {
    Toast, 
    ToastPortal,
} from './alert';
import {
    transactionPaidSlice,
    transactionPendingSlice,
    findTransactionSlice,
} from '../reducers/get'
import {
    fetchTransactionPaid,
    fetchTransactionPending,
    findTransaction,
} from '../actions/get'
import {
    checkPendingTransactionSlice
} from '../reducers/post'
import {
    checkPendingTransactionPaymentGateway,
} from '../actions/post'
import {
    loadMoreTransactionPaid
} from '../reducers/reducers'
import { 
    SuccessModal,
    LoadingSpinner,
    TableLoadingSkeleton,
} from './model';
import { type } from '@testing-library/user-event/dist/type';

const TransactionDashboard = () => {
    const dispatch = useDispatch()
    const { setIsOpen } = navbarSlice.actions
    const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)
    const [ error, setError ] = useState(null);

    const { ref: headerRef, height: headerHeight } = useElementHeight();

    // Sample data untuk PAID transactions
    const {resetErrorTransactionPaid,setCurrentPage} = transactionPaidSlice.actions
    const {
        dataTransactionPaid,
        errorTransactionPaid,
        totalRecordTransactionPaid,
        page,
        currentPage,
        loadingTransactionPaid,
        hasMore: hasMoreTransactionPaid, 
    } = useSelector((state) => state.persisted.transactionPaid)

    useEffect(() => {
        if (errorTransactionPaid) {
            setError({
                type: 'error',
                message: errorTransactionPaid,
            })
        }
    }, [errorTransactionPaid])

    const loadMoreTransactionPaidCallback = useCallback(() => {
        dispatch(loadMoreTransactionPaid())
    }, [dispatch])

    const handlePageTransactionPaidInc = (value) => {
        if (value > page && hasMoreTransactionPaid) {
            loadMoreTransactionPaidCallback()
            dispatch(setCurrentPage(value))
        } else {
            dispatch(setCurrentPage(value))
        }
    }

    const handlePageTransactionPaidDec = (value) => {
        dispatch(setCurrentPage(value))
    }


    // Sample data untuk PENDING transactions
    const {resetErrorTransactionPending} = transactionPendingSlice.actions
    const {
        dataTransactionPending,
        errorTransactionPending,
        loadingTransactionPending,
    } = useSelector((state) => state.persisted.transactionPending)

    useEffect(() => {
        if (errorTransactionPending) {
            setError({
                type: 'error',
                message: errorTransactionPending,
            })
        }
    }, [errorTransactionPending])


    // handle checkPendingTransactionPaymentGateway
    const [modelSuccessCheckTransaction, setModelSuccessCheckTransaction] = useState(false);
    const {resetCheckPendingTransaction} = checkPendingTransactionSlice.actions
    const {
        checkPendingTransactionSuccess,
        checkPendingTransactionError,
        loadingCheckPendingTransaction,
    } = useSelector((state) => state.checkPendingTransactionState)

    useEffect(() => {
        if (checkPendingTransactionSuccess) {
            setModelSuccessCheckTransaction(true);
        }
    }, [checkPendingTransactionSuccess])

    useEffect(() => {
        if (checkPendingTransactionError) {
            setError({
                type: 'error',
                message: checkPendingTransactionError,
            })
        }
    }, [checkPendingTransactionError])

    const handleCheckPayment = (transaction) => {
        dispatch(checkPendingTransactionPaymentGateway({
            transaction_id: transaction.id,
            tenant_id: transaction.tenant_id,
            store_id: transaction.store_tenant_id,
        }))
    }    

    const [activeTab, setActiveTab] = useState('pending');

    console.log("data status: ", activeTab) 
    console.log("pending transaction length: ", dataTransactionPending?.length)

    useEffect(() => {
        if (activeTab === 'pending' && dataTransactionPending.length === 0) {
            dispatch(fetchTransactionPending())
        }

        if (activeTab === 'paid' && dataTransactionPaid.length === 0) {
            dispatch(fetchTransactionPaid(1, false))
        }
    }, [activeTab])

    const handleRefresh = () => {
        if (activeTab === 'pending') {
            dispatch(fetchTransactionPending())
        }

        if (activeTab === 'paid') {
            dispatch(fetchTransactionPaid(1, false))
            dispatch(setCurrentPage(1))
        }
    }

    const getChannelColor = (channel) => {
        const colors = {
        'OVO': 'bg-purple-100 text-purple-800',
        'DANA': 'bg-blue-100 text-blue-800',
        'GOPAY': 'bg-green-100 text-green-800',
        'SHOPEEPAY': 'bg-orange-100 text-orange-800',
        'BCA': 'bg-blue-100 text-blue-800',
        'BNI': 'bg-yellow-100 text-yellow-800'
        };
        return colors[channel] || 'bg-gray-100 text-gray-800';
    };

    const totalPaidAmount = dataTransactionPaid?.reduce((sum, txn) => sum + txn.amount, 0);
    const totalPendingAmount = dataTransactionPending?.reduce((sum, txn) => sum + txn.amount, 0);


    // handle search query
    const [query, setQuery] = useState('')
    const {resetFindTransaction} = findTransactionSlice.actions
    const {
        dataFindTransaction, 
        errorFindTransaction,
        loadingFindTransaction,
    } = useSelector((state) => state.findTransactionState)

    console.log("message error: ", errorFindTransaction)
    useEffect(() => {
        if (errorFindTransaction) {
            setError({
                type: 'error',
                message: errorFindTransaction,
            })
        }
    }, [errorFindTransaction])

    useEffect(() => {
        if (query === '') {
            dispatch(resetFindTransaction())
        }
    }, [query])

    const handleSearchTransaction = (key) => {
        setQuery(key)
        dispatch(findTransaction(key))
    }

    console.log("data transaction pending", dataTransactionPending)
    return (
        <div className='flex'>
            <SuccessModal
                isOpen={modelSuccessCheckTransaction}
                onClose={() => setModelSuccessCheckTransaction(false)}
                transactionId={checkPendingTransactionSuccess?.transaction_id}
                status={checkPendingTransactionSuccess?.status}
            />

            {((isMobileDeviceType && isOpen) || !isMobileDeviceType) && (
                <div className='w-1/10 z-50 min-w-[290px]'>
                <Sidebar
                activeMenu={"Transactions"}
                />
                </div>
            )}

            <div className='flex-1'>
                <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
                    {error && (
                        <ToastPortal> 
                            <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]'>
                            <Toast 
                            message={error.message} 
                            type={error.type} 
                            onClose={() => { 
                                setError(null)
                                dispatch(resetErrorTransactionPaid())
                                dispatch(resetErrorTransactionPending())
                                dispatch(resetCheckPendingTransaction())
                                dispatch(resetFindTransaction())
                            }} 
                            duration={10000}
                            />
                            </div>
                        </ToastPortal>
                    )}

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
                                            <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-800 truncate">Transactions</h1>
                                            <p className='text-xs taxt-gray-400'>List of transactions tenant</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-4">
                                    <button
                                    onClick={() => handleRefresh()}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors">
                                        <RefreshCcw className="w-4 h-4 mr-2" />
                                        Refresh
                                    </button>
                                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
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

                    <div className="max-w-7xl mx-auto" style={{marginTop: headerHeight}}>
                        <div>
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                                <p className="text-xl font-bold">Development</p>
                                </div>
                                <CheckCircle className="w-8 h-8 text-green-200" />
                            </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                <p className="text-sm font-medium text-gray-600">Total Pending</p>
                                <p className="text-xl font-bold">{formatCurrency(totalPendingAmount || 0)}</p>
                                </div>
                                <Clock className="w-8 h-8 text-yellow-200" />
                            </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                <p className="text-sm font-medium text-gray-600">Paid Count</p>
                                <p className="text-2xl font-bold">{totalRecordTransactionPaid}</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-blue-200" />
                            </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                <p className="text-sm font-medium text-gray-600">Pending Count</p>
                                <p className="text-2xl font-bold">{dataTransactionPending?.length || 0}</p>
                                </div>
                                <Activity className="w-8 h-8 text-purple-200" />
                            </div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative mb-6 w-full">
                            {/* Ikon Search di kiri */}
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                            {/* Input */}
                            <input
                                type="text"
                                placeholder="Search by transaction ID, Xendit ID, Tenant ID, or Store ID..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => {
                                if (e.key === "Enter" && query.trim() !== "") {
                                    handleSearchTransaction(query)
                                }
                                }}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg
                                        focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                        bg-white shadow-sm"
                            />

                            {/* Ikon X di kanan input */}
                            {query && (
                                <button
                                type="button"
                                onClick={() => {
                                    setQuery("")
                                    dispatch(resetFindTransaction())
                                }}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        </div>

                        {/* Tabs */}
                        <div className="mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('pending')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                ( dataFindTransaction ? dataFindTransaction?.status === 'pending' : activeTab === 'pending' )
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Pending Transactions ({dataTransactionPending?.length || 0})
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab('paid')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                ( dataFindTransaction ? dataFindTransaction?.status === 'paid' : activeTab === 'paid')
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Paid Transactions ({totalRecordTransactionPaid})
                                </div>
                            </button>
                            </nav>
                        </div>
                        </div>

                        {/* hasil search transaction */}
                        {loadingFindTransaction ? (
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-900 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Transaction Details</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Amount & Fees</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Product & Channel</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Tenant Info</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {loadingFindTransaction ? (
                                            <tr>
                                            <td colSpan="5" className="p-0">
                                                <TableLoadingSkeleton />
                                            </td>
                                            </tr>
                                        ) : (
                                            <></>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : dataFindTransaction ? (
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-900 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Transaction Details</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Amount & Fees</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Product & Channel</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Tenant Info</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {dataFindTransaction.map((transaction) => (
                                                <tr key={transaction.id} className={`hover:bg-gray-50 transition-colors bg-white bg-gray-25`}>
                                                    <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                        <CreditCard className="w-4 h-4 text-gray-600" />
                                                        <span className="font-medium text-gray-900">{transaction.id}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {transaction.status}
                                                        </span>
                                                        </div>
                                                        <div className="flex items-center text-xs text-gray-500">
                                                        <Calendar className="w-3 h-3 mr-1" />
                                                        {formatDate(transaction.created_at)}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                        Xendit: {transaction.xendit_transaction_id}
                                                        </div>
                                                    </div>
                                                    </td>
                                                    
                                                    <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center text-lg font-bold text-gray-900">
                                                        <DollarSign className="w-4 h-4 mr-1" />
                                                        {formatCurrency(transaction.amount)}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                        Tax: {formatCurrency(transaction.tax)}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                        Fee: {formatCurrency(transaction.fee_transaction)}
                                                        </div>
                                                        <div className="text-sm font-medium text-gray-900 border-t pt-1">
                                                        Total: {formatCurrency(transaction.amount + transaction.tax + transaction.fee_transaction)}
                                                        </div>
                                                    </div>
                                                    </td>
                                                    
                                                    <td className="px-6 py-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2">
                                                        <Package className="w-4 h-4 text-gray-600" />
                                                        <span className="text-sm font-medium text-gray-900">{transaction.product}</span>
                                                        </div>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getChannelColor(transaction.channel_code)}`}>
                                                        {transaction.channel_code}
                                                        </span>
                                                    </div>
                                                    </td>
                                                    
                                                    <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center text-sm text-gray-900">
                                                        <User className="w-4 h-4 mr-2" />
                                                        {transaction.tenant_id}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                        <Store className="w-3 h-3 mr-1" />
                                                        {transaction.store_tenant_id}
                                                        </div>
                                                    </div>
                                                    </td>
                                                    
                                                    <td className="px-6 py-4">
                                                    { transaction.status === 'PENDING' ? (
                                                        <div className="flex gap-2">
                                                            <button 
                                                            disabled={loadingCheckPendingTransaction}
                                                            onClick={() => handleCheckPayment(transaction)}
                                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
                                                            >
                                                            {loadingCheckPendingTransaction ? <LoadingSpinner /> : <RefreshCw className="w-4 h-4 mr-2" />}
                                                            {loadingCheckPendingTransaction ? 'Checking...' : 'Check Payment'}
                                                            </button>
                                                            <button 
                                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                                            >
                                                            <Eye className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            <CheckCircle className="w-3 h-3 mr-1" />
                                                            {transaction.status}
                                                        </span>
                                                    )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                            </div>
                        ) : (<></>)}

                        {/* Pending Transactions Table with Loading */}
                        {(activeTab === 'pending' && !dataFindTransaction) && (
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-yellow-500" />
                                Pending Transactions
                                {loadingTransactionPending && (
                                <LoadingSpinner />
                                )}
                            </h2>
                            </div>
                            
                            <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Transaction Details</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Amount & Fees</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Product & Channel</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Tenant Info</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {loadingTransactionPending ? (
                                    <tr>
                                    <td colSpan="5" className="p-0">
                                        <TableLoadingSkeleton />
                                    </td>
                                    </tr>
                                ) : (
                                    dataTransactionPending?.map((transaction, index) => (
                                    <tr key={transaction.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                        <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-gray-600" />
                                            <span className="font-medium text-gray-900">{transaction.id}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {transaction.status}
                                            </span>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {formatDate(transaction.created_at)}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                            Xendit: {transaction.xendit_transaction_id}
                                            </div>
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center text-lg font-bold text-gray-900">
                                            <DollarSign className="w-4 h-4 mr-1" />
                                            {formatCurrency(transaction.amount)}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                            Tax: {formatCurrency(transaction.tax)}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                            Fee: {formatCurrency(transaction.fee_transaction)}
                                            </div>
                                            <div className="text-sm font-medium text-gray-900 border-t pt-1">
                                            Total: {formatCurrency(transaction.amount + transaction.tax + transaction.fee_transaction)}
                                            </div>
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                            <Package className="w-4 h-4 text-gray-600" />
                                            <span className="text-sm font-medium text-gray-900">{transaction.product}</span>
                                            </div>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getChannelColor(transaction.channel_code)}`}>
                                            {transaction.channel_code}
                                            </span>
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm text-gray-900">
                                            <User className="w-4 h-4 mr-2" />
                                            {transaction.tenant_id}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                            <Store className="w-3 h-3 mr-1" />
                                            {transaction.store_tenant_id}
                                            </div>
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button 
                                            disabled={loadingCheckPendingTransaction}
                                            onClick={() => handleCheckPayment(transaction)}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
                                            >
                                            {loadingCheckPendingTransaction ? <LoadingSpinner /> : <RefreshCw className="w-4 h-4 mr-2" />}
                                            {loadingCheckPendingTransaction ? 'Checking...' : 'Check Payment'}
                                            </button>
                                            <button 
                                            onClick={() => alert(`Viewing details for ${transaction.id}`)}
                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                            disabled={loadingTransactionPending}
                                            >
                                            <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                        </td>
                                    </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                            </div>

                            {!loadingTransactionPending && dataTransactionPending?.length === 0 && (
                            <div className="text-center py-8">
                                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No pending transactions found</p>
                            </div>
                            )}
                        </div>
                        )}


                        {/* Paid Transactions Table with Loading */}
                        {(activeTab === 'paid' && !dataFindTransaction) && (
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                Paid Transactions
                                {loadingTransactionPaid && (
                                <LoadingSpinner />
                                )}
                            </h2>
                            </div>
                            
                            <div className="overflow-x-auto overflow-y-auto">
                            <table className="w-full">
                                <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Transaction Details</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Channel</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Tenant Info</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Xendit ID</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {(loadingTransactionPaid) ? (
                                    <tr>
                                    <td colSpan="6" className="p-0">
                                        <TableLoadingSkeleton />
                                    </td>
                                    </tr>
                                ) : (
                                    dataTransactionPaid[currentPage-1]?.map((transaction, index) => (
                                    <tr key={transaction.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                                        <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-gray-600" />
                                            <span className="font-medium text-gray-900">{transaction.id}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                {transaction.status}
                                            </span>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {formatDate(transaction.created_at)}
                                            </div>
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <div className="flex items-center text-lg font-bold text-green-600">
                                            <DollarSign className="w-4 h-4 mr-1" />
                                            {formatCurrency(transaction.amount)}
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getChannelColor(transaction.channel_code)}`}>
                                            {transaction.channel_code}
                                        </span>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm text-gray-900">
                                            <User className="w-4 h-4 mr-2" />
                                            {transaction.tenant_id}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                            <Store className="w-3 h-3 mr-1" />
                                            {transaction.store_tenant_id}
                                            </div>
                                        </div>
                                        </td>
                                        
                                        <td className="px-6 py-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                            {transaction.xendit_transaction_id}
                                            </span>
                                            <button 
                                            onClick={() => alert(`Opening Xendit transaction: ${transaction.xendit_transaction_id}`)}
                                            className="text-gray-500 hover:text-gray-700 transition-colors"
                                            disabled={loadingTransactionPaid}
                                            >
                                            <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                        </td>
                                    </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                            </div>

                            {!loadingTransactionPaid && dataTransactionPaid?.length === 0 && (
                            <div className="text-center py-8">
                                <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No paid transactions found</p>
                            </div>
                            )}
                        </div>
                        )}

                        {/* Pagination */}
                        { (activeTab === 'paid' && !dataFindTransaction) && (
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-700">
                                    Showing  {dataTransactionPaid[currentPage - 1]?.length} results
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                    onClick={() => handlePageTransactionPaidDec(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                    Previous
                                    </button>
                                    <span className="px-3 py-2 text-sm font-medium text-gray-900">
                                    Page {currentPage}
                                    </span>
                                    <button 
                                    disabled={(!hasMoreTransactionPaid && currentPage >= dataTransactionPaid.length) || loadingTransactionPaid}
                                    onClick={() => handlePageTransactionPaidInc(currentPage + 1)}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                    Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Summary Footer */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Revenue Summary</h3>
                            <TrendingUp className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-300">Paid Revenue:</span>
                                <span className="font-bold text-green-400">Development</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-300">Pending Revenue:</span>
                                <span className="font-bold text-yellow-400">Development</span>
                            </div>
                            <div className="border-t border-gray-700 pt-2 flex justify-between">
                                <span className="text-white font-medium">Total:</span>
                                <span className="font-bold text-xl text-white">Development</span>
                            </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                            <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Transaction Stats</h3>
                            <Activity className="w-6 h-6 text-indigo-200" />
                            </div>
                            <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-indigo-100">Success Rate:</span>
                                <span className="font-bold text-white">
                                {/* {(dataTransactionPaid?.length / (dataTransactionPaid?.length + dataTransactionPending?.length) * 100 || 0).toFixed(1)}% */}
                                Development
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-indigo-100">Avg. Amount:</span>
                                <span className="font-bold text-white">
                                {/* {formatCurrency((totalPaidAmount + totalPendingAmount) / (dataTransactionPending?.length + dataTransactionPending?.length) || 0)} */}
                                Development
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-indigo-100">Today's Transactions:</span>
                                <span className="font-bold text-white">Development</span>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default TransactionDashboard;