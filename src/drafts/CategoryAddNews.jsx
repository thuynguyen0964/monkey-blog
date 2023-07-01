import { Button, Field, Label, Input, Radio } from '../components/import';
import DashboardHeading from '../module/DashBoard/DashBoardHeading';
import { useForm } from 'react-hook-form';

const CategoryAddNew = () => {
  const { control, setValue, formState } = useForm();
  return (
    <div>
      <DashboardHeading
        title='New category'
        desc='Add new category'
      ></DashboardHeading>
      <form>
        <div className='form-layout'>
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name='name'
              placeholder='Enter your category name'
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name='slug'
              placeholder='Enter your slug'
            ></Input>
          </Field>
        </div>
        <div className='form-layout'>
          <Field>
            <Label>Status</Label>
            <div className='flex flex-wrap gap-x-5'>
              <Radio name='status' control={control} checked={true}>
                Approved
              </Radio>
              <Radio name='status' control={control}>
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button className='mx-auto'>Add category</Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
