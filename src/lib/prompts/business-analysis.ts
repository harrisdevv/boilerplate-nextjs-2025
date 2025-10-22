export function generateSWOTPrompt(businessDocumentText: string, companyName: string, industry: string): string {
  return `You are a business strategy consultant analyzing a company's comprehensive business document. Based on the following business information, provide a detailed SWOT analysis.

Company: ${companyName}
Industry: ${industry}

Business Document Analysis:
${businessDocumentText}

Please provide a comprehensive SWOT analysis with the following structure:

## SWOT Analysis

### Strengths (Internal Advantages)
List 5-7 key strengths based on the business document. Focus on:
- Core competencies and capabilities
- Unique resources and advantages
- Market position and brand recognition
- Team expertise and experience
- Technology and processes
- Financial position
- Customer relationships

### Weaknesses (Internal Limitations)
List 4-6 areas for improvement. Be constructive and specific:
- Resource constraints
- Skills or capability gaps
- Process inefficiencies
- Market limitations
- Technology shortcomings
- Organizational challenges

### Opportunities (External Factors)
List 5-7 external opportunities the business can leverage:
- Market trends and growth areas
- Technological advancements
- Regulatory changes
- Competitor weaknesses
- New customer segments
- Strategic partnerships
- Industry shifts

### Threats (External Challenges)
List 4-6 external threats to monitor and address:
- Competitive pressures
- Market risks
- Economic factors
- Regulatory challenges
- Technological disruption
- Customer behavior changes

### Strategic Insights
Provide 3-4 key strategic insights based on this SWOT analysis that could inform business decisions.

### Action Recommendations
List 5-7 specific, actionable recommendations based on the SWOT analysis. Each recommendation should:
- Address a specific SWOT element
- Be practical and implementable
- Have clear business impact
- Include potential next steps

Please ensure the analysis is thorough, specific to this business, and provides genuine strategic value.`
}

export function generateUSPPrompt(businessDocumentText: string, companyName: string, industry: string): string {
  return `You are a marketing strategist and brand positioning expert. Based on the following business information, develop compelling Unique Selling Propositions (USPs) for this company.

Company: ${companyName}
Industry: ${industry}

Business Document Analysis:
${businessDocumentText}

Please create comprehensive USP options following this structure:

## Target Market Analysis
Identify and describe the primary target audience based on the business information:
- Demographics and psychographics
- Key pain points and needs
- Decision-making factors
- Current alternatives they consider

## Problem-Solution Analysis
Clearly articulate:
- The specific problems the business solves
- How these problems impact customers
- The unique way the business approaches these solutions
- What makes this approach different from competitors

## USP Options
Generate 3-5 distinct USP options, each with:

### Option [X]
**USP Statement:** [A clear, compelling statement 10-25 words long]

**Why it works:**
- Addresses specific customer need
- Highlights unique differentiation
- Clear and memorable
- Authentic to the brand

**Target Audience:** [Who this USP appeals to most]
**Market Position:** [How this positions the company]
**Competitive Advantage:** [What makes it unique]

## USP Testing & Validation
For each USP option, evaluate:
- **Clarity Score (1-10):** How clear and understandable
- **Differentiation Score (1-10):** How unique from competitors
- **Relevance Score (1-10):** How relevant to target market
- **Credibility Score (1-10):** How believable and authentic
- **Memorability Score (1-10):** How easy to remember
- **Overall Score:** Average of all scores

## Recommended USP
Based on the analysis, recommend the strongest USP and explain why it's the best choice for this business.

## Implementation Guidance
Provide specific guidance on:
- How to integrate this USP into marketing materials
- Where to use this USP (website, social media, sales materials)
- How to ensure consistency across all touchpoints
- How to test and refine the USP over time

Focus on creating USPs that are authentic, compelling, and commercially valuable.`
}

export function generateBusinessProfilePrompt(businessDocumentText: string, companyName: string, industry: string): string {
  return `You are a brand strategist and business analyst. Based on the comprehensive business document provided, create a detailed business profile that captures the essence of this company.

Company: ${companyName}
Industry: ${industry}

Business Document Analysis:
${businessDocumentText}

Please create a comprehensive business profile following this structure:

## Business Overview
**Company Summary:** [2-3 sentence elevator pitch]
**Mission Statement:** [Clear, inspiring mission]
**Vision Statement:** [Long-term aspiration]
**Core Values:** [3-5 key values with brief explanations]

## Target Audience Analysis
### Primary Target Market
**Demographics:**
- Age ranges, income levels, education
- Geographic locations
- Professional roles and experience
- Family status and lifestyle factors

**Psychographics:**
- Values and beliefs
- Interests and hobbies
- Pain points and challenges
- Goals and aspirations
- Decision-making patterns
- Media consumption habits

**Secondary Markets:**
[Identify 2-3 secondary market segments]

## Brand Personality & Voice
**Brand Archetype:** [Which of the 12 archetypes fits best]
**Brand Personality Traits:** [5-7 key personality characteristics]
**Brand Voice Guidelines:**
- Tone and style preferences
- Language and vocabulary
- Communication approach
- Emotional appeal strategies

## Competitive Landscape
**Market Position:**
- Premium, value, or mainstream positioning
- Niche focus or broad market approach
- Innovation level and adoption curve

**Key Differentiators:**
- What makes this business truly unique
- Sustainable competitive advantages
- Barriers to entry for competitors

**Competitive Advantages:**
- Technology or process advantages
- Team expertise or experience
- Customer relationships or loyalty
- Cost structure or efficiency
- Brand recognition or reputation

## Unique Value Proposition
**Core Value Proposition:** [Clear statement of unique value delivered]
**Proof Points:** [Specific evidence supporting the value proposition]
**Customer Benefits:** [Tangible and intangible benefits customers receive]

## Business Capabilities
**Core Competencies:** [What the business does exceptionally well]
**Key Resources:** [Critical resources that enable success]
**Strategic Assets:** [Valuable assets that create competitive advantage]

## Brand Guidelines
**Visual Identity Suggestions:**
- Color palette recommendations
- Typography style preferences
- Imagery and photography style
- Overall aesthetic direction

**Messaging Guidelines:**
- Key messaging pillars
- Storytelling angles
- Emotional appeal strategies
- Consistency requirements

## Strategic Recommendations
Based on the business profile analysis, provide:
1. **Brand Strengthening Opportunities**
2. **Market Expansion Possibilities**
3. **Communication Improvement Areas**
4. **Competitive Positioning Strategies**
5. **Customer Experience Enhancements**

Focus on creating a profile that is authentic, comprehensive, and strategically valuable for marketing and business development.`
}