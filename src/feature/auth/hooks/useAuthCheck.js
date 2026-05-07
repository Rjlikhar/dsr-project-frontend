import { useEffect, useState } from "react";
import { client } from "../../../api/apiclient";
import { authRepository } from "../repositories/authRepository";

export function useAuthCheck() {
  const [loader, setLoader] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setIsLoggedIn(false);
        setLoader(false);
        return;
      }

      try {
        await authRepository.me();
        setIsLoggedIn(true);
      } catch {
        localStorage.removeItem("auth_token");
        setIsLoggedIn(false);
      } finally {
        setLoader(false);
      }
    };

    checkAuth();
  }, []);

  return { isLoggedIn, loader };
}
