-- Insert sample super admin
INSERT INTO profiles (id, email, full_name, role, status) VALUES
('00000000-0000-0000-0000-000000000001', 'admin@smartsurvey.com', 'Super Admin', 'super_admin', 'active');

-- Insert sample organizations
INSERT INTO organizations (id, name, description, admin_id, status) VALUES
('11111111-1111-1111-1111-111111111111', 'Health Ministry', 'Government health department surveys', NULL, 'active'),
('22222222-2222-2222-2222-222222222222', 'Education Board', 'Educational assessment and literacy surveys', NULL, 'active'),
('33333333-3333-3333-3333-333333333333', 'Water Resources Dept', 'Water quality and access surveys', NULL, 'active');

-- Insert sample organization admins
INSERT INTO profiles (id, email, full_name, phone, organization, role, status) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'health.admin@gov.in', 'Dr. Priya Sharma', '+919876543210', 'Health Ministry', 'org_admin', 'active'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'edu.admin@gov.in', 'Prof. Rajesh Kumar', '+919876543211', 'Education Board', 'org_admin', 'active'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'water.admin@gov.in', 'Eng. Sunita Patel', '+919876543212', 'Water Resources Dept', 'org_admin', 'active');

-- Insert sample conductors
INSERT INTO profiles (id, email, full_name, phone, organization, role, status) VALUES
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'conductor1@field.com', 'Amit Singh', '+919876543213', 'Health Ministry', 'conductor', 'active'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'conductor2@field.com', 'Meera Joshi', '+919876543214', 'Education Board', 'conductor', 'active'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'conductor3@field.com', 'Ravi Gupta', '+919876543215', 'Water Resources Dept', 'conductor', 'active');

-- Update organization admin references
UPDATE organizations SET admin_i  'conductor', 'active');

-- Update organization admin references
UPDATE organizations SET admin_id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' WHERE id = '11111111-1111-1111-1111-111111111111';
UPDATE organizations SET admin_id = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' WHERE id = '22222222-2222-2222-2222-222222222222';
UPDATE organizations SET admin_id = 'cccccccc-cccc-cccc-cccc-cccccccccccc' WHERE id = '33333333-3333-3333-3333-333333333333';

-- Insert sample surveys
INSERT INTO surveys (id, organization_id, created_by, title, description, domain, status, ai_generated, target_responses) VALUES
('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Rural Health Access Survey', 'Assessment of healthcare accessibility in rural areas', 'health', 'active', true, 1000),
('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Literacy Assessment Survey', 'Evaluation of literacy rates and educational needs', 'education', 'active', true, 500),
('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Water Quality Survey', 'Assessment of water quality and access in communities', 'water', 'draft', true, 750);

-- Insert sample survey questions
INSERT INTO survey_questions (survey_id, question_text, question_type, options, is_required, order_index, ai_generated) VALUES
-- Health Survey Questions
('44444444-4444-4444-4444-444444444444', 'What is the distance to the nearest healthcare facility?', 'single_choice', '["Less than 1 km", "1-5 km", "5-10 km", "More than 10 km"]', true, 1, true),
('44444444-4444-4444-4444-444444444444', 'How would you rate the quality of healthcare services?', 'rating', '{"min": 1, "max": 5, "labels": ["Very Poor", "Poor", "Average", "Good", "Excellent"]}', true, 2, true),
('44444444-4444-4444-4444-444444444444', 'What are the main health challenges in your area?', 'multiple_choice', '["Lack of doctors", "No medicines", "Poor infrastructure", "High costs", "Transportation issues"]', true, 3, true),

-- Education Survey Questions
('55555555-5555-5555-5555-555555555555', 'What is your highest level of education?', 'single_choice', '["No formal education", "Primary", "Secondary", "Higher Secondary", "Graduate", "Post Graduate"]', true, 1, true),
('55555555-5555-5555-5555-555555555555', 'Can you read and write in your local language?', 'single_choice', '["Yes, fluently", "Yes, with difficulty", "Only read", "Only write", "No"]', true, 2, true),
('55555555-5555-5555-5555-555555555555', 'What are the barriers to education in your community?', 'multiple_choice', '["Financial constraints", "Lack of schools", "Poor infrastructure", "Cultural barriers", "Child labor"]', true, 3, true),

-- Water Survey Questions
('66666666-6666-6666-6666-666666666666', 'What is your primary source of drinking water?', 'single_choice', '["Tap water", "Well water", "Borewell", "River/Stream", "Tanker supply", "Bottled water"]', true, 1, true),
('66666666-6666-6666-6666-666666666666', 'How many hours per day is water available?', 'number', '{"min": 0, "max": 24, "unit": "hours"}', true, 2, true),
('66666666-6666-6666-6666-666666666666', 'Have you experienced water-related health issues?', 'single_choice', '["Never", "Rarely", "Sometimes", "Often", "Always"]', true, 3, true);

-- Insert survey assignments
INSERT INTO survey_assignments (survey_id, conductor_id, assigned_by, target_count) VALUES
('44444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 100),
('55555555-5555-5555-5555-555555555555', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 50),
('66666666-6666-6666-6666-666666666666', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 75);
