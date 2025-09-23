"use client";
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
const PathAnim = ({
  index = 0,
  path = "",
  duration = 2,
  glowLength = 50,
  glowColor = "#2EB9DF"
}: {
  index?: number;
  path?: string;
  width?: number;
  height?: number;
  duration?: number;
  glowLength?: number;
  glowColor?: string;
  children?: React.ReactNode;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [gradientCoords, setGradientCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const glowId = `gradientGlow-${index}-${glowColor.replace("#", "")}`;
  
  useGSAP(() => {
    if (!pathRef.current) return;
    const pathElement = pathRef.current;
    const pathLength = pathElement.getTotalLength();
    const pathAnimation = { progress: 0, glowStretch: 0 };
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(pathAnimation, {
      progress: 1,
      duration: duration,
      ease: 'power1.inOut',
      onUpdate: () => {
        const currentDistance = pathLength * pathAnimation.progress;
        const glowLengthAdjusted = glowLength * pathAnimation.glowStretch;

        const startDistance = currentDistance;
        const endDistance = currentDistance + glowLengthAdjusted;

        const startPoint = pathElement.getPointAtLength(startDistance);
        const endPoint = pathElement.getPointAtLength(endDistance);

        setGradientCoords({
          x1: startPoint.x,
          y1: startPoint.y,
          x2: endPoint.x,
          y2: endPoint.y
        });
      }
    });
    tl.to(pathAnimation, {
      glowStretch: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, "<").to(pathAnimation, {
      glowStretch: 3,
      duration: 0.3,
      ease: 'power2.in'
    }, ">0.3");
  }, [duration]);

  return (
    <>
      <defs>
        <linearGradient
          id={glowId}
          x1={gradientCoords.x1}
          y1={gradientCoords.y1}
          x2={gradientCoords.x2}
          y2={gradientCoords.y2}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={glowColor} stopOpacity="0" />
          <stop offset="1" stopColor={glowColor} stopOpacity="1" />
          <stop offset="0.05" stopColor={glowColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d={path}
        stroke="#787878"
        strokeOpacity="0.3"
        fill="none"
      />
      <path
        d={path}
        stroke={`url(#${glowId})`}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </>
  );
};

export default PathAnim;