import React from "react"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import FlagIcon from "@mui/icons-material/Flag"
import SettingsIcon from "@mui/icons-material/Settings"
import { Link } from "react-router-dom"

export default function Equipments() {
  const listItems = [
    { id: 1, name: "List Group item 1" },
    { id: 2, name: "List Group item 2" },
    { id: 3, name: "List Group item 3" },
    { id: 4, name: "List Group item 4" },
    { id: 5, name: "List Group item 5" },
    { id: 6, name: "List Group item 6" },
  ]
  const user = true;
  return (
    <div className="container list mt-5">
      <h2 className="text-center my-4">List</h2>
      <div className="list-header p-3 d-flex justify-content-between align-items-center">
        <div>
          <FormatListBulletedIcon className="p-0" />
          <span>Sortable List</span>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <SettingsIcon />
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>
      <table className="table">
        <tbody>
          {listItems?.map((item) => (
            <tr key={item?.id}>
              <td>{item.name}</td>
              <td className="text-end">
                <span
                  className="btn-item-edit"
                  onClick={() => {
                    console.log("")
                  }}
                >
                  <EditIcon />
                </span>
                <span
                  className="btn-item-delete"
                  onClick={() => {
                    console.log("")
                  }}
                >
                  <DeleteIcon />
                </span>
                <span
                  className="btn-item-flag"
                  onClick={() => {
                    console.log("")
                  }}
                >
                  <FlagIcon />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center list-pagination">
        <div>
          Total Counts <span className="badge bg-secondary">4</span>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Link to="/pricing">Pricing</Link>
      </div>
    </div>
  )
}
