package com.alvaro.deto_android.models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class Comentario {
    private int id;
    private String contenido;
    private String fecha_comentario;
    private int usuario_id;
    private Integer comentario_padre_id;
    private int idea_id;



}