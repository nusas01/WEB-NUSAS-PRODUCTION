import React, { useEffect, useState } from 'react';
import { 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  PowerOff,
  Search,
  Filter,
  Menu,
  RefreshCcw,
  ChevronDown
} from 'lucide-react';
import {
    navbarSlice
} from '../reducers/reducers'
import Sidebar from './sidebar';
import { useElementHeight } from './helper';
import { useDispatch, useSelector } from 'react-redux';
import { storesExpiredSlice } from '../reducers/get'
import { fetchStoresExpired } from '../actions/get'
import { 
    nonActiveWebStoreSlice,
    warningDeletedWebStoreSlice,
} from '../reducers/post'
import {
    nonActiveWebStore,
    warningDeletedWebStore,
} from '../actions/post'
import { Toast, ToastPortal } from './alert';

export default function ExpiredStoresDashboard() {
    const [toast, setToast] = useState()
    const dispatch = useDispatch()
    const { setIsOpen } = navbarSlice.actions
    const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)
    const { ref: headerRef, height: headerHeight } = useElementHeight();

    const {resetErrorStoresExpired} = storesExpiredSlice.actions
    const {
        dataStoresExpired:stores,
        errorStoresExpired,
        loadingStoresExpired,
    } = useSelector((state) => state.persisted.storesExpired) 

    useEffect(() => {
        if (!stores || stores.length === 0) {
            dispatch(fetchStoresExpired())
        }
    }, [])

    useEffect(() => {
        if (errorStoresExpired) {
            setToast({
                type: "error",
                message: errorStoresExpired,
            })
        }
    }, [errorStoresExpired])

    const {resetNonActiveWebStore} = nonActiveWebStoreSlice.actions 
    const {
        nonActiveWebStoreSuccess,
        nonActiveWebStoreError,
        loadingNonActiveWebStore,
    } = useSelector((state) => state.nonActiveWebStoreState)

    useEffect(() => {
        if (nonActiveWebStoreSuccess) {
            setToast({
                type: "success",
                message: nonActiveWebStoreSuccess,
            })
            // Refresh data setelah berhasil
            dispatch(fetchStoresExpired())
        }
    }, [nonActiveWebStoreSuccess])

    useEffect(() => {
        if (nonActiveWebStoreError) {
            setToast({
                type: "error",
                message: nonActiveWebStoreError,
            })
        }
    }, [nonActiveWebStoreError])

    const { resetWarningDeletedWebStore } = warningDeletedWebStoreSlice.actions
    const {
        warningDeletedWebStoreSuccess,
        warningDeletedWebStoreError,
        loadingWarningDeletedWebStore,
    } = useSelector((state) => state.warningDeletedWebStoreState)

    useEffect(() => {
        if (warningDeletedWebStoreSuccess) {
            setToast({
                type: "success",
                message: warningDeletedWebStoreSuccess,
            })
        }
    }, [warningDeletedWebStoreSuccess])

    useEffect(() => {
        if (warningDeletedWebStoreError) {
            setToast({
                type: "error",
                message: warningDeletedWebStoreError,
            })
        }
    }, [warningDeletedWebStoreError])

    const [searchTerm, setSearchTerm] = useState('');
    const [actionLoading, setActionLoading] = useState({});

    const handleSendWarning = (storeId, name_store, email, exp) => {
        setActionLoading(prev => ({ ...prev, [`warning-${storeId}`]: true }));
        dispatch(warningDeletedWebStore({
            store_id: storeId,
            name_store: name_store,
            email: email,
            exp_date: exp,
        }))     
    };

    const handleDeactivate = (storeId, storeName, email) => {
        setActionLoading(prev => ({ ...prev, [`deactivate-${storeId}`]: true }));
        dispatch(nonActiveWebStore({
            store_id: storeId, 
            name_store: storeName, 
            email: email,
        }))
    };

    const handleRefresh = () => {
        dispatch(fetchStoresExpired())
    };

    useEffect(() => {
        if (!loadingWarningDeletedWebStore && !loadingNonActiveWebStore) {
            setActionLoading({});
        }
    }, [loadingWarningDeletedWebStore, loadingNonActiveWebStore]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        });
    };

    const getDaysExpired = (expirationDate) => {
        const exp = new Date(expirationDate);
        const now = new Date();
        const diffTime = now - exp;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredStores = (stores || []).filter(store => 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Loading Skeleton Component
    const StoreCardSkeleton = () => (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 animate-pulse">
            <div className="flex items-start gap-4 mb-4">
                <div className="bg-gray-200 p-3 rounded-lg w-12 h-12"></div>
                <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
                <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );

    return (
        <div className='flex'>
            {((isMobileDeviceType && isOpen) || !isMobileDeviceType) && (
                <div className='w-1/10 z-50 min-w-[290px]'>
                <Sidebar
                activeMenu={"Store Expired"}
                />
                </div>
            )}

            <div className='flex-1'>
                <div className="min-h-screen bg-gray-50 p-6">
                    {toast && (
                        <ToastPortal> 
                            <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999]'>
                            <Toast 
                            message={toast.message} 
                            type={toast.type} 
                            onClose={() => { 
                                setToast(null)
                                dispatch(resetNonActiveWebStore())
                                dispatch(resetWarningDeletedWebStore())
                                dispatch(resetErrorStoresExpired())
                            }} 
                            duration={10000}
                            />
                            </div>
                        </ToastPortal>
                    )}
                    <div className="max-w-7xl mx-auto">
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
                                                    <AlertTriangle className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-800 truncate">Store Expired</h1>
                                                    <p className='text-xs text-gray-400'>Kelola store yang telah melewati masa aktif langganan</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center space-x-4">
                                            <button
                                            onClick={handleRefresh}
                                            disabled={loadingStoresExpired}
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                <RefreshCcw className={`w-4 h-4 mr-2 ${loadingStoresExpired ? 'animate-spin' : ''}`} />
                                                {loadingStoresExpired ? 'Memuat...' : 'Refresh'}
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

                            {/* Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" style={{marginTop: headerHeight}}>
                                <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                                    <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Total Expired</p>
                                        {loadingStoresExpired ? (
                                            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                        ) : (
                                            <p className="text-2xl font-bold text-gray-900">{stores?.length || 0}</p>
                                        )}
                                    </div>
                                    <div className="bg-red-100 p-3 rounded-lg">
                                        <Store className="text-red-600" size={24} />
                                    </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                                    <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Perlu Tindakan</p>
                                        {loadingStoresExpired ? (
                                            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                        ) : (
                                            <p className="text-2xl font-bold text-gray-900">{stores?.length || 0}</p>
                                        )}
                                    </div>
                                    <div className="bg-orange-100 p-3 rounded-lg">
                                        <AlertTriangle className="text-orange-600" size={24} />
                                    </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                                    <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Peringatan Terkirim</p>
                                        {loadingStoresExpired ? (
                                            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                                        ) : (
                                            <p className="text-2xl font-bold text-gray-900">0</p>
                                        )}
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <Mail className="text-blue-600" size={24} />
                                    </div>
                                    </div>
                                </div>
                            </div>

                            {/* Search & Filter */}
                            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Cari store, kota, atau email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    disabled={loadingStoresExpired}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                                </div>
                                <button 
                                disabled={loadingStoresExpired}
                                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                <Filter size={20} />
                                <span>Filter</span>
                                <ChevronDown size={16} />
                                </button>
                            </div>
                            </div>

                            {/* Stores List */}
                            <div className="space-y-4">
                            {loadingStoresExpired ? (
                                // Loading Skeletons
                                <>
                                    <StoreCardSkeleton />
                                    <StoreCardSkeleton />
                                    <StoreCardSkeleton />
                                </>
                            ) : filteredStores.length === 0 ? (
                                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                                <Store className="mx-auto text-gray-400 mb-4" size={48} />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada store ditemukan</h3>
                                <p className="text-gray-600">
                                    {searchTerm ? 'Coba ubah kata kunci pencarian Anda' : 'Tidak ada store yang expired saat ini'}
                                </p>
                                </div>
                            ) : (
                                filteredStores.map((store) => {
                                const daysExpired = getDaysExpired(store.expiration_access);
                                const isWarningLoading = actionLoading[`warning-${store.id}`] || loadingWarningDeletedWebStore;
                                const isDeactivateLoading = actionLoading[`deactivate-${store.id}`] || loadingNonActiveWebStore;
                                
                                return (
                                    <div key={store.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-gray-900 p-3 rounded-lg">
                                            <Store className="text-white" size={24} />
                                            </div>
                                            <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                {store.name}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                                {store.id}
                                                </span>
                                                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                                                <AlertTriangle size={12} />
                                                Expired {daysExpired} hari yang lalu
                                                </span>
                                            </div>
                                            </div>
                                        </div>
                                        </div>

                                        {/* Content Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        {/* Store Info */}
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Informasi Store</h4>
                                            <div className="flex items-start gap-3">
                                            <MapPin className="text-gray-400 mt-0.5" size={18} />
                                            <div>
                                                <p className="text-sm text-gray-900">{store.address}</p>
                                                <p className="text-sm text-gray-600">{store.city}, {store.postal_code}</p>
                                            </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                            <Calendar className="text-gray-400" size={18} />
                                            <div>
                                                <p className="text-xs text-gray-500">Expired pada</p>
                                                <p className="text-sm font-medium text-gray-900">
                                                {formatDate(store.expiration_access)}
                                                </p>
                                            </div>
                                            </div>
                                        </div>

                                        {/* Tenant Info */}
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Informasi Tenant</h4>
                                            <div className="flex items-center gap-3">
                                            <Mail className="text-gray-400" size={18} />
                                            <div>
                                                <p className="text-xs text-gray-500">Email</p>
                                                <p className="text-sm text-gray-900">{store.tenant.email}</p>
                                            </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                            <Phone className="text-gray-400" size={18} />
                                            <div>
                                                <p className="text-xs text-gray-500">Telepon</p>
                                                <p className="text-sm text-gray-900">{store.tenant.phone_number}</p>
                                            </div>
                                            </div>
                                        </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => handleSendWarning(store.id, store.name, store.tenant.email, store.expiration_access)}
                                            disabled={isWarningLoading || isDeactivateLoading}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                        >
                                            {isWarningLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                <span>Mengirim...</span>
                                            </>
                                            ) : (
                                            <>
                                                <Mail size={18} />
                                                <span>Kirim Peringatan</span>
                                            </>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleDeactivate(store.id, store.name, store.tenant.email)}
                                            disabled={isDeactivateLoading || isWarningLoading}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                        >
                                            {isDeactivateLoading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                <span>Menonaktifkan...</span>
                                            </>
                                            ) : (
                                            <>
                                                <PowerOff size={18} />
                                                <span>Nonaktifkan</span>
                                            </>
                                            )}
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            );
                            })
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}