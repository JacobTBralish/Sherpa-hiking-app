INSERT INTO visited (user_visited_id, visited_trail_id) VALUES
(${userVisitedId}, ${visitedTrailId});
SELECT * FROM visited WHERE visited_trail_id = ${visitedTrailId};