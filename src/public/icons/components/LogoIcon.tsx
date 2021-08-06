import * as React from 'react';

function SvgLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="#FFDA00" d="M17.24 10.8h1.014V0h-1.015z" />
      <path fill="#F6921E" d="M17.24 36h1.014V25.2h-1.015z" />
      <path fill="#E92D30" d="M17.24 17.87l.716.728L30.506 5.87l-.718-.728z" />
      <path fill="#E92D30" d="M30.505 30.213l-.716.727-12.55-12.728.718-.727z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.167 18.042l.169-.171L5.787 5.143l-.717.727 11.452 11.616H0v1.029h16.605L5.071 30.214l.717.727 12.549-12.728-.17-.171zM36 18l-5.831-5.657-.546.576 4.856 4.567H27.38v1.028h7.099l-4.855 5.081.545.576L35.999 18z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgLogoIcon;
