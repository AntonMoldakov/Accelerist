import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { CheckBox } from 'ui';

const CheckBoxField = ({ input, meta, ...rest }: CheckBoxFieldProps) => {
  return (
    <div>
      <CheckBox {...input} {...rest} />
      {meta.error && meta.touched && <Error>{meta.error}</Error>}
    </div>
  );
};

export default CheckBoxField;

type CheckBoxFieldProps = FieldRenderProps<string, HTMLInputElement>;

const Error = styled.p`
  margin: 0;
  text-align: start;
  font-size: 12px;
  line-height: 150%;
  color: ${colors.red};
`;
