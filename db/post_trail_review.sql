INSERT INTO trail_reviews (review_trail_id, body, rating, author_id) VALUES
($1, $2, $3, $4)
RETURNING * ;