import { useDispatch } from "react-redux"
import { navbarSlice } from "../reducers/reducers";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState,useRef,useLayoutEffect } from "react";


export const useDeviceDetection = () => {
  const dispatch = useDispatch();
  const { setIsMobileDeviceType } = navbarSlice.actions;

  useEffect(() => {
    let timeoutId;

    const detectDevice = () => {
      // Clear timeout sebelumnya
      clearTimeout(timeoutId);
      
      // Debounce untuk mengurangi dispatch saat resize
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        dispatch(setIsMobileDeviceType(width < 1280));
      }, 100); // Delay 100ms
    };

    detectDevice(); // Deteksi saat pertama mount
    window.addEventListener('resize', detectDevice);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', detectDevice);
    };
  }, [dispatch, setIsMobileDeviceType]);
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll ke atas setiap path berubah
  }, [pathname]);

  return null;
};

export function useElementHeight() {
  const elementRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!elementRef.current) return;

    const updateHeight = () => {
      setHeight(elementRef.current.offsetHeight || 0);
    };

    updateHeight(); // Set awal

    const observer = new ResizeObserver(updateHeight);
    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  return { ref: elementRef, height };
}

export const useOutsideClick = ({ref, callback, isActive = true}) => {
    useEffect(() => {
        if (!isActive) return;

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        function handleTouchOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        // Delay untuk mencegah immediate trigger
        const timeoutId = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleTouchOutside, { passive: true });
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleTouchOutside);
        };
    }, [ref, callback, isActive]);
}

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
    });
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
    }).format(amount);
};