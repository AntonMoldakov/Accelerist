import { CheckBoxField, TextField, PasswordField } from 'components';
import { Field, Form } from 'react-final-form';
import AuthLayout from 'layouts/AuthLayout';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Button, Li, Ul } from 'ui';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { requiredEmail, required } from 'utils/validators';
import { useAppDispatch } from 'store';
import { signIn } from 'store/user/actions';
import { useState } from 'react';
import { toastr } from 'react-redux-toastr';

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (values: handleSubmitProps) => {
    setLoading(true);
    dispatch(signIn(values)).then(response => {
      if (response.error) {
        toastr.error('Error', response.payload as string);
      }
      setLoading(false);
    });
  };

  return (
    <AuthLayout>
      <Wrapper>
        <Card>
          <Title>Welcome to Accelerist</Title>
          <Ul>
            <Li className={router.pathname == '/signup' ? 'active' : ''}>
              <Link href="/signup">Register</Link>
            </Li>
            <Li className={router.pathname == '/login' ? 'active' : ''}>
              <Link href="/login">Login</Link>
            </Li>
          </Ul>
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
                  <FormItem>
                    <Field
                      disable={isLoading}
                      maxLength={30}
                      name="password"
                      placeholder="Password"
                      validate={required}
                      render={props => (
                        <>
                          <Label>Password</Label>
                          <PasswordField {...props} />
                        </>
                      )}
                    />
                  </FormItem>
                </div>
                <FormFooter>
                  <Field
                    name="rememberMe"
                    title="Remember"
                    type="checkbox"
                    render={props => <CheckBoxField {...props} />}
                  />
                  <Link href="/reset">
                    <A>Forgot password?</A>
                  </Link>
                </FormFooter>
                <Button type="submit" isLoading={isLoading} disabled={submitting || isLoading || pristine}>
                  Login
                </Button>
              </form>
            )}
          />
        </Card>
      </Wrapper>
    </AuthLayout>
  );
};

export default Login;

interface handleSubmitProps {
  email: string;
  password: string;
  rememberMe: boolean;
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
  text-align: center;
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

const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const A = styled.a`
  color: ${colors.darkGray};
  cursor: pointer;
  transition: all 0.2s ease 0s;
  font-size: 12px;
  line-height: 150%;
  &:hover {
    color: ${colors.black};
  }
`;
