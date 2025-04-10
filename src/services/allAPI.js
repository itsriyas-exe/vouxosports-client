import {commonApi} from '../services/commonApi'
import {serverUrl} from '../services/serverUrl'
import axios from "axios";
export const registerAPI = async(reqBody)=>{
    return await commonApi('post',`${serverUrl}/api/register`,reqBody,'')
}

export const loginAPI = async(reqBody)=>{
    return await commonApi('post',`${serverUrl}/api/login`,reqBody,'')
}

//add match



const API_URL = "https://vouxosports-server-production.up.railway.app/matches";

export const fetchMatches = () => axios.get(API_URL);
export const addMatch = (matchData) => axios.post(API_URL, matchData);
export const deleteMatch = (id) => axios.delete(`${API_URL}/${id}`);
export const updateMatch = (id, matchData) => axios.put(`${API_URL}/${id}`, matchData);

//upcoming 


const app_url = "https://vouxosports-server-production.up.railway.app/upcomingmatches";

export const fetchUpcomingMatches = () => axios.get(app_url);
export const addUpcomingMatch = (matchData) => axios.post(app_url, matchData);
export const deleteUpcomingMatch = (id) => axios.delete(`${app_url}/${id}`);
export const updateUpcomingMatch = (id, matchData) => axios.put(`${app_url}/${id}`, matchData);


const BASE_URL = "https://vouxosports-server-production.up.railway.app/notifications";

export const getNotifications = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addNotification = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const updateNotification = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

export const deleteNotification = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
