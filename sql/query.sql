-- Email addresses of users who have bought 'Apple Iphone 16 Pro' in the past 7 days
SELECT u.email 
FROM users u
JOIN orders o ON u.user_id = o.user_id
JOIN products p ON o.product_id = p.product_id
WHERE p.name = 'Apple Iphone 16 Pro'
AND o.order_date >= CURRENT_DATE - INTERVAL '7 days';

-- 2. Total sales amount per day
SELECT o.order_date::date AS day, SUM(p.price * o.quantity) AS total_sales
FROM orders o
JOIN products p ON o.product_id = p.product_id
GROUP BY o.order_date::date
ORDER BY day ASC;
