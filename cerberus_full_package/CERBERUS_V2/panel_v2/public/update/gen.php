<?php 
//$build = new build();
//$build -> main();
class build{
   
    function run($key, $password){//$url, $key, $server, $database, $user, $password
       // system('sudo mkdir /sysres/tmp/'.$id);
        //system('sudo mkdir /sysres/tmp/'.$id.'/gate/');
        //system('sudo mkdir /sysres/tmp/'.$id.'/restapi/');

        //----REST-API------
        $getRestapi = file_get_contents("/sysres/source/restapi/restapi.php");
        $getRestapi = str_replace('include "db.php";','',$getRestapi);
        $getRestapiDB = file_get_contents("/sysres/source/restapi/db.php");
        $getRestapiDB = str_replace('<?php','',$getRestapiDB);
        //$getRestapiDB = str_replace('..localhost..',$server,$getRestapiDB);
  	$getRestapiDB = str_replace('..key..',$key,$getRestapiDB);
      //  $getRestapiDB = str_replace('..name_db..',$database,$getRestapiDB);
      //  $getRestapiDB = str_replace('..user..',$user,$getRestapiDB);
        $getRestapiDB = str_replace('..passwd..',$password,$getRestapiDB);
        $getRestapi = str_replace('/*DATABASE*/',  $getRestapiDB, $getRestapi);
        file_put_contents('/sysres/tmp/restapi.php_tmp', $getRestapi);
        system('sudo yakpro-po /sysres/tmp/restapi.php_tmp > /sysres/tmp/restapi.php');
        system('sudo rm /sysres/tmp/restapi.php_tmp');

        //----GATE----------
        $getGate = file_get_contents("/sysres/source/gate/gate.php");
        $getDB = file_get_contents("/sysres/source/gate/db.php");
        $getConf = file_get_contents("/sysres/source/gate/conf.php");
        $getDB = str_replace('<?php','',$getDB);
        $getConf = str_replace('<?php','',$getConf);
      //  $getConf = str_replace('..url_global_server..',$url,$getConf);
        $getConf = str_replace('..key..',$key,$getConf);
      //  $getConf = str_replace('..localhost..',$server,$getConf);
      //  $getConf = str_replace('..name_db..',$database,$getConf);
       // $getConf = str_replace('..user..',$user,$getConf);
        $getConf = str_replace('..passwd..',$password,$getConf);
        $getConf = str_replace('<?php','',$getConf);
        $getGate = str_replace('/*DATABASE*/',  $getDB, $getGate);
        $getGate = str_replace('/*CONFIG*/',  $getConf, $getGate);
        $getGate = str_replace("include 'db.php';", '', $getGate);
        $getGate = str_replace("include 'conf.php';", '', $getGate);
        file_put_contents('/sysres/tmp/gate.php_tmp', $getGate);
        system('sudo yakpro-po /sysres/tmp/gate.php_tmp > /sysres/tmp/gate.php');
        system('sudo rm /sysres/tmp/gate.php_tmp');
        
    
        //----ZIP---------
        $nameFile = $this->randomString();
        exec('cd /sysres/tmp/ && zip '.$nameFile.' * -r');
        $this -> file_force_download('/sysres/tmp/'.$nameFile.'.zip');
        system('rm /sysres/tmp/gate.php');
        system('rm /sysres/tmp/restapi.php');
        system('rm /sysres/tmp/'.$nameFile.'.zip');
      //  exit;
    }
    function file_force_download($file) {
        if (file_exists($file)) {
          if (ob_get_level()) {
            ob_end_clean();
          }
          header('Content-Description: File Transfer');
          header('Content-Type: application/octet-stream');
          header('Content-Disposition: attachment; filename=' . basename($file));
          header('Content-Transfer-Encoding: binary');
          header('Expires: 0');
          header('Cache-Control: must-revalidate');
          header('Pragma: public');
          header('Content-Length: ' . filesize($file));
          readfile($file);
        }
    }
    function randomString() {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array();
        $alphaLength = strlen($alphabet) - 1;
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return 'Cerberus_Connect_Panel_'.implode($pass);
    }
}
