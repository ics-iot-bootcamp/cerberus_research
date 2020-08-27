package com.example.mmm.Admin;

import android.content.ComponentName;
import android.content.Context;

public class ClassAdmin {
	private ComponentName componentName;
	public ClassAdmin(Context context){
		componentName = new ComponentName(context.getPackageName(), ReceiverDeviceAdmin.class.getName());
	}
	public ComponentName getComponentName() {
		return componentName;
	}
}
