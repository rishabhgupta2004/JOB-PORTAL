import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const controller = new AbortController(); // To cancel API request if unmounted

        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get("https://job-portal-8ku4.onrender.com/get", {
                    withCredentials: true,
                    signal: controller.signal, // Attach abort signal
                });

                console.log("API Response:", res.data); // Debugging

                if (res.data?.success && Array.isArray(res.data.application)) {
                    dispatch(setAllAppliedJobs(res.data.application));
                } else {
                    console.warn("Unexpected API response structure:", res.data);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching applied jobs:", error);
                }
            }
        };

        fetchAppliedJobs();

        return () => controller.abort(); // Cleanup on unmount
    }, [dispatch]); // Add dispatch to the dependency array

};

export default useGetAppliedJobs;
