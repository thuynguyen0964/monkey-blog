import { useForm } from 'react-hook-form';
import {
  Button,
  Field,
  Input,
  Label,
  Radio,
  toast,
  FieldCheck,
} from '../../components/import';
import { Dropdown } from '../../components/Dropdown';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
import { postStatus } from '../../utils/constant';
import ImagesUpload from '../../components/upload/ImagesUpload';
import { useImages } from '../../hooks/useImages';
import Toggle from '../../components/toogle/Toggle';
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useAuthCtx } from '../../context/AuthContext';
import DashboardHeading from '../DashBoard/DashBoardHeading';

const PostAddNew = () => {
  const { accounts } = useAuthCtx();
  useEffect(() => {
    document.title = 'New Post';
  }, []);

  const [categoriesType, setCategoriesType] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      status: postStatus.PENDING,
      category: '',
      hot: false,
    },
  });

  const { handleDeleteImg, imageUpload, onSelectImages, setImageUpload } =
    useImages(setValue, getValues);

  const watchStatus = watch('status');
  const watchHot = watch('hot', false);

  const addPost = async (values) => {
    const newValues = { ...values };
    newValues.slug = slugify(values.slug || values.title, { lower: true });
    newValues.status = values.status;

    const colRef = collection(db, 'posts');
    await addDoc(colRef, {
      ...newValues,
      imageStore: imageUpload.imagePath,
      userId: accounts?.uid,
      createAt: serverTimestamp(),
    });
    toast.success('Add post sucessfully');
    reset({
      title: '',
      slug: '',
      status: postStatus.PENDING,
      category: '',
      hot: false,
    });
    setCategoryTitle(null);
    setImageUpload({ ...imageUpload, imagePath: '' });
  };

  const handleGetOption = (type) => {
    setValue('category', type?.name);
    setCategoryTitle(type?.name);
  };

  // get categgory in DB with custom hook
  const getCategories = async () => {
    const cateArr = [];
    const colRef = collection(db, 'categories');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      cateArr.push({ id: doc.id, ...doc.data() });
    });
    setCategoriesType(cateArr);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section>
      <DashboardHeading title='Add post' desc='Add new post'></DashboardHeading>
      <form onSubmit={handleSubmit(addPost)} autoComplete='off'>
        <div className='grid grid-cols-2 mb-10 gap-x-10'>
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
        <div className='grid grid-cols-2 mb-10 gap-x-10'>
          <Field>
            <Label>Status</Label>
            <FieldCheck>
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
            </FieldCheck>
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
        <div className='grid grid-cols-2 mb-10 gap-x-10'>
          <Field>
            <Label>Categories</Label>
            <Dropdown>
              <Dropdown.Select placeholder='Choose your category'></Dropdown.Select>
              <Dropdown.List>
                {categoriesType.length > 0 &&
                  categoriesType.map((type) => (
                    <Dropdown.Option
                      key={type.id}
                      onClick={() => handleGetOption(type)}
                    >
                      {type.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {categoryTitle && (
              <span className='inline-block p-3 font-medium bg-green-200 rounded-md'>
                {categoryTitle}
              </span>
            )}
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
        <Button
          type='submit'
          disabled={isSubmitting}
          className='mx-auto disabled:opacity-60'
        >
          {isSubmitting ? 'Loading...' : 'Add Post'}
        </Button>
      </form>
    </section>
  );
};

export default PostAddNew;
