import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserForm }from "../UserForm";
import { AuthContext } from "../context/AuthContext";
import { format } from 'date-fns';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

export const UpdateUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        toast.error("You need to be logged in to view this page");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = response.data;
        setUserData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          phone: user.phone,
          birthDate: format(new Date(user.birthDate), 'yyyy-MM-dd'),
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
        navigate("/dashboard/users-list");
      }
    };

    fetchUserData();
  }, [id, navigate, token]);

  const handleSubmit = async (data: UserFormData) => {
    if (!token) {
      toast.error("You need to be logged in to perform this action");
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(`https://dummyjson.com/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User updated successfully");
      navigate("/dashboard/users-list");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h2 className="mb-4">Update User</h2>
      <UserForm 
        onSubmit={handleSubmit} 
        isLoading={isLoading} 
        defaultValues={userData} 
      />
    </div>
  );
};

export default UpdateUser;