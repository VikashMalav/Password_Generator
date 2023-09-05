"use client"
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Home() {
  const [password, setpassword] = useState('');
  const [length, setLength] = useState(8);
  const [spChar, setSpChar] = useState(false);
  const [number, setNumber] = useState(false);

  const copyRef = useRef(null);

  useEffect(() => {
    PasswordGenerator();
  }, [length, number, spChar]);

  const PasswordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (spChar) str += "!@#$%^&*()_+-=[]{}|\\;:'\",./<>?`~";
    if (number) str += "0123456789";
    let pass = '';
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, spChar, number, setpassword]);

  const copyHandler = () => {
    window.navigator.clipboard.writeText(password)
      .then(() => {
        copyRef.current.select();
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-indigo-600">
      <h1 className="text-4xl font-semibold text-white p-4 mb-8 bg-blue-800 rounded-lg shadow-lg">
        Password Generator
      </h1>
      <div className="bg-white rounded-lg shadow-md p-4  w-full">
        {/* Larger container for the generator */}
        <div className="p-6 bg-gray-100 rounded-lg">
          <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-4">
            <input
              className="flex-1 py-2 px-4 rounded-lg border focus:ring-indigo-400"
              autoFocus
              value={password}
              ref={copyRef}
              readOnly
            />
            <button
              className="w-full md:w-auto px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-indigo-200 focus:outline-none mt-2 md:mt-0"
              type="button"
              onClick={copyHandler}
            >
              COPY
            </button>
          </div>
          <div className="flex flex-wrap space-y-2 mt-4 items-center justify-center gap-4">
            <label className="flex items-center space-x-1">
              <input
                className="form-range"
                type="range"
                onChange={(e) => setLength(e.target.value)}
              />
              <span className="text-gray-600">Length: {length}</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
                checked={number}
                onChange={() => setNumber((prev) => !prev)}
              />
              <span className="text-gray-600">Number Allowed</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600"
                checked={spChar}
                onChange={() => setSpChar((prev) => !prev)}
              />
              <span className="text-gray-600">Special Characters Allowed</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
