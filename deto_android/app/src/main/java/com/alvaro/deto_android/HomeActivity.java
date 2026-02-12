package com.alvaro.deto_android;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.alvaro.deto_android.fragments.HomeFragment;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


public class HomeActivity extends AppCompatActivity {  // ← EXTENDER

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragment_container, new HomeFragment())
                .commit();



    }
}