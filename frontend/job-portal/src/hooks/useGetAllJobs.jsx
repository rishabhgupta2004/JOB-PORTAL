import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllJobs = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://job-portal-8ku4.onrender.com/get?keyword=${searchedQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllJobs();
    }, ); // ✅ Added searchedQuery as a dependency

    return { loading }; // ✅ Returning loading state (optional)
};

export default useGetAllJobs;
