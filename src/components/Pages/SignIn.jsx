/* eslint-disable no-unused-vars */
import { useAuthCtx } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Label,
  Input,
  Field,
  logo,
  messLog,
  toast,
  ShowPass,
} from '../import';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { FormStyles } from '../../styles/formStyles';

const SignIn = () => {
  const navigate = useNavigate();
  const { accounts } = useAuthCtx();
  const schema = yup.object({
    email: yup.string().required(messLog.required).email(messLog.email),
    password: yup.string().required(messLog.required).min(8, messLog.password),
  });

  const { formState, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  const { isSubmitting, errors, isValid } = formState;

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.warn(arrErrors[0]?.message);
    }
  }, [errors]);

  // sign in and navigate user to Home Page
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success('Login successfully!!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // if user was created, then navigate to Home Page
  useEffect(() => {
    document.title = 'Login Page';
    if (accounts?.email) {
      navigate('/');
    }
  }, []);
  
  return (
    <FormStyles>
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
            <ShowPass control={control}></ShowPass>
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
        <p className='isHaveAccount'>
          Wanna join with us ? <Link to='/signup'>Register an accounts</Link>
        </p>
      </div>
    </FormStyles>
  );
};
export default SignIn;
