import styled from 'styled-components';
import PostFeature from '../Post/PostFeature';
import Heading from '../../components/Layout/Heading';
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  return (
    <HomeFeatureStyles className='home-block'>
      <div className='container'>
        <Heading>Bài viết nổi bật</Heading>
        <div className='grid-layout'>
          <PostFeature></PostFeature>
          <PostFeature></PostFeature>
          <PostFeature></PostFeature>
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
