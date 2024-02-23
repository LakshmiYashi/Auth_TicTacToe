import React ,{ useState }  from "react";
import styles from "./Register.module.css";
import { Link , useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import config from "../../config";
import CancelIcon from "@material-ui/icons/Cancel";


const Register = () => {
    const { register, handleSubmit,formState: { errors }} = useForm();
    const [message, setMessage] = useState();
    const history = useHistory();

    const onSubmit = (data,e) => {
        setMessage({
            data: "Registration is in progress...",
            type: "alert-warning",
          });
          fetch(`${config.baseUrl}/user/register`,{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((res) => res.json())
          .then((data) => {
            const hasError = "error" in data && data.error != null;
            setMessage({
              data: hasError ? data.error : "Registered successfully",
              type: hasError ? "alert-danger" : "alert-success",
            });

            !hasError &&
            setTimeout(() => {
              localStorage.setItem("token", data.token);
              history.push("/game");
            }, 3000);
             !hasError && e.target.reset();
          });
      };

    return (
        <div className={styles.container}>
        {message && (
          <div
            className={ styles.alertBox }
            role="alert"
          >
            {message.data}
            <CancelIcon className={styles.cancel} onClick={() => setMessage(null)} />
           
          </div>
        )}
          <h1>
         Sign Up
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          
            <input
              name="email"
              placeholder="Email"
              type="email"
              {...register("email",{
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Enter a valid email address",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 255 characters are allowed",
                  },
                })}
            />
             {errors.email && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.email.message}
                </span>
              )}
             <input 
           name ="password"
           placeholder ="Password" 
           type ="password"
            {...register("password",{
                  required: {
                    value: true,
                    message: "Please enter your password",
                  },
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters are allowed",
                  },
                  maxLength: {
                    value: 255,
                    message: "Maximum 1024 characters are allowed",
                  },
                })}
           />
           {errors.password && (
                <span className={`${styles.errorMessage} mandatory`}>
                  {errors.password.message}
                </span>
              )}
            <button>Submit</button>
            <button> <Link to ="/login" className ={styles.login} >Log In</Link></button>
          </form>
        </div>
      );
}

export default Register;