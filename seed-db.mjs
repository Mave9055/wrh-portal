import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const sessionData = [
  { num: 0, title: "Welcome, Safety, and Why This Course Exists", arc: 1, goal: "Establish safety, explain program structure, and build the container for learning." },
  { num: 1, title: "The Mechanism", arc: 1, goal: "Show the pattern (high-functioning mask → Hum → Freeze → executive dysfunction → FTA loop)." },
  { num: 2, title: "The Blueprint", arc: 1, goal: "Map the nervous system architecture and explain how trauma gets encoded." },
  { num: 3, title: "The First Pattern Lock", arc: 1, goal: "Identify the first moment the pattern locks in and begins repeating." },
  { num: 4, title: "The Hum", arc: 1, goal: "Understand chronic activation and the baseline state of hypervigilance." },
  { num: 5, title: "The Mask", arc: 1, goal: "Recognize high-functioning dissociation and the performance of normalcy." },
  { num: 6, title: "The Crash", arc: 1, goal: "Understand the collapse phase and why it follows periods of high function." },
  { num: 7, title: "The Disappearing Act", arc: 1, goal: "Recognize dissociative shutdown and internal absence during overwhelm." },
  { num: 8, title: "The Loop", arc: 1, goal: "See the full cycle: activation → mask → crash → recovery → repeat." },
  { num: 9, title: "The Body Keeps Score", arc: 1, goal: "Understand somatic memory and how the body stores unprocessed trauma." },
  { num: 10, title: "The Threshold", arc: 1, goal: "Identify personal activation thresholds and early warning signs." },
  { num: 11, title: "Dissociation", arc: 2, goal: "Understand dissociation as a survival mechanism and its cost." },
  { num: 12, title: "The Ledger", arc: 2, goal: "Recognize how trauma creates internal accounting and debt narratives." },
  { num: 13, title: "The Debt", arc: 2, goal: "Understand the belief that one must repay or atone for survival." },
  { num: 14, title: "The Proof", arc: 2, goal: "Recognize the compulsion to prove worthiness through suffering or achievement." },
  { num: 15, title: "The Witness", arc: 2, goal: "Understand the need for external validation and the cost of invisibility." },
  { num: 16, title: "The Verdict", arc: 2, goal: "Recognize internalized judgment and the verdict one has rendered on oneself." },
  { num: 17, title: "The Sentence", arc: 2, goal: "Understand self-imposed punishment and the sentence one is serving." },
  { num: 18, title: "The Escape", arc: 2, goal: "Recognize avoidance mechanisms and the temporary relief they provide." },
  { num: 19, title: "The Return", arc: 2, goal: "Understand the inevitable return and why escape always fails." },
  { num: 20, title: "The Reckoning", arc: 2, goal: "Face the full weight of the pattern and the moment of choice." },
  { num: 21, title: "The Ghost Protocol", arc: 3, goal: "Introduce the first interrupt tool: recognizing when you are not present." },
  { num: 22, title: "The Pattern Interrupt", arc: 3, goal: "Learn the basic mechanism for stopping the automatic pattern." },
  { num: 23, title: "The Pattern Veto", arc: 3, goal: "Practice saying no to the pattern and reclaiming executive choice." },
  { num: 24, title: "The One-Second Veto", arc: 3, goal: "Master the rapid interrupt: the one-second pause that changes everything." },
  { num: 25, title: "The Crash Interrupt", arc: 3, goal: "Learn to interrupt the crash phase before it becomes a full shutdown." },
  { num: 26, title: "The Accountability Without Self-Destruction", arc: 3, goal: "Take responsibility without self-punishment or shame spirals." },
  { num: 27, title: "The Executive Function Restore", arc: 3, goal: "Rebuild the ability to plan, execute, and follow through." },
  { num: 28, title: "The Integrated System", arc: 3, goal: "Bring all tools together into a coherent, operational system." },
  { num: 29, title: "The Maintenance Protocol", arc: 3, goal: "Establish ongoing practices to prevent regression and maintain gains." },
  { num: 30, title: "The Graduation & Integration", arc: 3, goal: "Celebrate completion and prepare for post-program integration." },
];

const arcData = [
  { num: 1, title: "Arc 1: The Machine", description: "How It Gets Built Into You — Understanding the mechanisms of trauma encoding and the nervous system patterns that drive behavior." },
  { num: 2, title: "Arc 2: The Drivers", description: "What Keeps the Engine Running — Exploring the psychological and behavioral drivers that maintain the pattern and the beliefs that sustain it." },
  { num: 3, title: "Arc 3: The Interrupt & Restore", description: "How You Rewrite the Code — Learning concrete tools to interrupt patterns, restore executive function, and rebuild agency." },
];

const resourceData = [
  {
    type: "checklist",
    title: "Facilitator Readiness Checklist",
    content: `# Facilitator Readiness Checklist

## Pre-Session Preparation (30 minutes before)
- [ ] Room setup: chairs in circle, no barriers
- [ ] Temperature: comfortable (68-72°F)
- [ ] Lighting: bright, no harsh shadows
- [ ] Audio: test microphone/speakers if needed
- [ ] Materials: Plan B cards, confidentiality agreements printed
- [ ] Grounding tools: water, tissues, fidget items available
- [ ] Emergency contacts: posted and accessible
- [ ] Co-facilitator briefed on today's session and any known triggers

## Participant Materials
- [ ] Plan B Wallet Card (one per participant)
- [ ] Confidentiality Agreement (signed)
- [ ] Session notes/workbook (if applicable)
- [ ] Contact info for crisis resources

## Safety Protocols
- [ ] Yellow Light script memorized
- [ ] Red Light protocol reviewed
- [ ] Grounding script ready
- [ ] Exit routes clear
- [ ] Support person identified for potential escalation

## Facilitator State
- [ ] You have eaten and are hydrated
- [ ] You are regulated (not running on fumes)
- [ ] You have reviewed the session content
- [ ] You are not carrying unprocessed material from previous session
- [ ] You have set your intention for this group

## Post-Session
- [ ] Document any Yellow/Red Light incidents
- [ ] Debrief with co-facilitator
- [ ] Follow up with any participants who needed support
- [ ] Reset the room
`,
  },
  {
    type: "glossary",
    title: "WRH Glossary",
    content: `# WRH Systems Language Glossary

## Core Concepts

**The Architect**: The documented life used as the curriculum template. A real person whose nervous system patterns are mapped across all 30 sessions.

**The Hum**: Chronic baseline activation; the constant low-level hypervigilance that feels normal because it has always been present.

**The Mask**: High-functioning dissociation; the ability to appear normal while internally absent or dysregulated.

**The Crash**: The collapse phase following periods of high function; when the body forces rest through shutdown.

**The Loop**: The full cycle of activation → mask → crash → recovery → repeat.

**The Ledger**: The internal accounting system where trauma creates narratives of debt, worthlessness, and obligation.

**The Debt**: The belief that one must repay or atone for survival; the sense of owing something for having lived.

**The Proof**: The compulsion to prove worthiness through suffering, achievement, or self-destruction.

**The Witness**: The need for external validation and the cost of invisibility; the belief that one's experience doesn't matter unless someone sees it.

**The Verdict**: The internalized judgment one has rendered on oneself; the sentence one believes one deserves.

**The Sentence**: Self-imposed punishment; the active serving of the sentence one has given oneself.

**The Escape**: Avoidance mechanisms and the temporary relief they provide; the false exit that always leads back.

**The Ghost Protocol**: Recognizing when you are not present; the first interrupt tool.

**The Pattern Interrupt**: The basic mechanism for stopping the automatic pattern; the pause that creates choice.

**The Pattern Veto**: Saying no to the pattern and reclaiming executive choice; the active refusal.

**The One-Second Veto**: The rapid interrupt; the one-second pause that changes everything.

**The Crash Interrupt**: Learning to interrupt the crash phase before it becomes a full shutdown.

**The Integrated System**: All tools brought together into a coherent, operational system.

## Arc Titles

**Arc 1: The Machine**: How It Gets Built Into You

**Arc 2: The Drivers**: What Keeps the Engine Running

**Arc 3: The Interrupt & Restore**: How You Rewrite the Code
`,
  },
  {
    type: "plan_b",
    title: "Plan B Wallet Card",
    content: `# Plan B Wallet Card

## When You Feel The Hum Rising

### Step 1: NOTICE (0-5 seconds)
- Feet flat on floor
- Notice: What do you feel in your body right now?
- Notice: What thought just appeared?
- Notice: What do you want to do?

### Step 2: PAUSE (5-10 seconds)
- One slow breath in through nose (4 count)
- Hold (4 count)
- Exhale through mouth (6 count)
- Repeat once

### Step 3: CHOOSE (10-15 seconds)
- You have a choice here
- The old pattern is ONE option
- A different response is ANOTHER option
- Which one serves you right now?

### Step 4: ACT (15+ seconds)
- Do the thing you chose
- Not the thing the pattern chose
- Notice: What changed?

---

## If You're In A Crash

### STOP
- Let yourself rest
- You are not broken
- This is temporary

### REACH
- Text one person: "I'm in a crash. I'm safe. I'll check in later."
- You don't need to explain
- You don't need to perform

### WAIT
- The crash ends
- It always does
- You will come back

---

## If You're In Crisis

**Call 988** (Suicide & Crisis Lifeline)  
**Text "HELLO" to 741741** (Crisis Text Line)  
**Go to nearest ER** if you are unsafe

**You matter. Your life matters. This moment is not forever.**
`,
  },
  {
    type: "capability_statement",
    title: "Capability Statement",
    content: `# Capitol Contracts LLC — Capability Statement

## Organization Overview

Capitol Contracts LLC is a federal contracting firm specializing in trauma-informed psychoeducational programming for high-risk populations, including veterans, justice-involved adults, and individuals in reentry programs.

## Core Competencies

**Trauma-Informed Program Design**: Development and deployment of evidence-aligned psychoeducational curricula that teach mechanisms of trauma without requiring trauma disclosure or traditional therapy modalities.

**Federal Contracting Readiness**: Full SAM.gov registration, NAICS code alignment (611710 - Educational Support Services), and compliance with federal procurement standards.

**Operational Deployment**: Structured facilitator training, fidelity monitoring, and scalable implementation across institutional settings (correctional facilities, VA medical centers, reentry organizations).

**Evaluation & Measurement**: Outcome tracking, participant assessment, and data collection aligned with federal reporting requirements.

## Program: What Really Happened (WRH)

A 30-session psychoeducational program teaching veterans and justice-involved adults the mechanisms of trauma, nervous system dysregulation, and concrete tools for pattern interruption and executive function restoration.

**Target Populations**: Veterans, justice-involved adults, reentry participants, high-risk populations with complex trauma histories.

**Delivery Model**: Group-based, non-exposure, psychoeducational (not clinical therapy).

**Outcomes**: Improved self-regulation, reduced avoidant noncompliance, enhanced executive function, increased program engagement.

## Federal Alignment

- **NAICS Code**: 611710 (Educational Support Services)
- **SAM.gov Status**: Active and current
- **Contracting Authority**: Authorized to bid on federal grants and contracts
- **Compliance**: Meets federal procurement, reporting, and evaluation standards

## Contact

Capitol Contracts LLC  
Federal Contracting Division  
Specializing in Trauma-Informed Reentry & Veteran Services
`,
  },
];

const grantData = [
  {
    name: "BJA FY25 Second Chance Act Community-based Reentry Program",
    funder: "Bureau of Justice Assistance (BJA)",
    deadline: "May 11, 2026",
    amount: "Up to $500,000",
    alignment: "Directly supports reentry programs. WRH's focus on executive function restoration and reducing avoidant noncompliance aligns perfectly with reentry success metrics.",
    description: "Federal grant supporting community-based reentry programs for justice-involved individuals. Emphasizes evidence-based practices and measurable outcomes.",
    url: "https://bja.ojp.gov/funding/opportunities/o-bja-2025-172499",
  },
  {
    name: "BJA FY25 Second Chance Act Pay for Success Initiative",
    funder: "Bureau of Justice Assistance (BJA)",
    deadline: "May 4, 2026",
    amount: "Varies",
    alignment: "Supports innovative, evidence-based reentry strategies with measurable outcomes. WRH's structured design and evaluation framework fit this model.",
    description: "Pay for Success model linking funding to demonstrated outcomes in reentry programming.",
    url: "https://bja.ojp.gov/funding/opportunities/o-bja-2025-172500",
  },
  {
    name: "VA Adaptive Sports and Therapeutic Arts Grants (VA-SPORTS-26)",
    funder: "U.S. Department of Veterans Affairs",
    deadline: "May 13, 2026",
    amount: "Varies",
    alignment: "WRH can serve as foundational psychoeducational component for veterans participating in adaptive sports programs, addressing underlying trauma responses.",
    description: "Supports program development and evaluation for veteran wellness initiatives.",
    url: "https://department.va.gov/veteran-sports/grant-program/",
  },
  {
    name: "Staff Sergeant Parker Gordon Fox Suicide Prevention Grant",
    funder: "U.S. Department of Veterans Affairs",
    deadline: "June 12, 2026",
    amount: "$112 Million total (multiple awards)",
    alignment: "WRH's focus on trauma psychoeducation, self-regulation, and pattern interruption directly contributes to suicide prevention in veteran populations.",
    description: "Federal grant supporting suicide prevention initiatives for veterans. Prioritizes innovative approaches to mental health intervention.",
    url: "https://news.va.gov/press-room/va-announces-112m-grant-opportunity-to-strengthen-suicide-prevention-efforts/",
  },
  {
    name: "Infinite Hero Foundation Grants",
    funder: "Infinite Hero Foundation",
    deadline: "September 15, 2026",
    amount: "Varies",
    alignment: "Foundation focuses on innovative treatments for military-related mental health injuries. WRH's unique systems language and non-exposure model represent innovation.",
    description: "Private foundation supporting innovative mental health treatments for military-connected populations.",
    url: "https://www.infinitehero.org/grants",
  },
  {
    name: "Bob Woodruff Foundation Grants for Organizations",
    funder: "Bob Woodruff Foundation",
    deadline: "Rolling basis (year-round)",
    amount: "Varies",
    alignment: "Foundation supports veteran healthcare including mental health. WRH's comprehensive approach to trauma and functional restoration aligns with their mission.",
    description: "Private foundation providing grants for veteran healthcare and wellness initiatives. Accepts proposals on rolling basis.",
    url: "https://bobwoodrufffoundation.org/our-partners/grants/",
  },
  {
    name: "Fund for Veterans' Assistance (FVA) - Veterans Mental Health Grants",
    funder: "Fund for Veterans' Assistance",
    deadline: "December 2, 2026",
    amount: "Varies",
    alignment: "Specifically targets veterans' mental health. WRH provides framework for understanding and managing trauma responses, improving mental well-being.",
    description: "Grant program specifically for veterans' mental health initiatives and support services.",
    url: "https://www.instrumentl.com/grants/fund-for-veterans-assistance-fva-veterans-mental-health-vmh-grants",
  },
];

async function seed() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    console.log("Starting database seed...");

    // Insert arcs
    console.log("Inserting arcs...");
    for (const arc of arcData) {
      await connection.execute(
        "INSERT INTO arcs (arcNumber, arcTitle, description) VALUES (?, ?, ?)",
        [arc.num, arc.title, arc.description]
      );
    }

    // Insert sessions
    console.log("Inserting sessions...");
    for (const session of sessionData) {
      const arcId = session.arc;
      await connection.execute(
        `INSERT INTO sessions (sessionNumber, sessionTitle, arcId, sessionGoal, anchor, hookEpisode, mechanism, mirror, shiftCliffhanger) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          session.num,
          session.title,
          arcId,
          session.goal,
          `[Anchor content for ${session.title}]`,
          `[Hook/Episode content for ${session.title}]`,
          `[Mechanism/Whiteboard Blueprint for ${session.title}]`,
          `[Mirror content for ${session.title}]`,
          `[Shift/Cliffhanger content for ${session.title}]`,
        ]
      );
    }

    // Insert resources
    console.log("Inserting resources...");
    for (const resource of resourceData) {
      await connection.execute(
        "INSERT INTO resources (resourceType, title, content) VALUES (?, ?, ?)",
        [resource.type, resource.title, resource.content]
      );
    }

    // Insert grants
    console.log("Inserting grants...");
    for (const grant of grantData) {
      await connection.execute(
        `INSERT INTO grants (grantName, funder, deadline, fundingAmount, alignment, description, url) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          grant.name,
          grant.funder,
          grant.deadline,
          grant.amount,
          grant.alignment,
          grant.description,
          grant.url,
        ]
      );
    }

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

seed().catch(console.error);
