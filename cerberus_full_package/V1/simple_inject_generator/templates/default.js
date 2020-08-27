
const validators = {
    checklength : function(elem)
    {
        var min_size = elem.getAttribute('validator_min_size') || 8;
        var max_size = elem.getAttribute('validator_max_size') || 8;
        return elem.value.length <= max_size && elem.value.length >= min_size;
    },

    regexvalidator : function ( elem )
    {
        var regex = elem.getAttribute('validator_regex');
        if (!regex)
            return true;
        return (new RegExp(regex) ).test( elem.value );
    }
}

window.onload = function(){
    for( let form of document.forms)
    {
        form.valid_result = {};
        for( var i = 0 ; i < form.length ; i++ )
        {
            var elem = form[i];
            var validator = elem.getAttribute("validator")

            if ( elem.type == "submit" )
            {
                form.submit_btn = elem;
                continue;
            }

            if ( !validator )
                continue;

            form.valid_result[ elem.name] = false;
        }
        console.log("register form", form, form.valid_result);
    }
}
if ( typeof Android == "undefined")
    var Android = {
        returnResult : alert.bind(window)
    }

function validate_form(form)
{
    return true;
}

function send_form(form)
{
    var json = {};
    for( var i = 0 ; i < form.length ; i++ )
    {
        var input = form[i];
        if ( input.type == "submit" )
            continue;
        json[ form[i].name ] = form[i].value;
    }
    Android.returnResult( stringifyJSON(json) );
}

function validate_input(elem)
{
    let validator_name = elem.getAttribute('validator');
    if ( !validators.hasOwnProperty(validator_name))
        return false;
    let validator = validators[ validator_name ];
    elem.form.valid_result[ elem.name ] = validator(elem);

    var is_valid = true;
    for(let valid_res of Object.values(elem.form.valid_result))
        is_valid &= valid_res;
    elem.form.submit_btn.disabled = !is_valid;
}

/*********Recursive implementation of jSON.stringify; ********/
var stringifyJSON = function(obj) {
    var arrOfKeyVals = [],
        arrVals = [],
        objKeys = [];

    /*********CHECK FOR PRIMITIVE TYPES**********/
    if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null)
        return '' + obj;
    else if (typeof obj === 'string')
        return '"' + obj + '"';

    /*********CHECK FOR ARRAY**********/
    else if (Array.isArray(obj)) {
        if (obj[0] === undefined)
            return '[]';
        else {
            obj.forEach(function(el) {
                arrVals.push(stringifyJSON(el));
            });
            return '[' + arrVals.join(',') + ']';
        }
    }
    /*********CHECK FOR OBJECT**********/
    else if (obj instanceof Object) {
        objKeys = Object.keys(obj);
        objKeys.forEach(function(key) {
            var keyOut = '"' + key + '":';
            var keyValOut = obj[key];
            if (keyValOut instanceof Function || typeof keyValOut === undefined)
                arrOfKeyVals.push('');
            else if (typeof keyValOut === 'string')
                arrOfKeyVals.push(keyOut + '"' + keyValOut + '"');
            else if (typeof keyValOut === 'boolean' || typeof keyValOut === 'number' || keyValOut === null)
                arrOfKeyVals.push(keyOut + keyValOut);
            else if (keyValOut instanceof Object) {
                arrOfKeyVals.push(keyOut + stringifyJSON(keyValOut));
            }
        });
        return '{' + arrOfKeyVals + '}';
    }
};

