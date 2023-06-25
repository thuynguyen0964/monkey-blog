import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button, Field, Input, Label, toast } from '../../components/import';
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, handleSubmit } = useForm();

  const handleAddNews = () => {
    toast.success('Add new post sucessfully');
  };

  return (
    <PostAddNewStyles>
      <h1 className='dashboard-heading'>Add new post</h1>
      <form onSubmit={handleSubmit(handleAddNews)}>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder='Enter your title'
              name='title'
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder='Enter your slug'
              name='slug'
            ></Input>
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Status</Label>
          </Field>
          <Field>
            <Label>Author</Label>
          </Field>
        </div>
        <div className='grid grid-cols-2 gap-x-10 mb-10'>
          <Field>
            <Label>Category</Label>
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
