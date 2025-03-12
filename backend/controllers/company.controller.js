import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company name already exists",
                success: false
            });
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company created successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies.length) {
            return res.status(400).json({
                message: "No company found",
                success: false
            });
        }
        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const updateData = { name, description, website, location };

        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                updateData.logo = cloudResponse.secure_url; // Update logo if uploaded
            } catch (cloudError) {
                return res.status(500).json({
                    message: "Error uploading logo",
                    success: false,
                    error: cloudError.message
                });
            }
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully",
            company,
            success: true
        });

    } catch (error) {
        console.error("Update Company Error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

