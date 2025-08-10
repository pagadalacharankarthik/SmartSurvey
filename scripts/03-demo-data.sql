-- Insert additional demo data for comprehensive testing

-- Insert more organizations
INSERT INTO organizations (id, name, description, admin_id, status) VALUES
('44444444-4444-4444-4444-444444444444', 'Rural Development Ministry', 'Government rural development and infrastructure surveys', NULL, 'active'),
('55555555-5555-5555-5555-555555555555', 'Public Health Corporation', 'Healthcare accessibility and quality assessment', NULL, 'pending'),
('66666666-6666-6666-6666-666666666666', 'Digital India Initiative', 'Technology adoption and digital literacy surveys', NULL, 'active'),
('77777777-7777-7777-7777-777777777777', 'Agricultural Research Board', 'Farming practices and crop yield analysis', NULL, 'active'),
('88888888-8888-8888-8888-888888888888', 'Urban Planning Department', 'City infrastructure and urban development', NULL, 'suspended');

-- Insert more organization admins
INSERT INTO profiles (id, email, full_name, phone, organization, role, status) VALUES
('11111111-1111-1111-1111-111111111111', 'rural.admin@gov.in', 'Dr. Anita Verma', '+919876543216', 'Rural Development Ministry', 'org_admin', 'active'),
('22222222-2222-2222-2222-222222222222', 'health.corp@gov.in', 'Dr. Vikram Singh', '+919876543217', 'Public Health Corporation', 'org_admin', 'pending'),
('33333333-3333-3333-3333-333333333333', 'digital.admin@gov.in', 'Rahul Sharma', '+919876543218', 'Digital India Initiative', 'org_admin', 'active'),
('44444444-4444-4444-4444-444444444444', 'agri.admin@gov.in', 'Prof. Sunita Devi', '+919876543219', 'Agricultural Research Board', 'org_admin', 'active'),
('55555555-5555-5555-5555-555555555555', 'urban.admin@gov.in', 'Eng. Rajesh Gupta', '+919876543220', 'Urban Planning Department', 'org_admin', 'suspended');

-- Insert more conductors
INSERT INTO profiles (id, email, full_name, phone, organization, role, status) VALUES
('66666666-6666-6666-6666-666666666666', 'conductor4@field.com', 'Priya Kumari', '+919876543221', 'Rural Development Ministry', 'conductor', 'active'),
('77777777-7777-7777-7777-777777777777', 'conductor5@field.com', 'Arjun Patel', '+919876543222', 'Public Health Corporation', 'conductor', 'active'),
('88888888-8888-8888-8888-888888888888', 'conductor6@field.com', 'Kavita Singh', '+919876543223', 'Digital India Initiative', 'conductor', 'active'),
('99999999-9999-9999-9999-999999999999', 'conductor7@field.com', 'Manoj Kumar', '+919876543224', 'Agricultural Research Board', 'conductor', 'active'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab', 'conductor8@field.com', 'Deepika Sharma', '+919876543225', 'Urban Planning Department', 'conductor', 'inactive'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'conductor9@field.com', 'Rohit Verma', '+919876543226', 'Health Ministry', 'conductor', 'active'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'conductor10@field.com', 'Neha Gupta', '+919876543227', 'Education Board', 'conductor', 'active');

-- Update organization admin references
UPDATE organizations SET admin_id = '11111111-1111-1111-1111-111111111111' WHERE id = '44444444-4444-4444-4444-444444444444';
UPDATE organizations SET admin_id = '22222222-2222-2222-2222-222222222222' WHERE id = '55555555-5555-5555-5555-555555555555';
UPDATE organizations SET admin_id = '33333333-3333-3333-3333-333333333333' WHERE id = '66666666-6666-6666-6666-666666666666';
UPDATE organizations SET admin_id = '44444444-4444-4444-4444-444444444444' WHERE id = '77777777-7777-7777-7777-777777777777';
UPDATE organizations SET admin_id = '55555555-5555-5555-5555-555555555555' WHERE id = '88888888-8888-8888-8888-888888888888';

-- Insert more surveys
INSERT INTO surveys (id, organization_id, created_by, title, description, domain, status, ai_generated, target_responses) VALUES
('77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Rural Infrastructure Assessment', 'Evaluation of road, electricity, and communication infrastructure in rural areas', 'infrastructure', 'active', true, 2000),
('88888888-8888-8888-8888-888888888888', '55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'Community Health Survey', 'Assessment of health facilities and disease prevention in communities', 'health', 'draft', true, 1500),
('99999999-9999-9999-9999-999999999999', '66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'Digital Literacy Survey', 'Evaluation of technology adoption and digital skills', 'technology', 'active', true, 800),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab', '77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', 'Crop Yield Analysis', 'Assessment of farming practices and agricultural productivity', 'agriculture', 'active', true, 1200),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '88888888-8888-8888-8888-888888888888', '55555555-5555-5555-5555-555555555555', 'Urban Development Survey', 'City planning and infrastructure development assessment', 'urban', 'paused', true, 600);

-- Insert more survey questions for Rural Infrastructure Assessment
INSERT INTO survey_questions (survey_id, question_text, question_type, options, is_required, order_index, ai_generated) VALUES
('77777777-7777-7777-7777-777777777777', 'How would you rate the condition of roads in your area?', 'rating', '{"min": 1, "max": 5, "labels": ["Very Poor", "Poor", "Average", "Good", "Excellent"]}', true, 1, true),
('77777777-7777-7777-7777-777777777777', 'How many hours of electricity do you receive per day?', 'number', '{"min": 0, "max": 24, "unit": "hours"}', true, 2, true),
('77777777-7777-7777-7777-777777777777', 'What type of internet connectivity is available?', 'multiple_choice', '["No internet", "2G mobile", "3G mobile", "4G mobile", "Broadband", "Fiber optic"]', true, 3, true),
('77777777-7777-7777-7777-777777777777', 'What are the main infrastructure challenges?', 'multiple_choice', '["Poor roads", "Irregular electricity", "No internet", "Water shortage", "Poor drainage", "Lack of public transport"]', true, 4, true);

-- Insert more survey questions for Digital Literacy Survey
INSERT INTO survey_questions (survey_id, question_text, question_type, options, is_required, order_index, ai_generated) VALUES
('99999999-9999-9999-9999-999999999999', 'Do you own a smartphone?', 'single_choice', '["Yes", "No", "Shared with family"]', true, 1, true),
('99999999-9999-9999-9999-999999999999', 'How comfortable are you with using digital payment apps?', 'rating', '{"min": 1, "max": 5, "labels": ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]}', true, 2, true),
('99999999-9999-9999-9999-999999999999', 'Which digital services do you use regularly?', 'multiple_choice', '["Online banking", "Digital payments", "E-commerce", "Government services", "Social media", "Video calls", "None"]', true, 3, true),
('99999999-9999-9999-9999-999999999999', 'What prevents you from using more digital services?', 'multiple_choice', '["Lack of knowledge", "Language barriers", "Security concerns", "Poor internet", "High costs", "No need"]', false, 4, true);

-- Insert survey assignments
INSERT INTO survey_assignments (survey_id, conductor_id, assigned_by, target_count) VALUES
('77777777-7777-7777-7777-777777777777', '66666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 200),
('77777777-7777-7777-7777-777777777777', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 150),
('99999999-9999-9999-9999-999999999999', '88888888-8888-8888-8888-888888888888', '33333333-3333-3333-3333-333333333333', 100),
('99999999-9999-9999-9999-999999999999', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 80),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab', '99999999-9999-9999-9999-999999999999', '44444444-4444-4444-4444-444444444444', 120);

-- Insert sample survey responses with duplicate patterns for risk detection
INSERT INTO survey_responses (id, survey_id, conductor_id, respondent_info, location, device_info, ip_address, submission_method, risk_score, risk_level, risk_flags, submitted_at) VALUES
-- Normal responses
('r0000001-0001-0001-0001-000000000001', '44444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '{"name": "Ram Singh", "age": 35, "gender": "male"}', ST_GeogFromText('POINT(77.2090 28.6139)'), '{"browser": "Chrome", "os": "Android", "device": "mobile"}', '192.168.1.100', 'web', 0.15, 'low', '[]', NOW() - INTERVAL '2 days'),
('r0000002-0002-0002-0002-000000000002', '44444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '{"name": "Sita Devi", "age": 28, "gender": "female"}', ST_GeogFromText('POINT(77.2100 28.6149)'), '{"browser": "Chrome", "os": "Android", "device": "mobile"}', '192.168.1.101', 'web', 0.12, 'low', '[]', NOW() - INTERVAL '2 days'),

-- Duplicate responses (same device, different times)
('r0000003-0003-0003-0003-000000000003', '44444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '{"name": "Mohan Kumar", "age": 42, "gender": "male"}', ST_GeogFromText('POINT(77.2110 28.6159)'), '{"browser": "Chrome", "os": "Android", "device": "mobile", "fingerprint": "fp123456"}', '192.168.1.102', 'web', 0.75, 'high', '["duplicate_device"]', NOW() - INTERVAL '1 day'),
('r0000004-0004-0004-0004-000000000004', '44444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '{"name": "Raj Patel", "age": 38, "gender": "male"}', ST_GeogFromText('POINT(77.2120 28.6169)'), '{"browser": "Chrome", "os": "Android", "device": "mobile", "fingerprint": "fp123456"}', '192.168.1.102', 'web', 0.85, 'high', '["duplicate_device", "same_ip"]', NOW() - INTERVAL '1 day'),

-- Location mismatch responses
('r0000005-0005-0005-0005-000000000005', '55555555-5555-5555-5555-555555555555', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '{"name": "Geeta Sharma", "age": 31, "gender": "female", "claimed_location": "Mumbai"}', ST_GeogFromText('POINT(77.2130 28.6179)'), '{"browser": "Firefox", "os": "iOS", "device": "mobile"}', '203.192.1.50', 'web', 0.65, 'medium', '["location_mismatch"]', NOW() - INTERVAL '1 day'),

-- Rapid submissions (suspicious timing)
('r0000006-0006-0006-0006-000000000006', '55555555-5555-5555-5555-555555555555', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '{"name": "Amit Joshi", "age": 29, "gender": "male"}', ST_GeogFromText('POINT(77.2140 28.6189)'), '{"browser": "Chrome", "os": "Windows", "device": "desktop"}', '203.192.1.51', 'web', 0.55, 'medium', '["rapid_submission"]', NOW() - INTERVAL '5 minutes'),
('r0000007-0007-0007-0007-000000000007', '55555555-5555-5555-5555-555555555555', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '{"name": "Pooja Singh", "age": 26, "gender": "female"}', ST_GeogFromText('POINT(77.2150 28.6199)'), '{"browser": "Chrome", "os": "Windows", "device": "desktop"}', '203.192.1.51', 'web', 0.60, 'medium', '["rapid_submission"]', NOW() - INTERVAL '3 minutes'),

-- More normal responses for different surveys
('r0000008-0008-0008-0008-000000000008', '77777777-7777-7777-7777-777777777777', '66666666-6666-6666-6666-666666666666', '{"name": "Krishna Das", "age": 45, "gender": "male"}', ST_GeogFromText('POINT(77.2160 28.6209)'), '{"browser": "Chrome", "os": "Android", "device": "mobile"}', '192.168.2.100', 'web', 0.10, 'low', '[]', NOW() - INTERVAL '3 hours'),
('r0000009-0009-0009-0009-000000000009', '99999999-9999-9999-9999-999999999999', '88888888-8888-8888-8888-888888888888', '{"name": "Lakshmi Patel", "age": 33, "gender": "female"}', ST_GeogFromText('POINT(77.2170 28.6219)'), '{"browser": "Safari", "os": "iOS", "device": "mobile"}', '192.168.3.100', 'web', 0.08, 'low', '[]', NOW() - INTERVAL '1 hour');

-- Insert corresponding survey answers
INSERT INTO survey_answers (response_id, question_id, answer_text, answer_number, answer_choices) VALUES
-- Answers for health survey responses
('r0000001-0001-0001-0001-000000000001', (SELECT id FROM survey_questions WHERE survey_id = '44444444-4444-4444-4444-444444444444' AND order_index = 1), NULL, NULL, '["1-5 km"]'),
('r0000001-0001-0001-0001-000000000001', (SELECT id FROM survey_questions WHERE survey_id = '44444444-4444-4444-4444-444444444444' AND order_index = 2), NULL, 4, NULL),
('r0000001-0001-0001-0001-000000000001', (SELECT id FROM survey_questions WHERE survey_id = '44444444-4444-4444-4444-444444444444' AND order_index = 3), NULL, NULL, '["Lack of doctors", "High costs"]'),

('r0000002-0002-0002-0002-000000000002', (SELECT id FROM survey_questions WHERE survey_id = '44444444-4444-4444-4444-444444444444' AND order_index = 1), NULL, NULL, '["Less than 1 km"]'),
('r0000002-0002-0002-0002-000000000002', (SELECT id FROM survey_questions WHERE survey_id = '44444444-4444-4444-4444-444444444444' AND order_index = 2), NULL, 3, NULL),
('r0000002-0002-0002-0002-000000000002', (SELECT id FROM survey_questions WHERE survey_id = '44444444-4444-4444-4444-444444444444' AND order_index = 3), NULL, NULL, '["Poor infrastructure"]');

-- Insert risk detection logs
INSERT INTO risk_logs (response_id, conductor_id, risk_type, risk_level, description, metadata, detected_at) VALUES
('r0000003-0003-0003-0003-000000000003', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'duplicate_device', 'high', 'Same device fingerprint detected for multiple responses', '{"fingerprint": "fp123456", "previous_response": "r0000004-0004-0004-0004-000000000004"}', NOW() - INTERVAL '1 day'),
('r0000004-0004-0004-0004-000000000004', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'duplicate_device', 'high', 'Same device fingerprint and IP address', '{"fingerprint": "fp123456", "ip": "192.168.1.102"}', NOW() - INTERVAL '1 day'),
('r0000005-0005-0005-0005-000000000005', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'location_mismatch', 'medium', 'GPS location does not match claimed location', '{"claimed": "Mumbai", "actual": "Delhi"}', NOW() - INTERVAL '1 day'),
('r0000006-0006-0006-0006-000000000006', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'rapid_submission', 'medium', 'Multiple surveys submitted in short time frame', '{"time_between_submissions": "2 minutes"}', NOW() - INTERVAL '5 minutes'),
('r0000007-0007-0007-0007-000000000007', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'rapid_submission', 'medium', 'Consecutive rapid submissions detected', '{"submission_pattern": "suspicious"}', NOW() - INTERVAL '3 minutes');

-- Insert audit logs
INSERT INTO audit_logs (user_id, action, resource_type, resource_id, old_values, new_values, ip_address, user_agent, created_at) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'CREATE_SURVEY', 'survey', '44444444-4444-4444-4444-444444444444', NULL, '{"title": "Rural Health Access Survey", "status": "draft"}', '192.168.1.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '3 days'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'UPDATE_SURVEY', 'survey', '44444444-4444-4444-4444-444444444444', '{"status": "draft"}', '{"status": "active"}', '192.168.1.50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', NOW() - INTERVAL '2 days'),
('00000000-0000-0000-0000-000000000001', 'APPROVE_ORGANIZATION', 'organization', '11111111-1111-1111-1111-111111111111', '{"status": "pending"}', '{"status": "active"}', '10.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', NOW() - INTERVAL '5 days'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'SUBMIT_RESPONSE', 'survey_response', 'r0000001-0001-0001-0001-000000000001', NULL, '{"survey_id": "44444444-4444-4444-4444-444444444444"}', '192.168.1.100', 'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36', NOW() - INTERVAL '2 days');

-- Insert offline sync queue items
INSERT INTO offline_sync_queue (user_id, data_type, data, sync_status, retry_count, created_at) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'survey_response', '{"survey_id": "44444444-4444-4444-4444-444444444444", "responses": [{"question_id": "q1", "answer": "test"}]}', 'pending', 0, NOW() - INTERVAL '1 hour'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'location_update', '{"lat": 28.6139, "lng": 77.2090, "timestamp": "2025-01-10T10:00:00Z"}', 'failed', 2, NOW() - INTERVAL '30 minutes'),
('66666666-6666-6666-6666-666666666666', 'survey_response', '{"survey_id": "77777777-7777-7777-7777-777777777777", "responses": [{"question_id": "q2", "answer": "infrastructure"}]}', 'synced', 0, NOW() - INTERVAL '2 hours');

-- Insert sample documents for AI processing
INSERT INTO documents (id, organization_id, uploaded_by, filename, file_path, file_size, mime_type, content_text, ai_analysis, domain, processed_at) VALUES
('doc00001-0001-0001-0001-000000000001', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'health_policy_2024.pdf', '/uploads/health_policy_2024.pdf', 2048576, 'application/pdf', 
'Healthcare Policy Document 2024: This document outlines the comprehensive healthcare policy for rural and urban areas. Key focus areas include: 1) Improving access to primary healthcare facilities, 2) Enhancing quality of medical services, 3) Reducing healthcare costs for economically disadvantaged populations, 4) Implementing telemedicine solutions for remote areas, 5) Training and deployment of healthcare workers in underserved regions.',
'{"domain": "health", "key_topics": ["healthcare access", "medical services", "telemedicine", "rural health"], "suggested_questions": ["Distance to nearest healthcare facility", "Quality of medical services", "Healthcare costs", "Telemedicine usage"], "gaps_identified": ["Mental health services", "Emergency response times", "Specialist availability"]}',
'health', NOW() - INTERVAL '1 day'),

('doc00002-0002-0002-0002-000000000002', '22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'education_assessment.docx', '/uploads/education_assessment.docx', 1536000, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
'Education Assessment Framework: This framework is designed to evaluate literacy rates, educational infrastructure, and learning outcomes across different demographics. Assessment areas include: 1) Basic literacy and numeracy skills, 2) Access to educational institutions, 3) Quality of teaching staff, 4) Availability of learning materials, 5) Technology integration in education, 6) Dropout rates and retention strategies.',
'{"domain": "education", "key_topics": ["literacy assessment", "educational infrastructure", "learning outcomes", "technology integration"], "suggested_questions": ["Highest education level", "Reading and writing ability", "School accessibility", "Digital learning tools usage"], "gaps_identified": ["Vocational training", "Adult education programs", "Special needs education"]}',
'education', NOW() - INTERVAL '2 days'),

('doc00003-0003-0003-0003-000000000003', '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'rural_infrastructure_plan.txt', '/uploads/rural_infrastructure_plan.txt', 512000, 'text/plain',
'Rural Infrastructure Development Plan: Comprehensive strategy for improving rural infrastructure including roads, electricity, water supply, and telecommunications. Priority areas: 1) All-weather road connectivity to villages, 2) Reliable electricity supply for 24 hours, 3) Clean drinking water access, 4) High-speed internet connectivity, 5) Public transportation systems, 6) Waste management facilities, 7) Healthcare and education infrastructure.',
'{"domain": "infrastructure", "key_topics": ["road connectivity", "electricity supply", "water access", "internet connectivity", "public transport"], "suggested_questions": ["Road condition assessment", "Daily electricity hours", "Water source type", "Internet availability", "Transportation access"], "gaps_identified": ["Renewable energy adoption", "Smart infrastructure", "Disaster resilience"]}',
'infrastructure', NOW() - INTERVAL '3 days');
