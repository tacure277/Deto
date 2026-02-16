from django.db import models


class Usuario(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    correo = models.CharField(max_length=100, unique=True)
    contraseña = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    def save(self, *args, **kwargs):
        if not self.nombre:
            raise ValueError("Nombre vacío")
        if not self.correo:
            raise ValueError("Correo vacío")
        if "@" not in self.correo:
            raise ValueError("Correo no válido")
        if not self.contraseña:
            raise ValueError("Contraseña vacía")
        if len(self.contraseña) < 8:
            raise ValueError("La contraseña debe tener mínimo 8 caracteres")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"[{self.usuario_id}] {self.nombre} ({self.correo})"