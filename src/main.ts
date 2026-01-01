import { Note } from "./classes/Note";

let notas: Note[] = [];
function recuperarNotas(){
    let data = localStorage.getItem("notas");
    if(data){
        let array = JSON.parse(data);
        // Convertir objetos planos en instancias reales de Note, sino los devuelve en objetos planos y no se podría realizar el nota.getTitle()
        notas = array.map(
            (n: any) => new Note(n.id, n.title, n.isCompleted)
        );
    } else{
        notas = [];
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    recuperarNotas();
    mostrarNotas();
});

function mostrarNotas(){
    if(notas.length == 0){
        console.log("No se han encontrado ninguna nota");
        return;
    }
    let divNotas = document.querySelector("#notas") as HTMLDivElement;
    divNotas.innerHTML = "";
    for(let nota of notas){
        let divNota = document.createElement('div');
        let p = document.createElement('p');
        p.innerText = nota.getTitle();
        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        if(nota.getIsCompleted()){
            checkbox.checked = true;
        }
        checkbox.dataset.id = nota.getId().toString();
        divNota.appendChild(p);
        divNota.appendChild(checkbox);
        divNota.style.display = "flex";
        divNota.style.justifyContent = "center";
        divNotas.appendChild(divNota);
    }
}

let btnAbrirCreacion = document.querySelector("#btnAbrirCreacion") as HTMLButtonElement;
btnAbrirCreacion.addEventListener('click', abrirCreacionNota);
function abrirCreacionNota(){
    let divCreacion = document.querySelector("#crearNota") as HTMLDivElement;
    divCreacion.style.display = "block";
}

let btnCerrarCreacion = document.querySelector("#btnCerrarCreacion") as HTMLButtonElement;
btnCerrarCreacion.addEventListener('click', cerrarCreacionNota);
function cerrarCreacionNota(){
    let divCreacion = document.querySelector("#crearNota") as HTMLDivElement;
    divCreacion.style.display = "none";
    let tituloInput = document.querySelector('#titulo') as HTMLInputElement;
    tituloInput.value = "";
}

let btnCrearNota = document.querySelector("#btnCrearNota") as HTMLButtonElement;
btnCrearNota.addEventListener('click', crearNota);
function crearNota(){
    let tituloInput = document.querySelector('#titulo') as HTMLInputElement;
    let titulo = tituloInput.value;
    let nota = new Note(notas.length+1, titulo, false);
    notas.unshift(nota);
    localStorage.setItem("notas", JSON.stringify(notas));

    mostrarNotas();
    cerrarCreacionNota();
}

let divNotas = document.querySelector("#notas") as HTMLDivElement;
divNotas.addEventListener('click', checkNota);
function checkNota(event: any){
    if(event.target.tagName == "INPUT"){
        if(event.target.checked){
            notas[event.target.dataset.id - 1]?.setIsCompleted(true);
        } else{
            notas[event.target.dataset.id - 1]?.setIsCompleted(false);
        }
        localStorage.setItem("notas", JSON.stringify(notas));
    }
}