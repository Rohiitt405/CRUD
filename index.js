const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("create");
});

app.post('/create', async (req, res) =>{
    let {name, email, image}= req.body;
    let createdUser = await userModel.create({
        name, email, image
    });
    res.redirect("/read");
})

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render("read", {users});
});

app.get('/delete/:id', async (req, res) => {
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
});

app.post('/edit/:id', async (req, res) => {
    const { name, email, image } = req.body;
    await userModel.findByIdAndUpdate(req.params.id, { name, email, image });
    res.redirect("/read");
});

app.get('/edit/:id', async (req, res) => {
    let user = await userModel.findOne({_id: req.params.id});
    res.render("edit", { user });
});

// Use environment variable for port or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅Server is ON at port ${PORT}`);
});

// Export for Vercel
module.exports = app;
