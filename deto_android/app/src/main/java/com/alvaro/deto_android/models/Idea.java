package com.alvaro.deto_android.models;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Idea  implements Serializable { //  necesita pasarlos a bytes
    private int idea_id;
    private String titulo;
    private String descripcion;
    private boolean es_anonima;
    private String fecha_publicacion;
    private int usuario_id;
    private String autor;
}