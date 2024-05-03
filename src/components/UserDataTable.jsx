/* eslint-disable react/prop-types */

const UserDataTable = ({ userData }) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Index</th>
          <th>Random Identifier</th>
          <th>Full Name</th>
          <th>Address</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.randomIdentifier}</td>
            <td>{user.fullName}</td>
            <td>{user.address}</td>
            <td>{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserDataTable;
