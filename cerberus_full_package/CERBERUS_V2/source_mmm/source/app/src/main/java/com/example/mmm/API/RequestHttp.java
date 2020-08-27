package com.example.mmm.API;

import android.os.AsyncTask;


import com.example.mmm.constants;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;


public class RequestHttp {
    constants consts = new constants();
    public String sendRequest(String url, String parametr){
        SendLoginData SendLoginData = new SendLoginData();
        SendLoginData.execute(url,parametr);
        try{
            return SendLoginData.get();
        }
        catch (Exception x){
            return consts.str_null;
        }
    }

    class SendLoginData extends AsyncTask<String, String, String> {
        String resultString = null;
        @Override
        protected void onPreExecute()
        {
            super.onPreExecute();
        }
        @Override
        protected String doInBackground(String... urls)
        {
            try
            {
                String myURL = urls[0];
                String parammetrs = urls[1];
                byte[] data = null;
                InputStream is = null;
                try {
                    URL url = new URL(myURL);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod(consts.str_POST);
                    conn.setDoOutput(true);
                    conn.setDoInput(true);
                    conn.setRequestProperty(consts.str_Content_Length, Integer.toString(parammetrs.getBytes().length));
                    OutputStream os = conn.getOutputStream();
                    data = parammetrs.getBytes(consts.strUTF_8);
                    os.write(data);
                    int lenDate=parammetrs.length();
                    data = null;
                    conn.connect();
                    int responseCode= conn.getResponseCode();
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    if (responseCode == 200) {
                        is = conn.getInputStream();

                        byte[] buffer = new byte[lenDate+3000];
                        int bytesRead;
                        while ((bytesRead = is.read(buffer)) != -1) {
                            baos.write(buffer, 0, bytesRead);
                        }
                        data = baos.toByteArray();
                        resultString = new String(data, consts.strUTF_8);
                    } else {
                    }
                    lenDate=0;
                } catch (MalformedURLException e){}catch (IOException e){}catch (Exception e){}} catch (Exception e) {e.printStackTrace();}

            return resultString;
        }
        @Override
        protected void onPostExecute(String result){super.onPostExecute(result);}
    }
}