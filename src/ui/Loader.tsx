import React from 'react';
import { colors } from 'styles/colors';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loaders = ({ color = colors.blue, size = 50 }: LoadersProps) => {
  return (
    <Root>
      <Loader type="Oval" color={color} height={size} width={size} />
    </Root>
  );
};

export default Loaders;

interface LoadersProps {
  color?: string;
  size?: number;
}

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
