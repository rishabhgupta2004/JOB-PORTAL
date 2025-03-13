import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!companyId) return; // Prevent unnecessary API calls

        const controller = new AbortController(); // Initialize abort controller

        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
                    withCredentials: true,
                    signal: controller.signal, // Attach abort signal
                });

                console.log("Fetched company:", res.data.company);

                if (res.data?.success && res.data.company) {
                    dispatch(setSingleCompany(res.data.company));
                } else {
                    console.warn("Unexpected API response:", res.data);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching company details:", error);
                }
            }
        };

        fetchSingleCompany();

        return () => controller.abort(); // Cleanup: cancel API request on unmount
    }, [companyId, dispatch]); // Run effect only when `companyId` changes

};

export default useGetCompanyById;
