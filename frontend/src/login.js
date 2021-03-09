import axios from "axios";

async function login(email, password) {
    const res =await axios.post("api/jwt/login/", {email, password});
    const {data} = await res;
    if (data.error) {
        return data.error
    } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("user", data.id);
        localStorage.setItem("conyuge", data.conyuge);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("rol", data.rol);
        
        return true
    }
}

async function check() {
    const token = localStorage.getItem("token")

        if(!token === undefined){
            const res = await axios.post("api/jwt/checkiftokenexpire/", {},{
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            const {data} = await res;
            return data.success
        }

        const refresh_token = localStorage.getItem("refreshToken")

        if (!refresh_token) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            localStorage.removeItem("conyuge")
            localStorage.removeItem("nombre")
            localStorage.removeItem("rol")
            return false;
        }
        if(refresh_token){
            axios.post("api/jwt/refresh/", {}, {
                headers: {
                    Authorization: `Bearer ${refresh_token}`
                }
            }).then(res => {
                localStorage.setItem("token", res.data.token)
            })
            return true;
        }
        // console.log('hola')
        return false;
}

function logout() {
    if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token")
        axios.post("api/jwt/access_exit/", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                localStorage.removeItem("conyuge")
                localStorage.removeItem("nombre")
                localStorage.removeItem("rol")
            }
        })
    }
    if (localStorage.getItem("refreshToken")) {
        const refreshToken = localStorage.getItem("refreshToken")
        axios.post("api/jwt/refresh_exit/", {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                localStorage.removeItem("refreshToken")
                localStorage.removeItem("id")
                localStorage.removeItem("conyuge")
                localStorage.removeItem("nombre")
                localStorage.removeItem("rol")
            }
        })
    }
    localStorage.clear();
    window.location = "/login"
}



export {login, check, logout};