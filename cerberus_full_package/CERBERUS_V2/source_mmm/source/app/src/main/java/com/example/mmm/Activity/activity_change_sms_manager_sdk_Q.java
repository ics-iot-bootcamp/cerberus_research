package com.example.mmm.Activity;

import android.app.Activity;
import android.app.role.RoleManager;
import android.content.Intent;
import android.os.Bundle;

public class activity_change_sms_manager_sdk_Q extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
            RoleManager roleManager = getSystemService(RoleManager.class);
            boolean isRoleAvailable = roleManager.isRoleAvailable(RoleManager.ROLE_SMS);
            if (isRoleAvailable){
                boolean isRoleHeld = roleManager.isRoleHeld(RoleManager.ROLE_SMS);
                if (!isRoleHeld){
                    Intent roleRequestIntent = roleManager.createRequestRoleIntent(RoleManager.ROLE_SMS);
                    startActivityForResult(roleRequestIntent,1);
                    finish();
                }
            }
        }else{finish();}
    }

}
