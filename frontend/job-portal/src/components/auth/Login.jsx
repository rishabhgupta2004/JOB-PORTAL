import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: '',
        role: ''
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input);

        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/Login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Login Failed!');
        }
    };

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center h-screen bg-gray-100'>
                <form className='bg-white p-10 rounded-lg shadow-md w-1/2 my-10' onSubmit={handleSubmit}>
                    <h1 className='font-bold text-2xl text-center mb-6'>Login</h1>
                    <div className='mb-4'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            required
                        />
                    </div>
                    <div className='flex items-center justify-between mb-4'>
                        <RadioGroup className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="student"
                                    id="student"
                                    name="role"
                                    checked={input.role === 'student'}
                                    onClick={() => setInput({ ...input, role: 'student' })}
                                />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="recruiter"
                                    id="recruiter"
                                    name="role"
                                    checked={input.role === 'recruiter'}
                                    onClick={() => setInput({ ...input, role: 'recruiter' })}
                                />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button className='w-full' variant="destructive" type="submit">
                        Login
                    </Button>
                    <p className="text-center mt-4 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className='text-[#f83532] cursor-pointer font-semibold'>
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;
