-- Universities
INSERT INTO Universities (
    university_name
) VALUES (
    'University of Münster'
), (
    'Portuguese University'
);


-- Institutes
INSERT INTO Institutes (
    institute_name,
    university_id,
    former
) VALUES (
    'Institute for Geoinformatics',
    1,
    false
), (
    'Institute for Geography',
    1,
    false
), (
    'Institute for Landscape Ecology',
    1,
    false
), (
    'WWU Institute TEST (former)',
    1,
    true
), (
    'PTU Institute TEST',
    2,
    false
), (
    'PTU Institute TEST (former)',
    2,
    false
);


-- Working groups, e.g. Research groups
INSERT INTO Working_Groups (
    working_group_name,
    institute_id,
    former
) VALUES  (
    'Webteam',
    1,
    false
), (
    'Geosimulation modelling lab',
    1,
    false
), (
    'GI@School',
    1,
    false
), (
    'Ifgicopter',
    1,
    false
), (
    'Open lab on spatial information infrastructures',
    1,
    false
), (
    'Spatial intelligence lab',
    1,
    false
), (
    'Situated computing and interaction lab',
    1,
    false
), (
    'Spatio-temporal modelling lab',
    1,
    false
), (
    'IFGI working group TEST (former)',
    1,
    true
), (
    'PTUI working group TEST',
    5,
    false
), (
    'PTUI working group TEST (former)',
    5,
    true
);
