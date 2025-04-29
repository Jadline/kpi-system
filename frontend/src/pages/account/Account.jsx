import ModeButton from '../../reusable-components/Button/Button';
import styles from './Account.module.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateAccount } from '../../Services/apiAccount';
import { useMutation } from '@tanstack/react-query';
import { useUser } from '../../context/user-Context';
import toast from 'react-hot-toast';
import { getInitials } from '../../helpers/initials';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Account() {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const [signUp, setSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, getValues, reset, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => CreateAccount(data, signUp),
    onSuccess: (data) => {
      toast.success(signUp ? "Account created successfully!" : "Login successful!");

      const userWithInitials = {
        ...data.user,
        initials: getInitials(data.user.full_name)
      };
      setUserData(userWithInitials);

      if (signUp) {
        setSignUp(false);
        reset();
      } else {
        navigate('/');
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(error?.response?.data?.message || "Wrong Password or Email. Please try again.");
    }
  });

  function onHandleSubmit(data) {
    const { confirmpassword, ...cleanData } = data;
    mutate(cleanData);
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <h1>{signUp ? 'Create An Account' : 'Login'}</h1>

      
        {signUp && (
          <div className={styles.labelContainer}>
            <label>Full Name</label>
            <input
              type="text"
              id="name"
              {...register('full_name', { required: 'This field is required' })}
            />
            {errors.full_name && <p className={styles.errortag}>{errors.full_name.message}</p>}
          </div>
        )}

      
        {signUp && (
          <div className={styles.labelContainer}>
            <label>Username</label>
            <input
              id="username"
              type="text"
              {...register('username', { required: 'This field is required' })}
            />
            {errors.username && <p className={styles.errortag}>{errors.username.message}</p>}
          </div>
        )}

       
        {signUp && (
          <div className={styles.labelContainer}>
            <label>Role/Position</label>
            <input
              id="role"
              type="text"
              {...register('role', { required: 'This field is required' })}
            />
            {errors.role && <p className={styles.errortag}>{errors.role.message}</p>}
          </div>
        )}

      
        <div className={styles.labelContainer}>
          <label>Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'This field is required' })}
          />
          {errors.email && <p className={styles.errortag}>{errors.email.message}</p>}
        </div>

       
        <div className={styles.labelContainer} style={{ position: 'relative' }}>
          <label>Password</label>
          <div className={styles.inputWrapper}>
    <input
      id="password"
      type={showPassword ? 'text' : 'password'}
      {...register('password', signUp ? {
        required: 'This field is required',
        minLength: {
          value: 4,
          message: 'The password should be at least 4 characters'
        },
        pattern: {
          value: /^[0-9]+$/,
          message: 'Password must contain only numbers'
        }
      } : {
        required: 'This field is required'
      })}
    />
    <button
      type="button"
      onClick={() => setShowPassword(prev => !prev)}
      className={styles.eyeButton}
    >
      {showPassword ? <FaEye /> : <FaEyeSlash />}
    </button>
  </div>
          {errors.password && <p className={styles.errortag}>{errors.password.message}</p>}
        </div>

      
        {signUp && (
          <div className={styles.labelContainer} style={{ position: 'relative' }}>
            <label>Confirm Password</label>
            <div className={styles.inputWrapper}>
      <input
        id="confirmpassword"
        type={showConfirmPassword ? 'text' : 'password'}
        {...register('confirmpassword', {
          required: 'This field is required',
          validate: (value) => value === getValues().password || 'The password does not match'
        })}
      />
      <button
        type="button"
        onClick={() => setShowConfirmPassword(prev => !prev)}
        className={styles.eyeButton}
      >
        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
            {errors.confirmpassword && <p className={styles.errortag}>{errors.confirmpassword.message}</p>}
          </div>
        )}

      
        <div className={styles.buttonContainer}>
          <p>
            {signUp ? (
              <>
                Already have an account?{' '}
                <span onClick={
                  () => {
                    setSignUp(false);
                    reset()
                  }
                  
                }>Login</span>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <span onClick={() => {
                  setSignUp(true)
                  reset()
                }}>Sign Up</span>
              </>
            )}
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className={isLoading ? 'loadingButton' : ''}
          >
            {isLoading
              ? (signUp ? 'Creating Account...' : 'Logging in...')
              : (signUp ? 'Create Account' : 'Login')}
          </button>
        </div>

      </form>
    </div>
  );
}

export default Account;
