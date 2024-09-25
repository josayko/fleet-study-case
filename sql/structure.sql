CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(128),
  email VARCHAR(128),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(128),
  price DECIMAL(10, 2)
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO users (name, email)
VALUES
('John Doe', 'john.doe@example.com'),
('Jane Smith', 'jane.smith@example.com'),
('Alice Johnson', 'alice.johnson@example.com');

INSERT INTO products (name, price)
VALUES
('Apple Iphone 16 Pro', 1219),
('Google Pixel 9 Pro', 1099),
('Samsung Galaxy S24 Ultra', 1319);

INSERT INTO orders (user_id, product_id, quantity, order_date)
VALUES
(1, 1, 2, CURRENT_DATE - INTERVAL '2 days'),
(2, 1, 1, CURRENT_DATE - INTERVAL '3 days'),
(3, 2, 3, CURRENT_DATE - INTERVAL '5 days'),
(1, 3, 1, CURRENT_DATE - INTERVAL '10 days'),
(1, 3, 2, CURRENT_DATE - INTERVAL '12 days'),
(2, 1, 2, CURRENT_DATE - INTERVAL '13 days'),
(3, 2, 4, CURRENT_DATE - INTERVAL '15 days'),
(1, 3, 1, CURRENT_DATE - INTERVAL '20 days');
