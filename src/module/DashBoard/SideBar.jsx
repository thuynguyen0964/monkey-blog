import { v4 as uuidv4 } from 'uuid';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, logo, toast } from '../../components/import';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

const SidebarStyles = styled.div`
  width: 300px;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
  border-radius: 12px;
  .sidebar-logo {
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 0 20px;
    img {
      max-width: 40px;
    }
    margin-bottom: 20px;
    padding: 20px 20px 0;
  }
  .menu-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 20px;
    font-weight: 500;
    color: ${(props) => props.theme.gray80};
    margin-bottom: 20px;
    cursor: pointer;
  }
`;

const sidebarLinks = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
        />
      </svg>
    ),
  },
  {
    title: 'Post',
    url: '/manage/post',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
        />
      </svg>
    ),
  },
  {
    title: 'Category',
    url: '/manage/category',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
        />
      </svg>
    ),
  },
  {
    title: 'User',
    url: '/manage/user',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
        />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success('Signout successfully');
      navigate('signin');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <SidebarStyles className='sidebar'>
      <div className='sidebar-logo'>
        <Link to='/'>
          <img src={logo} alt='' />
        </Link>
        <span>Monkey Blogging</span>
      </div>
      {sidebarLinks.map((link) => (
        <NavLink
          to={link.url}
          onClick={link.onClick}
          className='menu-item'
          key={uuidv4()}
        >
          <span className='menu-icon'>{link.icon}</span>
          <span className='menu-text'>{link.title}</span>
        </NavLink>
      ))}
      <Button className='w-full !bg-red-400' onClick={handleSignOut}>Logout</Button>
    </SidebarStyles>
  );
};

export default Sidebar;
