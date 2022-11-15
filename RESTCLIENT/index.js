function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


const makeSelectForMethod = () =>{

    const methods = ["GET", "DELETE", "POST", "PATCH", "PUT"]
    const select = document.getElementById("methods")

    methods.forEach( method =>{
        const option = document.createElement("option")
        option.value = method
        option.appendChild(document.createTextNode(method))
        select.appendChild(option)
    })

}

const request = (method, url) =>{
    const respuesta = document.getElementById("respuesta")
    const xhr = new XMLHttpRequest()
    xhr.responseType = "json"
    xhr.open(method, url)
    xhr.send()

    xhr.addEventListener("load", ()=>{

        respuesta.innerHTML = syntaxHighlight(JSON.stringify(xhr.response))
        
    })
 
}

const makeRequest = () =>{
    const select = document.getElementById("methods")
    const btnSend = document.getElementById("btnEnviar")
    const search = document.getElementById("requestSearch")
    
    btnSend.addEventListener("click", ()=>{
        request(select.value, search.value)
    })

}


//  JSON.stringify(data, null,' ').replace('[', '').replace(']', '')

makeSelectForMethod()
makeRequest()