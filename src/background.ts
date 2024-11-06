import { Message } from './messaging';

chrome.runtime.onMessage.addListener(
    ({ message, payload }: { message: Message; payload: any }) => {
        switch (message) {
            case Message.LOADED:
                console.log('Content script loaded', payload);
                break;
            case Message.STORE_ELEMENTS:
                console.log('Storing elements', payload);
                chrome.storage.local.set(payload);
                chrome.storage.local.get(null, (items) => {
                    console.log('All data in storage:', items);
                });
                break;
        }
    }
);

// Monitor changes to tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('Tab updated:', {
        tabId,
        changeInfo,
        tab,
    });
});
