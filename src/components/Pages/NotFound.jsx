import styled from 'styled-components';
import { Button } from '../Button';

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
  return (
    <NotFoundStyles>
      <img src='/404-not-watermark.png' alt='' className='img-err' />
      <div className='child'>
        <Button to='/'>Home</Button>
      </div>
    </NotFoundStyles>
  );
};

export default NotFound;
