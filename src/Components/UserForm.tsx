import { useForm } from "react-hook-form";
import styles from "./Login/login.module.css";
import { useEffect } from "react";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  isLoading?: boolean;
  defaultValues?: UserFormData;
  showSubmitButton?: boolean; 
}

export function UserForm({ onSubmit, isLoading, defaultValues, showSubmitButton = true }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>();

  // Reset form with default values when they change
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form className="m-3 m-md-5 shadow-lg p-3 p-md-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="row py-2">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <label htmlFor="username" className={styles.label}>
            First Name
          </label>
          <input
            id="firstname"
            type="text"
            className={`${styles.formInput} form-control`}
            placeholder="Enter your First Name"
            {...register("firstName", {
              required: "firstName is required",
            })}
          />
          {errors.firstName && (
            <span className="text-danger small d-block mt-1">{errors.firstName.message}</span>
          )}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            className={`${styles.formInput} form-control`}
            placeholder="Enter your Last Name"
            {...register("lastName", { required: "lastName is required" })}
          />
          {errors.lastName && (
            <span className="text-danger small d-block mt-1">{errors.lastName.message}</span>
          )}
        </div>
      </div>

      <div className="row py-2">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`${styles.formInput} form-control`}
            placeholder="Enter your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-danger small d-block mt-1">{errors.email.message}</span>
          )}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="age" className={styles.label}>
            Age
          </label>
          <input
            id="age"
            type="number"
            className={`${styles.formInput} form-control`}
            placeholder="Enter your age"
            {...register("age", {
              required: "Age is required",
              max: { value: 55, message: "max age is 55" },
            })}
          />
          {errors.age && (
            <span className="text-danger small d-block mt-1">{errors.age.message}</span>
          )}
        </div>
      </div>

      <div className="row py-2">
        <div className="col-12 col-md-6 mb-3 mb-md-0">
          <label htmlFor="phone" className={styles.label}>
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className={`${styles.formInput} form-control`}
            placeholder="Enter your phone number"
            {...register("phone", { required: "phone is required" })}
          />
          {errors.phone && (
            <span className="text-danger small d-block mt-1">{errors.phone.message}</span>
          )}
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="birthDate" className={styles.label}>
            Birth Date
          </label>
          <input
            id="birthDate"
            type="date"
            className={`${styles.formInput} form-control`}
            placeholder="Enter your Date of Birth"
            {...register("birthDate", {
              required: "birthDate is required",
            })}
          />
          {errors.birthDate && (
            <span className="text-danger small d-block mt-1">{errors.birthDate.message}</span>
          )}
        </div>
      </div>
       
      {showSubmitButton && (
        <div className="my-3 my-md-5 text-center">
          <button 
            className="btn btn-warning w-100 w-md-50 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}
    </form>
  );
}