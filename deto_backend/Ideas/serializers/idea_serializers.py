from rest_framework import serializers

from Ideas.models.idea_model import Idea


class IdeaSerializer(serializers.ModelSerializer):
    autor = serializers.SerializerMethodField()

    class Meta:
        model = Idea
        fields = ['idea_id', 'titulo', 'descripcion', 'es_anonima', 'fecha_publicacion', 'usuario_id', 'autor']

    def get_autor(self, obj):
        if obj.es_anonima:
            return "Anónimo"
        return obj.usuario.nombre
