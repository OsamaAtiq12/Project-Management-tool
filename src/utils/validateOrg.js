export function validateOrg(context) {
    if (context.user) {
        if (context.user.type) {
            if (context.user.type === "org") { return true; }
        }
    }
    return false;
}