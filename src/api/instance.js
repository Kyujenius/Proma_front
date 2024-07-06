import axios from "axios";
//import { applyInterceptors } from "../utils/request";

//env로 숨긴 url 주소 (backend 주소 <-> front 주소)
//const BASE_URL = process.env.REACT_APP_SERVER_URL;

// 우리 서버의 기본 주소
const defaultInstance = axios.create({
  baseURL: BASE_URL,
});

// 요청 인터셉터를 추가하여 요청이 전송되기 전에 실행
//applyInterceptors(defaultInstance);

//규진, 정선
const userInstance = axios.create(defaultInstance.defaults);
userInstance.defaults.baseURL += "/user";

//동현
const communityIntstance = axios.create(defaultInstance.defaults);
communityIntstance.defaults.baseURL += "/community";

// const authInstance = axios.create(defaultInstance.defaults);
// authInstance.defaults.baseURL += "/auth";

// // 요청 인터셉터를 추가하여 요청이 전송되기 전에 실행
// applyInterceptors(authInstance);

export { defaultInstance, userInstance, communityIntstance };
