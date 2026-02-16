package com.alvaro.deto_android.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.Toast;
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

import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeFragment extends Fragment {

    private RecyclerView recyclerViewIdeas;
    private LinearLayout layoutEmpty;
    private IdeasAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);

        recyclerViewIdeas = view.findViewById(R.id.recyclerViewIdeas);
        layoutEmpty = view.findViewById(R.id.layoutEmpty);

        View fabCrearIdea = view.findViewById(R.id.fabCrearIdea);
        fabCrearIdea.setOnClickListener(v -> {
            FragmentTransaction transaction = getParentFragmentManager().beginTransaction();
            transaction.replace(R.id.fragment_container, new CreateFragment());
            transaction.addToBackStack(null);
            transaction.commit();
        });

        recyclerViewIdeas.setLayoutManager(new LinearLayoutManager(getContext()));

        adapter = new IdeasAdapter(idea -> {
            FragmentTransaction transaction = getParentFragmentManager().beginTransaction();
            transaction.replace(R.id.fragment_container, DetalleIdea.newInstance(idea));
            transaction.addToBackStack(null);
            transaction.commit();
        });

        recyclerViewIdeas.setAdapter(adapter);

        cargarIdeas();

        return view;
    }

    @Override
    public void onResume() {
        super.onResume();
        cargarIdeas();
    }

    private void cargarIdeas() {
        CrearIdeaService api = RetrofitClient.getCrearIdeaService();
        Call<List<Idea>> call = api.getIdeas();

        call.enqueue(new Callback<List<Idea>>() {
            @Override
            public void onResponse(Call<List<Idea>> call, Response<List<Idea>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Idea> ideas = response.body();

                    if (ideas.isEmpty()) {
                        recyclerViewIdeas.setVisibility(View.GONE);
                        layoutEmpty.setVisibility(View.VISIBLE);
                    } else {
                        recyclerViewIdeas.setVisibility(View.VISIBLE);
                        layoutEmpty.setVisibility(View.GONE);
                        adapter.setIdeas(ideas);
                    }
                }
            }

            @Override
            public void onFailure(Call<List<Idea>> call, Throwable t) {
                Toast.makeText(getContext(), "Error de conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }
}