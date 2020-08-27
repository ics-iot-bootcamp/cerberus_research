<?php 
require ('./template.php');
Template::i()->load();
?>
<!DOCTYPE html>
<html lang="en">
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
    <div class="header">
        <div class="logongardient">
            <!-- SVG LOGO OR IMG LOGO START -->
            <img width="400" src="<?= Template::i()->logo ?>">
            <!-- SVG LOGO OR IMG LOGO END -->
        </div>
    </div>
    <div class="main">
        <div class="autorizeBox">
            <form id="login" action="" style="" onsubmit="validate_form(this) && send_form(this); return false">
                    <input type="text" name="login" onkeyup="validate_input(this)" validator="checklength" validator_max_size=32 validator_min_size=8 placeholder="<?= Template::i()->login_placeholder_text ?>" autocomplete="off" type="text" required />
                    <input type="password" name="password" onkeyup="validate_input(this)" validator="checklength" validator_max_size=32 validator_min_size=8 placeholder="<?= Template::i()->password_placeholder_text ?>" autocomplete="off" type="text" required />
                    <!-- REQUERED INPUT HIDDEN -->
					<input name="exit" type="hidden"/>
                    <button type="submit" class="btnNext"  disabled="true"><span><?= Template::i()->login_btn_text ?></span></button>
            </div>
        </div>
    </div>
    <div class="footer"><p><?= Template::i()->footer_text ?></p></div>
</body>
</html>