import styled from 'styled-components';
import { Button } from '../../components/Button';

const HomeBanerStyles = styled.div`
  height: calc(100vh - 85px);
  background-image: linear-gradient(to right bottom, #00b4aa, #a4d96c);
  margin-top: 85px;
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 520px;
  }
  .banner-content {
    max-width: 445px;
    color: white;
  }
  .banner-title {
    width: 440px;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 20px;
  }
  .banner-desc {
    font-size: 14px;
    font-weight: 400;
    line-height: 2;
    width: 421px;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 1023.98px) {
    .banner {
      flex-direction: column;
      min-height: unset;
      &-heading {
        font-size: 30px;
        margin-bottom: 10px;
      }
      &-desc {
        font-size: 14px;
        margin-bottom: 20px;
      }
      &-image {
        margin-top: 25px;
      }
      &-button {
        font-size: 14px;
        height: auto;
        padding: 15px;
      }
    }
  }
`;
const Banner = () => {
  return (
    <HomeBanerStyles>
      <div className='container'>
        <div className='banner'>
          <div className='banner-content'>
            <h1 className='banner-title'>Monkey Blogging</h1>
            <p className='banner-desc'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </p>
            <Button
              className='banner-button'
              to='/signup'
              style={{ width: 230, backgroundColor: '#fff', color: '#23BB86' }}
            >
              Get Started
            </Button>
          </div>
          <div className='banner-img'>
            <img src='/banner.png' alt='monkey blogging' />
          </div>
        </div>
      </div>
    </HomeBanerStyles>
  );
};

export default Banner;
