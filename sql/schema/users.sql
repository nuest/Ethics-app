DROP TABLE IF EXISTS Users CASCADE;

-- SCHEMA
CREATE TABLE Users (

    -- General
    user_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    email_address CHARACTER VARYING(255) UNIQUE NOT NULL,
    title CHARACTER VARYING(255) DEFAULT NULL,
    first_name CHARACTER VARYING(255) NOT NULL,
    last_name CHARACTER VARYING(255) NOT NULL

);

-- Admin-account
INSERT INTO Users (
    email_address,
    first_name,
    last_name
) VALUES (
    'n.schiestel@uni-muenster.de',
    'Webteam',
    'Admin'
);
