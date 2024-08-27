import "../CSS-pages/SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpArtist() {
  const navigate = useNavigate();

  // Update schema to match field names
  const UserSchema = yup.object().shape({
    name: yup.string().required("Name is required!"),
    email: yup.string().email("Invalid email format").required("Email is required!"),
    password: yup.string().min(4, "Password must be at least 4 characters").max(10, "Password must be at most 10 characters").required("Password is required!"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password"), null], "Passwords don't match")
      .required("Confirm Password is required!"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(UserSchema)
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Adjusted the API request to use the provided field names
      const response = await axios.post('http://localhost:5174/api/auth/signUpArtist', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (response.status === 201) {
        console.log('Artist created successfully:', response.data);
        navigate(`/artist-dashboard/${response.data.artistId}`);
      } else {
        console.error('Error:', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signUp-home">
      <h2>Sign Up as Makeup Artist</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="input-signup" type="text" placeholder='Name:' {...register("name")} /> <br />
        <p className="error-text">{errors.name?.message}</p>

        <input className="input-signup" type="email" placeholder='Email:' {...register("email")} /> <br />
        <p className="error-text">{errors.email?.message}</p>

        <input className="input-signup" type="password" placeholder='Password:' {...register("password")} /> <br />
        <p className="error-text">{errors.password?.message}</p>

        <input className="input-signup" type="password" placeholder='Confirm Password:' {...register("confirmPassword")} /> <br />
        <p className="error-text">{errors.confirmPassword?.message}</p>

        <input className="submit" type="submit" />
      </form>
    </div>
  );
}

export default SignUpArtist;
