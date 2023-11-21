import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

const typesWithList = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

export const upLoadFile = async (file, userId) => {
  if (!typesWithList.includes(file.type)) {
    throw new Error(
      "Tipo de archivo no admitido. Por el momento solo se permiten imágenes de tipo png, jpg, webp, jpeg."
    );
  }
  const storageRef = ref(storage, userId);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
