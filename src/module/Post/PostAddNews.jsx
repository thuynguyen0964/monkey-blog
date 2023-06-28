/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';
import {
  Button,
  Field,
  Input,
  Label,
  Radio,
  toast,
} from '../../components/import';
import { Dropdown } from '../../components/Dropdown';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import slugify from 'slugify';
import { postStatus } from '../../utils/constant';
import ImagesUpload from '../../components/upload/ImagesUpload';
import { useImages } from '../../hooks/useImages';
import Toggle from '../../components/toogle/Toggle';

const options = ['Knowledge', 'Nature', 'Developer', 'Tester'];

const PostAddNew = () => {
  useEffect(() => {
    document.title = 'New Post';
  }, []);

  const { control, watch, setValue, handleSubmit, getValues } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      status: postStatus.PENDING,
      category: '',
      hot: false,
    },
  });

  const watchStatus = watch('status');
  const watchCategory = watch('category');
  const watchHot = watch('hot', false);

  const addPost = async (values) => {
    const newValues = { ...values };
    newValues.slug = slugify(values.slug || values.title);
    newValues.status = values.status;

    console.log('🚀 ~ newValues:', newValues);
    toast.success('Add post sucessfully');
  };

  const { handleDeleteImg, imageUpload, onSelectImages } = useImages(
    setValue,
    getValues
  );

  return (
    <section>
      <h1 className='dashboard-heading'>Add new post</h1>
      <form onSubmit={handleSubmit(addPost)}>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Title</Label>
            <Input
              className='max-w-[500px]'
              control={control}
              placeholder='Enter your title'
              name='title'
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              className='max-w-[500px]'
              control={control}
              placeholder='Enter your slug'
              name='slug'
            ></Input>
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Status</Label>
            <div className='flex items-center gap-x-5'>
              <Radio
                name='status'
                control={control}
                checked={watchStatus === postStatus.APPROVED}
                onClick={() => setValue('status', postStatus.APPROVED)}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name='status'
                control={control}
                checked={watchStatus === postStatus.PENDING}
                onClick={() => setValue('status', postStatus.PENDING)}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name='status'
                control={control}
                checked={watchStatus === postStatus.REJECT}
                onClick={() => setValue('status', postStatus.REJECT)}
                value={postStatus.REJECT}
              >
                Reject
              </Radio>
            </div>
          </Field>

          <Field>
            <Label>Author</Label>
            <Input
              className='max-w-[500px]'
              name='author'
              control={control}
              placeholder='Find the author'
            ></Input>
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              {options.length > 0 &&
                options.map((option) => (
                  <Dropdown.Option key={uuidv4()}>{option}</Dropdown.Option>
                ))}
            </Dropdown>
          </Field>
          <Field>
            <Label>Thumbail</Label>
            <ImagesUpload
              name='images'
              onChange={onSelectImages}
              progress={imageUpload.progressBar}
              image={imageUpload.imagePath}
              handleDeleteImg={handleDeleteImg}
            ></ImagesUpload>
          </Field>
          <Field>
            <Label>Post Feature</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue('hot', !watchHot)}
            />
          </Field>
        </div>
        <Button type='submit' className='mx-auto'>
          Add Post
        </Button>
      </form>
    </section>
  );
};

export default PostAddNew;
