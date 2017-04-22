UPDATE Concerns SET (
    updated,
    q01_value,
    q01_explanation,
    q02_value,
    q02_explanation,
    q03_value,
    q03_explanation,
    q04_value,
    q04_explanation,
    q05_value,
    q05_explanation,
    q06_value,
    q06_explanation,
    q07_value,
    q07_explanation,
    q08_value,
    q08_explanation,
    q09_value,
    q09_explanation,
    q10_value,
    q10_explanation,
    q11_1_value,
    q11_1_explanation,
    q11_2_value,
    q11_2_explanation,
    q12_value,
    q12_explanation,
    q13_value,
    q13_explanation
) = (
    now(),
    $2::BOOLEAN,
    $3::TEXT,
    $4::BOOLEAN,
    $5::TEXT,
    $6::BOOLEAN,
    $7::TEXT,
    $8::BOOLEAN,
    $9::TEXT,
    $10::BOOLEAN,
    $11::TEXT,
    $12::BOOLEAN,
    $13::TEXT,
    $14::BOOLEAN,
    $15::TEXT,
    $16::BOOLEAN,
    $17::TEXT,
    $18::BOOLEAN,
    $19::TEXT,
    $20::BOOLEAN,
    $21::TEXT,
    $22::BOOLEAN,
    $23::TEXT,
    $24::BOOLEAN,
    $25::TEXT,
    $26::BOOLEAN,
    $27::TEXT,
    $28::BOOLEAN,
    $29::TEXT
)
WHERE
    concern_id=$1::INTEGER
RETURNING *;
