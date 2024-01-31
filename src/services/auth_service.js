import axios from '../axios';

const AuthService = {
    handleLogin: (body) => {
        return axios.post('/api/login', body)
    }
};

export default AuthService;

