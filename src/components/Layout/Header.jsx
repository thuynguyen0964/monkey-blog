import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Input, logo } from '../import';
import { useForm } from 'react-hook-form';
import { useAuthCtx } from '../../context/AuthContext';
import avatar from '/src/assets/doraemon.jpg';

const ListMenu = [
  { title: 'Home', to: '/' },
  { title: 'Blog', to: '/blog' },
  { title: 'Dashboard', to: '/dashboard' },
];

const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  padding: 10px 0;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  .header-main,
  .header-menu,
  .header-cta,
  .header-auth {
    display: flex;
    align-items: center;
  }
  .header-main {
    justify-content: space-between;
  }
  .header-cta,
  .header-menu {
    gap: 20px;
  }
  .menu-item {
    list-style: none;
  }
  .menu-item a {
    text-decoration: none;
    color: inherit;
    padding: 10px 16px;
  }
  .header-logo {
    max-width: 50px;
  }
  .header-auth {
    gap: 10px;
  }
  .avatar {
    width: 45px;
    height: 45px;
    object-fit: cover;
    border-radius: 50%;
  }

  @media screen and (max-width: 1023.98px) {
    .logo {
      max-width: 30px;
    }
    .header-menu,
    .header-auth,
    .header-btn {
      display: none;
    }
  }
`;
const Header = () => {
  const { accounts } = useAuthCtx();

  const { control } = useForm();
  return (
    <HeaderStyles>
      <div className='container'>
        <div className='header-main'>
          <Link to='/'>
            <img src={logo} alt='Monkey Blogging' className='header-logo' />
          </Link>
          <ul className='header-menu'>
            {ListMenu.length > 0 &&
              ListMenu.map((menu, index) => (
                <li className='menu-item' key={index}>
                  <NavLink to={menu.to}>{menu.title}</NavLink>
                </li>
              ))}
          </ul>

          <div className='header-cta'>
            <Input
              style={{ padding: 10, width: 'auto' }}
              placeholder='Search blog, posts...'
              control={control}
              name='filterBlog'
            ></Input>
            {accounts ? (
              <div className='header-auth'>
                <img src={avatar} alt='avatar' className='avatar' />
                <span className='userId-name'>
                  {accounts?.displayName || 'User'}
                </span>
              </div>
            ) : (
              <Button
                className='header-btn'
                to='/signup'
                style={{ width: 150 }}
              >
                SignUp
              </Button>
            )}
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
