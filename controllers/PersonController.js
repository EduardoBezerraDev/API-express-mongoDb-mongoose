const Person = require('../models/Person')

module.exports = class PersonController {
    static async showPersons(req, res) {
        try {
            const people = await Person.find()
            res.status(200).json(people)
            return
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }

    static async createPerson(req, res) {
        const {
            name,
            salary,
            approved
        } = req.body

        const person = {
            name,
            salary,
            approved
        }

        try {
            await Person.create(person)
            res.status(201).json({
                message: "Person insert success"
            })

        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }

    static async getPerson(req, res) {
        const id = req.params.id
        try {
            const people = await Person.findOne({
                _id: id
            })
            if (!people) {
                res.status(422).json({
                    message: "Pessoa não encontrada!"
                })
                return
            }
            res.status(200).json(people)
        } catch (error) {
            if (error.kind === "ObjectId") {
                return res.status(404).json({
                    errors: [{
                        msg: "Person not found",
                        status: "404",
                    }, ],
                });
                next(error);
            }
        }
    }

    static async removePerson(req, res) {
        const id = req.params.id
        const person = await Person.findById(id)
        if (!person) {
            res.status(422).json({
                messagem: "Person not found",
                status: 422
            })
        }
        try {
    
            await Person.findByIdAndDelete(id)
            res.status(200).json({
                message: "Person remover success"
            })
    
        } catch (error) {
            if (error.kind === "ObjectId") {
                return res.status(422).json({
                    errors: [{
                        msg: "Person not found",
                        status: 422,
                    }, ],
                });
            }
        }
    }

    static async editPerson(req, res) {
        const id = req.params.id
        const {
            name,
            salary,
            approved
        } = req.body
        const person = {
            name,
            salary,
            approved
        }
    
        try {
            const updatedPerson = await Person.findByIdAndUpdate(id, person)
            if (updatedPerson.matchedCount === 0) {
                res.status(422).json({
                    message: "Person not found",
                    status: 422
                })
            }
            res.status(200).json(person)
        } catch (error) {
            if (error.kind === "ObjectId") {
                return res.status(422).json({
                    errors: [{
                        msg: "Person not found",
                        status: 422,
                    }, ],
                });
            }
        }
    }
}