import { useSearchParams } from 'react-router-dom';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import ImagesUpload from '../../components/upload/ImagesUpload';
import {
  Button,
  Field,
  FieldCheck,
  Input,
  Label,
  Radio,
  ShowPass,
  toast,
} from '../../components/import';
import { useForm } from 'react-hook-form';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useEffect } from 'react';
import { useImages } from '../../hooks/useImages';
import { UserProps, roleUser } from '../../utils/constant';

const UserUpdate = () => {
  const [params] = useSearchParams();
  const userId = params.get('id');
  const {
    reset,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm();

  const { imageUpload, onSelectImages, setImageUpload, handleDeleteImg } =
    useImages(setValue, getValues);

  const colRef = doc(db, 'users', userId);
  const getSingleUser = async () => {
    const userDocument = await getDoc(colRef);
    const user = userDocument.data();
    reset(user);
    setImageUpload({ ...imageUpload, imagePath: user?.avatar });
  };

  const watchStatus = watch('status');
  const watchRoles = watch('role');

  const handleUpdateUser = async (values) => {
    await updateDoc(colRef, { ...values, avatar: imageUpload.imagePath });
    toast.success('Update user successfully!!');
  };

  useEffect(() => {
    getSingleUser();
  }, [reset]);

  return (
    <>
      <DashboardHeading
        title='Update User'
        desc={`Change infomation user : ${userId}`}
      />
      <form autoComplete='off' onSubmit={handleSubmit(handleUpdateUser)}>
        <div className='mb-10'>
          <ImagesUpload
            name='images'
            image={imageUpload.imagePath}
            handleDeleteImg={handleDeleteImg}
            onChange={onSelectImages}
            progress={imageUpload.progressBar}
            className='h-[200px] mx-auto rounded-md'
          />
        </div>

        <section className='grid grid-cols-2'>
          {/* username vs email */}
          <FieldCheck>
            <div className='form-layout'>
              <Field>
                <Label htmlFor={'username'}>Username</Label>
                <Input
                  control={control}
                  className='max-w-[500px]'
                  name='username'
                  placeholder='Enter your username'
                ></Input>
              </Field>
              <Field>
                <Label htmlFor={'email'}>Email</Label>
                <Input
                  control={control}
                  className='max-w-[500px]'
                  name='email'
                  type='email'
                  placeholder='Enter your email address'
                ></Input>
              </Field>
            </div>
          </FieldCheck>

          {/* new password vs confirm password */}
          <FieldCheck>
            <div className='form-layout'>
              <Field>
                <Label htmlFor='password'>Password</Label>
                <ShowPass
                  control={control}
                  className='max-w-[500px]'
                ></ShowPass>
              </Field>

              <Field>
                <Label>New Password</Label>
                <Input
                  control={control}
                  className='max-w-[500px]'
                  name='newpassword'
                  type='password'
                  placeholder='Enter your newpassword...'
                ></Input>
              </Field>
            </div>
          </FieldCheck>

          {/* role and status */}
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
          </FieldCheck>
          <FieldCheck>
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
        </section>
        <FieldCheck className='justify-center mt-10'>
          <Button
            to='/manage/user'
            type='button'
            className='w-[200px] !bg-green-400'
          >
            Back
          </Button>
          <Button
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className='w-[200px]'
          >
            Update
          </Button>
        </FieldCheck>
      </form>
    </>
  );
};

export default UserUpdate;
