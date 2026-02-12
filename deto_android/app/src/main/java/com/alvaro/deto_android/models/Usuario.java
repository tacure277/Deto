package com.alvaro.deto_android.models;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    private int id;
    private String nombre;
    private String correo;
    private String contraseña;
    private String fecha_creacion;
    private String descripcion;


}