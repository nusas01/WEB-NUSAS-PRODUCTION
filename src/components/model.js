import React, { useState, useRef } from 'react';
import { 
  Key, Copy, Check, X, Eye, EyeOff, Shield, AlertTriangle
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
      console.error('Failed to copy: ', err);
    }
  };

  const maskKey = (key) => {
    if (!key) return '';
    const visiblePart = key.substring(0, 12);
    const maskedPart = '*'.repeat(key.length - 12);
    return visiblePart + maskedPart;
  };

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
                  <p className="text-sm font-medium text-gray-900 mt-1">{data.subdomain}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Store domain</label>
                  <p className="text-sm font-medium text-gray-900 mt-1">{data.domain}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Owner Email</label>
                  <p className="text-sm font-medium text-gray-900 mt-1">{data.tenant.email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</label>
                  <p className="text-sm font-medium text-gray-900 mt-1">{data.tenant.phone_number}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Created</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{data.created_at}</p>
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
                    {showKey ? accessKey : maskKey(accessKey)}
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