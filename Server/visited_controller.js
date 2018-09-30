module.exports = {
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