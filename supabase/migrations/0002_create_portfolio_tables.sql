-- Create portfolio_items table
CREATE TABLE portfolio_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('product', 'service')),
    features JSONB DEFAULT '[]'::jsonb,
    icon_name TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create demo_requests table
CREATE TABLE demo_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    interested_in UUID REFERENCES portfolio_items(id) ON DELETE SET NULL,
    preferred_demo_date DATE,
    message TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Demo Scheduled', 'Completed', 'Closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some seed data for Portfolio items (Products and Services)
INSERT INTO portfolio_items (title, description, type, features, icon_name) VALUES
('Visitor Management System', 'Modern, secure reception and guest check-ins.', 'product', '["QR Check-in", "Host Alerts", "Badge Printing"]', 'id-badge'),
('Sales Tracking System', 'Track your pipeline and close deals faster.', 'product', '["Pipeline View", "Lead Scoring", "Win/Loss Analytics"]', 'trending-up'),
('CRM Platform', 'Complete customer relationship management suite.', 'product', '["360 Customer View", "Email Integration", "Task Automation"]', 'users'),
('Custom Software Development', 'Tailored software solutions built for your unique business needs.', 'service', '[]', 'code'),
('SAP Integration', 'Seamlessly connect the world leading ERP to your ecosystem.', 'service', '[]', 'database'),
('CRM Development', 'Custom CRM builds or Salesforce/HubSpot migrations.', 'service', '[]', 'users-cog'),
('Enterprise Automation', 'RPA and workflow automation to eliminate manual tasks.', 'service', '[]', 'bot');
