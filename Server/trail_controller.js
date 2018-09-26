
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

console.log('PostReview fired')

        const db = req.app.get('db');
        let { title, time, reviewBody, rating, userId } = req.body;
        let { trailId } = req.params;


        db.post_trail_review( { reviewTrailId: trailId, title, time, body: reviewBody, rating, authorId: userId }).then(review => {
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

    getVisited: (req, res) => {
        const db = req.app.get('db')
        let { trailId } = req.params;
        let { userId } = req.body;

        db.get_visited_trails( [ trailId, userId ] ).then(response => {
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error);
            console.log(error, 'Error in getting visited trails')
        })
    },

    postVisited: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;
        let { userId, visitCount } = req.body;
        // console.log(req.body);
        // console.log(req.params);

        db.post_visited_trail( { userVisitedId: userId , visitedTrailId: id, visitCount} ).then(response => {
            console.log(response,'this is your visited post console.log ---------------')
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
            console.log(error, 'Error in posting visited')
        })
    },
}

