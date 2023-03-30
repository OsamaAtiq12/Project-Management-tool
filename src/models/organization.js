import mongoose from "mongoose";
import { hash, compare } from "bcryptjs";

// create the organizationSchema
const organizationSchema = new mongoose.Schema({
   
    Logo: String,
    OrganizationName: {
        type: String,
        validate: {
            validator: OrganizationName => Organization.doesntExist({ OrganizationName }),
            message: ({ value: OrganizationName }) => `Organization name has been taken.`
        }
    },

    OrganizationDomain: {
        type: String,
        validate: {
            validator: OrganizationDomain => Organization.doesntExist({ OrganizationDomain }),
            message: ({ value: OrganizationDomain }) => `Organization domain has been taken.`
        }
    },
    OrganizationDescription: String,
    Roles: [
        {
          Rolename :{ type: String, required: true },
          isDisabled: { type: Boolean, required: true , default:false },
        }
        ],
    
}, { timestamps: true });

organizationSchema.pre("save", async function () {
    if (this.isModified("Password")) {
        this.Password = await hash(this.Password, 10);
    }
});

organizationSchema.methods.matchesPassword = function (Password) {
    return compare(Password, this.Password);
};

organizationSchema.statics.doesntExist = async function (option) {
    return (await this.where(option).countDocuments()) === 0;
};

// make this schema available to the Node application
const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;
