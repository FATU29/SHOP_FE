import { useRouter } from "next/router";
import { clearLocalUserData, clearTemporaryToken, getLocalUserData, getTemporaryToken, setLocalUserData, setTemporaryToken } from "../storage";
import { jwtDecode } from "jwt-decode";
import { NextPage } from "next";
import { useAuth } from "src/hooks/useAuth";
import { BASE_URL, API_ENDPOINT } from "src/configs/api";
import axios from "axios";

type TProps = {
  children: React.ReactNode
}

const instanceAxios = axios.create({ baseURL: BASE_URL });

const IntercepterAxios: NextPage<TProps> = ({ children }) => {
  const router = useRouter();
  const { setUser,user } = useAuth();


  instanceAxios.interceptors.request.use(async (config) => {
    // Làm gì đó trước khi yêu cầu được gửi đi
    const { accessToken, refreshToken } = getLocalUserData();
    const { temporaryToken } = getTemporaryToken();
    if (accessToken || temporaryToken) {
      let decodeAccessToken: any = {};
      if (accessToken) {
        decodeAccessToken = jwtDecode(accessToken);
      } else if (temporaryToken) {
        decodeAccessToken = jwtDecode(temporaryToken);
      }

      if (decodeAccessToken?.exp > Date.now() / 1000) {
        config.headers['Authorization'] = `Bearer ${accessToken ? accessToken : temporaryToken}`;
      } else {
        if (refreshToken) {
          const decodeRefreshToken: any = jwtDecode(refreshToken);
          if (decodeRefreshToken.exp > Date.now() / 1000) {
            // Gọi API để lấy accessToken mới
            const resetToken = await axios(API_ENDPOINT.AUTH.REFRESH_TOKEN, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              data: {}
            }).then((res) => {
              const newToken = res.data.data.access_token;
              if(newToken){
                config.headers['Authorization'] = `Bearer ${newToken}`;
                if(accessToken){
                  setLocalUserData(JSON.stringify(user), accessToken, refreshToken)
                } else {
                  setLocalUserData(JSON.stringify(user), "", refreshToken)
                  setTemporaryToken(newToken);
                }
              }
            }).catch((error) => {
              setUser(null);
              clearLocalUserData();
              // router.replace("/login");
            })
          } else {
            setUser(null);
            clearLocalUserData();
            // router.replace("/login");
          }
        } else {
          setUser(null);
          clearLocalUserData();
          // router.replace("/login");
        }
      }
    } else {
      setUser(null);
      clearLocalUserData();
      clearTemporaryToken();
      // router.replace("/login");
    }
    return config;
  });
  return <>{children}</>
}



export { instanceAxios };
export default IntercepterAxios;
