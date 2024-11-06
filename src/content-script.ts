import { Message } from './messaging';

(() => {
    chrome.runtime.sendMessage({
        message: Message.LOADED,
        payload: { version: 1.0 },
    });

    const allLinks = Array.from(document.querySelectorAll('a'));
    const allButtons = Array.from(document.querySelectorAll('button'));

    // check if the url has the query reverse=true
    const urlParams = new URLSearchParams(window.location.search);
    const reverse = urlParams.get('reverse');

    const linkOutlineColor = reverse ? 'blue' : 'orange';
    for (const link of allLinks) {
        link.style.outline = `2px solid ${linkOutlineColor}`;
    }

    const buttonOutlineColor = reverse ? 'orange' : 'blue';
    for (const button of allButtons) {
        button.style.outline = `2px solid ${buttonOutlineColor}`;
    }

    const linksForStorage = allLinks.map((link) => {
        return {
            href: link.href,
            tagName: link.tagName,
        };
    });

    const buttonsForStorage = allButtons.map((button) => {
        return {
            tagName: button.tagName,
        };
    });

    chrome.runtime.sendMessage({
        message: Message.STORE_ELEMENTS,
        payload: {
            links: linksForStorage,
            buttons: buttonsForStorage,
        },
    });
})();
