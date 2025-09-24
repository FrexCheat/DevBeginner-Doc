import PathAnim from '../_ui/PathAnim';

const pathArray = [
  'M -15 80 L 295 80',
  'M -15 106 L 295 106',
  'M 15 180 L 15 142 C 15 141 15 137 20 137 L 295 137',
  'M 324 -19 L 324 80',
  'M 359 -19 L 359 80',
  'M 394 -19 L 394 13 L 384 27 L 384 80',
  'M 704 80 L 413 80',
  'M 694 106 L 413 106',
  'M 724 180 L 665 140 C 663.3 139 662 137 657 137 L 413 137',
];

const pathConfigs = [
  { path: pathArray[0], duration: 2.5, glowLength: 50, glowColor: '#FF6AD5' },
  { path: pathArray[1], duration: 2, glowLength: 40, glowColor: '#FFD93D' },
  { path: pathArray[2], duration: 1.5, glowLength: 60, glowColor: '#2EB9DF' },
  { path: pathArray[3], duration: 1.5, glowLength: 20, glowColor: '#4D96FF' },
  { path: pathArray[4], duration: 2, glowLength: 20, glowColor: '#c07cff' },
  { path: pathArray[5], duration: 1.2, glowLength: 25, glowColor: '#FF6AD5' },
  { path: pathArray[6], duration: 1.5, glowLength: 50, glowColor: '#2EB9DF' },
  { path: pathArray[7], duration: 1.5, glowLength: 30, glowColor: '#FFD93D' },
  { path: pathArray[8], duration: 2, glowLength: 40, glowColor: '#c07cff' },
];

export const HeroLinear = () => {
  return (
    <svg
      className='-z-1 scale-200'
      width='710'
      height='200'
      viewBox='0 0 710 200'
      xmlns='http://www.w3.org/2000/svg'
    >
      {pathConfigs.map((config, index) => (
        <PathAnim
          key={`linear-anim-${index}`}
          index={index}
          path={config.path}
          duration={config.duration}
          glowColor={config.glowColor}
          glowLength={config.glowLength}
        />
      ))}
      <circle
        cx={15}
        cy={186}
        fill='none'
        stroke='#787878'
        strokeWidth={2}
        strokeOpacity='0.3'
        r={5}
      />
      <circle
        cx={700}
        cy={106}
        fill='none'
        stroke='#787878'
        strokeWidth={2}
        strokeOpacity='0.3'
        r={5}
      />
    </svg>
  );
};
