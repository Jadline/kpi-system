import ModeButton from '../../reusable-components/Button/Button'
import styles from './Account.module.css'
import {useForm} from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Account(){
    const navigate = useNavigate()
    const [signUp,setsignUp] = useState(true)
    const{register,getValues,reset,handleSubmit,formState} = useForm()
    const {errors} = formState
    function onhandleSubmit(data){
        console.log('data submited',data)
        if(signUp){
            setsignUp(false)
            reset()
        }
        else {
            navigate('/')
        }
    }
    return (
        <div className={styles.formContainer}>
          
        <form onSubmit={handleSubmit(onhandleSubmit)}>
        <h1>{!signUp ? 'Login' : 'Create Account'}</h1>
            {signUp && <div className={styles.labelContainer}>
                <label>Full Name</label>
                <input 
                type="text"
                id='name'
                {
                    ...register('name',{
                        required : 'This field is required'
                    })
                }
                />
                {errors.name && <p className={styles.errortag}>{errors?.name?.message}</p>}
            </div>}
            {signUp && <div className={styles.labelContainer}>
                <label>Username</label>
                <input 
                id='username'
                type='text'
                {
                    ...register('username',{
                        required: 'This field is required'
                    })
                }
                />
                 {errors.username && <p className={styles.errortag}>{errors?.username?.message}</p>}
            </div>}
            {signUp && <div className={styles.labelContainer}>
                <label>Role/Position</label>
                <input 
                id='role'
                type='text'
                {...register('role',{
                    required : 'This field is required'
                })}
                />
                 {errors.role && <p className={styles.errortag}>{errors?.role?.message}</p>}
            </div>}
            <div className={styles.labelContainer}>
                <label>Email</label>
                <input 
                id='email'
                type='email'
                {...register('email',{
                    required : 'This field is required'
                })}
                />
                 {errors.email && <p className={styles.errortag}>{errors?.email?.message}</p>}
            </div>
          <div className={styles.labelContainer}>
                <label>Password</label>
                <input 
                id='password'
                type='password'
                {...register('password',{
                    required : 'This field is required',
                    minLength : {
                        value : 8,
                        message : 'The password should be atleast 8 characters'
                    },
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                        message:
                            'Password must contain at least 1 uppercase letter, 1 number, and 1 special character',
                    },
                })}
                />
                 {errors.password && <p className={styles.errortag}>{errors?.password?.message}</p>}
            </div>
            { signUp && <div className={styles.labelContainer}>
                <label>
                    Confirm Password
                </label>
                <input 
                type='password'
                id='confirmpassword'
                {...register('confirmpassword',{
                    required: 'This field is required',
                    validate : (value) => value === getValues().password || 'The password does not match'
                })}
                />
                 {errors.confirmpassword && <p className={styles.errortag}>{errors?.confirmpassword?.message}</p>}
            </div>}
           <div className={styles.buttonContainer}>
            {/* <button onClick={(e) =>{
                e.preventDefault()
                setsignUp(false)
            }}>
                login
            </button> */}
             {!signUp && <p>Dont have an account? <span onClick={() => setsignUp(true)}>Sign Up</span></p>}
             {signUp && <p>Already have an account? <span onClick={() => setsignUp(false)}>Login</span></p>}
            {/* {!signUp && <p>Already have an account ?</p>} */}
           <button type='submit'>
                {!signUp ? 'Login' : 'Create Account'}
            </button>
           </div>
        </form>
        </div>
    )
}
export default Account