from rest_framework import serializers
from Usuarios.models.usuario_model import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['usuario_id', 'nombre', 'correo', 'descripcion', 'fecha_creacion']