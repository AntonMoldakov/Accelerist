import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { colors } from 'styles/colors';

const Ul = (props: HTMLAttributes<HTMLUListElement>) => {
  return <StyledUl {...props} />;
};

export default Ul;

const StyledUl = styled.ul`
  padding: 0;
  background: ${colors.lightGray};
  border-radius: 6px;
  width: 100%;
  display: flex;
`;
