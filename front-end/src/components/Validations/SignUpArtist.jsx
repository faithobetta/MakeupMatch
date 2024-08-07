import "../CSS-pages/SignUp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpArtist() {

  const navigate = useNavigate();
  const UserSchema = yup.object().shape({
    Name: yup.string().required("Name is Required!"),
    Email: yup.string().email().required(),
    Password: yup.string().min(4).max(10).required(),
    ConfirmPassword: yup.string().oneOf([yup.ref("Password"), null], "Passwords Don't Match").required(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(UserSchema)
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:5174/api/auth/signUpArtist', data);
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
        <input type="text" placeholder='Name:' {...register("Name")} /> <br />
        <p className="error-text">{errors.Name?.message}</p>

        <input type="email" placeholder='Email:' {...register("Email")} /> <br />
        <p className="error-text">{errors.Email?.message}</p>

        <input type="password" placeholder='Password:' {...register("Password")} /> <br />
        <p className="error-text">{errors.Password?.message}</p>

        <input type="password" placeholder='Confirm Password:' {...register("ConfirmPassword")} /> <br />
        <p className="error-text">{errors.ConfirmPassword?.message}</p>

        <input className="submit" type="submit" />
      </form>
    </div>
  )
}

export default SignUpArtist;
