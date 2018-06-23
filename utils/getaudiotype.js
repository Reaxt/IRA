const request = require('request');

//Takes a url and determines if it is a youtube, direct link, or search
module.exports = (url) => {
    try {
        var hostname = url.split('/')[2]
        if (hostname.includes('youtube') || hostname.includes('youtu.be')) {
            return "youtube";
        } else if (hostname.includes('soundcloud.com')) {
            return "soundcloud";
        } else {
            return "direct";
        }
    } catch (err) {
        return "search";
    }
}