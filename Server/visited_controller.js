module.exports = {
    getVisited: (req, res) => {
        const db = req.app.get('db')
        let { trailId } = req.params;
        let { userId } = req.body;

        db.get_visited_trails( { visited_trail_id: trailId, user_visited_id: userId } ).then(response => {
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error);
            console.log(error, 'Error in getting visited trails')
        })
    },

    postVisited: (req, res) => {
        const db = req.app.get('db');
        let { trailId } = req.params;
        let { userId, visitCount } = req.body;
        // console.log(req.body);
        // console.log(req.params);

        db.post_visited_trail( { visited_trail_id: trailId, user_visited_id: userId, visit_count: visitCount } ).then(response => {
            console.log(response,'this is your visited post console.log ---------------')
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
            console.log(error, 'Error in posting visited')
        })
    },

    incrementVisited: (req, res) => {
        const db = req.app.get('db');
        let { trailId } = req.params;
        let { userId, visitCount } = req.body;

        db.post_visited_trail( { visited_trail_id: trailId, user_visited_id: userId, visit_count: visitCount } ).then(response => {
            console.log(response,'this is your visited post console.log ---------------')
            res.status(200).json(response)
        }).catch(error => {
            res.status(500).json(error)
            console.log(error, 'Error in posting visited')
        })
    }
}