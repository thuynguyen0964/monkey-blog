import styled from 'styled-components';
import logo from '/src/assets/monkey.svg';
import { Label } from '../label';
import { Input } from '../input';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Field } from '../Field';
import { EyeClose, EyeIcon } from '../Icon';
import { useState } from 'react';
import { Button } from '../Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';

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

const messLog = {
  required: 'This field is required',
  email: 'This field must be email',
  password: 'Password must be at less 8 character',
};

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);

  const schema = yup.object({
    username: yup.string().required(messLog.required),
    email: yup.string().required(messLog.required).email(messLog.email),
    password: yup.string().required(messLog.required).min(8, messLog.password),
  });

  const { control, handleSubmit, formState, watch, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting } = formState;

  const handleSignUp = (values) => {
    console.log('🚀 values:', values);
    toast.success('Create accounts success!!');

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2500);
    });
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.warn(arrErrors[0]?.message);
    }
  }, [errors]);

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
              type='text'
              name='email'
              placeholder='Enter your email...'
              control={control}
            ></Input>

            <Label htmlFor='password'>Password</Label>
            <Input
              type={showPass ? 'text' : 'password'}
              name='password'
              placeholder='Enter your password...'
              control={control}
            >
              {showPass ? (
                <EyeIcon
                  className='eye'
                  onClick={() => setShowPass(false)}
                ></EyeIcon>
              ) : (
                <EyeClose
                  className='eye'
                  onClick={() => setShowPass(true)}
                ></EyeClose>
              )}
            </Input>
          </Field>

          <Button
            type='submit'
            style={{ width: 200, margin: '0 auto' }}
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Register
          </Button>
        </form>
      </div>
    </SignUpStyles>
  );
};

export default SignUp;
