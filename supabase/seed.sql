-- Optional: copies the case studies that were hard-coded in the site into the database.
-- Run after schema.sql. Re-running updates them in place.

insert into public.case_studies (slug, name, subtitle, sector, industry, summary, tags, image, challenge, delivered, solution, results, sort, status)
values ('microsoft-cloud-productivity-transformation',
  'MICROSOFT CLOUD & PRODUCTIVITY TRANSFORMATION',
  'Microsoft 365, Cloud Collaboration & Security Setup',
  'PROFESSIONAL SERVICES',
  'Professional Services / Small-to-large Business',
  'A structured Microsoft 365 environment with business email, Teams, and SharePoint — giving the client a secure, organised digital workplace.',
  array['Microsoft 365', 'Cloud Migration', 'Security']::text[],
  '/assets/work/microsoft-cloud.jpg',
  'The client needed a more reliable and professional digital working environment. Their team was using different email accounts, manual file sharing, and basic communication tools, which made collaboration slower and increased the risk of missed information. They also required a more secure setup for business email, document access, and daily team communication.',
  'QORLIQ supported the client with Microsoft cloud solutions, including Microsoft 365 setup, business email configuration, Teams collaboration, SharePoint document structure, Exchange Online support, user account setup, security guidance, and cloud migration planning.',
  'We reviewed the client''s current working process and created a structured Microsoft 365 environment suitable for their business needs. Professional email accounts were configured, Teams was prepared for internal communication, and SharePoint was organised for secure document storage and controlled access. We also provided guidance on user roles, data security, and basic compliance settings to help the business operate more professionally.',
  'The client received a cleaner, more secure, and more organised digital workplace. Team communication improved, business documents became easier to access and manage, and the company gained a professional cloud-based foundation for future growth. The project helped reduce manual work, improve collaboration, and support the client''s long-term digital transformation.',
  1,
  'published')
on conflict (slug) do update set name = excluded.name, subtitle = excluded.subtitle, sector = excluded.sector, industry = excluded.industry, summary = excluded.summary, tags = excluded.tags, image = excluded.image, challenge = excluded.challenge, delivered = excluded.delivered, solution = excluded.solution, results = excluded.results, sort = excluded.sort;

insert into public.case_studies (slug, name, subtitle, sector, industry, summary, tags, image, challenge, delivered, solution, results, sort, status)
values ('website-branding-digital-growth',
  'WEBSITE, BRANDING & DIGITAL GROWTH PROJECT',
  'Business Website, Brand Identity & Lead Generation Setup',
  'STARTUP / SERVICE-BASED',
  'Startup / Service-Based Business',
  'A modern, mobile-friendly website with brand identity, SEO structure, and lead generation forms built for customer acquisition.',
  array['Website Design', 'Brand Identity', 'Lead Generation']::text[],
  '/assets/work/website-branding.jpg',
  'The client needed a professional online presence to build trust, present services clearly, and generate enquiries from potential customers. Their existing digital setup was limited, with no strong website structure, weak brand presentation, and no proper system for capturing leads or supporting marketing activity.',
  'QORLIQ delivered website design, brand identity support, content structure, landing page planning, lead generation forms, SEO setup, paid advertising guidance, and digital marketing support. The project focused on creating a strong foundation for visibility, credibility, and business growth.',
  'We designed a clean, modern, and mobile-friendly website that clearly presented the client''s services, business value, and contact options. The brand identity was improved through consistent visual direction, professional layout, service sections, and clear call-to-action areas. Lead generation forms were added to support customer enquiries, while SEO structure and marketing-ready pages were prepared to help the client attract the right audience.',
  'The client gained a more professional digital presence and a stronger platform for customer acquisition. The website made the business look more credible, improved service presentation, and created a clear path for visitors to make enquiries. The project helped the client move from a basic online presence to a structured digital foundation ready for marketing, sales, and long-term growth.',
  2,
  'published')
on conflict (slug) do update set name = excluded.name, subtitle = excluded.subtitle, sector = excluded.sector, industry = excluded.industry, summary = excluded.summary, tags = excluded.tags, image = excluded.image, challenge = excluded.challenge, delivered = excluded.delivered, solution = excluded.solution, results = excluded.results, sort = excluded.sort;

