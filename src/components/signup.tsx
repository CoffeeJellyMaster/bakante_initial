

// import { useState } from 'react';
// import './Signup.css';

// const Signup = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [accountType, setAccountType] = useState<'applicant' | 'land_owner' | null>(null);

//   // Applicant form fields
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [middleInitial, setMiddleInitial] = useState('');
//   const [age, setAge] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [yearLevel, setYearLevel] = useState('');
//   const [course, setCourse] = useState('');

//   // Land Owner form fields
//   const [dormName, setDormName] = useState('');
//   const [dormAddress, setDormAddress] = useState('');
//   const [capacity, setCapacity] = useState('');

//   // Handle form submission
//   const handleSignupSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert('Passwords do not match.');
//       return;
//     }

//     // Prepare form data
//     const formData = {
//       email,
//       password,
//       accountType,
//       ...(accountType === 'applicant'
//         ? { firstName, lastName, middleInitial, age, contactNumber, yearLevel, course }
//         : { firstName, lastName, middleInitial, dormName, dormAddress, capacity, contactNumber }
//       ),
//     };


    
//     // Send the form data to the backend API (adjust the route accordingly)
//     try {
//       const response = await fetch('http://localhost:5000/api/signup', {  // Adjust URL as needed
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert('Signup successful!');
//       } else {
//         alert('Signup failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('There was an error with the signup.');
//     }
//   };

//   return (
//     <div className="Signup">
//       <h1>Signup Page</h1>

//       {/* Signup Form */}
//       <form onSubmit={handleSignupSubmit} className="signup-form">
//         {/* Email and Password Fields */}
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>

//         {/* Account Type Selection */}
//         <div>
//           <button type="button" onClick={() => setAccountType('applicant')}>Applicant</button>
//           <button type="button" onClick={() => setAccountType('land_owner')}>Land Owner</button>
//         </div>

//         {/* Conditional Form Rendering Based on Account Type */}
//         {accountType === 'applicant' && (
//           <>
//             <div>
//               <label htmlFor="firstName">First Name:</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName">Last Name:</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="middleInitial">Middle Initial:</label>
//               <input
//                 type="text"
//                 id="middleInitial"
//                 value={middleInitial}
//                 onChange={(e) => setMiddleInitial(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="age">Age:</label>
//               <input
//                 type="number"
//                 id="age"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="contactNumber">Contact Number:</label>
//               <input
//                 type="tel"
//                 id="contactNumber"
//                 value={contactNumber}
//                 onChange={(e) => setContactNumber(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="yearLevel">Year Level:</label>
//               <input
//                 type="text"
//                 id="yearLevel"
//                 value={yearLevel}
//                 onChange={(e) => setYearLevel(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="course">Course:</label>
//               <input
//                 type="text"
//                 id="course"
//                 value={course}
//                 onChange={(e) => setCourse(e.target.value)}
//                 required
//               />
//             </div>
//           </>
//         )}

//         {accountType === 'land_owner' && (
//           <>
//             <div>
//               <label htmlFor="firstName">First Name:</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName">Last Name:</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="middleInitial">Middle Initial:</label>
//               <input
//                 type="text"
//                 id="middleInitial"
//                 value={middleInitial}
//                 onChange={(e) => setMiddleInitial(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="dormName">Dorm Name:</label>
//               <input
//                 type="text"
//                 id="dormName"
//                 value={dormName}
//                 onChange={(e) => setDormName(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="dormAddress">Dorm Address:</label>
//               <input
//                 type="text"
//                 id="dormAddress"
//                 value={dormAddress}
//                 onChange={(e) => setDormAddress(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="capacity">Capacity:</label>
//               <input
//                 type="number"
//                 id="capacity"
//                 value={capacity}
//                 onChange={(e) => setCapacity(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="contactNumber">Contact Number:</label>
//               <input
//                 type="tel"
//                 id="contactNumber"
//                 value={contactNumber}
//                 onChange={(e) => setContactNumber(e.target.value)}
//                 required
//               />
//             </div>
//           </>
//         )}

//         {/* Submit Button */}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;
import { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'applicant' | 'land_owner' | null>(null);

  // Applicant form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [course, setCourse] = useState('');

  // Land Owner form fields
  const [dormName, setDormName] = useState('');
  const [dormAddress, setDormAddress] = useState('');
  const [capacity, setCapacity] = useState('');

  // Handle form submission
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Determine tableName based on account type
    const tableName = accountType === 'applicant' ? 'applicants' : 'LandOwners';

    // Prepare form data without email, password, and accountType for applicants
    const formData: any = {
      ...(accountType === 'applicant'
        ? { firstName, lastName, middleInitial, age, contactNumber, yearLevel, course }
        : { firstName, lastName, middleInitial, dormName, dormAddress, capacity, contactNumber }
      ),
    };

    const accData = {
      email,
      password,
      firstName,
      lastName,
      accountType
    }

    try {
      console.log(formData);

      // Use CREATE function to send data to backend (adjust the URL as needed)
      const response = await fetch(`http://localhost:5000/api/create/${tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // const data = await response.json();

      if (response.ok) {
        alert('Signup successful!');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error with the signup.');
    }

    try {
    //ACCOUNTS

      // Use CREATE function to send data to backend (adjust the URL as needed)
      const response = await fetch(`http://localhost:5000/api/create/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accData),
      });

      // const data = await response.json();

      if (response.ok) {
        alert('Signup successful!');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error with the signup.');
    }
  };

  return (
    <div className="Signup">
      <h1>Signup Page</h1>

      {/* Signup Form */}
      <form onSubmit={handleSignupSubmit} className="signup-form">
        {/* Email and Password Fields */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Account Type Selection */}
        <div>
          <button type="button" onClick={() => setAccountType('applicant')}>Applicant</button>
          <button type="button" onClick={() => setAccountType('land_owner')}>Land Owner</button>
        </div>

        {/* Conditional Form Rendering Based on Account Type */}
        {accountType === 'applicant' && (
          <>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="middleInitial">Middle Initial:</label>
              <input
                type="text"
                id="middleInitial"
                value={middleInitial}
                onChange={(e) => setMiddleInitial(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="yearLevel">Year Level:</label>
              <input
                type="text"
                id="yearLevel"
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="course">Course:</label>
              <input
                type="text"
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {accountType === 'land_owner' && (
          <>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="middleInitial">Middle Initial:</label>
              <input
                type="text"
                id="middleInitial"
                value={middleInitial}
                onChange={(e) => setMiddleInitial(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="dormName">Dorm Name:</label>
              <input
                type="text"
                id="dormName"
                value={dormName}
                onChange={(e) => setDormName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="dormAddress">Dorm Address:</label>
              <input
                type="text"
                id="dormAddress"
                value={dormAddress}
                onChange={(e) => setDormAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="capacity">Capacity:</label>
              <input
                type="number"
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="tel"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
