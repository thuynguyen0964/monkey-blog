/* eslint-disable no-unused-vars */
import React from 'react';
import { useSearchParams } from 'react-router-dom';
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

const CategoryUpdate = () => {
  const [params] = useSearchParams();
  const name = params.get('name');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = useForm();
  const watchStatus = watch('status');
  const handleChangeCategories = () => {
    toast.success('Change category successfully!!');
  };
  return (
    <>
      <DashboardHeading
        title='Update Categories'
        desc={`Update your categories name : ${name}`}
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
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className='mx-auto'
        >
          Change category
        </Button>
      </form>
    </>
  );
};

export default CategoryUpdate;
