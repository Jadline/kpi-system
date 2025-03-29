-- Contains SQL queries for creating all tables


-- SQL query to create the average_delivery_time table
CREATE TABLE average_delivery_time (
    delivery_id SERIAL PRIMARY KEY,  -- Unique identifier for each delivery
    dispatch_date DATE NOT NULL,          -- Date when the package was sent
    delivery_date DATE ,          -- Date when the package was delivered
    duration_days INT CHECK (duration_days >= 0)  -- Ensuring duration is not negative
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
CREATE TABLE perfect_order_rate_by_country (
    perfect_order_rate_by_country_id SERIAL PRIMARY KEY,  -- Unique auto-incrementing ID
    country VARCHAR(100) NOT NULL,       -- Country name
    month VARCHAR(20) NOT NULL,          -- Month name
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
    perfect_order_rate_by_air DECIMAL(5,2) NOT NULL CHECK (perfect_order_rate)
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
CREATE TABLE transportation_cost (
    transport_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    country VARCHAR(100) NOT NULL,
    weight_in_kgs INT NOT NULL,
    cost_per_kg NUMERIC(10,8) NOT NULL,
    fixed_cost_per_country INT NOT NULL,
    total_cost NUMERIC(12,6) NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);
