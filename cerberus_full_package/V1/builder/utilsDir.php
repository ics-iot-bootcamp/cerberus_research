<?php

class utilsDir{
    function frontendTables($id_user){


       $arrayFiles = $this -> getFiles('/sysbig/buildFile/'.$id_user);

       $table = "";
        foreach($arrayFiles as $path){
            $nameFile = basename($path,".apk");
            $table = $table."<tr>
                                <td>$nameFile.apk</td>
                                <td><a href='getfile.php?download=".base64_encode($nameFile)."&id=".$id_user."'>Download</a></td>
                             </tr>";
        }

        return $table;
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
  
}
