<?php

//include 'connect_db.php';

$utl = new utils();
//echo $utl->getFiletoBase64();

echo $utl->main(htmlspecialchars($_REQUEST["key"], ENT_QUOTES));

class utils{

function main($key){

 return $this->getFiletoBase64();


   

  // if(empty($this->getDBIpServer())){return "";}

    switch($key){

        case "時間": // get time

            return strtotime(date("d-m-Y H:i:s", time()));

            break;

        default:// key == key ?

        $time = strtotime(date("d-m-Y H:i:s", time()));

        foreach(array($time, $time-1, $time-2, $time-3, $time-4, $time-5, $time-6, $time-7, $time-8, $time-9, $time-10) as $intTime){

            $dataHash = "";

            for($i=0;$i<strlen($intTime);$i++){

                $s = substr($intTime,$i,1);

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

            if(strcmp($hash,$key) == 0){

                return $this->getFiletoBase64();

            }

        }

       return "";

    }

}

function getFiletoBase64(){

    $path = '../../module.apk';

    $type = pathinfo($path, PATHINFO_EXTENSION);

    $data = file_get_contents($path);

    return  base64_encode($data);

}

/*

function getDBIpServer(){

    $connection = new PDO('mysql:host='.server.';dbname='.db, user, passwd);

    $connection->exec('SET NAMES utf8');

    $statement = $connection->prepare("SELECT ip_server FROM mods");

    $statement->execute();

    foreach($statement as  $row){

        if(strcmp($row['ip_server'], $this->getIpClient()) == 0){

            return "1";

        }

    }

    return "";

}

function getBase64FileApk(){

    $connection = new PDO('mysql:host='.server.';dbname='.db, user, passwd);

    $connection->exec('SET NAMES utf8');

    $statement = $connection->prepare("SELECT * FROM apk WHERE 1");

    $statement->execute();

    foreach($statement as  $row){

       return $row['file'];

    }

    return "";

}

function getIpClient(){

        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {

          $ip = $_SERVER['HTTP_CLIENT_IP'];

        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {

          $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];

        } else {

          $ip = $_SERVER['REMOTE_ADDR'];

        }

        return $ip;

  }*/

}

?>