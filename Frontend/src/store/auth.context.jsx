import { createContext, useState, useEffect } from "react";
import { userGetme } from "../services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const [profile, setProfile] = useState(null);
  async function getMe() {
    setLoading(true);

    try {
      const data = await userGetme();

      setUser(data.user);
      setProfile(data.profile);
    } catch (err) {
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMe(); 
  }, []);


  return (
    
    <AuthContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        loading,
        setLoading,
        getMe, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
