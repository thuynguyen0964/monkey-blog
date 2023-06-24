import styled from 'styled-components';
import Header from '../Layout/Header';

const HomePageStyles = styled.main`
  max-width: calc(100% - 24px);
  width: 1180px;
  margin: 0 auto;
`;

const Home = () => {
  return (
    <HomePageStyles>
      <Header></Header>
    </HomePageStyles>
  );
};

export default Home;
