/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
    const portfolioItems = [
        {
            title: 'Visitor Management System',
            description: 'Modern, secure reception and guest check-ins.',
            type: 'product',
            features: JSON.stringify(['QR Check-in', 'Host Alerts', 'Badge Printing']),
            icon_name: 'id-badge'
        },
        {
            title: 'Sales Tracking System',
            description: 'Track your pipeline and close deals faster.',
            type: 'product',
            features: JSON.stringify(['Pipeline View', 'Lead Scoring', 'Win/Loss Analytics']),
            icon_name: 'trending-up'
        },
        {
            title: 'CRM Platform',
            description: 'Complete customer relationship management suite.',
            type: 'product',
            features: JSON.stringify(['360 Customer View', 'Email Integration', 'Task Automation']),
            icon_name: 'users'
        },
        {
            title: 'Custom Software Development',
            description: 'Tailored software solutions built for your unique business needs.',
            type: 'service',
            features: JSON.stringify([]),
            icon_name: 'code'
        },
        {
            title: 'SAP Integration',
            description: 'Seamlessly connect the world leading ERP to your ecosystem.',
            type: 'service',
            features: JSON.stringify([]),
            icon_name: 'database'
        },
        {
            title: 'CRM Development',
            description: 'Custom CRM builds or Salesforce/HubSpot migrations.',
            type: 'service',
            features: JSON.stringify([]),
            icon_name: 'users-cog'
        },
        {
            title: 'Enterprise Automation',
            description: 'RPA and workflow automation to eliminate manual tasks.',
            type: 'service',
            features: JSON.stringify([]),
            icon_name: 'bot'
        }
    ];

    for (const item of portfolioItems) {
        const exists = await knex('portfolio_items').where({ title: item.title }).first();
        if (!exists) {
            await knex('portfolio_items').insert(item);
        }
    }
}
