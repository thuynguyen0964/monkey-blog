import styled from 'styled-components';
import { Button } from '../../components/import';
import avatar from '/src/assets/doraemon.jpg';
import { Link } from 'react-router-dom';
import { useAuthCtx } from '../../context/AuthContext';

const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;

const DashboardHeader = () => {
  const { accounts } = useAuthCtx();
  return (
    <DashboardHeaderStyles>
      <Button to='/manage/add' className='leading-8'>
        Write Post
      </Button>
      <div className='header-avatar'>
        <Link to={`profile/${accounts?.displayName}`}>
          <img src={accounts?.photoURL || avatar} alt={accounts?.displayName} />
        </Link>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
