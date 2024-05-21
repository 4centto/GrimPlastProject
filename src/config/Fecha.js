function getDay(){
    var f = new Date()
    var dia = f.getDate()
    var mes = (f.getMonth() + 1)
    var annio = f.getFullYear()
    var fecha = ""

    if(mes.toString().length == 1){
        fecha = dia + "/0" + mes + "/" + annio
    } else {
        fecha = dia + "/" + mes + "/" + annio
    }

    return fecha
}

function getHours(){
    var f = new Date()
    var hora = f.getHours()
    var minutos = f.getMinutes()
    var tiempo = ""

    if(minutos.toString().length == 1){
        tiempo = hora + ":0" + minutos
    } else {
        tiempo = hora + ":" + minutos
    }

    return tiempo
}

export {
    getDay,
    getHours
}