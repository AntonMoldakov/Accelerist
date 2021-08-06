import { colors } from 'styles/colors';
import styled, { css } from 'styled-components';
import { InputHTMLAttributes } from 'react';

const Input = ({ Icon, position = 'left', theme = 'primary', ...inputProps }: InputProps) => {
  return (
    <Root>
      {Icon && <IconContainer $position={position}>{Icon} </IconContainer>}
      <StyledInput {...inputProps} $theme={theme} />
    </Root>
  );
};

export default Input;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: JSX.Element;
  position?: 'right' | 'left';
  theme?: 'primary' | 'secondary';
}

interface IconContainerProps {
  $position: 'right' | 'left';
}

interface StyledInputProps {
  $theme: 'primary' | 'secondary';
}

const StyledInputPrimaryCSS = css`
  padding: 10px 16px;
  color: ${colors.black};
  height: 46px;
  border: 1px solid ${colors.gray};
  background-color: ${colors.white};
  &:focus {
    border: 1px solid ${colors.blue};
  }
`;

const StyledInputSecondaryCSS = css``;

const IconContainerRightCSS = css`
  right: 15px;
`;

const IconContainerLeftCSS = css`
  left: 0;
`;

const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div<IconContainerProps>`
  position: absolute;
  z-index: 100;
  align-items: center;
  display: flex;
  ${({ $position }) => ($position === 'right' ? IconContainerRightCSS : IconContainerLeftCSS)}
`;

const StyledInput = styled.input<StyledInputProps>`
  position: relative;
  width: 100%;
  font-family: 'Rubik', sans-serif;
  border-radius: 6px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  &:focus {
    outline: none;
  }
  ${({ $theme }) =>
    $theme === 'primary' ? StyledInputPrimaryCSS : $theme === 'secondary' ? StyledInputSecondaryCSS : ''}
`;
