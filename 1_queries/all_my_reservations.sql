SELECT properties.*,
  reservations.*,
  avg(rating) as average_rating
FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
  AND reservations.end_date < now()::date
GROUP BY properties.id,
  reservations.id
ORDER BY reservations.start_date
LIMIT 10;
-- @Block
SELECT *
FROM properties
WHERE city LIKE '%roney%';
-- @Block
SELECT *
FROM properties
  JOIN property_reviews ON properties.id = property_id
WHERE properties.city LIKE 'roney'
GROUP BY properties.id
ORDER BY cost_per_night
LIMIT 10;