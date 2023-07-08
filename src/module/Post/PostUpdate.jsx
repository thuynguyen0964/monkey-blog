import {
  Button,
  Radio,
  Label,
  Field,
  FieldCheck,
  Input,
} from '../../components/import';
import { postStatus } from '../../utils/constant';
import { Dropdown } from '../../components/Dropdown';
import ImagesUpload from '../../components/upload/ImagesUpload';
import DashboardHeading from '../DashBoard/DashBoardHeading';

import { useForm } from 'react-hook-form';
import { useImages } from '../../hooks/useImages';
import { useState } from 'react';
import { useEffect } from 'react';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Toggle from '../../components/toogle/Toggle';
import { useSearchParams } from 'react-router-dom';

const PostUpdate = () => {
  // global variable
  const [params] = useSearchParams();
  const postId = params.get('id');
  const colRef = doc(db, 'posts', postId);

  // state
  const [categoriesType, setCategoriesType] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');

  // react-hook-form
  const {
    formState: { isSubmitting },
    control,
    setValue,
    handleSubmit,
    watch,
    getValues,
    reset,
  } = useForm();
  const watchStatus = watch('status');
  const watchHot = watch('hot', false);

  // handle Update Form
  const updatePost = (values) => {
    console.log(values);
  };

  // upload file hooks
  const { handleDeleteImg, imageUpload, onSelectImages, setImageUpload } =
    useImages(setValue, getValues);

  // fill data post input
  const getSinglePost = async () => {
    const postDocument = await getDoc(colRef);
    const doc = postDocument.data();
    reset(doc);
    setCategoryTitle(doc?.category?.name);
    setImageUpload({ ...imageUpload, imagePath: doc?.imageStore });
  };

  // get categgory in DB with custom hook
  const getCategories = async () => {
    const cateArr = [];
    const q = query(collection(db, 'categories'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      cateArr.push({ id: doc.id, ...doc.data() });
    });
    setCategoriesType(cateArr);
  };

  // get option of category
  const handleGetOption = async (type) => {
    const colRef = doc(db, 'categories', type?.id);
    const docData = await getDoc(colRef);
    setValue('category', { id: docData.id, ...docData.data() });
    setCategoryTitle(type?.name);
  };

  // call function
  useEffect(() => {
    getCategories();
    getSinglePost();
  }, []);
  return (
    <section>
      <DashboardHeading title='Update post' desc={`Update post : ${postId}`} />
      <form onSubmit={handleSubmit(updatePost)} autoComplete='off'>
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
              read
              className='max-w-[500px]'
              control={control}
              placeholder='Your slug will auto follow your title'
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
          {isSubmitting ? 'Loading...' : 'Update Post'}
        </Button>
      </form>
    </section>
  );
};

export default PostUpdate;
