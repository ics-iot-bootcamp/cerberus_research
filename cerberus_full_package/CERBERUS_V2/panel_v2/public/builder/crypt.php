<?php

class RC4Crypt {

	public static function encrypt_ ($pwd, $data, $ispwdHex = 0){

			if ($ispwdHex)

					$pwd = @pack('H*', $pwd);



			$key[] = '';

			$box[] = '';

			$cipher = '';

			$pwd_length = strlen($pwd);

			$data_length = strlen($data);



			for ($i = 0; $i < 256; $i++){

					$key[$i] = ord($pwd[$i % $pwd_length]);

					$box[$i] = $i;

			}

			for ($j = $i = 0; $i < 256; $i++){

					$j = ($j + $box[$i] + $key[$i]) % 256;

					$tmp = $box[$i];

					$box[$i] = $box[$j];

					$box[$j] = $tmp;

			}

			for ($a = $j = $i = 0; $i < $data_length; $i++){

					$a = ($a + 1) % 256;

					$j = ($j + $box[$a]) % 256;

					$tmp = $box[$a];

					$box[$a] = $box[$j];

					$box[$j] = $tmp;

					$k = $box[(($box[$a] + $box[$j]) % 256)];

					$cipher .= chr(ord($data[$i]) ^ $k);

			}

			return $cipher;

	}

	public static function decrypt_ ($pwd, $data, $ispwdHex = 0){

			return RC4Crypt::encrypt_($pwd, $data, $ispwdHex);

	}

}

function encrypt($string, $key){

	return base64_encode(bin2hex(RC4Crypt::encrypt_($key, $string)));

} 

function decrypt($string, $key){

	return RC4Crypt::decrypt_($key,  hex2bin(base64_decode($string)));

}

function encryptText($string, $key){

	return base64_encode(bin2hex(RC4Crypt::encrypt_($key, $string)));

}

?>
