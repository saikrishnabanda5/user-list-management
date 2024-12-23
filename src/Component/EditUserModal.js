import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FunctionUpdateUser } from "../Redux/Action";

function EditUserModal({ show, onHide, activeUser }) {
  const [id, idchange] = useState(0);
  const [first_name, firstNameChange] = useState(activeUser?.first_name);
  const [email, emailchange] = useState(activeUser?.email);
  const [last_name, lastNameChange] = useState(activeUser?.last_name);
  const [avatar, profileImage] = useState(activeUser?.avatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userobj = useSelector((state) => state.user.userobj);

  const handlesubmit = (e) => {
    e.preventDefault();
    const returnedTarget = Object.assign(
      { id: id || activeUser?.id },
      { email: email || activeUser?.email },
      { first_name: first_name || activeUser?.first_name },
      { last_name: last_name || activeUser?.last_name },
      { avatar: avatar || activeUser?.avatar }
    );
    console.log("sdfsdf", returnedTarget);
    dispatch(FunctionUpdateUser(returnedTarget, activeUser?.id));
    onHide();
    navigate(0);
  };

  // useEffect(() => {
  //   dispatch(FetchUserObj(activeUser));
  // }, []);

  useEffect(() => {
    if (userobj) {
      idchange(userobj.id);
      firstNameChange(userobj.first_name);
      emailchange(userobj.email);
      lastNameChange(userobj.last_name);
      profileImage(userobj.avatar);
    }
  }, [userobj]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <form onSubmit={handlesubmit}>
          <div className="card">
            <div className="card-body" style={{ textAlign: "left" }}>
              <h6 className="text-center">Edit User</h6>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      value={first_name}
                      onChange={(e) => firstNameChange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      value={last_name}
                      onChange={(e) => lastNameChange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      value={email}
                      onChange={(e) => emailchange(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Profile Link Image</label>
                    <input
                      value={avatar}
                      onChange={(e) => profileImage(e.target.value)}
                      className="form-control"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer" style={{ textAlign: "left" }}>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
