Pokedex App

Aplicacion web desarrollada con React y Typescript que consume la API pública de
Pokemon(PokeAPI) y la API de JSONPlaceholder para implementar un CRUD de 
publicaciones.

Tecnologías utilizadas

React
TypeScript
React Router DOM
React Query (TanStack Query)
React Hook Form
Zod
Axios
Tailwind CSS v3
Vite

APIs utilizadas
PokeAPI

https://pokeapi.co/

Permite obtener información sobre Pokemon , incluyendo 

Nombre
Imagen
Tipos
Estadísticas
Información detallada

JSONPlaceholder

https://jsonplaceholder.typicode.com/

Utilizada para implementar el CRUD de publicaciones:

Crear post
Listar posts
Ver detalle
Editar post
Eliminar post

Funcionalidades
Nivel 1
Listado de Pokémon.
Consumo de API con React Query.
Diseño responsivo con Tailwind CSS.
Skeletons de carga.
Búsqueda de Pokémon.

Nivel 2
Vista de detalle de Pokémon.
Navegación con React Router.
Paginación.
Formulario validado con Zod.
Nivel 3
CRUD completo de Posts.
Integración de una segunda API.
Uso de Axios.
Manejo de errores personalizado.
Hooks personalizados.
Modularización por features.
Componentes reutilizables.
Estructura del proyecto
src
├-- components
├-- features
│   └-- posts
│       ├-- hooks
│       ├-- pages
│       ├-- schemas
│       └-- services
├-- pages
├-- services
├-- types
└-- hooks
Instalación

Clonar el repositorio:

git clone https://github.com/PauloCLG09/pokedex-app.git

Ingresar al proyecto:

cd pokedex-app

Instalar dependencias:

npm install

Ejecutar en desarrollo:

npm run dev

Generar build de producción:

npm run build
Rutas principales
Ruta	Descripción
/	Lista de Pokémon
/pokemon/	Detalle de Pokémon
/posts	Lista de Posts
/posts/create	Crear Post
/posts/	Detalle de Post
/posts/edit/	Editar Post
Autor

Paulo Cesar Lagos Guerrero