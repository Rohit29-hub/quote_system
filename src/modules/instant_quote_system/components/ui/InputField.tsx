import { useFormContext, RegisterOptions } from 'react-hook-form';

interface Option {
    value: string;
    label: string;
}

interface InputFieldProps {
    name: string;
    placeholder: string;
    type?: 'text' | 'number' | 'email' | 'select';
    options?: Option[];
    rules?: RegisterOptions;
}

const InputField = ({ name, placeholder, type = 'text', options = [], rules = {}, ...rest }: InputFieldProps) => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="w-full">
            {type === 'select' ? (
                <select
                    {...register(name, { required: 'This field is required', ...rules })}
                    className={`w-full p-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded`}
                    {...rest}
                >
                    <option value="">Select {placeholder}</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    {...register(name, { required: 'This field is required', ...rules })}
                    type={type}
                    placeholder={placeholder}
                    className={`w-full p-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded`}
                    {...rest}
                />
            )}
            {errors[name] && (
                <span className="text-red-500 text-sm">{errors[name]?.message as string}</span>
            )}
        </div>
    );
};

export default InputField;
