import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { toast } from '../components/import';
import { useForm } from 'react-hook-form';
import { metadata, postStatus } from '../utils/constant';
import { useState } from 'react';

function useImages(setValue, getValues) {
  const storage = getStorage();
  const [imageUpload, setImageUpload] = useState({
    progressBar: 0,
    imagePath: '',
  });

  useForm({
    defaultValues: {
      title: '',
      slug: '',
      status: postStatus.PENDING,
      category: '',
    },
  });

  const handleUploadImages = (image) => {
    const storageRef = ref(storage, 'images/' + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image, metadata);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUpload({ ...imageUpload, progressBar: progress });
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
        }
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((path) => {
          setImageUpload({ ...imageUpload, imagePath: path });
        });
      }
    );
  };

  const onSelectImages = (e) => {
    const image = e.target.files[0];
    if (!image) return;
    handleUploadImages(image);
    setValue('images', image.name);
  };

  const handleDeleteImg = () => {
    // Create a reference to the file to delete
    const imageRef = ref(storage, `images/${getValues('images')}`);

    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        toast.success('Delete file successfully');
        setImageUpload({ ...imageUpload, imagePath: '' });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return { onSelectImages, imageUpload, setImageUpload, handleDeleteImg };
}

export { useImages };
