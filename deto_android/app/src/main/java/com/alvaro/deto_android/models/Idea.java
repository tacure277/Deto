package com.alvaro.deto_android.models;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;



@NoArgsConstructor
@AllArgsConstructor
public class Idea {
    private int id;
    private String titulo;
    private String descripcion;
    private boolean es_anonima;
    private int usuario_id;


}