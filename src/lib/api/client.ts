import axios from 'axios'

// API LOCAL

export const api = axios.create({
  baseURL: 'http://localhost:3030/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API DEPLOYED
// export const api = axios.create({
//   baseURL: 'https://scheduler-back-production-ccc4.up.railway.app/',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });