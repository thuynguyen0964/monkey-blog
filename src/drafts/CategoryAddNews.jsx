import {
  Button,
  Field,
  Label,
  Input,
  Radio,
  toast,
  FieldCheck,
} from '../components/import';
import DashboardHeading from '../module/DashBoard/DashBoardHeading';
import { useForm } from 'react-hook-form';
import { postStatus } from '../utils/constant';
import slugify from 'slugify';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const CategoryAddNew = () => {
  const { control, formState, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      name: '',
      slug: '',
      status: postStatus.APPROVED,
    },
  });
  const watchStatus = watch('status');

  const { isSubmitting } = formState;
  const handleAddNews = async (data) => {
    try {
      const values = { ...data };
      values.slug = slugify(data.name, { lower: true });
      const colRef = collection(db, 'categories');
      await addDoc(colRef, {
        ...values,
        createAt: serverTimestamp(),
      });
      toast.success('Create category successfully!!');
      console.log('🚀 values:', values);
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: '',
        slug: '',
        status: postStatus.APPROVED,
      });
    }
  };

  return (
    <div>
      <DashboardHeading
        title='New category'
        desc='Add new category'
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNews)}>
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
                placeholder='Enter your slug'
                className='max-w-[500px]'
              ></Input>
            </Field>
          </FieldCheck>
        </div>
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
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className='mx-auto'
        >
          Add category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
