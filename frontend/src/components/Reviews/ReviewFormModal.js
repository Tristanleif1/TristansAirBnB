// import React, { useState, useEffect } from 'react';
// import { Modal } from '../../context/Modal';
// import ReviewForm from './ReviewFormComponent';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';


// function ReviewFormModal(){
//     const [showModal, setShowModal] = useState(false);
//     const { spotId } = useParams();

//     useEffect(() => {
//       if(showModal){
//         document.body.style.overflow = 'hidden';
//       }else{
//         document.body.style.overflow = 'unset';
//       }
//     }, [showModal]);

//     const handleShowModal = (e) => {
//       e.preventDefault();
//       console.log("Button clicked")
//       setShowModal(true);

//     }
//     console.log(spotId);

//     return (
//         <>
//           <button onClick={handleShowModal}>Post Your Review</button>
//           {showModal && (
//             <>
//               <p>Rendering the Modal...</p>
//               <Modal onClose={() => setShowModal(false)}>
//                 <ReviewForm setShowModal={setShowModal} spotId={spotId} />
//               </Modal>
//             </>
//           )}
//         </>
//       );
//     }

//     export default ReviewFormModal;
