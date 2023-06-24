import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Input, logo } from '../import';
import { useForm } from 'react-hook-form';

const ListMenu = [
  { title: 'Home', to: '/' },
  { title: 'Blog', to: 'blog' },
  { title: 'About', to: 'about' },
];

const HeaderStyles = styled.header`
  padding: 10px 0;
  .header-main,
  .header-menu,
  .header-cta {
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
  .active {
    background-color: #2cccff;
    border-radius: 6px;
  }
`;
const Header = () => {
  const navigate = useNavigate();
  const changePage = () => navigate('/signup');
  const { control } = useForm();
  return (
    <HeaderStyles>
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
            style={{ padding: 10 }}
            placeholder='Search blog, posts...'
            control={control}
            name='filterBlog'
          ></Input>
          <Button onClick={changePage} style={{ width: 150 }}>
            SignUp
          </Button>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
