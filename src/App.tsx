
//ETO NAGANA
// import { useState } from 'react';
// import './App.css';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Signup from './components/signup'; // Import the Signup component

// const App = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState<string>('');
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [users, setUsers] = useState<{ username: string; password: string }[]>([]);
//   const tableName = 'testuser';  // Table name for fetching user data

//   // Handle login form submission
//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!username || !password) {
//       setMessage('Both fields are required');
//       return;
//     }

//     // Fetch users data and validate login in parallel
//     try {
//       const response = await fetch(`http://localhost:5000/api/read/${tableName}`);
//       if (response.ok) {
//         const usersData = await response.json();
//         console.log('Fetched users data:', usersData);  // Debugging log for development
//         if (Array.isArray(usersData.data)) {
//           setUsers(usersData.data);  // Store users in state

//           // Validate login after fetching users data
//           const user = usersData.data.find((user: { username: string; password: string }) => 
//             user.username === username && user.password === password
//           );

//           if (user) {
//             setIsLoggedIn(true);
//             setMessage('Login successful!');
//           } else {
//             setMessage('Invalid username or password');
//           }
//         } else {
//           setMessage('Invalid data format received from server.');
//         }
//       } else {
//         setMessage('Failed to fetch user data.');
//       }
//     } catch (error) {
//       setMessage('Error occurred while logging in.');
//       console.error(error);
//     }
//   };

//   return (
//     <Router>
//       <div className="App">
//         <h1>Login Page</h1>

//         {/* Routing logic */}
//         <Routes>
//           {/* Route for Login Page */}
//           <Route path="/" element={
//             <>
//               {!isLoggedIn ? (
//                 <form onSubmit={handleLoginSubmit} className="login-form">
//                   <div>
//                     <label htmlFor="username">Username:</label>
//                     <input
//                       type="text"
//                       id="username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="password">Password:</label>
//                     <input
//                       type="password"
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <button type="submit">Login</button>
//                 </form>
//               ) : (
//                 <p>Welcome! You are logged in.</p>
//               )}

//                {/* Sign-up link */}
//                {!isLoggedIn && (
//                 <p>
//                   Don't have an account? <Link to="/signup">Sign Up</Link>
//                 </p>
//               )}
//             </>
//           } />

//           {/* Route for Signup Page */}
//           <Route path="/signup" element={<Signup />} />
//         </Routes>

//         {/* Display message */}
//         {message && <p>{message}</p>}
//       </div>
//     </Router>
//   );
// };

// export default App;
//-------------------------




// import React, { useState } from "react";
// import { MapContainer, Marker, Popup, ImageOverlay } from "react-leaflet";  // Use ImageOverlay from react-leaflet
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Custom map image (replace with your image path)
// const imageUrl = "src/test.jpg";  // Update image path to src/test.jpg

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

// const App: React.FC = () => {
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
//       html: `<img src="src/icon.png" alt="Location ${id}" style="width: 40px; height: 40px;" />`,
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

// export default App;
// import { useState } from "react";
// import "./App.css";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import Signup from "./components/signup"; // Import the Signup component
// import Bakante_map from "./components/bakante_map"; // Import Bakante_map component

// const App = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState<string>("");
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [accountType, setAccountType] = useState<string | null>(null); // To store account type
//   const [mainContent, setMainContent] = useState<JSX.Element | null>(null); // For rendering based on account type

//   const tableName = "users"; // The name of the table to fetch data from

//   // Handle login form submission
//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setMessage("Both fields are required");
//       return;
//     }

//     try {
//       // Fetch user data from the backend
//       const response = await fetch(`http://localhost:5000/api/read/${tableName}`);
//       if (response.ok) {
//         const usersData = await response.json();
//         console.log("Fetched users data:", usersData); // Debugging log

//         if (Array.isArray(usersData.data)) {
//           // Validate login credentials
//           const user = usersData.data.find(
//             (user: { email: string; password: string; AccountType: string }) =>
//               user.email === email && user.password === password
//           );

//           if (user) {
//             setIsLoggedIn(true);
//             setAccountType(user.AccountType); // Save the AccountType field
//             setMessage("Login successful!");

//             // Debugging statement to alert the account type
//             alert(`Logged in as: ${user.AccountType}`);

//             // Set main content based on account type
//             if (user.AccountType === "applicant") {
//               setMainContent(<Bakante_map />); // Render Bakante_map for applicants
//             } else {
//               setMainContent(<p>Placeholder for other account types</p>); // Placeholder for other account types
//             }
//           } else {
//             setMessage("Invalid email or password");
//           }
//         } else {
//           setMessage("Invalid data format received from server.");
//         }
//       } else {
//         setMessage("Failed to fetch user data.");
//       }
//     } catch (error) {
//       setMessage("Error occurred while logging in.");
//       console.error(error);
//     }
//   };

//   return (
//     <Router>
//       <div className="App">
//         <h1>Login Page</h1>

//         <Routes>
//           {/* Route for Login Page */}
//           <Route
//             path="/"
//             element={
//               <>
//                 {!isLoggedIn ? (
//                   <form onSubmit={handleLoginSubmit} className="login-form">
//                     <div>
//                       <label htmlFor="email">Email:</label>
//                       <input
//                         type="text"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="password">Password:</label>
//                       <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <button type="submit">Login</button>
//                   </form>
//                 ) : (
//                   mainContent // Render the content based on account type
//                 )}

//                 {!isLoggedIn && (
//                   <p>
//                     Don't have an account? <Link to="/signup">Sign Up</Link>
//                   </p>
//                 )}
//               </>
//             }
//           />

//           {/* Route for Signup Page */}
//           <Route path="/signup" element={<Signup />} />
//         </Routes>

//         {/* Display message */}
//         {message && <p>{message}</p>}
//       </div>
//     </Router>
//   );
// };

// export default App;
//never mind the image path, I fixed it 
// now, since I loggined with app.tsx and called bakante_map
// how do I use the firstname, then get the (all of these columns are case sensitive)firstname, lastname , middleInitial, contactNumber from 

// import { useState } from "react";
// import "./App.css";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import Signup from "./components/signup";
// import Bakante_map from "./components/bakante_map";

// const App = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState<string>("");
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [accountType, setAccountType] = useState<string | null>(null);
//   const [mainContent, setMainContent] = useState<JSX.Element | null>(null);
//   const [userDetails, setUserDetails] = useState<{ firstname: string; lastname: string } | null>(null);

//   const tableName = "users";

//   const handleLoginSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setMessage("Both fields are required");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5000/api/read/${tableName}`);
//       if (response.ok) {
//         const usersData = await response.json();
//         console.log("Fetched users data:", usersData);

//         if (Array.isArray(usersData.data)) {
//           const user = usersData.data.find(
//             (user: { email: string; password: string; AccountType: string; firstname: string; lastname: string }) =>
//               user.email === email && user.password === password
//           );

//           if (user) {
//             setIsLoggedIn(true);
//             setAccountType(user.AccountType);
//             setUserDetails({ firstname: user.firstname, lastname: user.lastname });
//             setMessage("Login successful!");

//             // Set main content based on account type
//             if (user.AccountType === "applicant") {
//               setMainContent(<Bakante_map firstname={user.firstname} lastname={user.lastname} />);
//             } else {
//               setMainContent(<p>Placeholder for other account types</p>);
//             }
//           } else {
//             setMessage("Invalid email or password");
//           }
//         } else {
//           setMessage("Invalid data format received from server.");
//         }
//       } else {
//         setMessage("Failed to fetch user data.");
//       }
//     } catch (error) {
//       setMessage("Error occurred while logging in.");
//       console.error(error);
//     }
//   };

//   return (
//     <Router>
//       <div className="App">
//         <h1>Login Page</h1>

//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 {!isLoggedIn ? (
//                   <form onSubmit={handleLoginSubmit} className="login-form">
//                     <div>
//                       <label htmlFor="email">Email:</label>
//                       <input
//                         type="text"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="password">Password:</label>
//                       <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                       />
//                     </div>
//                     <button type="submit">Login</button>
//                   </form>
//                 ) : (
//                   mainContent
//                 )}

//                 {!isLoggedIn && (
//                   <p>
//                     Don't have an account? <Link to="/signup">Sign Up</Link>
//                   </p>
//                 )}
//               </>
//             }
//           />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>

//         {message && <p>{message}</p>}
//       </div>
//     </Router>
//   );
// };

// export default App;

// //

import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./components/signup";
import Bakante_map from "./components/bakante_map";
import LandOwner from "./components/landowners"; // Import LandOwner

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [mainContent, setMainContent] = useState<JSX.Element | null>(null);
  const [userDetails, setUserDetails] = useState<{ firstname: string; lastname: string } | null>(null);

  const tableName = "users";

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Both fields are required");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/read/${tableName}`);
      if (response.ok) {
        const usersData = await response.json();
        console.log("Fetched users data:", usersData);

        if (Array.isArray(usersData.data)) {
          const user = usersData.data.find(
            (user: { email: string; password: string; AccountType: string; firstname: string; lastname: string }) =>
              user.email === email && user.password === password
          );

          if (user) {
            setIsLoggedIn(true);
            setAccountType(user.AccountType);
            setUserDetails({ firstname: user.firstname, lastname: user.lastname });
            setMessage("Login successful!");

            // Set main content based on account type
            if (user.AccountType === "applicant") {
              setMainContent(<Bakante_map firstname={user.firstname} lastname={user.lastname} />);
            } else {
              // Route to LandOwner component instead of placeholder
              setMainContent(<LandOwner firstname={user.firstname} lastname={user.lastname} />);
            }
          } else {
            setMessage("Invalid email or password");
          }
        } else {
          setMessage("Invalid data format received from server.");
        }
      } else {
        setMessage("Failed to fetch user data.");
      }
    } catch (error) {
      setMessage("Error occurred while logging in.");
      console.error(error);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Login Page</h1>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {!isLoggedIn ? (
                  <form onSubmit={handleLoginSubmit} className="login-form">
                    <div>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit">Login</button>
                  </form>
                ) : (
                  mainContent
                )}

                {!isLoggedIn && (
                  <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </p>
                )}
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        {message && <p>{message}</p>}
      </div>
    </Router>
  );
};

export default App;
