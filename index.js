const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const port = 8080;

let id = 1;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('create');
})

let staffArray = [];

app.post('/', (req, res) => {
    if (req.body.name && req.body.department) {
        const staff = {
            id: id,
            name: req.body.name,
            department: req.body.department
        }
        staffArray.push(staff);
        res.render('view', { allStaff: staffArray });
        id++;
    } else {
        res.render('error');
    }
})

app.get('/delete/:id', (req, res) => {
    staffArray = staffArray.filter(element => element.id != req.params.id);
    res.render('view', { allStaff: staffArray });
});

app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
