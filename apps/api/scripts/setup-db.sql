-- Create tables for the VMS application

CREATE TABLE IF NOT EXISTS portfolio_items (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL, -- 'product' or 'service'
    features TEXT[] DEFAULT '{}',
    icon_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS demo_requests (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    interested_in TEXT, -- Maps to portfolio_items.id (as text for flexibility)
    preferred_demo_date DATE,
    message TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'completed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed some initial data
INSERT INTO portfolio_items (title, description, type, features, icon_name) VALUES
('Custom CRM Solutions', 'Tailored Customer Relationship Management systems to streamline your sales and support pipelines.', 'product', ARRAY['Lead Tracking', 'Sales Pipeline', 'Customer Support Integration'], 'box'),
('Enterprise HRMS', 'Complete Human Resource Management Systems for payroll, attendance, and employee lifecycle management.', 'product', ARRAY['Payroll Management', 'Attendance Tracking', 'Employee Self-Service'], 'users'),
('Cloud Consultancy', 'Expert guidance on cloud migration, architecture, and infrastructure optimization for scalability.', 'service', ARRAY['Cloud Migration', 'Serverless Architectures', 'Cost Optimization'], 'cloud'),
('Custom Software Development', 'Bespoke software solutions crafted to meet your unique business requirements and challenges.', 'service', ARRAY['Full-stack Development', 'Mobile Apps', 'API Integration'], 'code');
