import axios from "axios";

export default axios.create({
    url: "http://localhost3001/api/auth",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
})