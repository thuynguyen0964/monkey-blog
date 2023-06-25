import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button, Field, Input, Label, Radio } from '../../components/import';
import { Dropdown } from '../../components/Dropdown';
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, setValue } = useForm({
    defaultValues: {
      status: '',
      category: '',
    },
  });

  const watchStatus = watch('status');
  // eslint-disable-next-line no-unused-vars
  const watchCategory = watch('category');

  return (
    <PostAddNewStyles>
      <h1 className='dashboard-heading'>Add new post</h1>
      <form>
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
                checked={watchStatus === 'approved'}
                onClick={() => setValue('status', 'approved')}
                value='approved'
              >
                Approved
              </Radio>
              <Radio
                name='status'
                control={control}
                checked={watchStatus === 'pending'}
                onClick={() => setValue('status', 'pending')}
                value='pending'
              >
                Pending
              </Radio>
              <Radio
                name='status'
                control={control}
                checked={watchStatus === 'reject'}
                onClick={() => setValue('status', 'reject')}
                value='reject'
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
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
          <Field></Field>
        </div>
        <Button type='submit' className='mx-auto'>
          Add Post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
