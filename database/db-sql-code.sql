CREATE TYPE public.account_type AS ENUM
    ('Client', 'Employee', 'Admin');

ALTER TYPE public.account_type
    OWNER TO kocse340class_user;