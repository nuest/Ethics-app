DROP TABLE IF EXISTS Concerns CASCADE;

-- SCHEMA
CREATE TABLE Concerns (

    -- General
    concern_id SERIAL PRIMARY KEY,
    created TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

    -- Attributes
    document_id CHARACTER VARYING(255) NOT NULL REFERENCES Documents(document_id) ON UPDATE CASCADE ON DELETE CASCADE,
    revision_id INTEGER NOT NULL REFERENCES Revisions(revision_id) ON UPDATE CASCADE ON DELETE CASCADE,
    question SMALLINT NOT NULL CHECK (question >= 0),
    value BOOLEAN NOT NULL,
    comment CHARACTER VARYING(255) DEFAULT NULL
);