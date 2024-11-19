import { useForm } from 'react-hook-form';
import { FormSchema, FormField } from '../types/schema';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface DynamicFormProps {
  schema: FormSchema;
}

export function DynamicForm({ schema }: DynamicFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      console.log('Form submitted:', data);
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Error submitting form');
    }
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      ...register(field.id, {
        required: field.required ? 'This field is required' : false,
        pattern: field.validation
          ? {
              value: new RegExp(field.validation.pattern),
              message: field.validation.message,
            }
          : undefined,
      }),
      className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        errors[field.id] ? 'border-red-500' : 'border-gray-300'
      }`,
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option.value}
                  {...register(field.id, { required: field.required })}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
            className={`${commonProps.className} resize-none`}
          />
        );

      default:
        return <input type={field.type} {...commonProps} />;
    }
  };

  return (
    <div className="h-full overflow-auto bg-white">
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{schema.formTitle}</h1>
        <p className="text-gray-600 mb-8">{schema.formDescription}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {schema.fields.map((field) => (
            <div key={field.id}>
              <label className="block mb-2">
                <span className="text-gray-700 font-medium">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
              {renderField(field)}
              {errors[field.id] && (
                <p className="mt-1 text-sm text-red-500">
                  {errors[field.id]?.message as string}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Check className="animate-spin h-5 w-5" />
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
export default DynamicForm;