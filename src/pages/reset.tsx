import { TextField } from 'components';
import { Field, Form } from 'react-final-form';
import AuthLayout from 'layouts/AuthLayout';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Button } from 'ui';
import { useRouter } from 'next/dist/client/router';
import { requiredEmail } from 'utils/validators';
import { useAppDispatch } from 'store';
import { resetPassword } from 'store/user/actions';
import { useState } from 'react';
import { toastr } from 'react-redux-toastr';

const Reset = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: handleSubmitProps) => {
    setLoading(true);
    dispatch(resetPassword(values)).then(response => {
      if (response.error) {
        toastr.error('Error', response.payload as string);
      } else {
        router.push('/login');
      }
      setLoading(false);
    });
  };

  return (
    <AuthLayout>
      <Wrapper>
        <Card>
          <Title>Password Reset</Title>
          <SubTitle>Enter your email to receive instructions on how to reset your password.</SubTitle>
          <Form
            onSubmit={handleSubmit}
            render={({ handleSubmit, submitting, pristine }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <FormItem>
                    <Field
                      disable={isLoading}
                      name="email"
                      type="email"
                      placeholder="Email"
                      validate={requiredEmail}
                      render={props => (
                        <>
                          <Label>Email</Label>
                          <TextField {...props} />
                        </>
                      )}
                    />
                  </FormItem>
                </div>
                <Button type="submit" isLoading={isLoading} disabled={submitting || isLoading || pristine}>
                  Reset
                </Button>
              </form>
            )}
          />
        </Card>
      </Wrapper>
    </AuthLayout>
  );
};

export default Reset;

interface handleSubmitProps {
  email: string;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 73px;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
  color: ${colors.black};
`;

const SubTitle = styled.h3`
  margin: 0;
  color: ${colors.black};
  font-weight: 400;
  font-size: 16px;
  line-height: 155%;
  margin-bottom: 30px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 454px;
  margin-bottom: 40px;
  background-color: ${colors.white};
  border-radius: 6px;
  padding: 40px;
`;

const Label = styled.label`
  font-size: 12px;
  line-height: 150%;
  color: ${colors.darkGray};
  margin-bottom: 4px;
`;

const FormItem = styled.div`
  margin-bottom: 24px;
`;
