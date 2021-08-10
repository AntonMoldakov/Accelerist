import axios from 'axios';
import { Prospect } from 'components';
import MainLayout from 'layouts/MainLayout';
import { InferGetServerSidePropsType } from 'next';
import { ResponseProspectsList } from 'services/types';
import { useAppDispatch, wrapper } from 'store';
import { actions as userActions } from 'store/user/reducer';
import styled from 'styled-components';

const Dashboard = ({ prospectsList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useAppDispatch();

  // const favoriteCompanies = companiesApi.getFavoriteCompanies({}).then(response => response.data.items);

  return (
    <MainLayout pageTitle={'Dashboard'} headTitle={'dashboard'}>
      <section>
        <header></header>
        <Session>
          {prospectsList.map(item => {
            return <Prospect prospect={item} key={item.id} />;
          })}
        </Session>
      </section>

      <button onClick={() => dispatch(userActions.signOut())}>Sign Out</button>
    </MainLayout>
  );
};

export default Dashboard;

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ req }) => {
  const token = req.cookies.accessToken;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const prospectsList = await axios
    .get<ResponseProspectsList>(
      'https://accelerist.herokuapp.com/api/v1/saved-list?limit=12&page=1&sort=alphabet',
      config,
    )
    .then(response => response.data.items);

  return {
    props: {
      prospectsList,
    },
  };
});

const Session = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
