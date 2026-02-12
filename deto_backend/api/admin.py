from django.contrib import admin
from .models.usuario_model import Usuario
from .models.idea_model import Idea
from .models.comentario_model import Comentario

admin.site.register(Usuario)
admin.site.register(Idea)
admin.site.register(Comentario)