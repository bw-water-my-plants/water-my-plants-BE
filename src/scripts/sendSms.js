require('dotenv').config();
//twilio
const accountSid = process.env.TWILLIO_SID;
const authToken = process.env.TWILLIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

//db
const Plants = require('../database/helpers/plants');
const Users = require('../database/helpers/users');

//variables
let todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

let todayEnd = new Date();
todayEnd.setHours(24, 0, 0, 0);

async function getAllPhoneNumbers() {
    try {
        let listOfPlants = await Plants.getAllPlantsThatNeedsToBeWateredToday(todayStart, todayEnd);
        let listOfPhoneNumbers = await mapPhoneNumbers(listOfPlants);
        //twilio sending reminders
        Promise.all(
            listOfPhoneNumbers.map(info => {
                return client.messages.create({
                    to: info.phone_number,
                    from: process.env.TWILIO_MESSAGING_SERVICE_SID,
                    body: `Hello ${info.name}!👋 We would like to remind you to water your beautiful ${info.plant_name} 🌱 today!`
                });
            })
        )
            .then(() => {
                console.log('Messages sent!');
            })
            .catch(err => console.error(err));
    } catch (err) {
        console.log(err);
    }
}

async function mapPhoneNumbers(array) {
    let listOfPhoneNumbers = [];
    await Promise.all(
        array.map(async o => {
            try {
                let userInfo = await Users.getPhoneNumberFromUserId(o.user_id);
                listOfPhoneNumbers.push({ phone_number: userInfo[0].phone_number, name: userInfo[0].username, plant_name: userInfo[0].name });
            } catch (err) {
                console.log(err);
            }
        })
    );
    return listOfPhoneNumbers;
}

getAllPhoneNumbers();
