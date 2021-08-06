import { StrokeIcon } from 'public/icons/components';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { colors } from 'styles/colors';

const CheckBox = ({ title, ...inputProps }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Root>
      <Input {...inputProps} type="checkbox" />
      <Title>{title}</Title>
    </Root>
  );
};

export default CheckBox;

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  box-sizing: border-box;
  color: ${colors.gray2};
  border: 1px solid ${colors.gray2};
`;

const Title = styled.label`
  line-height: 155%;
  margin-left: 10px;
  color: ${colors.black};
  font-size: 12px;
`;
