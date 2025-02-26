-- Contains SQL queries for creating all tables


-- SQL query to create the average_delivery_time table
CREATE TABLE average_delivery_time (
    delivery_id SERIAL PRIMARY KEY,  -- Unique identifier for each delivery
    dispatch_date DATE NOT NULL,          -- Date when the package was sent
    delivery_date DATE ,          -- Date when the package was delivered
    duration_days INT CHECK (duration_days >= 0)  -- Ensuring duration is not negative
);



-- SQL Query for number_of_shipments Table
CREATE TABLE number_of_shipments (
    shipment_id SERIAL PRIMARY KEY,  -- Auto-incrementing unique ID
    month VARCHAR(20) NOT NULL,      -- Month name as a string
    year INT NOT NULL CHECK (year >= 2000),  -- Ensuring a reasonable year range
    country VARCHAR(100) NOT NULL,   -- Country name
    shipment_type VARCHAR(10) NOT NULL CHECK (shipment_type IN ('Air', 'Sea')),  -- Restrict values
    total_shipments INT NOT NULL CHECK (total_shipments >= 0)  -- No negative shipments
);



-- SQL Query for orders Table

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,  -- Unique order ID
    order_date DATE NOT NULL,          -- Order date stored in DATE format
    country VARCHAR(100) NOT NULL,     -- Country name
    shipment_type VARCHAR(10) NOT NULL CHECK (shipment_type IN ('Air', 'Sea'))  -- Only 'Air' or 'Sea' allowed
);



-- SQL Query for perfect_order_rate Table

CREATE TABLE perfect_order_rate (
    perfect_order_rate_id SERIAL PRIMARY KEY,  -- Unique identifier
    month VARCHAR(20) NOT NULL,                -- Month name
    year INT NOT NULL,                         -- Year
    total_orders INT NOT NULL CHECK (total_orders >= 0),   -- Total number of orders
    timely_deliver INT NOT NULL CHECK (timely_deliver >= 0), -- Orders delivered on time
    complete_orders INT NOT NULL CHECK (complete_orders >= 0), -- Completed orders
    undamaged_orders INT NOT NULL CHECK (undamaged_orders >= 0), -- Orders without damage
    accurate_docs INT NOT NULL CHECK (accurate_docs >= 0),  -- Orders with accurate documentation
    perfect_orders INT NOT NULL CHECK (perfect_orders >= 0), -- Orders meeting all criteria
    perfect_order_rate DECIMAL(5,2) NOT NULL CHECK (perfect_order_rate BETWEEN 0 AND 100) -- Percentage value
);



-- SQL to create the shipping_time table
CREATE TABLE shipping_time (
    shipping_time_id SERIAL PRIMARY KEY,
    month VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    country VARCHAR(100) NOT NULL,
    shipment_type VARCHAR(10) CHECK (shipment_type IN ('Air', 'Sea')) NOT NULL,
    average_shipping_time INT NOT NULL,
    goal INT NOT NULL
);


-- SQL to Create the transportation_cost Table
CREATE TABLE transportation_cost (
    transport_id SERIAL PRIMARY KEY,
    order_id VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    weight_in_kgs INT NOT NULL,
    cost_per_kg NUMERIC(10,8) NOT NULL,
    fixed_cost_per_country INT NOT NULL,
    total_cost NUMERIC(12,6) NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);
