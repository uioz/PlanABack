import Axios from "axios";

const AxiosInstance = Axios.create({
  withCredentials:true
});

export default AxiosInstance;
