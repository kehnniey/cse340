-- Task 1 (See task 2 in the db-sql-code)
-- 1. Insert Tony Stark into the account table
INSERT INTO public.account (
    account_firstname,
    account_lastname,
    account_email,
    account_password
)
VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com',
    'Iam1ronM@n'
);

-- 2. Update Tony Stark's account_type to Admin
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- 3. Delete Tony Stark from the database
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';

-- 4. Update GM Hummer description using REPLACE
UPDATE public.inventory
SET inv_description = REPLACE(
    inv_description,
    'small interiors',
    'a huge interior'
)
WHERE inv_make = 'GM'
  AND inv_model = 'Hummer';

-- 5. Select Sport inventory using INNER JOIN
SELECT
    i.inv_make,
    i.inv_model,
    c.classification_name
FROM public.inventory i
INNER JOIN public.classification c
    ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 6. Update image paths to include /vehicles
UPDATE public.inventory
SET
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
