import {
  Field,
  FieldCheck,
  Label,
  Input,
  Radio,
  Button,
  toast,
} from '../../components/import';
import ImagesUpload from '../../components/upload/ImagesUpload';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { UserProps, roleUser } from '../../utils/constant';
import { useImages } from '../../hooks/useImages';

const UserAddNew = () => {
  const { control, handleSubmit, watch, setValue, getValues } = useForm();

  const handleCreateUsers = (values) => {
    console.log(values);
    toast.success('Creater user successfully');
  };

  const { handleDeleteImg, imageUpload, onSelectImages } = useImages(
    setValue,
    getValues
  );

  const watchStatus = watch('status');
  const watchRoles = watch('role');
  return (
    <div>
      <DashboardHeading title='New user' desc='Add new user to system' />
      <form autoComplete='off' onSubmit={handleSubmit(handleCreateUsers)}>
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
              <ImagesUpload
                name='avatar'
                handleDeleteImg={handleDeleteImg}
                onChange={onSelectImages}
                progress={imageUpload.progressBar}
                image={imageUpload.imagePath}
              />
            </Field>
          </FieldCheck>
        </div>

        <div className='form-layout'>
          <FieldCheck>
            <Field>
              <Label>Status</Label>
              <FieldCheck>
                <Radio
                  name='status'
                  control={control}
                  checked={watchStatus === UserProps.ACTIVE}
                  value={UserProps.ACTIVE}
                >
                  Active
                </Radio>
                <Radio
                  name='status'
                  control={control}
                  checked={watchStatus === UserProps.PENDING}
                  value={UserProps.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name='status'
                  control={control}
                  checked={watchStatus === UserProps.BANNER}
                  value={UserProps.BANNER}
                >
                  Banned
                </Radio>
              </FieldCheck>
            </Field>
            <Field>
              <Label>Role</Label>
              <FieldCheck>
                <Radio
                  name='role'
                  control={control}
                  checked={watchRoles === roleUser.ADMIN}
                  value={roleUser.ADMIN}
                >
                  Admin
                </Radio>
                <Radio
                  name='role'
                  control={control}
                  checked={watchRoles === roleUser.BLOGGER}
                  value={roleUser.BLOGGER}
                >
                  Blogger
                </Radio>
                <Radio
                  name='role'
                  control={control}
                  checked={watchRoles === roleUser.USER}
                  value={roleUser.USER}
                >
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
