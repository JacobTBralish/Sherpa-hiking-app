
module.exports = {

    getTrailReviewById: ( req, res ) => {

        const db = req.app.get('db');
        let { id } = req.params;

        db.get_trail_review( parseInt(id) ).then(trailReview => {
            console.log(trailReview);
            res.status(200).json(trailReview)
        }).catch(error => {
            res.status(500).json(error);
            console.log('Error in getting trail review by id')
        })
    },

    postReview: (req, res) => {

console.log(req.params,'THIS IS REQ.PARAMS OF POST REV')
console.log(req.body,'THIS IS REQ.BODY OF POST REV')

        const db = req.app.get('db');
        let { trailName, trailImg ,title, time, reviewBody, rating, userId } = req.body;
        let { trailId } = req.params;


        db.post_trail_review( { reviewTrailId: trailId, trailName: trailName, trailImg: trailImg ,title, time, body: reviewBody, rating, authorId: userId }).then(review => {
            res.status(200).json(review)

        }).catch(error => {
            res.status(500);
            console.log(error, 'Error in posting review');
        })
    },

    deleteReview: (req,res) => {
        // console.log(req.query, req.params, '------------------------------------')
        const db = req.app.get('db');
        let { id } = req.params;
        let { reviewId } = req.query;

        db.delete_review( [reviewId, id ] ).then(response => {
            res.status(200).json(response)
        }).catch(error => {
            console.log(error, 'Error with deleting your trail')
        })
    },


}

