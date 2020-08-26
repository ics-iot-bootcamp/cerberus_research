import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.FormBody;
import okhttp3.RequestBody;

import java.io.File;
import java.io.FileWriter;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Random;
import java.util.Scanner;

public class queryCerberus{
	static String campaignName;
	static String C2URL;
	static String C2CommKey;
	static String deviceID;
	static String newID;
	static String registerDevice;
	static String requestInjection;
	static String requestInfo;


	public queryCerberus(boolean testMode, String payload){
		loadConfig();
		System.out.println("Current ID: "+deviceID);
		newID=_randomString(4)+"-"+_randomString(4)+"-"+_randomString(4)+"-"+_randomString(4);
		registerDevice="{\"ID\":\""+newID+"\",\"AR\":\"8\",\"TT\":\""+campaignName+"\",\"CY\":\"us\",\"OP\":\"Android\",\"MD\":\"Unknown Custom\"}";
		requestInjection="{\"AK\":\""+payload+"\"}";
		requestInfo="{\"DM\":\"1\",\"AD\":\"null\",\"BL\":\"64\",\"TW\":\"48\",\"SA\":\"0\",\"SP\":\"2\",\"SS\":\"1\",\"LE\":\"en\",\"SY\":\"0\",\"SM\":\"0\",\"ID\":\""+deviceID+"\",\"IS\":\"\",\"NR\":\"\",\"GA\":\"\",\"PS\":\"0\",\"PC\":\"0\",\"PP\":\"0\",\"PO\":\"0\"}";
	}

	public static String _randomString(int var1) {
		String var2 = "qwertyuiopasdfghjklzxcvbnm1234567890";
		Random var3 = new Random();
		StringBuilder var4 = new StringBuilder();

		for(int var5 = 0; var5 < var1; ++var5) {
			var4.append(var2.charAt(var3.nextInt(var2.length())));
		}
		return var4.toString();
	}

	private static String _base64DecodeHexDecodeRC4Decrypt(String _ciphertext, String _key) {
		try {
			byte[] var4 = Base64.decode(_ciphertext, 0);
			String var2 = new String(var4, "UTF-8");
			byte[] var6 = _hexDecode(var2);
			_RC4Implementation var5 = new _RC4Implementation(_key.getBytes());
			_ciphertext = new String(var5._RC4Decrypt(var6));
			return _ciphertext;
		} catch (Exception var3) {
			return "";
		}
	}

	private static String _base64EncodeHexEncodeRC4Encrypt(String _plaintext, String _key) {
		byte[] var5 = (new _RC4Implementation(_key.getBytes()))._RC4Encrypt(_plaintext.getBytes());
		StringBuffer var2 = new StringBuffer(var5.length * 2);
		int var3 = var5.length;
	
		for(int var4 = 0; var4 < var3; ++var4) {
			_plaintext = Integer.toString(var5[var4] & 255, 16);
			if (_plaintext.length() < 2) {
				var2.append('0');
			}
			var2.append(_plaintext);
		}
		return Base64.encodeToString(var2.toString().getBytes(), 0);
	}
	public static byte[] _hexDecode(String var0) {
		int var1 = var0.length();
		byte[] var2 = new byte[var1 / 2];

		for(int var3 = 0; var3 < var1; var3 += 2) {
			var2[var3 / 2] = (byte)((byte)((Character.digit(var0.charAt(var3), 16) << 4) + Character.digit(var0.charAt(var3 + 1), 16)));
		}
		return var2;
	}

	public static String HTTPRequest(String command, String body){
		try{
			OkHttpClient client = new OkHttpClient();

			RequestBody formBody = new FormBody.Builder()
				.add("q", command)
				.add("ws", _base64EncodeHexEncodeRC4Encrypt(body,  C2CommKey))
				.build();
			System.out.println(_base64EncodeHexEncodeRC4Encrypt(body,  C2CommKey));

			Request request = new Request.Builder()
				.url(C2URL)
				.post(formBody)
				.build();

			Response response = client.newCall(request).execute();
			return _base64DecodeHexDecodeRC4Decrypt(response.body().string(), C2CommKey);
		}catch(Exception e){
			System.out.println("Ex: FAIL");
			return null;
		}
	}
	
	public static void loadConfig(){
		try {
			Scanner scanner = new Scanner(new File("config.txt")); 

			campaignName=scanner.nextLine();
			C2URL=scanner.nextLine();
			C2CommKey=scanner.nextLine();
			deviceID=scanner.nextLine();

			scanner.close();
		} catch (FileNotFoundException e) {
			System.out.println("Error while loading config");
		}
	}
	
	public static void saveConfig(){
		try{
			FileWriter out= new FileWriter("config.txt");

			out.write(campaignName+"\n");
			out.write(C2URL+"\n");
			out.write(C2CommKey+"\n");
			out.write(newID+"\n");
				
			out.close();

		}catch(Exception e){
			System.out.println("Error while saving config");
		}
	}

	public static void main(String args[]){


		queryCerberus d;
		if(!(args.length < 2))
			d=new queryCerberus(false, args[1]);
		else
			d=new queryCerberus(false, "");

		System.out.println(d.C2URL);
	
		String response="";	
		boolean outDirection=false;

		switch(args[0]){
			case "info":
				response=HTTPRequest("info_device",requestInfo);
				break;
			case "getinject":
				response=HTTPRequest("d_attacker", requestInjection);
				outDirection=true;
				break;
			case "register":
				System.out.println("New ID: "+newID);
				response=HTTPRequest("new_device", registerDevice);
				saveConfig();
				break;
			default:
				System.out.println("Unknown parameter");
				break;
		}


		if(outDirection){
			if(response.length()>3){
				try{
					FileWriter outF = new FileWriter(args[1]+".html");
					outF.write(response);
					outF.close();
					System.out.println("Successfully saved to: "+args[1]+".html");
				}catch(Exception e){
					System.out.println("Exception while trying to save");
				 }
			}else{
				System.out.println("NOT FOUND: "+args[1]);
			}
		}else{
			System.out.println(response);
		}

	}
}
