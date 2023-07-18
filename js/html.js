/* ************************* FUNCION MOSTRAR LAS CARDS CON LOS PUNTOS ************************* */
export async function HTMLPuntos(dataDepartamento, dataCiudades){
    let cbody = document.querySelector("#Cbody")
    cbody.innerHTML = "";
    
    for(const element of dataCiudades){
        const lat = element.coordenadas.lat
        const lon = element.coordenadas.lon
        const dataClima = await clima(lat,lon);
        let div = document.createElement("div");
        div.setAttribute("id",`${element.id}`);
        div.setAttribute("class","col d-flex justify-content-center align-items-center");
        div.innerHTML = `
        <div id="${element.id}" class="card mt-3" style="width: 18rem;">
            <img src="${element.imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${element.nomCiudad}</h5>
                <p class="card-text text-center">${categories(dataDepartamento,element)}</p>
                <p class="card-text">${dataClima.weather[0].description}</p>
                <p class="card-text">Temp: ${dataClima.main.temp}°</p>
                <p class="card-text">Temp max: ${dataClima.main.temp_max}°</p>
                <p class="card-text">Temp min: ${dataClima.main.temp_min}°</p> 
                <div class="row">
                <div id="${element.id}" class="col">
                    <input type="submit" data-accion="Eliminar" value="Eliminar" class="btn-guardar active border-0 rounded px-2">
                </div>
                <div class="col"></div>
                <div id="${element.id}" class="col">
                    <input type="button" data-bs-toggle="modal" data-bs-target="#modalModificarCiudad"  data-accion="Actualizar" value="Actualizar" class="btn-guardar active border-0 rounded px-2">
                </div>
                </div>
            </div>
            
        </div>`
    cbody.appendChild(div)
    }
}
/* ************************* FUNCION MOSTRAR LAS CATEGORIAS EN LA FUNCION HTMLPuntos ************************* */
function categories(dataDepartamento, elementP){
    let categoryName = "";
    dataDepartamento.forEach(elementC =>{
        if (elementP.RutaId == elementC.id) {
             categoryName = elementC.NomRuta
        } 
    })
    return categoryName;
}

/* ************************* FUNCION MOSTRAR LAS RUTAS EN EL DROPDOWN ************************* */
export function HTMLRutas(dataDepartamento){
    let categoryId = document.querySelectorAll("#categoryId");
    let opciones = "";
    dataDepartamento.forEach((element, index) => {
        if (index === 0) {
            opciones += `<option disabled selected id="dropdownSeleccionar" value="0">Seleccione</option>`;
        }
        opciones += `<option value="${element.id}" name="${element.nomDepartamento}">${element.nomDepartamento}</option>`;
    });
    for (let i = 0; i < categoryId.length; i++) {
        categoryId[i].innerHTML = opciones;
    }
    let tbody = document.querySelector("#tbody")
    tbody.innerHTML = "";
    dataDepartamento.forEach(element =>{ 
        let tr = document.createElement("tr");
        tr.setAttribute("id",`${element.id}`);
        tr.setAttribute("class","tr");
        tr.innerHTML = `
        <th></th>
        <td>${element.id}</td>
        <td>${element.nomDepartamento}</td>
        `
        tbody.appendChild(tr);

    })
}

async function clima(latitud, longitud) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${parseInt(latitud)}&lon=${parseInt(longitud)}&lang=sp&units=metric&appid=9561e815716716a006f5b4421cc5d2c2`);
    const data = await response.json();
    return await data;
}

export async function coordenadas(ciudad) {
    const response = await fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=0fe1fcf82b804174ac5910fbf34bcdfa&location=${ciudad},colombia`);
    const data = await response.json();
    return data;
}
