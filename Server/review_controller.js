module.exports = {

    getProfileReviews: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;
        console.log('req.params: ', req.params);


        db.get_profile_reviews( id ).then(reviews => {
            res.status(200).json(reviews);
        }).catch(error => {
            console.log(error, 'Error getting profile reviews')
            res.status(500).json(error);
        })
    }
}