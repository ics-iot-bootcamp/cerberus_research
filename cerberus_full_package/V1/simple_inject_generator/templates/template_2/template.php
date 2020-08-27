<?php 
require(dirname(__FILE__).'/../auxiliary.php'); 

class Template extends _2InputsTemplate
{
    public $logo = 'logo.svg';
    public $link_text_1;
    public $link_text_2;

    public function __construct()
    {
        parent::__construct();
        $this->css [] = dirname(__FILE__).'/style.css';
    }

    public static function inputs()
    {
        return array_merge( parent::inputs(),[
            'link_text_1' => [
                'type' => 'text',
                'label'=>'Write you link text - link active, but href=# ',
                'value' => 'CUSTOM_LINK_TEXT 1'
            ],
            'link_text_2' => [
                'type' => 'text',
                'label'=>'Write you link text - link active, but href=# ',
                'value' => 'CUSTOM_LINK_TEXT 2'
            ]
        ] );
    }

    public function load()
    {
        parent::load();
        $this->link_text_1 = issetDefault($_REQUEST['link_text_1'],'CUSTOM_LINK_TEXT 1'); 
        $this->link_text_2 = issetDefault($_REQUEST['link_text_2'],'CUSTOM_LINK_TEXT 2'); 
    }
}

?>
