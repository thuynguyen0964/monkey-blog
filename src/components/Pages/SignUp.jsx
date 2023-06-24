import styled from 'styled-components';
import logo from '/src/assets/monkey.svg';

const SignUpStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    object-fit: cover;
    margin-left: auto;
    margin-right: auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: 600;
    margin: 16px 0px 40px 0px;
  }
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .label {
    color: ${(props) => props.theme.grayDark};
    font-weight: 500;
    cursor: pointer;
  }
  .input {
    width: 100%;
    padding: 16px;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 6px;
    font-size: 18px;
    border: 2px solid transparent;
    transition: all 0.25s linear;
  }
  .input:focus {
    border-color: #2cccff;
    background-color: #fff;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SignUp = () => {
  return (
    <SignUpStyles>
      <div className='container'>
        <img className='logo' src={logo} alt='' />
        <h1 className='heading'>Monkey Blogging</h1>

        <form autoComplete='off' className='form'>
          <div className='field'>
            <label htmlFor='username' className='label'>
              UserName
            </label>
            <input
              type='text'
              className='input'
              id='username'
              name='username'
              placeholder='Enter your username...'
            />
          </div>
        </form>
      </div>
    </SignUpStyles>
  );
};

export default SignUp;
