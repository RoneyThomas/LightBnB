SELECT city, count(properties) as total_reservations
FROM properties
JOIN reservations r on properties.id = r.property_id
GROUP BY city
ORDER BY count(properties) DESC;