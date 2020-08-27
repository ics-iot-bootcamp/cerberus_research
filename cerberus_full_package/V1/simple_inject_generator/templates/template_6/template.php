<?php 
require(dirname(__FILE__).'/../auxiliary.php'); 

class Template extends _2InputsTemplate
{
    public $logo = 'logo.svg';
    public $footer_text;
    public $securelogin;

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
                'value' => '© 2018 COPYRIGHT'
            ],
            'securelogin' => [
                'type' => 'text',
                'label'=>'Write you login title text ',
                'value' => 'Secure Account Log In'
            ],
        ] );
    }

    public function load()
    {
        parent::load();
        $this->footer_text = issetDefault($_REQUEST['footer_text'],'© 2018 COPYRIGHT'); 
        $this->securelogin = issetDefault($_REQUEST['securelogin'],'Secure Account Log In'); 
    }
}

?>
