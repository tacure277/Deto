package com.alvaro.deto_android.fragments;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.alvaro.deto_android.R;
import com.alvaro.deto_android.RetrofitClient;
import com.alvaro.deto_android.adapters.IdeasAdapter;
import com.alvaro.deto_android.models.Idea;
import com.alvaro.deto_android.service.CrearIdeaService;
import com.google.android.material.button.MaterialButton;
import java.util.ArrayList;
import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.Context.MODE_PRIVATE;

public class ActividadFragment extends Fragment {

    private RecyclerView recyclerViewMisIdeas;
    private LinearLayout layoutEmpty;
    private IdeasAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_activity, container, false);

        recyclerViewMisIdeas = view.findViewById(R.id.recyclerViewMisIdeas);
        layoutEmpty = view.findViewById(R.id.layoutEmpty);
        MaterialButton btnCrearPrimeraIdea = view.findViewById(R.id.btnCrearPrimeraIdea);

        recyclerViewMisIdeas.setLayoutManager(new LinearLayoutManager(getContext()));
        
        adapter = new IdeasAdapter(idea -> {
            FragmentTransaction transaction = getParentFragmentManager().beginTransaction();
            transaction.replace(R.id.fragment_container, DetalleIdea.newInstance(idea));
            transaction.addToBackStack(null);
            transaction.commit();
        });
        
        recyclerViewMisIdeas.setAdapter(adapter);

        btnCrearPrimeraIdea.setOnClickListener(v -> {
            FragmentTransaction transaction = getParentFragmentManager().beginTransaction();
            transaction.replace(R.id.fragment_container, new CreateFragment());
            transaction.addToBackStack(null);
            transaction.commit();
        });

        cargarMisIdeas();

        return view;
    }

    private void cargarMisIdeas() {
        SharedPreferences prefs = requireContext().getSharedPreferences("UserPrefs", MODE_PRIVATE);
        int usuarioId = prefs.getInt("usuario_id", 1);

        CrearIdeaService api = RetrofitClient.getCrearIdeaService();
        Call<List<Idea>> call = api.getIdeas();

        call.enqueue(new Callback<List<Idea>>() {
            @Override
            public void onResponse(Call<List<Idea>> call, Response<List<Idea>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Idea> todasLasIdeas = response.body();
                    
                    List<Idea> misIdeas = new ArrayList<>();
                    for (Idea idea : todasLasIdeas) {
                        if (idea.getUsuario_id() == usuarioId) {
                            misIdeas.add(idea);
                        }
                    }
                    
                    if (misIdeas.isEmpty()) {
                        recyclerViewMisIdeas.setVisibility(View.GONE);
                        layoutEmpty.setVisibility(View.VISIBLE);
                    } else {
                        recyclerViewMisIdeas.setVisibility(View.VISIBLE);
                        layoutEmpty.setVisibility(View.GONE);
                        adapter.setIdeas(misIdeas);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Idea>> call, Throwable t) {
                layoutEmpty.setVisibility(View.VISIBLE);
                recyclerViewMisIdeas.setVisibility(View.GONE);
            }
        });
    }
}
