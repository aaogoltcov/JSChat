'use strict';

// фразы бота
const botMessages = [
    'Да пребудет с тобой Сила!',
    'I\'ll be back',
    'Хьюстон, у нас проблема',
    'Моя прелесть!',
    'Обожаю запах напалма по утрам',
    'Кто возьмет билетов пачку, тот получит водокачку!',
    'Я подумаю об этом завтра',
    'Я тебе один умный вещь скажу, только ты не обижайся',
    'Украл, выпил — в тюрьму. Украл, выпил — в тюрьму. Романтика',
    'Zed is dead, baby, Zed is dead',
    'В чем сила, брат?',
    'Ку!',
];

// открытие чата и запуск timeDelay в 30 секунд если пользователь ничего не напишет
const chatWidget = document.querySelector('div.chat-widget');
chatWidget.onclick = function () {
    delayBotMessage();
    return chatWidget.classList.contains('chat-widget_active') ? false : chatWidget.classList.toggle('chat-widget_active');
};

const userInput = document.getElementById('chat-widget__input');
const userChatElement = document.getElementById('chat-widget__messages');
let botMessagesCurrentIndex = 0;
let botMessagesLength = botMessages.length;

// чтение input от пользователя
userInput.onchange = () => {
    renderMessage(userInput.value, 'user', "message message_client");
    renderMessage(botMessages[botMessagesCurrentIndex], 'bot', "message");
    userInput.value = '';
};

// timeDelay при первом запуске
function delayBotMessage() {
    let botTimeOut = window.setTimeout(function () {
        if (!userChatElement.offsetHeight) {
            renderMessage(botMessages[botMessagesCurrentIndex], 'bot', "message");
        }
        window.clearTimeout(botTimeOut)
    }, 30000)
}

// обновление сообщений в чате
function renderMessage(value, type, className) {
    type === 'bot' ? botMessagesCurrentIndex === botMessagesLength - 1 ? botMessagesCurrentIndex = 0 : ++botMessagesCurrentIndex : '';
    const html = [value]
        .map(
            (currentValue) =>
                `<div class="${className}">
                    <div class="message__time">${(new Date).toLocaleTimeString().slice(0, 5)}</div>
                    <div class="message__text">${currentValue}</div>
                </div>`
        )
        .join('');
    userChatElement.innerHTML += html;
    userChatElement.scrollIntoView({block: "end", inline: "end", behavior: "smooth"});
}