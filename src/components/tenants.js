import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Users, Search, X, RefreshCcw, Menu, Store, Phone, Mail, MapPin, Calendar, Key, Building, Loader2, UserPlus, Trash2 } from 'lucide-react';
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
    AccessKeyModal,
    TableLoadingSkeleton
} from './model'
import {
    loadMoreTenants,
} from '../reducers/reducers'
import {
    fetchTenants,
    fetchTenantStores,
    createAccessKeyStore,
    findTenant,
    fetchEmployeTestingStore,
} from '../actions/get'
import {
    tenantsSlice,
    tenantStoresSlice,
    accessKeySlice,
    findTenantSlice,
    employeTestingStoreSlice,
} from '../reducers/get'
import {
    createEmployeeTesting
} from '../actions/post'
import {
    createEmployeeTestingSlice
} from '../reducers/post'
import {
    deleteEmployeeTestingStoreSlice
} from '../reducers/delete'
import {
    deleteEmployeeTestingStore
} from '../actions/delete'
import {
    loginSlice
} from '../reducers/post'

// ==================== SUB COMPONENTS ====================

// Employee Testing Section Component
const EmployeeTestingSection = React.memo(({ 
    storeId, 
    tenantId,
    employeTestingStoreId,
    loadingEmployeTestingStore,
    loadingCreateEmployeeTesting,
    loadingDeleteEmployeeTestingStore,
    onCreateEmployee,
    onDeleteEmployee
}) => {
    const hasEmployeeTesting = employeTestingStoreId && employeTestingStoreId !== null && employeTestingStoreId !== '00000000-0000-0000-0000-000000000000';
    
    return (
        <div className="mt-4 ml-7 border-t border-gray-200 pt-4">
            <div className="bg-gray-50 rounded-lg p-4">
                <h6 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Employee Testing
                </h6>
                
                {loadingEmployeTestingStore ? (
                    <div className="flex items-center space-x-2 py-2">
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        <span className="text-sm text-gray-500">Loading employee testing data...</span>
                    </div>
                ) : hasEmployeeTesting ? (
                    <div className="space-y-3">
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-900">Employee Testing Active</span>
                                </div>
                                <button
                                    onClick={() => onDeleteEmployee(employeTestingStoreId)}
                                    disabled={loadingDeleteEmployeeTestingStore}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loadingDeleteEmployeeTestingStore ? (
                                        <>
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                            Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 className="w-3 h-3" />
                                            Delete
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                                Employee ID: {employeTestingStoreId}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span className="text-sm font-medium text-gray-900">No Employee Testing</span>
                                </div>
                                <button
                                    onClick={() => onCreateEmployee(tenantId, storeId)}
                                    disabled={loadingCreateEmployeeTesting}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loadingCreateEmployeeTesting ? (
                                        <>
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-3 h-3" />
                                            Create Employee
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">
                                Create an employee testing account for this store
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});

// Store Card Component
const StoreCard = React.memo(({ 
    store, 
    tenantId,
    isExpanded,
    loadingAccessKey,
    loadingSpesifik,
    employeTestingStoreId,
    loadingEmployeTestingStore,
    loadingCreateEmployeeTesting,
    loadingDeleteEmployeeTestingStore,
    onToggle,
    onCreateAccessKey,
    onCreateEmployee,
    onDeleteEmployee,
    isExpiringSoon
}) => {
    const isExpiring = isExpiringSoon(store.expiration_access);
    
    return (
        <div className="bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200">
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div 
                            className="flex items-center gap-3 mb-3 cursor-pointer"
                            onClick={() => onToggle(store.id)}
                        >
                            {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-600 flex-shrink-0" />
                            ) : (
                                <ChevronRight className="h-4 w-4 text-gray-600 flex-shrink-0" />
                            )}
                            <h5 className="font-semibold text-gray-900">{store.name}</h5>
                            {isExpiring && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                    Expiring Soon
                                </span>
                            )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 ml-7">
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
                                onCreateAccessKey(store, tenantId, store.id);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
                        >
                            {(loadingAccessKey && loadingSpesifik === store.id) ? (
                                <span className="w-3 h-3 mr-1 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Key className="w-3 h-3 mr-1" />
                            )}
                            {(loadingAccessKey && loadingSpesifik === store.id) ? 'Creating...' : 'Access Key'}
                        </button>
                    </div>
                </div>

                {/* Employee Testing Section */}
                {isExpanded && (
                    <EmployeeTestingSection 
                        storeId={store.id}
                        tenantId={tenantId}
                        employeTestingStoreId={employeTestingStoreId}
                        loadingEmployeTestingStore={loadingEmployeTestingStore}
                        loadingCreateEmployeeTesting={loadingCreateEmployeeTesting}
                        loadingDeleteEmployeeTestingStore={loadingDeleteEmployeeTestingStore}
                        onCreateEmployee={onCreateEmployee}
                        onDeleteEmployee={onDeleteEmployee}
                    />
                )}
            </div>
        </div>
    );
});

// Tenant Card Component
const TenantCard = React.memo(({ 
    tenant,
    isExpanded,
    loadingSpesifik,
    loadingTenantStores,
    storesData,
    expandedStores,
    loadingAccessKey,
    employeTestingStoreId,
    loadingEmployeTestingStore,
    loadingCreateEmployeeTesting,
    loadingDeleteEmployeeTestingStore,
    onToggleTenant,
    onToggleStore,
    onCreateAccessKey,
    onCreateEmployee,
    onDeleteEmployee,
    isExpiringSoon
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Tenant Row */}
            <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => onToggleTenant(tenant.id)}
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
            {isExpanded && !loadingTenantStores && storesData && storesData.length > 0 && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Store className="h-5 w-5 text-gray-900" />
                        <h4 className="font-semibold text-gray-900">Associated Stores</h4>
                    </div>
                    <div className="space-y-3">
                        {storesData.map((store) => (
                            <StoreCard
                                key={store.id}
                                store={store}
                                tenantId={tenant.id}
                                isExpanded={expandedStores.has(store.id)}
                                loadingAccessKey={loadingAccessKey}
                                loadingSpesifik={loadingSpesifik}
                                employeTestingStoreId={employeTestingStoreId}
                                loadingEmployeTestingStore={loadingEmployeTestingStore}
                                loadingCreateEmployeeTesting={loadingCreateEmployeeTesting}
                                loadingDeleteEmployeeTestingStore={loadingDeleteEmployeeTestingStore}
                                onToggle={onToggleStore}
                                onCreateAccessKey={onCreateAccessKey}
                                onCreateEmployee={onCreateEmployee}
                                onDeleteEmployee={onDeleteEmployee}
                                isExpiringSoon={isExpiringSoon}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty stores state */}
            {isExpanded && !loadingTenantStores && (!storesData || storesData.length === 0) && (
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
});

// ==================== MAIN COMPONENT ====================

const TenantManagement = () => {
    const dispatch = useDispatch()
    const [expandedTenants, setExpandedTenants] = useState(new Set());
    const [expandedStores, setExpandedStores] = useState(new Set());
    const [toast, setToast] = useState(null)
    const [loadingSpesifik, setLoadingSpesifik] = useState(null)
    const [loadingTenantStoresIds, setLoadingTenantStoresIds] = useState(new Set());

    const { setIsOpen } = navbarSlice.actions
    const { isOpen, isMobileDeviceType } = useSelector((state) => state.persisted.navbar)

    const { ref: headerRef, height: headerHeight } = useElementHeight();
    

    // data tenants
    const {resetErrortenants, setCurrentPage} = tenantsSlice.actions
    const {
        dataTenants: tenantsData,
        errorTenants,
        loadingTenants,
        totalRecordTenants,
        hasMore: hasMoreTenants,
        page,
        currentPage,
    } = useSelector((state) => state.persisted.tenants)

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

    const handlePageTenantsInc = useCallback((value) => {
        if (value > page && hasMoreTenants) {
            loadMoreTenantsCallback()
            dispatch(setCurrentPage(value))
        } else {
            dispatch(setCurrentPage(value))
        }
    }, [page, hasMoreTenants, loadMoreTenantsCallback, dispatch, setCurrentPage])

    const handleTenantsDec = useCallback((value) => {
        dispatch(setCurrentPage(value))
    }, [dispatch, setCurrentPage])

    // data tenant stores
    const {resetErrorTenantStores} = tenantStoresSlice.actions
    const { 
        dataTenantStores: storesData,
        errorTenantStores,
        loadingTenantStores,
    } = useSelector((state) => state.persisted.tenantStores)

    const toggleTenant = useCallback((tenantId) => {
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
    }, [expandedTenants, storesData, dispatch]);

    // Toggle store expansion and fetch employee testing
    const toggleStore = useCallback((storeId) => {
        setExpandedStores(prev => {
            const newExpandedStores = new Set(prev);
            
            if (newExpandedStores.has(storeId)) {
                newExpandedStores.delete(storeId);
            } else {
                newExpandedStores.add(storeId);
                dispatch(fetchEmployeTestingStore(storeId));
            }
            
            return newExpandedStores;
        });
    }, [dispatch]);


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
                message: accessKeyError,
            })
        }
    }, [accessKeyError])

    useEffect(() => {
        if (loadingAccessKey === false) {
            setLoadingSpesifik(null)
        } 
    }, [loadingAccessKey])

    const handleCreateAccessKey = useCallback((store, tenantId, storeId) => {
        setLoadingSpesifik(storeId)
        setDataStoreCreateAccessKey(store)
        dispatch(createAccessKeyStore(
            storeId,
            tenantId,
        ))
    }, [dispatch]);

    const isExpiringSoon = useCallback((expirationDate) => {
        const expDate = new Date(expirationDate);
        const today = new Date();
        const diffTime = expDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
    }, []);


    // handle search query
    const [query, setQuery] = useState('')
    const {resetFindTenant} = findTenantSlice.actions
    const {
        dataFindTenant, 
        errorFindTenant,
        loadingFindTenant,
    } = useSelector((state) => state.findTenantState)

    useEffect(() => {
        if (errorFindTenant) {
            setToast({
                type: 'error',
                message: errorFindTenant,
            })
        }
    }, [errorFindTenant])

    useEffect(() => {
        if (query === '') {
            dispatch(resetFindTenant())
        }
    }, [query, dispatch, resetFindTenant])

    const handleSearchTenant = useCallback((key) => {
        setQuery(key)
        dispatch(findTenant(key))
    }, [dispatch])

    // fetch employee testing store
    const {resetEmployeTestingStore, resetErrorEmployeTestingStore} = employeTestingStoreSlice.actions
    const {
        employeTestingStoreId,
        employeTestingStoreError,
        loadingEmployeTestingStore,
    } = useSelector((state) => state.employeTestingStoreState)

    useEffect(() => {
        if (employeTestingStoreError) {
            setToast({
                type: 'error',
                message: employeTestingStoreError,
            })
            dispatch(resetErrorEmployeTestingStore())
        }
    }, [employeTestingStoreError, dispatch, resetErrorEmployeTestingStore])


    // handle create employee testing store by store id'
    const {resetCreateEmployeeTesting} = createEmployeeTestingSlice.actions
    const {
        createEmployeeTestingSuccess,
        createEmployeeTestingError,
        loadingCreateEmployeeTesting,
    } = useSelector((state) => state.createEmployeeTestingState)

    useEffect(() => {
        if (createEmployeeTestingError) {
            setToast({
                type: 'error',
                message: createEmployeeTestingError,
            })
            dispatch(resetCreateEmployeeTesting())
        }
    }, [createEmployeeTestingError, dispatch, resetCreateEmployeeTesting])

    useEffect(() => {
        if (createEmployeeTestingSuccess) {
            setToast({
                type: 'success',
                message: createEmployeeTestingSuccess,
            })
            dispatch(resetCreateEmployeeTesting())
            expandedStores.forEach(storeId => {
                dispatch(fetchEmployeTestingStore(storeId));
            });
        }
    }, [createEmployeeTestingSuccess, dispatch, resetCreateEmployeeTesting, expandedStores])

    const createEmployeeTestingStoreById = useCallback((tenantId, storeId) => {
        dispatch(createEmployeeTesting({
            tenant_id: tenantId,
            store_id: storeId,
        }))
    }, [dispatch])


    // handle delete employee testing store 
    const {resetdeleteEmployeeTestingStore} = deleteEmployeeTestingStoreSlice.actions
    const {
        deleteEmployeeTestingStoreId,
        deleteEmployeeTestingStoreError,
        loadingDeleteEmployeeTestingStore,
    } = useSelector((state) => state.deleteEmployeeTestingStoreState)

    useEffect(() => {
        if (deleteEmployeeTestingStoreError) {
            setToast({
                type: 'error',
                message: deleteEmployeeTestingStoreError,
            })
            dispatch(resetdeleteEmployeeTestingStore())
        }
    }, [deleteEmployeeTestingStoreError, dispatch, resetdeleteEmployeeTestingStore])

    useEffect(() => {
        if (deleteEmployeeTestingStoreId) {
            setToast({
                type: 'success',
                message: 'Employee testing deleted successfully',
            })
            dispatch(resetEmployeTestingStore())
            dispatch(resetdeleteEmployeeTestingStore())
            expandedStores.forEach(storeId => {
                dispatch(fetchEmployeTestingStore(storeId));
            });
        }
    }, [deleteEmployeeTestingStoreId, dispatch, resetEmployeTestingStore, resetdeleteEmployeeTestingStore, expandedStores])

    const deleteEmployeeTestingStoreById = useCallback((employeeId) => {
        dispatch(deleteEmployeeTestingStore(employeeId))
    }, [dispatch])

    // Memoize current tenants data
    const currentTenantsData = useMemo(() => {
        return tenantsData[currentPage - 1] || [];
    }, [tenantsData, currentPage]);

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
                                dispatch(resetFindTenant())
                                dispatch(resetErrorEmployeTestingStore())
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
                        accessKey={accessKeyData}
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
                                        onClick={() => { 
                                            dispatch(fetchTenants(1, false))
                                            dispatch(setCurrentPage(1))
                                        }}
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

                        {/* Search Bar */}
                        { !loadingTenants && (
                            <div className="bg-white shadow-sm rounded-lg border border-gray-200 mb-6" style={{marginTop: headerHeight}}>
                                <div className="p-4">
                                    <div className="relative w-full">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search by Tenant ID, or Email..."
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            onKeyDown={(e) => {
                                            if (e.key === "Enter" && query.trim() !== "") {
                                                handleSearchTenant(query)
                                            }
                                            }}
                                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg
                                                    focus:ring-2 focus:ring-gray-900 focus:border-transparent 
                                                    bg-white shadow-sm"
                                        />
                                        {query && (
                                            <button
                                            type="button"
                                            onClick={() => {
                                                setQuery("")
                                                dispatch(resetFindTenant())
                                            }}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                            <X className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* hasil search tenant */}
                        {loadingFindTenant ? (
                            <TableLoadingSkeleton />
                        ) : dataFindTenant ? (
                            <div className="flex justify-center space-y-4 bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 p-6">
                                <div className="w-full space-y-4">
                                    <TenantCard
                                        tenant={dataFindTenant}
                                        isExpanded={expandedTenants.has(dataFindTenant.id)}
                                        loadingSpesifik={loadingSpesifik}
                                        loadingTenantStores={loadingTenantStores}
                                        storesData={storesData}
                                        expandedStores={expandedStores}
                                        loadingAccessKey={loadingAccessKey}
                                        employeTestingStoreId={employeTestingStoreId}
                                        loadingEmployeTestingStore={loadingEmployeTestingStore}
                                        loadingCreateEmployeeTesting={loadingCreateEmployeeTesting}
                                        loadingDeleteEmployeeTestingStore={loadingDeleteEmployeeTestingStore}
                                        onToggleTenant={toggleTenant}
                                        onToggleStore={toggleStore}
                                        onCreateAccessKey={handleCreateAccessKey}
                                        onCreateEmployee={createEmployeeTestingStoreById}
                                        onDeleteEmployee={deleteEmployeeTestingStoreById}
                                        isExpiringSoon={isExpiringSoon}
                                    />
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}

                        {/* Tenant List */}
                        { !dataFindTenant && (
                            <>
                            <div className="flex justify-center space-y-4 bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 p-6">
                                {loadingTenants && tenantsData.length === 0 && (
                                    <TableLoadingSkeleton />
                                )}

                                {tenantsData.length > 0 && (
                                    <div className="w-full space-y-4">
                                        {currentTenantsData.map((tenant) => (
                                            <TenantCard
                                                key={tenant.id}
                                                tenant={tenant}
                                                isExpanded={expandedTenants.has(tenant.id)}
                                                loadingSpesifik={loadingSpesifik}
                                                loadingTenantStores={loadingTenantStores}
                                                storesData={storesData}
                                                expandedStores={expandedStores}
                                                loadingAccessKey={loadingAccessKey}
                                                employeTestingStoreId={employeTestingStoreId}
                                                loadingEmployeTestingStore={loadingEmployeTestingStore}
                                                loadingCreateEmployeeTesting={loadingCreateEmployeeTesting}
                                                loadingDeleteEmployeeTestingStore={loadingDeleteEmployeeTestingStore}
                                                onToggleTenant={toggleTenant}
                                                onToggleStore={toggleStore}
                                                onCreateAccessKey={handleCreateAccessKey}
                                                onCreateEmployee={createEmployeeTestingStoreById}
                                                onDeleteEmployee={deleteEmployeeTestingStoreById}
                                                isExpiringSoon={isExpiringSoon}
                                            />
                                        ))}
                                    </div>
                                )}

                                {!loadingTenants && tenantsData.length === 0 && (
                                    <div className="text-center py-12">
                                        <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No tenants found</h3>
                                        <p className="text-gray-600">There are no tenants to display at the moment.</p>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-700">
                                    Showing {currentTenantsData.length} results
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                    onClick={() => handleTenantsDec(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                    Previous
                                    </button>
                                    <span className="px-3 py-2 text-sm font-medium text-gray-900">
                                    Page {currentPage}
                                    </span>
                                    <button 
                                    disabled={(!hasMoreTenants && currentPage === tenantsData.length) || loadingTenants}
                                    onClick={() => handlePageTenantsInc(currentPage + 1)}
                                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                    Next
                                    </button>
                                </div>
                            </div>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenantManagement;