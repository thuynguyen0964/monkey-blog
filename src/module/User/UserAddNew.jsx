import {
  Field,
  FieldCheck,
  Label,
  Input,
  Radio,
  Button,
  toast,
  ShowPass,
} from '../../components/import';
import ImagesUpload from '../../components/upload/ImagesUpload';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { UserProps, roleUser } from '../../utils/constant';
import { useImages } from '../../hooks/useImages';
import { auth, db } from '../../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      status: UserProps.PENDING,
      role: roleUser.USER,
    },
  });

  const { handleDeleteImg, imageUpload, onSelectImages, setImageUpload } =
    useImages(setValue, getValues);

  // create users
  const handleCreateUsers = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);

      await addDoc(collection(db, 'users'), {
        ...values,
        username: values.username,
        avatar: imageUpload.imagePath,
        status: values.status,
        role: values.role,
        createdAt: serverTimestamp(),
      });

      toast.success('Creater user successfully');
      reset({
        email: '',
        password: '',
        username: '',
        avatar: '',
        status: UserProps.PENDING,
        role: roleUser.USER,
      });
      setImageUpload({ ...imageUpload, imagePath: '' });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
              <Label htmlFor='password'>Password</Label>
              <ShowPass control={control} className='max-w-[500px]'></ShowPass>
            </Field>
          </FieldCheck>
        </div>

        <div className='form-layout'>
          <FieldCheck>
            <Field>
              <Label>Username</Label>
              <Input
                className='max-w-[500px]'
                name='username'
                placeholder='Enter your username'
                control={control}
              ></Input>
            </Field>
            <Field className='flex-1'>
              <Label>Avatar</Label>
              <ImagesUpload
                name='images'
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

        <div className='mt-10 flex items-center justify-center gap-3'>
          <Button to='/manage/user' className='w-[150px] !bg-green-400'>
            Back
          </Button>
          <Button
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className='w-[150px]'
          >
            Add user
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserAddNew;
