import Banner from '../../module/Home/Banner';
import HomeFeature from '../../module/Home/HomeFeature';
import HomeNewest from '../../module/Home/HomeNewest';
import Layout from '../Layout/Layout';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <main className='main'>
      <Layout>
        <Banner></Banner>
        <HomeFeature></HomeFeature>
        {/* <HomeNewest></HomeNewest> */}
      </Layout>
    </main>
  );
};

export default Home;
