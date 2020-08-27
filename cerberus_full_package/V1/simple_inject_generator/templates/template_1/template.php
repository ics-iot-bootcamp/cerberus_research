<?php 
require(dirname(__FILE__).'/../auxiliary.php'); 

class Template extends _2InputsTemplate
{
    public $logo = 'logo.svg';
    public $link_text;

    public function __construct()
    {
        parent::__construct();
        $this->css [] = dirname(__FILE__).'/style.css';
    }

    public static function inputs()
    {
        return array_merge( parent::inputs(),[
            'link_text' => [
                'type' => 'text',
                'label'=>'Write you link text - link active, but href=# ',
                'value' => 'CUSTOM_LINK_TEXT'
            ]
        ] );
    }

    public function load()
    {
        parent::load();
        $this->link_text = issetDefault($_REQUEST['link_text'],'CUSTOM_LINK_TEXT'); 
    }
}

?>
