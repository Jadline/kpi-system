-- Contains SQL queries for creating all tables

-- Step 1: Drop table if it already exists
DROP TABLE IF EXISTS average_delivery_time_countries;

-- Step 2: Create the table
CREATE TABLE average_delivery_time_countries (
    dispatch_date DATE,
    country VARCHAR(50),
    shipment_type VARCHAR(10),
    total_deliveries INT,
    ontime_deliveries INT,
    ontime_deliveries_pct DECIMAL(5,2),
    delivery_completion_date DATE,
    average_delivery_time INT,
    average_delivery_time_goal INT,
    status INT
);
-- to allow the status column change the TYPE to accept decimals
ALTER TABLE average_delivery_time_countries
ALTER COLUMN status TYPE DECIMAL(5,2) USING status::DECIMAL(5,2);


-- Step 1: Drop old table if it exists
DROP TABLE IF EXISTS average_delivery_time;

-- Step 2: Create new table
CREATE TABLE average_delivery_time (
    year INT,
    month VARCHAR(20),
    average_delivery_by_air DECIMAL(5,2),
    average_delivery_by_sea DECIMAL(5,2),
    total_ontime_deliveries INT,
    ontime_deliveries_pct DECIMAL(10,6),
    total_deliveries INT,
    avg_goal_by_air DECIMAL(5,2),
    avg_goal_by_sea DECIMAL(5,2)
);

-- SQL Query for number_of_shipments Table
-- Drop the existing table if it exists
DROP TABLE IF EXISTS number_of_shipments;

-- Create the updated table with On Time Shipments included
CREATE TABLE number_of_shipments (
    shipment_id SERIAL PRIMARY KEY,    -- Auto-incrementing unique ID
    month VARCHAR(20) NOT NULL,        -- Month name as a string
    year INT NOT NULL CHECK (year >= 2000),  -- Ensuring a reasonable year range
    country VARCHAR(100) NOT NULL,     -- Country name
    shipment_type VARCHAR(10) NOT NULL CHECK (shipment_type IN ('Air', 'Sea')),  -- Restrict values
    on_time_shipments INT NOT NULL CHECK (on_time_shipments >= 0), -- No negative on-time shipments
    total_shipments INT NOT NULL CHECK (total_shipments >= 0) -- No negative total shipments
);



-- SQL Query for orders Table

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,  -- Unique order ID
    order_date DATE NOT NULL,          -- Order date stored in DATE format
    country VARCHAR(100) NOT NULL,     -- Country name
    shipment_type VARCHAR(10) NOT NULL CHECK (shipment_type IN ('Air', 'Sea'))  -- Only 'Air' or 'Sea' allowed
);



-- SQL Query for perfect_order_rate Table

-- Drop the table if it exists
DROP TABLE IF EXISTS perfect_order_rate;

-- Recreate the table with the updated columns
CREATE TABLE perfect_order_rate (
    perfect_order_rate_id SERIAL PRIMARY KEY,  -- Unique identifier
    month VARCHAR(20) NOT NULL,                -- Month name
    year INT NOT NULL,                         -- Year
    total_orders_air INT NOT NULL CHECK (total_orders_air >= 0),   -- Total number of orders by air
    total_orders_sea INT NOT NULL CHECK (total_orders_sea >= 0),   -- Total number of orders by sea
    incomplete_orders_air INT NOT NULL CHECK (incomplete_orders_air >= 0), -- Incomplete orders by air
    incomplete_orders_sea INT NOT NULL CHECK (incomplete_orders_sea >= 0), -- Incomplete orders by sea
    timely_deliveries_air INT NOT NULL CHECK (timely_deliveries_air >= 0), -- Timely deliveries by air
    timely_deliveries_sea INT NOT NULL CHECK (timely_deliveries_sea >= 0), -- Timely deliveries by sea
    complete_orders_air INT NOT NULL CHECK (complete_orders_air >= 0), -- Complete orders by air
    complete_orders_sea INT NOT NULL CHECK (complete_orders_sea >= 0), -- Complete orders by sea
    perfect_orders_air INT NOT NULL CHECK (perfect_orders_air >= 0), -- Perfect orders by air
    perfect_orders_sea INT NOT NULL CHECK (perfect_orders_sea >= 0), -- Perfect orders by sea
    perfect_order_rate_air DECIMAL(5,2) NOT NULL CHECK (perfect_order_rate_air BETWEEN 0 AND 100), -- Perfect order rate by air
    perfect_order_rate_sea DECIMAL(5,2) NOT NULL CHECK (perfect_order_rate_sea BETWEEN 0 AND 100)  -- Perfect order rate by sea
);


-- SQL to create perfect_order_rate_by_country table

-- Drop the existing table if it exists
DROP TABLE IF EXISTS perfect_order_rate_by_country;

-- Create the perfect_order_rate_by_country table
CREATE TABLE public.perfect_order_rate_by_country (
    perfect_order_rate_by_country_id SERIAL PRIMARY KEY,  -- Unique auto-incrementing ID
    country VARCHAR(100) NOT NULL,       -- Country name
    month VARCHAR(20) NOT NULL,           -- Month name
    year INT NOT NULL CHECK (year >= 2000),  -- Year (valid range)
    total_orders_by_air INT NOT NULL CHECK (total_orders_by_air >= 0),
    total_orders_by_sea INT NOT NULL CHECK (total_orders_by_sea >= 0),
    timely_deliveries_by_air INT NOT NULL CHECK (timely_deliveries_by_air >= 0),
    timely_deliveries_by_sea INT NOT NULL CHECK (timely_deliveries_by_sea >= 0),
    complete_orders_by_air INT NOT NULL CHECK (complete_orders_by_air >= 0),
    complete_orders_by_sea INT NOT NULL CHECK (complete_orders_by_sea >= 0),
    incomplete_orders_by_air INT NOT NULL CHECK (incomplete_orders_by_air >= 0),
    incomplete_orders_by_sea INT NOT NULL CHECK (incomplete_orders_by_sea >= 0),
    perfect_orders_by_air INT NOT NULL CHECK (perfect_orders_by_air >= 0),
    perfect_orders_by_sea INT NOT NULL CHECK (perfect_orders_by_sea >= 0),
    perfect_order_rate_by_air DECIMAL(5,2) NOT NULL CHECK (perfect_order_rate_by_air BETWEEN 0 AND 100),
    perfect_order_rate_by_sea DECIMAL(5,2) NOT NULL CHECK (perfect_order_rate_by_sea BETWEEN 0 AND 100)
);



-- SQL to create the shipping_time table

-- Drop the existing table if it exists
DROP TABLE IF EXISTS shipping_time;

-- Create the updated shipping_time table
CREATE TABLE shipping_time (
    shipping_time_id SERIAL PRIMARY KEY,  -- Unique auto-incrementing ID
    month VARCHAR(20) NOT NULL,           -- Month name
    year INT NOT NULL CHECK (year >= 2000), -- Valid year range
    country VARCHAR(100) NOT NULL,        -- Country name
    shipment_type VARCHAR(10) NOT NULL CHECK (shipment_type IN ('Air', 'Sea')), -- Restrict to 'Air' or 'Sea'
    average_shipping_time INT NOT NULL CHECK (average_shipping_time >= 0), -- Must be non-negative
    goal INT NOT NULL CHECK (goal >= 0),  -- Goal value must be non-negative
    on_time_shipments INT NOT NULL CHECK (on_time_shipments >= 0), -- On-time shipments
    total_shipments INT NOT NULL CHECK (total_shipments >= 0), -- Total shipments
    on_time_shipments_percentage DECIMAL(5,2) NOT NULL CHECK (on_time_shipments_percentage BETWEEN 0 AND 100) -- Percentage value (0-100)
);



-- SQL to Create the transportation_cost Table
DROP TABLE IF EXISTS transportation_cost;

CREATE TABLE transportation_cost (
    transport_id SERIAL PRIMARY KEY,
    year INT NOT NULL,
    month VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    shipment_type VARCHAR(10) NOT NULL,
    total_budget_million NUMERIC(10,2) NOT NULL,
    budget_used_million NUMERIC(10,2) NOT NULL,
    remaining_budget_million NUMERIC(10,2) NOT NULL,
    budget_used_percentage NUMERIC(5,2) NOT NULL,
    total_shipments INT NOT NULL,
    avg_cost_per_shipment NUMERIC(10,2) NOT NULL
);



-- SQL to create Transport agrregation

DROP TABLE IF EXISTS transport_aggregation;

CREATE TABLE transport_aggregation (
    year INT,
    month VARCHAR(20),
    avg_cost_per_shipment_air NUMERIC(12,6),
    avg_cost_per_shipment_sea NUMERIC(12,6),
    budget_used_pct_air NUMERIC(8,6),
    budget_used_pct_sea NUMERIC(8,6),
    remaining_budget_air_million NUMERIC(12,6),
    remaining_budget_sea_million NUMERIC(12,6),
    total_budget_air_million NUMERIC(12,6),
    total_budget_sea_million NUMERIC(12,6),
    total_budget_used_air_million NUMERIC(12,6),
    total_budget_used_sea_million NUMERIC(12,6),
    total_shipments_air INT,
    total_shipments_sea INT
);


-- SQL to create users Table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  role VARCHAR(50),
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
