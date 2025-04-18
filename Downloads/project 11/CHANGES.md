# Medical Billing & Coding Re-Architecture Changes

## Overview

This document summarizes the changes made to re-architect the Medical Billing & Coding application based on detailed research on medical billing and coding strategies for primary care.

## Database Changes

### New Tables Created

1. **workflow_tips**
   - Stores practical tips for optimizing clinical workflows
   - Contains 20+ initial tips based on research

2. **documentation_examples**
   - Stores example documentation for various clinical scenarios
   - Contains 10+ initial examples for different scenarios

3. **smart_phrases**
   - Stores reusable documentation snippets for common scenarios
   - Contains 10+ initial smart phrases for different documentation needs

4. **checklists**
   - Stores interactive checklists for various workflows
   - Contains 4 initial checklists (AWV, Modifier 25, Pre-Visit Planning, MDM)

5. **checklist_items**
   - Stores individual items within checklists
   - Contains 40+ initial checklist items

### Updates to Existing Tables

1. **codes**
   - Added fields: ncci_pairs, guideline_source
   - Added additional preventive service codes

## New Components

### Tool Components

1. **ModifierHelper**
   - Decision support tool for Modifier 25 usage

2. **AWVChecklist**
   - Interactive checklist for Medicare Annual Wellness Visits

3. **MDMLevelCalculator**
   - Tool to estimate appropriate E/M level based on MDM

4. **SmartPhraseLibrary**
   - Library of reusable documentation snippets

5. **AWVRevenueCalculator**
   - Calculator for estimating AWV revenue potential

6. **ChecklistLibrary**
   - Collection of interactive checklists

7. **CodeLookup**
   - Tool for looking up code details and requirements

8. **AIScribeAssist** (placeholder)
   - AI-powered documentation assistant

9. **NoteAnalyzer** (placeholder)
   - Tool to analyze clinical notes for coding opportunities

10. **PreVisitPlanningChecklist** (placeholder)
    - Detailed checklist for pre-visit planning

### Page Components

1. **ModulesIndex**
   - New modules index page

2. **ModuleSlugIndex**
   - Module detail page

3. **ModuleSectionPage**
   - Module section page with tools

4. **LegacyModuleRedirect**
   - Redirect from old module structure to new

## Module Structure

The application now features six main modules, each with multiple sections:

1. **Practice Efficiency**
2. **AWV & Preventive Services**
3. **E/M Coding Mastery**
4. **Chronic Care & Risk Adjustment**
5. **Special Services & Add-on Codes**
6. **Tools & Resources**

## Navigation Updates

1. **Sidebar**
   - Updated to include new module structure
   - Added new icons for modules

2. **Dashboard**
   - Updated to showcase new modules and tools

## Documentation

1. **README.md**
   - Overview of the re-architecture

2. **ARCHITECTURE.md**
   - Detailed documentation of the new architecture

3. **CHANGES.md**
   - Summary of changes made

## Legacy Support

1. **Module Redirects**
   - Created redirects from old module paths to new structure

2. **Backward Compatibility**
   - Maintained backward compatibility with previous module structure
   - Kept legacy module data for reference

## Next Steps

1. **Content Development**
   - Develop content for each module section

2. **Tool Refinement**
   - Refine and enhance interactive tools

3. **AI Integration**
   - Implement AI-powered documentation tools

4. **User Testing**
   - Test the new structure with users
