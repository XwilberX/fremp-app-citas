import axios from "axios";

function checkCita() {
    const token = localStorage.getItem("token")

    if(token !== undefined){
        axios.get("http://127.0.0.1:5000/api/cita/"+localStorage.getItem("user"))
        .then((res) => {
            localStorage.setItem("cita", JSON.stringify(res.data[0]))
            localStorage.setItem("esposo", JSON.stringify(res.data[1]))
            localStorage.setItem("esposa", JSON.stringify(res.data[2]))
            // const cita = JSON.parse(localStorage.getItem('cita'));
            // const esposo = JSON.parse(localStorage.getItem('esposo'));
            // const esposa = JSON.parse(localStorage.getItem('cita'));
            // console.log(cita)
        })
        return true;
    }

    return false;

}

export {checkCita};