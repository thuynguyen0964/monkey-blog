import {
  Field,
  FieldCheck,
  Label,
  Input,
  Radio,
  Button,
} from '../../components/import';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { useForm } from 'react-hook-form';

const UserAddNew = () => {
  const { control } = useForm();
  return (
    <div>
      <DashboardHeading title='New user' desc='Add new user to system' />
      <form autoComplete='off'>
        <div className='form-layout'>
          <Field>
            <Label>Fullname</Label>
            <Input
              name='fullname'
              placeholder='Enter your fullname'
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name='username'
              placeholder='Enter your username'
              control={control}
            ></Input>
          </Field>
        </div>
        <div className='form-layout'>
          <Field>
            <Label>Email</Label>
            <Input
              name='email'
              placeholder='Enter your email'
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name='password'
              placeholder='Enter your password'
              control={control}
              type='password'
            ></Input>
          </Field>
        </div>
        <div className='form-layout'>
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
                Moderator
              </Radio>
              <Radio name='role' control={control}>
                Editor
              </Radio>
              <Radio name='role' control={control}>
                User
              </Radio>
            </FieldCheck>
          </Field>
        </div>
        <Button className='mx-auto w-[200px] mt-10'>Add user</Button>
      </form>
    </div>
  );
};

export default UserAddNew;
