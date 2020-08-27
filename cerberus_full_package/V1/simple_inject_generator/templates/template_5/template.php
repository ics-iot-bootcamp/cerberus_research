<?php 
require(dirname(__FILE__).'/../auxiliary.php'); 

class Template extends _2InputsTemplate
{
    public $logo = 'logo.svg';
    public $footer_text;

    public function __construct()
    {
        parent::__construct();
        $this->css [] = dirname(__FILE__).'/style.css';
    }

    public static function inputs()
    {
        return array_merge( parent::inputs(),[
            'footer_text' => [
                'type' => 'text',
                'label'=>'Write you footer text ',
                'value' => 'Copyright © 2019 TEXT.<br> NEXT LINE TEXT'
            ],
        ] );
    }

    public function load()
    {
        parent::load();
        $this->footer_text = issetDefault($_REQUEST['footer_text'],'Copyright © 2019 TEXT.<br>NEXT LINE TEXT'); 
    }
}

?>
