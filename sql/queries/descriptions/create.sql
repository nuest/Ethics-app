INSERT INTO Descriptions (
    revision_id,
    en_title,
    en_researcher,
    en_study_time,
    en_purpose,
    en_procedure,
    en_duration,
    en_risks,
    en_benefits,
    de_used,
    de_title,
    de_researcher,
    de_study_time,
    de_purpose,
    de_procedure,
    de_duration,
    de_risks,
    de_benefits,
    pt_used,
    pt_title,
    pt_researcher,
    pt_study_time,
    pt_purpose,
    pt_procedure,
    pt_duration,
    pt_risks,
    pt_benefits
) VALUES (
    $1::INTEGER,
    $2::TEXT,
    $3::TEXT,
    $4::TEXT,
    $5::TEXT,
    $6::TEXT,
    $7::TEXT,
    $8::TEXT,
    $9::TEXT,
    $10::BOOLEAN,
    $11::TEXT,
    $12::TEXT,
    $13::TEXT,
    $14::TEXT,
    $15::TEXT,
    $16::TEXT,
    $17::TEXT,
    $18::TEXT,
    $19::BOOLEAN,
    $20::TEXT,
    $21::TEXT,
    $22::TEXT,
    $23::TEXT,
    $24::TEXT,
    $25::TEXT,
    $26::TEXT,
    $27::TEXT
)
RETURNING *;
