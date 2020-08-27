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
            <div id="logoText" class="logo"><?= Template::i()->upText ?></div>
        </div>
        <div class="avaimg">
            <!-- IMG LOGO BASE 64 -->
            <img src="<?= Template::i()->logo ?>">
        </div>
    </div>
    <div class="main">
        <div class="autorizeBox">
            <form id="login" action="" style="" onsubmit="validate_form(this) && send_form(this); return false">
                    <fieldset class="material">
                    <input  type="text" name="login" onkeyup="validate_input(this)" validator="checklength" validator_max_size=32 validator_min_size=8 placeholder="" autocomplete="off" type="text" required />
                    <hr>
                    <label><?= Template::i()->login_placeholder_text ?></label>
                    </fieldset>
                    <fieldset class="material">
                    <input  type="password" name="password" onkeyup="validate_input(this)" validator="checklength" validator_max_size=32 validator_min_size=8 placeholder="" autocomplete="off" type="text" required />
                    <hr>
                    <label><?= Template::i()->password_placeholder_text ?></label>
                    </fieldset>
                    <br>
                    <div class="paper-toggle">
                            <input type="checkbox" id="rm" name="rm" class="switch" />
                            <label for="rm"></label>
                            <p style="position: absolute;margin-top: -30px;margin-left: 48px;width: 150px;"><?= Template::i()->savePass ?></p>
                        </div>
                    <!-- REQUERED EXIT TRUE -->
					<input name="exit" type="hidden"/>
                    <button type="submit"  disabled="true"><span><?= Template::i()->login_btn_text ?></span></button>
            </form>
        </div>
    </div>
    <div class="footer"><?= Template::i()->footer_text ?></div>
</body>
</html>