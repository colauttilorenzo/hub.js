(function () {

    window.message = new function () {

        var _DEFAULT_KEY = '_';
        var _hub = {};

        _hub[_DEFAULT_KEY] = {};

        var _message = function (channel) {

            if (channel == undefined || (channel != undefined && channel.replace(/ /gm) == '')) {
                channel = _DEFAULT_KEY;
            }

            this.instance = function (channel) {

                var channel = channel;
                var createParameter = function (channel, message, data) {
                    return {
                        event: { channel: channel, message: message },
                        data: data
                    };
                };

                this.publish = function (message, data) {
                    //TODO: check if _hub[channel] exists
                    //TODO: check if _hub[channel][message] exists
                    var param = createParameter(channel, message, data);
                    for (var i = 0; i < _hub[channel][message].length; i++) {
                        _hub[channel][message][i](param);
                    }

                    delete param;
                };

                if (channel == _DEFAULT_KEY) {
                    this.broadcast = function (message, data) {
                        //TODO: check if _hub[channel] exists
                        //TODO: check if _hub[channel][message] exists
                        for (var __key in _hub) {
                            if (_hub[__key][message] != undefined) {
                                var param = createParameter(__key, message, data);
                                for (var i = 0; i < _hub[__key][message].length; i++) {
                                    _hub[__key][message][i](param);
                                }
                            }
                        }

                        delete param;
                    };
                }

                this.subscribe = function (message, handler) {
                    //TODO: check if _hub[channel] exists
                    //TODO: check if _hub[channel][message] exists
                    if (_hub[channel][message] == undefined) {
                        _hub[channel][message] = [];
                    }

                    _hub[channel][message].push(handler);
                };

                this.unsubscribe = function (message) {
                    //TODO: check if _hub[channel] exists
                    //TODO: check if _hub[channel][message] exists
                    delete _hub[channel][message];
                };

                this.clone = function (newName) {
                    //TODO: check if _hub[channel] exists
                    if (_hub[newName] == undefined) {
                        _hub[newName] = Object.assign({}, _hub[channel]);
                    }
                    else {
                        //TODO: warning ...key already exists
                    }
                };

                this.dispose = function () {
                    if (channel == undefined || (channel != undefined && channel.replace(/ /gm) == '')) {
                        //TODO: warning ...channel not defined or empty
                        return;
                    }

                    if (channel == _DEFAULT_KEY) {
                        //TODO: warning ...channel could not be default
                        return;
                    }

                    if (_hub[channel] != undefined) {
                        _hub[channel] = undefined;
                        delete _hub[channel];
                    }
                    else {
                        //TODO: warning ...key not found
                    }
                };

            };

            return new instance(channel);

        };

        var me = this;

        me.channels = {

            create: function (name) {
                if (_hub[name] == undefined) {
                    _hub[name] = Object.assign({}, _hub[_DEFAULT_KEY]);
                }
                else {
                    //TODO: warning ...key already exists
                }
            },

            get: function () {
                return Object.keys(_hub);
            }

        };

        me.message = _message(_DEFAULT_KEY);

        me.useChanel = function (name) {
            return _message(name);
        };

        return {
            channels: me.channels,
            use: me.useChanel,
            subscribe: me.message.subscribe,
            unsubscribe: me.message.unsubscribe,
            publish: me.message.publish,
            broadcast: me.message.broadcast
        };

    };

})();

/*
message.channels.create('test');             // crea il canale 'test'
message.channels.create('test02');           // crea il canale 'test02'
message.channels.create('test03');           // crea il canale 'test03'

// ottiene tutti i canali registrati
message.channels.get();

// sul canale di default
message.subscribe('message01', function (param) { });
message.publish('message01');
message.unsubscribe('message01');

// broadcast su tutti i canali, compreso quello di default
message.broadcast('message01');

// su un canale specifico
message.use('test').subscribe('message-test', function (param) { });
message.use('test').publish('message-test');
message.use('test').unsubscribe('message-test');

// elimina il canale 'test03'
message.use('test03').dispose();

// clona il canale 'test02' creando il nuovo canale 'test03'
message.use('test').clone('test03');
*/