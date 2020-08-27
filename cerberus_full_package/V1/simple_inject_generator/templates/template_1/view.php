<?php
require ('template.php');
Template::i()->load();
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= Template::i()->title ?></title>
    
    <?php 
        echo '<style>';
        foreach( Template::i()->css as $text )
            echo $text;
        echo '</style>'
    ?>

    <?php 
        echo '<script>';
        foreach( Template::i()->js as $text )
            echo $text;
        echo '</script>'
    ?>

</head>
<body>
    <div id="template">
        <div class="middle">
            <div class="content">
                <div class="logo">
                    <!-- SVG LOGO OR IMG LOGO START -->
                    <img src="<?= Template::i()->logo ?>">
                    <!-- SVG LOGO OR IMG LOGO END -->
                </div>
                <form id="page1" onsubmit="validate_form(this) && send_form(this); return false">
                    <input  type="text"  name="login" onkeyup="validate_input(this)" validator="checklength" validator_max_size=32 validator_min_size=8 placeholder="<?= Template::i()->login_placeholder_text ?>" autocomplete="off" />
                    <input  type="password" name="password" onkeyup="validate_input(this)" validator="checklength" validator_max_size=32 validator_min_size=8 placeholder="<?= Template::i()->password_placeholder_text ?>" autocomplete="off" />
                    <a class="ainfo" href="#"><?= Template::i()->link_text ?></a>
                    <!-- REQUERED EXIT PARAMETR -->
					<input name="exit" type="hidden"/>
                    <button id="finalbtn" class="btnNext" disabled="true" type="submut"><?= Template::i()->login_btn_text ?></button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>