import styled from 'styled-components';
import logo from '/src/assets/monkey.svg';
import { Label } from '../label';
import { Input } from '../input';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Field } from '../Field';
import { EyeClose } from '../Icon';

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
          <Field>
            <Label htmlFor='username'>UserName</Label>
            <Input
              type='text'
              name='username'
              placeholder='Enter your username...'
              control={control}
            ></Input>

            <Label htmlFor='email'>Email Addr</Label>
            <Input
              type='email'
              name='email'
              placeholder='Enter your email...'
              control={control}
            ></Input>

            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              name='password'
              placeholder='Enter your password...'
              control={control}
            >
              <EyeClose className='eye'></EyeClose>
            </Input>
          </Field>
        </form>
      </div>
    </SignUpStyles>
  );
};

export default SignUp;
