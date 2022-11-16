



const paintArticles = (articles) =>{
	let articleTable = ""

	//Hay que guardar en la string el codigo correspondiente a los elemntos del DOM para luego pintarlo con el innerhtml
	//No lo puedes pintar directamente con el inner html porqure cuando pintas un elemento lo cierra automaticamente

	articleTable = "<table class='table table-striped table-fixed'>"
	articleTable += `
	<thead>
		<tr>
			<th>product</th>
			<th>nombre</th>
			<th>descripcion</th>
			<th>precio</th>
			<th>Opciones</th>	
		</tr>
	</thead>
	<tbody>
	` 
	articles.forEach(art=>{
	
		articleTable += `
		<tr>
			<td><img style="width:50px;" src="assets/${art.id}.jpg"></td>
			<td>${art.nombre}</td>
			<td>${art.descripcion}</td>
			<td>${art.precio}</td>
			<td art="${art.id}">
				<button class="btn btn-primary btnModify">Modificar</button>
				<button class="btn btn-warning btnDelete">Borrar</button>
			</td>
		</tr>
		` 
	})
	articleTable += "</tbody></table>"

	const mContainer = document.getElementById("contenedor")
	mContainer.innerHTML = articleTable

	const btnModify = document.querySelectorAll(".btnModify")
	const btnDelete = document.querySelectorAll(".btnDelete")
	
	btnDelete.forEach(btn=>{
		btn.addEventListener("click", ()=>{deleteArticle(btn.parentNode.attributes.art.value)})
	})

	btnModify.forEach(btn=>{
		btn.addEventListener("click", ()=>{
			dialogUpdate(btn.parentNode.attributes.art.value)
		})
	})

}


const getArticles = () =>{
	const xhr = new XMLHttpRequest()
	xhr.open("GET", "http://localhost:3000/articulos")
	xhr.responseType = "json"
	xhr.send()
	xhr.addEventListener("load", ()=>{paintArticles(xhr.response)})
}

const getArticlesById = (id) =>{
	const xhr = new XMLHttpRequest()
	xhr.open("GET", "http://localhost:3000/articulos/"+id)
	xhr.responseType = "json"
	xhr.send()
	xhr.addEventListener("load", ()=>{

		const response = xhr.response
		document.forms.updateform.id.value = response.id
		document.forms.updateform.nombre.value = response.nombre
		document.forms.updateform.descripcion.value = response.descripcion
		document.forms.updateform.precio.value = response.precio
	
	})
}


const deleteArticle = (id) =>{
	const xhr = new XMLHttpRequest()
	xhr.open("DELETE", "http://localhost:3000/articulos/"+id)
	xhr.send()

	xhr.addEventListener("load", ()=>{

		if(xhr.status > 200 && xhr.status <305){
			console.log("Registro elimnado correctamente")
			getArticles()
		}else{
			console.log("No se pudo eliminar el producto")
		}

	})

}


const updateArticle = (article) =>{
	const xhr = new XMLHttpRequest()
	xhr.open("PUT","http://localhost:3000/articulos/"+article.id)
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
	xhr.send(JSON.stringify(article))

	xhr.addEventListener("load", ()=>{
		getArticles()
	})
}


const insertArticle = (article) =>{
	const xhr = new XMLHttpRequest()
	xhr.open("POST","http://localhost:3000/articulos/")
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
	xhr.send(JSON.stringify(article))

	xhr.addEventListener("load", ()=>{
		getArticles()
	})
}


const dialogUpdate = (id)=>{
	const dialog = document.getElementById("dialogoUpdate")
	const btnCancel = document.getElementById("btnCancelUpdate")
	const btnUpdate = document.getElementById("btnModifiyUpdate")

	getArticlesById(id)

	dialog.showModal()

	btnCancel.addEventListener("click", ()=>{
		dialog.close()
	})


	btnUpdate.addEventListener("click", () =>{
		let article = {}
		Array.from(document.forms.updateform).forEach(input =>{
			article[input.name] = input.value
		})

		updateArticle(article)
	})

}

const dialogInsert = () =>{
	const dialog = document.getElementById("dialogoInsert")
	const btnCancel = document.getElementById("btnCancelInsert")
	const btnInsert = document.getElementById("btnInsert")

	dialog.showModal()

	btnCancel.addEventListener("click", ()=>{
		dialog.close()
	})


	btnInsert.addEventListener("click", () =>{
		let article = {}
		Array.from(document.forms.insertform).forEach(input =>{
			article[input.name] = input.value
		})

		insertArticle(article)
	})

	

}



window.onload = () =>{
	getArticles()

	const btnNuevoArticulo = document.getElementById("btnAddArticle")

	btnNuevoArticulo.addEventListener("click", ()=>{
		dialogInsert()
	})

}



