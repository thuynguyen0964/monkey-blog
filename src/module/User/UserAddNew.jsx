import {
  Field,
  FieldCheck,
  Label,
  Input,
  Radio,
  Button,
} from '../../components/import';
import ImagesUpload from '../../components/upload/ImagesUpload';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { useForm } from 'react-hook-form';

const UserAddNew = () => {
  const { control } = useForm();
  return (
    <div>
      <DashboardHeading title='New user' desc='Add new user to system' />
      <form autoComplete='off'>
        <div className='form-layout'>
          <FieldCheck>
            <Field>
              <Label>Email</Label>
              <Input
                className='max-w-[500px]'
                name='email'
                placeholder='Enter your email'
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label>Password</Label>
              <Input
                className='max-w-[500px]'
                name='password'
                placeholder='Enter your password'
                control={control}
                type='password'
              ></Input>
            </Field>
          </FieldCheck>
        </div>

        <div className='form-layout'>
          <FieldCheck>
            <Field>
              <Label>Username</Label>
              <Input
                className='max-w-[500px]'
                name='fullname'
                placeholder='Enter your fullname'
                control={control}
              ></Input>
            </Field>
            <Field className='flex-1'>
              <Label>Avatar</Label>
              <ImagesUpload />
            </Field>
          </FieldCheck>
        </div>

        <div className='form-layout'>
          <FieldCheck>
            <Field>
              <Label>Status</Label>
              <FieldCheck>
                <Radio name='status' control={control}>
                  Active
                </Radio>
                <Radio name='status' control={control}>
                  Pending
                </Radio>
                <Radio name='status' control={control}>
                  Banned
                </Radio>
              </FieldCheck>
            </Field>
            <Field>
              <Label>Role</Label>
              <FieldCheck>
                <Radio name='role' control={control}>
                  Admin
                </Radio>
                <Radio name='role' control={control}>
                  Blogger
                </Radio>
                <Radio name='role' control={control}>
                  User
                </Radio>
              </FieldCheck>
            </Field>
          </FieldCheck>
        </div>
        <Button className='mx-auto w-[200px] mt-10'>Add user</Button>
      </form>
    </div>
  );
};

export default UserAddNew;
