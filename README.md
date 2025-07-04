# React Django CRUD ejemplo

_Aplicación web para ejercitar o tomar como ejemplo en un proyecto con react y django_

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

Mira **Deployment** para conocer como desplegar el proyecto.


### Pre-requisitos 📋

_Primero que todo tenemos que tener un entorno virtual creado con tadas las dependecias del proyecto el mismo esta hecho con Python y Django_

### Instalación 🔧

_Instalación del entorno virtual con virtualenv_

_Instalamos el modulo de python la el entorno virtual_

```
# apt-get install python-virtualenv
```

_Creamos el entorno virtual es este caso es con python 2.7_

```
$ virtualenv entorno1
```

_Para crear un entorno virtual con python 3_

```
$ virtualenv -p /usr/bin/python3 entorno2
```
_Nos movemos al directorio que se creo y listamos_

```
$ cd entorno2
$ ls
bin  lib
```
_Activamos el entorno virtual_

```
$ source entorno2/bin/activate
(entorno2)$
```
_o despues de estar en el directorio del entorno virtual ponemos_

```
source bin/activate
```
_Ejemplo de como hacerlo todo en una linea en este caso es notificacion el entorno virtual_

```
cd env/nombre del proyecto/ && source bin/activate && cd ~ && cd projects/nombre del proyecto
```
_Desactivar el entorno virtual_

```
deactivate
```
_Instalando paquetes dentro del entorno virtual_

```
pip install django
```
_o instalar paquetes que esten en un fichero requirements.txt_

```
pip install -r requirements.txt
```
_De esta forma ya tenemos en entorno virtual preparado para que nuestra aplicación pueda correr sin problema alguno_

### Instalación Backend 🛠️

_Preparando el Backend_
_Activando el entorno virtual en linux_

```
cd env/nombre del proyecto/ && source bin/activate
```
_Pasamos a la carpeta del proyecto en este caso esta en una carpeta que se llama proyectos_

```
cd proyectos/nombre del proyecto
```

_Instalar los paquetes que esten en elfichero requirements.txt del proyecto_

```
pip install -r requirements.txt
```

_Ejecutas las migraciones, tener en cuenta que primero tienes que tener configurado la bd del proyecto en este caso Postgresql_

```
python manage.py makemigrations
```
```
python manage.py migrate
```
_Correr la aplicacion con el servidor de django_

```
python manage.py runserver
```

### Instalación Frontend 🛠️

_Pasamos a la carpeta del proyecto llamada frontend_

```
cd proyectos/nombre del proyecto/frontend
```
_Instalamos las dependencias ejecutando_

```
npm install
```
_Ejecutamos el servidor vite_

```
npm run dev
```

## Deployment 📦

_Este proyecto esta configurados para despelgar desde gitlab con docker, ten en cuenta que las direcciones ip, nombre de bd, puertos, usuarios y password son todos por defecto es recomendable cambiar antes de poner en produccion_

## Construido con 🛠️

_Herramientas que se utilizarón para crear el proyecto_

* [Python](https://www.python.org/) - El lenguaje de programación usado
* [Django](https://www.djangoproject.com/) - El framework web usado backend
* [React](https://react.dev/) - El framework web usado frontend
* [Visual Studio Code](https://code.visualstudio.com/) - Editor Usado

## Licencia 📄

Este proyecto está bajo la Licencia (GPL3) - mira el archivo [LICENSE.md](LICENSE) para detalles o el enlace actualizado [GPL_V3](https://www.gnu.org/licenses/gpl-3.0.html)
