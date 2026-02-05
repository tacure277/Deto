"# Deto comunidad de preguntas/ideas/dudas sobre cualquier tema sobre programacion " 
### Prototipo Figma
[Ver diseño completo →](https://www.figma.com/design/gk8Ece3lhjrvvTZyzvGJDE/app?node-id=2007-6&t=RbRZfEyI6T9bop7w-1)

## 📋 Análisis de Entorno

## PROBLEMITAS
- no tener donde compartir ideas sobre proyectos , dudas , o problemas en espeficico 

## SOLUCION 
- app centrada en (compartir , comentar, solucionar ) ideas o problemas dentro de una comunidad 

**Requisitos:**
- Registro y login
- Publicar ideas/dudas
- Comentar publicaciones
- Ver perfil y actividad propia
- Opción de publicación anónima
  
##  Persona

**Carlos, 21 años - Estudiante de Programación**

Necesita un lugar para publicar dudas específicas, compartir ideas de proyectos y recibir ayuda de la comunidad sin sentirse juzgado.


### Tipografia
**Roboto** (Material Design estándar) 

📖 Historias de Usuario

 usuario, quiero registrarme/iniciar sesión para acceder a la comunidad.

 usuario, quiero crear una idea para compartir un problema o proyecto.

 usuario, quiero comentar en ideas para ayudar o recibir ayuda.

 usuario, quiero ver el detalle de una idea con sus comentarios.

 usuario, quiero editar mi perfil y ver mis ideas.

 usuario, quiero cerrar sesión para proteger mi cuenta.


 ## ENTIDAD RELACION:(el  diagrama en Figma )

USUARIO con IDEA

- Tipo: Uno a Muchos
- Un usuario puede publicar muchas ideas
- Una idea pertenece a un solo usuario

USUARIO con COMENTARIO

- Tipo: Uno a Muchos

- Un usuario puede escribir muchos comentarios
- Un comentario pertenece a un solo usuario


IDEA con COMENTARIO

- Tipo: 1:N Uno a Muchos
- Una idea puede tener muchos comentarios
- Un comentario pertenece a una sola idea

##  Tecnologías

**Android:** Java, Material 3, Retrofit, RecyclerView, Fragments  
**Backend:** Django, Django REST Framework, SQLite

##  Arquitectura

**Patrón:** MVVM

Fragments → ViewModels → Repository → API (Retrofit)


**Capas:**
- UI: Fragments y RecyclerViews
- ViewModel: Lógica de negocio
- Repository: Comunicación con API REST
- Backend: Django REST Framework


##  Componentes Android

**Layouts:**
- activity_main.xml
- fragment_home.xml
- fragment_create.xml
- fragment_activity.xml
- fragment_profile.xml
- item_idea.xml
- item_comment.xml

**Fragments:**
- HomeFragment (lista ideas)
- CreateIdeaFragment (formulario)
- ActivityFragment (mis ideas)
- ProfileFragment (perfil)

**RecyclerViews:**
- Lista de ideas
- Lista de comentarios
