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

const Signup = () => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: '',
        file: ''
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input);
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('password', input.password);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('role', input.role);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {
                navigate('/login');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Signup Error:', error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center h-screen bg-gray-100'>
                <form className='bg-white p-10 rounded-lg shadow-md w-1/2 my-10' onSubmit={handleSubmit}>
                    <h1 className='font-bold text-2xl text-center mb-6'>Signup</h1>
                    <div className='mb-4'>
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter Full Name"
                            name="fullname"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            required
                        />
                    </div>
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
                    <div className='mb-4'>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            type="number"
                            placeholder="Enter Phone Number"
                            name="phoneNumber"
                            value={input.phoneNumber}
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
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    <Button className='w-full' variant="destructive" type="submit">
                        Signup
                    </Button>
                    <p className='text-center mt-4 text-sm'>
                        Already have an account?{' '}
                        <Link to="/login" className='text-[#f83532] cursor-pointer'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Signup;
