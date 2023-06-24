import styled from 'styled-components';
import logo from '/src/assets/monkey.svg';
import { Label } from '../label';
import { Input } from '../input';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { EyeIcon } from '../Icon';

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
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SignUp = () => {
  const { control, handleSubmit, formState } = useForm();
  const { errors, isSubmitting, isValid } = formState;

  const handleSignUp = (values) => {
    toast.success('Create accounts success!!');
  };

  return (
    <SignUpStyles>
      <div className='container'>
        <img className='logo' src={logo} alt='' />
        <h1 className='heading'>Monkey Blogging</h1>

        <form
          autoComplete='off'
          className='form'
          onSubmit={handleSubmit(handleSignUp)}
        >
          <div className='field'>
            <Label htmlFor='username'>UserName</Label>
            <Input
              type='text'
              name='username'
              placeholder='Enter your username...'
              control={control}
            ></Input>
          </div>
        </form>
      </div>
    </SignUpStyles>
  );
};

export default SignUp;
