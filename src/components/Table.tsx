import React, { useEffect } from "react";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import { SyncLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUsers } from "../redux/usersSlice";

const Table: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);

  // Sends a request to the server
  const loadUsers = () => {
    dispatch(fetchUsers());
  };

  // Runs the function so that it doesn't change much
  useEffect(() => {
    loadUsers();
  }, []);

  const refreshUsers = () => {
    loadUsers();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <SyncLoader color="#87ab65" margin={6} size={30} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
              List
            </th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
              First name
            </th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
              Last name
            </th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
              E-mail
            </th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
              Phone number
            </th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
              Role
            </th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user: any, index: any) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">
                  {user.firstName}
                </td>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">
                  {user.lastName}
                </td>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">
                  {user.email}
                </td>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">
                  {user.phoneNumber}
                </td>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base">
                  {user.role}
                </td>
                <td className="flex gap-2 items-center justify-center py-2 px-4 border-b text-center">
                  <DeleteUser email={user.email} />
                  <EditUser
                    id={user._id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    role={user.role}
                    phoneNumber={user.phoneNumber}
                    refreshUsers={refreshUsers}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={7}
                className="py-2 px-4 text-center text-xs sm:text-base"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
