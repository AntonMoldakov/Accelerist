import React, { useState } from 'react';
import Input, { InputProps as InputBaseProps } from 'ui/Input';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { IconButton } from 'ui';
import { EyeIcon, EyeOffIcon } from 'public/icons/components';

const PasswordField = ({ input, meta, ...rest }: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <StyledInput
        position="right"
        type={showPassword ? 'text' : 'password'}
        $isError={meta.error && meta.touched}
        {...input}
        {...rest}
        Icon={
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            Icon={showPassword ? <EyeIcon width={24} height={24} /> : <EyeOffIcon width={24} height={24} />}
          />
        }
      />
      {meta.error && meta.touched && <Error>{meta.error}</Error>}
    </div>
  );
};

export default PasswordField;

type TextFieldProps = InputBaseProps & FieldRenderProps<string, HTMLInputElement>;

interface StyledInput {
  $isError: boolean;
}

const Error = styled.p`
  margin: 0;
  text-align: start;
  font-size: 12px;
  line-height: 150%;
  color: ${colors.red};
`;

const StyledInput = styled(Input)<StyledInput>`
  ${({ $isError }) =>
    $isError &&
    `
    background: ${colors.lightRed};
    border: 1px solid ${colors.red};
`}
`;
