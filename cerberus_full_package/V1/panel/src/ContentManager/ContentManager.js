import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router'

/* Импорт классов всех страниц */
import HomePage from '../pages/HomePage';
import BotsList from '../pages/BotsList';
import SettingsPage from '../pages/SettingsPage';
import bankLogs from '../pages/Logs/bankLogs';
import ccLogs from '../pages/Logs/ccLogs';
import ccLogsBot from '../pages/Logs/ccLogsBot';
import mailLogs from '../pages/Logs/mailLogs';
import AddInject from '../pages/addInj';
import bankLogsBot from '../pages/Logs/BankLogsBot';
import MailLogsBot from '../pages/Logs/mailLogsBot';
import SettingsContext from '../Settings';

class ContentManager extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div id="content">
                <Switch>{/* Роутер для переключения страниц */}
                    <Route exact path="/" render={() =>(<Redirect to="/main"/>)}/>
                    <Route exact path='/main' component={HomePage} />
                    <Route exact path='/bots' component={BotsList}/>
                    <Route exact path='/bank' component={bankLogs}/>
                    <Route exact path='/bank/:botid' component={bankLogsBot}/>
                    <Route exact path='/CC' component={ccLogs}/>
                    <Route exact path='/CC/:botid' component={ccLogsBot}/>
                    <Route exact path='/mail' component={mailLogs}/>
                    <Route exact path='/mail/:botid' component={MailLogsBot}/>
                    <Route exact path='/inj' component={AddInject}/>
                    <Route exact path='/settings' component={SettingsPage}/>
                </Switch>
            </div>
        );
    }
}

export default ContentManager;