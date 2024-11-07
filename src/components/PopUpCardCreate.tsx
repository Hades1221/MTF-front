import React, { useRef, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { firstNameValidation, lastNameValidation, roleValidation, emailValidation, phoneValidation } from '../validation/userValidation';
import { createUser } from '../server/app';

interface CardProps {
  onClose: () => void;
  onUserCreated: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: string;
};

const PopUpCardCreate: React.FC<CardProps> = ({ onClose, onUserCreated }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, onClose]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const result = await createUser(data);
      console.log('User created successfully:', result);
      onUserCreated();
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/^\s+/, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/[^A-Za-z\s]/g, '');
  };

  const handleBlur = (fieldName: keyof FormData) => (e: React.FocusEvent<HTMLInputElement>) => {
    const trimmedValue = e.target.value.trim();
    setValue(fieldName, trimmedValue);
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/\D/g, '')
      .slice(0, 10);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Create New User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <div className="flex flex-col space-y-2">
            <label htmlFor="firstName" className="text-gray-600">First Name</label>
            <input
              id="firstName"
              {...register('firstName', firstNameValidation)}
              placeholder="First name"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              onInput={handleNameInput}
              onBlur={handleBlur('firstName')}
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="lastName" className="text-gray-600">Last Name</label>
            <input
              id="lastName"
              {...register('lastName', lastNameValidation)}
              placeholder="Last name"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              onInput={handleNameInput}
              onBlur={handleBlur('lastName')}
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="role" className="text-gray-600">Role</label>
            <div className="relative">
              <select
                id="role"
                {...register('role', roleValidation)}
                className="appearance-none border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-gray-600">Email</label>
            <input
              id="email"
              type="text"
              {...register('email', emailValidation)}
              placeholder="Email"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="phoneNumber" className="text-gray-600">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              {...register('phoneNumber', {
                ...phoneValidation,
                validate: (value) => value.length === 10 || 'Phone number must be exactly 10 digits',
              })}
              placeholder="Phone number"
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              onInput={handlePhoneInput}
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <button type="button" onClick={onClose} className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors w-full sm:w-auto">
              Cancel
            </button>
            <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition-colors w-full sm:w-auto">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpCardCreate;