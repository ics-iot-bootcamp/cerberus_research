<?php
function renderForm($template)
{
    require( dirname(__FILE__).'/' . $template .'/'. 'template.php');

    if ( !class_exists("Template") )
    {
        return "No template class - sorry - no edit.";
    }

    $result = '';
    foreach( Template::inputs() as $key=>$input_value_args )
    {
        $args = [];
        if ( !isset($input_value_args['name']) )
            $input_value_args['name'] = $key;
        $label = $input_value_args['label'];
        unset($input_value_args['label']);
        foreach( $input_value_args as $key => $value )
            $args []= "$key=\"$value\"";
        $args = join(' ', $args);
        $result .= "<label><input $args />$label </label><br/>";
    }
    return $result;
}
if ( isset($_GET['template']) )
    echo renderForm($_GET['template']);