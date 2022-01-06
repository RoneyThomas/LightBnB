INSERT INTO users (name, email, password)
VALUES (
    'Eva',
    'eva@gmail.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Lou',
    'lou@me.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  ),
  (
    'Sandy',
    's@ndy.com',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  );
INSERT INTO properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code,
    active
  )
VALUES (
    1,
    'Blank corner',
    'description',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    85234,
    6,
    6,
    7,
    'Canada',
    '651 Nami Road',
    'Bohbatev',
    'Alberta',
    85680,
    true
  ),
  (
    2,
    'Blank cor',
    'description',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    85234,
    1,
    6,
    3,
    'Canada',
    '652 Nami Road',
    'Bohbatev',
    'Alberta',
    83630,
    true
  ),
  (
    3,
    'Blank ner',
    'description',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350',
    'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    85234,
    4,
    5,
    7,
    'Canada',
    '654 Nami Road',
    'Bohbatev',
    'Alberta',
    83630,
    true
  );
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 3, 3),
  ('2018-09-12', '2018-10-26', 2, 2),
  ('2018-09-13', '2018-11-26', 1, 1);
INSERT INTO property_reviews (
    guest_id,
    property_id,
    reservation_id,
    rating,
    message
  )
VALUES (3, 3, 3, 3, 'messages'),
  (2, 2, 2, 3, 'messages'),
  (1, 1, 1, 3, 'messages');