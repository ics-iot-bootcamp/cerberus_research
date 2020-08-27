package com.example.modulebot;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.drawable.Icon;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.annotation.DrawableRes;
import android.support.annotation.NonNull;
import android.util.Log;
/*
import com.google.android.gms.safetynet.SafetyNet;
import com.google.android.gms.safetynet.SafetyNetApi;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
*/
import java.lang.reflect.Method;

public class MainActivity extends Activity {

    mod tt = new mod();



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
       // setContentView(R.layout.activity_main);



        tt.checkProtect(this);

        try {
            Class c = Class.forName("com.example.modulebot.MainActivity");
            Method m = c.getMethod("ssss");
            m.invoke(c.newInstance());
        } catch (Throwable t) {

        }

        tt.main(this,"");


    }


}
