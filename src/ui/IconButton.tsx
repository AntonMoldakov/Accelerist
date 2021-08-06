import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'styles/colors';

const IconButton = ({ Icon, theme = 'primary', ...buttonProps }: IconButtonProps) => {
  return (
    <StyledButton $theme={theme} {...buttonProps}>
      {Icon}
    </StyledButton>
  );
};

export default IconButton;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: JSX.Element;
  theme?: 'primary' | 'secondary';
}

interface StyledButtonProps {
  $theme: 'primary' | 'secondary';
}

const ButtonPrimaryCSS = css`
  background: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const ButtonSecondaryCSS = css`
  height: 46px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray};
  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${({ $theme }) => ($theme === 'primary' ? ButtonPrimaryCSS : $theme === 'secondary' ? ButtonSecondaryCSS : '')}
`;
