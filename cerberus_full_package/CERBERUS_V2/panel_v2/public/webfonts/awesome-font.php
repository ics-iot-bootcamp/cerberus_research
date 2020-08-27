<?
	/* автор скрипта https://webtask.pro */

	$ver = "5.8.1";
    function newCurl($url, $getpost = "get", $options = []){
		$ch = curl_init();
		if(strtolower((substr($url,0,5))=='https')) { // если соединяемся с https
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		}
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_AUTOREFERER, true);	//TRUE для автоматической установки поля Referer: в запросах, перенаправленных заголовком Location:.
		if(@$options["referer"])
			curl_setopt($ch, CURLOPT_REFERER, $options["referer"]);
		if(@$options["verbose"])		//cURL будет выводить подробные сообщения о всех производимых действиях
			curl_setopt($ch, CURLOPT_VERBOSE, 1);
		curl_setopt($ch, CURLOPT_POST, ($getpost=="post" ? 1 : 0));
		if(@$options["followlocation"])
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		if(@$options["postdata"])
			curl_setopt($ch, CURLOPT_POSTFIELDS, $options["postdata"]);
		curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:56.0) Gecko/20100101 Firefox/60.0");
		if(@$options["header"])
			curl_setopt($ch, CURLOPT_HEADER, 1);
		if(is_array(@$options["httpheader"]))
			curl_setopt($ch, CURLOPT_HTTPHEADER, $options["httpheader"]);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		$result = curl_exec($ch);
		curl_close($ch);
		return $result;
	}

	echo "1. <a href=\"?files=1\">Скачать файлы</a><br>";
	echo "2. <a href=\"?group=1\">Категории</a><br>";
	echo "3. <a href=\"?icons=1\">Иконки</a><br>";
	echo "4. <a href=\"?brands=1\">Бренды</a><br>";
	echo "5. <a href=\"?css=1\">CSS</a><br><br>";

	if($_GET["files"] == 1){
		echo "<h2>v".$ver."</h2>";
		$opts = [
			"httpheader"=>[
				"Accept: application/font-woff2;q=1.0,application/font-woff;q=0.9,*/*;q=0.8",
				"Accept-Language: ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
				"Accept-Encoding: identity",
				"Referer: https://pro.fontawesome.com/releases/v".$ver."/css/all.css",
				"Origin: https://fontawesome.com",
				"Host: pro.fontawesome.com"]
		];
		$types = ["woff", "woff2", "eot", "svg", "ttf", "otf"];
		foreach($types AS $type){
			$files = ["fa-brands-400", "fa-light-300", "fa-regular-400", "fa-solid-900"];
			foreach($files AS $file){
				$remoteFile = $file.".".$type;
				if(!file_exists($remoteFile)){
					$data = newCurl("https://pro.fontawesome.com/releases/v".$ver."/webfonts/".$remoteFile, "get", $opts);
					file_put_contents($remoteFile, $data);
				}
				else{
					echo "<a href='".$remoteFile."'>".$remoteFile."</a><br>";
				}
			}
		}
		if(!file_exists("all.css")){
			$data = newCurl("https://pro-next.fontawesome.com/releases/v".$ver."/css/all.css", "get", $opts);
			file_put_contents("all.css", $data);
		}
		else
			echo "<a href='all.css'>all.css</a><br>";
	}

	if($_GET["icons"] == 1 || $_GET["brands"] || $_GET["group"]){
		$styles = ($_GET["brands"] == "1" ? "brands" : "solid");

		$post = 'facets=["type","categories","styles","membership.free","membership.pro","changes"]&facetFilters=[["type:icon"],["styles:'.$styles.'"]]';
	    $post = str_replace("[","%5B", $post);
	    $post = str_replace("]","%5D", $post);
	    $post = str_replace("\"","%22", $post);
	    $post = str_replace(":","%3A", $post);
	    $post = str_replace(",","%2C", $post);
		$opts["postdata"] = '{"params":"query=&hitsPerPage=1000&page=0&'.$post.'"}';

		$json = json_decode(newCurl("https://m19dxw5x0q-dsn.algolia.net/1/indexes/fontawesome_com-".$ver."/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.29.0&x-algolia-application-id=M19DXW5X0Q&x-algolia-api-key=c79b2e61519372a99fa5890db070064c", "post", $opts));
		$arr = $json->hits;
		foreach($arr AS $data){
			$icon = new stdClass();
			if(count($data->categories) == 0)
				$data->categories[0] = "unknown";
			$icon->name = $data->label;
			$icon->id = $data->name;
			$icon->unicode = $data->unicode;
			$ver = end($data->changes);
			$icon->created = $ver;
			if(count($data->keywords) == 0)
				$icon->filter[] = $data->name;
			else
				$icon->filter = array_unique($data->keywords);
			$icon->categories = "";
			if($_GET["brands"] == 1){
				$cats["brands"][] = $icon;
			}
			else{
				foreach($data->categories AS $cat)
					$cats[$cat][] = $icon;
				$cats["brands"] = [];
			}
		}
		ksort($cats);
		if($_GET["group"]){
			foreach($cats AS $cat => $icons){
				$caticon = str_replace(" ", "", $cat);
				$strings[] = "groupHtml('".$caticon."Icons', '".ucfirst($cat)."')";
			}
			echo implode(" + ", $strings);
		}
		else{
			foreach($cats AS $cat => $icons){
				foreach($icons AS $icon){
					$icon->categories = ucfirst($cat);
					$filter = json_encode($icon->filter);
					$str[] = '{name:"'.$icon->name.'",id:"'.$icon->id.'",unicode:"'.$icon->unicode.'",created:'.(int)$icon->created.',filter:'.$filter.',categories:["'.$icon->categories.' Icons"]}';
				}
			}
			$iconList = implode(",",$str);
			echo $iconList;
		}
	}

	if($_GET["css"] == 1){
    	$file = file_get_contents("all.css");
		$part1 = explode("fa-inverse{color:#fff}", $file);
		$part2 = explode(".sr-only", $part1[1]);
		$data = $part1[1].$part2[0];
		print_r($data);
	}
	die();