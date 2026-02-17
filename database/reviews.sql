-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL PRIMARY KEY,
  inv_id INT NOT NULL,
  account_id INT NOT NULL,
  review_text TEXT NOT NULL,
  review_rating INT NOT NULL CHECK (review_rating >= 1 AND review_rating <= 5),
  review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inv_id) REFERENCES inventory(inv_id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES account(account_id) ON DELETE CASCADE
);

-- Verify table created
SELECT * FROM reviews;

-- Testing Reviews
-- Insert test reviews (replace with actual account_id and inv_id from your database)
-- First, check your account IDs
SELECT account_id, account_firstname, account_email FROM account;

-- Check your inventory IDs
SELECT inv_id, inv_make, inv_model FROM inventory LIMIT 5;

-- Add sample reviews (update IDs based on your data)
INSERT INTO reviews (inv_id, account_id, review_text, review_rating) 
VALUES 
  (1, 1, 'Great car! Very reliable and fuel efficient. Highly recommend for daily commuting.', 5),
  (1, 2, 'Good vehicle but a bit pricey. Overall satisfied with the purchase.', 4),
  (2, 1, 'Excellent SUV! Spacious and comfortable for family trips.', 5);

-- Verify
SELECT r.*, a.account_firstname, i.inv_make, i.inv_model 
FROM reviews r 
JOIN account a ON r.account_id = a.account_id 
JOIN inventory i ON r.inv_id = i.inv_id;