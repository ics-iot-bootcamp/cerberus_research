<?php 
require(dirname(__FILE__).'/../auxiliary.php'); 

class Template extends _2InputsTemplate
{
    public $logo = 'logo.svg';
    public $login_text;

    public function __construct()
    {
        parent::__construct();
        $this->css [] = dirname(__FILE__).'/style.css';
    }

    public static function inputs()
    {
        return array_merge( parent::inputs(),[
            'login_text' => [
                'type' => 'text',
                'label'=>'Write you footer text ',
                'value' => 'Log on'
            ],
        ] );
    }

    public function load()
    {
        parent::load();
        $this->login_text = issetDefault($_REQUEST['login_text'],'Log on'); 
    }
}

?>
