import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      
      // Store user data in localStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        providerId: user.providerId,
        role: 'user' // Default role, will be updated from backend
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Send user data to backend
      const backendUserData = await saveUserToBackend(userData);
      
      // Update user data with backend response
      const updatedUserData = {
        ...userData,
        role: backendUserData.role || 'user',
        isActive: backendUserData.isActive !== false
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      setUser(updatedUserData);
      toast.success('Successfully signed in!');
      return updatedUserData;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast.error('Failed to sign in. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Save user to backend
  const saveUserToBackend = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/google-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to save user to backend');
      }

      const result = await response.json();
      console.log('User saved to backend:', result);
      return result.user;
    } catch (error) {
      console.error('Error saving user to backend:', error);
      // Return default user data if backend fails
      return { role: 'user', isActive: true };
    }
  };

  // Sign out
  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Successfully signed out!');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  // Check if user is active
  const isActive = () => {
    return user && user.isActive !== false;
  };

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in with Firebase
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          providerId: firebaseUser.providerId,
          role: 'user' // Default role
        };
        
        // Check if user data exists in localStorage
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          localStorage.setItem('user', JSON.stringify(userData));
          const backendUserData = await saveUserToBackend(userData);
          
          // Update with backend data
          const updatedUserData = {
            ...userData,
            role: backendUserData.role || 'user',
            isActive: backendUserData.isActive !== false
          };
          
          localStorage.setItem('user', JSON.stringify(updatedUserData));
          setUser(updatedUserData);
        } else {
          // Use stored user data but verify with Firebase
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.uid === firebaseUser.uid) {
            setUser(parsedUser);
          } else {
            // UID mismatch, update with Firebase data
            const backendUserData = await saveUserToBackend(userData);
            const updatedUserData = {
              ...userData,
              role: backendUserData.role || 'user',
              isActive: backendUserData.isActive !== false
            };
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            setUser(updatedUserData);
          }
        }
      } else {
        // User is signed out from Firebase, but keep localStorage data for now
        // Only clear if explicitly signed out
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setUser(null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOutUser,
    isAdmin,
    isActive
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 