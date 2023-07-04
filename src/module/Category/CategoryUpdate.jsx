import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DashboardHeading from '../DashBoard/DashBoardHeading';
import {
  Button,
  Input,
  Field,
  FieldCheck,
  Label,
  toast,
  Radio,
} from '../../components/import';
import { postStatus } from '../../utils/constant';
import { useForm } from 'react-hook-form';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { usePath } from '../../hooks/usePath';
import slugify from 'slugify';

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const categoryId = params.get('id');
  const colRef = doc(db, 'categories', categoryId);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const historyPath = usePath(pathname, 'change');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    reset,
  } = useForm();
  const watchStatus = watch('status');

  const handleChangeCategories = async (values) => {
    await updateDoc(colRef, {
      ...values,
      name: values.name,
      slug: slugify(values.name, { lower: true }),
      status: values.status,
    });
    navigate(historyPath);
    toast.success('Change successfully!!');
  };

  const getSingleCategory = async () => {
    const singleDoc = await getDoc(colRef);
    reset(singleDoc.data());
  };

  useEffect(() => {
    getSingleCategory();
  }, [categoryId]);

  return (
    <>
      <DashboardHeading
        title='Update Categories'
        desc={`Update your categories id : ${categoryId}`}
      />
      <form onSubmit={handleSubmit(handleChangeCategories)}>
        <div className='form-layout'>
          <FieldCheck>
            <Field>
              <Label>Name</Label>
              <Input
                control={control}
                name='name'
                placeholder='Enter your category name'
                className='max-w-[500px]'
              ></Input>
            </Field>
            <Field>
              <Label>Slug</Label>
              <Input
                control={control}
                name='slug'
                placeholder='Enter your category slug'
                className='max-w-[500px]'
              ></Input>
            </Field>
          </FieldCheck>
          <div className='form-layout'>
            <Field>
              <Label>Status</Label>
              <div className='flex flex-wrap gap-x-5'>
                <Radio
                  name='status'
                  control={control}
                  checked={watchStatus === postStatus.APPROVED}
                  value={postStatus.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  name='status'
                  control={control}
                  checked={watchStatus === postStatus.UNAPPROVED}
                  value={postStatus.UNAPPROVED}
                >
                  Unapproved
                </Radio>
              </div>
            </Field>
          </div>
        </div>
        <div className='flex items-center justify-center gap-3'>
          <Button to={historyPath} className='!bg-green-500'>
            Back
          </Button>
          <Button disabled={isSubmitting} isLoading={isSubmitting}>
            Change category
          </Button>
        </div>
      </form>
    </>
  );
};

export default CategoryUpdate;
