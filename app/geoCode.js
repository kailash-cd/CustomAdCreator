
module.exports = function(serverInfo) {
    function isVoid(obj){
        switch(typeof(obj)){

            case "undefined":
            case "object":
                for(var x in obj){
                    if(obj.hasOwnProperty(x))
                        return false;
                    else
                        return true;
                }
                return true;
            case "number":
            case "boolean":
                return false;
                break;
            case "string":
                if(obj == "")
                    return true;
                else
                    return false;
            default:
                return false;
        }
    };
    return {
        getIoGeocode: function (req, res) {
            console.log("...GeoCode API Called...");
            var request = require('request');
            var data = req.body;

            if (isVoid(data)) {
                console.log('Failed because of Address data is missing.');
                res.json({'status': 'failure', 'message': 'Doesn\'t contains the addresses.'});
                return;
            }


            var requestData = {
                url: 'http://'+serverInfo.apiHost+':'+serverInfo.backend_port+'/geocode/v1?key=ChalkGeoCodeKey',
                json: data
            };
            request.post(requestData, function (error, response, body) {
                try {
                    if (error) {
                        console.log(error);
                        res.json({'status': 'failure', 'message': 'Unable to fetch data from server.'});
                    } else if (response.statusCode == 401) {
                        res.send(401, {"message": "UnAuthorized"});
                    } else {
                        if (!isVoid(body) && body && body.status == 0 && body.response) {
                            res.json({'status': 'success', 'data': body.response});
                        } else {
                            console.log(body);
                            res.json({'status': 'failure', 'message': 'Error from server.'});
                        }
                    }
                } catch (e) {
                    console.trace(e);
                    res.json({'status': 'failure', 'message': 'Unable to fetch data from server.'});
                }
            });


        }
    }
}