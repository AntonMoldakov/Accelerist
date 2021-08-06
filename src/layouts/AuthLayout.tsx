import Head from 'next/head';
import { LogoIcon } from 'public/icons/components';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Loader } from 'ui';
import loginBackground from 'public/images/loginBackground.png';

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, loading }) => {
  return (
    <Root>
      <Head>
        <title>Authorization</title>
      </Head>
      <Header>
        <LogoIcon width={36} height={36} />
        <LogoTitle>ACCELERIST</LogoTitle>
      </Header>
      <Main>{loading ? <Loader /> : children}</Main>
    </Root>
  );
};

export default AuthLayout;

interface AuthLayoutProps {
  loading?: boolean;
}

const Root = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'hd hd'
    'content content';
`;

const Header = styled.header`
  grid-area: hd;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.darkBlue};
`;

const LogoTitle = styled.h1`
  margin: 0 0 0 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  text-transform: uppercase;

  letter-spacing: 0.2em;

  color: ${colors.white};
`;

const Main = styled.main`
  grid-area: content;
  background-image: url(${loginBackground.src});
  background-position: top center;
  background-size: cover;
`;
