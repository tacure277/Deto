from rest_framework import serializers
from .models.idea_model import  Idea
from .models.comentario_model import  Comentario
from .models.usuario_model import  Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['usuario_id', 'nombre', 'correo', 'descripcion']


class IdeaSerializer(serializers.ModelSerializer):
    autor = serializers.SerializerMethodField()

    class Meta:
        model = Idea
        fields = ['idea_id', 'titulo', 'descripcion', 'es_anonima', 'fecha_publicacion', 'usuario_id', 'autor']

    def get_autor(self, obj):
        if obj.es_anonima:
            return "Anónimo"
        return obj.usuario.nombre


class ComentarioSerializer(serializers.ModelSerializer):
    autor = serializers.SerializerMethodField()

    class Meta:
        model = Comentario
        fields = ['comentario_id', 'contenido', 'fecha_comentario', 'usuario_id', 'idea_id', 'autor']

    def get_autor(self, obj):
        return obj.usuario.nombre