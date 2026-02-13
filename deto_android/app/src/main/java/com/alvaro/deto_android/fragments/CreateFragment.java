package com.alvaro.deto_android.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.alvaro.deto_android.ApiService;
import com.alvaro.deto_android.R;
import com.alvaro.deto_android.RetrofitClient;
import com.alvaro.deto_android.models.Idea;
import com.alvaro.deto_android.requests.CrearIdeaRequest;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.materialswitch.MaterialSwitch;
import com.google.android.material.textfield.TextInputEditText;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CreateFragment extends Fragment {

    private TextInputEditText etTitulo;
    private TextInputEditText etDescripcion;
    private MaterialSwitch switchAnonimo;
    private MaterialButton btnPublicar;
    private MaterialButton btnCancelar;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_create, container, false);

        etTitulo = view.findViewById(R.id.etTitulo);
        etDescripcion = view.findViewById(R.id.etDescripcion);
        switchAnonimo = view.findViewById(R.id.switchAnonimo);
        btnPublicar = view.findViewById(R.id.btnPublicar);
        btnCancelar = view.findViewById(R.id.btnCancelar);

        btnPublicar.setOnClickListener(v -> crearIdea());
        btnCancelar.setOnClickListener(v -> getActivity().onBackPressed());

        return view;
    }

    private void crearIdea() {
        String titulo = etTitulo.getText().toString().trim();
        String descripcion = etDescripcion.getText().toString().trim();
        boolean anonimo = switchAnonimo.isChecked();

        if (titulo.isEmpty()) {
            Toast.makeText(getContext(), "Escribe un título", Toast.LENGTH_SHORT).show();
            return;
        }

        if (descripcion.isEmpty()) {
            Toast.makeText(getContext(), "Escribe una descripción", Toast.LENGTH_SHORT).show();
            return;
        }

        btnPublicar.setEnabled(false);

        CrearIdeaRequest request = new CrearIdeaRequest(titulo, descripcion, anonimo, 1);

        ApiService api = RetrofitClient.getApiService();
        Call<Idea> call = api.crearIdea(request);

        call.enqueue(new Callback<Idea>() {
            @Override
            public void onResponse(Call<Idea> call, Response<Idea> response) {
                btnPublicar.setEnabled(true);

                if (response.isSuccessful()) {
                    Toast.makeText(getContext(), "¡Idea creada!", Toast.LENGTH_SHORT).show();
                    getActivity().getOnBackPressedDispatcher();
                } else {
                    Toast.makeText(getContext(), "Error: " + response.code(), Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Idea> call, Throwable t) {
                btnPublicar.setEnabled(true);
                Toast.makeText(getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }
}