# ApuntesGIT

## ¿Que es GIT?

Git es un sistema de control de versiones.

## Configuracion inicial
````
git config --global user.name "edgar"
git config --global user.email edgarlopezcalomarde@gmail.com


//Proxy
git config --global http.proxy http://172.16.0.9:8080
git config --global https.proxy http://172.16.0.9:8080
````

### Estados de un fichero

1. **untracked** (archivos sin seguimiento): Son ficheros que existe en el área de trabajo pero no existen para git.
2. **staged** (cambios a ser confirmados): Son ficheros modificados que se añadirán al siguiente commit.
3. **committed**: Son ficheros que se guardaron en el ultimo commit y que no han sido modificados desde dicho commit.
4. **modified** (cambios no rastreados para el commit): Son ficheros que se han modificado desde el último commit pero que aun no se han añadido para el próximo commit.

<br>

Agregas un fichero al **staged** desde **untracked** o **modified**:
````
git add archivo.txt
````

Agregas  todos los ficheros al **staged** desde **untracked** o **modified**:
````
git add *
````

Quitas fichero del **staged** y lo devuelves al  **untracked** o **modified**:
````
git reset archivo.txt
````
o

````
git restore --staged archivo.txt
````

Pasas del estado **modified** al **untracked**:
````
git rm --cached archivo.txt
````


Pasas de **staged** a **committed**:
````
git commit -m "commit inicial" 
````

Pasas de **commited** a **untracked**:
````
git rm --cached archivo.txt
````

Hacer que el commit incluya lo que hay en el **staged** y lo que hay en **modified**:
````
git commit -a -m "uwu"
````

Para deshacer los cambios de un fichero en el area de trabajo y que se cambie por el ultimo commit utilizamos:
````
git checkout archivo.txt
````

Ver el estado de cada uno de los ficheros:
````
git status
````

Para poner en el área de trabajo una copia del último commit de master:

````
git checkout master
````
Para copiar los commits que hay en nuestro repositorio local al repositorio remoto (y también a la copia del repositorio remoto origin/master):

````
git push
git push origin master
````
Para copiar lo que hay en el repositorio remoto en la copia del repositorio remoto, es decir en origin/master:

````
git fetch
git fetch origin master
````

Para mergear lo que hay en la rama origin/master en la rama master:

````
git merge origin/master
````

### Remotes
En Git un "remote" hace referencia a un servidor de Git donde subimos el código. Por defecto cuando hacemos git clone se crea un remote llamado origin. 
````
git remote -v
````

Para añadir otro remote:
````
git remote add otroservidor https://www.otroservidor.com/lgonzalezmislata/prueba.git
````
Una vez creado el remote otroservidor ya podremos usarlo en los comandos git push, git fetch o git pull además de usar origin.

<br>

### Borrado de commits

Para ver los id de los commit:
````
git log
````
Para verlo cute:
````
git log --oneline
````

Volver a un commit anterior y borrando todos los posteriores pero modificando el área de trabajo al dejar ahí los ficheros del commit y vaciando la staged area:
````
git reset --hard 0d588ed
````

Volver a un commit anterior y borrando todos los posteriores pero sin modificar ni el área de trabajo ni la staged area.
````
git reset --soft 0d588ed
````

Volver a un commit anterior y borrando todos los posteriores , sin modificar ni el área de trabajo pero vaciando la staged area.

````
git reset --mixed 0d588ed
````

Si queremos deshacer el último commit (es decir como si no hubiéramos lanzado el comando git commit) se usa la siguiente orden. Ya que HEAD es el nombre del último commit y HEAD~1 el del penúltimo commit.

````
git reset --soft HEAD~1
````


//Combinar

git add *
git add archivo.txt
git reset archivo.txt

git commit -am "mensaje"
git  status


git rm --cached archivo.txt // pasar de modified a untracked
git rm --cached archivo.txt // pasar de commit a untracked


git checkout archivo.txt //Devuelve el archivo local 

git log --oneline //Ver log bonito


//Origin/master es un remoto solo para ver los cambios del fichero
git fetch //para traerme los cambios de github
git checkout origin/master //Para ver la rama donde se gurda por defecto al hacer un fetch pero solo para ver
git switch origin/master 
git merge origin/master //para mergear la rama oculta con la master

git remote -v //Para ver los remotos
git remote add otroservidor https://www.otroservidor.com/lgonzalezmislata/prueba.git //Agregar remotos


git reset --hard 0d588ed // Volver a un commit anterior y borrando todos los posteriores pero modificando el área de trabajo al dejar ahí los ficheros del commit y vaciando la staged area.

git reset --soft 0d588ed //  Volver a un commit anterior y borrando todos los posteriores pero sin modificar ni el área de trabajo ni la staged area.

git reset --mixed 0d588ed // Volver a un commit anterior y borrando todos los posteriores , sin modificar ni el área de trabajo pero vaciando la staged area.

git reset --soft HEAD~1 // Si queremos deshacer el último commit (es decir como si no hubiéramos lanzado el comando git commit) se usa la siguiente orden. Ya que HEAD es el nombre del último commit y HEAD~1 el del penúltimo commit.
//Mantiene tu area de trabajo no la toca


Moverse en git

git checkout 0d588ed //Volver a un commit anterior, no se borran los siguientes commits pero obviamente si que de modifica el área de trabajo para poner los ficheros de ese commit.

.gitkeep
Por defecto Git no sube las carpetas vacías, por lo que si queremos que las suba hay que añadir algún fichero. Por convención se suele crear un fichero llamado .gitkeep y al ya haber algún fichero, git subirá esa carpeta.

.gitignore
El fichero .gitignore permite indicar que carpetas no se deben subir a git. El fichero debe estar en el raíz del proyecto de git.

Almacenando contraseñas
git config --global credential.helper cache
git config --global credential.helper store


//lOG

git --no-pager log --pretty=oneline
git --no-pager log --pretty=tformat:"%h %cn %cd %s" --date=format:"%d/%m/%Y %H:%M:%S"