module.exports = {

    getProfile: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;

        db.get_profile( id ).then(profile => {
            res.status(200).json(profile)}).catch(error => {
                res.status(500).json(error);
                console.log(error, 'There was an error getting your profile.')
            })
    },

    editProfile: (req, res) => {
        const db = req.app.get('db');
        let { profilePic, bio, city, state, experience } = req.body;
        let { id } = req.params;

        db.edit_profile( [id, profilePic, bio, city, state, experience ] ).then(profile => {
            res.status(200).json(profile)}).catch(error => {
                res.staus(500).json(error);
                console.log(error, 'Error with edit.')
            })
    },

    postProfile: (req, res ) => {
        const db = req.app.get('db');
        let { profilePic, bio, city, state, first_name, last_name, experience } = req.body;

        db.create_profile( [ profilePic, bio, city, state, first_name, last_name, experience ] ).then(profile => {
            res.status(200).json(profile)}).catch(error => {
                res.status(500).json(error);
                console.log(error, 'Error with creating your profile')
            })
    },

    // visitedTrail: (req, res) => {
    //     const db = req.app.get('db');
    //     let { id } = req.params;

    //     db.visited_trail([ id ]).then(visited => {
    //         res.status(200).json(visited)}).catch(error => {
    //             res.status(500).json(error);
    //             console.log(error, 'There was an error confirming your visit to this trail.')
    //         })
    // }

}