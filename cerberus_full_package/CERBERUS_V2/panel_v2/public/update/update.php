<?php

require_once '../config.php';
if(isset($_GET['key']))
{

/*    if($database->has("users", ["apicryptkey" => $_GET['key'] ]))  //no working!!!
    {
        $res = $database->get("users",
            "end_subscribe", [
            "apicryptkey" => $_GET['key']
            ]);
            
        if(!res)
            die('error');
        
        if((time()<=strtotime($res))) {*/
		require 'gen.php';
		$build = new build();
		$build -> run($_GET['key'], $_GET['pass']);
        //}
   // }
}
?>
