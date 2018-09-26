INSERT INTO visited (user_visited_id, visited_trail_id, visit_count) VALUES
(${userVisitedId}, ${visitedTrailId}, ${visitCount});
SELECT * FROM visited WHERE visited_trail_id = ${visitedTrailId};