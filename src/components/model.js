import React, { useState, useRef } from 'react';
import { 
  Key, 
  Copy, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Shield, 
  AlertTriangle,
  AlertCircle, 
  CheckCircle2,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { useOutsideClick } from './helper';

export const AccessKeyModal = ({ 
  isOpen, 
  onClose, 
  data,
  accessKey,
}) => {
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const modalRef = useRef(null);

  // hook untuk deteksi klik di luar modal
  useOutsideClick({
    ref: modalRef,
    callback: onClose,
    isActive: isOpen,
  });

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(accessKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
    }
  };

  // const maskKey = (key) => {
  //   if (!key) return '';
  //   const visiblePart = key?.substring(0, 12);
  //   const maskedPart = '*'.repeat(key.length - 12);
  //   return visiblePart + maskedPart;
  // };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          ref={modalRef} // <- pasang ref disini
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Key className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Access Key Details</h2>
                <p className="text-sm text-gray-500">Secure API credentials for your store</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Store Information */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Store Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Store Subdomain</label>
                  <p className="text-sm font-medium text-gray-900 mt-1">{data?.subdomain}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Store domain</label>
                  <p className="text-sm font-medium text-gray-900 mt-1">{data?.domain}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Owner Email</label>
                  <p className="text-sm font-medium text-gray-900 mt-1">{data?.tenant?.email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</label>
                  <p className="text-sm font-medium text-gray-900 mt-1">{data?.tenant?.phone_number}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Created</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{data?.created_at}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Access Key Section */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h3 className="text-sm font-medium text-blue-900">Access Key</h3>
                </div>
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="p-1 hover:bg-blue-100 rounded transition-colors"
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              </div>
              
              <div className="relative">
                <div className="flex items-center space-x-2 bg-white rounded-lg border border-blue-200 p-3">
                  <code className="flex-1 text-sm font-mono text-gray-900 break-all">
                    {showKey ? accessKey : "************************************" }
                  </code>
                  <button
                    onClick={handleCopyKey}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Warning Message */}
              <div className="flex items-start space-x-2 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-amber-700">
                  <p className="font-medium">Keep this key secure!</p>
                  <p className="mt-1">This access key provides full API access to your store. Never share it publicly or commit it to version control.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCopyKey}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              <Copy className="h-4 w-4" />
              <span>Copy Access Key</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = "info" }) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          confirmBg: "bg-red-600 hover:bg-red-700",
          icon: AlertCircle
        };
      case "success":
        return {
          iconBg: "bg-green-100", 
          iconColor: "text-green-600",
          confirmBg: "bg-green-600 hover:bg-green-700",
          icon: CheckCircle2
        };
      default:
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600", 
          confirmBg: "bg-blue-600 hover:bg-blue-700",
          icon: AlertCircle
        };
    }
  };

  const styles = getTypeStyles();
  const IconComponent = styles.icon;

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 ${styles.iconBg} rounded-lg`}>
                <IconComponent className={`h-6 w-6 ${styles.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${styles.confirmBg}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const SuccessModal = ({ isOpen, onClose, transactionId, status }) => {
  if (!isOpen) return null;

  // Determine status configuration
  const getStatusConfig = (status) => {
    switch (status?.toUpperCase()) {
      case 'PAID':
        return {
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600',
          buttonColor: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
          title: 'Payment Verified Successfully!',
          message: 'has been successfully verified and marked as PAID.',
          icon: CheckCircle2
        };
      case 'PENDING':
        return {
          bgColor: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          buttonColor: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
          title: 'Transaction Status Updated!',
          message: 'has been checked and remains in PENDING status.',
          icon: Clock
        };
      default:
        return {
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-600',
          buttonColor: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          title: 'Transaction Updated!',
          message: 'has been successfully processed.',
          icon: CheckCircle2
        };
    }
  };

  const config = getStatusConfig(status);
  const IconComponent = config.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all animate-in fade-in duration-200">
        {/* Close button */}
        <div className="flex justify-end p-4 pb-0">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center`}>
              <IconComponent className={`w-8 h-8 ${config.iconColor}`} />
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {config.title}
            </h3>
            <p className="text-gray-600">
              Transaction{' '}
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {transactionId}
              </span>{' '}
              {config.message}
            </p>
            
            {status && (
              <div className="mt-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  status?.toUpperCase() === 'PAID' 
                    ? 'bg-green-100 text-green-800' 
                    : status?.toUpperCase() === 'PENDING'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {status?.toUpperCase() === 'PAID' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {status?.toUpperCase() === 'PENDING' && <Clock className="w-3 h-3 mr-1" />}
                  Status: {status?.toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex justify-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onClose}
              className={`inline-flex items-center px-6 py-2 border border-transparent rounded-lg text-sm font-medium text-white ${config.buttonColor} transition-colors`}
            >
              {status?.toUpperCase() === 'PAID' && <CheckCircle className="w-4 h-4 mr-2" />}
              {status?.toUpperCase() === 'PENDING' && <Clock className="w-4 h-4 mr-2" />}
              {!status && <CheckCircle2 className="w-4 h-4 mr-2" />}
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
);

export const TableLoadingSkeleton = () => (
  <div className="animate-pulse">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="flex space-x-2">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-10"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);


export const ConfirmationModalDeleteCredential = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Konfirmasi Penghapusan", 
    message = "Apakah Anda yakin ingin melanjutkan?", 
    warningMessage = "Tindakan ini tidak dapat dibatalkan!", 
    confirmText = "Ya, Lanjutkan", 
    cancelText = "Batal", 
    isDangerous = true 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                <div className="flex items-center mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${isDangerous ? 'bg-red-100' : 'bg-yellow-100'} flex items-center justify-center`}>
                        <AlertTriangle className={`w-6 h-6 ${isDangerous ? 'text-red-600' : 'text-yellow-600'}`} />
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-900">
                        {title}
                    </h3>
                </div>
                
                <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">
                        {message}
                    </p>
                    <div className={`${isDangerous ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'} border rounded-md p-3 mt-3`}>
                        <p className={`text-sm font-semibold ${isDangerous ? 'text-red-800' : 'text-yellow-800'}`}>
                            ⚠️ Peringatan: {isDangerous ? 'Tindakan ini sangat berbahaya!' : 'Harap berhati-hati!'}
                        </p>
                        <p className={`text-xs ${isDangerous ? 'text-red-700' : 'text-yellow-700'} mt-1`}>
                            {warningMessage}
                        </p>
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                            isDangerous 
                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                                : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};