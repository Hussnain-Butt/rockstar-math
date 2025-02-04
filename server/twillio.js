const twilio = require("twilio");


const client = new twilio('AC75e9fbdaa03266d90065fb6b191c0fca', 'b99d34a9a8620206cf53cd4a89fb645c');

client.messages.create({
    body: 'Test Message',
    from: '+15104104963',
    to: '+1(682)375-8818'
})
.then(message => console.log("Message SID:", message.sid))
.catch(error => console.error("Twilio Error:", error));