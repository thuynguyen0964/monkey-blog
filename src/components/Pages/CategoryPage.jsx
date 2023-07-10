import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useEffect } from 'react';

const CategoryPage = () => {
  const { name } = useParams();

  useEffect(() => {
    document.title = 'Category Pages';
  }, []);
  return (
    <Layout>
      <div>This is Category Pages of {name}</div>
    </Layout>
  );
};

export default CategoryPage;
