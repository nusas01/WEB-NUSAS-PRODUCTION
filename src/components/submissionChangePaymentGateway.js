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
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
    navbarSlice
} from '../reducers/reducers'
import { useElementHeight } from './helper';
import Sidebar from './sidebar';

const PaymentGatewayDashboard = () => {
    const dispatch = useDispatch()
    const [expandedRows, setExpandedRows] = useState(new Set());

    const { setIsOpen } = navbarSlice.actions
    const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)

    const { ref: headerRef, height: headerHeight } = useElementHeight();
  
    // Sample data berdasarkan struktur yang diberikan
    const sampleData = [
        {
        id: "req_001",
        status: "PROCESS",
        created_at: "2025-01-15T10:30:00Z",
        maintenance_time: "2025-01-20T02:00:00Z",
        business_id: "BIZ_12345",
        api_key: "ak_test_123456789",
        secret_key_webhook: "sk_webhook_987654321",
        tenant: {
            id: "tenant_001",
            email: "merchant@example.com",
            phone_number: "+628123456789",
            stores: [
            { id: "store_001", expiration_access: true },
            { id: "store_002", expiration_access: false }
            ]
        },
        transaction: {
            id: "txn_001",
            status: "PAID",
            xendit_transaction_id: "xendit_12345"
        }
        },
        {
        id: "req_002",
        status: "PROCESS",
        created_at: "2025-01-16T14:20:00Z",
        maintenance_time: "2025-01-21T03:00:00Z",
        business_id: "",
        api_key: "",
        secret_key_webhook: "",
        tenant: {
            id: "tenant_002",
            email: "shop@example.com",
            phone_number: "+628987654321",
            stores: [
            { id: "store_003", expiration_access: true }
            ]
        },
        transaction: {
            id: "txn_002",
            status: "PAID",
            xendit_transaction_id: "xendit_67890"
        }
        }
    ];

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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        });
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
                                            <p className='text-xs taxt-gray-400'>List of tenant submission change payment gateway</p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center space-x-4">
                                    <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors">
                                        <RefreshCcw className="w-4 h-4 mr-2" />
                                        Refresh
                                    </button>
                                    <button
                                        className="inline-flex items-center px-4 py-2 border border-gray-900 rounded-lg text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
                                    >
                                        Test Deploy
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

                    {/* Main Content */}
                    <div className="max-w-7xl mx-auto" style={{marginTop: headerHeight}}>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                            <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                                <p className="text-2xl font-bold text-gray-900">{sampleData.length}</p>
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
                                {sampleData.filter(isCredentialsComplete).length}
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
                                {sampleData.filter(item => !isCredentialsComplete(item)).length}
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
                                {sampleData.reduce((acc, item) => acc + item.tenant.stores.length, 0)}
                                </p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Store className="w-6 h-6 text-purple-600" />
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* Quick Actions Panel */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 my-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <ExternalLink className="w-5 h-5 text-gray-600" />
                            Quick Actions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-all">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Send className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-left">
                                <div className="font-medium text-gray-900">Bulk Send Email</div>
                                <div className="text-sm text-gray-600">Kirim email ke semua yang belum lengkap</div>
                            </div>
                            </button>
                        </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Data Perubahan Account Payment Gateway</h2>
                            <p className="text-gray-600 mt-1">Klik pada baris untuk melihat detail stores</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Request Info
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tenant Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Credentials Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Transaction
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                                <th className="w-12"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sampleData.map((item) => (
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
                                    
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                        {!isCredentialsComplete(item) ? (
                                            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                                            <Send className="w-3 h-3" />
                                            Send Email
                                            </button>
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                            <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                                                <Key className="w-4 h-4" />
                                                Create Testing Key
                                            </button>
                                            <button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                                                <Play className="w-3 h-3" />
                                                Start
                                            </button>
                                            <button className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                                                <Check className="w-3 h-3" />
                                                Finished
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
                                                    
                                                    <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                                    <Key className="w-4 h-4" />
                                                    Create Access Key
                                                    </button>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentGatewayDashboard;