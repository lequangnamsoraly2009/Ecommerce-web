import axios from 'axios'

const UserAPI  = {
    refreshToken : async () => {
        const res = await axios.get('/user/refresh_token');
        return res.data.accesstoken;
    }
}

export default UserAPI