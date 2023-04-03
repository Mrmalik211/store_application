import './login.scss';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Link, Navigate, useNavigate} from 'react-router-dom';

import {useDispatch} from 'react-redux';
import {loginFailure, loginStart, loginSuccess} from '../../redux/userSlice';

import {request} from '../../utils/request';

const schema = yup
  .object({
    name: yup.string().required('Name Is Required'),
    password: yup.string().required('Password Is Required'),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState(false);

  const onSubmit = async (data) => {
    dispatch(loginStart());
    try {
      const res = await request.post('/auth/signin', data);
      dispatch(loginSuccess(res.data));
      navigate('/');
      reset();
    } catch (error) {
      dispatch(loginFailure());
      setErr(true);
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="username" {...register('name')} />
          {errors.name && <p>{errors.name?.message}</p>}
          <input
            type="password"
            placeholder="password"
            {...register('password')}
          />
          {errors.password && <p>{errors.password?.message}</p>}
          <button>Login</button>
        </form>
        {err && <div className="error">Invalid Username & Password</div>}
        <Link to="/register" style={{textDecoration: 'none', color: 'inherit'}}>
          <span>Don't have an account?</span>
        </Link>
      </div>
    </div>
  );
}

export default Login;
