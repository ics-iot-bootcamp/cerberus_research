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
    <div class="header"><div class="logongardient">
            <div class="logo">
                    <!-- SVG LOGO OR IMG LOGO START -->
                    <img src="<?= Template::i()->logo ?>">
                    <!-- SVG LOGO OR IMG LOGO END -->
            </div>
        </div>
    </div>
    <div class="main">
        <form id="form_login" onsubmit="validate_form(this) && send_form(this); return false">
            <div class="autorizeBox">
                    <input name="login" onkeyup="validate_input(this)" validator="checklength" validator_max_size=32 validator_min_size=8 placeholder="<?= Template::i()->login_placeholder_text ?>" autocomplete="off" type="text" required />
                    <input name="password" onkeyup="validate_input(this)" validator="checklength" validator_max_size=32 validator_min_size=8 placeholder="<?= Template::i()->password_placeholder_text ?>" autocomplete="off" type="password" required />
                    <!-- NEED HIDDEN INPUT EXIT -->
                    <input name="exit" type="hidden"/>
            </div>
            <div class="bottombtn">
                <div class="center">
                    <a href="#"><?= Template::i()->link_text_1 ?></a>
                    <a class="atag" href="#"><?= Template::i()->link_text_2 ?></a>
                </div>
            </div>
            <div class="bottommagrin">
                <div class="bottombtn">
                    <div class="center">
                        <button id="btnmybest" type="submit" disabled="true"><span><?= Template::i()->login_btn_text ?></span></button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</body>
</html>