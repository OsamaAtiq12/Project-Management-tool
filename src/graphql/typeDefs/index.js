import user from "./user";
// import designation from "./designation";
import organization from "./organization";
import project from "./project";
import root from "./root";
import role from "./role";
const { userType } = require("./types/user");
const { projectType } = require("./types/project");
const { organizationType } = require("./types/organization");
// const { designationType } = require("./types/designation");
const { assignProjectType } = require("./types/assignProject")
const { projectRoleType } = require("./types/assignProjectRole")
const {RoleType}= require("./types/role")
export default [
    user, userType,
    // designation, designationType,
    organization, organizationType,
    project, projectType,
    role,RoleType,
    assignProjectType, projectRoleType,
    root
];
