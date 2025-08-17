import { useRef, useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  X,
} from 'lucide-react'
import { createPortal } from "react-dom";

export const Toast = ({ message, type, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const toastRef = useRef(null);

  // Handle auto close after duration
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);

    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toastRef.current && !toastRef.current.contains(event.target)) {
        setIsLeaving(true);
        setTimeout(onClose, 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 300);
  };

  const getStyles = () => {
    const baseStyles = "backdrop-blur-lg border shadow-2xl";

    if (type === "success") {
      return `${baseStyles} bg-emerald-500/90 border-emerald-400/50 text-white`;
    } else {
      return `${baseStyles} bg-red-500/90 border-red-400/50 text-white`;
    }
  };

  const getIcon = () => {
    return type === "success"
      ? <CheckCircle className="w-5 h-5 flex-shrink-0" />
      : <XCircle className="w-5 h-5 flex-shrink-0" />;
  };

  return (
    <div
      ref={toastRef}
      className={`
        relative mx-auto w-auto h-auto p-4 rounded-2xl flex items-center gap-3 min-w-80 max-w-md
        transition-all duration-300 ease-out
        ${getStyles()}
        ${isVisible && !isLeaving ? "translate-x-0 opacity-100 scale-100" : "translate-x-full opacity-0 scale-95"}
      `}
    >
      {getIcon()}

      <div className="flex-1">
        <p className="font-medium text-sm leading-relaxed">{message}</p>
      </div>

      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1.5 hover:bg-white/20 rounded-lg transition-colors duration-200 group"
        aria-label="Close notification"
      >
        <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-2xl overflow-hidden">
        <div
          className="h-full bg-white/40 rounded-b-2xl transition-all ease-linear"
          style={{
            width: isLeaving ? "0%" : "100%",
            transitionDuration: isLeaving ? "300ms" : `${duration}ms`
          }}
        />
      </div>
    </div>
  );
};

export const ToastPortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, document.body) : null;
};