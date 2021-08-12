import MainLayout from 'layouts/MainLayout';
import { ResponseFavoriteCompanies } from 'services/types';
import axios from 'axios';
import { FavoriteCompany } from 'components';
import { InferGetServerSidePropsType } from 'next';
import { Router, useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { wrapper } from 'store';
import styled from 'styled-components';
import { Paginate } from 'ui';
import { PAGE_SIZE } from 'const';

const FavoritesCompany = ({ companyList, companyMeta }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const pageCount = Math.ceil(companyMeta.totalItems / +companyMeta.itemsPerPage);

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

  const handlePagination = (page: pagginationHandlerProps) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.selected + 1 + '';

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };
  return (
    <MainLayout title={'Favorites'} loading={isLoading}>
      <Header>
        <div>{companyMeta.totalItems + ' companies'}</div>
        <Paginate
          currentPage={+companyMeta.currentPage}
          totalItemsCount={companyMeta.totalItems}
          pageSize={PAGE_SIZE}
          forcePage={+companyMeta.currentPage - 1}
          pageCount={pageCount}
          onPageChange={handlePagination}
        />
      </Header>
      <Main>
        <MainWrapper>
          {companyList.map(item => {
            return <FavoriteCompany company={item} key={item.id} />;
          })}
        </MainWrapper>
      </Main>
    </MainLayout>
  );
};

export default FavoritesCompany;

interface pagginationHandlerProps {
  selected: number;
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ req, query }) => {
  const page = (query.page as string) || '1';
  const token = req.cookies.accessToken;

  const basePath = 'https://accelerist.herokuapp.com/api/v1/';
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const prospectsResponse = await axios
    .get<ResponseFavoriteCompanies>(basePath + `companies/favorites?limit=${PAGE_SIZE}&page=${page}`, config)
    .then(response => response.data);

  const companyList = prospectsResponse.items;
  const companyMeta = prospectsResponse.meta;

  return {
    props: {
      companyList,
      companyMeta,
    },
  };
});

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;
  max-width: 1096px;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
`;

const Main = styled.main`
  max-width: 1096px;
  margin-bottom: 40px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: -12px -12px 0px;
`;
