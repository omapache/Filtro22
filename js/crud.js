import {HTMLPuntos,HTMLRutas,coordenadas} from "../js/html.js";

const URL = "http://localhost:3000"
const headers = new Headers({'Content-Type': 'application/json'});

/* ************************* METODO GET(MOSTRAR) ************************* */
export async function GET(rutaSeleccionada){
    let dataDepartamento = await (await fetch(`${URL}/Departamentos`)).json();
    let dataCiudades = await (await fetch(`${URL}/Ciudades?departamentoId=${rutaSeleccionada}`)).json();
    if(rutaSeleccionada != ""){
        HTMLPuntos(dataDepartamento, dataCiudades)
        
    }else if(rutaSeleccionada == ""){
        HTMLRutas(dataDepartamento)
    }
}

/* ************************* METODO POST(AGREGAR) ************************* */
export async function POST(data,url){
    const dataCoordenadas = await coordenadas(data.nomCiudad);
    const lat = dataCoordenadas.latitude
    const lon = dataCoordenadas.longitude
    let informacionCoordenadas = {
        "lat": lat,
        "lon": lon
    }
    data.coordenadas = informacionCoordenadas
    let config = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }
    await fetch(`${URL}/${url}`,config).json();
}

/* ************************* METODO DELETE(ELIMINAR) ************************* */
export async function DELETE(div,id,url){
    let data = Object.fromEntries(new FormData(div.target));
    let config = {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(data)
    };
    if(url == "Departamentos"){
        await fetch(`${URL}/${url}/${id}`, config);
        await fetch(`${URL}/${url}?departamentoId=${id}`, config);
    }else if(url =="Ciudades"){
        await fetch(`${URL}/${url}/${id}`,config).json();
    }

}

/* ************************* METODO PUT(ACTUALIZAR) ************************* */
export async function PUT(data,id,url) {
    if(url == "Departamentos"){
        let config = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        }
        await fetch(`${URL}/${url}/${id}`,config).json();

    }else if(url =="Ciudades"){
        const dataCoordenadas = await coordenadas(data.nomCiudad);
        const lat = dataCoordenadas.latitude
        const lon = dataCoordenadas.longitude
        let informacionCoordenadas = {
            "lat": lat,
            "lon": lon
        }
        data.coordenadas = informacionCoordenadas

        let config = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        }
        await fetch(`${URL}/${url}/${id}`,config).json();

    }
    
    
}
