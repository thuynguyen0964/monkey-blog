/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useAuthCtx } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  EyeClose,
  EyeIcon,
  Label,
  Input,
  Field,
  logo,
  messLog,
  toast,
} from '../import';

const SignInStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    width: 80px;
    height: 100px;
    object-fit: cover;
    margin-left: auto;
    margin-right: auto;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: 500;
    margin: 16px 0px 30px 0px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SignIn = () => {
  const { accounts } = useAuthCtx();
  const { formState, handleSubmit, control } = useForm();
  const { isSubmitting } = formState;
  const [showPass, setShowPass] = useState(false);

  const schema = yup.object({
    username: yup.string().required(messLog.required),
    email: yup.string().required(messLog.required).email(messLog.email),
    password: yup.string().required(messLog.required).min(8, messLog.password),
  });

  const handleSignIn = (values) => {
    toast.success('Login successfully!!');
  };

  // const navigate = useNavigate();
  // // useEffect(() => {
  // //   if (!accounts.email) {
  // //     navigate('/signup');
  // //   } else {
  // //     navigate('/');
  // //   }
  // // }, []);
  return (
    <SignInStyles>
      <div className='container'>
        <img className='logo' src={logo} alt='' />
        <h1 className='heading'>Monkey Blogging</h1>

        <form
          autoComplete='off'
          className='form'
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Field>
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
            Login
          </Button>
        </form>
      </div>
    </SignInStyles>
  );
};

SignIn.propTypes = {};

export default SignIn;
