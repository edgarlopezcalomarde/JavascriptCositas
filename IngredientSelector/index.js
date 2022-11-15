

const selectInit = document.querySelector(".inicial")
const selectPreparando = document.querySelector(".preparando")



let ingredientes = [
    "Pepinillos",
    "Pan de molde",
    "Lechuga",
    "Tomate",
    "Oregano",
    "Queso",
    "Mayonesa"

]



const construirSelect = () =>{

    ingredientes.forEach((ingrediente, index) =>{

        const option = document.createElement("option")
        option.value = index
        option.appendChild(document.createTextNode(ingrediente))


        selectInit.appendChild(option)
    })


}

construirSelect()
const btnAgregar = document.querySelector(".btnAgregar")
const btnEliminar = document.querySelector(".btnEliminar")


btnAgregar.addEventListener("click", ()=>{
    selectPreparando.appendChild(selectInit[selectInit.selectedIndex])
})


btnEliminar.addEventListener("click", ()=>{
    selectInit.appendChild(selectPreparando[selectPreparando.selectedIndex])
})



