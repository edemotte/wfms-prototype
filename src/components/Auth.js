import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import '../Auth.css';

const Auth = ({ setUser }) => {
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password, displayName } = event.target.elements;

    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        await userCredential.user.updateProfile({ displayName: displayName.value });
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      }
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="text"
            name="displayName"
            placeholder="Display Name"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <p
        className="auth-toggle"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp
          ? 'Already have an account? Sign In'
          : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Auth;
