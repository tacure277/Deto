package com.alvaro.deto_android.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.alvaro.deto_android.R;
import com.alvaro.deto_android.models.Idea;
import com.google.android.material.chip.Chip;

public class DetalleIdea extends Fragment {

    private static final String ARG_IDEA = "idea";
    private Idea idea;

    public static DetalleIdea newInstance(Idea idea) {
        DetalleIdea fragment = new DetalleIdea();
        Bundle args = new Bundle();
        args.putSerializable(ARG_IDEA, idea);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            idea = (Idea) getArguments().getSerializable(ARG_IDEA);
        }
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_detail, container, false);

        TextView tvAutorDetail = view.findViewById(R.id.tvAutorDetail);
        TextView tvTituloDetail = view.findViewById(R.id.tvTituloDetail);
        TextView tvDescripcionDetail = view.findViewById(R.id.tvDescripcionDetail);
        TextView tvFechaDetail = view.findViewById(R.id.tvFechaDetail);
        Chip chipAnonimoDetail = view.findViewById(R.id.chipAnonimoDetail);

        if (idea != null) {
            tvTituloDetail.setText(idea.getTitulo());
            tvDescripcionDetail.setText(idea.getDescripcion());
            tvFechaDetail.setText(idea.getFecha_publicacion());

            if (idea.isEs_anonima()) {
                tvAutorDetail.setText("Anónimo");
                chipAnonimoDetail.setVisibility(View.VISIBLE);
            } else {
                tvAutorDetail.setText(idea.getAutor() != null ? idea.getAutor() : "Usuario");
                chipAnonimoDetail.setVisibility(View.GONE);
            }
        }

        return view;
    }
}