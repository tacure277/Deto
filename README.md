º"# Deto comunidad de preguntas/ideas/dudas sobre cualquier tema sobre programacion " 
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

**USUARIO con IDEA**

- Tipo: Uno a Muchos
- Un usuario puede publicar muchas ideas
- Una idea pertenece a un solo usuario

**USUARIO con COMENTARIO**

- Tipo: Uno a Muchos

- Un usuario puede escribir muchos comentarios
- Un comentario pertenece a un solo usuario


**IDEA con COMENTARIO**

- Tipo: 1:N Uno a Muchos
- Una idea puede tener muchos comentarios
- Un comentario pertenece a una sola idea

##  Tecnologías

**Android:** Java, Material 3, Retrofit, RecyclerView, Fragments ,Glide,
**Backend:** Django, Django REST Framework, SQLite, JWT Autenticacion, SQlite ,

##  Arquitectura

**Patrón:** MVC + Retrofit

Fragments → Contrallers → Serivce → Retrofit -> Api Django-> Response ->Model -> View  


**Capas:**
- Vistas: Fragments y Layouts Xml 
- Modelos: (Usuario , Ideas , Comentarios) Mapeado del modelo de la api 
- Contraladore: (Fragments y Activitys ) LLamada a la api , Logica de la  app, actualizacion de la ui 
- Backend: Django REST Framework
- Servicios: ComentarioService , CrearIdeaService, UsuarioService
- - Request : ComentraioRequest , CrearIdeaRequest , LoginRequest, Registro,Request 
- Response:LoginResponse


##  Componentes Android

**Layouts:**
- activity_main.xml
- fragment_home.xml
- fragment_create.xml
- fragment_activity.xml
- fragment_profile.xml
- fragment_editar_perfil.xml
- item_idea.xml
- item_comment.xml

**Fragments:**
- HomeFragment (lista ideas)
- CreateIdeaFragment (formulario)
- ActivityFragment (mis ideas)
- ProfileFragment (perfil)
- DetalleIdea (Crear publicaciones)
- EditarPerfilFragment (Editar Perfil)
   


**Adapters / RecyclerViews:** 
- Lista de ideas
- Lista de comentarios
