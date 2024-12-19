import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, value }),
      });
      if (response.ok) {
        setMessage('Data submitted successfully!');
        setName('');
        setValue('');
      } else {
        setMessage('Failed to submit data.');
      }
    } catch (error) {
      setMessage('Error occurred while submitting data.');
      console.error(error);
    }
  };

  return (
    <>
      <h1>Submit Data to MySQL</h1>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="value">Value:</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value ? parseInt(e.target.value) : '')}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </>
  );
}

export default App;
