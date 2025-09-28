'use client';
import { useEffect, useRef } from 'react';
import { useMouse } from 'react-use';

interface ItemCardProps {
  children?: React.ReactNode;
  className?: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ children, className = '' }) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const { docX, docY } = useMouse(boxRef as React.RefObject<Element>);

  useEffect(() => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      const x = docX - rect.x;
      const y = docY - rect.y;
      boxRef.current.style.setProperty('--x', `${x}px`);
      boxRef.current.style.setProperty('--y', `${y}px`);
    }
  });

  return (
    <div ref={boxRef} className={`box flex flex-col items-center gap-1 p-2 ${className}`}>
      {children}
    </div>
  );
};

export default ItemCard;
