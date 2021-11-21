import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Collection } from '@/api/wallpapers/collections';
import FieldHint from '@/components/form/FieldHint';
import { CollectionsContext } from '@/providers';
import FeatherIcon from '@/components/icon/FeatherIcon';
import CircleButton from '@/components/form/CircleButton';
import Card from '@/components/container/Card';

interface CreationFormData {
  name: string;
}

const NAME_ERRORS: Record<string, string> = {
  required: 'Please enter a collection name',
  maxLength: 'The collection name must be short than 50 characters',
};

export default function NewCollectionBlock() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setFocus,
    formState: { errors },
  } = useForm();
  const collections = useContext(CollectionsContext);

  if (errors && Object.keys(errors).length > 0) {
    console.error('New collection creation form error: ', errors);
  }

  async function onSubmit(data: CreationFormData) {
    const newCollection: Collection = {
      name: data.name,
      images: [],
    };
    await collections.create(newCollection);
    reset();
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      setFocus('name');
    } else {
      clearErrors();
    }
  }, [isEditing]);

  return (
    <Card onClick={isEditing ? undefined : () => setIsEditing(true)}>
      {!isEditing ? (
        <>
          <FeatherIcon icon="plus" />
          <div className="text-center mt-2">New collection</div>
        </>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={classNames(
            'flex-1 flex flex-col justify-center items-stretch gap-4 pb-0 p-4'
          )}
        >
          <input
            placeholder="Collection Name"
            {...register('name', { required: true, maxLength: 50 })}
          />
          {
            // FIXME: show in somewhere that do not affect the layout.
            // ex. tooltip, alert box, etc.
            errors.name && (
              <FieldHint type="error" message={NAME_ERRORS[errors.name.type]} />
            )
          }
          <div className="flex flex-row-reverse justify-between">
            <CircleButton type="submit" className="text-green-800">
              <FeatherIcon icon="check" />
            </CircleButton>
            <CircleButton
              type="button"
              className="text-gray-600"
              onClick={() => setIsEditing(false)}
            >
              <FeatherIcon icon="x" />
            </CircleButton>
          </div>
        </form>
      )}
    </Card>
  );
}
