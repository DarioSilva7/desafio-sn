import { useDispatch } from "react-redux";
import { updateImageAction } from "../services/actions";
import { useState } from "react";
import { upLoadFile } from "../firebase/uploadFile";
import { changeImageAsAdmin } from "../redux/userSlice";

// eslint-disable-next-line react/prop-types
export const ImageUpdateForm = ({ isAdmin, userId, img, className }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageLoaded = await upLoadFile(file, userId);
      const data = await updateImageAction(isAdmin, userId, imageLoaded);
      dispatch(changeImageAsAdmin({ image: data.data.image, userId }));
      alert(data.message);
    } catch (error) {
      console.log(
        "🚀 ~ file: ImageUpdateForm.jsx:17 ~ handleSubmit ~ error:",
        error
      );
      alert("Error al cargar imagen, intente mas tarde");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* TODO IMPLEMENTAR MULTER */}
      <img className={className} src={img} alt={"image"} />
      <input
        type="file"
        name="image"
        id="image"
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
        Send
      </button>
    </form>
  );
};
