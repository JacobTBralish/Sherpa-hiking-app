INSERT INTO trail_reviews (review_trail_id, title, time, body, rating, author_id) VALUES
(${reviewTrailId}, ${title}, ${time}, ${body}, ${rating}, ${authorId});
SELECT * FROM trail_reviews where review_trail_id = ${reviewTrailId};