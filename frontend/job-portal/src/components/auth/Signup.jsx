import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
    file: null,
  });
  
  const { loading,user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error('File size should be less than 2MB');
    } else {
      setInput({ ...input, file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.role) {
      toast.error('Please select your role');
      return;
    }

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email.toLowerCase());
    formData.append('password', input.password);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('role', input.role);
    if (input.file) formData.append('file', input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post("https://job-portal-8ku4.onrender.com/api/v1/user/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(()=>{
          if(user){
              navigate("/")
          }
  
      },[])

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <form className='bg-white p-10 rounded-lg shadow-md w-1/2 my-10' onSubmit={handleSubmit}>
          <h1 className='font-bold text-2xl text-center mb-6'>Signup</h1>
          <div className='mb-4'>
            <Label htmlFor='fullname'>Full Name</Label>
            <Input type='text' name='fullname' placeholder='Enter Full Name' value={input.fullname} onChange={changeEventHandler} required />
          </div>

          <div className='mb-4'>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' name='email' placeholder='Enter Email' value={input.email} onChange={changeEventHandler} required />
          </div>

          <div className='mb-4'>
            <Label htmlFor='password'>Password</Label>
            <Input type='password' name='password' placeholder='Enter Password' value={input.password} onChange={changeEventHandler} required />
          </div>

          <div className='mb-4'>
            <Label htmlFor='phoneNumber'>Phone Number</Label>
            <Input type='number' name='phoneNumber' placeholder='Enter Phone Number' value={input.phoneNumber} onChange={changeEventHandler} required />
          </div>

          <RadioGroup className='flex items-center space-x-4 mb-4'>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='student' name='role' checked={input.role === 'student'} onClick={() => setInput({ ...input, role: 'student' })} />
              <Label htmlFor='student'>Student</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='recruiter' name='role' checked={input.role === 'recruiter'} onClick={() => setInput({ ...input, role: 'recruiter' })} />
              <Label htmlFor='recruiter'>Recruiter</Label>
              <div className='mb-4'>
            <Label>Profile Picture</Label>
            <Input type='file' accept='image/*' onChange={changeFileHandler} />
          </div>
            </div>
          </RadioGroup>

         

          <Button type='submit' disabled={loading} className='w-full'>
            {loading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait...</> : 'Signup'}
          </Button>

          <p className='text-center mt-4 text-sm'>
            Already have an account?{' '}
            <Link to='/login' className='text-[#f83532]'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
