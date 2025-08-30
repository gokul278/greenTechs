// AuthContext.tsx

// import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import type { FileData } from "@/Model/CommonModel";

export const RoleList = [
  { type: "admin", id: 1 },
  { type: "headtrainer", id: 2 },
] as const;

export type Role = (typeof RoleList)[number] | null;

export type UserRole = (typeof RoleList)[number]["type"];

// ✅ API Response interface
export interface UserProfile {
  user_Id: number;
  user_name: string;
  user_custId: string;
  refUC_phonenumber: string;
  refUC_email: string;
  refUC_address: string;
  role_Id: number;
  user_profileImg: string;
  //   profileImgFile: FileData | null;
}

// ✅ Context Type
interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  loading: boolean;
  refreshToken: () => Promise<void>; // <-- Add this
}

// ✅ Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRoleState] = useState<Role>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
  };

  const refreshToken = async () => {
    const token = localStorage.getItem("token");

    // try {
    //   const res = await axios.get(
    //     `${import.meta.env.VITE_API_URL}/v1/profile/user`,
    //     {
    //       headers: {
    //         Authorization: token,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log(res);

    //   if (
    //     res.data.error == "Invalid token" ||
    //     res.data.error == "Missing token"
    //   ) {
    //     localStorage.clear();
    //     navigate("/");
    //   } else {
    //     const decryptData = decrypt(res.data.data, res.data.token);
    //     console.log(decryptData);
    //     const profile: UserProfile = decryptData;
    //     setUser(profile);
    //     localStorage.setItem("token", res.data.token);

    //     const matchedRole =
    //       RoleList.find((r) => r.id === profile.role_Id) || null;
    //     setRole(matchedRole);
    //   }
    // } catch (error) {
    //   console.error("Error fetching user profile:", error);
    //   setUser(null);
    //   setRole(null);
    // } finally {
    //   setLoading(false);
    // }

    setUser({
      user_Id: 2,
      user_name: "Gokyl",
      user_custId: "AD11",
      refUC_phonenumber: "9842653415",
      refUC_email: "gokulhk278@gmail.com",
      refUC_address: "salem",
      role_Id: 2,
      user_profileImg: "newikmage",
    });

    const matchedRole = RoleList.find((r) => r.id === 2) || null;
    setRole(matchedRole);
    setLoading(false);
  };

  // const logout = () => {
  //   localStorage.clear();
  //   sessionStorage.clear();
  //   navigate("/");
  // };

  // useIdleLogout(refreshToken, logout);

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ role, setRole, user, setUser, loading, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to consume context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
