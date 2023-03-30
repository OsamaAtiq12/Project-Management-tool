import { ApolloError } from "apollo-server";

export function validateImage(image) {
    const fileTypes = ["png", "jpg", "jpeg", "webp"];
    const ImageName = image.split(".")
    const fileExtention = ImageName[ImageName.length - 1]
    if (!fileTypes.includes(fileExtention.trim().toLowerCase())) {
        throw new ApolloError("Invalid Profile image, only ['png', 'jpg', 'jpeg', 'webp'] file types are allowed.")
    }
}