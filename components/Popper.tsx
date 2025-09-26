import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';

interface PopperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: string;
  height?: string;
  className?: string;
}

export default function Popper({
  isOpen,
  onClose,
  children,
  title = '',
  width = '30rem',
  height = 'auto',
  className = '',
}: PopperProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 处理点击背景层关闭弹窗
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current && contentRef.current) {
      onClose();
    }
  };

  // 防止组件内部点击冒泡到背景层
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // 处理滚动锁定
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50'
      onClick={handleOverlayClick}
    >
      <div
        ref={contentRef}
        className={`bg-white dark:bg-[rgb(20,20,20)] rounded-lg shadow-xl transition-all max-h-[90vh] overflow-auto ${className}`}
        style={{ width, height }}
        onClick={handleContentClick}
      >
        <div className='flex justify-between items-center p-4 border-b dark:border-gray-700'>
          <h3 className='text-lg font-medium'>{title}</h3>
          <button
            className='p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
            onClick={onClose}
            aria-label='关闭'
          >
            <IoMdClose size={20} />
          </button>
        </div>

        <div className='flex justify-center items-center p-6'>{children}</div>
      </div>
    </div>,
    document.body
  );
}
