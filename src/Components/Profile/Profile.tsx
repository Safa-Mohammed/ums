import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { UserForm } from "../UserForm";
import { format } from 'date-fns';
import defaultAvatar from "../../assets/profilee.png";
import styles from "./profile.module.css";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  birthDate: string;
  image?: string; // Add image property to the API response type
}

export default function Profile() {
  const { token } = useContext(AuthContext);
  const [defaultValues, setDefaultValues] = useState<UserFormData | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(defaultAvatar);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<UserProfile>("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        setDefaultValues({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          phone: user.phone,
          birthDate: format(new Date(user.birthDate), 'yyyy-MM-dd'),
        });

        // Set image URL if available from API, otherwise keep default
        if (user.image) {
          setImageUrl(user.image);
        } else {
          setImageUrl(defaultAvatar);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch profile data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const handleSubmit = (data: UserFormData) => {
    console.log("User Data (Read Only):", data);
    toast.info("This is view-only profile data.");
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className={`position-relative ${styles.profileContainer}`}>
        {/* Profile Image (over border) */}
        <div className={styles.imageWrapper}>
          <img
            src={imageUrl}
            alt="Profile"
            className="rounded-circle p-3"
            style={{ 
              width: "100px", 
              height: "100px", 
              objectFit: "cover",
              border: "3px solid white", // Add border to make it stand out
              backgroundColor: "#f8f9fa" // Fallback background if image fails
            }}
            onError={(e) => {
              // Fallback to default avatar if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = defaultAvatar;
            }}
          />
        </div>

        {/* User Form with Top Border */}
        <div className={`p-3 pt-5 ${styles.formBox}`}>
          {defaultValues ? (
            <UserForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              isLoading={isLoading}
              showSubmitButton={false}
            />
          ) : (
            <p>Loading profile data...</p>
          )}
        </div>
      </div>
    </div>
  );
}