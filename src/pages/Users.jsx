import { useEffect, useState } from "react";
import "../assets/css/users.css"
import Navbar from "../layouts/Navbar";
import { getUserList } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
// import "./Users.css";


export default function Users() {
  const dispatch=useDispatch()
  const {userData,loadingUsers,errorUser}=useSelector((state)=>state.user)
  const users = userData?.users ?? [];
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  // const [pagination, setPagination] = useState({
  //   total: 0,
  //   totalPages: 0,
  //   hasNextPage: false,
  //   hasPrevPage: false,
  // });
  const pagination = {
total: userData?.pagination?.total ?? 0,
totalPages: userData?.pagination?.totalPages ?? 0,
hasNextPage: userData?.pagination?.hasNextPage ?? false,
hasPrevPage: userData?.pagination?.hasPrevPage ?? false,
};

  useEffect(() => {
   dispatch(getUserList({page, limit, search}))
  }, [page, limit, search]);


  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <>
            <Navbar />
      <div className="users-page">
      
      <div className="users-header">
        <div>
          <h1>Employees</h1>
          <p>Manage and view employee information</p>
        </div>

        <div className="users-count">
          Total Employees: <strong>{pagination.total ?? 0}</strong>
        </div>
      </div>

      <div className="users-card">
        <div className="users-toolbar">
          <input
            type="search"
            placeholder="Search employee ID, name, department..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search employees"
          />
        </div>

        {errorUser && <div className="users-error">{errorUser}</div>}

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {loadingUsers ? (
                <tr>
                  <td colSpan="5" className="users-message">
                    Loading employees...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="users-message">
                    No employees found
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{(page - 1) * limit + index + 1}</td>
                    <td>
                      <span className="employee-id">
                        {user.employeeId || "-"}
                      </span>
                    </td>
                    <td className="employee-name">{user.name || "-"}</td>
                    <td>{user.department || "-"}</td>
                    <td>
                      <span className="role-badge">
                        {user.role || "-"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="users-pagination">
          <span>
            Page {page} of {pagination.totalPages || 1}
          </span>

          <div className="pagination-buttons">
            <button
              disabled={loadingUsers || !pagination.hasPrevPage}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </button>

            <button
              disabled={loadingUsers || !pagination.hasNextPage}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  
  );
}