const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
const admin = require('firebase-admin');

const serviceAccount = require('../chatter-59548-firebase-adminsdk-8lmu5-e24c3aec8d.json'); //secret key for accessing database

require('dotenv').config();

//initializing database
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://chatter-59548-default-rtdb.firebaseio.com/', // Replace with your Firebase project URL
  });

  
const api_key = "wew3dwx4h5aa";
const api_secret = "fbq2r366nqb6e36r52whjd9svh9ceeg8gvgwump4eumm38xw9gf7279kns9hd5rj";
const app_id = "1264786";

const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        const userData = {
            fullName,
            username,
            userId,
            phoneNumber,
          };

        await admin.database().ref(`/users/${userId}`).set(userData);

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);
        console.log("CHECK1");
        const { users } = await client.queryUsers({ name: username });
        console.log("CHECK2");
        if(!users.length) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if(success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
            
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

module.exports = { signup, login }