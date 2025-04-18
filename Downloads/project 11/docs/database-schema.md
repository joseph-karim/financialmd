# Database Schema

This document outlines the database schema for the Primary Care Financial Masterclass re-architecture. We'll be using Supabase PostgreSQL for all data storage.

## Existing Tables

The application currently appears to have tables for:
- Users
- Profiles
- Subscriptions
- Progress tracking

These tables will be retained and enhanced as needed.

## New Tables

### Codes Table

Stores all medical billing codes with their descriptions and RVU values.

```sql
CREATE TABLE codes (
  code TEXT PRIMARY KEY,
  description_short TEXT,
  description_long TEXT,
  type TEXT, -- CPT, G-code, ICD-10, HCPCS
  national_wrvu NUMERIC,
  national_pe_rvu NUMERIC,
  national_mp_rvu NUMERIC,
  global_period INT,
  requires_modifier BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster searches
CREATE INDEX idx_codes_type ON codes(type);
CREATE INDEX idx_codes_description ON codes(description_short);
```

### Modifiers Table

Stores billing modifiers with descriptions and usage guidelines.

```sql
CREATE TABLE modifiers (
  modifier TEXT PRIMARY KEY,
  description TEXT,
  usage_guidelines TEXT,
  examples TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Glossary Terms Table

Stores medical billing and coding terminology with definitions.

```sql
CREATE TABLE glossary_terms (
  term TEXT PRIMARY KEY,
  definition TEXT,
  module_links JSONB, -- Links to relevant modules
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for text search
CREATE INDEX idx_glossary_term_search ON glossary_terms USING GIN (to_tsvector('english', term || ' ' || definition));
```

### HCC Mappings Table

Maps ICD-10 codes to Hierarchical Condition Categories.

```sql
CREATE TABLE hcc_mappings (
  icd10_code TEXT,
  hcc_category TEXT,
  hcc_description TEXT,
  year INT,
  risk_score NUMERIC,
  PRIMARY KEY (icd10_code, year),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Smart Phrases Table

Stores reusable documentation templates for common scenarios.

```sql
CREATE TABLE smart_phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario TEXT,
  phrase_name TEXT,
  phrase_text TEXT,
  related_codes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for searching phrases
CREATE INDEX idx_smart_phrases_scenario ON smart_phrases(scenario);
```

### Interactive Checklists Table

Stores checklists for various clinical workflows.

```sql
CREATE TABLE checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  checklist_type TEXT NOT NULL, -- AWV, G2211, MDM, etc.
  items JSONB NOT NULL, -- Array of checklist items with text and optional details
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Calculators Table

Stores configuration for financial/RVU calculators.

```sql
CREATE TABLE calculators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  calculator_type TEXT NOT NULL, -- AWV-Revenue, MDM-Level, etc.
  inputs JSONB NOT NULL, -- Configuration for calculator inputs
  formula JSONB NOT NULL, -- Logic for calculation
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Data Population Strategy

1. **Phase 1 (MVP):** 
   - Manually curate and insert foundational data into the tables
   - Source from reliable public data (CMS Physician Fee Schedule) and existing course content
   - Focus on codes most relevant to core modules (E/M, common G-codes, essential modifiers)

2. **Phase 2:**
   - Expand database coverage (more codes, ICD-10, HCC mappings)
   - Add more smart phrases and checklist items based on user feedback

3. **Future:**
   - Consider integrating external APIs for real-time data
   - Implement automated updates for annual code changes

## Migration Plan

1. Create SQL migration files in `supabase/migrations/` for each new table
2. Test migrations in a development environment
3. Apply migrations to production after thorough testing
4. Populate tables with initial data
5. Verify data integrity and performance
