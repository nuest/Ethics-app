SELECT
    COUNT(*) OVER()::NUMERIC AS full_count,
    institute.institute_id,
    institute.institute_name,
    institute.former,
    university.university_id,
    university.university_name
FROM Institutes institute
    JOIN Universities university ON university.university_id = institute.university_id
WHERE
        institute.former=$3::BOOLEAN
    AND
        institute.university_id=$4::INTEGER
ORDER BY
    institute_name ASC
OFFSET $1
LIMIT $2;