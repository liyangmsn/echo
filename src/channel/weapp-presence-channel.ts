import { PresenceChannel, WeappPrivateChannel } from './';

/**
 * This class represents a Socket.io presence channel.
 */
export class WeappPresenceChannel extends WeappPrivateChannel implements PresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     *
     * @param  {Function} callback
     * @return {object} WeappPresenceChannel
     */
    here(callback: Function): WeappPresenceChannel {
        this.on('presence:subscribed', (members) => {
            callback(members.map(m => m.user_info));
        });

        return this;
    }

    /**
     * Listen for someone joining the channel.
     *
     * @param  {Function} callback
     * @return {WeappPresenceChannel}
     */
    joining(callback: Function): WeappPresenceChannel {
        this.on('presence:joining', (member) => callback(member.user_info));

        return this;
    }

    /**
     * Listen for someone leaving the channel.
     *
     * @param  {Function}  callback
     * @return {WeappPresenceChannel}
     */
    leaving(callback: Function): WeappPresenceChannel {
        this.on('presence:leaving', (member) => callback(member.user_info));

        return this;
    }
}
