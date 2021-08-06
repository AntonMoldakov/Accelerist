import * as React from 'react';

function SvgStrokeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.805.203c.26.27.26.708 0 .979L4.47 8.797a.65.65 0 01-.942 0L.195 5.336a.711.711 0 010-.98.65.65 0 01.943 0L4 7.33 10.862.203a.65.65 0 01.943 0z"
        fill="#122434"
      />
    </svg>
  );
}

export default SvgStrokeIcon;
