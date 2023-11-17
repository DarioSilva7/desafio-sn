import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const upLoadFile = async (file, userId) => {
  const storageRef = ref(storage, userId);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
