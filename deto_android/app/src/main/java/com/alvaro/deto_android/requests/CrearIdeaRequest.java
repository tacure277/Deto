package com.alvaro.deto_android.requests;


import org.jspecify.annotations.NonNull;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor

@AllArgsConstructor

// se envia datos  aqui
public class CrearIdeaRequest {
    private String titulo;
    private String descripcion;
    private boolean es_anonima;
    private int usuario_id;


}