import './register.scss';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';
import {request} from '../../utils/request';

const schema = yup
  .object({
    name: yup.string().required('Name Is Required'),
    email: yup.string().email().required('Email Is Required'),
    password: yup.string().min(8).required('Password Is Required'),
    isSeller: yup
      .string()
      .oneOf(['true', 'false'], 'Please Select Any Option')
      .required('Please Select Any Option'),
  })
  .required();

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await request.post('/auth/signup', data);
      navigate('/login');
      reset();
    } catch (error) {
      setErr(true);
      setMsg(error.response.data.message);
      console.log(error.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <h1>Register</h1>
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Name" {...register('name')} />
            {errors.name && <p>{errors.name?.message}</p>}

            <input type="text" placeholder="Email" {...register('email')} />
            {errors.email && <p>{errors.email?.message}</p>}
            <input
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && <p>{errors.password?.message}</p>}
            <select {...register('isSeller')}>
              <option value="">Select Account Type</option>
              <option value={false}>Buyer</option>
              <option value={true}>Seller</option>
            </select>
            {errors.isSeller && <p>{errors.isSeller?.message}</p>}
            <button>Register</button>
          </form>
          {err && <div className="error">{msg}</div>}
          <Link to="/login" style={{textDecoration: 'none', color: 'inherit'}}>
            <span>Do you have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
