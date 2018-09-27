-- INSERT INTO visited (user_visited_id, visited_trail_id, visit_count) VALUES
-- (${userVisitedId}, ${visitedTrailId}, ${visitCount});
-- SELECT * FROM visited WHERE visited_trail_id = ${visitedTrailId};


-- IF <> visit_count THEN
--   INSERT INTO visited (user_visited_id, visited_trail_id, visit_count) VALUES
-- (${userVisitedId}, ${visitedTrailId}, ${visitCount});;
-- ELSE
--   UPDATE visited;
-- END IF;


DO $$
BEGIN
IF EXISTS (SELECT * FROM visited) THEN
   UPDATE visited
   SET visit_count = visit_count + 1
   WHERE visited_trail_id = ${visitedTrailId};
ELSE 
   INSERT INTO visited (user_visited_id, visited_trail_id, visit_count) VALUES
(${userVisitedId}, ${visitedTrailId}, ${visitCount});
END IF;
END
$$;