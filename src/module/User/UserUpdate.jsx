import { useSearchParams } from 'react-router-dom';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import ImagesUpload from '../../components/upload/ImagesUpload';
import {
  Button,
  Field,
  FieldCheck,
  Input,
  Label,
} from '../../components/import';
import { useForm } from 'react-hook-form';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useEffect } from 'react';
import { useImages } from '../../hooks/useImages';

const UserUpdate = () => {
  const [params] = useSearchParams();
  const userId = params.get('id');
  const { reset, control, setValue, getValues } = useForm();

  const { handleDeleteImg, imageUpload, onSelectImages, setImageUpload } =
    useImages(setValue, getValues);

  const getSingleUser = async () => {
    const colRef = doc(db, 'users', userId);
    const userDocument = await getDoc(colRef);
    const user = userDocument.data();
    reset(user);
    setImageUpload({ ...imageUpload, imagePath: user?.avatar });
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <>
      <DashboardHeading
        title='Update User'
        desc={`Change infomation user : ${userId}`}
      />
      <form autoComplete='off'>
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
                <Label>Username</Label>
                <Input
                  control={control}
                  className='max-w-[500px]'
                  name='username'
                  placeholder='Enter your username'
                ></Input>
              </Field>
              <Field>
                <Label>Email</Label>
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
                <Label>New Password</Label>
                <Input
                  control={control}
                  className='max-w-[500px]'
                  name='newpass'
                  type='password'
                  placeholder='Enter your new password'
                ></Input>
              </Field>
              <Field>
                <Label>Confirm Password</Label>
                <Input
                  control={control}
                  className='max-w-[500px]'
                  name='confirmPassword'
                  type='password'
                  placeholder='Enter your confirm password'
                ></Input>
              </Field>
            </div>
          </FieldCheck>
        </section>
        <FieldCheck className='justify-center mt-5'>
          <Button
            to='/manage/user'
            type='button'
            className='w-[200px] !bg-green-400'
          >
            Back
          </Button>
          <Button className='w-[200px]'>Update</Button>
        </FieldCheck>
      </form>
    </>
  );
};

export default UserUpdate;
