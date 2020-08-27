import React from 'react';

// Домашняя страница. Пока только FAQ. Надо будет добавить стату
// TODO: добавить стату
class HomePage extends React.Component {
    render () {
        return (
            <div>
                <h1>Welcome to Cerberus admin panel</h1>
                <p>This Android bot is fixed every day to be the best on the market. We are glad to any client, and are ready to go to a meeting.<br />
                On this page you will find answers to almost all the questions you are interested in, so as not to distract our support.<br />
                We hope for further productive cooperation.<br /></p>
                <h1>FAQ</h1>
                <p> <b> Q: </ b> Where can I see the list of bots and manage them? <br />
                    <b> A: </ b> All bots management is in the bots tab. There, the main table of bots that are tapped into the admin area, and also there you can execute various commands for bots. For more information, contact the support.
                </ p>
                <p> <b> Q: </ b> How to sort bots? <br />
                    <b> A: </ b> The bots table output settings are opened by clicking on the "Filter" button. There you can display live bots, specify the filter of triggered triggers, and also indicate the number of bots per page.
                </ p>
                <p> <b> Q: </ b> I need to see the bots logs. Where to do it? <br />
                    <b> A: </ b> Logs from injects are located in the Bank Logs tab. Logs from the collection of CC or mail data can be found in the corresponding tabs. To disclose detailed log information, click on the eye icon in the table.
                </ p>
                <p> <b> Q: </ b> How do I download logs? <br />
                    <b> A: </ b> On the log page, you can click on the cloud icon in the upper right corner. The log format is json.
                </ p>
                <p> <b> Q: </ b> I need to add a new inject \ delete the old one, how to do it? <br />
                    <b> A: </ b> In the Inject List tab there is a form for adding an inject. You need to load the html layout with the correct JS code. For a template, contact support. Also, you need to select an icon for your inject, it is desirable that it be the icon of the application from which you want to steal data. The recommended size of the icon is 300x300px, PNG format.
                </ p>
                <p> <b> Q: </ b> Where are the settings for the bots gates, pushes, etc? <br />
                    <b> A: </ b> All settings are in the Settings tab. Everything is intuitive there. If you have questions, write in support.
                </ p>
                <p> <b> Q: </ b> How can I get the apk build? <br />
                    <b> A: </ b> Go to <a class="info" href="http://2qgsboq472ntqev5.onion/" target="_blank">web builder</a>.
                </ p>
                <p> <b> Q: </ b> What information about the bot can I find in the table? <br />
                    <b> A: </ b> In the global table, you can find the info about the injected bot, its ip address, country of location, most recently online, the version of android, and the bot build tag. By the build tag, you can tell from which path the bots came to you, for apk can be assembled with any tag.
                </ p>
                <p> <b> Q: </ b> Where can I find more detailed information about bots? <br />
                    <b> A: </ b> More information about bots can be found by clicking on the information icon in the table with bots. There will be already complete information about the phone model, charge level, and so on. Also, there will be buttons to go to the logs of a particular bot.
                </ p>
                <p> <b> Q: </ b> How to enable keylogger or something like that? <br />
                    <b> A: </ b> Keylogger and other settings of the bot can be found in the personal settings. To open them you need to click on the hex icon in the table with bots.
                </ p>
                <p> <b> Q: </ b> I still have questions, but I did not find the answer here. What to do? <br />
                    <b> A: </ b> Write in support, we will be happy to help you understand our product.
                </ p>
            </div>
        );
    }
}

export default HomePage;