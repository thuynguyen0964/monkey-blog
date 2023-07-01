import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import DashboardHeader from './DashboardHeader';
import Sidebar from './SideBar';
import { useAuthCtx } from '../../context/AuthContext';
import NotFound from '../../components/Pages/NotFound';

const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 40px;
      color: ${(props) => props.theme.primary};
      letter-spacing: 1px;
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;
const DashboardLayout = () => {
  const { accounts } = useAuthCtx();
  if (!accounts) return <NotFound />;
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className='dashboard-main'>
        <Sidebar></Sidebar>
        <div className='dashboard-children'>
          <Outlet></Outlet>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;
