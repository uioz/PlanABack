import Axios from "axios";

const instance = Axios.create();

const requestPackages = {
  GET(url, params) {
    // TODO contentType
    return instance.get(url,{
      params
    });
  },
  POST(url,data){
    // TODO contentType
    return instance.post(url,data);
  }
}

export default {
  async get(context, { url, data }) {
    return (await requestPackages.GET(url, data)).data;
  },
  async post(context,{url,data}){
    return (await requestPackages.POST(url, data)).data;
  }
}
