// MedicineListItem.js
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MedicineListItem(props) {
  const user = useSelector((store) => store.auth.user);

  const deleteMedicine = () => {
    axios
      .delete(
        `https://medicalstore.mashupstack.com/api/medicine/${props.post.id}`,
        { headers: { Authorization: "Bearer " + user.token } }
      )
      .then((response) => {
        props.refresh(); // Execute the callback to update the list
      })
      .catch((error) => {
        console.error("Error deleting medicine:", error);
      });
  };

  return (
    <div className="card">
      <div className="card-body">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Sno</th>
              <th scope="col">Name</th>
              <th scope="col">Company</th>
              <th scope="col">Expiry Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{props.post.id}</th>
              <td>{props.post.name}</td>
              <td>{props.post.company}</td>
              <td style={{ color: new Date(props.post.expiry_date) <= new Date() ? "red" : "green" }}>
                {props.post.expiry_date}
              </td>
              <td>
                <button
                  className="btn btn-danger float-right"
                  data-toggle="modal"
                  data-target={`#myModal${props.post.id}`}
                >
                  Delete
                </button>

                <div className="modal" id={`myModal${props.post.id}`}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4 className="modal-title">Confirm deletion</h4>
                        <button type="button" className="close" data-dismiss="modal">
                          &times;
                        </button>
                      </div>
                      <div className="modal-body">Are you sure you want to delete the record?!</div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                          Cancel
                        </button>
                        <button type="button" className="btn btn-danger" onClick={deleteMedicine}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <Link to={`/blog/posts/${props.post.id}/edit`} className="btn btn-primary float-right mr-2">
                  Edit
                </Link>
                <Link to={`/blog/posts/${props.post.id}`} className="btn btn-info float-right mr-2">
                  View
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicineListItem;
