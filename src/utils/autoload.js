import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL+'/api'
axios.defaults.headers.post['Content-Type'] = 'application/json';

