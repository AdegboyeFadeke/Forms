const form = require('../models/form.model.js');

//create and save form
exports.create = (req, res) => {
    // validate form
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            message: "Form cannot be empty"
        });
    }

    //create form
    const Form = new form({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        reasons: req.body.reasons,
    });

    //save note in database
    Form.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while creating the form"
            });
        });
};

//retrieve  form
exports.findAll = (req, res) => {
    form.find().then(Form => {
        res.send(Form);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occured while retrieving the form"
        })
    })
};

//update form
exports.update = (req, res) => {

    //update form value
    form.findByIdAndUpdate(req.params.formId, {
        name: req.body.name,
        // content: req.body.content,
        email: req.body.email,
        phone: req.body.phone,
        reasons: req.body.reasons,

    }, { new: true }).then(Form => {
        if (!Form) {
            return res.status(404).send({
                message: "Form not found with id" + req.params.formId
            });
        }
        res.send(Form);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Form not found with id" + req.params.formId
            });
        }
        return res.status(500).send({
            message: "could not update form with id" + req.params.formId
        });
    });
};

//delete form
exports.delete = (req, res) => {
    form.findByIdAndRemove(req.params.formId).then(Form => {
        if (!Form) {
            return res.status(404).send({
                message: "Form not found with id " + req.params.formId
            });
        }
        res.send({ message: "Form deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Form not found with id " + req.params.formId
            });
        }
        return res.status(500).send({
            message: "Could not delete form with id " + req.params.formId
        });
    });
};