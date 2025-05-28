import { useForm } from 'react-hook-form';
import styles from './login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface LoginFormInputs {
  username: string;
  password: string;
}

export default function Login() {
  const { saveUserData } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log("Submitted data:", data);

      const response = await axios.post('https://dummyjson.com/auth/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        localStorage.setItem("userToken", response?.data?.accessToken);
        saveUserData();
        toast.success("You have successfully logged in");
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error?.response?.data || error.message);
      toast.warning("Login failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid login-container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-5 bg-white p-4 rounded">
          <div className="mb-4">
            <h3 className={styles.title}>User Management System</h3>
            <h4 className={`${styles.subTitle} text-center text-uppercase pt-3`}>Sign In</h4>
            <h5 className={`${styles.desc} text-center`}>Enter your credentials to access your account</h5>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 text-start">
              <label htmlFor="username" className={styles.label}>User Name</label>
              <input
                id="username"
                type="text"
                className={`${styles.formInput} form-control`}
                placeholder="Enter your username"
                {...register('username', { required: 'Username is required' })}
              />
              {errors.username && <span className='text-danger'>{errors.username.message}</span>}
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                id="password"
                type="password"
                className={`${styles.formInput} form-control`}
                placeholder="Enter your password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <span className='text-danger'>{errors.password.message}</span>}
            </div>

    </div>
  );
}
