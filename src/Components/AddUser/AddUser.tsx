// import { useForm } from "react-hook-form";
// import styles from "../Login/login.module.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {  useNavigate } from "react-router-dom";

// interface UserFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   age: number;
//   phone: number;
//   birthDate: string;
// }
// export default function AddUser() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<UserFormData>();

//   const onSubmit = async (data: UserFormData) => {
//     // console.log(data);
//    try {
//   let response = await axios.post("https://dummyjson.com/users/add", data);
//   console.log(response);
//   toast.success("User added successfully");
//   navigate("/dashboard/users-list")
// } catch (error) {
//   console.log(error);
//    toast.error("sorry failed try again ");
// }

//   };
//   return (
//     <>
//       <div>
//         <h3>Add User</h3>
//         <hr />
//         <form className="m-5 shadow-lg p-3" onSubmit={handleSubmit(onSubmit)}>
//           <div className="row py-2">
//             <div className="col-md-6">
//               <label htmlFor="username" className={styles.label}>
//                 First Name
//               </label>
//               <input
//                 id="firstname"
//                 type="text"
//                 className={`${styles.formInput} form-control`}
//                 placeholder="Enter your First Name"
//                 {...register("firstName", {
//                   required: "firstName is required",
//                 })}
//               />
//               {errors.firstName && (
//                 <span className="text-danger">{errors.firstName.message}</span>
//               )}
//             </div>

//             <div className="col-md-6">
//               <label htmlFor="lastName" className={styles.label}>
//                 Last Name
//               </label>
//               <input
//                 id="lastName"
//                 type="text"
//                 className={`${styles.formInput} form-control`}
//                 placeholder="Enter your Last Name"
//                 {...register("lastName", { required: "lastName is required" })}
//               />
//               {errors.lastName && (
//                 <span className="text-danger">{errors.lastName.message}</span>
//               )}
//             </div>
//           </div>

//           <div className="row py-2">
//             <div className="col-md-6">
//               <label htmlFor="email" className={styles.label}>
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 className={`${styles.formInput} form-control`}
//                 placeholder="Enter your Email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
//                     message: "Please enter a valid email address",
//                   },
//                 })}
//               />

//               {errors.email && (
//                 <span className="text-danger">{errors.email.message}</span>
//               )}
//             </div>

//             <div className="col-md-6">
//               <label htmlFor="age" className={styles.label}>
//                 age
//               </label>
//               <input
//                 id="age"
//                 type="number"
//                 className={`${styles.formInput} form-control`}
//                 placeholder="Enter your age"
//                 {...register("age", {
//                   required: "Username is required",
//                   max: { value: 55, message: "max age is 55" },
//                 })}
//               />
//               {errors.age && (
//                 <span className="text-danger">{errors.age.message}</span>
//               )}
//             </div>
//           </div>

//           <div className="row py-2">
//             <div className="col-md-6">
//               <label htmlFor="phone" className={styles.label}>
//                 Phone Number
//               </label>
//               <input
//                 id="phone"
//                 type="number"
//                 className={`${styles.formInput} form-control`}
//                 placeholder="Enter your phone number"
//                 {...register("phone", { required: "phone is required" })}
//               />
//               {errors.phone && (
//                 <span className="text-danger">{errors.phone.message}</span>
//               )}
//             </div>
//             <div className="col-md-6">
//               <label htmlFor="birthDate" className={styles.label}>
//                 brith Date
//               </label>
//               <input
//                 id="birthDate"
//                 type="date"
//                 className={`${styles.formInput} form-control`}
//                 placeholder="Enter your Date of Birth"
//                 {...register("birthDate", {
//                   required: "birthDate is required",
//                 })}
//               />
//               {errors.birthDate && (
//                 <span className="text-danger">{errors.birthDate.message}</span>
//               )}
//             </div>
//           </div>
//           <div className=" my-5 text-center">
//             <button className="btn btn-warning w-50 text-white"> Save</button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }


import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  {UserForm } from "../UserForm";

export default function AddUser() {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      const response = await axios.post("https://dummyjson.com/users/add", data);
      console.log(response);
      toast.success("User added successfully");
      navigate("/dashboard/users-list");
    } catch (error) {
      console.log(error);
      toast.error("Sorry, failed to add user. Please try again.");
    }
  };

  return (
    <div>
      <h3>Add User</h3>
      <hr />
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}


