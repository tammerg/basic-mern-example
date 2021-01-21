const Show = require('../models/show-model')

createShow = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a showing',
        })
    }

    const show = new Show(body)

    if (!show) {
        return res.status(400).json({ success: false, error: err })
    }

    show
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: show._id,
                message: 'Showing created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Showing not created!',
            })
        })
}

updateShow = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Show.findOne({ _id: req.params.id }, (err, show) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Showing not found!',
            })
        }
        show.name = body.name
        show.time = body.time
        show.rating = body.rating
        show
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: show._id,
                    message: 'Movie updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Movie not updated!',
                })
            })
    })
}

deleteShow = async (req, res) => {
    await Show.findOneAndDelete({ _id: req.params.id }, (err, show) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: show })
    }).catch(err => console.log(err))
}

getShowById = async (req, res) => {
    await Show.findOne({ _id: req.params.id }, (err, show) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: show })
    }).catch(err => console.log(err))
}

getShows = async (req, res) => {
    await Show.find({}, (err, shows) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!shows.length) {
            return res
                .status(404)
                .json({ success: false, error: `Showing not found` })
        }
        return res.status(200).json({ success: true, data: shows })
    }).catch(err => console.log(err))
}

module.exports = {
    createShow,
    updateShow,
    deleteShow,
    getShows,
    getShowById,
}
