const WS = require('ws')

class Stream {
	constructor(options, callback) {
		this.connected = false
		this.symbol = options.symbol
		this.delay = options.delay || 0
		this.conf = options.conf
		this.clients = []
		this.callback = callback
		this.count = 0
		this.autoReconnect = true
		this.timeBeforeReconnect = 1000
		this.reconnectIntervalId = 0
	}

	handleOpen () {
    	console.log('WS open')
    	this.connected = true

		if (this.conf.subscribeEvent) {
	    	var event = this.conf.subscribeEvent(this.symbol)
	    	console.log('open msg', event)
			this.subscribe(event)
		}

		if (this.reconnectIntervalId) {
			clearInterval(this.reconnectIntervalId);
		}
	}

	handleClose () {
    	console.log('WS close')
    	this.connected = false

    	if (this.autoReconnect) {
    		console.log(`waiting ${this.timeBeforeReconnect} seconds before trying to reconnect...`);

    		this.reconnectIntervalId = setInterval(() => {
  				console.log("trying to reconnect...")
    			this.connect();
    		}, this.timeBeforeReconnect)
    	}
	}

	handleError (err) {
		console.log(err)
	}

	handleMessage (msg) {
		try {
 			msg = JSON.parse(msg)
 		}
 		catch (e) {
 			console.log(e)
 		}

		if (this.conf.isValid && !this.conf.isValid({message: msg})) return;
		else {
			msg = this.conf.format(msg);
			this.callback(msg)
		}
		this.count++
	}

	connect () {
		if (this.connected || !this.conf.wsUrl) return;
		this.cli = new WS(this.conf.wsUrl(this.symbol))

		//Pipe listeners in WS
		this.cli.on('open', this.handleOpen.bind(this))
		this.cli.on('close', this.handleClose.bind(this))
		this.cli.on('error', this.handleError.bind(this))
		this.cli.on('message', this.handleMessage.bind(this))

		//test
		//setTimeout(() => this.close(), 6000);
	}

	close () {
		if (!this.connected) return true;
		this.cli.close();
		this.callback = () => {};
		console.log('closed stream')
		return true;
	}

	subscribeClient (client) {
		if (!this.clients.includes(client)) this.clients.push(client)
	}

	unsubscribeClient (client) {
		console.log('unsub', client);
		this.clients.unshift(client)
	}

	subscribe (event) {
		this.cli.send(JSON.stringify(event))
	}

}

module.exports = Stream