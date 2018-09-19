CREATE TABLE sherpa_users (
    id SERIAL PRIMARY KEY NOT NULL 
    ,auth0_id text UNIQUE NOT NULL
    ,name VARCHAR(100)
    ,email VARCHAR(100)
    ,picture TEXT
);


CREATE TABLE sherpa_profile (
    id SERIAL PRIMARY KEY NOT NULL
    ,profile_id INTEGER REFERENCES sherpa_users(id) NOT NULL
    ,profilePic TEXT
    ,first_name VARCHAR(18) 
    ,last_name VARCHAR(25) 
    ,experience VARCHAR(10)
    ,DOB DATE
);


CREATE TABLE sherpa_trails (
    id SERIAL PRIMARY KEY NOT NULL
    ,trail_name VARCHAR(30)
    ,trail_pic TEXT NOT NULL
    ,trail_lenth decimal NOT NULL
    ,ascent INTEGER
    ,decent INTEGER
    ,high INTEGER
    ,low INTEGER
    ,hours_of_operation INTEGER
    ,state CHAR(2) NOT NULL
    ,city VARCHAR(25) NOT NULL
    ,zip INTEGER NOT NULL
    ,longitude DECIMAL NOT NULL
    ,latitude DECIMAL NOT NULL
    ,author_id INTEGER REFERENCES sherpa_users(id) NOT NULL
);


CREATE TABLE suggested_items (
    id SERIAL PRIMARY KEY NOT NULL
    ,trail INTEGER references sherpa_trails(id) NOT NULL
    ,content text
);

CREATE TABLE visited (
    campsite_id INTEGER references sherpa_trails(id) NOT NULL
    ,users_id INTEGER references sherpa_users(id) NOT NULL
);