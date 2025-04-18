# Medical Billing & Coding Re-Architecture Documentation

## Overview

This document outlines the comprehensive re-architecture of the Medical Billing & Coding application based on detailed research on medical billing and coding strategies for primary care. The new structure focuses on workflow-based modules, interactive tools, and practical documentation examples.

## Database Schema

### New Tables

1. **workflow_tips**
   - Stores practical tips for optimizing clinical workflows
   - Fields: id, module_slug, step_name, description, role, source, implementation_notes, created_at, updated_at

2. **documentation_examples**
   - Stores example documentation for various clinical scenarios
   - Fields: id, scenario, example_text, explanation, source, created_at, updated_at

3. **smart_phrases**
   - Stores reusable documentation snippets for common scenarios
   - Fields: id, phrase_name, content, scenario, related_codes, source_recommendation, created_at, updated_at

4. **checklists**
   - Stores interactive checklists for various workflows
   - Fields: id, title, description, checklist_type, source, created_at, updated_at

5. **checklist_items**
   - Stores individual items within checklists
   - Fields: id, checklist_id, item_text, required, order_index, explanation, created_at, updated_at

### Updates to Existing Tables

1. **codes**
   - Added fields: ncci_pairs, guideline_source
   - Enhanced with additional preventive service codes

2. **modifiers**
   - No structural changes, but data enhanced with more detailed usage guidelines and examples

## Module Structure

The application now features six main modules, each with multiple sections:

### 1. Practice Efficiency
- Introduction
- Pre-Visit Planning
- Team Documentation
- EMR Tools & Templates
- Delegation Strategies
- AI Documentation Assistance

### 2. AWV & Preventive Services
- Overview
- Workflow & Preparation
- Required Components
- Common Add-on Services
- Billing & Combining Services
- Tools & Resources

### 3. E/M Coding Mastery
- Overview
- MDM-Based Coding
- Time-Based Coding
- Modifier 25 Deep Dive
- Documentation Examples

### 4. Chronic Care & Risk Adjustment
- Overview
- HCC Coding Strategies
- Chronic Care Management
- G2211 Add-on Code
- Documentation Strategies

### 5. Special Services & Add-on Codes
- Overview
- Transitional Care Management
- Advance Care Planning
- Behavioral Health Integration
- Preventive Service Codes

### 6. Tools & Resources
- Code Lookup Tool
- Smart Phrase Library
- Interactive Checklists
- Revenue Calculators
- AI Documentation Tools

## Interactive Tools

### 1. ModifierHelper
- Decision support tool for Modifier 25 usage
- Helps determine if Modifier 25 is appropriate for a given scenario
- Provides examples and documentation tips

### 2. AWVChecklist
- Interactive checklist for Medicare Annual Wellness Visits
- Tracks required components for G0438/G0439
- Shows progress and billing readiness

### 3. MDMLevelCalculator
- Tool to estimate appropriate E/M level based on MDM
- Categorizes elements into moderate and high complexity
- Provides guidance on documentation requirements

### 4. SmartPhraseLibrary
- Library of reusable documentation snippets
- Organized by scenario (AWV, Modifier 25, Time-Based Coding, etc.)
- Includes related codes and source recommendations

### 5. AWVRevenueCalculator
- Calculator for estimating AWV revenue potential
- Includes options for add-on services (E/M, ACP, depression screening, etc.)
- Provides breakdown of potential revenue

### 6. ChecklistLibrary
- Collection of interactive checklists
- Includes AWV, Modifier 25, Pre-Visit Planning, and MDM Level checklists
- Centralized access to all checklists

### 7. CodeLookup
- Tool for looking up code details and requirements
- Provides information on RVUs, modifiers, and NCCI pairs
- Links to external resources

## Component Structure

### New Components

1. **Tool Components**
   - Located in `/src/components/tools/`
   - Each tool is a separate component
   - Index file exports all tools

2. **ToolComponentLoader**
   - Dynamic loader for tool components
   - Handles loading states and fallbacks
   - Located in `/src/components/ToolComponentLoader.tsx`

3. **Module Pages**
   - New module index page: `/src/pages/modules/index.tsx`
   - Module slug index page: `/src/pages/modules/[moduleSlug]/index.tsx`
   - Module section page: `/src/pages/modules/[moduleSlug]/[sectionSlug].tsx`
   - Legacy module redirect: `/src/pages/module/[moduleId].tsx`

### Updated Components

1. **Sidebar**
   - Updated to include new module structure
   - Added new icons for modules
   - Maintained backward compatibility

2. **App.tsx**
   - Added new routes for module pages
   - Updated legacy module route to redirect to new structure

## Data Structure

### Module Data

The module data is defined in `/src/lib/module-data.ts` and includes:

1. **Module Interface**
   - id: string
   - title: string
   - slug: string
   - description: string
   - icon: string
   - isPreview?: boolean
   - sections: Section[]

2. **Section Interface**
   - id: string
   - title: string
   - slug: string
   - content?: string
   - hasTools?: boolean
   - toolComponents?: string[]

3. **Helper Functions**
   - getModuleBySlug
   - getSectionBySlug
   - getModuleNavigation (legacy)
   - getModuleById (legacy)

## Migration Path

1. **Legacy Support**
   - Maintained backward compatibility with previous module structure
   - Created redirects from old module paths to new structure
   - Kept legacy module data for reference

2. **Data Migration**
   - Created migration files for new tables
   - Added initial data based on research
   - Updated existing tables with new fields and data

## Future Enhancements

1. **AI Documentation Tools**
   - AIScribeAssist: AI-powered documentation assistant
   - NoteAnalyzer: Tool to analyze clinical notes for coding opportunities

2. **Additional Interactive Tools**
   - PreVisitPlanningChecklist: Detailed checklist for pre-visit planning
   - More specialized checklists for different workflows

3. **Content Expansion**
   - Additional documentation examples
   - More smart phrases for different scenarios
   - Enhanced workflow tips based on user feedback

## Conclusion

This re-architecture provides a more comprehensive, workflow-based approach to medical billing and coding education for primary care providers. The new structure focuses on practical, interactive tools and organized content that aligns with real-world clinical workflows.
