package com.example.mmm.Activity;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;

import com.example.mmm.Utils.idUtils;
import com.example.mmm.Utils.utils;
import com.example.mmm.constants;


public class actDozeMode extends Activity {

    idUtils idutl= new idUtils();
    constants consts = new constants();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try {

            if (!idutl.is_dozemode(this)) {
                try {
                    Intent intent1 = new
                            Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS,
                            Uri.parse(consts.strPackage + getPackageName()));
                    intent1.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    intent1.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                    startActivity(intent1);
                } catch (Exception ex) {
                }
            }
        }catch (Exception ex){
        //    utl.SettingsToAdd(this, consts.LogSMS , consts.string_140 + ex.toString() +consts.string_119);
        }
        finish();
    }
}
