import React from 'react';
import Input, { InputProps as InputBaseProps } from 'ui/Input';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components';
import { colors } from 'styles/colors';

const TextField = ({ input, meta, ...rest }: TextFieldProps) => {
  return (
    <div>
      <StyledInput $isError={meta.error && meta.touched} {...input} {...rest} />
      {meta.error && meta.touched && <Error>{meta.error}</Error>}
    </div>
  );
};

export default TextField;

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
