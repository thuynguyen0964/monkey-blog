import styled from 'styled-components';
import { Button } from '../../components/import';
import avatar from '/src/assets/doraemon.jpg';

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
  return (
    <DashboardHeaderStyles>
      <Button to='/dashboard' className='header-button' height='52px'>
        Write new post
      </Button>
      <div className='header-avatar'>
        <img src={avatar} alt='' />
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
