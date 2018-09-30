module.exports = {

    getProfile: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;


        db.get_profile( id ).then(profile => {
            console.log('profile: ', profile);
            res.status(200).json(profile)}).catch(error => {
                res.status(500).json(error);
                console.log(error, 'There was an error getting your profile.')
            })
    },

    editProfile: (req, res) => {
        const db = req.app.get('db');
        let { profilePic, bio, city, profileState, lastName, experience } = req.body;
        let { id } = req.params;
        console.log(req.body, 'BODY IN CONTROLLER')

        db.edit_profile( [id, profilePic, bio, city, profileState, lastName, experience ] ).then(profile => {
            res.status(200).json(profile)}).catch(error => {
                res.status(500).json(error);
                console.log(error, 'Error with edit.')
            })
    },

    postProfile: (req, res ) => {
        const db = req.app.get('db');
        console.log(req.body, 'this is req body in controller')
        console.log(req.params, 'this is req params in controller')
        let { profileId, profilePic, bio, city, profileState, firstName, lastName, experience } = req.body;
        console.log(profilePic)
        let { id } = req.params

        db.create_profile( [ id, profileId, profilePic, bio, city, profileState, firstName, lastName, experience ] ).then(profile => {
            console.log(profile)
            // res.status(200).json(profile)}).catch(error => {
            //     res.status(500).json(error);
            //     console.log(error, 'Error with creating your profile')
            // })
            db.profile_finished( id ).then(finished => {
                res.status(200).json(profile)}).catch(error => {
                    res.status(500).json(error);
                    console.log(error, 'Error with marking profile completed')
                })
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
