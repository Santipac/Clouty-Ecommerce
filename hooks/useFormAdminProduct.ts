import React, { ChangeEvent, useState } from 'react';
import { CloutyApi } from '@/api';
import { FormData, ISize } from '@/interfaces';
import router, { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

export const useFormAdminProduct = (
  setValue: UseFormSetValue<FormData>,
  getValues: UseFormGetValues<FormData>
) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [newTagValue, setNewTagValue] = useState('');

  const onChangeSizes = (size: ISize) => {
    const currentSizes = getValues('sizes');
    if (currentSizes.includes(size)) {
      return setValue(
        'sizes',
        currentSizes.filter(s => s !== size),
        { shouldValidate: true }
      );
    }
    setValue('sizes', [...currentSizes, size], { shouldValidate: true });
  };

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue('');
    const currentTags = getValues('tags');
    if (currentTags.includes(newTag)) return;
    currentTags.push(newTag);
  };
  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues('tags').filter(t => t !== tag);
    setValue('tags', updatedTags, { shouldValidate: true });
  };

  const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) return;
    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await CloutyApi.post<{ message: string }>(
          '/admin/upload',
          formData
        );
        setValue('images', [...getValues('images'), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteImage = (image: string) => {
    setValue(
      'images',
      getValues('images').filter(img => img !== image),
      { shouldValidate: true }
    );
  };

  const onFormSubmit = async (form: FormData) => {
    if (form.images.length < 2) {
      return toast.error('You have to upload 2 images at least.');
    }
    setIsSaving(true);
    try {
      const { data } = await CloutyApi({
        url: '/admin/products',
        method: form._id ? 'PUT' : 'POST',
        data: form,
      });
      console.log({ data });
      if (!form._id) {
        router.replace(`/admin/products`);
      } else {
        setIsSaving(false);
        router.replace(`/admin/products`);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    newTagValue,
    setNewTagValue,
    onChangeSizes,
    onDeleteImage,
    onDeleteTag,
    onFileSelected,
    onFormSubmit,
    onNewTag,
  };
};
