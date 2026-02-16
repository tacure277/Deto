from rest_framework import serializers

from Comentarios.models.comentario_model import Comentario


class ComentarioSerializer(serializers.ModelSerializer):
    autor = serializers.SerializerMethodField()

    class Meta:
        model = Comentario
        fields = ['comentario_id', 'contenido', 'fecha_comentario', 'usuario_id', 'idea_id', 'autor']

    def get_autor(self, obj):
        return obj.usuario.nombre