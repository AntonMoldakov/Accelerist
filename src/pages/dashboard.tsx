import MainLayout from 'layouts/MainLayout';
import { useAppDispatch } from 'store';
import { actions as userActions } from 'store/user/reducer';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  return (
    <MainLayout pageTitle={'Dashboard'} headTitle={'dashboard'}>
      <h1>dasboard</h1>
      <button onClick={() => dispatch(userActions.signOut())}>Sign Out</button>
    </MainLayout>
  );
};

export default Dashboard;
