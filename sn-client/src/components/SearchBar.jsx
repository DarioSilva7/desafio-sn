import { useDispatch } from "react-redux";
import { useForm } from "../hooks/useForm";
import { loadUsers, setMessages } from "../redux/userSlice";
import { getUsersAction } from "../services/actions";

export const SearchBar = () => {
  const dispatch = useDispatch();

  let { first_name, onInputChange } = useForm({});

  const handleSearchClick = async () => {
    const users = await getUsersAction(1, { first_name });
    dispatch(setMessages([{ msg: `${users.qtyUsers} usuarios encontrados` }]));
    dispatch(loadUsers(users));
  };

  const handleAllUsersClick = async () => {
    const users = await getUsersAction(1);
    dispatch(setMessages([{ msg: `${users.qtyUsers} usuarios encontrados` }]));
    dispatch(loadUsers(users));
  };

  return (
    <div className="flex flex-col px-6 py-4" data-headlessui-state="open">
      <label
        className="lu awa awe awp axv"
        id="headlessui-combobox-label-1"
        data-headlessui-state="open"
      >
        Search user
      </label>
      <div className="ab lb">
        <input
          className="tn adu afa alo arq atm atw axv bbn bbt bbx bcf bne bnf bnr cid cif"
          id="headlessui-combobox-input-2"
          role="combobox"
          type="text"
          aria-expanded="true"
          aria-autocomplete="list"
          data-headlessui-state="open"
          name="first_name"
          value={first_name}
          placeholder="Firstname"
          aria-labelledby="headlessui-combobox-label-1"
          aria-controls="headlessui-combobox-options-56"
          onChange={onInputChange}
        />
        <button
          onClick={handleSearchClick}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Search
        </button>
        <button
          onClick={handleAllUsersClick}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          All users
        </button>
      </div>
    </div>
  );
};
