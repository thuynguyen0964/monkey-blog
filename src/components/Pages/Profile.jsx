import ImagesUpload from '../upload/ImagesUpload';
import { Button, Field, Label, Input } from '../import';
import DashboardHeading from '../../module/DashBoard/DashBoardHeading';
import { useForm } from 'react-hook-form';

const UserProfile = () => {
  const { control } = useForm();
  return (
    <>
      <DashboardHeading
        title='Account information'
        desc='Update your account information'
        classNameofH1='text-center font-bold text-[36px] text-[#2ebac1]'
        classNameofP='text-center font-bold'
      ></DashboardHeading>
      <form autoComplete='off'>
        <div className='mb-10'>
          <ImagesUpload className='h-[200px] mx-auto' />
        </div>
        <div className='flex gap-5 justify-center'>
          <div className='form-layout'>
            <Field>
              <Label>Fullname</Label>
              <Input
                control={control}
                name='fullname'
                placeholder='Enter your fullname'
              ></Input>
            </Field>
            <Field>
              <Label>Username</Label>
              <Input
                control={control}
                name='username'
                placeholder='Enter your username'
              ></Input>
            </Field>
          </div>
          <div className='form-layout'>
            <Field>
              <Label>Date of Birth</Label>
              <Input
                control={control}
                name='birthday'
                placeholder='dd/mm/yyyy'
              ></Input>
            </Field>
            <Field>
              <Label>Mobile Number</Label>
              <Input
                control={control}
                name='phone'
                placeholder='Enter your phone number'
              ></Input>
            </Field>
          </div>
        </div>
        <div className='flex gap-5 justify-center'>
          <div className='form-layout'>
            <Field>
              <Label>Email</Label>
              <Input
                control={control}
                name='email'
                type='email'
                placeholder='Enter your email address'
              ></Input>
            </Field>
          </div>
          <div className='form-layout'>
            <Field>
              <Label>New Password</Label>
              <Input
                control={control}
                name='password'
                type='password'
                placeholder='Enter your password'
              ></Input>
            </Field>
            <Field>
              <Label>Confirm Password</Label>
              <Input
                control={control}
                name='confirmPassword'
                type='password'
                placeholder='Enter your confirm password'
              ></Input>
            </Field>
          </div>
        </div>
        <Button className='mx-auto w-[200px]'>Update</Button>
      </form>
    </>
  );
};

export default UserProfile;
