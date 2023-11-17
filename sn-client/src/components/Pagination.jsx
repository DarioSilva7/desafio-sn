import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUsersAction } from "../services/actions";
import { loadUsers } from "../redux/userSlice";

// eslint-disable-next-line react/prop-types
export const Pagination = ({ pages }) => {
  const dispatch = useDispatch();

  let [currentPage, setCurrentPage] = useState(1);

  function Next() {
    setCurrentPage(++currentPage);
  }
  function back() {
    currentPage > 1 && setCurrentPage(--currentPage);
  }
  const handleClickPage = (page) => {
    setCurrentPage(page);
  };

  const getUsersAsync = async (currentPage) => {
    const users = await getUsersAction(currentPage);
    dispatch(loadUsers(users));
  };

  useEffect(() => {
    getUsersAsync(currentPage);
  }, [currentPage]);

  return (
    <div className="flex justify-center mt-10 bg-white rounded-lg font-[Poppins]">
      <button
        onClick={back}
        disabled={currentPage == 1}
        className={
          currentPage == 1
            ? "h-12 border-2 border-indigo-600 px-4 rounded-l-lg"
            : "h-12 border-2 border-indigo-600 px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white"
        }
      >
        <svg className="w-20 h-12 fill-current" viewBox="0 0 20 20">
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>

      {Array.from(Array(pages), (page, index) => {
        return (
          <button
            onClick={() => handleClickPage(index + 1)}
            key={index}
            className={`${
              currentPage === index + 1
                ? "bg-indigo-600 text-white"
                : "text-indigo-600 bg-transparent"
            } h-12 border border-indigo-600 px-4 rounded-lg mx-2`}
          >
            {index + 1}
          </button>
        );
      })}

      <button
        onClick={Next}
        disabled={currentPage === pages}
        className={
          currentPage === pages
            ? "h-12 border-2  border-indigo-600 px-4 rounded-r-lg"
            : "h-12 border-2  border-indigo-600 px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white"
        }
      >
        <svg className="w-20 h-12 fill-current" viewBox="0 0 20 20">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
