const router = require("express").Router()
const PersonController = require("../controllers/PersonController")

//CREATE
router.post("/", PersonController.createPerson)

//READ 
router.get("/", PersonController.showPersons)

router.get("/:id", PersonController.getPerson)

//UPDATE
router.patch('/:id', PersonController.editPerson)

//DELETE
router.delete('/:id', PersonController.removePerson)

module.exports = router