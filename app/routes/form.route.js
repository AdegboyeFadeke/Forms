module.exports = (app) => {
    const form = require('../controllers/form.controller.js');


    //create a a new form
    app.post('/forms', form.create);

    //Retrive form
    app.get('/forms/:formId', form.findAll);

    //Update form with noteId
    app.put('/forms/:formId', form.update);

    //Delete form
    app.delete('/forms/:formId', form.delete);
}