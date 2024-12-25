import React from "react";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = React.useState(false);
  const { setUser } = useAuthContext();
  const signUp = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      if (response.ok) {
        alert("Sign up successful!");
      } else {
        alert("Sign up failed!");
      }
    } catch (error) {
      alert("Sign up failed!");
    } finally {
      setLoading(false);
    }
  };
  return { loading, signUp };
};

export default useSignUp;
