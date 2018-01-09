import {WeappChannel} from "./";

/**
 * This class represents a Socket.io presence channel.
 */
export class WeappPrivateChannel extends WeappChannel {
    /**
     * Trigger client event on the channel.
     *
     * @param  {string}  eventName
     * @param  {object}  data
     * @return {PusherPrivateChannel}
     */
    whisper(eventName, data) {
        this.socket.emit('client event', {
            channel: this.name,
            event: `client-${eventName}`,
            data: data
        });

        return this;
    }
}
