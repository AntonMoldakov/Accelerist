import axios from 'axios';
import { FavoriteCompany, Prospect } from 'components';
import MainLayout from 'layouts/MainLayout';
import moment from 'moment';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { HeartIcon, UserIcon } from 'public/icons/components';
import React from 'react';
import { ResponseFavoriteCompanies, ResponseLoginsList, ResponseProspectsList, ResponseTeam } from 'services/types';
import { wrapper } from 'store';
import styled, { css } from 'styled-components';
import { colors } from 'styles/colors';
import { Button } from 'ui';

const Dashboard = ({
  prospectsList,
  favoriteCompanies,
  team,
  lastLoginsList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  return (
    <MainLayout title={'Dashboard'}>
      <Root>
        <Section $theme="full">
          <SectionHeader>
            <SectionTitle>Prospecting Sessions</SectionTitle>
            <Link href="/prospects">
              <A>see more</A>
            </Link>
          </SectionHeader>
          <SectionBody>
            {prospectsList.slice(1).map(item => {
              return <Prospect prospect={item} key={item.id} />;
            })}
          </SectionBody>
        </Section>

        <SectionContainer>
          <Section $theme="half">
            <SectionHeader>
              <SectionTitle>Favorites</SectionTitle>
              {favoriteCompanies && favoriteCompanies.length > 0 && (
                <Link href="/company-favorites">
                  <A>see more</A>
                </Link>
              )}
            </SectionHeader>
            <SectionBody>
              {favoriteCompanies && favoriteCompanies.length > 0 ? (
                favoriteCompanies.map(item => {
                  return <FavoriteCompany company={item} key={item.id} />;
                })
              ) : (
                <Favorites>
                  <HeartIcon width={95} height={86} />
                  <FavoritesTitle>No favorite company</FavoritesTitle>
                  <FavoritesSubtitle>Go to the search page and add to favorites</FavoritesSubtitle>
                  <Button onClick={() => router.push('/search')} theme="third">
                    Go to Prospecting
                  </Button>
                </Favorites>
              )}
            </SectionBody>
          </Section>
          <Section $theme="half">
            <SectionHeader>
              <SectionTitle>Reports</SectionTitle>
            </SectionHeader>
            <Reports>
              <ReportsHeader>
                <ReportsData>
                  <ReportsTitle>Search Sessions</ReportsTitle>
                  <ReportsDataBody>
                    <ReportsDataTitle>Total</ReportsDataTitle>
                    <ReportsDataText>{team.searchCount}</ReportsDataText>
                  </ReportsDataBody>
                </ReportsData>
                <ReportsData>
                  <ReportsTitle>Sent Pitches</ReportsTitle>
                  <ReportsDataBody>
                    <ReportsDataTitle>Company</ReportsDataTitle>
                    <ReportsDataText>{team.pitchCount}</ReportsDataText>
                  </ReportsDataBody>
                </ReportsData>
              </ReportsHeader>
              <ReportsTitle>Prospect Navigator</ReportsTitle>
              <ReportsBodyLink href="http://accelerist.com/insights-2/">Go to page</ReportsBodyLink>
              <ReportsTitle>Last Login</ReportsTitle>
              <div>
                {lastLoginsList &&
                  lastLoginsList.map(item => (
                    <User key={item.id}>
                      <AvatarContainer $src={item.user.avatarKey}>
                        {!item.user.avatarKey && <UserIcon height={20} width={20} />}
                      </AvatarContainer>
                      <UserBody>
                        <div>
                          {item.user.firstName || item.user.lastName
                            ? (item.user.firstName || '') + (item.user.lastName || '')
                            : 'No name'}
                        </div>
                        <div>
                          <span>{moment(item.loggedInAt).format('DD MMM YY')}</span>
                        </div>
                      </UserBody>
                    </User>
                  ))}
              </div>
            </Reports>
          </Section>
        </SectionContainer>
      </Root>
    </MainLayout>
  );
};

export default Dashboard;

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ req }) => {
  const token = req.cookies.accessToken;
  const basePath = 'https://accelerist.herokuapp.com/api/v1/';
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const prospectsList = await axios
    .get<ResponseProspectsList>(basePath + 'saved-list?limit=12&page=1&sort=alphabet', config)
    .then(response => response.data.items);

  const favoriteCompanies = await axios
    .get<ResponseFavoriteCompanies>(basePath + 'companies/favorites?limit=6&page=1', config)
    .then(response => response.data.items);

  const team = await axios.get<ResponseTeam>(basePath + 'team', config).then(response => response.data);

  const lastLoginsList = await axios
    .get<ResponseLoginsList>(basePath + 'team/last_logins', config)
    .then(response => response.data);

  return {
    props: {
      prospectsList,
      favoriteCompanies,
      team,
      lastLoginsList,
    },
  };
});

interface SectionProps {
  $theme: 'full' | 'half';
}

interface AvatarProps {
  $src: string | null;
}

const Root = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0px auto;
  padding: 32px 20px 20px;
`;

const HalfSectionCSS = css`
  max-width: 536px;
  width: 100%;
`;

const FullSectionCSS = css`
  max-width: 1096px;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1096px;
`;

const Section = styled.section<SectionProps>`
  ${({ $theme }) => ($theme === 'full' ? FullSectionCSS : $theme === 'half' ? HalfSectionCSS : '')}
  margin-bottom: 40px;
`;

const SectionHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  width: 100%;
`;

const A = styled.a`
  color: ${colors.blue};
  cursor: pointer;
`;

const SectionTitle = styled.h3`
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
`;

const SectionBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: -12px -12px 0px;
`;

const AvatarContainer = styled.div<AvatarProps>`
  border-radius: 100%;
  width: 40px;
  height: 40px;
  background: ${({ $src }) => ($src ? `url(${$src})` : colors.lightBlue3)};
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Favorites = styled.section`
  width: 536px;
  min-height: 516px;
  background: ${colors.white};
  border-radius: 6px;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

const FavoritesTitle = styled.h4`
  margin: 40px 0 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
`;

const FavoritesSubtitle = styled.p`
  font-size: 12px;
  line-height: 150%;
  color: ${colors.gray2};
  margin-bottom: 32px;
`;

const Reports = styled.section`
  width: 536px;
  min-height: 516px;
  background: ${colors.white};
  border-radius: 6px;
  padding: 24px;
`;

const ReportsTitle = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  margin-bottom: 16px;
`;

const ReportsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ReportsData = styled.div`
  width: calc(50% - 9px);
`;

const ReportsBodyLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  background: ${colors.lightGray3};
  border-radius: 4px;
  padding: 25px 20px;
  margin-bottom: 24px;
  cursor: pointer;
`;

const ReportsDataBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.lightGray3};
  border-radius: 4px;
  padding: 5px 0px;
`;

const ReportsDataText = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
`;

const ReportsDataTitle = styled.div`
  font-size: 12px;
  line-height: 150%;
  color: ${colors.darkGray};
  margin-bottom: 8px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserBody = styled.div`
  border-bottom: 1px solid rgb(238, 238, 238);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  padding: 15px 0px;
  font-size: 12px;
  line-height: 150%;
  font-weight: 500;
  span {
    font-weight: 400;
    color: ${colors.darkGray};
  }
  &::last-child {
    border: none;
  }
`;
