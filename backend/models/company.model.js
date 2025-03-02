import mongoose from "mongoose"; // Removed {mongoose} as it's not needed

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    website: {
        type: String,
        
    },
    location: {
        type: String,
       
    },
    logo: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    }
}, { timestamps: true }); 

export const Company = mongoose.model("Company", companySchema); 