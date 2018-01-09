import { Connector } from './connector';
import { WeappChannel, WeappPrivateChannel, WeappPresenceChannel } from './../channel';

/**
 * This class creates a connnector to a Socket.io server.
 */
export class WeappConnector extends Connector {
    /**
     * The Socket.io connection instance.
     *
     * @type {object}
     */
    socket: any;

    /**
     * All of the subscribed channel names.
     *
     * @type {any}
     */
    channels: any = {};

    /**
     * Create a fresh Socket.io connection.
     *
     * @return void
     */
    connect(): void {
        this.socket = wx.connectSocket({
            url: this.options.host
        });

        return this.socket;
    }

    /**
     * Listen for an event on a channel instance.
     *
     * @param  {string} name
     * @param  {string} event
     * @param  {Function} callback
     * @return {WeappChannel}
     */
    listen(name: string, event: string, callback: Function): WeappChannel {
        return this.channel(name).listen(event, callback);
    }

    /**
     * Get a channel instance by name.
     *
     * @param  {string} name
     * @return {WeappChannel}
     */
    channel(name: string): WeappChannel {
        if (!this.channels[name]) {
            this.channels[name] = new WeappChannel(
                this.socket,
                name,
                this.options
            );
        }

        return this.channels[name];
    }

    /**
     * Get a private channel instance by name.
     *
     * @param  {string} name
     * @return {WeappChannel}
     */
    privateChannel(name: string): WeappPrivateChannel {
        if (!this.channels['private-' + name]) {
            this.channels['private-' + name] = new WeappPrivateChannel(
                this.socket,
                'private-' + name,
                this.options
            );
        }

        return this.channels['private-' + name];
    }

    /**
     * Get a presence channel instance by name.
     *
     * @param  {string} name
     * @return {WeappPresenceChannel}
     */
    presenceChannel(name: string): WeappPresenceChannel {
        if (!this.channels['presence-' + name]) {
            this.channels['presence-' + name] = new WeappPresenceChannel(
                this.socket,
                'presence-' + name,
                this.options
            );
        }

        return this.channels['presence-' + name];
    }

    /**
     * Leave the given channel.
     *
     * @param  {string} name
     * @return {void}
     */
    leave(name: string): void {
        let channels = [name, 'private-' + name, 'presence-' + name];

        channels.forEach(name => {
            if (this.channels[name]) {
                this.channels[name].unsubscribe();

                delete this.channels[name];
            }
        });
    }

    /**
     * Get the socket ID for the connection.
     *
     * @return {string}
     */
    socketId(): string {
        return this.socket.id;
    }

    /**
     * Disconnect Weapp connection.
     *
     * @return void
     */
    disconnect(): void {
        this.socket.disconnect();
    }
}
