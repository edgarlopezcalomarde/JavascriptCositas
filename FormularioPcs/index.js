
const estado = document.querySelector(".estado")

const listFormatter = (data) =>{
    let list = "<ul>"

    data.forEach(entry =>{

        for (let key in entry) {
            list+=`<li>${key}: ${entry[key]}</li>`
        }
        
    })
    list+="</ul><br>"

    return list;
}

const objectFormatter = (data) =>{
    let box = ""
    data.forEach(entry =>{
        box+= `${JSON.stringify(entry)}<br>`
    })

    return box;
}

const sendPostFormData = () =>{
	let post=new FormData(document.forms.posts);
	let newPost={};

	for (let par of post) {
		newPost[par[0]]=par[1]
	}

	let xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://localhost:3000/posts')
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
	xhr.send(JSON.stringify(newPost));

    xhr.addEventListener("load", ()=>{{
        const posts = document.getElementById("posts")
        if(xhr.status >= 200 && xhr.status <300){
            estado.innerHTML =xhr.status+": Todo correcto mi bro";
        }else{
            estado.innerHTML =xhr.status+": Algo salio mal";
            posts.innerHTML = ""
        }
       
    }})
}



const sendPostJson = () =>{
    let post = {}
    Array.from(document.forms.posts).forEach(input => {
        post[input.name] = input.value;
    });

    const xhr  = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:3000/posts")
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.send(JSON.stringify(post))


    xhr.addEventListener("load", ()=>{{
        const posts = document.getElementById("posts")
        if(xhr.status >= 200 && xhr.status <300){
            estado.innerHTML =xhr.status+": Todo correcto mi bro";
        }else{
            estado.innerHTML =xhr.status+": Algo salio mal";
            posts.innerHTML = ""
        }
       
    }})

}


const getAllPost = () =>{
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/posts")
    xhr.responseType = "json"
    xhr.send();


    xhr.addEventListener("load", ()=>{{
        const posts = document.getElementById("posts")
        if(xhr.status >= 200 && xhr.status <300){
            //posts.innerHTML = JSON.stringify(xhr.response)
            //posts.innerHTML = listFormatter(xhr.response)
            posts.innerHTML = objectFormatter(xhr.response)
            estado.innerHTML =xhr.status+": Todo correcto mi bro";
    
        }else{
            estado.innerHTML =xhr.status+": Algo salio mal";
            posts.innerHTML = ""
        }
       
    }})
}


const getPostById = (id) =>{

    const xhr = new XMLHttpRequest()
    xhr.open("GET", `http://localhost:3000/posts/${id}`)
    xhr.send()

    xhr.addEventListener("load", ()=>{{
        const posts = document.getElementById("posts")

        if(xhr.status >= 200 && xhr.status <300){
            posts.innerHTML = xhr.response
            estado.innerHTML =xhr.status+": Todo correcto mi bro";
        }else{
            estado.innerHTML =xhr.status+": Algo salio mal";
            posts.innerHTML = ""
        }
       
    }})

    
}


const deletePost = (id) => {
    const xhr = new XMLHttpRequest()
    xhr.open("DELETE", "http://localhost:3000/posts/"+id)
    xhr.send()

    xhr.addEventListener("load", ()=>{
        const posts = document.getElementById("posts")

        if(xhr.status >= 200 && xhr.status <300){
            estado.innerHTML =xhr.status+": Todo correcto mi bro";
        }else{
            estado.innerHTML =xhr.status+": Algo salio mal";
            posts.innerHTML = ""
        }
    })
}

const updatePost = (id, title, author) => {
    const xhr = new XMLHttpRequest()

    let post = {}
    Array.from(document.forms.posts).forEach(input => {
        post[input.name] = input.value;
    });

    xhr.open("PATCH", "http://localhost:3000/posts/"+id)
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    xhr.send(JSON.stringify(post))

    xhr.addEventListener("load", ()=>{
        const posts = document.getElementById("posts")

        if(xhr.status >= 200 && xhr.status <300){
            estado.innerHTML =xhr.status+": Todo correcto mi bro";
        }else{
            estado.innerHTML =xhr.status+": Algo salio mal";
            posts.innerHTML = ""
        }
    })
}




const form = document.querySelector('#postBox');
const btnAgregar = document.querySelector(".btnAgregar")
const btnGetAll = document.querySelector(".btnGetAll")
const btnGetId = document.querySelector(".btnGetId")
const btnDelete = document.querySelector(".btnDelete")
const btnUpdate = document.querySelector(".btnUpdate")


btnAgregar.addEventListener("click", (e)=>{
    e.preventDefault()
    sendPostJson()
    //sendPostFormData()
})

btnGetAll.addEventListener("click", (e)=>{
    getAllPost()
})

btnGetId.addEventListener("click", (e)=>{
    getPostById(document.forms.posts.id.value)
})

btnDelete.addEventListener("click", (e)=>{  
    deletePost(document.forms.posts.id.value)
})

btnUpdate.addEventListener("click", (e)=>{
   updatePost(document.forms.posts.id.value, document.forms.posts.title, document.forms.posts.author)
})