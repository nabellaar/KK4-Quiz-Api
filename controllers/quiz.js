const db = require('../models');
const Quiz = db.quizzes;

// CREATE
exports.create = async (req, res) => {
    try {
        const data = await Quiz.create(req.body)
        res.json({
            message: "quiz created succesfully!",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
}

// READ ALL
exports.getAll = async(req, res) => {
    try {
        const quizzes = await Quiz.findAll()
        res.json({
            message: "Quizzes retrieved successfully",
            data: quizzes,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};

// EDIT
exports.update = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        quiz.update(req.body, {
            where: {id}
        })
        res.json({
            message: "Quizzes updated successfully",
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "some error occurred while retrieving quiz",
            data: null,
        });
    }
}

// DELETE
exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })

        quiz.destroy()

        res.json({
            message: "Quizz deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "some error occurred while retrieving quiz",
            data: null,
        });
    }
}

// READ by Id
exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `Quizzes retrievied successfully with id=${id}`,
            data: quiz,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some error occurred while retrieving quiz",
            data: null,
        });
    }
};

// READ by Category
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where: {
            categoryId: id 
        }
    })
    res.json({
        message: `Quizzes retrieved succesfully with categoryId=${id}`,
        data: quizzes
    });
}

// READ by Level
exports.getByLevelId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where: {
            levelId: id
         }
    })
    res.json({
        message: `Quizzes retrieved successfully with levelId=${id}`,
        data: quizzes,
    });
}