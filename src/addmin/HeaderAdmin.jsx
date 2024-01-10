// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import "../assetss/style/Addmin.css";

// const HeaderAdmin = () => {
//     const [isAsideVisible, setIsAsideVisible] = useState(true);
//   const [imageFile, setImageFile] = useState(null); // State để lưu trữ hình ảnh
//    const handleImageUpload = (e) => {
//      const file = e.target.files[0]; // Lấy hình ảnh từ sự kiện tải lên
//      if (file) {
//        const reader = new FileReader();
//        reader.onload = (e) => {
//          const uploadedImage = e.target.result;
//          // Lưu URL của hình ảnh vào localStorage
//          localStorage.setItem("uploadedImage", uploadedImage);
//          setImageFile(uploadedImage); // Lưu trữ hình ảnh trong state
//        };
//        reader.readAsDataURL(file);
//      }
//    };

//    // Sử dụng useEffect để lấy URL hình ảnh từ localStorage khi trang web được nạp lại
//    useEffect(() => {
//      const storedImage = localStorage.getItem("uploadedImage");
//      if (storedImage) {
//        setImageFile(storedImage);
//      }
//    }, []);

//    // Function to toggle the visibility of the second aside element
//    const toggleAsideVisibility = () => {
//      setIsAsideVisible(!isAsideVisible);
//    };

//      function Visibility() {
//        // Find the element by its ID
//        const element = document.getElementById("drop2");

//        // Check if the element exists before accessing its classList
//        if (element) {
//          element.classList.add("yourClassName");
//        } else {
//          console.error("Element not found.");
//        }
//      }
//   return (
//     <>
//       <header className="app-header">
//         <nav className="navbar navbar-expand-lg navbar-light">
//           <ul className="navbar-nav">
//             <li
//               className="nav-item d-block d-xl-block"
//               onClick={toggleAsideVisibility}
//             >
//               <Link
//                 className="nav-link sidebartoggler nav-icon-hover"
//                 id="headerCollapse"
//                 to=""
//               >
//                 <i class="bx bx-menu"></i>
//               </Link>
//             </li>
//             <li
//               className="nav-item bsa"
//               style={{
//                 marginLeft:
//                   // isAsideVisible
//                   // ?
//                   "0px",
//                 // : "240px",
//               }}
//             >
//               <Link className="nav-link nav-icon-hover" to="">
//                 <i class="bx bx-bell"></i>
//                 <div className="notification bg-primary rounded-circle"></div>
//               </Link>
//             </li>
//           </ul>
//           <div
//             className="navbar-collapse justify-content-end px-0"
//             id="navbarNav"
//           >
//             <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
//               <li className="nav-item dropdown">
//                 <div className="name-user-add">
//                   <p className="hi-user">Hi!</p>
//                   <p className="userName"></p>
//                 </div>
//                 <Link
//                   className="nav-link nav-icon-hover"
//                   to=""
//                   id="drop2"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   onClick={Visibility}
//                 >
//                   {imageFile ? (
//                     // Hiển thị hình ảnh được tải lên (nếu có)
//                     <img
//                       src={imageFile}
//                       alt=""
//                       width="35"
//                       height="35"
//                       className="rounded-circle"
//                     />
//                   ) : (
//                     // Hiển thị hình ảnh mặc định nếu chưa có hình ảnh
//                     <img
//                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkL_zpTULJ9oHSTLYX2iaSAeeCxoPUi3hWKQ&usqp=CAU"
//                       alt=""
//                       width="35"
//                       height="35"
//                       className="rounded-circle"
//                     />
//                   )}
//                 </Link>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   id="imageUploadInput"
//                 />
//               </li>
//             </ul>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// }

// export default HeaderAdmin