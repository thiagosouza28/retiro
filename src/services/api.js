import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-distrito-ipitinga.onrender.com'
})

export default api
