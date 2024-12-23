import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const getListOfUsers = async () => {
    try {
      const response = await axios.get("https://reqres.in/api/users");
      setUserList(response?.data?.data);
    } catch (err) {}
  };

  const onDelete = async () => {
    const response = await axios.delete("https://reqres.in/api/users/2");
  };

  useEffect(() => {
    getListOfUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">User Management</h1>
        <div className="flex items-center">
          <span className="mr-4">Elon Musk</span>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full">
            G
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Users</h2>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Input search text"
              className="border border-gray-300 rounded-l px-4 py-2"
            />
            <button className="border-t border-b border-r border-gray-300 bg-gray-100 px-4 py-2 rounded-r">
              🔍
            </button>
            <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded">
              Create User
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-4 text-left">Email</th>
                <th className="border border-gray-200 p-4 text-left">
                  First Name
                </th>
                <th className="border border-gray-200 p-4 text-left">
                  Last Name
                </th>
                <th className="border border-gray-200 p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList?.length &&
                userList?.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 p-4">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={`${user.first_name} ${user.last_name}`}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <a
                          href={`mailto:${user.email}`}
                          className="text-blue-600"
                        >
                          {user.email}
                        </a>
                      </div>
                    </td>
                    <td className="border border-gray-200 p-4">
                      {user.first_name}
                    </td>
                    <td className="border border-gray-200 p-4">
                      {user.last_name}
                    </td>
                    <td className="border border-gray-200 p-4">
                      <div className="flex space-x-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={onDelete}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center mt-4 space-x-2">
          <button className="border border-gray-300 bg-gray-100 px-3 py-1 rounded">
            &lt;
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className="border border-gray-300 px-3 py-1 rounded bg-white hover:bg-gray-200"
            >
              {page}
            </button>
          ))}
          <button className="border border-gray-300 bg-gray-100 px-3 py-1 rounded">
            &gt;
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserList;
