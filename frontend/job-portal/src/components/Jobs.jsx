import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';

const Jobs = () => {
    const { allJobs } = useSelector(store => store.job);

    // ✅ Define state for search query and filtered jobs
    const [searchedQuery, setSearchedQuery] = useState("");
    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        // ✅ Ensure `searchedQuery` exists before filtering
        if (searchedQuery.trim()) {
            const filteredJobs = allJobs.filter((job) =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            );
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]); // ✅ Add searchedQuery as dependency

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {
                            filterJobs.length === 0 ? (
                                <span>Job not found</span>
                            ) : (
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <Job key={job._id} job={job} /> // ✅ Pass job as a prop
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
