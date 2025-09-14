import React, { useCallback, useEffect, useState, useRef } from 'react';
import { ChevronDown, ChevronRight, Users, RefreshCcw, Menu, Store, Phone, Mail, MapPin, Calendar, Key, Building, Loader2 } from 'lucide-react';
import {
    Toast,
    ToastPortal,
} from './alert';
import Sidebar from './sidebar';
import {
    navbarSlice
} from '../reducers/reducers'
import { useDispatch, useSelector } from 'react-redux';
import { 
    useElementHeight,
} from './helper';
import {
    AccessKeyModal
} from './model'
import {
    loadMoreTenants,
} from '../reducers/reducers'
import {
    fetchTenants,
    fetchTenantStores,
    createAccessKeyStore,
} from '../actions/get'
import {
    tenantsSlice,
    tenantStoresSlice,
    accessKeySlice,
} from '../reducers/get'

const TenantManagement = () => {
    const dispatch = useDispatch()
    const [expandedTenants, setExpandedTenants] = useState(new Set());
    const [toast, setToast] = useState(null)
    const [loadingSpesifik, setLoadingSpesifik] = useState(null)
    const [loadingTenantStoresIds, setLoadingTenantStoresIds] = useState(new Set());

    // Refs for intersection observer
    const tenantsObserverRef = useRef(null);

    const { setIsOpen } = navbarSlice.actions
    const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)

    const { ref: headerRef, height: headerHeight } = useElementHeight();
    

    // data tenants
    const {resetErrortenants} = tenantsSlice.actions
    const {
        dataTenants: tenantsData,
        errorTenants,
        loadingTenants,
        hasMore: hasMoreTenants,
    } = useSelector((state) => state.persisted.tenants)

    console.log("data tenants: ", tenantsData)

    useEffect(() => {
        if (tenantsData.length === 0) {
            dispatch(fetchTenants(1, false))
        }
    }, [])

    useEffect(() => {
        if (errorTenants) {
            setToast({
                type: "error",
                message: errorTenants
            })
        }
    }, [errorTenants])

    const loadMoreTenantsCallback = useCallback(() => {
        dispatch(loadMoreTenants())
    }, [dispatch])

    // Intersection observer for tenants load more
    useEffect(() => {
        if (loadingTenants || !hasMoreTenants) return;

        const node = tenantsObserverRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log("Tenants entry.isIntersecting:", entry.isIntersecting);
                if (entry.isIntersecting) {
                    loadMoreTenantsCallback();
                }
            },
            {
                root: null,
                rootMargin: '10px',
                threshold: 0.5,
            }
        );

        observer.observe(node);

        return () => {
            observer.disconnect();
        };
    }, [loadMoreTenantsCallback, loadingTenants, hasMoreTenants]);

    // data tenant stores
    const {resetErrorTenantStores} = tenantStoresSlice.actions
    const { 
        dataTenantStores: storesData,
        errorTenantStores,
        loadingTenantStores,
    } = useSelector((state) => state.persisted.tenantStores)

    const toggleTenant = (tenantId) => {
        const newExpanded = new Set();
        
        if (expandedTenants.has(tenantId)) {
            setExpandedTenants(newExpanded);
        } else {
            newExpanded.add(tenantId);
            setExpandedTenants(newExpanded);
            
            if (!storesData[tenantId] || storesData[tenantId].length === 0) {
                setLoadingTenantStoresIds(prev => new Set(prev).add(tenantId));
                dispatch(fetchTenantStores(tenantId));
            }
        }
    };


    useEffect(() => {
        if (!loadingTenantStores) {
            setLoadingTenantStoresIds(new Set());
        }
    }, [loadingTenantStores]);

    useEffect(() => {
        if (errorTenantStores) {
            setToast({
                type: "error",
                message: errorTenantStores
            })
        }
    }, [errorTenantStores])


    // handle create access key
    const [dataStoreCreateAccessKey, setDataStoreCreateAccessKey] = useState(null)
    const {resetAccessKey} = accessKeySlice.actions
    const {accessKeyData, accessKeyError, loadingAccessKey} = useSelector((state) => state.accessKeyState)

    useEffect(() => {
        if (accessKeyError) {
            setToast({
                type: 'error',
                message: 'Gagal membuat access key store, silahkan coba lagi nanti',
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

    const isExpiringSoon = (expirationDate) => {
        const expDate = new Date(expirationDate);
        const today = new Date();
        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    };

    return (
        <div className='flex'>
            {((isMobileDeviceType && isOpen) || !isMobileDeviceType) && (
                <div className='w-1/10 z-50 min-w-[290px]'>
                <Sidebar
                activeMenu={"Tenants"}
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
                                dispatch(resetErrorTenantStores())
                                dispatch(resetErrortenants())
                            }} 
                            duration={10000}
                            />
                            </div>
                        </ToastPortal>
                    )}

                     { accessKeyData && (
                        <AccessKeyModal 
                        isOpen={accessKeyData} 
                        onClose={() => {
                            dispatch(resetAccessKey())
                            setDataStoreCreateAccessKey(null)
                        }}
                        accessKey={accessKeyData?.secret_access_key}
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
                                                <Users className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-gray-800 truncate">Tenant Management</h1>
                                                <p className='text-xs taxt-gray-400'>Manage tenants and their associated stores</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-4">
                                        <button
                                        onClick={() => dispatch(fetchTenants())}
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

                        {/* Tenant List */}
                        <div className="flex justify-center space-y-4 bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 p-6 min-h-[80vh]" style={{marginTop: headerHeight}}>
                        
                            {/* Loading Tenants */}
                            {loadingTenants && tenantsData.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                                    <p className="text-gray-500">Loading tenants...</p>
                                </div>
                            )}

                            {tenantsData.length > 0 && (
                                <div className="w-full space-y-4">
                                    {tenantsData.map((tenant) => {
                                        const isExpanded = expandedTenants.has(tenant.id);
                                        
                                        return (
                                        <div key={tenant.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                                            {/* Tenant Row */}
                                            <div 
                                            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                                            onClick={() => toggleTenant(tenant.id)}
                                            >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    {isExpanded ? (
                                                        <ChevronDown className="h-5 w-5 text-gray-900" />
                                                    ) : (
                                                        <ChevronRight className="h-5 w-5 text-gray-900" />
                                                    )}
                                                    <div className="p-2 bg-gray-100 rounded-lg">
                                                    <Building className="h-5 w-5 text-gray-900" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 text-lg">Tenant</h3>
                                                    <div className="flex items-center gap-4 mt-1">
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <Mail className="h-4 w-4" />
                                                        <span className="text-sm">{tenant.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-600">
                                                        <Phone className="h-4 w-4" />
                                                        <span className="text-sm">{tenant.phone_number}</span>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                </div>
                                            </div>
                                            </div>

                                            {/* Loading Stores */}
                                            {(loadingSpesifik === tenant.id) && (
                                                <div className="px-6 pb-6">
                                                    <div className="flex items-center space-x-2">
                                                        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                                                        <span className="text-gray-500">Loading stores...</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Stores List (Expandable) */}
                                            {isExpanded && !loadingTenantStores && storesData.length > 0 && (
                                            <div className="border-t border-gray-200 bg-gray-50 p-6">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Store className="h-5 w-5 text-gray-900" />
                                                    <h4 className="font-semibold text-gray-900">Associated Stores</h4>
                                                </div>
                                                <div className="space-y-3">
                                                    {storesData.map((store) => {
                                                    const isExpiring = isExpiringSoon(store.expiration_access);
                                                    
                                                    return (
                                                        <div key={store.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-3">
                                                                <h5 className="font-semibold text-gray-900">{store.name}</h5>
                                                                {isExpiring && (
                                                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                                                    Expiring Soon
                                                                </span>
                                                                )}
                                                            </div>
                                                            
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                                                                <div className="flex items-center gap-2">
                                                                <Phone className="h-4 w-4" />
                                                                <span>{store.phone_number}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>Access expires: {store.expiration_access}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                <MapPin className="h-4 w-4" />
                                                                <span>{store.address}, {store.city}, {store.state} {store.postal_code}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4" />
                                                                <span>Created: {store.creates_at}</span>
                                                                </div>
                                                            </div>
                                                            </div>
                                                            
                                                            <div className="ml-4">
                                                            <button
                                                                onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleCreateAccessKey(store, tenant.id, store.id);
                                                                }}
                                                                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
                                                            >
                                                                {(loadingAccessKey && loadingSpesifik === store.id) ? (
                                                                    <span className="w-3 h-3 mr-1 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                ) : (
                                                                    <Key className="w-3 h-3 mr-1" />
                                                                )}
                                                                {(loadingAccessKey && loadingSpesifik === store.id) ? 'Creating...' : 'Access Key Testing'}
                                                            </button>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    );
                                                    })}
                                                </div>
                                            </div>
                                            )}

                                            {/* Empty stores state */}
                                            {isExpanded && !loadingTenantStores && storesData.length === 0 && (
                                                <div className="border-t border-gray-200 bg-gray-50 p-6">
                                                    <div className="text-center py-8">
                                                        <Store className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                                                        <h4 className="text-lg font-medium text-gray-900 mb-1">No stores found</h4>
                                                        <p className="text-gray-600">This tenant doesn't have any associated stores yet.</p>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                        );
                                    })}

                                    {/* Load More Trigger for Tenants */}
                                    {hasMoreTenants && (
                                        <div
                                            ref={tenantsObserverRef}
                                            className="flex items-center justify-center py-8"
                                        >
                                            {loadingTenants ? (
                                                <div className="flex items-center space-x-2">
                                                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                                                    <span className="text-gray-500">Loading more tenants...</span>
                                                </div>
                                            ) : (
                                                <div className="h-6 w-full flex items-center justify-center">
                                                    <span className="text-sm text-gray-400">Scroll for more tenants</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Empty State */}
                            {!loadingTenants && tenantsData.length === 0 && (
                                <div className="text-center py-12">
                                    <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No tenants found</h3>
                                    <p className="text-gray-600">There are no tenants to display at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenantManagement;