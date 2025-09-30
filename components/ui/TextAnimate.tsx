'use client';
import { FC, useRef } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';

type AnimationType = 'fadeIn' | 'fadeInUp' | 'popIn' | 'shiftInUp' | 'rollIn' | 'whipIn' | 'whipInUp' | 'calmInUp';

interface Props extends HTMLMotionProps<'div'> {
  text: string;
  type?: AnimationType;
  delay?: number;
  duration?: number;
}

const animationVariants = {
  fadeIn: {
    container: {
      hidden: { opacity: 0 },
      visible: (i: number = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: i * 0.3 },
      }),
    },
    child: {
      visible: {
        opacity: 1,
        y: [0, -10, 0],
        transition: {
          type: 'spring' as const,
          damping: 12,
          stiffness: 100,
        },
      },
      hidden: { opacity: 0, y: 10 },
    },
  },
  fadeInUp: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
      },
    },
    child: {
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      hidden: { opacity: 0, y: 20 },
    },
  },
  popIn: {
    container: {
      hidden: { scale: 0 },
      visible: {
        scale: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.2 },
      },
    },
    child: {
      visible: {
        opacity: 1,
        scale: 1.1,
        transition: { type: 'spring' as const, damping: 15, stiffness: 400 },
      },
      hidden: { opacity: 0, scale: 0 },
    },
  },
  calmInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: '200%',
        transition: {
          ease: [0.455, 0.03, 0.515, 0.955] as const,
          duration: 0.85,
        },
      },
      visible: {
        y: 0,
        transition: {
          ease: [0.125, 0.92, 0.69, 0.975] as const, //  Drawing attention to dynamic content or interactive elements, where the animation needs to be engaging but not abrupt
          duration: 0.75,
        },
      },
    },
  },
  shiftInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: '100%', // Starting from below but not too far to ensure a dramatic but manageable shift.
        transition: {
          ease: [0.75, 0, 0.25, 1] as const, // Starting quickly
          duration: 0.6, // Shortened duration for a more dramatic start
        },
      },
      visible: {
        y: 0,
        transition: {
          duration: 0.8, // Slightly longer to accommodate the slow middle and swift end
          ease: [0.22, 1, 0.36, 1] as const, // This easing function starts quickly (dramatic shift), slows down (slow middle), and ends quickly (clean swift end)
        },
      },
    },
  },

  whipInUp: {
    container: {
      hidden: {},
      visible: (i: number = 1) => ({
        transition: { staggerChildren: 0.01, delayChildren: 0.2 * i },
      }),
    },
    child: {
      hidden: {
        y: '200%',
        transition: {
          ease: [0.455, 0.03, 0.515, 0.955] as const,
          duration: 0.45,
        },
      },
      visible: {
        y: 0,
        transition: {
          ease: [0.5, -0.15, 0.25, 1.05] as const,
          duration: 0.75,
        },
      },
    },
  },
  rollIn: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.25em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.65,
          ease: [0.65, 0, 0.75, 1] as const, // Great! Swift Beginning, Prolonged Ease, Quick Finish
        },
      },
    },
  },
  whipIn: {
    container: {
      hidden: {},
      visible: {},
    },
    child: {
      hidden: {
        opacity: 0,
        y: `0.35em`,
      },
      visible: {
        opacity: 1,
        y: `0em`,
        transition: {
          duration: 0.45,
          ease: [0.85, 0.1, 0.9, 1.2] as const, // Rapid Initiation, Subtle Slow, Sharp Conclusion
        },
      },
    },
  },
};

const TextAnimate: FC<Props> = ({ text, type = 'whipInUp', ...props }: Props) => {
  const ref = useRef(null);
  const letters = Array.from(text);
  const { container, child } = animationVariants[type];

  if (type === 'rollIn' || type === 'whipIn') {
    return (
      <h2 className='mt-10 px-8 py-5 pb-8 text-3xl font-black text-black md:text-5xl dark:text-neutral-100'>
        {text.split(' ').map((word, index) => {
          return (
            <motion.span
              ref={ref}
              className='mr-[0.25em] inline-block whitespace-nowrap'
              aria-hidden='true'
              key={index}
              initial='hidden'
              animate='visible'
              variants={container}
              transition={{
                delayChildren: index * 0.13,
                staggerChildren: 0.025,
              }}
            >
              {word.split('').map((character, index) => {
                return (
                  <motion.span aria-hidden='true' key={index} variants={child} className='-mr-[0.01em] inline-block'>
                    {character}
                  </motion.span>
                );
              })}
            </motion.span>
          );
        })}
      </h2>
    );
  }

  return (
    <motion.h5
      style={{ display: 'flex', overflow: 'hidden' }}
      role='heading'
      variants={container}
      initial='hidden'
      animate='visible'
      className='text-3xl font-black text-black md:text-4xl dark:text-neutral-100'
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h5>
  );
};

export default TextAnimate;
