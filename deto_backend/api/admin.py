from django.contrib import admin

from .models.comentario_model import Comentario
from .models.idea_model import Idea
from .models.usuario_model import Usuario

admin.site.register(Usuario)
admin.site.register(Idea)
admin.site.register(Comentario)