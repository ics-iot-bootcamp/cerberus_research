<?php

if (isset($_REQUEST['save']))
{
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="template.html"');
    header('Expires: 0');
};

function issetDefault(&$var, $default = '')
{
    return isset($var) ? $var : $default;
}

class DefaultTemplate
{
    public $css = [];
    public $js = ['local.js'];
    public $title;
    public $logo;

    public function __construct()
    {
        $this->css = [
            dirname(__FILE__).'/default.css'
        ];

        $this->js = [
            dirname(__FILE__).'/default.js'
        ];

    }

    public static function inputs()
    {
        return [
            'css[]' => [
                'type'=>'file',
                'multiple'=>true,
                'label' => 'Addidional css files'
            ],
            'js[]'=> [
                'type'=>'file',
                'multiple'=>true,
                'label' => 'Addidional js files'
            ],
            'title' => [
                'type' => 'text',
                'label' => 'Title page',
                'value' => 'CUSTOM TITLE PAGE'
            ],
            'logo' => [
                'type' => 'file',
                'label' => 'Replace logo'
            ]
        ];
    }

    protected function loadFiles($name)
    {
        $newval = [];
        foreach( $this->$name as $file )
        {
            if ( file_exists ($file) )
                $newval []= $this->requireFile($file);
            else 
                $newval []= $file;
        }

        if ( isset($_FILES[$name]) && isset($_FILES[$name]['tmp_name']))
            foreach( $_FILES[$name]['tmp_name'] as $filename )
            {
                if (empty($filename))
                    continue;
                $newval []= file_get_contents($filename);
            }
        $this->$name = $newval;
    }

    public function load()
    {
        $this->loadFiles('css');
        $this->loadFiles('js');

        $this->logo = !empty($this->logo) ?  $this->readImage($this->logo): '';


        if ( isset ($_FILES['logo']) && !empty($_FILES['logo']['tmp_name']))
            $this->logo = $this->readImage($_FILES['logo']['tmp_name']);
    }

    protected function readImage($filename)
    {
        $content = file_get_contents( $filename);
        $finfo = new \finfo(FILEINFO_MIME);
        $type = $finfo->buffer($content,FILEINFO_MIME_TYPE);
        switch($type)
        {
            case 'image/svg' :
                $type .= '+xml';
                break;
        }
        return 'data:' . $type .';' . 'base64,'. base64_encode($content) ;
    }

    protected function requireFile($filename)
    {
        $_obInitialLevel_ = ob_get_level();
        ob_start();
        ob_implicit_flush(false);
        // extract($_params_, EXTR_OVERWRITE);
        try {
            require $filename;
            return ob_get_clean();
        } catch (\Exception $e) {
            while (ob_get_level() > $_obInitialLevel_) {
                if (!@ob_end_clean()) {
                    ob_clean();
                }
            }
            throw $e;
        } catch (\Throwable $e) {
            while (ob_get_level() > $_obInitialLevel_) {
                if (!@ob_end_clean()) {
                    ob_clean();
                }
            }
            throw $e;
        }
    }

    private static $instance = null;
    public static function i()
    {
        if (!self::$instance)
        {
            self::$instance = new static();
            self::$instance->load();
        }

        return self::$instance;
    }
}

class _2InputsTemplate extends DefaultTemplate
{
    public $login_placeholder_text;
    public $password_placeholder_text ;
    public $login_btn_text;
    // public $logo = 'logo.svg';
    
    public static function inputs()
    {
        return array_merge( parent::inputs(), [
            'login_placeholder_text'=>[
                'type'=>'text',
                'label'=>'Write you login text',
                'value'=>'DEFAULT LOGIN TEXT'
            ],
            'password_placeholder_text'=>[
                'type'=> 'text',
                'label' => 'Write you password text',
                'value'=>'DEFAULT PASSWORD TEXT'
            ],
            'login_btn_text' => [
                'type'=> 'text',
                'label' => 'Write you text on login button',
                'value'=>'DEFAULT SIGN IN'
            ]
        ]);
    } 

    public function load()
    {
        parent::load();
        $this->login_placeholder_text = issetDefault($_REQUEST['login_placeholder_text'],  "DEFAULT LOGIN TEXT");
        $this->password_placeholder_text = issetDefault($_REQUEST['password_placeholder_text'],  "DEFAULT PASSWORD TEXT");
        $this->login_btn_text = issetDefault($_REQUEST['login_btn_text'],  "Sign in TEXT");
    }
}