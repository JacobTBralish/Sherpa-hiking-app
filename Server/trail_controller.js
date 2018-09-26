
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


    // INSERT INTO trail_reviews (review_trail_id, title, time, body, rating, author_id) VALUES
    // ($1, $2, $3, $4, $5, $6);
    // SELECT * FROM trail_reviews where review_trail_id = $1;

    postReview: (req, res) => {

console.log('PostReview fired')

        // console.log(req.params)
        // console.log(req.body)
        const db = req.app.get('db');
        let { title, time, reviewBody, rating, userId } = req.body;
        let { trailId } = req.params;


        db.post_trail_review( { reviewTrailId: trailId, title, time, body: reviewBody, rating, authorId: userId }).then(review => {
            // console.log(' post trail review console.log', review);
            res.status(200).json(review)
        }).catch(error => {
            res.status(500);
            console.log(error, 'Error in posting review');
        })
    },

    deleteReview: (req,res) => {
        console.log(req.query, req.params, '------------------------------------')
        const db = req.app.get('db');
        let { id } = req.params;
        let { reviewId } = req.query;

        db.delete_review( [reviewId, id ] ).then(response => {
            res.status(200).json(response)
        }).catch(error => {
            console.log(error, 'Error with deleting your trail')
        })
    },

    visited: (req, res) => {
        const db = req.app.get('db')
    }
}

