import React from 'react';
import SendSMS from './SendSMS';
import SendUSSD from './SendUSSD';
import ForwardCall from './ForwardCall';
import OpenInject from './OpenInject';
import BOTKILL from './BOTKILL';
import DebugCommand from './DebugCommand';
import DeleteApps from './DeleteApps';
import RunApplication from './RunApplication';
import SendPush from './SendPush';
import OpenLink from './OpenLink';
import GetDataFromBot from './GetDataFromBot';
import UpdateModule from './UpdateModule';
import SendSMSALL from './SendSMSALL';
import GetGoogleAUTH from './GetGoogleAUTH';

class CommandsList extends React.Component {
    render () {
        return (
            <React.Fragment>
                <div class="card-body">
                    <div class="row marginbottom30px">
                        <div class="col-sm">
                            <SendSMS />
                        </div>
                        <div class="col-sm">
                            <SendUSSD />
                        </div>
                        <div class="col-sm">
                            <ForwardCall />
                        </div>
                    </div>
                    <div class="row marginbottom30px">
                        <div class="col-sm">
                            <OpenInject />
                        </div>
                        <div class="col-sm">
                            <RunApplication />
                        </div>
                        <div class="col-sm">
                            <SendPush />
                        </div>
                    </div>
                    <div class="row marginbottom30px">
                        <div class="col-sm">
                            <OpenLink />
                        </div>
                        <div class="col-sm">
                            <GetDataFromBot />
                        </div>
                        <div class="col-sm">
                            <DeleteApps />
                        </div>
                    </div>
                    <div class="row marginbottom30px">
                        <div class="col-sm">
                            <UpdateModule />
                        </div>
                        <div class="col-sm">
                            <GetGoogleAUTH />
                        </div>
                        <div class="col-sm">
                            <BOTKILL />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CommandsList;