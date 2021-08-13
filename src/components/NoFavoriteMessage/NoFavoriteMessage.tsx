import { useRouter } from 'next/dist/client/router';
import { HeartIcon } from 'public/icons/components';
import React from 'react';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Button } from 'ui';

const NoFavoriteMessage = () => {
  const router = useRouter();
  return (
    <Root>
      <HeartIcon width={95} height={86} />
      <FavoritesTitle>No favorite company</FavoritesTitle>
      <FavoritesSubtitle>Go to the search page and add to favorites</FavoritesSubtitle>
      <Button onClick={() => router.push('/search')} theme="third">
        Go to Prospecting
      </Button>
    </Root>
  );
};

export default NoFavoriteMessage;

const Root = styled.section`
  width: 100%;
  min-height: 100%;
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
