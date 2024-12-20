// import { useState, useEffect } from "react";

// interface LandOwnerProps {
//   firstname: string;
//   lastname: string;
// }

// const LandOwner = ({ firstname, lastname }: LandOwnerProps) => {
//   const [landOwnerData, setLandOwnerData] = useState<{
//     dormName: string;
//     dormAddress: string;
//   } | null>(null);

//   const tableName = "LandOwners";

//   useEffect(() => {
//     const fetchLandOwnerData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/read/${tableName}`);
//         if (response.ok) {
//           const landOwnersData = await response.json();
//           console.log("Fetched LandOwner data:", landOwnersData);

//           if (Array.isArray(landOwnersData.data)) {
//             // Find the LandOwner by matching firstname and lastname
//             const landOwner = landOwnersData.data.find(
//               (owner: {
//                 firstname: string;
//                 lastname: string;
//                 dormAddress: string;
//                 dormName: string;
//               }) =>
//                 owner.firstname === firstname && owner.lastname === lastname
//             );

//             if (landOwner) {
//               setLandOwnerData({
//                 dormName: landOwner.dormName,
//                 dormAddress: landOwner.dormAddress,
//               });

//               // Alert the dormName
//               alert(`Dorm Name: ${landOwner.dormName}`);
//             } else {
//               alert("LandOwner not found.");
//             }
//           } else {
//             alert("Invalid data format received from server.");
//           }
//         } else {
//           alert("Failed to fetch LandOwner data.");
//         }
//       } catch (error) {
//         alert("Error occurred while fetching LandOwner data.");
//         console.error(error);
//       }
//     };

//     fetchLandOwnerData();
//   }, [firstname, lastname]);

//   return (
//     <div>
//       {landOwnerData ? (
//         <div>
//           <h2>LandOwner Information</h2>
//           <p>Dorm Name: {landOwnerData.dormName}</p>
//           <p>Dorm Address: {landOwnerData.dormAddress}</p>
//         </div>
//       ) : (
//         <p>Loading LandOwner information...</p>
//       )}
//     </div>
//   );
// };

// export default LandOwner;

//eto na 




// import { useState, useEffect } from "react";

// interface LandOwnerProps {
//   firstname: string;
//   lastname: string;
// }

// const LandOwner = ({ firstname, lastname }: LandOwnerProps) => {
//   const [landOwnerData, setLandOwnerData] = useState<{
//     dormName: string;
//     dormAddress: string;
//   } | null>(null);
//   const [requestData, setRequestData] = useState<{
//     dormName: string;
//     lastname: string;
//     firstname: string;
//     contactNumber: string;
//   }[]>([]); // This will store the matching requests
//   const [loading, setLoading] = useState(true);

//   const landOwnerTable = "LandOwners";
//   const requestTable = "Requests";

//   // Fetch LandOwner Data
//   useEffect(() => {
//     const fetchLandOwnerData = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/read/${landOwnerTable}`);
//         if (response.ok) {
//           const landOwnersData = await response.json();
//           console.log("Fetched LandOwner data:", landOwnersData);

//           if (Array.isArray(landOwnersData.data)) {
//             const landOwner = landOwnersData.data.find(
//               (owner: { firstname: string; lastname: string; dormAddress: string; dormName: string }) =>
//                 owner.firstname === firstname && owner.lastname === lastname
//             );

//             if (landOwner) {
//               setLandOwnerData({
//                 dormName: landOwner.dormName,
//                 dormAddress: landOwner.dormAddress,
//               });

//               // Fetch Requests Data based on dormName
//               fetchRequestData(landOwner.dormName);
//             } else {
//               alert("LandOwner not found.");
//               setLoading(false);
//             }
//           } else {
//             alert("Invalid data format received from server.");
//             setLoading(false);
//           }
//         } else {
//           alert("Failed to fetch LandOwner data.");
//           setLoading(false);
//         }
//       } catch (error) {
//         alert("Error occurred while fetching LandOwner data.");
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     // Function to fetch requests data
//     const fetchRequestData = async (dormName: string) => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/read/${requestTable}`);
//         if (response.ok) {
//           const requestsData = await response.json();
//           console.log("Fetched Requests data:", requestsData);

//           if (Array.isArray(requestsData.data)) {
//             const matchingRequests = requestsData.data.filter(
//               (request: { dorm_name: string; lastname: string; firstname: string }) =>
//                 request.dorm_name === dormName
//             );

//             setRequestData(matchingRequests);
//           } else {
//             alert("Invalid data format received from server.");
//           }
//         } else {
//           alert("Failed to fetch Requests data.");
//         }
//       } catch (error) {
//         alert("Error occurred while fetching Requests data.");
//         console.error(error);
//       } finally {
//         setLoading(false); // Stop loading after data fetching is done
//       }
//     };

//     fetchLandOwnerData();
//   }, [firstname, lastname]);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading LandOwner information...</p>
//       ) : landOwnerData ? (
//         <div>
//           <h2>LandOwner Information</h2>
//           <p>Dorm Name: {landOwnerData.dormName}</p>
//           <p>Dorm Address: {landOwnerData.dormAddress}</p>

//           <h3>Requests for {landOwnerData.dormName}</h3>

//           {/* Container for all the requests */}
//           <div
//             style={{
//               border: "2px solid red", 
//               width: "400px", 
//               height: "600px", 
//               overflowY: "scroll", 
//               display: "flex", 
//               flexDirection: "column", 
//               justifyContent: "flex-start", 
//               alignItems: "center", 
//               margin: "0 auto", // Centered container
//               padding: "10px", // Padding inside the container
//             }}
//           >
//             {requestData.length > 0 ? (
//               requestData.map((request, index) => (
//                 <div
//                   key={index}
//                   style={{
//                     width: "90%", // Set width for individual request divs
//                     marginBottom: "10px", // Spacing between request divs
//                     padding: "10px", 
//                     border: "1px solid black", 
//                     borderRadius: "5px", 
//                     display: "flex", 
//                     flexDirection: "column", 
//                     alignItems: "flex-start",
//                   }}
//                 >
//                   <p><strong>First Name:</strong> {request.firstname}</p>
//                   <p><strong>Last Name:</strong> {request.lastname}</p>
//                   <p><strong>Contact Number:</strong> {request.contact_number}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No requests found for this dorm.</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>No LandOwner data available.</p>
//       )}
//     </div>
//   );
// };

// export default LandOwner;
import { useState, useEffect } from "react";

interface LandOwnerProps {
  firstname: string;
  lastname: string;
}

const LandOwner = ({ firstname, lastname }: LandOwnerProps) => {
  const [landOwnerData, setLandOwnerData] = useState<{
    firstname: string;
    lastname: string;
    middleInitial: string;
    age: number;
    contactNumber: number;
    capacity: number;
    dormAddress: string;
    dormName: string;
  } | null>(null); // State to hold all landOwner data
  const [requestData, setRequestData] = useState<{
    dormName: string;
    lastname: string;
    firstname: string;
    contactNumber: string;
  }[]>([]); // This will store the matching requests
  const [landOwnersData, setLandOwnersData] = useState<any[]>([]); // Array for all land owners
  const [loading, setLoading] = useState(true);

  const landOwnerTable = "LandOwners";
  const requestTable = "Requests";

  // Fetch LandOwner Data
  useEffect(() => {
    const fetchLandOwnerData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/read/${landOwnerTable}`);
        if (response.ok) {
          const landOwnersData = await response.json();
          console.log("Fetched LandOwner data:", landOwnersData);

          if (Array.isArray(landOwnersData.data)) {
            setLandOwnersData(landOwnersData.data); // Store all land owner data
            
            // Find the specific land owner by matching firstname and lastname
            const landOwner = landOwnersData.data.find(
              (owner: any) =>
                owner.firstname === firstname && owner.lastname === lastname
            );

            if (landOwner) {
              setLandOwnerData({
                firstname: landOwner.firstname,
                lastname: landOwner.lastname,
                middleInitial: landOwner.middleInitial,
                age: landOwner.age,
                contactNumber: landOwner.contactNumber,
                capacity: landOwner.capacity,
                dormAddress: landOwner.dormAddress,
                dormName: landOwner.dormName,
              });

              // Fetch Requests Data based on dormName
              fetchRequestData(landOwner.dormName);
            } else {
              alert("LandOwner not found.");
              setLoading(false);
            }
          } else {
            alert("Invalid data format received from server.");
            setLoading(false);
          }
        } else {
          alert("Failed to fetch LandOwner data.");
          setLoading(false);
        }
      } catch (error) {
        alert("Error occurred while fetching LandOwner data.");
        console.error(error);
        setLoading(false);
      }
    };

    // Function to fetch requests data
    const fetchRequestData = async (dormName: string) => {
      try {
        const response = await fetch(`http://localhost:5000/api/read/${requestTable}`);
        if (response.ok) {
          const requestsData = await response.json();
          console.log("Fetched Requests data:", requestsData);

          if (Array.isArray(requestsData.data)) {
            const matchingRequests = requestsData.data.filter(
              (request: { dorm_name: string; lastname: string; firstname: string }) =>
                request.dorm_name === dormName
            );

            setRequestData(matchingRequests);
          } else {
            alert("Invalid data format received from server.");
          }
        } else {
          alert("Failed to fetch Requests data.");
        }
      } catch (error) {
        alert("Error occurred while fetching Requests data.");
        console.error(error);
      } finally {
        setLoading(false); // Stop loading after data fetching is done
      }
    };

    fetchLandOwnerData();
  }, [firstname, lastname]);

  return (
    <div>
      {loading ? (
        <p>Loading LandOwner information...</p>
      ) : landOwnerData ? (
        <div>
          <h2>LandOwner Information</h2>
          {/* Justified Content for Dorm Name and Dorm Address */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "justify", // This ensures that content inside is justified
              marginBottom: "20px",
            }}
          >
            <ul style={{ width: "90%", listStyleType: "none", paddingLeft: 0 }}>
              <li><strong>Dorm Name:</strong> {landOwnerData.dormName}</li>
              <li><strong>Dorm Address:</strong> {landOwnerData.dormAddress}</li>
              <li><strong>First Name:</strong> {landOwnerData.firstname}</li>
              <li><strong>Last Name:</strong> {landOwnerData.lastname}</li>
              <li><strong>Middle Initial:</strong> {landOwnerData.middleInitial}</li>
              <li><strong>Age:</strong> {landOwnerData.age}</li>
              <li><strong>Contact Number:</strong> {landOwnerData.contactNumber}</li>
              <li><strong>Capacity:</strong> {landOwnerData.capacity}</li>
            </ul>
          </div>

          <h3>Requests for {landOwnerData.dormName}</h3>

          {/* Container for all the requests */}
          <div
            style={{
              border: "2px solid red",
              width: "400px",
              height: "600px",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: "0 auto", // Centered container
              padding: "10px", // Padding inside the container
            }}
          >
            {requestData.length > 0 ? (
              requestData.map((request, index) => (
                <div
                  key={index}
                  style={{
                    width: "90%", // Set width for individual request divs
                    marginBottom: "10px", // Spacing between request divs
                    padding: "10px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    <li><strong>First Name:</strong> {request.firstname}</li>
                    <li><strong>Last Name:</strong> {request.lastname}</li>
                    <li><strong>Contact Number:</strong> {request.contact_number}</li>
                  </ul>
                </div>
              ))
            ) : (
              <p>No requests found for this dorm.</p>
            )}
          </div>
        </div>
      ) : (
        <p>No LandOwner data available.</p>
      )}
    </div>
  );
};

export default LandOwner;
