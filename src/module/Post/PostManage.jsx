import Table from '../../components/Table/Table';
import { useEffect } from 'react';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { Button } from '../../components/Button';
import { Remover, Update, Views } from '../../components/action';
import { Tooltip } from 'react-tooltip';

const PostManage = () => {
  useEffect(() => {
    document.title = 'Manage Post';
  }, []);
  return (
    <>
      <div className='container nopadding'>
        <div className='flex items-center justify-between py-5'>
          <DashboardHeading
            title='All posts'
            desc='Manage all posts'
          ></DashboardHeading>
          <div className='w-full mr-5 max-w-[300px]'>
            <input
              type='text'
              className='w-full p-3 border border-gray-300 border-solid rounded-lg bg-slate-100 focus:bg-white'
              placeholder='Search post...'
            />
          </div>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>01</td>
            <td>
              <div className='flex items-center gap-x-3'>
                <img
                  src='https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
                  alt=''
                  className='w-[66px] h-[55px] rounded object-cover'
                />
                <div className='flex-1'>
                  <h3 className='font-semibold'>One Special 4K Camera</h3>
                  <time className='text-sm text-gray-500'>
                    Date: 25 Oct 2021
                  </time>
                </div>
              </div>
            </td>
            <td>
              <span className='text-gray-500'>Camera Gear</span>
            </td>
            <td>
              <span className='text-gray-500'>Evondev</span>
            </td>
            <td>
              {/* Icon action */}
              <div className='flex gap-5 text-gray-400'>
                <Views id='action' content='View' />
                <Update id='action' content='Update' />
                <Remover id='action' content='Remove' />
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className='mt-10'>
        <Button className='mx-auto'>Load More</Button>
      </div>
      <Tooltip id='action' render={({ content }) => <span>{content}</span>} />
    </>
  );
};

export default PostManage;
