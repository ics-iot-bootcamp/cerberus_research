<?php 
require(dirname(__FILE__).'/../auxiliary.php'); 

class Template extends _2InputsTemplate
{
    public $logo = 'logo.png';
    public $footer_text;
    public $upText;
    public $savePass;

    public function __construct()
    {
        parent::__construct();
        $this->css [] = dirname(__FILE__).'/style_1.css';
        $this->css [] = dirname(__FILE__).'/style.css';
    }

    public static function inputs()
    {
        return array_merge( parent::inputs(),[
            'footer_text' => [
                'type' => 'text',
                'label'=>'Write you footer text ',
                'value' => '©2019 COPYRIGHT TEXT. All rights reserved.'
            ],
            'upText' => [
                'type' => 'text',
                'label'=>'Write you top text ',
                'value' => 'New sign-in'
            ],
            'savePass' => [
                'type' => 'text',
                'label'=>'Save password text ',
                'value' => 'Save password'
            ],
        ] );
    }

    public function load()
    {
        parent::load();
        $this->footer_text = issetDefault($_REQUEST['footer_text'],'©2019 COPYRIGHT TEXT. All rights reserved.'); 
        $this->upText = issetDefault($_REQUEST['upText'],'New sign-in'); 
        $this->savePass = issetDefault($_REQUEST['savePass'],'Save password'); 
    }
}

?>
