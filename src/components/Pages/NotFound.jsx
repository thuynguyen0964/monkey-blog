import styled from 'styled-components';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

const NotFoundStyles = styled.div`
  position: relative;
  .img-err {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
  .child {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%);
  }
`;

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <NotFoundStyles>
      <img src='/404-not-watermark.png' alt='' className='img-err' />
      <div className='child'>
        <Button onClick={() => navigate('/')}>Home</Button>
      </div>
    </NotFoundStyles>
  );
};

export default NotFound;
