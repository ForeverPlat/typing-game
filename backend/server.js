import express from 'express';

const users = [
    {username: 'user1', password: 'password1'},
    {username: 'user2', password: 'password2'},
    {username: 'user3', password: 'password3'},
];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/signup', (req, res) => {
    // const newUser = {
    //     username: req.body.username,
    //     password: req.body.password
    // }
    const { username, password } = req.body;
    
    if (users.find((user) => user.username === username)){
        return res.status(409).json({ msg: `This user already exists` });
    }

    if (!username || !password) {
        return res.status(404).json({ msg: `All fields need to be filled` });
    }

    const newUser = { username, password }
    users.push(newUser);

    const safeUser = { username: newUser.username }; //  this is called masking the response
    return res.json({ message: 'Signup Successful', user: safeUser });
});

app.post('/api/login/:username', (req, res) => {

    //  Equivalent to
    // const username = req.body.username;
    // const password = req.body.password; 
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);

    //  check if all fields are filled
    if (!username || !password) {
        return res.status(400).json({ msg: `All fields need to be filled` });
    } 
    
    if (!user) {
        return res.status(404).json({ msg: `User not found.` });
    }

    if (user.password !== password) {
        return res.status(401).json({ msg: `Incorrect Password` });
    }

    const safeUser = { username: user.username }; //  this is called masking the response
    return res.json({ message: 'Login Successful', user: safeUser });

});

app.listen(3000, () => console.log(`Server is running on 3000`));