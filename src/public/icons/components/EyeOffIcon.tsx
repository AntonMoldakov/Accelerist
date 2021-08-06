import * as React from 'react';
import { colors } from 'styles/colors';

function SvgEyeOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.498 18.498 0 01-2.16 3.19m-6.72-1.07a3.001 3.001 0 01-5.194-2.098A3 3 0 019.88 9.88m8.06 8.06A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94l11.88 11.88zM1 1l22 22"
        stroke={colors.lightGray2}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgEyeOffIcon;
