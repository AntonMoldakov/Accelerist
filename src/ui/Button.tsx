import { colors } from 'styles/colors';
import styled, { css } from 'styled-components';
import Loader from './Loader';
import { ButtonHTMLAttributes } from 'react';

const Button = ({ Icon, theme = 'primary', isLoading, children, ...buttonProps }: ButtonProps) => {
  return (
    <StyledButton {...buttonProps} $theme={theme}>
      {Icon && <IconContainer>{Icon} </IconContainer>}
      {isLoading ? <Loader color={colors.white} size={20} /> : children}
    </StyledButton>
  );
};

export default Button;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: JSX.Element;
  theme?: 'primary' | 'secondary';
  isLoading?: boolean;
}

interface StyledButtonProps {
  $theme: 'primary' | 'secondary';
}

const StyledButtonPrimaryCSS = css`
  color: ${colors.white};
  height: 46px;
  border: 1px solid ${colors.blue};
  background-color: ${colors.blue};
  &:hover {
    background-color: ${colors.lightBlue};
    border: ${colors.lightBlue};
  }
  &:disabled {
    background: ${colors.lightBlue3};
    border-color: ${colors.lightBlue3};
    color: ${colors.opacityBlue};
    cursor: no-drop;
  }
`;

const StyledButtonSecondaryCSS = css`
  color: ${colors.black};
  height: 46px;
  background-color: ${colors.white};

  border: 1px solid ${colors.gray};
`;

const IconContainer = styled.div`
  position: absolute;
  z-index: 100;
  align-items: center;
  display: flex;
`;

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  width: 100%;
  padding: 12px;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  &:focus {
    outline: none;
  }
  ${({ $theme }) =>
    $theme === 'primary' ? StyledButtonPrimaryCSS : $theme === 'secondary' ? StyledButtonSecondaryCSS : ''}
`;
