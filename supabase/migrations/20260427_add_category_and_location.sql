-- Add category to products table
ALTER TABLE products ADD COLUMN category text NOT NULL DEFAULT 'varios';

-- Add location to products table (physical installation location)
ALTER TABLE products ADD COLUMN location text;

-- Add location to movements table (destination location for the item)
ALTER TABLE movements ADD COLUMN destination_location text;

-- Create enum for categories
CREATE TYPE product_category AS ENUM ('clima', 'herramientas', 'varios');

-- Update category column to use enum
ALTER TABLE products DROP COLUMN category;
ALTER TABLE products ADD COLUMN category product_category NOT NULL DEFAULT 'varios';

-- Add index for faster queries by category
CREATE INDEX idx_products_category ON products(category);
