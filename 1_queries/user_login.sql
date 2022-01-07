SELECT id,
  name,
  email,
  password
FROM users
WHERE email = 't@g.com';
-- @Block
INSERT INTO users (name, email, password)
VALUES (
    'roney',
    'roneythomas6@gmail',
    '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
  )
RETURNING *;