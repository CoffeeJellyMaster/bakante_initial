

// import React, { useState } from "react";
// import { MapContainer, Marker, Popup, ImageOverlay } from "react-leaflet";  // Use ImageOverlay from react-leaflet
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Custom map image (replace with your image path)
// const imageUrl = "src/components/test.jpg";  // Update image path to src/test.jpg

// // Original image size (3000x4000)
// const imageWidth = 3000;
// const imageHeight = 4000;

// // Adjust the bounding box size by adding 2000 to each side
// const boundingWidth = imageWidth - 2000;  // Add 2000 to width
// const boundingHeight = imageHeight - 2000;  // Add 2000 to height

// // Define the bounds using the adjusted width and height
// const bounds: L.LatLngBoundsLiteral = [[0, 0], [boundingHeight, boundingWidth]];

// // Example coordinates for the buttons (modify as needed)
// const buttonCoordinates: [number, number][] = [
//   [0, 0], // Button 1 at (0,0)
//   [30, 40], // Button 2 at (30,40)
//   [50, 60], // Button 3 at (50,60)
//   [700, 800], // Button 4 at (70,80)
//   [1500, 5000], // Button 5 at (90,20)
// ];

// const Bakante_map: React.FC = () => {
//   const [selectedButton, setSelectedButton] = useState<string | null>(null);

//   const handleButtonClick = (id: string) => {
//     setSelectedButton(id);
//     alert(`Location ${id} was clicked!`);
//   };

//   // Convert pixel coordinates to map's coordinate system
//   const getLatLngFromPixels = (x: number, y: number): L.LatLng => {
//     const lat = (y / imageHeight) * boundingHeight;  // Scale y-coordinate to map height
//     const lng = (x / imageWidth) * boundingWidth;    // Scale x-coordinate to map width
//     return new L.LatLng(lat, lng);
//   };

//   // Create a custom divIcon with an image (src/icon.png)
//   const createMarkerIcon = (id: string) => {
//     return L.divIcon({
//       className: "custom-marker",  // Optional, you can add styles to this class
//       html: `<img src="src/components/icon.png" alt="Location ${id}" style="width: 40px; height: 40px;" />`,
//       iconSize: [40, 40],  // Set the size of the icon (adjust if needed)
//       iconAnchor: [20, 20],  // Anchor the icon to the center
//     });
//   };

//   return (
//     <div style={{
//       display: 'flex',  
//       justifyContent: 'center',  
//       alignItems: 'center',  
//       height: '100vh',  
//       margin: 0, 
//     }}>
//       <div style={{
//         width: '350px',  
//         height: '800px', 
//         border: '5px solid red',  
//         position: 'absolute',
//         overflow: 'hidden',
//         left: 'calc(50% - 175px)',  
//       }}>
//         <MapContainer
//           center={[boundingHeight / 2, boundingWidth / 2]}  
//           zoom={2}
//           style={{ width: '100%', height: '100%' }}  
//           crs={L.CRS.Simple}  
//           maxBounds={bounds}
//           minZoom={-1}
//           zoomControl={false}  // Disable zoom controls
//           attributionControl={false}  // Disable Leaflet watermark
//         >
//           {/* Use ImageOverlay from react-leaflet */}
//           <ImageOverlay
//             url={imageUrl}
//             bounds={bounds}
//             opacity={1}  
//           />

//           {/* Create custom markers on the map for the locations */}
//           {buttonCoordinates.map((position, index) => {
//             const latLng = getLatLngFromPixels(position[0], position[1]);  // Convert to LatLng

//             return (
//               <Marker
//                 key={index}
//                 position={latLng}
//                 icon={createMarkerIcon(`Location ${index + 1}`)}
//                 eventHandlers={{
//                   click: () => handleButtonClick(`Location ${index + 1}`),  // Handle click event
//                 }}
//               >
//                 <Popup>{`Location ${index + 1}`}</Popup>
//               </Marker>
//             );
//           })}
//         </MapContainer>
//       </div>

//       {selectedButton && <div>Last pressed location: {selectedButton}</div>}
//     </div>
//   );
// };

// export default Bakante_map;
// import React, { useEffect, useState } from "react";
// import { MapContainer, Marker, Popup, ImageOverlay } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// interface BakanteMapProps {
//   firstname: string;
//   lastname: string;
// }

// // Custom map image (replace with your image path)
// const imageUrl = "src/components/test.jpg";

// // Original image size (3000x4000)
// const imageWidth = 3000;
// const imageHeight = 4000;

// // Adjust the bounding box size by adding 2000 to each side
// const boundingWidth = imageWidth - 2000;
// const boundingHeight = imageHeight - 2000;

// // Define the bounds using the adjusted width and height
// const bounds: L.LatLngBoundsLiteral = [[0, 0], [boundingHeight, boundingWidth]];

// // Example coordinates for the buttons (modify as needed)
// const buttonCoordinates: [number, number][] = [
//   [0, 0],
//   [30, 40],
//   [50, 60],
//   [700, 800],
//   [1500, 5000],
// ];

// // Define a new type for the dormitory
// type ApplyDorm = string;

// const Bakante_map: React.FC<BakanteMapProps> = ({ firstname, lastname }) => {
//   const [selectedButton, setSelectedButton] = useState<string | null>(null);
//   const [applicantData, setApplicantData] = useState<{
//     middleInitial: string;
//     age: number;
//     contactNumber: string;
//   } | null>(null);
//   const [applyDorm, setApplyDorm] = useState<ApplyDorm>("");

//   const tableName = "applicants"; // The name of the table to fetch data from

//   // Fetch applicant data based on firstname and lastname
//   useEffect(() => {
//     const fetchApplicantData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/read/${tableName}?firstname=${firstname}&lastname=${lastname}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           if (data && data.length > 0) {
//             const applicant = data[0];
//             setApplicantData({
//               middleInitial: applicant.middleInitial,
//               age: applicant.age,
//               contactNumber: applicant.contactNumber,
//             });
//           } else {
//             console.warn("No data found for the given firstname and lastname.");
//           }
//         } else {
//           console.error("Failed to fetch applicant data.");
//         }
//       } catch (error) {
//         console.error("Error while fetching applicant data:", error);
//       }
//     };

//     fetchApplicantData();
//   }, [firstname, lastname]);

//   // Handle button click and set dorm based on button ID
//   const handleButtonClick = (id: string) => {
//     setSelectedButton(id);
//     alert(`Location ${id} was clicked!`);

//     // Set the dorm value based on the button ID
//     if (id === "Location 4") {
//       setApplyDorm("dorm4");  // Change to the actual dorm name later
//     } else if (id === "Location 3") {
//       setApplyDorm("dorm3");  // Change to the actual dorm name later
//     } else if (id === "Location 2") {
//       setApplyDorm("dorm2");  // Change to the actual dorm name later
//     } else if (id === "Location 1") {
//       setApplyDorm("dorm1");  // Change to the actual dorm name later
//     } else {
//       setApplyDorm("");  // Reset if no match
//     }
//   };

//   const getLatLngFromPixels = (x: number, y: number): L.LatLng => {
//     const lat = (y / imageHeight) * boundingHeight;
//     const lng = (x / imageWidth) * boundingWidth;
//     return new L.LatLng(lat, lng);
//   };

//   const createMarkerIcon = (id: string) => {
//     return L.divIcon({
//       className: "custom-marker",
//       html: `<img src="src/components/icon.png" alt="Location ${id}" style="width: 40px; height: 40px;" />`,
//       iconSize: [40, 40],
//       iconAnchor: [20, 20],
//     });
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         margin: 0,
//       }}
//     >
//       <div
//         style={{
//           width: "350px",
//           height: "800px",
//           border: "5px solid red",
//           position: "absolute",
//           overflow: "hidden",
//           left: "calc(50% - 175px)",
//         }}
//       >
//         <MapContainer
//           center={[boundingHeight / 2, boundingWidth / 2]}
//           zoom={2}
//           style={{ width: "100%", height: "100%" }}
//           crs={L.CRS.Simple}
//           maxBounds={bounds}
//           minZoom={-1}
//           zoomControl={false}
//           attributionControl={false}
//         >
//           <ImageOverlay url={imageUrl} bounds={bounds} opacity={1} />

//           {buttonCoordinates.map((position, index) => {
//             const latLng = getLatLngFromPixels(position[0], position[1]);

//             return (
//               <Marker
//                 key={index}
//                 position={latLng}
//                 icon={createMarkerIcon(`Location ${index + 1}`)}
//                 eventHandlers={{
//                   click: () => handleButtonClick(`Location ${index + 1}`),
//                 }}
//               >
//                 <Popup>{`Location ${index + 1}`}</Popup>
//               </Marker>
//             );
//           })}
//         </MapContainer>
//       </div>

//       {selectedButton && <div>Last pressed location: {selectedButton}</div>}

//       {applicantData && (
//         <div style={{ position: "absolute", top: 10, left: 10, color: "black" }}>
//           <p>
//             <strong>Middle Initial:</strong> {applicantData.middleInitial}
//           </p>
//           <p>
//             <strong>Age:</strong> {applicantData.age}
//           </p>
//           <p>
//             <strong>Contact Number:</strong> {applicantData.contactNumber}
//           </p>
//         </div>
//       )}

//       {/* Display dorm information */}
//       {applyDorm && (
//         <div style={{ position: "absolute", bottom: 10, left: 10, color: "black" }}>
//           <p><strong>Assigned Dormitory:</strong> {applyDorm}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Bakante_map;
//-------------------------------------

// import React, { useState, useEffect } from "react";
// import { MapContainer, Marker, Popup, ImageOverlay } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// interface BakanteMapProps {
//   firstname: string;
//   lastname: string;
// }

// const imageUrl = "src/components/test.jpg"; // CAPLOCK COMMENT: IMAGE ALWAYS ON TOP
// const imageWidth = 3000;
// const imageHeight = 4000;
// const boundingWidth = imageWidth - 2000;
// const boundingHeight = imageHeight - 2000;
// const bounds: L.LatLngBoundsLiteral = [[0, 0], [boundingHeight, boundingWidth]];

// const buttonCoordinates: [number, number][] = [
//   [200, 800],
//   [800, 1000],
//   [400, 600],
//   [700, 800],
//   [1500, 5000],
// ];

// const BakanteMap: React.FC<BakanteMapProps> = ({ firstname, lastname }) => {
//   const [selectedButton, setSelectedButton] = useState<string | null>(null);
//   const [dormName, setDormName] = useState<string>("");
//   const [dormAddress, setDormAddress] = useState<string>("");
//   const [dormImagePath, setDormImagePath] = useState<string>("");

//   const tableName = "LandOwners"; // Name of the table to fetch dorm data

//   // Handle button click and set dorm data
//   const handleButtonClick = (id: string) => {
//     setSelectedButton(id); // Reset the selected button
//     alert(`Location ${id} was clicked!`);

//     // Set dormId based on button clicked
//     let dormId = "";
// let dormImagePath = ""; // Initialize the dorm image path

// if (id === "Location 1") {
//   dormId = "dorm1";
//   dormImagePath = "src/components/customdorm1.jpg"; // Set custom image path for dorm1
// } else if (id === "Location 2") {
//   dormId = "dorm2";
//   dormImagePath = "src/components/photo.jpg"; // Set custom image path for dorm2 (you can change this for testing)
// } else if (id === "Location 3") {
//   dormId = "dorm3";
//   dormImagePath = "src/components/customdorm3.jpg"; // Set custom image path for dorm3
// } else if (id === "Location 4") {
//   dormId = "dorm4";
//   dormImagePath = "src/components/example.jpg"; // Set custom image path for dorm4
// } else if (id === "Location 5") {
//   dormId = "dorm5";
//   dormImagePath = "src/components/customdorm5.jpg"; // Set custom image path for dorm5
// }

// // Log dormId and dormImagePath for debugging purposes
// console.log("Selected dormId:", dormId);
// console.log("Dorm image path:", dormImagePath);

// // Set the dorm image path state with the selected value
// setDormImagePath(dormImagePath);

// // Fetch dorm details for the selected dormId
// fetchDormDetails(dormId)

//     // Fetch dorm details from the server
//     fetchDormDetails(dormId);
//   };

//   // Fetch dorm details from the server
//   const fetchDormDetails = async (dormId: string) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/read/${tableName}`);
//       if (response.ok) {
//         const dormData = await response.json();
//         console.log("Fetched dorm data:", dormData); // Debugging statement

//         // Debug statement to alert dorm details (raw data)
//         alert(`Dorm data fetched: ${JSON.stringify(dormData)}`);

//         if (Array.isArray(dormData.data)) {
//           // Filter the dorm data based on dormId
//           const dorm = dormData.data.find(
//             (dorm: { dormName: string }) => dorm.dormName === dormId
//           );

//           if (dorm) {
//             setDormName(dorm.dormName);
//             setDormAddress(dorm.dormAddress);

//             // Alert and log the dorm's address based on the dormId
//             alert(`Dorm Address for ${dorm.dormName}: ${dorm.dormAddress}`);
//             console.log(`Dorm Address for ${dorm.dormName}: ${dorm.dormAddress}`); // Log the dorm address
//           } else {
//             console.warn("Dorm not found.");
//             alert("Dorm not found.");
//           }
//         } else {
//           console.error("Invalid data format received from server.");
//           alert("Invalid data format received from server.");
//         }
//       } else {
//         console.error("Failed to fetch dorm data.");
//         alert("Failed to fetch dorm data.");
//       }
//     } catch (error) {
//       console.error("Error while fetching dorm data:", error);
//       alert("Error occurred while fetching dorm data.");
//     }
//   };

//   const getLatLngFromPixels = (x: number, y: number): L.LatLng => {
//     const lat = (y / imageHeight) * boundingHeight;
//     const lng = (x / imageWidth) * boundingWidth;
//     return new L.LatLng(lat, lng);
//   };

//   const createMarkerIcon = (id: string) => {
//     return L.divIcon({
//       className: "custom-marker",
//       html: `<img src="src/components/icon.png" alt="Location ${id}" style="width: 40px; height: 40px;" />`,
//       iconSize: [40, 40],
//       iconAnchor: [20, 20],
//     });
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", margin: 0 }}>
//       <div style={{ width: "350px", height: "800px", border: "5px solid red", position: "absolute", overflow: "hidden", left: "calc(50% - 175px)" }}>
//         <MapContainer
//           center={[boundingHeight / 2, boundingWidth / 2]}
//           zoom={2}
//           style={{ width: "100%", height: "100%" }}
//           crs={L.CRS.Simple}
//           maxBounds={bounds}
//           minZoom={-1}
//           zoomControl={false}
//           attributionControl={false}
//         >
//           <ImageOverlay url={imageUrl} bounds={bounds} opacity={1} />
//           {buttonCoordinates.map((position, index) => {
//             const latLng = getLatLngFromPixels(position[0], position[1]);
//             return (
//               <Marker
//                 key={index}
//                 position={latLng}
//                 icon={createMarkerIcon(`Location ${index + 1}`)}
//                 eventHandlers={{
//                   click: () => handleButtonClick(`Location ${index + 1}`)
//                 }}
//               >
//                 <Popup>{`Location ${index + 1}`}</Popup>
//               </Marker>
//             );
//           })}
//         </MapContainer>
//       </div>

//       {selectedButton && <div>Last pressed location: {selectedButton}</div>}

//       <div
//         id={`dorm-info-div-${selectedButton}`} // Dynamically add ID based on selected button
//         style={{
//           position: "absolute",
//           bottom: "0",
//           left: "50%",
//           transform: "translateX(-50%)", // Center horizontally
//           width: "350px",
//           height: "500px",
//           backgroundColor: "#fff",
//           zIndex: 9999, // Ensures modal appears on top of all other elements
//           border: "2px solid #ccc",
//           display: selectedButton ? "flex" : "none", // Only display if a location is selected
//           flexDirection: "column",
//           padding: "10px",
//           boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
//         }}
//       >
//         <button
//           style={{
//             alignSelf: "flex-end",
//             background: "transparent",
//             border: "none",
//             fontSize: "20px",
//             color: "red", // Changed to red
//             fontWeight: "bold",
//             cursor: "pointer",
//           }}
//           onClick={() => {
//             setSelectedButton(null); // Reset selectedButton when closing modal
//           }} // Close the div
//         >
//           X
//         </button>
//         <img src={dormImagePath} alt="Dorm Image" style={{ width: "100%", height: "auto", marginBottom: "10px" }} />
//         <h3 style={{ color: "black" }}>{`Dorm Name: ${dormName}`}</h3> {/* Set text color to black */}
//         <p style={{ color: "black" }}>{`Dorm Address: ${dormAddress}`}</p> {/* Set text color to black */}
//         <button
//           style={{
//             marginTop: "10px",
//             padding: "10px",
//             backgroundColor: "#007BFF",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//          // THIS IS THE SUBMIT BUTTON, JUST SIMPLE
//          //WHY CANT YOU SEE THE SUBMIT BUTTON????????
//          //PUT THE ONCLICK EVENT HERE
//         >
//           Submit Request
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BakanteMap;

//-------------
import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface BakanteMapProps {
  firstname: string;
  lastname: string;
}

const imageUrl = "src/components/test.jpg"; // CAPLOCK COMMENT: IMAGE ALWAYS ON TOP
const imageWidth = 3000;
const imageHeight = 4000;
const boundingWidth = imageWidth - 2000;
const boundingHeight = imageHeight - 2000;
const bounds: L.LatLngBoundsLiteral = [[0, 0], [boundingHeight, boundingWidth]];

const buttonCoordinates: [number, number][] = [
  [200, 800],
  [800, 1000],
  [400, 600],
  [700, 800],
  [1500, 5000],
];

const BakanteMap: React.FC<BakanteMapProps> = ({ firstname, lastname }) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [dormName, setDormName] = useState<string>("");
  const [dormAddress, setDormAddress] = useState<string>("");
  const [dormImagePath, setDormImagePath] = useState<string>("");
  const [usersDetails, setUsersDetails] = useState<any[]>([]); // Array to store applicants' details

  const tableName = "applicants"; // Name of the table to fetch applicants' data

  // Fetch applicants' details from the server
  const fetchApplicantsDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/read/${tableName}`);
      if (response.ok) {
        const applicantsData = await response.json();
        console.log("Fetched applicants data:", applicantsData); // Debugging statement

        if (Array.isArray(applicantsData.data)) {
          setUsersDetails(applicantsData.data); // Store applicants' details in usersDetails
        } else {
          console.error("Invalid data format received from server.");
          alert("Invalid data format received from server.");
        }
      } else {
        console.error("Failed to fetch applicants data.");
        alert("Failed to fetch applicants data.");
      }
    } catch (error) {
      console.error("Error while fetching applicants data:", error);
      alert("Error occurred while fetching applicants data.");
    }
  };

  useEffect(() => {
    fetchApplicantsDetails(); // Fetch applicants' details when component mounts
  }, []);

  // Fetch dorm details when a location button is clicked
  const handleButtonClick = (id: string) => {
    setSelectedButton(id); // Reset the selected button
    alert(`Location ${id} was clicked!`);

    let dormId = "";
    let dormImagePath = ""; // Initialize the dorm image path

    if (id === "Location 1") {
      dormId = "dorm1";
      dormImagePath = "src/components/customdorm1.jpg";
    } else if (id === "Location 2") {
      dormId = "dorm2";
      dormImagePath = "src/components/photo.jpg";
    } else if (id === "Location 3") {
      dormId = "dorm3";
      dormImagePath = "src/components/customdorm3.jpg";
    } else if (id === "Location 4") {
      dormId = "dorm4";
      dormImagePath = "src/components/example.jpg";
    } else if (id === "Location 5") {
      dormId = "dorm5";
      dormImagePath = "src/components/customdorm5.jpg";
    }

    console.log("Selected dormId:", dormId);
    console.log("Dorm image path:", dormImagePath);
    setDormImagePath(dormImagePath);

    fetchDormDetails(dormId);
  };

  // Fetch dorm details from the server
  const fetchDormDetails = async (dormId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/read/LandOwners`);
      if (response.ok) {
        const dormData = await response.json();
        console.log("Fetched dorm data:", dormData);

        alert(`Dorm data fetched: ${JSON.stringify(dormData)}`);

        if (Array.isArray(dormData.data)) {
          const dorm = dormData.data.find((dorm: { dormName: string }) => dorm.dormName === dormId);

          if (dorm) {
            setDormName(dorm.dormName);
            setDormAddress(dorm.dormAddress);
            alert(`Dorm Address for ${dorm.dormName}: ${dorm.dormAddress}`);
            console.log(`Dorm Address for ${dorm.dormName}: ${dorm.dormAddress}`);
          } else {
            console.warn("Dorm not found.");
            alert("Dorm not found.");
          }
        } else {
          console.error("Invalid data format received from server.");
          alert("Invalid data format received from server.");
        }
      } else {
        console.error("Failed to fetch dorm data.");
        alert("Failed to fetch dorm data.");
      }
    } catch (error) {
      console.error("Error while fetching dorm data:", error);
      alert("Error occurred while fetching dorm data.");
    }
  };

  // Find the contact number of the applicant based on the passed firstname and lastname
//   const getContactNumber = () => {
//     const applicant = usersDetails.find(
//       (user) => user.firstname === firstname && user.lastname === lastname
//     );

//     if (applicant) {
//       alert(`Contact Number: ${applicant.contactNumber}`);
//     } else {
//       alert("Applicant not found.");
//     }





//   };
const getContactNumber = async () => {
    const applicant = usersDetails.find(
      (user) => user.firstname === firstname && user.lastname === lastname
    );
  
    if (applicant) {
      alert(`Contact Number: ${applicant.contactNumber}`);
      
      try {
        // Prepare the data for the POST request
        const requestData = {
          dorm_name: dormName, // Dorm name
          lastname: applicant.lastname, // Applicant's last name
          firstname: applicant.firstname, // Applicant's first name
          contact_number: applicant.contactNumber, // Applicant's contact number
        };
  
        // Use CREATE function to send data to backend (adjust the URL as needed)
        const response = await fetch(`http://localhost:5000/api/create/Requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData), // Send request data
        });
  
        if (response.ok) {
          alert('Request made successfully');
        } else {
          alert('Request failed, please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error with the request.');
      }
    } else {
      alert("Applicant not found.");
    }
  };
  
  const getLatLngFromPixels = (x: number, y: number): L.LatLng => {
    const lat = (y / imageHeight) * boundingHeight;
    const lng = (x / imageWidth) * boundingWidth;
    return new L.LatLng(lat, lng);
  };

  const createMarkerIcon = (id: string) => {
    return L.divIcon({
      className: "custom-marker",
      html: `<img src="src/components/icon.png" alt="Location ${id}" style="width: 40px; height: 40px;" />`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", margin: 0 }}>
      <div style={{ width: "350px", height: "800px", border: "5px solid red", position: "absolute", overflow: "hidden", left: "calc(50% - 175px)" }}>
        <MapContainer
          center={[boundingHeight / 2, boundingWidth / 2]}
          zoom={2}
          style={{ width: "100%", height: "100%" }}
          crs={L.CRS.Simple}
          maxBounds={bounds}
          minZoom={-1}
          zoomControl={false}
          attributionControl={false}
        >
          <ImageOverlay url={imageUrl} bounds={bounds} opacity={1} />
          {buttonCoordinates.map((position, index) => {
            const latLng = getLatLngFromPixels(position[0], position[1]);
            return (
              <Marker
                key={index}
                position={latLng}
                icon={createMarkerIcon(`Location ${index + 1}`)}
                eventHandlers={{
                  click: () => handleButtonClick(`Location ${index + 1}`)
                }}
              >
                <Popup>{`Location ${index + 1}`}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {selectedButton && <div>Last pressed location: {selectedButton}</div>}

      <div
        id={`dorm-info-div-${selectedButton}`} // Dynamically add ID based on selected button
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)", // Center horizontally
          width: "350px",
          height: "500px",
          backgroundColor: "#fff",
          zIndex: 9999, // Ensures modal appears on top of all other elements
          border: "2px solid #ccc",
          display: selectedButton ? "flex" : "none", // Only display if a location is selected
          flexDirection: "column",
          padding: "10px",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <button
          style={{
            alignSelf: "flex-end",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            color: "red", // Changed to red
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => {
            setSelectedButton(null); // Reset selectedButton when closing modal
          }} // Close the div
        >
          X
        </button>
        <img src={dormImagePath} alt="Dorm Image" style={{ width: "100%", height: "auto", marginBottom: "10px" }} />
        <h3 style={{ color: "black" }}>{`Dorm Name: ${dormName}`}</h3> {/* Set text color to black */}
        <p style={{ color: "black" }}>{`Dorm Address: ${dormAddress}`}</p> {/* Set text color to black */}
        <button
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
         onClick={getContactNumber}
        >
          Submit Request
        </button>
      </div>
    </div>
  );
};
export default BakanteMap;

