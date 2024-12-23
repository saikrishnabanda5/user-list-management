import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { FetchUserList, Removeuser } from "../Redux/Action";
import EditUserModal from "./EditUserModal";
import CreateUserModal from "./CreateUser";
import { useNavigate } from "react-router-dom";

const Userlisting = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [createUserModal, setCreateUserModal] = useState(false);
  const [activeUser, setActiveUser] = useState(0);
  const navigate = useNavigate();

  function editUser(id) {
    setActiveUser(id);
    setModalShow(true);
  }

  useEffect(() => {
    props.loaduser();
  }, []);

  const handledelete = (code) => {
    if (window.confirm("Do you want to remove?")) {
      props.removeuser(code);
      props.loaduser();
      toast.success("User removed successfully.");
      navigate(0);
    }
  };

  return props.user.loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : props.user.errmessage ? (
    <div>
      <h2>{props.user.errmessage}</h2>
    </div>
  ) : (
    <div>
      <div className="card">
        <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">User Management</h1>
          <div className="flex items-center">
            <span className="mr-4">User</span>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">
              G
            </button>
          </div>
        </header>
        <div className="card-header">
          <button
            className="btn btn-success"
            onClick={() => setCreateUserModal(true)}
          >
            Create User
          </button>

          {createUserModal && (
            <CreateUserModal
              show={createUserModal}
              onHide={() => setCreateUserModal(false)}
            />
          )}
        </div>
        <div className="card-body">
          <table className="table table-bordered">
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
              {props.user.userlist &&
                props.user.userlist.map((user) => (
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
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() => editUser(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => {
                            handledelete(user.id);
                          }}
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
      </div>
      {modalShow && (
        <EditUserModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          activeUser={activeUser}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loaduser: () => dispatch(FetchUserList()),
    removeuser: (code) => dispatch(Removeuser(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);
