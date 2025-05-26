import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  let navigate = useNavigate();
  
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (user: User) => {
    setShowDeleteModal(true);
    setUserId(user.id);
    setUserData(user);
  }
  
  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (user: User) => {
    setShowEditModal(true);
    setUserId(user.id);
    setUserData(user);
  }

  let deleteUser = async () => {
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`);
      toast.success("Delete successfully");
      handleCloseDeleteModal();
      getUsers(); //after delete i want user list show 
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error Delete");
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users");
      setUsers(response?.data?.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  let moveToAddUser = () => {
    navigate("/dashboard/add-user");
  }

  let moveToUpdateUser = () => {
    if (userId) {
      navigate(`/dashboard/update-user/${userId}`);
    }
  }

  return (
    <div className="p-5">
      <div className="d-flex justify-content-between mx-2 py-3">
        <h3>User List</h3>
        <button onClick={moveToAddUser} className="btn btn-warning text-white">Add new user</button>
      </div>
      
      <Table striped bordered hover size="sm" className="">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img src={user.image} alt="avatar" width="40" height="40" />
              </td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <MdModeEditOutline 
                  size={20} 
                  className="me-2 cursor-pointer text-primary"
                  onClick={() => handleShowEditModal(user)}
                />
                <AiOutlineDelete 
                  size={20} 
                  className="cursor-pointer text-danger"
                  onClick={() => handleShowDeleteModal(user)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {userData?.firstName} {userData?.lastName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to update {userData?.firstName} {userData?.lastName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={moveToUpdateUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}