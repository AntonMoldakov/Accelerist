import axios from 'axios';
import { Prospect } from 'components';
import MainLayout from 'layouts/MainLayout';
import { InferGetServerSidePropsType } from 'next';
import { Router, useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { ResponseProspectsList } from 'services/types';
import { wrapper } from 'store';
import styled from 'styled-components';
import { colors } from 'styles/colors';
import { Paginate } from 'ui';

const PAGE_SIZE = 12;

const ulItems = [
  {
    id: '1',
    title: 'Alphabet',
    value: 'alphabet',
  },
  {
    id: '2',
    title: 'Prospects Available',
    value: 'prospects-available',
  },
  {
    id: '3',
    title: 'Last Activity',
    value: 'last-activity',
  },
];

const Prospects = ({ prospectsList, prospectsMeta }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const currentQuery = router.query;
  const pageCount = Math.ceil(prospectsMeta.totalItems / +prospectsMeta.itemsPerPage);

  const handlePagination = (page: pagginationHandlerProps) => {
    currentQuery.page = page.selected + 1 + '';

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

  const handleFilters = (value: string) => {
    currentQuery.sort = value;
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <MainLayout title={'Prospects'} loading={isLoading}>
      <Root>
        <Header>
          <Filters>
            <p>Sort by</p>
            <ul>
              {ulItems.map(item => (
                <Li
                  key={item.id}
                  $isActive={currentQuery.sort === item.value}
                  onClick={() => handleFilters(item.value)}>
                  {item.title}
                </Li>
              ))}
            </ul>
          </Filters>
          <div>
            <Paginate
              currentPage={+prospectsMeta.currentPage}
              totalItemsCount={prospectsMeta.totalItems}
              pageSize={PAGE_SIZE}
              initialPage={+prospectsMeta.currentPage - 1}
              pageCount={pageCount}
              onPageChange={handlePagination}
            />
          </div>
        </Header>
        <Section>
          <SectionBody>
            {prospectsList.map(item => {
              return <Prospect prospect={item} key={item.id} />;
            })}
          </SectionBody>
        </Section>
      </Root>
    </MainLayout>
  );
};

export default Prospects;

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ req, query }) => {
  const page = (query.page as string) || '1';
  const sort = (query.sort as string) || 'alphabet';
  const token = req.cookies.accessToken;

  const basePath = 'https://accelerist.herokuapp.com/api/v1/';
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const prospectsResponse = await axios
    .get<ResponseProspectsList>(basePath + `saved-list?limit=${PAGE_SIZE}&page=${page}&sort=${sort}`, config)
    .then(response => response.data);

  const prospectsList = prospectsResponse.items;
  const prospectsMeta = prospectsResponse.meta;

  return {
    props: {
      prospectsList,
      prospectsMeta,
    },
  };
});

interface pagginationHandlerProps {
  selected: number;
}

interface LiProps {
  $isActive: boolean;
}

const Root = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0px auto;
  padding: 32px 20px 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 23px;
  max-width: 1096px;
`;

const Filters = styled.div`
  display: flex;
  font-size: 12px;
  line-height: 150%;
  color: ${colors.darkGray};
  margin-right: 26px;
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    list-style: none;
    color: ${colors.black};
  }
`;

const Li = styled.li<LiProps>`
  cursor: pointer;
  margin-left: 22px;
  &::after {
    content: '';
    height: 2px;
    background-color: ${({ $isActive }) => ($isActive ? colors.blue : 'none')};
    display: block;
    margin-top: 2px;
    transition: background 0.5s ease;
  }
  &:hover {
    &::after {
      background-color: ${colors.blue};
    }
  }
`;
const Section = styled.section`
  max-width: 1096px;
  margin-bottom: 40px;
`;

const SectionBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: -12px -12px 0px;
`;
