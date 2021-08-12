import Head from 'next/head';
import { LogoBlackIcon, UserIcon } from 'public/icons/components';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Loader } from 'ui';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/user/selectors';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from 'store/user/actions';
import { useAppDispatch } from 'store';
import { Dropdown } from 'react-bootstrap';
import { actions as userActions } from 'store/user/reducer';

const navItems = [
  {
    id: '1',
    title: 'Dashboard',
    src: '/dashboard',
  },
];

const MainLayout: React.FC<MainLayoutProps> = ({ children, loading, title }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    setLoading(true);
    dispatch(getCurrentUser()).finally(() => setLoading(false));
  }, []);

  if (!user || !user.accessToken) {
    router.push('/login');
  }
  return (
    <Root>
      <Head>
        <title>{title}</title>
      </Head>
      {isLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <>
          <Header>
            <StyledNav>
              <Link href="/dashboard">
                <>
                  <Logo width={46} height={46} />
                  <LogoTitle>ACCELERIST</LogoTitle>
                </>
              </Link>
              {navItems.map(item => (
                <Link href={item.src} key={item.id}>
                  <A $active={router.route === item.src}>{item.title}</A>
                </Link>
              ))}
            </StyledNav>
            <UserContainer>
              {isLoading ? (
                <Loader size={20} />
              ) : (
                <>
                  <Dropdown>
                    <StyledDropdownToggle id="dropdown-basic">
                      <AvatarContainer $src={user.avatarKey}>
                        {!user.avatarKey && <UserIcon height={20} width={20} />}
                      </AvatarContainer>
                      {user.firstName || user.lastName ? (user.firstName || '') + (user.lastName || '') : 'No name'}
                    </StyledDropdownToggle>
                    <StyledDropdownMenu>
                      <StyledDropdownItem onClick={() => dispatch(userActions.signOut())}>Sign Out</StyledDropdownItem>
                    </StyledDropdownMenu>
                  </Dropdown>
                </>
              )}
            </UserContainer>
          </Header>
          <Main>
            <PageHeader>
              <PageTitle>{title}</PageTitle>
            </PageHeader>
            {loading ? <Loader /> : <MainWrapper>{children}</MainWrapper>}
          </Main>
        </>
      )}
    </Root>
  );
};

export default MainLayout;

interface MainLayoutProps {
  loading?: boolean;
  title: string;
}

interface AProps {
  $active: boolean;
}

interface AvatarProps {
  $src: string | null;
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

const MainWrapper = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0px auto;
  padding: 32px 20px 20px;
`;

const Header = styled.header`
  padding: 0 20px;
  grid-area: hd;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.lightBlue4};
`;

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(LogoBlackIcon)`
  cursor: pointer;
`;

const LogoTitle = styled.h1`
  cursor: pointer;
  margin: 0 49px 0 16px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  text-transform: uppercase;

  letter-spacing: 0.2em;

  color: ${colors.black};
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`;

const A = styled.a<AProps>`
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  margin-left: 28px;
  font-size: 12px;
  color: ${colors.black};
  cursor: pointer;
`;

const AvatarContainer = styled.div<AvatarProps>`
  border-radius: 6px;
  width: 36px;
  height: 36px;
  background: ${({ $src }) => ($src ? `url(${$src})` : colors.white)};
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserContainer = styled.div`
  min-width: 150px;
  display: flex;
  align-items: center;
`;

const StyledDropdownToggle = styled(Dropdown.Toggle)`
  min-width: 150px;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 150%;
  color: ${colors.black};
  border: none;
  background: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
  min-width: 150px;
  margin-top: 10px;
  display: flex;
  flex-flow: column;
  background-color: ${colors.white};
  box-shadow: rgb(40 31 61 / 4%) 0px 2px 20px;
  border-radius: 6px;
  padding: 24px;
  a {
    font-size: 12px;
  }
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  color: ${colors.red};
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0px 20px;
  background: ${colors.white};
  height: 96px;
`;

const PageTitle = styled.h2`
  font-weight: 500;
  font-size: 32px;
  line-height: 150%;
  color: ${colors.black};
  margin-right: 80px;
`;

const Main = styled.main`
  grid-area: content;
  background-color: ${colors.lightGray3};
`;
