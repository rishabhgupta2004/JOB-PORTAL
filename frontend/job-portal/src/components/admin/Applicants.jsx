import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);

    useEffect(() => {
        const controller = new AbortController(); // Create an AbortController instance

        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`https://job-portal-8ku4.onrender.com/${id}/applicants`, {
                    withCredentials: true,
                    signal: controller.signal, // Attach the abort signal
                });

                if (res.data?.job) {
                    dispatch(setAllApplicants(res.data.job));
                } else {
                    console.warn("Unexpected API response structure:", res.data);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching applicants:", error);
                }
            }
        };

        if (id) fetchAllApplicants();

        return () => controller.abort(); // Cleanup: cancel request if component unmounts
    }, [id, dispatch]);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl my-5">
                    Applicants ({applicants?.applications?.length || 0})
                </h1>
                <ApplicantsTable applications={applicants?.applications || []} />
            </div>
        </div>
    );
};

export default Applicants;
