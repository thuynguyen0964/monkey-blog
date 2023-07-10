import styled from 'styled-components';
import Layout from '../Layout/Layout';
import PostImage from '../../module/Post/components/PostImage';
import PostCategory from '../../module/Post/components/PostCategory';
import PostMeta from '../../module/Post/components/PostMeta';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';
import { fomatDate } from '../../module/Post/PostFeature';
import parse from 'html-react-parser';
import defaultAvatar from '/src/assets/doraemon.jpg';
import PostRelated from '../../module/Post/PostRelated';

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 20px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});

  // Can not using "slug" with doc(collection(db, "post", slug)) -> getDoc(...)
  // using query -> get docs -> loop -> render

  const getDetailsPost = async () => {
    try {
      const docRef = query(collection(db, 'posts'), where('slug', '==', slug));
      onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => setPost({ ...doc.data() }));
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDetailsPost();
  }, [slug]);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [slug]);

  useEffect(() => {
    document.title = 'Details Page';
  }, []);
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className='mt-24'>
          <div className='container'>
            <div className='post-header'>
              <PostImage
                url={post.imageStore}
                className='post-feature'
              ></PostImage>
              <div className='post-info'>
                <PostCategory className='mb-6'>
                  {post?.category?.name}
                </PostCategory>
                <h1 className='post-heading'>{post?.title}</h1>
                <PostMeta
                  author={post?.author}
                  date={fomatDate(post.createAt)}
                ></PostMeta>
              </div>
            </div>
            <div className='post-content'>
              <div className='entry-content'>
                {parse(post?.content || 'Content will be appear here')}
              </div>
              <div className='author'>
                <div className='author-image'>
                  <img
                    src={post?.user?.avatar || defaultAvatar}
                    alt={post.author}
                  />
                </div>
                <div className='author-content'>
                  <h3 className='author-name'>{post?.author}</h3>
                  <p className='author-desc'>
                    {post.user?.desc ||
                      'This user has not uploaded a profile yet'}
                  </p>
                </div>
              </div>
            </div>
            <div className='post-related'>
              <PostRelated categoryId={post?.categoryId || ''} />
            </div>
          </div>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetails;
