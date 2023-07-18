import {GET,POST,DELETE,PUT} from "./crud.js"
GET("");
const style = document.querySelector("#style")
const botonCustomStyle = document.querySelector("#botonCustomStyle");
const tablaClientes = document.querySelector("#tablaClientes");
botonCustomStyle.addEventListener("click",function(e) {
    e.preventDefault();
    shiftTema()
})
function cambiarTema(theme) {

    if (theme === 'light') {
      style.textContent = `
        body {
          background-color: #f4f4f4;
          color: #333;
        }
      `;
      tablaClientes.setAttribute("class","table table-hover table-light table-striped border-bottom text-info mt-4")

    } 
    else if (theme === 'dark') {
      style.textContent = `
        body {
          background-color: #333;
          color: #f4f4f4;
        }
        .card{
            background-color: rgb(172, 172, 173);
        }
        .modal-content {
            background-color: #333
        }
        .modal-title{
            color: #f4f4f4;
        }
      `;
    tablaClientes.setAttribute("class","table table-hover table-dark table-striped border-bottom text-info mt-4")
    }

    localStorage.setItem('theme', theme);
  }

  function shiftTema() {
    var miTema = localStorage.getItem('theme');
    if (miTema == 'light') {
      cambiarTema('dark')
    } else if (miTema == 'dark') {
      cambiarTema('light')
    }
  }
  // Obtener el tema del Local Storage al cargar la página
  var savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    cambiarTema(savedTheme);
  }
/* ************************* VARIABLES DEPARTAMENTO ************************* */

const formularioPostDepartamento = document.querySelector('#form');
const dropdownDepartamento = document.querySelector("#categoryId")
const formPutDepartamento = document.querySelector('#formActualizarRutas');
const deleteDepartamento = document.querySelector("#EliminarRutas");
const putDepartamento = document.querySelector("#ActualizarRutas");
/* ************************* VARIABLES CIUDAD ************************* */
const formularioPostCiudad = document.querySelector("#modalAgregarCiudad");
const editDeleteCiudad  = document.querySelector('#Cbody');
const formPutCiudad = document.querySelector('#formActualizar');
const botonAgregarCiudad = document.querySelector("#AgregarPunto");
const tituloCiudad = document.querySelector("#tituloPuntos")

/* ************************* DEPARTAMENTO ************************* */ 
dropdownDepartamento.addEventListener("change", function (e) {
    e.preventDefault();
    putDepartamento.setAttribute("class","btn active")
    deleteDepartamento.setAttribute("class","btn active")
    botonAgregarCiudad.setAttribute("class","btn active")
    tituloCiudad.setAttribute("class","visually")
    let rutaSeleccionada = document.querySelector("#categoryId").value;
    GET(rutaSeleccionada)

})
putDepartamento.addEventListener("click", function (e){
    let id = document.querySelector("#categoryId").value;
    formPutDepartamento.addEventListener("submit", (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        PUT(data,id,"Departamentos");
        });

})
deleteDepartamento.addEventListener("click", function (e){
    let id = document.querySelector("#categoryId").value;
    let tr = e.target.closest("div");
    DELETE(tr,id,"Departamentos");
})
formularioPostDepartamento.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.target)); 
    let accion = e.submitter.dataset.accion
    if (accion === "Registrar"){
        POST(data,"Departamentos")
    }
});
/* ************************* CIUDAD ************************* */
formularioPostCiudad.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = document.querySelector("#categoryId").value;
    let data = Object.fromEntries(new FormData(e.target)); 
    data.departamentoId = parseInt(id);
    let accion = e.submitter.dataset.accion
    if (accion === "Registrar"){
        POST(data,"Ciudades")
    }
});
editDeleteCiudad .addEventListener('click', (e) => {
    e.preventDefault();
    let tr = e.target.closest("div");
    let id = tr.id;
    let accion = e.target.dataset.accion;
    
    if(accion === "Eliminar"){
        DELETE(tr,parseInt(id),"Ciudades");
        tr.remove();
    }
    else if(accion === "Actualizar"){
    let dropdownSeleccionar = document.querySelectorAll("#categoryId");
    const selectOption = dropdownSeleccionar[dropdownSeleccionar.length - 1].querySelector('option[value="0"]');
    if (selectOption) {
      selectOption.remove();
    }    
      formPutCiudad.addEventListener("submit", (e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.target));
        PUT(data,parseInt(id),"Ciudades");
      });
    }
});

