
module.exports = {

    getTrailReviewById: ( req, res ) => {
        const db = req.app.get('db');
        let { id } = req.params;
        // console.log(req.params)
        // console.log(parseInt(id))

        db.get_trail_review( parseInt(id) ).then(trailReview => {
            console.log(trailReview);
            res.status(200).json(trailReview)
        }).catch(error => {
            res.status(500).json(error);
            console.log('Error in getting trail review by id')
        })
    },

    postReview: (req, res) => {
        const db = req.app.get('db');
        let { body, rating } = req.body;
        let { userid, trailid } = req.params;
        console.log(req.params)

        db.post_trail_review( [trailid, body, rating, userid] ).then(review => {
            console.log(review);
            res.status(200).json(review)
        }).catch(error => {
            res.status(500);
            console.log(error, 'Error in posting review');
        })
    }
}

