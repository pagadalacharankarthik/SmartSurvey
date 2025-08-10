-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Create enum types
CREATE TYPE user_role AS ENUM ('super_admin', 'org_admin', 'conductor');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'pending', 'suspended');
CREATE TYPE survey_status AS ENUM ('draft', 'active', 'paused', 'completed');
CREATE TYPE question_type AS ENUM ('text', 'number', 'single_choice', 'multiple_choice', 'rating', 'date', 'location');
CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    organization VARCHAR(255),
    role user_role NOT NULL DEFAULT 'conductor',
    status user_status NOT NULL DEFAULT 'pending',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizations table
CREATE TABLE organizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status user_status NOT NULL DEFAULT 'pending',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table for AI processing
CREATE TABLE documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    uploaded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    filename VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    content_text TEXT,
    ai_analysis JSONB,
    domain VARCHAR(100),
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Surveys table
CREATE TABLE surveys (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    domain VARCHAR(100),
    status survey_status NOT NULL DEFAULT 'draft',
    settings JSONB DEFAULT '{}',
    ai_generated BOOLEAN DEFAULT FALSE,
    target_responses INTEGER,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Survey questions table
CREATE TABLE survey_questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    survey_id UUID REFERENCES surveys(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type question_type NOT NULL,
    options JSONB, -- For choice questions
    validation_rules JSONB,
    is_required BOOLEAN DEFAULT TRUE,
    order_index INTEGER NOT NULL,
    ai_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Survey assignments table
CREATE TABLE survey_assignments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    survey_id UUID REFERENCES surveys(id) ON DELETE CASCADE,
    conductor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    target_count INTEGER,
    completed_count INTEGER DEFAULT 0,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(survey_id, conductor_id)
);

-- Survey responses table
CREATE TABLE survey_responses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    survey_id UUID REFERENCES surveys(id) ON DELETE CASCADE,
    conductor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    respondent_info JSONB,
    location GEOGRAPHY(POINT, 4326),
    device_info JSONB,
    ip_address INET,
    submission_method VARCHAR(50), -- web, sms, whatsapp, voice
    is_offline_sync BOOLEAN DEFAULT FALSE,
    risk_score DECIMAL(3,2) DEFAULT 0.00,
    risk_level risk_level DEFAULT 'low',
    risk_flags JSONB DEFAULT '[]',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    synced_at TIMESTAMP WITH TIME ZONE
);

-- Survey answers table
CREATE TABLE survey_answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    response_id UUID REFERENCES survey_responses(id) ON DELETE CASCADE,
    question_id UUID REFERENCES survey_questions(id) ON DELETE CASCADE,
    answer_text TEXT,
    answer_number DECIMAL,
    answer_date DATE,
    answer_location GEOGRAPHY(POINT, 4326),
    answer_choices JSONB, -- For multiple choice
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Risk detection logs
CREATE TABLE risk_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    response_id UUID REFERENCES survey_responses(id) ON DELETE CASCADE,
    conductor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    risk_type VARCHAR(100) NOT NULL,
    risk_level risk_level NOT NULL,
    description TEXT,
    metadata JSONB,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100),
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Offline sync queue
CREATE TABLE offline_sync_queue (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    data_type VARCHAR(100) NOT NULL,
    data JSONB NOT NULL,
    sync_status VARCHAR(50) DEFAULT 'pending',
    retry_count INTEGER DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    synced_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_surveys_organization ON surveys(organization_id);
CREATE INDEX idx_surveys_status ON surveys(status);
CREATE INDEX idx_survey_responses_survey ON survey_responses(survey_id);
CREATE INDEX idx_survey_responses_conductor ON survey_responses(conductor_id);
CREATE INDEX idx_survey_responses_location ON survey_responses USING GIST(location);
CREATE INDEX idx_survey_responses_risk ON survey_responses(risk_level);
CREATE INDEX idx_survey_responses_submitted ON survey_responses(submitted_at);
CREATE INDEX idx_risk_logs_conductor ON risk_logs(conductor_id);
CREATE INDEX idx_risk_logs_detected ON risk_logs(detected_at);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Super admins can view all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Organizations policies
CREATE POLICY "Organization admins can view their organization" ON organizations
    FOR SELECT USING (
        admin_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Surveys policies
CREATE POLICY "Users can view surveys they have access to" ON surveys
    FOR SELECT USING (
        created_by = auth.uid() OR
        EXISTS (
            SELECT 1 FROM survey_assignments 
            WHERE survey_id = surveys.id AND conductor_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'super_admin'
        )
    );

-- Survey responses policies
CREATE POLICY "Conductors can view their responses" ON survey_responses
    FOR SELECT USING (conductor_id = auth.uid());

CREATE POLICY "Conductors can insert responses" ON survey_responses
    FOR INSERT WITH CHECK (conductor_id = auth.uid());

-- Functions for triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_surveys_updated_at BEFORE UPDATE ON surveys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
