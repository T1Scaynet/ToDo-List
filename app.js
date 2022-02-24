const formulario = document.getElementById('formulario');
const input = document.getElementById('input');
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();
let tareas = {};

// Local Store
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

listaTarea.addEventListener('click', e => {
    btnAccion(e)
})

// console.log(Date.now())

formulario.addEventListener('submit', e => {
    e.preventDefault()
    // console.log(input.value)

    setTarea(e)
})

const setTarea = e => {
    if(input.value.trim() === '') {
        console.log('esta vacio')
        return
    }
    //console.log('diste click')

    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false,
    }
    //console.log(tarea)
    tareas[tarea.id] = tarea;
    //console.log(tareas)

    formulario.reset()
    input.focus()

    pintarTareas()
}


const pintarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas))

    if(Object.values(tareas).length === 0) {
        listaTarea.innerHTML = `
        <div class="text-center m-4">
            No hay tareas pendientes
        </div>
        `
        return
    }

    listaTarea.innerHTML = ''
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto

        if(tarea.estado){
            //clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            //clone.querySelectorAll('.icons')[0].classList.replace('check-icons', 'changes-icons')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

        clone.querySelectorAll('.icons')[0].dataset.id = tarea.id
        clone.querySelectorAll('.icons')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })

    listaTarea.appendChild(fragment)
}

const btnAccion = e => {
    if(e.target.classList.contains('check-icons')) {
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
    }

    if(e.target.classList.contains('delete-icons')) {
        delete tareas[e.target.dataset.id]
        pintarTareas()
        console.log(tareas)
    }

    if(e.target.classList.contains('changes-icons')) {
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
        console.log(tareas)
    }


    e.stopPropagation()
}