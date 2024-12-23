import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FetchUserObj,
  FunctionAddUser,
  FunctionUpdateUser,
} from "../Redux/Action";

function CreateUserModal({ show, onHide, activeUser }) {
  const [id, idchange] = useState(0);
  const [first_name, firstNameChange] = useState(activeUser?.first_name);
  const [email, emailchange] = useState(activeUser?.email);
  const [last_name, lastNameChange] = useState(activeUser?.last_name);
  const [avatar, profileImage] = useState(activeUser?.avatar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const userobj = { id, email, first_name, last_name, avatar };
    dispatch(FunctionAddUser(userobj));
    onHide();
    navigate("/user");
  };

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
              <h6 className="text-center">Create User</h6>
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
              |
              <Link className="btn btn-danger" to={"/user"}>
                Back
              </Link>
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

export default CreateUserModal;
