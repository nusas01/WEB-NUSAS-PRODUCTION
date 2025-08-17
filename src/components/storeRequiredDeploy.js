import React, { useState } from 'react';
import { 
  Mail, 
  Rocket, 
  CheckCircle, 
  Key, 
  Search,
  Filter,
  MoreHorizontal,
  Globe,
  User,
  Calendar,
  Settings,
  Play,
  TestTube
} from 'lucide-react';
import {
    Toast,
    ToastPortal
} from './alert';
import Sidebar from './sidebar';

const StoreDeploymentDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const {toast, setToast} = useState(null)

    const { setIsOpen } = navbarSlice.actions
    const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)

    const { ref: headerRef, height: headerHeight } = useElementHeight();

    // Mock data based on your structure
    const storeData = [
        {
        id: "1",
        tenant_id: "tenant-1",
        store_id: "store-1",
        subdomain: "mystore",
        full_domain: "mystore.nusas.id",
        created_at: "2024-01-15T10:30:00Z",
        tenant: {
            id: "tenant-1",
            email: "john@example.com",
            phone_number: "+62812345678",
            bussnes_id: "",
            api_key: "",
            secret_key_webhook: ""
        }
        },
        {
        id: "2",
        tenant_id: "tenant-2",
        store_id: "store-2",
        subdomain: "techshop",
        full_domain: "techshop.nusas.id",
        created_at: "2024-01-16T14:20:00Z",
        tenant: {
            id: "tenant-2",
            email: "jane@example.com",
            phone_number: "+62887654321",
            bussnes_id: "BUS123456",
            api_key: "xnd_test_123456789",
            secret_key_webhook: "whsec_abcdef123456"
        }
        },
        {
        id: "3",
        tenant_id: "tenant-3",
        store_id: "store-3",
        subdomain: "fashion",
        full_domain: "fashion.nusas.id",
        created_at: "2024-01-17T09:15:00Z",
        tenant: {
            id: "tenant-3",
            email: "mike@example.com",
            phone_number: "+62876543210",
            bussnes_id: "BUS789012",
            api_key: "",
            secret_key_webhook: ""
        }
        }
    ];

    const handleSendEmail = (storeId, email) => {
        console.log(`Sending payment gateway credentials email to ${email} for store ${storeId}`);
    };

    const handleCreateAccessKey = (storeId) => {
        console.log(`Creating access key for store ${storeId}`);
    };

    const handleDeployApp = (storeId) => {
        console.log(`Deploying app for store ${storeId}`);
    };

    const handleDeployFinished = (storeId) => {
        console.log(`Marking deployment as finished for store ${storeId}`);
    };

    const handleTestDeploy = () => {
        console.log('Initiating test deployment');
    };

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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        });
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
                activeMenu={"Payment Required"}
                />
                </div>
            )}

            <div className='flex-1'>
                {toast && (
                    <ToastPortal> 
                        <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-100'>
                        <Toast 
                        message={toast.message} 
                        type={toast.type} 
                        onClose={() => { 
                            setToast(null)
                            dispatch(resetErrorRequiredPayment())
                        }} 
                        duration={3000}
                        />
                        </div>
                    </ToastPortal>
                )}
                <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
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
                                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                                        <div className="w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-900 rounded-md flex items-center justify-center shadow-lg flex-shrink-0">
                                            <Hourglass className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-800 truncate">Payment Required</h1>
                                            <p className='text-xs taxt-gray-400'>List of transactions awaiting payment</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={handleTestDeploy}
                                            className="inline-flex items-center px-4 py-2 border border-gray-900 rounded-lg text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
                                        >
                                            <TestTube className="w-4 h-4 mr-2" />
                                            Test Deploy
                                        </button>
                                        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>  

                        {/* Main Content */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                                                onClick={() => handleSendEmail(store.store_id, store.tenant.email)}
                                                className="inline-flex items-center px-3 py-1.5 border border-red-300 rounded-md text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                title="Send Payment Gateway Credentials Email"
                                            >
                                                <Mail className="w-3 h-3 mr-1" />
                                                Email
                                            </button>
                                            )}
                                            
                                            {/* Create Access Key - always shows */}
                                            <button
                                            onClick={() => handleCreateAccessKey(store.store_id)}
                                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                                            title="Create Access Key"
                                            >
                                            <Key className="w-3 h-3 mr-1" />
                                            Access Key
                                            </button>
                                            
                                            {/* Deploy App Button - shows when credentials are filled */}
                                            {isCredentialsFilled(store.tenant) && (
                                            <button
                                                onClick={() => handleDeployApp(store.store_id)}
                                                className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-md text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                                title="Deploy Application"
                                            >
                                                <Rocket className="w-3 h-3 mr-1" />
                                                Deploy
                                            </button>
                                            )}
                                            
                                            {/* Deploy Finished Button - shows when credentials are filled */}
                                            {isCredentialsFilled(store.tenant) && (
                                            <button
                                                onClick={() => handleDeployFinished(store.store_id)}
                                                className="inline-flex items-center px-3 py-1.5 border border-green-300 rounded-md text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                                title="Mark as Finished"
                                            >
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                Finished
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
                                <div className="text-center py-12">
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