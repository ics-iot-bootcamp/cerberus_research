<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title> Simple inject generator </title>
        <link rel="stylesheet" href="/css/main.css">
        <link rel="stylesheet" href="/css/bootstrap.css">
        <script> 

        </script>
    </head>
    <body>
    <div class="container" style="margin-top:40px;">
    <div class="row">
        <div class="col-sm">
        <select id='select_template' onchange="document.location=this.options[this.selectedIndex].value" >
            <?php 
                $first = null;
                foreach( glob("templates/*/template.php" ) as $form )
                {
                    $value = explode('/', $form)[1];
                    if (!$first)
                        $first = $value;
                    $selected = isset($_GET['template']) && $value == $_GET['template'] ? 'selected' : '';
                    echo "<option value=\"index.php?template=$value\" $selected > $value </option>";
                }
                if (!isset($_GET['template']))
                    $_GET['template'] = $first;
            ?>
        </select>

        <form enctype="multipart/form-data" method="POST" action=<?= isset($_GET['template']) ? 'templates/'.$_GET['template'].'/view.php' : '' ?> target="render_target" >
            <div id="edit_form">
                <?php
                    if ( isset($_GET['template']) ) 
                    {
                        require('templates/form.php');
                    }
                ?>
            </div>
            <button type="submit" class="btn btn-danger"> Update </button>
            <button type="submit" class="btn btn-danger" name="save"> Save </button>
            <button type="reset" class="btn btn-danger"> Reset </button>
        </form>
        </div>
        <div class="col-sm">
        <div>
            <div>
                <label> <input type="number" onchange="document.getElementById('render_target').style.width = this.value + 'px' "/>px width</label>
                <label> <input type="number" onchange="console.log(document.getElementById('render_target').style.height = this.value + 'px')" />px height</label>
            </div>
            <iframe name="render_target" id="render_target" src="" style="width: 500px; height: 725px;">
            Ваш Web-браузер не поддерживает плавающие фреймы.
            </iframe>
        </div>
        </div>
    </div>
    </div>
    </body>
</html>