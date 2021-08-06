import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { colors } from 'styles/colors';

const Li = (props: HTMLAttributes<HTMLLIElement>) => {
  return <StyledLi {...props} />;
};

export default Li;

const StyledLi = styled.li`
  display: flex;
  list-style: none;
  width: inherit;
  justify-content: center;
  align-items: center;
  button,
  a {
    width: 100%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-weight: normal;
    font-size: 12px;
    line-height: 150%;
    color: ${colors.darkGray};
    border: none;
    text-decoration: none;
    background: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  &.active {
    button,
    a {
      color: ${colors.black};
      background-color: ${colors.lightBlue2};
    }
  }
`;
