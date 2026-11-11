import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5280"

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);


export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)    
    return result.data;
  },

  addTask: async(name)=>{
    console.log('addTask', name)
    const result = await axios.post(`/items`,{name})    
    return result.data;
  },

  setCompleted: async(id, isComplete)=>{
    console.log('setCompleted', {id, isComplete})
    const result = await axios.put(`/items/${id}`, { isComplete });
    return result.data;
  },

  deleteTask:async(id)=>{
    console.log('deleteTask',id)
    await axios.delete(`/items/${id}`);
  }
};
