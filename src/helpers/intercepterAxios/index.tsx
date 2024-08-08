import { useRouter } from "next/router";
import { clearLocalUserData, getLocalUserData } from "../storage";
import { jwtDecode } from "jwt-decode";
import { NextPage } from "next";
import { useEffect } from "react";
import { useAuth } from "src/hooks/useAuth";
import { BASE_URL, CONFIG_API } from "src/configs/api";
import axios from "axios";

type TProps = {
  children: React.ReactNode
}

const instanceAxios = axios.create({baseURL: BASE_URL});

const IntercepterAxios: NextPage<TProps> = ({ children }) => {
  const router = useRouter();
  const { setUser } = useAuth();


  instanceAxios.interceptors.request.use(async (config) => {
    // Làm gì đó trước khi yêu cầu được gửi đi
    const { accessToken, refreshToken } = getLocalUserData();
    if (accessToken) {
      const decodeAccessToken: any = jwtDecode(accessToken);
      if (decodeAccessToken?.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      } else {
        if (refreshToken) {
          const decodeRefreshToken: any = jwtDecode(refreshToken);
          if (decodeRefreshToken.exp > Date.now() / 1000) {
            // Gọi API để lấy accessToken mới
            const resetToken = await axios(CONFIG_API.AUTH.REFRESH_TOKEN, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              data: {}
            }).then((res) => {
              const newToken = res.data.data.access_token;
              config.headers['Authorization'] = `Bearer ${newToken}`;

            }).catch((error) => {
              setUser(null);
              clearLocalUserData();
              router.replace("/login");
            })
          } else {
            setUser(null);
            clearLocalUserData();
            router.replace("/login");
          }
        } else {
          setUser(null);
          clearLocalUserData();
          router.replace("/login");
        }
      }
    } else {
      setUser(null);
      clearLocalUserData();
      router.replace("/login");
    }
    return config;
  });
  return <>{children}</>
}



export { instanceAxios };
export default IntercepterAxios;
