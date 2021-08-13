import MainLayout from 'layouts/MainLayout';
import { Company, NoFavoriteMessage } from 'components';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'store';
import styled from 'styled-components';
import { Paginate } from 'ui';
import { PAGE_SIZE } from 'const';
import { getFavoriteCompanies } from 'store/companies/action';
import { useSelector } from 'react-redux';
import { selectFavoriteCompanies, selectFavoriteCompaniesMeta } from 'store/companies/selectors';

const FavoritesCompany = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const companyList = useSelector(selectFavoriteCompanies);
  const companyMeta = useSelector(selectFavoriteCompaniesMeta);
  const router = useRouter();
  const pageCount = Math.ceil(companyMeta.totalItems / +companyMeta.itemsPerPage);

  const currentPath = router.pathname;
  const currentQuery = router.query;

  useEffect(() => {
    setLoading(true);
    dispatch(getFavoriteCompanies((currentQuery.page as string) || '1')).finally(() => {
      setLoading(false);
    });
  }, [currentQuery.page, companyList.length]);

  const handlePagination = (page: pagginationHandlerProps) => {
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
          {companyList.length > 0 ? (
            companyList.map(item => {
              return <Company company={item} key={item.id} />;
            })
          ) : (
            <NoFavoriteMessageContainer>
              <NoFavoriteMessage />
            </NoFavoriteMessageContainer>
          )}
        </MainWrapper>
      </Main>
    </MainLayout>
  );
};

export default FavoritesCompany;

interface pagginationHandlerProps {
  selected: number;
}

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

const NoFavoriteMessageContainer = styled.div`
  height: 70vh;
  width: 100%;
`;
