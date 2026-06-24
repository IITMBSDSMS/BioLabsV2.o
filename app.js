import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xlzcqfgoizzgzgypdaaw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;
if (supabaseAnonKey) {
    try {
        supabase = createClient(supabaseUrl, supabaseAnonKey);
        console.log("Supabase client initialized successfully.");
    } catch (e) {
        console.error("Supabase init error:", e);
    }
}

// --- INDIAN COLLEGES CHAPTERS DATABASE ---
const INDIAN_COLLEGES_DATABASE = [
    // Tier 1
    { name: "IIT Bombay", type: "Engineering", tier: 1, city: "Mumbai" },
    { name: "IIT Madras", type: "Engineering", tier: 1, city: "Chennai" },
    { name: "IIT Kharagpur", type: "Engineering", tier: 1, city: "Kharagpur" },
    { name: "IIT Delhi", type: "Engineering", tier: 1, city: "Delhi" },
    { name: "BITS Pilani", type: "Engineering", tier: 1, city: "Pilani" },
    { name: "AIIMS Delhi", type: "Medical", tier: 1, city: "Delhi" },
    { name: "JIPMER Puducherry", type: "Medical", tier: 1, city: "Puducherry" },
    { name: "CMC Vellore", type: "Medical", tier: 1, city: "Vellore" },
    { name: "NIMHANS Bangalore", type: "Psychology", tier: 1, city: "Bangalore" },
    { name: "Tata Institute of Social Sciences (TISS)", type: "Psychology", tier: 1, city: "Mumbai" },
    { name: "Delhi University (DU)", type: "Psychology", tier: 1, city: "Delhi" },
    // Tier 2
    { name: "NIT Trichy", type: "Engineering", tier: 2, city: "Trichy" },
    { name: "Delhi Technological University (DTU)", type: "Engineering", tier: 2, city: "Delhi" },
    { name: "Vellore Institute of Technology (VIT)", type: "Engineering", tier: 2, city: "Vellore" },
    { name: "Manipal Institute of Technology (MIT)", type: "Engineering", tier: 2, city: "Manipal" },
    { name: "Maulana Azad Medical College (MAMC)", type: "Medical", tier: 2, city: "Delhi" },
    { name: "King George's Medical University (KGMU)", type: "Medical", tier: 2, city: "Lucknow" },
    { name: "Bangalore Medical College (BMC)", type: "Medical", tier: 2, city: "Bangalore" },
    { name: "Kasturba Medical College (KMC)", type: "Medical", tier: 2, city: "Manipal" },
    { name: "Christ University", type: "Psychology", tier: 2, city: "Bangalore" },
    { name: "Banaras Hindu University (BHU)", type: "Psychology", tier: 2, city: "Varanasi" },
    { name: "Jamia Millia Islamia", type: "Psychology", tier: 2, city: "Delhi" },
    // Tier 3
    { name: "Amity University", type: "Engineering", tier: 3, city: "Noida" },
    { name: "Lovely Professional University (LPU)", type: "Engineering", tier: 3, city: "Jalandhar" },
    { name: "Galgotias University", type: "Engineering", tier: 3, city: "Greater Noida" },
    { name: "SRM University", type: "Engineering", tier: 3, city: "Chennai" },
    { name: "D.Y. Patil Medical College", type: "Medical", tier: 3, city: "Pune" },
    { name: "Santosh Medical College", type: "Medical", tier: 3, city: "Ghaziabad" },
    { name: "Amity Institute of Psychology", type: "Psychology", tier: 3, city: "Noida" },
    { name: "Lovely Faculty of Psychology", type: "Psychology", tier: 3, city: "Jalandhar" }
];

const LEAD_NAMES = {
    Engineering: ["Karan Sharma", "Priya Rao", "Ishaan Malhotra", "Tanvi Joshi", "Aditya Sen", "Siddharth Verma"],
    Medical: ["Dr. Sneha Nair", "Dr. Aakash Goel", "Dr. Ritu Verma", "Dr. Vikram Seth", "Dr. Rohan Malhotra"],
    Psychology: ["Nisha Iyer", "Rahul Bose", "Kriti Saxena", "Amit Patil", "Shreya Ghoshal", "Anjali Deshmukh"]
};

const LEAD_BIOS = {
    Engineering: [
        "Specializes in embedded systems and machine learning. Connected with local hardware tech firms.",
        "Focuses on cloud architectures and databases. Student lead for college web dev projects.",
        "Interested in robotics and cybernetics. Liaison for inter-college research competitions."
    ],
    Medical: [
        "Involved in clinical diagnostics and pharmacology. Access to hospital database resources.",
        "Focuses on microbiology and public health reports. Manages blood bank and clinical materials.",
        "Researches surgical tools and bio-sensors. Coordinates with medical equipment suppliers."
    ],
    Psychology: [
        "Coordinates behavioral analysis surveys and fatigue metrics. Expert in SPSS modeling.",
        "Focuses on child development and cognitive therapies. Maintains psychology testing kits.",
        "Studies occupational stress and mental health modules. Coordinates local counseling resources."
    ]
};

function generateAmbassadorForCollege(college) {
    const type = college.type;
    const names = LEAD_NAMES[type];
    const name = names[Math.floor(Math.random() * names.length)];
    const bios = LEAD_BIOS[type];
    const bio = bios[Math.floor(Math.random() * bios.length)];
    
    // Split initials for avatar
    const parts = name.replace("Dr. ", "").split(" ");
    const avatar = parts.map(p => p.charAt(0)).join("").toUpperCase();
    
    const tierTag = `Tier ${college.tier}`;
    const role = `${tierTag} Chapter Ambassador`;
    const email = `${parts[0].toLowerCase()}.${parts[parts.length - 1].toLowerCase()}@ambassador.biolabs.in`;
    
    // Project and material counts based on Tier
    let projectsCount = 1;
    let materialsCount = 2;
    if (college.tier === 1) {
        projectsCount = Math.floor(Math.random() * 3) + 3;
        materialsCount = Math.floor(Math.random() * 6) + 8;
    } else if (college.tier === 2) {
        projectsCount = Math.floor(Math.random() * 2) + 2;
        materialsCount = Math.floor(Math.random() * 4) + 4;
    } else {
        projectsCount = Math.floor(Math.random() * 2) + 1;
        materialsCount = Math.floor(Math.random() * 3) + 2;
    }
    
    return {
        name,
        role,
        email,
        avatar,
        bio,
        projectsCount,
        materialsCount
    };
}

// --- MOCK DATABASE STATE ---
const STATE = {
    showcaseSearchQuery: '',
    showcaseSelectedDomain: 'all',
    showcaseSelectedSort: 'likes',
    showcases: [
        {
            id: 1,
            title: "GenAI Radiology Assistant (RadiolAI)",
            domain: "Medical",
            description: "An AI-powered diagnostic tool capable of identifying 14 types of lung anomalies from chest X-rays with 94.2% accuracy. Developed by a student research group during a 6-month lab residency under Dr. Samir Kalra.",
            mentor: "Dr. Samir Kalra",
            institution: "AIIMS Delhi",
            publisher: "Nature Machine Intelligence",
            paperLink: "https://arxiv.org/abs/2606.12345",
            demoLink: "https://github.com/research-it/radiolai-demo",
            likes: 124,
            liked: false,
            team: [
                { name: "Aarav Gupta", role: "AI Engineer", avatar: "AG" },
                { name: "Priya Rao", role: "Dataset Curator", avatar: "PR" },
                { name: "Karan Sharma", role: "Fullstack Dev", avatar: "KS" }
            ]
        },
        {
            id: 2,
            title: "CRISPR-Modified Biofuel Yeast Strains",
            domain: "Biotechnology",
            description: "Engineered yeast strains using CRISPR-Cas9 pathways to increase ethanol production efficiency from agricultural biomass by 18% under Prof. Ananya Sen.",
            mentor: "Prof. Ananya Sen",
            institution: "IIT Kharagpur",
            publisher: "Biotechnology & Biofuels Journal",
            paperLink: "https://doi.org/10.1186/s13068-026-mock",
            demoLink: "https://github.com/research-it/crispr-biofuel",
            likes: 98,
            liked: false,
            team: [
                { name: "Rohan Verma", role: "Lab Lead", avatar: "RV" },
                { name: "Sneha Patel", role: "Gene Analyst", avatar: "SP" }
            ]
        },
        {
            id: 3,
            title: "TheraBot: Cognitive Behavioral Therapy Agent",
            domain: "Psychology",
            description: "An interactive mental health companion utilizing specialized CBT rulesets to monitor fatigue metrics and deliver personalized guidance under Dr. Kabir Mehta.",
            mentor: "Dr. Kabir Mehta",
            institution: "NIMHANS Bangalore",
            publisher: "JMIR Mental Health",
            paperLink: "https://mental.jmir.org/2026/mock",
            demoLink: "https://github.com/research-it/therabot-cbt",
            likes: 85,
            liked: false,
            team: [
                { name: "Meera Nair", role: "Cognitive Dev", avatar: "MN" },
                { name: "Kabir Roy", role: "NLP Engineer", avatar: "KR" }
            ]
        }
    ],
    theme: 'light',
    activeRole: 'student',
    currentView: 'home',
    searchQuery: '',
    selectedDomain: 'all',
    activeChannel: 'AI in Healthcare',
    
    collegeChapters: [
        {
            id: 'IIT Delhi Chapter',
            name: "IIT Delhi Chapter",
            college: "IIT Delhi",
            lead: {
                name: "Siddharth Verma",
                role: "Senior UG Researcher & Brand Ambassador",
                email: "siddharth.v@iitd.ac.in",
                avatar: "SV",
                bio: "Expert in deep learning & robotics. Connected with Nvidia Research & Intel labs.",
                projectsCount: 3,
                materialsCount: 8
            }
        },
        {
            id: 'BITS Pilani Chapter',
            name: "BITS Pilani Chapter",
            college: "BITS Pilani",
            lead: {
                name: "Meera Nair",
                role: "Lab Assistant & Brand Ambassador",
                email: "meera.nair@pilani.bits-pilani.ac.in",
                avatar: "MN",
                bio: "Focuses on biofuel pathways & biotech. Deals with bio-materials sourcing.",
                projectsCount: 2,
                materialsCount: 5
            }
        },
        {
            id: 'AIIMS Delhi Chapter',
            name: "AIIMS Delhi Chapter",
            college: "AIIMS Delhi",
            lead: {
                name: "Dr. Rohan Malhotra",
                role: "Junior Resident & Clinical Lead",
                email: "rohan.m@aiims.edu",
                avatar: "RM",
                bio: "Clinical AI diagnostics & medical materials contact. Integrates clinical datasets.",
                projectsCount: 4,
                materialsCount: 12
            }
        },
        {
            id: 'NIMHANS Chapter',
            name: "NIMHANS Chapter",
            college: "NIMHANS Bangalore",
            lead: {
                name: "Anjali Deshmukh",
                role: "Cognitive Analyst & Ambassador",
                email: "anjali.d@nimhans.ac.in",
                avatar: "AD",
                bio: "Maintains cognitive fatigue studies, patient survey datasets, & neuro-materials.",
                projectsCount: 1,
                materialsCount: 4
            }
        }
    ],

    leadInquiries: [
        {
            id: 1,
            leadName: "Siddharth Verma",
            college: "IIT Delhi",
            type: "Company Opportunities",
            message: "Hi Siddharth, I am looking for Nvidia AI research internship materials and referral eligibility. Can we connect?",
            status: "Pending"
        }
    ],
    
    // Auth State
    user: {
        loggedIn: false,
        role: 'student',
        email: '',
        phone: '',
        name: 'Guest User',
        institution: 'IIT Delhi',
        age: 21,
        gender: 'Male',
        skills: 'Python, R, Data Analysis, LaTeX',
        interests: 'AI & Deep Learning',
        avatarImg: '',
        streak: 5,
        credits: 120,
        research_bio: '',
        google_scholar: '',
        lab_website: '',
        dailyTasks: {
            checkIn: { label: "Daily Attendance Check-in", credits: 5, completed: false },
            readPaper: { label: "Read a Showcase Paper", credits: 10, completed: false },
            solveQuiz: { label: "Complete Daily Science Quiz", credits: 15, completed: false },
            postCommunity: { label: "Share a research update in Chapters", credits: 10, completed: false }
        },
        dailyQuiz: {
            question: "Which gene editing tool acts as molecular scissors to cut DNA sequences?",
            options: ["CRISPR-Cas9", "TALENs", "ZFNs", "Restriction Enzymes"],
            answer: 0,
            solved: false
        }
    },

    identityAvatars: {
        "Aarav Gupta": "",
        "Dr. Samir Kalra": "",
        "Dr. Kabir Mehta": ""
    },

    // Mock Projects / Opportunities
    opportunities: [
        {
            id: 1,
            title: "GenAI for Radiology Diagnosis",
            researcher: "Dr. Samir Kalra",
            lab: "Clinical AI Diagnostics Lab",
            domain: "AI",
            skills: "PyTorch, CNNs, Python",
            duration: "6 Months",
            slots: 2,
            applied: false
        },
        {
            id: 2,
            title: "CRISPR Pathway Engineering in Biofuels",
            researcher: "Prof. Ananya Sen",
            lab: "Molecular Genetics Center",
            domain: "Biotechnology",
            skills: "Genomics, Gel Electrophoresis",
            duration: "1 Year",
            slots: 1,
            applied: false
        },
        {
            id: 3,
            title: "Cognitive Fatigue & Remote Work Productivity",
            researcher: "Dr. Kabir Mehta",
            lab: "Cognitive Sciences Division",
            domain: "Psychology",
            skills: "R, SPSS, Survey Design",
            duration: "3 Months",
            slots: 4,
            applied: false
        },
        {
            id: 4,
            title: "Prosthetic Grip Control via EMG Decoding",
            researcher: "Prof. Rajesh Kumar",
            lab: "Bionics & Robotics Laboratory",
            domain: "Biomedical",
            skills: "C++, Signal Processing, MATLAB",
            duration: "8 Months",
            slots: 2,
            applied: false
        },
        {
            id: 5,
            title: "Urban Air Quality & Respiratory Admissions",
            researcher: "Dr. Priya Patel",
            lab: "School of Public Health",
            domain: "Public Health",
            skills: "GIS Mapping, Epidemiology, R",
            duration: "4 Months",
            slots: 3,
            applied: false
        }
    ],

    // Directory of Researchers and Mentors
    directory: [
        {
            name: "Dr. Samir Kalra",
            role: "researcher",
            institution: "AIIMS Delhi",
            domain: "AI & Healthcare",
            verified: true,
            connections: 184,
            skills: ["Computer Vision", "Radiology", "Deep Learning"],
            connected: true
        },
        {
            name: "Prof. Ananya Sen",
            role: "researcher",
            institution: "IIT Kharagpur",
            domain: "Biotechnology",
            verified: true,
            connections: 232,
            skills: ["Genetics", "CRISPR", "Biochemical Lab"]
        },
        {
            name: "Dr. Kabir Mehta",
            role: "mentor",
            institution: "NIMHANS Bangalore",
            domain: "Psychology",
            verified: true,
            connections: 92,
            skills: ["Cognitive Therapy", "Clinical Studies"]
        },
        {
            name: "Rahul Sharma",
            role: "mentor",
            institution: "Biogenics India Pvt Ltd",
            domain: "Biomedical",
            verified: false,
            connections: 45,
            skills: ["Medical Devices", "FDA Approvals"]
        }
    ],

    // Community Feed Posts (LinkedIn-like)
    feed: [
        {
            id: 1,
            author: "Dr. Samir Kalra",
            role: "researcher",
            time: "2 hours ago",
            body: "Excited to share our team's latest preprint paper on 'Multimodal Transformer Architectures for Lung Nodule Segments' in Nature Machine Intelligence. Looking for student collaborators with strong PyTorch experience to extend this to cardiovascular MRI scans! Drop an application in our Opportunities section.",
            likes: 42,
            liked: false,
            paperLink: "arxiv.org/abs/2606.12345",
            channel: "AI in Healthcare"
        },
        {
            id: 2,
            author: "Dr. Kabir Mehta",
            role: "mentor",
            time: "1 day ago",
            body: "Had an amazing mentoring session with 15 undergraduate students yesterday on 'How to formulate a scientific hypothesis'. For those who missed it, I have uploaded the slide deck and sample outline templates in the resource channel. Next session scheduled for clinical case designs next Saturday!",
            likes: 29,
            liked: false,
            paperLink: "",
            channel: "Neuroscience Hub"
        },
        {
            id: 3,
            author: "Siddharth Verma",
            role: "student",
            time: "3 hours ago",
            body: "Great news for IIT Delhi folks! Nvidia is visiting campus next week for AI researcher recruitment. If you need prep materials or references, reach out to me as your College Chapter Lead. Let's make our campus proud!",
            likes: 15,
            liked: false,
            paperLink: "",
            channel: "IIT Delhi Chapter"
        },
        {
            id: 4,
            author: "Meera Nair",
            role: "student",
            time: "5 hours ago",
            body: "Biotech lab material sourcing updates: We've received fresh stock of CRISPR enzyme kits. If any project teams at BITS Pilani need authorization or material resources, contact me directly. Let's build something bio-innovative!",
            likes: 8,
            liked: false,
            paperLink: "",
            channel: "BITS Pilani Chapter"
        },
        {
            id: 5,
            author: "Dr. Rohan Malhotra",
            role: "researcher",
            time: "1 day ago",
            body: "AIIMS Delhi Chapter is hosting a clinical data hackathon next weekend. Research opportunities with clinicians will be open for top-performing students. Contact me if you have any questions or require clinical datasets for validation.",
            likes: 31,
            liked: false,
            paperLink: "",
            channel: "AIIMS Delhi Chapter"
        },
        {
            id: 6,
            author: "Anjali Deshmukh",
            role: "student",
            time: "2 days ago",
            body: "Undergraduate cognitive surveys templates are now hosted in the NIMHANS Chapter repository. Students researching remote work burnout can access this dataset by clicking the resource links. Ping me for access credentials.",
            likes: 12,
            liked: false,
            paperLink: "",
            channel: "NIMHANS Chapter"
        }
    ],

    // Learning Center Courses
    courses: [
        {
            id: 1,
            category: "Methodology",
            title: "Foundations of Research Methodology",
            duration: "4 weeks",
            modules: 8,
            progress: 80
        },
        {
            id: 2,
            category: "Statistics",
            title: "Biostatistics and Data Wrangling in R",
            duration: "6 weeks",
            modules: 12,
            progress: 25
        },
        {
            id: 3,
            category: "Scientific Writing",
            title: "Structuring High-Impact Journal Papers",
            duration: "3 weeks",
            modules: 6,
            progress: 0
        },
        {
            id: 4,
            category: "Academic Publishing",
            title: "Navigating Peer Review & Journal Selection",
            duration: "2 weeks",
            modules: 4,
            progress: 0
        }
    ],

    // Applicant ledger state (Researcher Dashboard view)
    applicants: [
        { id: 101, name: "Aarav Gupta", project: "GenAI for Radiology Diagnosis", role: "Student Researcher", college: "IIT Delhi", status: "Pending" },
        { id: 102, name: "Meera Nair", project: "CRISPR Pathway Engineering in Biofuels", role: "Lab Assistant", college: "BITS Pilani", status: "Approved" },
        { id: 103, name: "Aditya Verma", project: "Cognitive Fatigue Study", role: "Data Analyst", college: "Delhi University", status: "Pending" }
    ],

    // Mentorship sessions ledger state (Mentor Dashboard view)
    sessions: [
        { id: 201, student: "Riya Sen", topic: "Biotech Thesis Structure Feedback", date: "June 20, 2026 at 4:00 PM", platform: "Zoom", status: "Scheduled" },
        { id: 202, student: "Kunal Ghosh", topic: "AI/ML Career Guidance Session", date: "June 22, 2026 at 11:00 AM", platform: "Google Meet", status: "Scheduled" }
    ],

    // Admin Verification Queue
    verifications: [
        { id: 301, name: "Dr. Vikram Seth", type: "Researcher", affiliation: "IISc Bangalore", bio: "Genomics Research Fellow", status: "Pending" },
        { id: 302, name: "Sneha Nair", type: "Mentor", affiliation: "MedTech Innovations", bio: "Regulatory Specialist", status: "Pending" }
    ]
};

STATE.allProfiles = [
    { id: '1', name: "Dr. Samir Kalra", role: "researcher", institution: "AIIMS Delhi", domain: "AI & Healthcare", verified: true, connections: 184, skills: ["Computer Vision", "Radiology", "Deep Learning"], linkedin_url: "https://linkedin.com/in/samir-kalra-mock", avatar_url: "", streak: 8, credits: 320 },
    { id: '2', name: "Prof. Ananya Sen", role: "researcher", institution: "IIT Kharagpur", domain: "Biotechnology", verified: true, connections: 232, skills: ["Genetics", "CRISPR", "Biochemical Lab"], linkedin_url: "https://linkedin.com/in/ananya-sen-mock", avatar_url: "", streak: 12, credits: 450 },
    { id: '3', name: "Dr. Kabir Mehta", role: "mentor", institution: "NIMHANS Bangalore", domain: "Psychology", verified: true, connections: 92, skills: ["Cognitive Therapy", "Clinical Studies"], linkedin_url: "https://linkedin.com/in/kabir-mehta-mock", avatar_url: "", streak: 4, credits: 180 },
    { id: '4', name: "Rahul Sharma", role: "mentor", institution: "Biogenics India Pvt Ltd", domain: "Biomedical", verified: false, connections: 45, skills: ["Medical Devices", "FDA Approvals"], linkedin_url: "https://linkedin.com/in/rahul-sharma-mock", avatar_url: "", streak: 0, credits: 50 },
    { id: '5', name: "Aarav Gupta", role: "student", institution: "IIT Delhi", domain: "AI & Deep Learning", verified: false, connections: 24, skills: ["Python", "PyTorch", "Data Structures"], linkedin_url: "", avatar_url: "", streak: 5, credits: 120 },
    { id: '6', name: "Meera Nair", role: "student", institution: "BITS Pilani", domain: "Biotechnology & Genetics", verified: false, connections: 18, skills: ["R", "Bioinformatics", "Gel Electrophoresis"], linkedin_url: "", avatar_url: "", streak: 3, credits: 95 },
    { id: '7', name: "Administrator", role: "admin", institution: "BioLabs HQ", domain: "System Control", verified: true, connections: 500, skills: ["Database Administration", "System Operations"], linkedin_url: "", avatar_url: "", streak: 10, credits: 1000 }
];

// --- SUPABASE DATA LOADING ---
async function loadDataFromSupabase() {
    if (!supabase) return;
    try {
        // Fetch Profiles
        const { data: profiles, error: errProfiles } = await supabase.from('profiles').select('*');
        if (errProfiles) throw errProfiles;
        if (profiles && profiles.length > 0) {
            STATE.allProfiles = profiles;
            STATE.directory = profiles.filter(p => p.role === 'researcher' || p.role === 'mentor').map(p => ({
                id: p.id,
                name: p.name,
                role: p.role,
                institution: p.institution,
                domain: p.domain,
                verified: p.verified,
                connections: p.connections,
                skills: p.skills,
                linkedin_url: p.linkedin_url,
                avatar_url: p.avatar_url,
                avatarImg: p.avatar_url,
                connected: false
            }));

            // Sync current user state
            let currentUserProfile = null;
            if (STATE.user.loggedIn && STATE.user.supabaseUid) {
                currentUserProfile = profiles.find(p => p.user_id === STATE.user.supabaseUid);
            }
            if (!currentUserProfile) {
                currentUserProfile = profiles.find(p => p.role === STATE.activeRole);
            }
            if (currentUserProfile) {
                STATE.user.id = currentUserProfile.id;
                STATE.user.name = currentUserProfile.name;
                STATE.user.institution = currentUserProfile.institution;
                STATE.user.streak = currentUserProfile.streak;
                STATE.user.credits = currentUserProfile.credits;
                STATE.user.skills = (currentUserProfile.skills || []).join(', ');
                STATE.user.avatarImg = currentUserProfile.avatar_url;
                STATE.user.linkedin_url = currentUserProfile.linkedin_url;
                STATE.user.verified = currentUserProfile.verified || false;
                STATE.user.resume_url = currentUserProfile.resume_url || '';
                STATE.user.quiz_completed = currentUserProfile.quiz_completed || false;
                STATE.user.research_bio = currentUserProfile.research_bio || '';
                STATE.user.google_scholar = currentUserProfile.google_scholar || '';
                STATE.user.lab_website = currentUserProfile.lab_website || '';
            }
        }

        // Fetch Showcases
        const { data: showcases, error: errShowcases } = await supabase.from('showcases').select('*').order('likes', { ascending: false });
        if (errShowcases) throw errShowcases;
        if (showcases) {
            STATE.showcases = showcases.map(s => ({
                id: s.id,
                title: s.title,
                domain: s.domain,
                description: s.description,
                mentor: s.mentor,
                institution: s.institution,
                publisher: s.publisher,
                paperLink: s.paper_link,
                demoLink: s.demo_link,
                likes: s.likes,
                liked: s.liked,
                team: s.team,
                approved: s.approved
            }));
        }

        // Fetch Opportunities
        const { data: opportunities, error: errOpps } = await supabase.from('opportunities').select('*');
        if (errOpps) throw errOpps;
        if (opportunities) {
            STATE.opportunities = opportunities.map(o => ({
                id: o.id,
                title: o.title,
                researcher: o.researcher,
                lab: o.lab,
                domain: o.domain,
                skills: o.skills,
                duration: o.duration,
                slots: o.slots,
                applied: o.applied,
                type: o.type,
                price_credits: o.price_credits,
                stipend: o.stipend
            }));
        }

        // Fetch Community Feed
        const { data: feedPosts, error: errFeed } = await supabase.from('feed').select('*').order('created_at', { ascending: false });
        if (errFeed) throw errFeed;
        if (feedPosts) {
            STATE.feed = feedPosts.map(f => ({
                id: f.id,
                author: f.author,
                role: f.role,
                time: f.time,
                body: f.body,
                likes: f.likes,
                liked: f.liked,
                paperLink: f.paper_link,
                channel: f.channel
            }));
        }

        // Fetch Applications/Applicants
        const { data: apps, error: errApps } = await supabase.from('opportunity_applications').select('*');
        if (errApps) throw errApps;
        if (apps) {
            STATE.applicants = apps.map(a => ({
                id: a.id,
                name: a.student_name,
                project: a.project_title,
                role: a.student_role,
                college: a.student_college,
                status: a.status
            }));
        }

        // Fetch Mentorship Sessions
        const { data: sess, error: errSess } = await supabase.from('mentorship_sessions').select('*');
        if (errSess) throw errSess;
        if (sess) {
            STATE.sessions = sess.map(s => ({
                id: s.id,
                student: s.student,
                topic: s.topic,
                date: s.date,
                platform: s.platform,
                status: s.status,
                type: s.type,
                price_credits: s.price_credits,
                mentor_name: s.mentor_name,
                mentor_id: s.mentor_id
            }));
        }

        // Fetch Verifications
        const { data: verifs, error: errVerifs } = await supabase.from('verifications').select('*');
        if (errVerifs) throw errVerifs;
        if (verifs) {
            STATE.verifications = verifs.map(v => ({
                id: v.id,
                name: v.name,
                type: v.type,
                affiliation: v.affiliation,
                bio: v.bio,
                status: v.status,
                user_id: v.user_id,
                email: v.email
            }));
        }

        // Fetch Courses
        const { data: courses, error: errCourses } = await supabase.from('courses').select('*');
        if (errCourses) throw errCourses;
        if (courses && courses.length > 0) {
            STATE.courses = courses.map(c => ({
                id: c.id,
                category: c.category,
                title: c.title,
                duration: c.duration,
                modules: c.modules,
                progress: c.progress,
                creator_name: c.creator_name,
                creator_id: c.creator_id,
                is_paid: c.is_paid || false,
                price_credits: c.price_credits || 0
            }));
        }

        console.log("Supabase data successfully loaded.");
    } catch (e) {
        console.error("Error loading data from Supabase, using mock fallback:", e);
        showToast("⚠️ Could not load remote data. Running in Offline Mock mode.");
    }
}

// --- SUPABASE SEEDING FUNCTION ---
async function seedSupabaseDatabase() {
    if (!supabase) return;
    try {
        showToast("Seeding Supabase database tables...");

        // Clean existing tables first
        await supabase.from('opportunity_applications').delete().neq('id', 0);
        await supabase.from('showcases').delete().neq('id', 0);
        await supabase.from('opportunities').delete().neq('id', 0);
        await supabase.from('feed').delete().neq('id', 0);
        await supabase.from('mentorship_sessions').delete().neq('id', 0);
        await supabase.from('verifications').delete().neq('id', 0);
        await supabase.from('courses').delete().neq('id', 0);
        await supabase.from('profiles').delete().neq('name', '');

        // 1. Seed Profiles
        const initialProfiles = [
            { name: "Dr. Samir Kalra", role: "researcher", institution: "AIIMS Delhi", domain: "AI & Healthcare", verified: true, connections: 184, skills: ['Computer Vision', 'Radiology', 'Deep Learning'], interests: 'AI Clinical Diagnostics', linkedin_url: 'https://linkedin.com/in/samir-kalra-mock', avatar_url: '', streak: 8, credits: 320 },
            { name: "Prof. Ananya Sen", role: "researcher", institution: "IIT Kharagpur", domain: "Biotechnology", verified: true, connections: 232, skills: ['Genetics', 'CRISPR', 'Biochemical Lab'], interests: 'CRISPR Biofuel Strains', linkedin_url: 'https://linkedin.com/in/ananya-sen-mock', avatar_url: '', streak: 12, credits: 450 },
            { name: "Dr. Kabir Mehta", role: "mentor", institution: "NIMHANS Bangalore", domain: "Psychology", verified: true, connections: 92, skills: ['Cognitive Therapy', 'Clinical Studies'], interests: 'Cognitive Burnout Studies', linkedin_url: 'https://linkedin.com/in/kabir-mehta-mock', avatar_url: '', streak: 4, credits: 180 },
            { name: "Rahul Sharma", role: "mentor", institution: "Biogenics India Pvt Ltd", domain: "Biomedical", verified: false, connections: 45, skills: ['Medical Devices', 'FDA Approvals'], interests: 'MedTech Regulation', linkedin_url: 'https://linkedin.com/in/rahul-sharma-mock', avatar_url: '', streak: 0, credits: 50 },
            { name: "Aarav Gupta", role: "student", institution: "IIT Delhi", domain: "AI & Deep Learning", verified: false, connections: 24, skills: ['Python', 'PyTorch', 'Data Structures'], interests: 'Computer Vision', linkedin_url: '', avatar_url: '', streak: 5, credits: 120 },
            { name: "Meera Nair", role: "student", institution: "BITS Pilani", domain: "Biotechnology & Genetics", verified: false, connections: 18, skills: ['R', 'Bioinformatics', 'Gel Electrophoresis'], interests: 'Biofuel Pathways', linkedin_url: '', avatar_url: '', streak: 3, credits: 95 },
            { name: "Administrator", role: "admin", institution: "BioLabs HQ", domain: "System Control", verified: true, connections: 500, skills: ['Database Administration', 'System Operations'], interests: 'Security protocols', linkedin_url: '', avatar_url: '', streak: 10, credits: 1000 }
        ];
        await supabase.from('profiles').insert(initialProfiles);

        // 2. Seed Showcases
        const initialShowcases = [
            {
                title: "GenAI Radiology Assistant (RadiolAI)",
                domain: "Medical",
                description: "An AI-powered diagnostic tool capable of identifying 14 types of lung anomalies from chest X-rays with 94.2% accuracy. Developed by a student research group during a 6-month lab residency under Dr. Samir Kalra.",
                mentor: "Dr. Samir Kalra",
                institution: "AIIMS Delhi",
                publisher: "Nature Machine Intelligence",
                paper_link: "https://arxiv.org/abs/2606.12345",
                demo_link: "https://github.com/research-it/radiolai-demo",
                likes: 124,
                liked: false,
                team: [
                    { name: "Aarav Gupta", role: "AI Engineer", avatar: "AG" },
                    { name: "Priya Rao", role: "Dataset Curator", avatar: "PR" },
                    { name: "Karan Sharma", role: "Fullstack Dev", avatar: "KS" }
                ],
                approved: true
            },
            {
                title: "CRISPR-Modified Biofuel Yeast Strains",
                domain: "Biotechnology",
                description: "Engineered yeast strains using CRISPR-Cas9 pathways to increase ethanol production efficiency from agricultural biomass by 18% under Prof. Ananya Sen.",
                mentor: "Prof. Ananya Sen",
                institution: "IIT Kharagpur",
                publisher: "Biotechnology & Biofuels Journal",
                paper_link: "https://doi.org/10.1186/s13068-026-mock",
                demo_link: "https://github.com/research-it/crispr-biofuel",
                likes: 98,
                liked: false,
                team: [
                    { name: "Rohan Verma", role: "Lab Lead", avatar: "RV" },
                    { name: "Sneha Patel", role: "Gene Analyst", avatar: "SP" }
                ],
                approved: true
            },
            {
                title: "TheraBot: Cognitive Behavioral Therapy Agent",
                domain: "Psychology",
                description: "An interactive mental health companion utilizing specialized CBT rulesets to monitor fatigue metrics and deliver personalized guidance under Dr. Kabir Mehta.",
                mentor: "Dr. Kabir Mehta",
                institution: "NIMHANS Bangalore",
                publisher: "JMIR Mental Health",
                paper_link: "https://mental.jmir.org/2026/mock",
                demo_link: "https://github.com/research-it/therabot-cbt",
                likes: 85,
                liked: false,
                team: [
                    { name: "Meera Nair", role: "Cognitive Dev", avatar: "MN" },
                    { name: "Kabir Roy", role: "NLP Engineer", avatar: "KR" }
                ],
                approved: true
            }
        ];
        await supabase.from('showcases').insert(initialShowcases);

        // 3. Seed Opportunities
        const initialOpps = [
            { title: "GenAI for Radiology Diagnosis", researcher: "Dr. Samir Kalra", lab: "Clinical AI Diagnostics Lab", domain: "AI", skills: "PyTorch, CNNs, Python", duration: "6 Months", slots: 2, applied: false },
            { title: "CRISPR Pathway Engineering in Biofuels", researcher: "Prof. Ananya Sen", lab: "Molecular Genetics Center", domain: "Biotechnology", skills: "Genomics, Gel Electrophoresis", duration: "1 Year", slots: 1, applied: false },
            { title: "Cognitive Fatigue & Remote Work Productivity", researcher: "Dr. Kabir Mehta", lab: "Cognitive Sciences Division", domain: "Psychology", skills: "R, SPSS, Survey Design", duration: "3 Months", slots: 4, applied: false },
            { title: "Prosthetic Grip Control via EMG Decoding", researcher: "Prof. Rajesh Kumar", lab: "Bionics & Robotics Laboratory", domain: "Biomedical", skills: "C++, Signal Processing, MATLAB", duration: "8 Months", slots: 2, applied: false },
            { title: "Urban Air Quality & Respiratory Admissions", researcher: "Dr. Priya Patel", lab: "School of Public Health", domain: "Public Health", skills: "GIS Mapping, Epidemiology, R", duration: "4 Months", slots: 3, applied: false }
        ];
        await supabase.from('opportunities').insert(initialOpps);

        // 4. Seed Applications
        const initialApps = [
            { student_name: "Aarav Gupta", student_college: "IIT Delhi", student_role: "Student Researcher", project_title: "GenAI for Radiology Diagnosis", status: "Pending" },
            { student_name: "Meera Nair", student_college: "BITS Pilani", student_role: "Lab Assistant", project_title: "CRISPR Pathway Engineering in Biofuels", status: "Approved" },
            { student_name: "Aditya Verma", student_college: "Delhi University", student_role: "Data Analyst", project_title: "Cognitive Fatigue Study", status: "Pending" }
        ];
        await supabase.from('opportunity_applications').insert(initialApps);

        // 5. Seed Feed
        const initialFeed = [
            { author: "Dr. Samir Kalra", role: "researcher", time: "2 hours ago", body: "Excited to share our team's latest preprint paper on 'Multimodal Transformer Architectures for Lung Nodule Segments' in Nature Machine Intelligence. Looking for student collaborators with strong PyTorch experience to extend this to cardiovascular MRI scans! Drop an application in our Opportunities section.", likes: 42, liked: false, paper_link: "arxiv.org/abs/2606.12345", channel: "AI in Healthcare" },
            { author: "Dr. Kabir Mehta", role: "mentor", time: "1 day ago", body: "Had an amazing mentoring session with 15 undergraduate students yesterday on 'How to formulate a scientific hypothesis'. For those who missed it, I have uploaded the slide deck and sample outline templates in the resource channel. Next session scheduled for clinical case designs next Saturday!", likes: 29, liked: false, paper_link: "", channel: "Neuroscience Hub" },
            { author: "Siddharth Verma", role: "student", time: "3 hours ago", body: "Great news for IIT Delhi folks! Nvidia is visiting campus next week for AI researcher recruitment. If you need prep materials or references, reach out to me as your College Chapter Lead. Let's make our campus proud!", likes: 15, liked: false, paper_link: "", channel: "IIT Delhi Chapter" },
            { author: "Meera Nair", role: "student", time: "5 hours ago", body: "Biotech lab material sourcing updates: We've received fresh stock of CRISPR enzyme kits. If any project teams at BITS Pilani need authorization or material resources, contact me directly. Let's build something bio-innovative!", likes: 8, liked: false, paper_link: "", channel: "BITS Pilani Chapter" },
            { author: "Dr. Rohan Malhotra", role: "researcher", time: "1 day ago", body: "AIIMS Delhi Chapter is hosting a clinical data hackathon next weekend. Research opportunities with clinicians will be open for top-performing students. Contact me if you have any questions or require clinical datasets for validation.", likes: 31, liked: false, paper_link: "", channel: "AIIMS Delhi Chapter" },
            { author: "Anjali Deshmukh", role: "student", time: "2 days ago", body: "Undergraduate cognitive surveys templates are now hosted in the NIMHANS Chapter repository. Students researching remote work burnout can access this dataset by clicking the resource links. Ping me for access credentials.", likes: 12, liked: false, paper_link: "", channel: "NIMHANS Chapter" }
        ];
        await supabase.from('feed').insert(initialFeed);

        // 6. Seed Sessions
        const initialSessions = [
            { student: "Riya Sen", topic: "Biotech Thesis Structure Feedback", date: "June 20, 2026 at 4:00 PM", platform: "Zoom", status: "Scheduled" },
            { student: "Kunal Ghosh", topic: "AI/ML Career Guidance Session", date: "June 22, 2026 at 11:00 AM", platform: "Google Meet", status: "Scheduled" }
        ];
        await supabase.from('mentorship_sessions').insert(initialSessions);

        // 7. Seed Verifications
        const initialVerifs = [
            { name: "Dr. Vikram Seth", type: "Researcher", affiliation: "IISc Bangalore", bio: "Genomics Research Fellow", status: "Pending" },
            { name: "Sneha Nair", type: "Mentor", affiliation: "MedTech Innovations", bio: "Regulatory Specialist", status: "Pending" }
        ];
        await supabase.from('verifications').insert(initialVerifs);

        // 8. Seed Courses
        const initialCourses = [
            { category: "Methodology", title: "Foundations of Research Methodology", duration: "4 weeks", modules: 8, progress: 80 },
            { category: "Statistics", title: "Biostatistics and Data Wrangling in R", duration: "6 weeks", modules: 12, progress: 25 },
            { category: "Scientific Writing", title: "Structuring High-Impact Journal Papers", duration: "3 weeks", modules: 6, progress: 0 },
            { category: "Academic Publishing", title: "Navigating Peer Review & Journal Selection", duration: "2 weeks", modules: 4, progress: 0 }
        ];
        await supabase.from('courses').insert(initialCourses);

        showToast("🎉 Database seeded successfully! Reloading...");
        await loadDataFromSupabase();
        renderAllPageContents();
    } catch (e) {
        console.error("Error seeding database:", e);
        showToast("❌ Seeding failed. Check console logs.");
    }
}

// --- SYNC CREDITS & STREAK ---
async function syncCreditsAndStreakToSupabase() {
    if (!supabase || !STATE.user.loggedIn) return;
    try {
        const { error } = await supabase.from('profiles').update({
            streak: STATE.user.streak,
            credits: STATE.user.credits
        }).eq('name', STATE.user.name);
        if (error) throw error;
    } catch (e) {
        console.error("Error syncing credits/streak:", e);
    }
}

// --- FILE UPLOAD TO STORAGE HELPERS ---
async function uploadAvatarImage(file) {
    if (!supabase) return null;
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { data, error } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (error) {
            console.warn("Storage upload failed (bucket might not exist or lacks permission):", error);
            return null;
        }

        const { data: publicUrlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        return publicUrlData.publicUrl;
    } catch (e) {
        console.error("Image upload error:", e);
        return null;
    }
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// --- DOM ELEMENTS REFERENCE ---
const DOM = {
    themeToggle: document.getElementById('theme-toggle'),
    roleSwitchBtns: document.querySelectorAll('.role-switch-btn'),
    profileForms: document.querySelectorAll('.profile-form'),
    actionPanels: document.querySelectorAll('.action-panel'),
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabViews: document.querySelectorAll('.tab-view'),
    
    // Website Router Navigation
    navRouteBtns: document.querySelectorAll('.nav-route-btn'),
    pageViews: document.querySelectorAll('.page-view'),
    navLogo: document.getElementById('nav-logo-click'),

    // Auth Modal Elements
    authModal: document.getElementById('auth-modal'),
    closeAuthBtn: document.getElementById('close-auth'),
    authStep1: document.getElementById('auth-step-1'),
    authStep2: document.getElementById('auth-step-2'),
    loginForm1: document.getElementById('login-form-1'),
    loginForm2: document.getElementById('login-form-2'),
    authEmail: document.getElementById('auth-email'),
    authPhone: document.getElementById('auth-phone'),
    otpTargetDisplay: document.getElementById('otp-target-display'),
    otpDigits: document.querySelectorAll('.otp-digit'),
    timerSeconds: document.getElementById('timer-seconds'),
    navLoginBtn: document.getElementById('nav-login-btn'),
    navLogoutBtn: document.getElementById('nav-logout-btn'),
    userBadge: document.getElementById('header-user-badge'),
    dropdownMenu: document.getElementById('profile-dropdown-menu'),
    headerUsername: document.getElementById('header-username'),
    headerAvatar: document.getElementById('header-avatar'),
    headerUserTag: document.getElementById('header-user-tag'),

    // Toast
    toast: document.getElementById('toast'),
    toastMsg: document.querySelector('.toast-msg'),

    // Profile Card
    profileCardTitle: document.getElementById('profile-card-title'),
    profileCardBadge: document.getElementById('profile-card-badge'),

    // Action Card
    actionCardTitle: document.getElementById('action-card-title'),
    actionCardBadge: document.getElementById('action-card-badge'),
    actionCardIcon: document.getElementById('action-card-icon'),
    filterPills: document.querySelectorAll('.filter-pill'),
    innerSearchInput: document.getElementById('search-input'),

    // Telemetry Card
    telemetryCardTitle: document.getElementById('telemetry-card-title'),
    telemetryCardSubTag: document.getElementById('telemetry-card-sub-tag'),
    tel1Name: document.getElementById('tel-1-name'),
    tel1Val: document.getElementById('tel-1-value'),
    tel1Progress: document.getElementById('tel-1-progress'),
    tel1Status: document.getElementById('tel-1-status'),
    tel2Name: document.getElementById('tel-2-name'),
    tel2Val: document.getElementById('tel-2-value'),
    tel2Progress: document.getElementById('tel-2-progress'),
    tel2Status: document.getElementById('tel-2-status'),
    tel3Name: document.getElementById('tel-3-name'),
    tel3Val: document.getElementById('tel-3-value'),
    tel3Progress: document.getElementById('tel-3-progress'),
    tel3Status: document.getElementById('tel-3-status'),
    tel4Name: document.getElementById('tel-4-name'),
    tel4Val: document.getElementById('tel-4-value'),
    tel4Progress: document.getElementById('tel-4-progress'),
    tel4Status: document.getElementById('tel-4-status'),
    microSectionTitle: document.getElementById('micro-section-title'),
    microTelemetryItems: document.getElementById('micro-telemetry-items'),
    dashboardInfoBanner: document.getElementById('dashboard-info-banner'),

    // Ledger / Main Card
    ledgerCardTitle: document.getElementById('ledger-card-title'),
    ledgerCardIcon: document.getElementById('ledger-card-icon'),
    ledgerBtn1: document.getElementById('ledger-btn-1'),
    ledgerBtn2: document.getElementById('ledger-btn-2'),
    opportunitiesTable: document.getElementById('opportunities-table'),
    opportunitiesList: document.getElementById('opportunities-list'),
    oppEmptyState: document.getElementById('opp-empty-state'),
    directoryList: document.getElementById('directory-list'),
    postsList: document.getElementById('posts-list'),
    learningCoursesList: document.getElementById('learning-courses-list'),
    innerPostInput: document.getElementById('post-input'),
    submitPostBtn: document.getElementById('submit-post'),

    // Main Tabs
    primaryTabBtn: document.getElementById('primary-tab-btn'),
    secondaryTabBtn: document.getElementById('secondary-tab-btn'),
    
    // Page-specific Lists & Search triggers
    globalOppsList: document.getElementById('global-opportunities-list'),
    globalDirectoryList: document.getElementById('global-directory-list'),
    globalPostsList: document.getElementById('global-posts-list'),
    globalPostInput: document.getElementById('global-post-input'),
    globalSubmitPostBtn: document.getElementById('global-submit-post'),
    feedPostAvatar: document.getElementById('feed-post-avatar'),

    // Forms
    studentProfileForm: document.getElementById('profile-form-student'),
    researcherProfileForm: document.getElementById('profile-form-researcher'),
    mentorProfileForm: document.getElementById('profile-form-mentor'),
    researcherActionPanel: document.getElementById('action-panel-researcher'),
    mentorActionPanel: document.getElementById('action-panel-mentor'),

    // Project Showcase Elements
    showcaseSearchInput: document.getElementById('showcase-search-input'),
    showcaseSortSelect: document.getElementById('showcase-sort-select'),
    showcaseCardsGrid: document.getElementById('showcase-cards-grid'),
    studentShowcasesList: document.getElementById('student-showcases-list'),
    studentShowcasesEmptyState: document.getElementById('student-showcases-empty-state'),
    supervisedShowcasesList: document.getElementById('supervised-showcases-list'),
    supervisedShowcasesEmptyState: document.getElementById('supervised-showcases-empty-state'),
    researcherShowcasesTab: document.getElementById('researcher-showcases-tab'),
    modalShowcaseForm: document.getElementById('modal-showcase-form'),
    showcaseInputMentor: document.getElementById('showcase-input-mentor'),
    showcaseInputInst: document.getElementById('showcase-input-inst')
};

function initPlaceholderTypingAnimation(input, phrases) {
    if (!input) return;
    
    let phraseIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;      // Typing speed in ms
    const deletingSpeed = 40;    // Backspacing speed in ms
    const delayBetweenPhrases = 2500; // Pause after typing phrase
    let timerId = null;
    
    function tick() {
        // If input has focus or has user input, pause typing animation
        if (document.activeElement === input || input.value) {
            timerId = setTimeout(tick, 500);
            return;
        }
        
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            characterIndex--;
            input.setAttribute('placeholder', currentPhrase.substring(0, characterIndex) + '|');
            
            if (characterIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                timerId = setTimeout(tick, 450); // Pause before next phrase
            } else {
                timerId = setTimeout(tick, deletingSpeed);
            }
        } else {
            characterIndex++;
            input.setAttribute('placeholder', currentPhrase.substring(0, characterIndex) + '|');
            
            if (characterIndex === currentPhrase.length) {
                isDeleting = true;
                // Remove typing cursor indicator before long pause
                input.setAttribute('placeholder', currentPhrase);
                timerId = setTimeout(tick, delayBetweenPhrases);
            } else {
                timerId = setTimeout(tick, typingSpeed);
            }
        }
    }
    
    // Save original placeholder
    const originalPlaceholder = input.getAttribute('placeholder') || 'Search...';
    input.setAttribute('data-original-placeholder', originalPlaceholder);
    
    // Pause animation instantly when input gains focus
    input.addEventListener('focus', () => {
        if (timerId) clearTimeout(timerId);
        input.setAttribute('placeholder', originalPlaceholder);
    });
    
    // Restart animation when input loses focus
    input.addEventListener('blur', () => {
        if (!input.value) {
            isDeleting = false;
            characterIndex = 0;
            tick();
        }
    });
    
    // Start typing
    tick();
}

// --- INITIALIZER ---
async function init() {
    setupEventListeners();
    loadTheme();
    
    if (supabase) {
        await loadDataFromSupabase();
        // Auto-seed if database is empty
        if (!STATE.allProfiles || STATE.allProfiles.length === 0) {
            console.log("Database is empty. Triggering automatic database seeding...");
            await seedSupabaseDatabase();
        }
        setupRealtimeFeed();
    } else {
        updateRealtimeStatusBadge('offline');
    }
    
    // Initialize auto-typing search input placeholders
    const oppSearch = document.getElementById('opportunities-search-trigger');
    const dirSearch = document.getElementById('directory-search-trigger');
    
    if (oppSearch) {
        initPlaceholderTypingAnimation(oppSearch, [
            "Search projects, skills, or PIs...",
            "Try 'CRISPR Biofuel'...",
            "Try 'Radiology Assistant'...",
            "Try 'PyTorch'...",
            "Try 'Dr. Samir Kalra'...",
            "Try '6 Months'..."
        ]);
    }
    
    if (dirSearch) {
        initPlaceholderTypingAnimation(dirSearch, [
            "Search names, institutes...",
            "Try 'Dr. Samir Kalra'...",
            "Try 'IIT Delhi'...",
            "Try 'NIMHANS'...",
            "Try 'Psychology'...",
            "Try 'Prof. Ananya Sen'..."
        ]);
    }
    
    switchView('home'); // Default view
    // Role and dashboard are set exclusively from Supabase session on login
}

// --- THEME MANAGEMENT ---
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    STATE.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    
    // Update button icon
    const icon = DOM.themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.className = 'fa-regular fa-sun';
    } else {
        icon.className = 'fa-regular fa-moon';
    }
    showToast(`Switched to ${newTheme} interface theme.`);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    STATE.theme = savedTheme;
    const icon = DOM.themeToggle.querySelector('i');
    if (savedTheme === 'dark') {
        icon.className = 'fa-regular fa-sun';
    } else {
        icon.className = 'fa-regular fa-moon';
    }
}

// --- ROUTER NAVIGATION CONTROLLER ---
function switchView(viewName) {
    // Dashboard requires authentication
    if (viewName === 'dashboard' && !STATE.user.loggedIn) {
        showToast('Sign in to access your workspace dashboard.');
        setTimeout(() => openAuthModal(), 300);
        return;
    }

    STATE.currentView = viewName;

    // Reset general state options
    STATE.searchQuery = '';
    
    // Reset global search bar elements values
    document.querySelectorAll('.global-search-trigger').forEach(inp => inp.value = '');
    if (DOM.innerSearchInput) DOM.innerSearchInput.value = '';

    // Update Header Active routes
    DOM.navRouteBtns.forEach(btn => {
        if (btn.getAttribute('data-view') === viewName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Toggle view elements visibility
    DOM.pageViews.forEach(view => {
        view.classList.remove('active');
    });
    
    const activeSection = document.getElementById(`view-${viewName}`);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Sync roles inside pages
    if (viewName === 'dashboard') {
        updateDashboardUI();
    }
    
    renderAllPageContents();
}

window.navigateToView = switchView; // Expose globally to inline calls

// --- NOTIFICATIONS (TOAST) ---
function showToast(message) {
    DOM.toastMsg.textContent = message;
    DOM.toast.classList.add('active');
    setTimeout(() => {
        DOM.toast.classList.remove('active');
    }, 3000);
}

// --- EVENT LISTENERS REGISTRATION ---
function setupEventListeners() {
    // Brand click back to Home
    DOM.navLogo.addEventListener('click', () => switchView('home'));

    // Theme Toggle
    DOM.themeToggle.addEventListener('click', toggleTheme);

    // Profile Dropdown Toggle
    DOM.userBadge.addEventListener('click', (e) => {
        e.stopPropagation();
        DOM.dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        DOM.dropdownMenu.classList.remove('active');
    });

    // Navigation Route Clicks
    DOM.navRouteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewName = btn.getAttribute('data-view');
            switchView(viewName);
        });
    });

    // Role Switch Buttons removed in production — role is set from Supabase profile

    // Nav login button
    if (DOM.navLoginBtn) {
        DOM.navLoginBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            DOM.dropdownMenu.classList.remove('active');
            openAuthModal('signin');
        });
    }

    // Search and filters triggers
    document.querySelectorAll('.global-search-trigger').forEach(trigger => {
        trigger.addEventListener('input', (e) => {
            STATE.searchQuery = e.target.value.trim().toLowerCase();
            renderAllPageContents();
        });
    });

    // Sidebar Inner Search triggers (Inside Student Dashboard)
    DOM.innerSearchInput.addEventListener('input', (e) => {
        STATE.searchQuery = e.target.value.trim().toLowerCase();
        renderDashboardTabLists();
    });

    // Sidebar Inner Filter pills (Inside Student Dashboard)
    DOM.filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            DOM.filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            STATE.selectedDomain = pill.getAttribute('data-domain');
            renderDashboardTabLists();
        });
    });

    // Opportunities page sidebar filters
    const vPills = document.querySelectorAll('.v-filter-pill');
    vPills.forEach(pill => {
        pill.addEventListener('click', () => {
            vPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            STATE.selectedDomain = pill.getAttribute('data-domain');
            renderGlobalOpportunities();
        });
    });

    // Community sidebar channel buttons click handler
    const channelBtns = document.querySelectorAll('.channel-btn');
    channelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            channelBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedChannel = btn.getAttribute('data-channel');
            STATE.activeChannel = selectedChannel;
            renderAllPageContents();
        });
    });

    // College chapters search and join logic
    const collegeSearchInput = document.getElementById('join-college-search');
    const collegeSearchResults = document.getElementById('college-search-results');
    
    if (collegeSearchInput && collegeSearchResults) {
        collegeSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (!query) {
                collegeSearchResults.style.display = 'none';
                return;
            }
            
            // Filter colleges matching the query
            const matches = INDIAN_COLLEGES_DATABASE.filter(c => 
                c.name.toLowerCase().includes(query) || 
                c.city.toLowerCase().includes(query) ||
                c.type.toLowerCase().includes(query)
            );
            
            if (matches.length === 0) {
                collegeSearchResults.innerHTML = `<div style="padding: 10px; font-size: 0.75rem; color: var(--text-muted); text-align: center;">No matching colleges found</div>`;
            } else {
                collegeSearchResults.innerHTML = '';
                matches.forEach(college => {
                    const div = document.createElement('div');
                    div.className = 'college-search-item';
                    
                    // Check if already joined
                    const chapterName = `${college.name} Chapter`;
                    const alreadyJoined = STATE.collegeChapters.some(c => c.name === chapterName);
                    
                    div.innerHTML = `
                        <div style="display: flex; flex-direction: column;">
                            <span style="font-weight: 700; color: var(--text-main);">${college.name}</span>
                            <span style="font-size: 0.65rem; color: var(--text-muted);">${college.city}</span>
                        </div>
                        <span class="college-meta-tag">${college.type}</span>
                    `;
                    
                    div.addEventListener('click', () => {
                        collegeSearchInput.value = '';
                        collegeSearchResults.style.display = 'none';
                        
                        if (alreadyJoined) {
                            showToast(`Already a member of ${chapterName}!`);
                            STATE.activeChannel = chapterName;
                            renderAllPageContents();
                            return;
                        }
                        
                        // Dynamically generate ambassador
                        const leadObj = generateAmbassadorForCollege(college);
                        
                        // Add new chapter
                        STATE.collegeChapters.push({
                            id: chapterName,
                            name: chapterName,
                            college: college.name,
                            lead: leadObj
                        });
                        
                        showToast(`Joined ${chapterName}! Ambassador ${leadObj.name} is online.`);
                        STATE.activeChannel = chapterName;
                        renderAllPageContents();
                    });
                    
                    collegeSearchResults.appendChild(div);
                });
            }
            collegeSearchResults.style.display = 'block';
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!collegeSearchInput.contains(e.target) && !collegeSearchResults.contains(e.target)) {
                collegeSearchResults.style.display = 'none';
            }
        });
    }

    // Tab Buttons inside dashboard
    DOM.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Authentication Modal triggers
    DOM.navLoginBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openAuthModal();
    });

    DOM.closeAuthBtn.addEventListener('click', closeAuthModal);

    // Modal role pills click
    const authRolePills = document.querySelectorAll('.role-pill');
    authRolePills.forEach(pill => {
        pill.addEventListener('click', () => {
            authRolePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            STATE.user.role = pill.getAttribute('data-auth-role');
        });
    });

    // Auth Step 1 Submit
    DOM.loginForm1.addEventListener('submit', (e) => {
        e.preventDefault();
        const contactMethod = DOM.authEmail.value || `+91 ${DOM.authPhone.value}`;
        if (!contactMethod) return;
        
        DOM.otpTargetDisplay.textContent = `Verification OTP sent to: ${contactMethod}`;
        DOM.authStep1.classList.remove('active');
        DOM.authStep2.classList.add('active');
        startOtpTimer();
    });

    // OTP Digit key focus
    DOM.otpDigits.forEach((digit, index) => {
        digit.addEventListener('keyup', (e) => {
            if (e.target.value.length === 1 && index < DOM.otpDigits.length - 1) {
                DOM.otpDigits[index + 1].focus();
            }
        });
    });

    // Auth Step 2 Submit
    DOM.loginForm2.addEventListener('submit', (e) => {
        e.preventDefault();
        STATE.user.loggedIn = true;
        STATE.user.email = DOM.authEmail.value;
        STATE.user.phone = DOM.authPhone.value;
        
        if (STATE.user.role === 'student') {
            STATE.user.name = "Aarav Gupta";
        } else if (STATE.user.role === 'researcher') {
            STATE.user.name = "Dr. Samir Kalra";
        } else if (STATE.user.role === 'mentor') {
            STATE.user.name = "Dr. Kabir Mehta";
        } else {
            STATE.user.name = "Administrator";
        }

        switchActiveRole(STATE.user.role);
        closeAuthModal();
        showToast(`Authenticated successfully as ${STATE.user.name}!`);
        switchView('dashboard');
    });

    // Profile updates
    DOM.studentProfileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const saveBtn = document.getElementById('student-profile-save-btn');
        setSavingState(saveBtn, true);

        const nameVal  = document.getElementById('student-name')?.value.trim() || STATE.user.name;
        STATE.user.name       = nameVal || STATE.user.name;
        STATE.user.age        = document.getElementById('student-age').value;
        STATE.user.gender     = document.getElementById('student-gender').value;
        STATE.user.college    = document.getElementById('student-college').value;
        STATE.user.institution = STATE.user.college;
        STATE.user.skills     = document.getElementById('student-skills').value;
        STATE.user.interests  = document.getElementById('student-activity').value;

        const skillsArray = STATE.user.skills ? STATE.user.skills.split(',').map(s => s.trim()).filter(s => s) : [];

        // Sync into allProfiles / directory in memory
        const memProfile = (STATE.allProfiles || []).find(p => p.role === 'student' || p.id?.toString() === STATE.user.id?.toString());
        if (memProfile) {
            memProfile.name        = STATE.user.name;
            memProfile.institution = STATE.user.institution;
            memProfile.skills      = skillsArray;
            memProfile.interests   = STATE.user.interests;
        }

        if (supabase) {
            try {
                const identifier = STATE.user.id;
                const payload = { 
                    name: STATE.user.name, 
                    institution: STATE.user.college, 
                    skills: skillsArray, 
                    interests: STATE.user.interests,
                    resume_url: STATE.user.resume_url || ''
                };
                const query = identifier
                    ? supabase.from('profiles').update(payload).eq('id', identifier)
                    : supabase.from('profiles').update(payload).eq('role', 'student');
                const { error } = await query;
                if (error) throw error;
                showToast("✅ Profile saved to registry!");
                await loadDataFromSupabase();
            } catch (err) {
                console.error("Error updating student profile:", err);
                showToast("Error saving changes. Check console.");
            }
        } else {
            showToast("✅ Demographic profile saved locally!");
        }

        setSavingState(saveBtn, false);
        updateProfileBadge();
        updateDashboardUI();
    });

    const modalStudentForm = document.getElementById('modal-student-profile-form');
    if (modalStudentForm) {
        modalStudentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            STATE.user.name = document.getElementById('modal-student-name').value;
            STATE.user.age = parseInt(document.getElementById('modal-student-age').value);
            STATE.user.gender = document.getElementById('modal-student-gender').value;
            const college = document.getElementById('modal-student-college').value;
            STATE.user.college = college;
            STATE.user.institution = college;
            STATE.user.interests = document.getElementById('modal-student-activity').value;
            STATE.user.skills = document.getElementById('modal-student-skills').value;
            
            // Sync to the demographic form fields in admin-workspace
            const ageInp = document.getElementById('student-age');
            const genInp = document.getElementById('student-gender');
            const colInp = document.getElementById('student-college');
            const skillInp = document.getElementById('student-skills');
            const actInp = document.getElementById('student-activity');
            
            if (ageInp) ageInp.value = STATE.user.age;
            if (genInp) genInp.value = STATE.user.gender;
            if (colInp) colInp.value = STATE.user.college;
            if (skillInp) skillInp.value = STATE.user.skills;
            if (actInp) actInp.value = STATE.user.interests;

            if (supabase) {
                try {
                    const skillsArray = STATE.user.skills ? STATE.user.skills.split(',').map(s => s.trim()).filter(s => s) : [];
                    const identifier = STATE.user.id;
                    const query = identifier ? 
                        supabase.from('profiles').update({
                            name: STATE.user.name,
                            institution: STATE.user.college,
                            skills: skillsArray,
                            interests: STATE.user.interests
                        }).eq('id', identifier) :
                        supabase.from('profiles').update({
                            name: STATE.user.name,
                            institution: STATE.user.college,
                            skills: skillsArray,
                            interests: STATE.user.interests
                        }).eq('role', 'student');
                    
                    const { error } = await query;
                    if (error) throw error;
                    showToast("Profile details updated successfully!");
                    await loadDataFromSupabase();
                } catch (err) {
                    console.error("Error updating student profile in Supabase:", err);
                    showToast("Error saving changes. Check console.");
                }
            } else {
                showToast("Profile details updated successfully!");
            }

            updateProfileBadge();
            closeStudentProfileModal();
            updateDashboardUI();
        });
    }

    // Resume/CV File Upload Handler
    const resumeFileInput = document.getElementById('student-resume-file');
    const resumeStatusEl = document.getElementById('student-resume-status');
    if (resumeFileInput) {
        resumeFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) {
                showToast("⚠️ File is too large. Limit is 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onload = function(evt) {
                STATE.user.resume_url = evt.target.result;
                if (resumeStatusEl) {
                    resumeStatusEl.textContent = `Uploaded: ${file.name}`;
                    resumeStatusEl.style.color = 'var(--color-emerald)';
                }
                showToast(`✅ Loaded: ${file.name}. Save details to update in Supabase.`);
            };
            reader.readAsDataURL(file);
        });
    }

    // Student Skill Assessment Quiz Submit Handler
    const quizForm = document.getElementById('student-assessment-quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const q1Val = quizForm.q1.value;
            const q2Val = quizForm.q2.value;
            const q3Val = quizForm.q3.value;
            const quizErrorEl = document.getElementById('quiz-error');
            
            if (quizErrorEl) {
                quizErrorEl.style.display = 'none';
                quizErrorEl.textContent = '';
            }

            // Q1 = b (CRISPR-Cas9), Q2 = a (Two-sample t-test), Q3 = a (To provide context and outline existing work)
            if (q1Val === 'b' && q2Val === 'a' && q3Val === 'a') {
                if (supabase) {
                    try {
                        const identifier = STATE.user.id;
                        const currentCredits = STATE.user.credits || 0;
                        const newCredits = currentCredits + 15;
                        
                        const { error } = await supabase.from('profiles')
                            .update({ 
                                quiz_completed: true,
                                credits: newCredits
                            })
                            .eq('id', identifier);
                        
                        if (error) throw error;
                        
                        STATE.user.quiz_completed = true;
                        STATE.user.credits = newCredits;
                        await loadDataFromSupabase();
                        showToast("🎉 Correct! You scored +15 credits!");
                        closeInfoModal('modal-student-quiz');
                        updateDashboardUI();
                    } catch (err) {
                        console.error("Error updating quiz state in Supabase:", err);
                        if (quizErrorEl) {
                            quizErrorEl.textContent = "Error saving results to database. Please try again.";
                            quizErrorEl.style.display = 'block';
                        }
                    }
                } else {
                    STATE.user.quiz_completed = true;
                    STATE.user.credits = (STATE.user.credits || 0) + 15;
                    showToast("🎉 Correct! (Mock) You scored +15 credits!");
                    closeInfoModal('modal-student-quiz');
                    updateDashboardUI();
                }
            } else {
                if (quizErrorEl) {
                    quizErrorEl.textContent = "❌ Incorrect answers. Please review and try again.";
                    quizErrorEl.style.display = 'block';
                }
            }
        });
    }


    const modalLeadForm = document.getElementById('modal-lead-contact-form');
    if (modalLeadForm) {
        modalLeadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const chapterId = document.getElementById('modal-lead-chapter-id').value;
            const chapter = STATE.collegeChapters.find(c => c.name === chapterId);
            if (!chapter) return;
            
            const lead = chapter.lead;
            const queryType = document.getElementById('modal-lead-query-type').value;
            const message = document.getElementById('modal-lead-message').value;
            
            // Push to STATE.leadInquiries
            const nextId = Math.max(...STATE.leadInquiries.map(i => i.id), 0) + 1;
            STATE.leadInquiries.push({
                id: nextId,
                leadName: lead.name,
                college: chapter.college,
                type: queryType,
                message: message,
                status: "Pending"
            });
            
            // Clear message input
            document.getElementById('modal-lead-message').value = '';
            
            closeContactLeadModal();
            showToast(`Inquiry sent successfully to Ambassador ${lead.name}!`);
            updateDashboardUI();
            renderAllPageContents();
        });
    }

    DOM.researcherProfileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (STATE.activeRole !== 'researcher' && STATE.activeRole !== 'admin') {
            showToast("Access Denied: Only Researchers or Admins can edit researcher details.");
            return;
        }

        const saveBtn = document.getElementById('researcher-profile-save-btn');
        setSavingState(saveBtn, true);

        const nameVal           = document.getElementById('res-name')?.value.trim();
        STATE.user.name         = nameVal || STATE.user.name;
        STATE.user.designation  = document.getElementById('res-designation').value;
        STATE.user.lab          = document.getElementById('res-lab').value;
        STATE.user.institution  = document.getElementById('res-inst').value;
        STATE.user.domain       = document.getElementById('res-domain').value;
        STATE.user.linkedin_url = document.getElementById('res-linkedin').value;
        STATE.user.research_bio   = document.getElementById('res-bio')?.value.trim() || '';
        STATE.user.google_scholar = document.getElementById('res-scholar')?.value.trim() || '';
        STATE.user.lab_website    = document.getElementById('res-website')?.value.trim() || '';
        const skillsRaw         = document.getElementById('res-skills')?.value || '';
        const skillsArray       = skillsRaw.split(',').map(s => s.trim()).filter(s => s);
        STATE.user.skills       = skillsRaw;

        // Sync in-memory profiles
        const memProfile = (STATE.allProfiles || []).find(p => p.id?.toString() === STATE.user.id?.toString() || p.role === 'researcher');
        if (memProfile) {
            memProfile.name         = STATE.user.name;
            memProfile.institution  = STATE.user.institution;
            memProfile.domain       = STATE.user.domain;
            memProfile.linkedin_url = STATE.user.linkedin_url;
            memProfile.skills       = skillsArray;
            memProfile.research_bio   = STATE.user.research_bio;
            memProfile.google_scholar = STATE.user.google_scholar;
            memProfile.lab_website    = STATE.user.lab_website;
        }
        const dirPerson = STATE.directory.find(d => d.name === STATE.user.name || d.role === 'researcher');
        if (dirPerson) {
            dirPerson.name         = STATE.user.name;
            dirPerson.institution  = STATE.user.institution;
            dirPerson.domain       = STATE.user.domain;
            dirPerson.linkedin_url = STATE.user.linkedin_url;
            dirPerson.skills       = skillsArray;
            dirPerson.research_bio   = STATE.user.research_bio;
            dirPerson.google_scholar = STATE.user.google_scholar;
            dirPerson.lab_website    = STATE.user.lab_website;
        }

        if (supabase) {
            try {
                const identifier = STATE.user.id;
                const payload = {
                    name:         STATE.user.name,
                    institution:  STATE.user.institution,
                    domain:       STATE.user.domain,
                    linkedin_url: STATE.user.linkedin_url,
                    skills:       skillsArray,
                    research_bio: STATE.user.research_bio || '',
                    google_scholar: STATE.user.google_scholar || '',
                    lab_website: STATE.user.lab_website || ''
                };
                const query = identifier
                    ? supabase.from('profiles').update(payload).eq('id', identifier)
                    : supabase.from('profiles').update(payload).eq('role', 'researcher');
                const { error } = await query;
                if (error) throw error;
                showToast("✅ Research profile saved successfully!");
                await loadDataFromSupabase();
            } catch (err) {
                console.error("Error updating researcher profile:", err);
                showToast("Error saving changes. Check console.");
            }
        } else {
            showToast("✅ Research lab credentials saved locally!");
        }

        setSavingState(saveBtn, false);
        updateProfileBadge();
        updateDashboardUI();
        renderAllPageContents();
    });

    DOM.mentorProfileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (STATE.activeRole !== 'mentor' && STATE.activeRole !== 'admin') {
            showToast("Access Denied: Only Mentors or Admins can edit mentorship details.");
            return;
        }

        const saveBtn = document.getElementById('mentor-profile-save-btn');
        setSavingState(saveBtn, true);

        const nameVal            = document.getElementById('mentor-name')?.value.trim();
        STATE.user.name          = nameVal || STATE.user.name;
        STATE.user.coreExpertise = document.getElementById('mentor-field').value;
        STATE.user.domain        = document.getElementById('mentor-field').value;
        STATE.user.institution   = document.getElementById('mentor-company').value;
        STATE.user.weeklyHours   = parseInt(document.getElementById('mentor-weekly-hours').value);
        STATE.user.linkedin_url  = document.getElementById('mentor-linkedin').value;
        const skillsRaw          = document.getElementById('mentor-skills')?.value || '';
        const skillsArray        = skillsRaw.split(',').map(s => s.trim()).filter(s => s);
        STATE.user.skills        = skillsRaw;

        // Sync in-memory profiles
        const memProfile = (STATE.allProfiles || []).find(p => p.id?.toString() === STATE.user.id?.toString() || p.role === 'mentor');
        if (memProfile) {
            memProfile.name         = STATE.user.name;
            memProfile.institution  = STATE.user.institution;
            memProfile.domain       = STATE.user.domain;
            memProfile.linkedin_url = STATE.user.linkedin_url;
            memProfile.skills       = skillsArray;
        }
        const dirPerson = STATE.directory.find(d => d.name === STATE.user.name || d.role === 'mentor');
        if (dirPerson) {
            dirPerson.name         = STATE.user.name;
            dirPerson.institution  = STATE.user.institution;
            dirPerson.domain       = STATE.user.domain;
            dirPerson.linkedin_url = STATE.user.linkedin_url;
            dirPerson.skills       = skillsArray;
        }

        if (supabase) {
            try {
                const identifier = STATE.user.id;
                const payload = {
                    name:         STATE.user.name,
                    institution:  STATE.user.institution,
                    domain:       STATE.user.domain,
                    linkedin_url: STATE.user.linkedin_url,
                    skills:       skillsArray
                };
                const query = identifier
                    ? supabase.from('profiles').update(payload).eq('id', identifier)
                    : supabase.from('profiles').update(payload).eq('role', 'mentor');
                const { error } = await query;
                if (error) throw error;
                showToast("✅ Mentorship profile saved successfully!");
                await loadDataFromSupabase();
            } catch (err) {
                console.error("Error updating mentor profile:", err);
                showToast("Error saving changes. Check console.");
            }
        } else {
            showToast("✅ Mentorship profile saved locally!");
        }

        setSavingState(saveBtn, false);
        updateProfileBadge();
        updateDashboardUI();
        renderAllPageContents();
    });

    // Researcher Project Publisher Flow
    DOM.researcherActionPanel.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!STATE.user.verified) {
            showToast("❌ Verification Required: Please request profile verification first.");
            return;
        }
        const title = document.getElementById('proj-title').value;
        const domain = document.getElementById('proj-domain').value;
        const size = parseInt(document.getElementById('proj-size').value);
        const duration = document.getElementById('proj-duration').value;
        const skills = document.getElementById('proj-skills').value;
        
        const type = document.getElementById('proj-type').value;
        const stipend = type === 'fellowship' ? document.getElementById('proj-stipend').value.trim() : '';
        const priceCredits = type === 'problem' ? (parseInt(document.getElementById('proj-bounty').value) || 0) : 0;
        
        const newProj = {
            title: title,
            researcher: STATE.user.loggedIn ? STATE.user.name : "Dr. Samir Kalra",
            lab: STATE.user.loggedIn ? STATE.user.institution : "BioAI Research Lab",
            domain: domain,
            skills: skills,
            duration: duration,
            slots: size,
            applied: false,
            type: type,
            stipend: stipend,
            price_credits: priceCredits
        };

        if (supabase) {
            const { error } = await supabase.from('opportunities').insert([newProj]);
            if (error) {
                showToast("❌ Failed to publish opportunity: " + error.message);
                return;
            }
        }

        showToast(`Opportunity '${title}' published successfully!`);
        DOM.researcherActionPanel.reset();
        
        // Hide conditional fields on reset
        const fellowshipExtra = document.getElementById('opp-fellowship-extra');
        const problemExtra = document.getElementById('opp-problem-extra');
        if (fellowshipExtra) fellowshipExtra.style.display = 'none';
        if (problemExtra) problemExtra.style.display = 'none';
        
        await loadDataFromSupabase();
        switchTab('opportunities');
        renderAllPageContents();
        updateDashboardUI();
    });

    // Mentor Schedule Session Flow
    DOM.mentorActionPanel.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!STATE.user.verified) {
            showToast("❌ Verification Required: Please request profile verification first.");
            return;
        }
        const title = document.getElementById('session-title').value;
        const type = document.getElementById('session-type').value;
        const dateInput = document.getElementById('session-date').value;
        const dateString = new Date(dateInput).toLocaleString();
        
        const pricing = document.getElementById('sess-pricing').value;
        const priceCredits = pricing === 'paid' ? (parseInt(document.getElementById('sess-price-val').value) || 0) : 0;
        const dbType = type === 'Research Consulting' ? 'consulting' : 'mentorship';
        
        const newSession = {
            student: "Open Reservation",
            topic: `${type}: ${title}`,
            date: dateString,
            platform: "Zoom Link Pending",
            status: "Scheduled",
            type: dbType,
            price_credits: priceCredits,
            mentor_name: STATE.user.name || "Dr. Kabir Mehta",
            mentor_id: STATE.user.supabaseUid || null
        };
        
        if (supabase) {
            const { error } = await supabase.from('mentorship_sessions').insert([newSession]);
            if (error) {
                showToast("❌ Failed to schedule session: " + error.message);
                return;
            }
        }

        showToast(`Session on '${title}' scheduled successfully!`);
        DOM.mentorActionPanel.reset();
        
        // Hide price field wrapper on reset
        const priceWrapper = document.getElementById('sess-price-wrapper');
        if (priceWrapper) priceWrapper.style.display = 'none';
        
        await loadDataFromSupabase();
        switchTab('opportunities');
        renderAllPageContents();
        updateDashboardUI();
    });

    // Dashboard post submission
    DOM.submitPostBtn.addEventListener('click', () => {
        const bodyText = DOM.innerPostInput.value.trim();
        if (!bodyText) return;
        submitNewPost(bodyText);
        DOM.innerPostInput.value = "";
    });

    // Global main feed post submission
    DOM.globalSubmitPostBtn.addEventListener('click', () => {
        const bodyText = DOM.globalPostInput.value.trim();
        if (!bodyText) return;
        submitNewPost(bodyText);
        DOM.globalPostInput.value = "";
    });

    // --- SHOWCASE EVENT LISTENERS ---
    if (DOM.showcaseSearchInput) {
        DOM.showcaseSearchInput.addEventListener('input', (e) => {
            STATE.showcaseSearchQuery = e.target.value.trim().toLowerCase();
            renderProjectShowcase();
        });
    }

    const showcasePills = document.querySelectorAll('[data-showcase-domain]');
    showcasePills.forEach(pill => {
        pill.addEventListener('click', () => {
            showcasePills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            STATE.showcaseSelectedDomain = pill.getAttribute('data-showcase-domain');
            renderProjectShowcase();
        });
    });

    if (DOM.showcaseSortSelect) {
        DOM.showcaseSortSelect.addEventListener('change', (e) => {
            STATE.showcaseSelectedSort = e.target.value;
            renderProjectShowcase();
        });
    }

    if (DOM.modalShowcaseForm) {
        DOM.modalShowcaseForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!requireAuth('Sign in to submit a project showcase.')) return;
            const title = document.getElementById('showcase-input-title').value;
            const domain = document.getElementById('showcase-input-domain').value;
            const publisher = document.getElementById('showcase-input-publisher').value;
            const mentorName = document.getElementById('showcase-input-mentor').value;
            const inst = document.getElementById('showcase-input-inst').value;
            const desc = document.getElementById('showcase-input-desc').value;
            const teamRaw = document.getElementById('showcase-input-team').value;
            const paperUrl = document.getElementById('showcase-input-paper').value;
            const demoUrl = document.getElementById('showcase-input-demo').value;

            // Parse team
            const team = teamRaw.split(',').map(member => {
                const parts = member.trim().split('(');
                const name = parts[0].trim();
                let role = "Collaborator";
                if (parts[1]) {
                    role = parts[1].replace(')', '').trim();
                }
                const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                return { name, role, avatar };
            });

            if (supabase) {
                try {
                    const { error } = await supabase.from('showcases').insert([{
                        title,
                        domain,
                        description: desc,
                        mentor: mentorName,
                        institution: inst,
                        publisher,
                        paper_link: paperUrl,
                        demo_link: demoUrl,
                        likes: 0,
                        liked: false,
                        team,
                        approved: false // Needs admin approval!
                    }]);
                    if (error) throw error;
                    showToast(`Showcase for '${title}' submitted for Admin review!`);
                } catch (err) {
                    console.error("Error inserting showcase:", err);
                    showToast("Error publishing showcase. Check console.");
                }
            } else {
                const nextId = STATE.showcases.length + 1;
                const newShowcase = {
                    id: nextId,
                    title,
                    domain,
                    description: desc,
                    mentor: mentorName,
                    institution: inst,
                    publisher,
                    paperLink: paperUrl,
                    demoLink: demoUrl,
                    likes: 0,
                    liked: false,
                    team,
                    approved: true // auto approved in local mock fallback
                };
                STATE.showcases.unshift(newShowcase);
                showToast(`Showcase for '${title}' successfully published!`);
            }
            
            DOM.modalShowcaseForm.reset();
            closeShowcaseSubmissionModal();
            if (supabase) {
                await loadDataFromSupabase();
            }
            renderProjectShowcase();
            updateDashboardUI();
        });

        // Sync mentor selecting to institution field
        if (DOM.showcaseInputMentor) {
            DOM.showcaseInputMentor.addEventListener('change', (e) => {
                const mentorName = e.target.value;
                const match = STATE.directory.find(d => d.name === mentorName);
                if (match && DOM.showcaseInputInst) {
                    DOM.showcaseInputInst.value = match.institution;
                }
            });
        }

        // Profile picture file upload change listeners
        document.querySelectorAll('.profile-file-input').forEach(input => {
            input.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                showToast("Uploading profile image...");
                let uploadedUrl = null;
                if (supabase) {
                    uploadedUrl = await uploadAvatarImage(file);
                }
                
                if (uploadedUrl) {
                    document.querySelectorAll('.avatar-upload-group').forEach(group => {
                        const preview = group.querySelector('.avatar-preview');
                        const status = group.querySelector('.file-status');
                        
                        if (preview) {
                            preview.innerHTML = `<img src="${uploadedUrl}" style="width:100%; height:100%; object-fit:cover;" />`;
                        }
                        if (status) {
                            status.textContent = file.name;
                        }
                    });
                    
                    saveProfileImage(uploadedUrl);
                    showToast("Profile image uploaded successfully!");
                } else {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const dataUrl = event.target.result;
                        
                        document.querySelectorAll('.avatar-upload-group').forEach(group => {
                            const preview = group.querySelector('.avatar-preview');
                            const status = group.querySelector('.file-status');
                            
                            if (preview) {
                                preview.innerHTML = `<img src="${dataUrl}" style="width:100%; height:100%; object-fit:cover;" />`;
                            }
                            if (status) {
                                status.textContent = file.name;
                            }
                        });
                        
                        saveProfileImage(dataUrl);
                        showToast("Profile image loaded successfully!");
                    };
                    reader.readAsDataURL(file);
                }
            });
        });

        // Supabase DB Seeding Trigger
        const seedBtn = document.getElementById('admin-seed-db-btn');
        if (seedBtn) {
            seedBtn.addEventListener('click', async () => {
                if (confirm("This will overwrite existing Supabase tables with initial mock data. Continue?")) {
                    await seedSupabaseDatabase();
                }
            });
        }

        // Admin Profile Search Trigger
        const adminUserSearch = document.getElementById('admin-user-search');
        if (adminUserSearch) {
            adminUserSearch.addEventListener('input', () => {
                renderAdminUsers();
            });
        }

        // Admin Profile Form Submission
        const adminUserForm = document.getElementById('admin-user-form');
        if (adminUserForm) {
            adminUserForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const id = document.getElementById('admin-user-id').value;
                const name = document.getElementById('admin-user-name').value;
                const role = document.getElementById('admin-user-role').value;
                const verified = document.getElementById('admin-user-verified').checked;
                const institution = document.getElementById('admin-user-institution').value;
                const domain = document.getElementById('admin-user-domain').value;
                const linkedin = document.getElementById('admin-user-linkedin').value;
                const skillsRaw = document.getElementById('admin-user-skills').value;
                const skills = skillsRaw.split(',').map(s => s.trim()).filter(s => s);
                
                showToast("Saving profile details...");
                
                const fileInput = document.getElementById('admin-avatar-file');
                let avatarUrl = '';
                
                if (id) {
                    const existing = (STATE.allProfiles || []).find(item => item.id.toString() === id.toString());
                    if (existing) avatarUrl = existing.avatar_url || '';
                }
                
                if (fileInput && fileInput.files && fileInput.files[0]) {
                    const file = fileInput.files[0];
                    let uploaded = null;
                    if (supabase) {
                        uploaded = await uploadAvatarImage(file);
                    }
                    if (uploaded) {
                        avatarUrl = uploaded;
                    } else {
                        const base64 = await fileToBase64(file);
                        avatarUrl = base64;
                    }
                }
                
                if (supabase) {
                    try {
                        const rowData = {
                            name,
                            role,
                            verified,
                            institution,
                            domain,
                            linkedin_url: linkedin,
                            avatar_url: avatarUrl,
                            skills
                        };
                        
                        if (id) {
                            const { error } = await supabase.from('profiles').update(rowData).eq('id', id);
                            if (error) throw error;
                            showToast("Profile updated successfully!");
                        } else {
                            const { error } = await supabase.from('profiles').insert([rowData]);
                            if (error) throw error;
                            showToast("Profile created successfully!");
                        }
                        
                        await loadDataFromSupabase();
                        updateDashboardUI();
                        renderAllPageContents();
                        closeAdminUserModal();
                    } catch (err) {
                        console.error("Error saving profile:", err);
                        showToast("Error saving profile details.");
                    }
                } else {
                    const rowData = {
                        id: id || (Math.max(...(STATE.allProfiles || []).map(p => parseInt(p.id) || 0)) + 1).toString(),
                        name,
                        role,
                        verified,
                        institution,
                        domain,
                        linkedin_url: linkedin,
                        avatar_url: avatarUrl,
                        avatarImg: avatarUrl,
                        skills,
                        connections: 0
                    };
                    
                    if (id) {
                        const idx = (STATE.allProfiles || []).findIndex(p => p.id.toString() === id.toString());
                        if (idx !== -1) STATE.allProfiles[idx] = rowData;
                        
                        const dirIdx = STATE.directory.findIndex(p => p.id?.toString() === id.toString());
                        if (dirIdx !== -1) {
                            if (role === 'mentor' || role === 'researcher') {
                                STATE.directory[dirIdx] = rowData;
                            } else {
                                STATE.directory.splice(dirIdx, 1);
                            }
                        } else if (role === 'mentor' || role === 'researcher') {
                            STATE.directory.push(rowData);
                        }
                    } else {
                        STATE.allProfiles.push(rowData);
                        if (role === 'mentor' || role === 'researcher') {
                            STATE.directory.push(rowData);
                        }
                    }
                    
                    showToast("Profile saved successfully!");
                    updateDashboardUI();
                    renderAllPageContents();
                    closeAdminUserModal();
                }
            });
        }

        // Admin Avatar File Selection Preview
        const adminAvatarFile = document.getElementById('admin-avatar-file');
        if (adminAvatarFile) {
            adminAvatarFile.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const preview = document.getElementById('admin-avatar-preview');
                const status = document.getElementById('admin-file-status');
                
                if (status) status.textContent = file.name;
                
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (preview) {
                        preview.innerHTML = `<img src="${event.target.result}" style="width:100%; height:100%; object-fit:cover;" />`;
                    }
                };
                reader.readAsDataURL(file);
            });
        }

        // Course Creator Form Submit Handler
        const createCourseForm = document.getElementById('create-course-form');
        if (createCourseForm) {
            createCourseForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (!STATE.user.verified) {
                    showToast("❌ Verification Required: Please request profile verification first.");
                    return;
                }
                const title = document.getElementById('course-title').value.trim();
                const category = document.getElementById('course-category').value;
                const duration = document.getElementById('course-duration').value.trim();
                const modules = parseInt(document.getElementById('course-modules').value);
                const isPaid = document.getElementById('course-is-paid').checked;
                const priceCredits = isPaid ? (parseInt(document.getElementById('course-price').value) || 0) : 0;

                if (!title || !duration || !modules) return;

                const submitBtn = e.target.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Publishing...';
                }

                try {
                    const newCourse = {
                        category,
                        title,
                        duration,
                        modules,
                        progress: 0,
                        creator_name: STATE.user.name,
                        creator_id: STATE.user.supabaseUid || null,
                        is_paid: isPaid,
                        price_credits: priceCredits
                    };

                    if (supabase) {
                        const { error } = await supabase.from('courses').insert([newCourse]);
                        if (error) throw error;
                    }

                    showToast(`🎉 Course '${title}' published successfully!`);
                    createCourseForm.reset();
                    await loadDataFromSupabase();
                    updateDashboardUI();
                    renderAllPageContents();
                } catch (err) {
                    console.error("Error creating course:", err);
                    showToast("❌ Failed to publish course: " + err.message);
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Publish Course';
                    }
                }
            });
        }
    }
}



async function submitNewPost(text) {
    if (!requireAuth('Sign in to post to the community feed.')) return;

    const authorName = STATE.user.name;
    const authorRole = STATE.activeRole;
    const channel = STATE.activeChannel;

    try {
        const { error } = await supabase.from('feed').insert([{
            author: authorName,
            role: authorRole,
            time: 'Just now',
            body: text,
            likes: 0,
            liked: false,
            paper_link: '',
            channel: channel
        }]);
        if (error) throw error;
        showToast('Update posted to community feed!');
    } catch (err) {
        console.error('Error posting to feed:', err);
        showToast('Error posting update. Please try again.');
    }
}

// ─── AUTH GUARD ─────────────────────────────────────────────────────────────
// Call before any write action. Opens auth modal and returns false if not logged in.
function requireAuth(promptMsg = 'Please sign in to continue.') {
    if (STATE.user.loggedIn) return true;
    showToast(promptMsg);
    setTimeout(() => openAuthModal(), 300);
    return false;
}

// ─── OPEN AUTH MODAL HELPER (exposed globally for HTML onclick calls) ─────────
window.openAuthModal = function(tab = 'signin') {
    const modal = document.getElementById('real-auth-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        switchAuthTab(tab);
    }
};

// --- OTP TIMER ---
let otpTimerInterval;
function startOtpTimer() {
    let secondsLeft = 59;
    DOM.timerSeconds.textContent = secondsLeft;
    clearInterval(otpTimerInterval);
    otpTimerInterval = setInterval(() => {
        secondsLeft--;
        DOM.timerSeconds.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(otpTimerInterval);
            DOM.timerSeconds.parentElement.innerHTML = '<a href="#" style="color:var(--color-primary);font-weight:700;">Resend OTP Now</a>';
        }
    }, 1000);
}

function openAuthModal() {
    // Open the real Supabase auth modal instead of the legacy mock
    const modal = document.getElementById('real-auth-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        switchAuthTab('signin');
    }
}

function closeAuthModal() {
    const modal = document.getElementById('real-auth-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    // Also close legacy modal just in case
    if (DOM.authModal) {
        DOM.authModal.classList.remove('active');
        DOM.authModal.style.display = 'none';
    }
    clearInterval(otpTimerInterval);
}

// ─── REAL SUPABASE AUTH SYSTEM ────────────────────────────────────────────────

window.switchAuthTab = function(tab) {
    document.querySelectorAll('.real-auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.real-auth-panel').forEach(p => p.classList.remove('active'));
    const tabBtn = document.querySelector(`.real-auth-tab[data-tab="${tab}"]`);
    const panel = document.getElementById(`panel-${tab}`);
    if (tabBtn) tabBtn.classList.add('active');
    if (panel) panel.classList.add('active');
};

window.togglePwdVisibility = function(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    const icon = btn.querySelector('i');
    if (icon) {
        icon.className = isPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    }
};

function setAuthLoading(formId, loading) {
    const form = document.getElementById(formId);
    if (!form) return;
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    const textEl = submitBtn.querySelector('.btn-text');
    const loadEl = submitBtn.querySelector('.btn-loading');
    if (textEl) textEl.style.display = loading ? 'none' : '';
    if (loadEl) loadEl.style.display = loading ? '' : 'none';
    submitBtn.disabled = loading;
}

function showAuthError(errorDivId, msg) {
    const el = document.getElementById(errorDivId);
    if (el) { el.textContent = msg; el.style.display = msg ? 'block' : 'none'; }
}

async function handleRealAuthSession(session) {
    if (!session || !session.user) return;
    const user = session.user;

    // Try to load existing profile
    if (supabase) {
        try {
            let { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (error || !profile) {
                // Profile doesn't exist yet — create one with defaults from user metadata
                const meta = user.user_metadata || {};
                const refCode = meta.referral_code || '';
                const baseCredits = (refCode && refCode.trim() !== '') ? 75 : 50;

                // Generate a personal ambassador code
                const nameClean = (meta.full_name || 'USER').replace(/[^a-zA-Z0-9]/g, '').substring(0, 4).toUpperCase();
                const randomDigits = Math.floor(100 + Math.random() * 900);
                const personalAmbCode = `AMB-${nameClean}-${randomDigits}`;

                const newProfile = {
                    user_id: user.id,
                    email: user.email || '',
                    name: meta.full_name || meta.name || user.email?.split('@')[0] || 'BioLabs User',
                    role: meta.role || 'student',
                    institution: meta.institution || 'Independent Researcher',
                    domain: 'General Research',
                    verified: false,
                    skills: [],
                    interests: '',
                    streak: 1,
                    credits: baseCredits,
                    referred_by_code: refCode,
                    personal_ambassador_code: personalAmbCode
                };

                const { data: created } = await supabase.from('profiles').insert([newProfile]).select().single();
                profile = created || newProfile;
            }

            // Populate STATE from real profile
            STATE.user.loggedIn = true;
            STATE.user.id = profile.id;
            STATE.user.supabaseUid = user.id;
            STATE.user.email = user.email;
            STATE.user.name = profile.name;
            STATE.user.role = profile.role;
            STATE.user.institution = profile.institution;
            STATE.user.skills = profile.skills || [];
            STATE.user.credits = profile.credits || 50;
            STATE.user.streak = profile.streak || 1;
            STATE.user.avatarUrl = profile.avatar_url || '';
            STATE.user.verified = profile.verified || false;
            STATE.user.referred_by_code = profile.referred_by_code || '';
            STATE.user.personal_ambassador_code = profile.personal_ambassador_code || '';
            STATE.user.resume_url = profile.resume_url || '';
            STATE.user.quiz_completed = profile.quiz_completed || false;
            STATE.user.research_bio = profile.research_bio || '';
            STATE.user.google_scholar = profile.google_scholar || '';
            STATE.user.lab_website = profile.lab_website || '';

            switchActiveRole(profile.role);
            closeAuthModal();
            showToast(`Welcome back, ${profile.name}!`);
            switchView('dashboard');
            updateDashboardUI();
            renderAllPageContents();

            // Insert login log to trigger login email once per browser session
            const sessionKey = 'biolabs_login_logged_' + user.id;
            if (!sessionStorage.getItem(sessionKey)) {
                sessionStorage.setItem(sessionKey, 'true');
                supabase.from('logins').insert([{
                    user_id: user.id,
                    email: user.email || '',
                    name: profile.name
                }]).then(({ error }) => {
                    if (error) console.error('Error logging login event:', error);
                });
            }

        } catch (err) {
            console.error('Auth session handler error:', err);
        }
    }
}

// ── Close real auth modal on backdrop click
document.getElementById('real-auth-modal')?.addEventListener('click', function(e) {
    if (e.target === this) closeAuthModal();
});

document.getElementById('real-close-auth')?.addEventListener('click', closeAuthModal);

// ── Tab switching
document.querySelectorAll('.real-auth-tab').forEach(btn => {
    btn.addEventListener('click', () => switchAuthTab(btn.getAttribute('data-tab')));
});

// ── SIGN IN form
document.getElementById('real-signin-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!supabase) { showToast('Auth not configured — Supabase key missing.'); return; }
    showAuthError('signin-error', '');
    setAuthLoading('real-signin-form', true);

    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await handleRealAuthSession(data.session);
    } catch (err) {
        showAuthError('signin-error', err.message || 'Sign in failed. Check your email and password.');
    } finally {
        setAuthLoading('real-signin-form', false);
    }
});

// ── SIGN UP form
document.getElementById('real-signup-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!supabase) { showToast('Auth not configured — Supabase key missing.'); return; }
    showAuthError('signup-error', '');
    setAuthLoading('real-signup-form', true);

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;
    const institution = document.getElementById('signup-institution').value.trim();
    const referralCode = document.getElementById('signup-referral')?.value.trim() || '';

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name, role, institution, referral_code: referralCode }
            }
        });
        if (error) throw error;

        if (data.session) {
            // Email confirmations disabled — user is logged in directly
            await handleRealAuthSession(data.session);
        } else {
            // Email confirmation required
            const display = document.getElementById('confirm-email-display');
            if (display) display.textContent = email;
            switchAuthTab('confirm');
        }
    } catch (err) {
        showAuthError('signup-error', err.message || 'Sign up failed. Please try again.');
    } finally {
        setAuthLoading('real-signup-form', false);
    }
});

// ── MAGIC LINK form
document.getElementById('real-magic-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!supabase) { showToast('Auth not configured — Supabase key missing.'); return; }
    showAuthError('magic-error', '');
    document.getElementById('magic-success').style.display = 'none';
    setAuthLoading('real-magic-form', true);

    const email = document.getElementById('magic-email').value.trim();

    try {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: true }
        });
        if (error) throw error;
        document.getElementById('magic-success').style.display = 'block';
        document.getElementById('magic-email').value = '';
    } catch (err) {
        showAuthError('magic-error', err.message || 'Failed to send magic link.');
    } finally {
        setAuthLoading('real-magic-form', false);
    }
});

// ── LOGOUT
window.realLogout = async function() {
    if (supabase) {
        try {
            await supabase.auth.signOut();
        } catch(e) { console.warn('Signout error:', e); }
    }
    STATE.user = { loggedIn: false, name: '', email: '', role: 'student', id: null, supabaseUid: null };
    switchActiveRole('student');
    switchView('home');
    showToast('You have been signed out.');
    updateDashboardUI();
    renderAllPageContents();
};

// ── Restore session on page load + listen for auth changes
if (supabase) {
    supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state change:', event);
        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
            if (!STATE.user.loggedIn) {
                await handleRealAuthSession(session);
            }
        } else if (event === 'SIGNED_OUT') {
            STATE.user.loggedIn = false;
            updateDashboardUI();
        }
    });

    // Restore session on reload
    supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session && !STATE.user.loggedIn) {
            await handleRealAuthSession(session);
        }
    });
}

// ─── SUPABASE REALTIME COMMUNITY CHAT SYSTEM ──────────────────────────────────
let realtimeChannel = null;

function updateRealtimeStatusBadge(status) {
    const dot = document.getElementById('live-chat-dot');
    const text = document.getElementById('live-status-text');
    if (!dot || !text) return;

    if (status === 'SUBSCRIBED') {
        dot.style.backgroundColor = '#10b981';
        dot.className = 'live-dot pulsate';
        text.textContent = 'Live Chat Synced — Zero Latency Sync';
    } else if (status === 'offline') {
        dot.style.backgroundColor = '#6b7280';
        dot.className = 'live-dot';
        text.textContent = 'Database Offline — Reconnecting...';
    } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'closed') {
        dot.style.backgroundColor = '#ef4444';
        dot.className = 'live-dot';
        text.textContent = 'Connection Interrupted — Retrying...';
    } else {
        dot.style.backgroundColor = '#eab308';
        dot.className = 'live-dot pulsate';
        text.textContent = 'Establishing live database stream...';
    }
}

function handleRealtimeFeedChange(payload) {
    const { eventType, new: newRec, old: oldRec } = payload;
    console.log(`[Realtime Feed Change]: ${eventType}`, payload);

    if (eventType === 'INSERT') {
        const newPost = {
            id: newRec.id,
            author: newRec.author,
            role: newRec.role,
            time: newRec.time || "Just now",
            body: newRec.body,
            likes: newRec.likes || 0,
            liked: newRec.liked || false,
            paperLink: newRec.paper_link || "",
            channel: newRec.channel
        };
        // Avoid duplicate insertion
        if (!STATE.feed.some(p => p.id === newPost.id)) {
            STATE.feed.unshift(newPost);
            
            // Sort by id descending just in case order is not maintained
            STATE.feed.sort((a, b) => b.id - a.id);
        }
    } else if (eventType === 'UPDATE') {
        const index = STATE.feed.findIndex(p => p.id === newRec.id);
        if (index !== -1) {
            STATE.feed[index] = {
                ...STATE.feed[index],
                author: newRec.author,
                role: newRec.role,
                body: newRec.body,
                likes: newRec.likes,
                paperLink: newRec.paper_link,
                channel: newRec.channel
            };
        }
    } else if (eventType === 'DELETE') {
        STATE.feed = STATE.feed.filter(p => p.id !== oldRec.id);
    }

    renderGlobalPosts();
    renderDashboardFeed();
}

function setupRealtimeFeed() {
    if (!supabase) {
        updateRealtimeStatusBadge('offline');
        return;
    }

    if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel);
    }

    updateRealtimeStatusBadge('connecting');

    realtimeChannel = supabase
        .channel('public-feed-changes')
        .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'feed' },
            (payload) => {
                handleRealtimeFeedChange(payload);
            }
        )
        .subscribe((status) => {
            console.log(`Realtime feed channel subscription status: ${status}`);
            updateRealtimeStatusBadge(status);
        });
}




// --- SVG TEMPLATE ASSETS FOR FLIPPING CARDS ---
const ASSETS = {
    faces: {
        "Dr. Samir Kalra": `<svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="50" fill="#f0fdf4"/>
            <circle cx="50" cy="40" r="22" fill="#fed7aa"/>
            <rect x="35" y="58" width="30" height="25" rx="5" fill="#1e293b"/>
            <path d="M30,32 Q50,15 70,32" fill="none" stroke="#334155" stroke-width="4" />
            <circle cx="43" cy="38" r="6" fill="none" stroke="#0f172a" stroke-width="2"/>
            <circle cx="57" cy="38" r="6" fill="none" stroke="#0f172a" stroke-width="2"/>
            <line x1="49" y1="38" x2="51" y2="38" stroke="#0f172a" stroke-width="2"/>
            <path d="M45,48 Q50,53 55,48" fill="none" stroke="#0f172a" stroke-width="2"/>
        </svg>`,
        "Prof. Ananya Sen": `<svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="50" fill="#f5f3ff"/>
            <circle cx="50" cy="40" r="21" fill="#ffedd5"/>
            <rect x="35" y="58" width="30" height="25" rx="5" fill="#0d9488"/>
            <path d="M28,45 Q26,20 50,18 Q74,20 72,45" fill="none" stroke="#1e1b4b" stroke-width="6"/>
            <rect x="37" y="34" width="10" height="8" rx="2" fill="none" stroke="#0f172a" stroke-width="2"/>
            <rect x="53" y="34" width="10" height="8" rx="2" fill="none" stroke="#0f172a" stroke-width="2"/>
            <line x1="47" y1="38" x2="53" y2="38" stroke="#0f172a" stroke-width="2"/>
            <path d="M46,49 Q50,53 54,49" fill="none" stroke="#0f172a" stroke-width="2"/>
        </svg>`,
        "Dr. Kabir Mehta": `<svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="50" fill="#eff6ff"/>
            <circle cx="50" cy="40" r="22" fill="#ffedd5"/>
            <rect x="35" y="58" width="30" height="25" rx="5" fill="#475569"/>
            <path d="M30,30 Q50,22 70,30" fill="none" stroke="#1e293b" stroke-width="5"/>
            <path d="M44,48 Q50,54 56,48" fill="none" stroke="#0f172a" stroke-width="2"/>
        </svg>`,
        "Rahul Sharma": `<svg viewBox="0 0 100 100" width="100%" height="100%">
            <circle cx="50" cy="50" r="50" fill="#fff7ed"/>
            <circle cx="50" cy="40" r="22" fill="#fed7aa"/>
            <rect x="35" y="58" width="30" height="25" rx="5" fill="#1e3a8a"/>
            <path d="M28,34 Q50,18 72,34" fill="none" stroke="#1e293b" stroke-width="6"/>
            <path d="M44,48 Q50,54 56,48" fill="none" stroke="#0f172a" stroke-width="2"/>
        </svg>`
    },
    logos: {
        "Dr. Samir Kalra": `<svg viewBox="0 0 100 100" width="80%" height="80%">
            <rect x="25" y="15" width="50" height="70" rx="10" fill="#ef4444"/>
            <rect x="44" y="25" width="12" height="50" fill="#ffffff"/>
            <rect x="25" y="44" width="50" height="12" fill="#ffffff"/>
            <circle cx="50" cy="50" r="10" fill="#ef4444"/>
            <text x="50" y="80" text-anchor="middle" fill="#ffffff" font-family="Space Grotesk" font-size="8" font-weight="bold">AIIMS</text>
        </svg>`,
        "Prof. Ananya Sen": `<svg viewBox="0 0 100 100" width="80%" height="80%">
            <circle cx="50" cy="50" r="35" fill="none" stroke="#d97706" stroke-width="6" stroke-dasharray="10 5"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="#d97706" stroke-width="2"/>
            <circle cx="50" cy="50" r="20" fill="#eff6ff"/>
            <ellipse cx="50" cy="50" rx="18" ry="6" fill="none" stroke="#1e3a8a" stroke-width="1.5" transform="rotate(30 50 50)"/>
            <ellipse cx="50" cy="50" rx="18" ry="6" fill="none" stroke="#1e3a8a" stroke-width="1.5" transform="rotate(150 50 50)"/>
            <circle cx="50" cy="50" r="4" fill="#ef4444"/>
            <text x="50" y="94" text-anchor="middle" fill="#d97706" font-family="Space Grotesk" font-size="9" font-weight="bold">IIT</text>
        </svg>`,
        "Dr. Kabir Mehta": `<svg viewBox="0 0 100 100" width="80%" height="80%">
            <circle cx="50" cy="50" r="45" fill="#f3f4f6"/>
            <path d="M48,25 Q30,25 32,45 Q30,60 40,65 Q44,70 48,70 Q48,25 48,25" fill="#8b5cf6" opacity="0.8"/>
            <path d="M52,25 Q70,25 68,45 Q70,60 60,65 Q56,70 52,70 Q52,25 52,25" fill="#a78bfa" opacity="0.8"/>
            <path d="M40,45 Q50,30 60,45" fill="none" stroke="#ffffff" stroke-width="2"/>
            <path d="M36,55 Q50,45 64,55" fill="none" stroke="#ffffff" stroke-width="2"/>
            <text x="50" y="88" text-anchor="middle" fill="#581c87" font-family="Space Grotesk" font-size="8" font-weight="bold">NIMHANS</text>
        </svg>`,
        "Rahul Sharma": `<svg viewBox="0 0 100 100" width="80%" height="80%">
            <circle cx="50" cy="50" r="45" fill="#f0fdf4"/>
            <path d="M30,35 Q50,65 70,35" fill="none" stroke="#10b981" stroke-width="3"/>
            <path d="M30,65 Q50,35 70,65" fill="none" stroke="#059669" stroke-width="3"/>
            <line x1="40" y1="46" x2="40" y2="54" stroke="#4b5563" stroke-width="2"/>
            <line x1="50" y1="50" x2="50" y2="50" stroke="#4b5563" stroke-width="2"/>
            <line x1="60" y1="46" x2="60" y2="54" stroke="#4b5563" stroke-width="2"/>
            <path d="M50,15 Q65,15 65,30 Q50,35 50,15" fill="#34d399"/>
            <text x="50" y="85" text-anchor="middle" fill="#047857" font-family="Space Grotesk" font-size="7" font-weight="bold">BIOGENICS</text>
        </svg>`
    }
};

function getMentorCardHtml(person) {
    const name = person.name;
    const role = (person.role || 'mentor');
    const institution = person.institution;
    const domain = person.domain.toUpperCase();
    const connections = person.connections || 0;
    const streak = person.streak || 0;
    const skills = person.skills || [];
    const interests = person.interests || '';
    const linkedin = person.linkedin_url || '';
    
    let faceHtml = '';
    if (person.avatarImg) {
        faceHtml = `<img src="${person.avatarImg}" style="width: 100%; height: 100%; object-fit: cover;" />`;
    } else {
        faceHtml = ASSETS.faces[name] || getFaceSvgFallback(name.charAt(0));
    }
    
    // Skills HTML pills
    let skillsHtml = skills.map(skill => `<span class="card-skill-tag">${skill}</span>`).join('');
    if (skills.length === 0) {
        skillsHtml = '<span class="card-skill-tag">General Research</span>';
    }

    // Role styling
    let roleClass = 'role-student';
    if (role === 'researcher') roleClass = 'role-researcher';
    else if (role === 'mentor') roleClass = 'role-mentor';
    else if (role === 'admin') roleClass = 'role-admin';

    // LinkedIn Button
    const linkedinBtn = linkedin ? `
        <a href="${linkedin}" target="_blank" class="card-linkedin-btn" onclick="event.stopPropagation();">
            <i class="fa-brands fa-linkedin"></i> LinkedIn
        </a>
    ` : `
        <span class="card-no-linkedin">
            <i class="fa-solid fa-circle-check text-green"></i> Verified Scholar
        </span>
    `;

    return `
        <div class="mentor-premium-card-container">
            <div class="mentor-premium-card-inner">
                
                <!-- CARD FRONT -->
                <div class="mentor-premium-card-front">
                    <!-- Concentric Glowing Ring Avatar -->
                    <div class="avatar-ring-container">
                        <div class="avatar-ring-glow"></div>
                        <div class="avatar-img-wrapper">
                            ${faceHtml}
                        </div>
                    </div>
                    
                    <span class="card-role-tag ${roleClass}">${role.toUpperCase()}</span>
                    
                    <h3 class="card-name">${name}</h3>
                    
                    <div class="card-institution">
                        <i class="fa-solid fa-building-columns"></i> ${institution}
                    </div>
                    
                    <span class="card-domain-badge">${domain}</span>
                    
                    <button class="card-action-btn" onclick="event.stopPropagation(); connectUser('${name}');">
                        <i class="fa-solid fa-user-plus"></i> Connect Network
                    </button>
                    
                    <div class="card-flip-hint">
                        <span>Reveal Expertise</span> <i class="fa-solid fa-share" style="transform: rotate(90deg); font-size: 0.65rem;"></i>
                    </div>
                </div>
                
                <!-- CARD BACK -->
                <div class="mentor-premium-card-back">
                    <div class="card-back-header">
                        <div class="card-back-avatar">
                            ${faceHtml}
                        </div>
                        <div class="card-back-meta">
                            <h4>${name}</h4>
                            <span>${institution}</span>
                        </div>
                    </div>
                    
                    <div class="card-back-divider"></div>
                    
                    <div class="card-back-section">
                        <div class="section-title"><i class="fa-solid fa-award" style="color:var(--color-purple);"></i> Core Expertise</div>
                        <div class="card-skills-grid">
                            ${skillsHtml}
                        </div>
                    </div>
                    
                    ${interests ? `
                    <div class="card-back-section">
                        <div class="section-title"><i class="fa-solid fa-lightbulb" style="color:var(--color-yellow);"></i> Research Focus</div>
                        <p class="card-interests-text">"${interests}"</p>
                    </div>
                    ` : ''}
                    
                    <div class="card-back-stats">
                        <div class="stat-item">
                            <i class="fa-solid fa-users text-green"></i>
                            <div>
                                <strong>${connections}</strong>
                                <span>Network</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <i class="fa-solid fa-fire text-orange"></i>
                            <div>
                                <strong>${streak}d</strong>
                                <span>Streak</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-back-footer">
                        ${linkedinBtn}
                    </div>
                </div>
                
            </div>
        </div>
    `;
}

function getFaceSvgFallback(initial) {
    return `<svg viewBox="0 0 100 100" width="100%" height="100%">
        <circle cx="50" cy="50" r="50" fill="var(--color-primary-bg)"/>
        <text x="50" y="62" text-anchor="middle" fill="var(--color-primary)" font-family="Space Grotesk" font-size="36" font-weight="bold">${initial}</text>
    </svg>`;
}

function getLogoSvgFallback(name) {
    const cleanName = name.split(' ')[0].toUpperCase();
    return `<svg viewBox="0 0 100 100" width="80%" height="80%">
        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-primary)" stroke-width="2"/>
        <text x="50" y="56" text-anchor="middle" fill="var(--color-primary)" font-family="Space Grotesk" font-size="12" font-weight="bold">${cleanName}</text>
    </svg>`;
}

// --- SWITCH DASHBOARD ACTIVE ROLE ---
function switchActiveRole(role) {
    STATE.activeRole = role;

    // Only sync profile data if actually logged in (no mock name injection)
    if (STATE.user.loggedIn && STATE.allProfiles && STATE.allProfiles.length > 0) {
        const p = STATE.allProfiles.find(item => item.id === STATE.user.id);
        if (p) {
            STATE.user.institution  = p.institution;
            STATE.user.streak       = p.streak;
            STATE.user.credits      = p.credits;
            STATE.user.skills       = (p.skills || []).join(', ');
            STATE.user.avatarImg    = p.avatar_url || '';
            STATE.user.linkedin_url = p.linkedin_url || '';
            STATE.user.research_bio   = p.research_bio || '';
            STATE.user.google_scholar = p.google_scholar || '';
            STATE.user.lab_website    = p.lab_website || '';
        }
    }
    
    // Role-switch buttons removed in production — role is fixed from Supabase profile

    updateProfileBadge();

    // Toggle Left column forms
    DOM.profileForms.forEach(form => {
        form.classList.remove('active-form');
    });
    document.getElementById(`profile-form-${role}`).classList.add('active-form');

    // Toggle Left column actions
    DOM.actionPanels.forEach(panel => {
        panel.classList.remove('active-panel');
    });
    const targetActionPanel = document.getElementById(`action-panel-${role}`);
    if (targetActionPanel) {
        targetActionPanel.classList.add('active-panel');
    }

    updateCardHeadersText(role);
    updateDashboardUI();
    renderAllPageContents();

    showToast(`Dashboard context changed to ${role.toUpperCase()} Workspace.`);
}

function updateProfileBadge() {
    if (STATE.user.loggedIn) {
        DOM.headerUsername.textContent = STATE.user.name;
        if (STATE.user.avatarImg) {
            DOM.headerAvatar.innerHTML = `<img src="${STATE.user.avatarImg}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
            DOM.feedPostAvatar.innerHTML = `<img src="${STATE.user.avatarImg}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" />`;
        } else {
            DOM.headerAvatar.innerHTML = STATE.user.name.charAt(0);
            DOM.feedPostAvatar.innerHTML = STATE.user.name.charAt(0);
        }
        DOM.headerUserTag.textContent = STATE.activeRole.charAt(0).toUpperCase() + STATE.activeRole.slice(1);
        if (DOM.navLoginBtn) DOM.navLoginBtn.style.display = 'none';
        if (DOM.navLogoutBtn) DOM.navLogoutBtn.style.display = 'block';
        // Show signed-in info in dropdown
        const roleInfoEl = document.getElementById('role-info-display');
        const roleNameEl = document.getElementById('dropdown-role-name');
        const roleBadgeEl = document.getElementById('dropdown-role-badge');
        if (roleInfoEl) roleInfoEl.style.display = 'block';
        if (roleNameEl) roleNameEl.textContent = STATE.user.name;
        if (roleBadgeEl) roleBadgeEl.textContent = STATE.activeRole.toUpperCase();
    } else {
        DOM.headerUsername.textContent = 'Sign In';
        DOM.headerAvatar.innerHTML = '<i class="fa-solid fa-user" style="font-size:0.85rem;"></i>';
        DOM.feedPostAvatar.innerHTML = '<i class="fa-solid fa-user" style="font-size:0.85rem;"></i>';
        DOM.headerUserTag.textContent = '';
        if (DOM.navLoginBtn) DOM.navLoginBtn.style.display = 'block';
        if (DOM.navLogoutBtn) DOM.navLogoutBtn.style.display = 'none';
        const roleInfoEl = document.getElementById('role-info-display');
        if (roleInfoEl) roleInfoEl.style.display = 'none';
    }

    // Sync all avatar preview containers in forms
    const initials = STATE.user.loggedIn ? STATE.user.name.charAt(0) : STATE.activeRole.charAt(0).toUpperCase();
    document.querySelectorAll('.avatar-upload-group').forEach(group => {
        const preview = group.querySelector('.avatar-preview');
        const status = group.querySelector('.file-status');
        if (preview) {
            if (STATE.user.loggedIn && STATE.user.avatarImg) {
                preview.innerHTML = `<img src="${STATE.user.avatarImg}" style="width:100%; height:100%; object-fit:cover;" />`;
            } else {
                preview.innerHTML = `<span class="preview-initials">${initials}</span>`;
            }
        }
        if (status && !STATE.user.avatarImg) {
            status.textContent = "No photo selected";
        }
    });
}


function getAvatarHtml(name, role, sizeStyle = "width:34px; height:34px; font-size:0.9rem") {
    // Check if current logged-in user matches this name and has uploaded an image
    if (STATE.user.loggedIn && name === STATE.user.name && STATE.user.avatarImg) {
        return `<div class="dir-avatar" style="${sizeStyle}; padding:0; overflow:hidden; display:flex; align-items:center; justify-content:center;"><img src="${STATE.user.avatarImg}" style="width:100%; height:100%; object-fit:cover;" /></div>`;
    }
    // Check if there is someone in directory with this name who has uploaded an image
    const person = STATE.directory.find(d => d.name === name);
    if (person && person.avatarImg) {
        return `<div class="dir-avatar" style="${sizeStyle}; padding:0; overflow:hidden; display:flex; align-items:center; justify-content:center;"><img src="${person.avatarImg}" style="width:100%; height:100%; object-fit:cover;" /></div>`;
    }
    // Fallback to initials
    const initial = name.charAt(0);
    return `<div class="dir-avatar" style="${sizeStyle}">${initial}</div>`;
}

function saveProfileImage(avatarImg) {
    STATE.user.avatarImg = avatarImg;
    STATE.identityAvatars[STATE.user.name] = avatarImg;
    
    // Sync to directory if this is a researcher or mentor name
    const person = STATE.directory.find(d => d.name === STATE.user.name);
    if (person) {
        person.avatarImg = avatarImg;
    }
    
    if (supabase) {
        const identifier = STATE.user.id;
        const query = identifier ? 
            supabase.from('profiles').update({ avatar_url: avatarImg }).eq('id', identifier) :
            supabase.from('profiles').update({ avatar_url: avatarImg }).eq('name', STATE.user.name);
            
        query.then(({error}) => {
            if (error) {
                console.error("Error saving avatar to Supabase:", error);
            } else {
                console.log("Avatar updated in Supabase successfully.");
            }
        });
    }
    
    updateProfileBadge();
    updateDashboardUI();
    renderAllPageContents();
}

function updateCardHeadersText(role) {
    if (role === 'student') {
        DOM.profileCardTitle.textContent = "DEMOGRAPHIC PROFILE";
        DOM.profileCardBadge.textContent = "STUDENT 2026";
        DOM.actionCardTitle.textContent = "QUICK SEARCH & FILTER";
        DOM.actionCardBadge.textContent = "SEARCH";
        DOM.actionCardIcon.className = "fa-solid fa-magnifying-glass header-icon";
    } else if (role === 'researcher') {
        DOM.profileCardTitle.textContent = "LABORATORY SETTINGS";
        DOM.profileCardBadge.textContent = "RESEARCHER ID";
        DOM.actionCardTitle.textContent = "PUBLISH NEW OPPORTUNITY";
        DOM.actionCardBadge.textContent = "PUBLISH";
        DOM.actionCardIcon.className = "fa-solid fa-plus header-icon";
    } else if (role === 'mentor') {
        DOM.profileCardTitle.textContent = "MENTOR PROFILE CONTROLS";
        DOM.profileCardBadge.textContent = "VERIFIED MENTOR";
        DOM.actionCardTitle.textContent = "SCHEDULE SESSION";
        DOM.actionCardBadge.textContent = "SCHEDULE";
        DOM.actionCardIcon.className = "fa-solid fa-calendar-days header-icon";
    } else if (role === 'admin') {
        DOM.profileCardTitle.textContent = "ADMIN SYSTEM CONSOLE";
        DOM.profileCardBadge.textContent = "SYS ADMIN";
        DOM.actionCardTitle.textContent = "SYSTEM BROADCAST & LOGS";
        DOM.actionCardBadge.textContent = "CONTROLS";
        DOM.actionCardIcon.className = "fa-solid fa-screwdriver-wrench header-icon";
    }
}

// --- DYNAMIC TELEMETRY CONTROLS ---
// ─── PROFILE FORM PRE-POPULATION ──────────────────────────────────────────────
function populateProfileForms() {
    const role   = STATE.activeRole;
    const user   = STATE.user;
    const skills = user.skills || '';

    if (role === 'student') {
        const nameEl  = document.getElementById('student-name');
        const ageEl   = document.getElementById('student-age');
        const genEl   = document.getElementById('student-gender');
        const colEl   = document.getElementById('student-college');
        const actEl   = document.getElementById('student-activity');
        const skillEl = document.getElementById('student-skills');
        const resumeStatusEl = document.getElementById('student-resume-status');
        if (nameEl  && user.name)       nameEl.value  = user.name;
        if (ageEl   && user.age)        ageEl.value   = user.age;
        if (genEl   && user.gender)     genEl.value   = user.gender;
        if (colEl   && user.institution) colEl.value  = user.institution || user.college || '';
        if (actEl   && user.interests)  actEl.value   = user.interests;
        if (skillEl)                    skillEl.value = skills;
        if (resumeStatusEl && user.resume_url) {
            resumeStatusEl.textContent = "Uploaded: resume.pdf";
            resumeStatusEl.style.color = 'var(--color-emerald)';
        }
    } else if (role === 'researcher') {
        const nameEl   = document.getElementById('res-name');
        const desigEl  = document.getElementById('res-designation');
        const labEl    = document.getElementById('res-lab');
        const instEl   = document.getElementById('res-inst');
        const domEl    = document.getElementById('res-domain');
        const liEl     = document.getElementById('res-linkedin');
        const skillEl  = document.getElementById('res-skills');
        const bioEl    = document.getElementById('res-bio');
        const scholarEl = document.getElementById('res-scholar');
        const websiteEl = document.getElementById('res-website');
        if (nameEl  && user.name)          nameEl.value  = user.name;
        if (desigEl && user.designation)   desigEl.value = user.designation;
        if (labEl   && user.lab)           labEl.value   = user.lab;
        if (instEl  && user.institution)   instEl.value  = user.institution;
        if (domEl   && user.domain) {
            // Try to set the select; fall back gracefully
            const opt = [...(domEl.options || [])].find(o => o.value === user.domain);
            if (opt) domEl.value = user.domain;
        }
        if (liEl    && user.linkedin_url)  liEl.value   = user.linkedin_url;
        if (skillEl)                       skillEl.value = skills;
        if (bioEl   && user.research_bio)  bioEl.value   = user.research_bio;
        if (scholarEl && user.google_scholar) scholarEl.value = user.google_scholar;
        if (websiteEl && user.lab_website) websiteEl.value = user.lab_website;
    } else if (role === 'mentor') {
        const nameEl    = document.getElementById('mentor-name');
        const fieldEl   = document.getElementById('mentor-field');
        const companyEl = document.getElementById('mentor-company');
        const hoursEl   = document.getElementById('mentor-weekly-hours');
        const liEl      = document.getElementById('mentor-linkedin');
        const skillEl   = document.getElementById('mentor-skills');
        if (nameEl    && user.name)          nameEl.value    = user.name;
        if (fieldEl   && user.coreExpertise) fieldEl.value   = user.coreExpertise;
        if (companyEl && user.institution)   companyEl.value = user.institution;
        if (hoursEl   && user.weeklyHours)   hoursEl.value   = user.weeklyHours;
        if (liEl      && user.linkedin_url)  liEl.value      = user.linkedin_url;
        if (skillEl)                         skillEl.value   = skills;
    }
}

// ─── SPINNER HELPER FOR SAVE BUTTONS ──────────────────────────────────────────
function setSavingState(btn, isSaving) {
    if (!btn) return;
    if (isSaving) {
        btn.disabled = true;
        btn.dataset.originalHtml = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
        btn.classList.add('profile-save-btn--saving');
    } else {
        btn.disabled = false;
        if (btn.dataset.originalHtml) btn.innerHTML = btn.dataset.originalHtml;
        btn.classList.remove('profile-save-btn--saving');
        // Flash success
        btn.classList.add('profile-save-btn--success');
        setTimeout(() => btn.classList.remove('profile-save-btn--success'), 1800);
    }
}

function updateDashboardUI() {
    const role = STATE.activeRole;
    
    // Toggle Workspace views based on active role
    const studentWorkspace = document.getElementById('student-workspace');
    const adminWorkspace = document.getElementById('admin-workspace');
    if (studentWorkspace && adminWorkspace) {
        if (role === 'student') {
            studentWorkspace.classList.add('active-layout');
            adminWorkspace.classList.add('hidden-layout');
            renderStudentDashboard();
            return;
        } else {
            studentWorkspace.classList.remove('active-layout');
            adminWorkspace.classList.remove('hidden-layout');
        }
    }

    // Toggle Supervised Showcases tab button display
    if (DOM.researcherShowcasesTab) {
        if (role === 'researcher' || role === 'mentor') {
            DOM.researcherShowcasesTab.style.display = 'inline-flex';
        } else {
            DOM.researcherShowcasesTab.style.display = 'none';
        }
    }
    
    const adminManageUsersTab = document.getElementById('admin-manage-users-tab');
    if (adminManageUsersTab) {
        if (role === 'admin') {
            adminManageUsersTab.style.display = 'inline-flex';
        } else {
            adminManageUsersTab.style.display = 'none';
        }
    }
    
    let tel1, tel2, tel3, tel4;
    let microTitleText = "ACTIVE LABS & DOMAIN METRICS";
    let bannerHtml = "";
    
    // Opportunities Ledger Tab Title modifications
    if (role === 'student') {
        DOM.ledgerCardTitle.textContent = "PROJECTS & RESEARCH OPPORTUNITIES";
        DOM.ledgerCardIcon.className = "fa-solid fa-list-check header-icon";
        DOM.primaryTabBtn.innerHTML = '<i class="fa-solid fa-list-check"></i> Opportunities Board';
        DOM.secondaryTabBtn.innerHTML = '<i class="fa-solid fa-users"></i> Discover Researchers';
        DOM.ledgerBtn1.style.display = 'block';
        DOM.ledgerBtn2.style.display = 'block';
        DOM.ledgerBtn1.innerHTML = '<i class="fa-solid fa-filter"></i> Filters';
        DOM.ledgerBtn2.innerHTML = '<i class="fa-solid fa-plus"></i> Request Session';
        DOM.ledgerBtn2.onclick = () => switchTab('directory');
    } else if (role === 'researcher') {
        DOM.ledgerCardTitle.textContent = "TEAM MANAGEMENT & APPLICANTS LEDGER";
        DOM.ledgerCardIcon.className = "fa-solid fa-users-gear header-icon";
        DOM.primaryTabBtn.innerHTML = '<i class="fa-solid fa-users-viewfinder"></i> Applicants List';
        DOM.secondaryTabBtn.innerHTML = '<i class="fa-solid fa-microscope"></i> Active Lab Projects';
        DOM.ledgerBtn1.style.display = 'none';
        DOM.ledgerBtn2.style.display = 'block';
        DOM.ledgerBtn2.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Publish Opportunity';
        DOM.ledgerBtn2.onclick = () => DOM.researcherActionPanel.querySelector('input').focus();
    } else if (role === 'mentor') {
        DOM.ledgerCardTitle.textContent = "MENTORSHIP SCHEDULES & TELEMETRY";
        DOM.ledgerCardIcon.className = "fa-solid fa-calendar-check header-icon";
        DOM.primaryTabBtn.innerHTML = '<i class="fa-solid fa-handshake"></i> Mentorship Sessions';
        DOM.secondaryTabBtn.innerHTML = '<i class="fa-solid fa-user-tie"></i> Student Queue';
        DOM.ledgerBtn1.style.display = 'none';
        DOM.ledgerBtn2.style.display = 'block';
        DOM.ledgerBtn2.innerHTML = '<i class="fa-solid fa-clock"></i> Set Open Hours';
        DOM.ledgerBtn2.onclick = () => DOM.mentorActionPanel.querySelector('input').focus();
    } else if (role === 'admin') {
        DOM.ledgerCardTitle.textContent = "SYSTEM AUDIT & APPROVAL OPERATIONS";
        DOM.ledgerCardIcon.className = "fa-solid fa-shield-halved header-icon";
        DOM.primaryTabBtn.innerHTML = '<i class="fa-solid fa-user-check"></i> Verification Queue';
        DOM.secondaryTabBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Approve Projects';
        DOM.ledgerBtn1.style.display = 'block';
        DOM.ledgerBtn2.style.display = 'none';
        DOM.ledgerBtn1.innerHTML = '<i class="fa-solid fa-box-archive"></i> Export Audit PDF';
        DOM.ledgerBtn1.onclick = () => alert("Exporting platform audit records...");
    }

    switch (role) {
        case 'student':
            const appliedCount = STATE.opportunities.filter(o => o.applied).length;
            const appliedPct = (appliedCount / 5) * 100;
            tel1 = { name: "Profile Strength", val: "75%", pct: 75, status: "Skills, Experience mapped" };
            tel2 = { name: "Applied Positions", val: `${appliedCount} / 5 limit`, pct: appliedPct, status: `${appliedCount} active submissions` };
            tel3 = { name: "Connected Mentors", val: "1 / 3 target", pct: 33, status: "Dr. Samir Kalra (AIIMS)" };
            tel4 = { name: "Learning Modules", val: "2 / 5 Courses", pct: 40, status: "Scientific Writing active" };
            
            microTitleText = "INTERDISCIPLINARY NETWORKS & METRICS";
            bannerHtml = `<div class="banner-border-accent"></div>
                          <div class="banner-content">
                              <i class="fa-solid fa-circle-info banner-icon"></i>
                              <span>Verify your credentials as a Researcher or Mentor to get a verified badge and host workshops/publish opportunities.</span>
                          </div>`;
            break;
            
        case 'researcher':
            const appCount = STATE.applicants.length;
            tel1 = { name: "Active Projects", val: "2 / 4 active", pct: 50, status: "Biotech & AI domains" };
            tel2 = { name: "Total Applicants", val: `${appCount} candidates`, pct: 60, status: "Review pending" };
            tel3 = { name: "Recruited Students", val: "1 / 10 slots", pct: 10, status: "Meera Nair approved" };
            tel4 = { name: "Research Score", val: "740 / 1000", pct: 74, status: "Publications impact high" };
            
            microTitleText = "LABORATORY SPECIALTIES & METADATA";
            {
                const isVerified = STATE.user.verified;
                const bannerText = isVerified 
                    ? `Your profile is currently <strong>verified</strong>. Opportunities published will immediately have the "Verified Principal Investigator" label.`
                    : `Your profile is currently <strong>unverified</strong>. Please request profile verification in the left panel to unlock publishing permissions.`;
                const bannerColor = isVerified ? 'var(--color-emerald)' : 'var(--color-orange)';
                bannerHtml = `<div class="banner-border-accent" style="background-color: ${bannerColor}"></div>
                              <div class="banner-content">
                                  <i class="fa-solid fa-shield-halved banner-icon" style="color: ${bannerColor}"></i>
                                  <span>${bannerText}</span>
                              </div>`;
            }
            break;
            
        case 'mentor':
            const conducted = STATE.sessions.length;
            tel1 = { name: "Conducted Sessions", val: `${conducted} sessions`, pct: 80, status: "Topic: Scientific abstract writing" };
            tel2 = { name: "Students Guided", val: "15 Students", pct: 75, status: "Mentorship matches active" };
            tel3 = { name: "Review Queue", val: "2 Projects", pct: 40, status: "Thesis critiques pending" };
            tel4 = { name: "Contribution Hours", val: "4 / 10 Hrs/Wk", pct: 40, status: "4 hours verified this week" };
            
            microTitleText = "MENTOR SPECIALTIES & AVAILABILITY";
            {
                const isVerified = STATE.user.verified;
                const bannerText = isVerified 
                    ? `Your mentor profile is fully verified. Set your open slots to match incoming student consultation requests.`
                    : `Your profile is currently <strong>unverified</strong>. Please request profile verification in the left panel to unlock scheduling permissions.`;
                const bannerColor = isVerified ? 'var(--color-purple)' : 'var(--color-orange)';
                bannerHtml = `<div class="banner-border-accent" style="background-color: ${bannerColor}"></div>
                              <div class="banner-content">
                                  <i class="fa-solid fa-circle-check banner-icon" style="color: ${bannerColor}"></i>
                                  <span>${bannerText}</span>
                              </div>`;
            }
            break;
            
        case 'admin':
            const pendingVer = STATE.verifications.filter(v => v.status === 'Pending').length;
            tel1 = { name: "Verification Queue", val: `${pendingVer} pending`, pct: 30, status: "Researchers & Mentors manual verification" };
            tel2 = { name: "Unapproved Projects", val: "1 project", pct: 10, status: "Security audit checks" };
            tel3 = { name: "Security Warnings", val: "0 flags", pct: 0, status: "All servers running safe" };
            tel4 = { name: "Network Volume", val: "14.2k Users", pct: 90, status: "+124 joined in past 24 hrs" };
            
            microTitleText = "ADMINISTRATIVE SYNC & BACKUPS";
            bannerHtml = `<div class="banner-border-accent" style="background-color: var(--color-orange)"></div>
                          <div class="banner-content">
                              <i class="fa-solid fa-triangle-exclamation banner-icon" style="color: var(--color-orange)"></i>
                              <span>Admin mode active. Ensure you verify credentials of researchers strictly against UGC and hospital registry documents.</span>
                          </div>`;
            break;
    }

    DOM.tel1Name.textContent = tel1.name;
    DOM.tel1Val.textContent = tel1.val;
    DOM.tel1Progress.style.width = `${tel1.pct}%`;
    DOM.tel1Status.textContent = tel1.status;

    DOM.tel2Name.textContent = tel2.name;
    DOM.tel2Val.textContent = tel2.val;
    DOM.tel2Progress.style.width = `${tel2.pct}%`;
    DOM.tel2Status.textContent = tel2.status;

    DOM.tel3Name.textContent = tel3.name;
    DOM.tel3Val.textContent = tel3.val;
    DOM.tel3Progress.style.width = `${tel3.pct}%`;
    DOM.tel3Status.textContent = tel3.status;

    DOM.tel4Name.textContent = tel4.name;
    DOM.tel4Val.textContent = tel4.val;
    DOM.tel4Progress.style.width = `${tel4.pct}%`;
    DOM.tel4Status.textContent = tel4.status;

    DOM.microSectionTitle.textContent = microTitleText;
    DOM.dashboardInfoBanner.innerHTML = bannerHtml;

    renderMicroStats(role);

    // Pre-fill profile forms with current user data
    populateProfileForms();

    // Dynamic cards toggling and rendering
    const courseCreator = document.getElementById('course-creator-panel');
    if (courseCreator) {
        if ((role === 'researcher' || role === 'mentor') && STATE.user.verified) {
            courseCreator.style.display = 'block';
        } else {
            courseCreator.style.display = 'none';
        }
    }

    const verifCard = document.getElementById('verification-status-card');
    if (verifCard) {
        if (role === 'researcher' || role === 'mentor') {
            verifCard.style.display = 'block';
            renderVerificationStatusCard();
        } else {
            verifCard.style.display = 'none';
        }
    }

    const adminVerifConsole = document.getElementById('admin-verifications-console');
    if (adminVerifConsole) {
        if (role === 'admin') {
            adminVerifConsole.style.display = 'block';
            renderAdminVerificationsList();
        } else {
            adminVerifConsole.style.display = 'none';
        }
    }
}

// --- VERIFICATION REQUESTS AND ADMIN DECISIONS FLOWS ---
function renderVerificationStatusCard() {
    const cardBody = document.getElementById('verification-card-body');
    const badge = document.getElementById('verification-badge');
    if (!cardBody) return;

    const isVerified = STATE.user.verified;
    
    // Find if there is a pending request for the current user
    const pendingRequest = (STATE.verifications || []).find(v => 
        (v.user_id && v.user_id === STATE.user.supabaseUid && v.status === 'Pending') ||
        (v.email && v.email === STATE.user.email && v.status === 'Pending') ||
        (!v.user_id && v.name === STATE.user.name && v.status === 'Pending')
    );

    let step1Icon = '<i class="fa-regular fa-circle" style="color: var(--text-muted);"></i>';
    let step2Icon = '<i class="fa-regular fa-circle" style="color: var(--text-muted);"></i>';
    let step3Icon = '<i class="fa-regular fa-circle" style="color: var(--text-muted);"></i>';

    let step1Color = 'var(--text-muted)';
    let step2Color = 'var(--text-muted)';
    let step3Color = 'var(--text-muted)';
    let step1Class = 'step-pending';
    let step2Class = 'step-pending';
    let step3Class = 'step-pending';

    if (isVerified) {
        if (badge) {
            badge.textContent = "VERIFIED";
            badge.className = "badge-tag label-green";
        }
        step1Icon = '<i class="fa-solid fa-circle-check" style="color: var(--color-emerald);"></i>';
        step2Icon = '<i class="fa-solid fa-circle-check" style="color: var(--color-emerald);"></i>';
        step3Icon = '<i class="fa-solid fa-circle-check" style="color: var(--color-emerald);"></i>';
        step1Color = 'var(--text-main)';
        step2Color = 'var(--text-main)';
        step3Color = 'var(--text-main)';
        step1Class = 'step-done';
        step2Class = 'step-done';
        step3Class = 'step-done';
    } else if (pendingRequest) {
        if (badge) {
            badge.textContent = "PENDING";
            badge.className = "badge-tag label-orange";
        }
        step1Icon = '<i class="fa-solid fa-circle-check" style="color: var(--color-emerald);"></i>';
        step2Icon = '<i class="fa-solid fa-hourglass-half" style="color: var(--color-orange);"></i>';
        step3Icon = '<i class="fa-regular fa-circle" style="color: var(--text-muted);"></i>';
        step1Color = 'var(--text-main)';
        step2Color = 'var(--text-main)';
        step3Color = 'var(--text-muted)';
        step1Class = 'step-done';
        step2Class = 'step-active';
        step3Class = 'step-pending';
    } else {
        if (badge) {
            badge.textContent = "UNVERIFIED";
            badge.className = "badge-tag label-red";
        }
        step1Icon = '<i class="fa-regular fa-circle" style="color: var(--text-muted);"></i>';
        step2Icon = '<i class="fa-regular fa-circle" style="color: var(--text-muted);"></i>';
        step3Icon = '<i class="fa-regular fa-circle" style="color: var(--text-muted);"></i>';
        step1Color = 'var(--text-muted)';
        step2Color = 'var(--text-muted)';
        step3Color = 'var(--text-muted)';
        step1Class = 'step-pending';
        step2Class = 'step-pending';
        step3Class = 'step-pending';
    }

    let statusContent = '';
    if (isVerified) {
        statusContent = `
            <div style="text-align: center; padding: 10px 0 15px;">
                <h4 style="margin: 0 0 4px; font-weight: 700; color: var(--text-main); font-size: 0.9rem;">Verified Academic Profile</h4>
                <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0; line-height: 1.4;">You have full publishing and creation access on BioLabs Research.</p>
            </div>
        `;
    } else if (pendingRequest) {
        statusContent = `
            <div style="text-align: center; padding: 10px 0 15px;">
                <h4 style="margin: 0 0 4px; font-weight: 700; color: var(--text-main); font-size: 0.9rem;">Verification Pending</h4>
                <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0; line-height: 1.4;">Your request is under admin review. We will notify you once approved.</p>
            </div>
        `;
    } else {
        statusContent = `
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5; text-align: center;">
                Verify your institutional affiliation to unlock posting projects, challenges, paid courses, and premium consulting.
            </p>
            <form id="submit-verification-form" style="display: flex; flex-direction: column; gap: 10px;">
                <div class="form-group" style="margin-bottom: 0;">
                    <label style="font-size: 0.72rem; margin-bottom: 4px;">Institutional Affiliation</label>
                    <input type="text" id="verif-affiliation" required value="${STATE.user.institution || ''}" placeholder="e.g. AIIMS Delhi / IISc" style="width: 100%; padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); background: var(--bg-page); color: var(--text-main); font-size: 0.82rem;">
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label style="font-size: 0.72rem; margin-bottom: 4px;">Short Bio / Research Focus</label>
                    <textarea id="verif-bio" required rows="2" placeholder="e.g. PI at Neuro-Genetics Division. Focused on genomics." style="width: 100%; padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); background: var(--bg-page); color: var(--text-main); font-size: 0.82rem; font-family: inherit; resize: vertical;"></textarea>
                </div>
                <button type="submit" class="submit-profile-btn" style="padding: 8px 12px; font-size: 0.82rem; height: auto; margin-top: 5px; background: var(--color-teal); border: none; border-radius: var(--radius-sm); color: #fff; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
                    <i class="fa-solid fa-paper-plane"></i> Submit Request
                </button>
            </form>
        `;
    }

    cardBody.innerHTML = `
        ${statusContent}
        <div class="verif-tracker" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border-color);">
            <h5 style="margin: 0; font-size: 0.72rem; font-weight: 800; color: var(--text-label); text-transform: uppercase; letter-spacing: 0.03em;">Verification Tracker</h5>
            <div style="display: flex; flex-direction: column; gap: 10px; position: relative; padding-left: 5px;">
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.78rem;">
                    <div style="display:flex; align-items:center; justify-content:center; width: 16px;">${step1Icon}</div>
                    <span style="color: ${step1Color}; font-weight: ${step1Class === 'step-done' ? '700' : 'normal'}">1. Profile Details & Affiliation</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.78rem;">
                    <div style="display:flex; align-items:center; justify-content:center; width: 16px;">${step2Icon}</div>
                    <span style="color: ${step2Color}; font-weight: ${step2Class === 'step-active' ? '700' : 'normal'}">2. Institutional Email Check</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px; font-size: 0.78rem;">
                    <div style="display:flex; align-items:center; justify-content:center; width: 16px;">${step3Icon}</div>
                    <span style="color: ${step3Color}; font-weight: ${step3Class === 'step-done' ? '700' : 'normal'}">3. Admin Credential Approval</span>
                </div>
            </div>
        </div>
    `;

    if (!isVerified && !pendingRequest) {
        document.getElementById('submit-verification-form')?.addEventListener('submit', async function(e) {
            e.preventDefault();
            const affiliation = document.getElementById('verif-affiliation').value.trim();
            const bio = document.getElementById('verif-bio').value.trim();
            const submitBtn = e.target.querySelector('button[type="submit"]');
            
            if (!affiliation || !bio) return;
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
            }
            
            try {
                const newRequest = {
                    user_id: STATE.user.supabaseUid || null,
                    email: STATE.user.email || '',
                    name: STATE.user.name,
                    type: STATE.activeRole === 'researcher' ? 'Researcher' : 'Mentor',
                    affiliation: affiliation,
                    bio: bio,
                    status: 'Pending'
                };
                
                if (supabase) {
                    const { error } = await supabase.from('verifications').insert([newRequest]);
                    if (error) throw error;
                } else {
                    if (!STATE.verifications) STATE.verifications = [];
                    STATE.verifications.push({
                        id: Math.floor(Math.random() * 1000) + 100,
                        ...newRequest
                    });
                }
                
                showToast("Verification request submitted successfully!");
                await loadDataFromSupabase();
                updateDashboardUI();
            } catch (err) {
                console.error("Verification submit error:", err);
                showToast("❌ Submission failed: " + err.message);
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Request';
                }
            }
        });
    }
}

function renderAdminVerificationsList() {
    const listBody = document.getElementById('admin-verifications-list');
    const countBadge = document.getElementById('verifications-pending-count');
    if (!listBody) return;

    const pending = (STATE.verifications || []).filter(v => v.status === 'Pending');
    if (countBadge) {
        countBadge.textContent = `${pending.length} Pending`;
        countBadge.className = pending.length > 0 ? "badge-tag label-orange" : "badge-tag label-green";
    }

    if (pending.length === 0) {
        listBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">
                    <i class="fa-solid fa-circle-check" style="color: var(--color-emerald); font-size: 1.5rem; margin-bottom: 8px; display: block; margin-left: auto; margin-right: auto;"></i>
                    No pending profile verification requests.
                </td>
            </tr>
        `;
        return;
    }

    listBody.innerHTML = pending.map(v => `
        <tr>
            <td style="font-weight: 700; color: var(--text-main);">${v.name}</td>
            <td><span class="badge-tag ${v.type === 'Researcher' ? 'label-teal' : 'label-purple'}">${v.type.toUpperCase()}</span></td>
            <td>${v.affiliation}</td>
            <td style="max-width: 250px; white-space: normal; line-height: 1.4;">${v.bio}</td>
            <td class="action-column">
                <div style="display: flex; gap: 6px; justify-content: flex-end;">
                    <button class="action-btn outline-btn" onclick="handleAdminVerificationDecision(${v.id}, 'Approved')" style="padding: 2px 8px; font-size: 0.75rem; border-color: var(--color-emerald); color: var(--color-emerald); height: 26px; cursor: pointer;">
                        <i class="fa-solid fa-check"></i> Approve
                    </button>
                    <button class="action-btn outline-btn" onclick="handleAdminVerificationDecision(${v.id}, 'Declined')" style="padding: 2px 8px; font-size: 0.75rem; border-color: var(--color-red); color: var(--color-red); height: 26px; cursor: pointer;">
                        <i class="fa-solid fa-xmark"></i> Decline
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

window.handleAdminVerificationDecision = async function(id, decision) {
    showToast(`Processing decision: ${decision}...`);
    try {
        if (supabase) {
            const { error: verifErr } = await supabase
                .from('verifications')
                .update({ status: decision })
                .eq('id', id);
            if (verifErr) throw verifErr;
        } else {
            const req = (STATE.verifications || []).find(v => v.id == id);
            if (req) req.status = decision;
        }

        const request = (STATE.verifications || []).find(v => v.id == id);
        
        if (request && decision === 'Approved') {
            if (supabase) {
                let profileToUpdate = null;
                if (request.user_id) {
                    const { data } = await supabase.from('profiles').select('*').eq('user_id', request.user_id).limit(1);
                    if (data && data.length > 0) profileToUpdate = data[0];
                }
                if (!profileToUpdate && request.email) {
                    const { data } = await supabase.from('profiles').select('*').eq('email', request.email).limit(1);
                    if (data && data.length > 0) profileToUpdate = data[0];
                }
                if (!profileToUpdate && request.name) {
                    const { data } = await supabase.from('profiles').select('*').eq('name', request.name).limit(1);
                    if (data && data.length > 0) profileToUpdate = data[0];
                }

                if (profileToUpdate) {
                    const { error: profileErr } = await supabase
                        .from('profiles')
                        .update({ verified: true })
                        .eq('id', profileToUpdate.id);
                    if (profileErr) throw profileErr;
                    showToast(`🎉 Profile for ${request.name} successfully verified!`);
                } else {
                    console.warn("Could not find matching profile for verification approval:", request);
                }
            } else {
                const profile = (STATE.allProfiles || []).find(p => p.name === request.name);
                if (profile) {
                    profile.verified = true;
                    showToast(`🎉 Profile for ${request.name} successfully verified!`);
                }
            }
        } else {
            showToast(`Verification request declined.`);
        }

        await loadDataFromSupabase();
        updateDashboardUI();
    } catch (err) {
        console.error("Error updating verification decision:", err);
        showToast("❌ Error updating status: " + err.message);
    }
};

function renderMicroStats(role) {
    let html = "";
    if (role === 'student') {
        html = `
            <div class="micro-stat-box">
                <span class="micro-label">BioTech Network</span>
                <span class="micro-value">4.8k Members</span>
            </div>
            <div class="micro-stat-box">
                <span class="micro-label">AI in Healthcare</span>
                <span class="micro-value">12.4k Members</span>
            </div>
            <div class="micro-stat-box">
                <span class="micro-label">Neuroscience Hub</span>
                <span class="micro-value">2.9k Members</span>
            </div>
        `;
    } else if (role === 'researcher') {
        html = `
            <div class="micro-stat-box">
                <span class="micro-label">Current NIH Grants</span>
                <span class="micro-value">2 Active</span>
            </div>
            <div class="micro-stat-box">
                <span class="micro-label">Preprints Index</span>
                <span class="micro-value">8 Scored</span>
            </div>
            <div class="micro-stat-box">
                <span class="micro-label">Citation Score</span>
                <span class="micro-value">342 H-Index</span>
            </div>
        `;
    } else if (role === 'mentor') {
        html = `
            <div class="micro-stat-box">
                <span class="micro-label">Avg. Review Score</span>
                <span class="micro-value">4.9 / 5.0</span>
            </div>
            <div class="micro-stat-box">
                <span class="micro-label">Webinars Conducted</span>
                <span class="micro-value">6 Held</span>
            </div>
            <div class="micro-stat-box">
                <span class="micro-label">Matches Assigned</span>
                <span class="micro-value">8 Active</span>
            </div>
        `;
    } else if (role === 'admin') {
        html = `
            <div class="micro-stat-box">
                <span class="micro-label">API Gateway Status</span>
                <span class="micro-value" style="color:var(--color-emerald)">ONLINE</span>
            </div>
            <div class="micro-stat-box">
                <span class="micro-label">Auth Sync (OAuth2)</span>
                <span class="micro-value">99.9% Up</span>
            </div>
        `;
    }
    DOM.microTelemetryItems.innerHTML = html;
}

// --- SWITCH DASHBOARD LEDGER CARD TABS ---
function switchTab(tabName) {
    DOM.tabBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    DOM.tabViews.forEach(view => {
        view.classList.remove('active');
    });

    document.getElementById(`tab-content-${tabName}`).classList.add('active');
    renderDashboardTabLists();
}

// --- DYNAMIC RENDERING SYNC ---
function renderAllPageContents() {
    renderCollegeChaptersSidebar();
    renderGlobalOpportunities();
    renderGlobalDirectory();
    renderGlobalPosts();
    renderDashboardTabLists();
    renderProjectShowcase();
}

// 1. RENDER GLOBAL OPPORTUNITIES PAGE VIEW
function renderGlobalOpportunities() {
    if (!DOM.globalOppsList) return;
    
    let filteredOpps = STATE.opportunities;
    const activeType = STATE.oppTypeFilter || 'all';

    if (activeType === 'session') {
        let openSessions = (STATE.sessions || []).filter(s => s.student === 'Open Reservation');
        
        if (STATE.searchQuery) {
            openSessions = openSessions.filter(s => 
                s.topic.toLowerCase().includes(STATE.searchQuery) ||
                (s.mentor_name || '').toLowerCase().includes(STATE.searchQuery)
            );
        }
        
        const container = DOM.globalOppsList;
        container.innerHTML = '';
        if (openSessions.length === 0) {
            container.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color: var(--text-muted);">No matching mentorship sessions found.</td></tr>`;
            return;
        }
        
        openSessions.forEach(sess => {
            const isConsulting = sess.type === 'consulting';
            const priceText = (sess.price_credits && sess.price_credits > 0) ? `${sess.price_credits} Credits` : 'Free';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${sess.topic}</strong></td>
                <td>
                    <div class="dir-title-row">
                        <span>${sess.mentor_name || 'Verified Mentor'}</span>
                        <span style="font-size:0.75rem;color:var(--text-muted)">Academic Mentor</span>
                    </div>
                </td>
                <td><span class="badge-tag label-purple">${isConsulting ? 'Consulting' : 'Mentorship'}</span></td>
                <td><code style="font-size:0.75rem"><i class="fa-regular fa-calendar"></i> ${sess.date}</code></td>
                <td>${sess.platform || 'Zoom'}</td>
                <td>${priceText}</td>
                <td class="action-column">
                    <button class="action-btn primary-btn" onclick="window.bookMentorshipSession(${sess.id})">
                        <i class="fa-solid fa-calendar-check"></i> Book Session
                    </button>
                </td>
            `;
            container.appendChild(tr);
        });
        return;
    }

    // Apply Search
    if (STATE.searchQuery) {
        filteredOpps = filteredOpps.filter(opp => 
            opp.title.toLowerCase().includes(STATE.searchQuery) ||
            opp.researcher.toLowerCase().includes(STATE.searchQuery) ||
            opp.skills.toLowerCase().includes(STATE.searchQuery)
        );
    }

    // Apply Domain Filter
    if (STATE.selectedDomain !== 'all') {
        filteredOpps = filteredOpps.filter(opp => 
            opp.domain.toLowerCase().includes(STATE.selectedDomain.toLowerCase())
        );
    }

    // Apply Type Filter
    if (activeType !== 'all') {
        filteredOpps = filteredOpps.filter(opp => {
            const oppType = opp.type || 'project';
            return oppType === activeType;
        });
    }

    const container = DOM.globalOppsList;
    container.innerHTML = '';

    if (filteredOpps.length === 0) {
        container.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 40px; color: var(--text-muted);">No matching opportunities found.</td></tr>`;
        return;
    }

    filteredOpps.forEach(opp => {
        const tr = document.createElement('tr');
        
        let detailsText = `${opp.slots} slots`;
        if (opp.type === 'fellowship') {
            detailsText = `<span style="color:var(--color-emerald); font-weight:700;">${opp.stipend || 'Stipend'}</span>`;
        } else if (opp.type === 'problem') {
            detailsText = `<span style="color:var(--color-orange); font-weight:700;">Bounty: ${opp.price_credits || 0} Cr</span>`;
        }

        tr.innerHTML = `
            <td><strong>${opp.title}</strong></td>
            <td>
                <div class="dir-title-row">
                    <span>${opp.researcher}</span>
                    <span style="font-size:0.75rem;color:var(--text-muted)">${opp.lab}</span>
                </div>
            </td>
            <td><span class="badge-tag label-blue">${opp.domain}</span></td>
            <td><code style="font-size:0.75rem">${opp.skills}</code></td>
            <td>${opp.duration}</td>
            <td>${detailsText}</td>
            <td class="action-column">
                <button class="action-btn ${opp.applied ? 'outline-btn' : 'primary-btn'}" onclick="applyToOpportunity(${opp.id})" ${opp.applied ? 'disabled' : ''}>
                    ${opp.applied ? '<i class="fa-solid fa-circle-check"></i> Applied' : '<i class="fa-solid fa-paper-plane"></i> Apply'}
                </button>
            </td>
        `;
        container.appendChild(tr);
    });
}

// 2. RENDER GLOBAL MENTORS DIRECTORY PAGE VIEW
function renderGlobalDirectory() {
    if (!DOM.globalDirectoryList) return;

    let filteredDir = STATE.directory;

    if (STATE.searchQuery) {
        filteredDir = filteredDir.filter(person => 
            person.name.toLowerCase().includes(STATE.searchQuery) ||
            person.institution.toLowerCase().includes(STATE.searchQuery)
        );
    }

    if (STATE.selectedDomain !== 'all') {
        filteredDir = filteredDir.filter(person => 
            person.domain.toLowerCase().includes(STATE.selectedDomain.toLowerCase())
        );
    }

    const container = DOM.globalDirectoryList;
    container.innerHTML = '';

    filteredDir.forEach(person => {
        container.innerHTML += getMentorCardHtml(person);
    });
}

// 3. RENDER GLOBAL COMMUNITY FEED VIEW
function renderGlobalPosts() {
    if (!DOM.globalPostsList) return;
    
    // Sync sidebar active classes
    const channelBtns = document.querySelectorAll('.channel-btn');
    channelBtns.forEach(btn => {
        if (btn.getAttribute('data-channel') === STATE.activeChannel) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Render Lead banner if applicable
    renderCollegeLeadBanner();

    const container = DOM.globalPostsList;
    container.innerHTML = '';

    const activePosts = STATE.feed.filter(post => post.channel === STATE.activeChannel);

    if (activePosts.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 40px; color:var(--text-muted); background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md);">
                <i class="fa-regular fa-comment-dots" style="font-size: 2rem; margin-bottom:10px; color:var(--color-teal);"></i>
                <p>No posts in this channel yet. Be the first to share a research update!</p>
            </div>
        `;
        return;
    }

    activePosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.style.marginBottom = '20px';

        const linkHtml = post.paperLink ? `
            <div style="margin-top: 8px; background:var(--color-primary-bg); padding:10px 14px; border-radius: var(--radius-sm); border:1px solid var(--border-color)">
                <a href="https://${post.paperLink}" target="_blank" style="color:var(--color-primary); font-weight:700; font-size:0.8rem; text-decoration:none">
                    <i class="fa-solid fa-file-pdf"></i> Preprint: ${post.paperLink}
                </a>
            </div>
        ` : '';

        card.innerHTML = `
            <div class="post-author-info">
                ${getAvatarHtml(post.author, post.role, "width:34px; height:34px; font-size:0.9rem")}
                <div class="post-meta-details">
                    <span class="post-author-name">${post.author}</span>
                    <span class="post-time">${post.role.toUpperCase()} • ${post.time}</span>
                </div>
            </div>
            <div class="post-content-body">
                ${post.body}
                ${linkHtml}
            </div>
            <div class="post-interactions">
                <button class="inter-btn ${post.liked ? 'active' : ''}" onclick="likePost(${post.id})">
                    <i class="fa-solid fa-thumbs-up"></i> ${post.likes} Likes
                </button>
                <button class="inter-btn"><i class="fa-solid fa-comment"></i> Comment</button>
                <button class="inter-btn"><i class="fa-solid fa-share-nodes"></i> Share</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 4. RENDER DASHBOARD TABS LISTS (Sync lists inside Workspace View)
function renderDashboardTabLists() {
    renderDashboardOpportunities();
    renderDashboardDirectory();
    renderDashboardFeed();
    renderDashboardLearning();
    renderDashboardSupervisedShowcases();
    renderAdminUsers();
}

function renderDashboardOpportunities() {
    const listContainer = DOM.opportunitiesList;
    if (!listContainer) return;
    
    const role = STATE.activeRole;
    listContainer.innerHTML = '';
    DOM.oppEmptyState.classList.add('hidden');
    DOM.opportunitiesTable.classList.remove('hidden');

    if (role === 'student') {
        let filteredOpps = STATE.opportunities;
        const activeType = STATE.oppTypeFilter || 'all';

        if (activeType === 'session') {
            let openSessions = (STATE.sessions || []).filter(s => s.student === 'Open Reservation');
            if (STATE.searchQuery) {
                openSessions = openSessions.filter(s => 
                    s.topic.toLowerCase().includes(STATE.searchQuery) ||
                    (s.mentor_name || '').toLowerCase().includes(STATE.searchQuery)
                );
            }

            if (openSessions.length === 0) {
                DOM.oppEmptyState.classList.remove('hidden');
                DOM.opportunitiesTable.classList.add('hidden');
                return;
            }

            document.querySelector('#opportunities-table thead').innerHTML = `
                <tr>
                    <th>SESSION TOPIC</th>
                    <th>MENTOR</th>
                    <th>TYPE</th>
                    <th>DATE & TIME</th>
                    <th>MEDIUM</th>
                    <th>PRICE</th>
                    <th class="action-column">ACTION</th>
                </tr>
            `;

            openSessions.forEach(sess => {
                const tr = document.createElement('tr');
                const priceText = (sess.price_credits && sess.price_credits > 0) ? `${sess.price_credits} Credits` : 'Free';
                tr.innerHTML = `
                    <td><strong>${sess.topic}</strong></td>
                    <td>${sess.mentor_name || 'Verified Mentor'}</td>
                    <td><span class="badge-tag label-purple">${sess.type === 'consulting' ? 'Consulting' : 'Mentorship'}</span></td>
                    <td><code style="font-size:0.75rem">${sess.date}</code></td>
                    <td>${sess.platform || 'Zoom'}</td>
                    <td>${priceText}</td>
                    <td class="action-column">
                        <button class="action-btn primary-btn" onclick="window.bookMentorshipSession(${sess.id})">
                            <i class="fa-solid fa-calendar-check"></i> Book
                        </button>
                    </td>
                `;
                listContainer.appendChild(tr);
            });
            return;
        }

        // Apply Search
        if (STATE.searchQuery) {
            filteredOpps = filteredOpps.filter(opp => 
                opp.title.toLowerCase().includes(STATE.searchQuery) ||
                opp.researcher.toLowerCase().includes(STATE.searchQuery)
            );
        }

        if (STATE.selectedDomain !== 'all') {
            filteredOpps = filteredOpps.filter(opp => 
                opp.domain.toLowerCase().includes(STATE.selectedDomain.toLowerCase())
            );
        }

        // Apply Type Filter
        if (activeType !== 'all') {
            filteredOpps = filteredOpps.filter(opp => {
                const oppType = opp.type || 'project';
                return oppType === activeType;
            });
        }

        if (filteredOpps.length === 0) {
            DOM.oppEmptyState.classList.remove('hidden');
            DOM.opportunitiesTable.classList.add('hidden');
            return;
        }

        document.querySelector('#opportunities-table thead').innerHTML = `
            <tr>
                <th>PROJECT / TOPIC</th>
                <th>RESEARCHER / LAB</th>
                <th>DOMAIN</th>
                <th>REQUIRED SKILLS</th>
                <th>DURATION</th>
                <th>SLOTS / DETAILS</th>
                <th class="action-column">ACTION</th>
            </tr>
        `;

        filteredOpps.forEach(opp => {
            const tr = document.createElement('tr');
            
            let detailsText = `${opp.slots} slots`;
            if (opp.type === 'fellowship') {
                detailsText = `<div style="font-size:0.75rem; color:var(--color-emerald); font-weight:700;">${opp.stipend || 'Stipend'}</div>`;
            } else if (opp.type === 'problem') {
                detailsText = `<div style="font-size:0.75rem; color:var(--color-orange); font-weight:700;">Bounty: ${opp.price_credits || 0} Cr</div>`;
            }

            tr.innerHTML = `
                <td><strong>${opp.title}</strong></td>
                <td>
                    <div class="dir-title-row">
                        <span>${opp.researcher}</span>
                        <span style="font-size:0.75rem;color:var(--text-muted)">${opp.lab}</span>
                    </div>
                </td>
                <td><span class="badge-tag label-blue">${opp.domain}</span></td>
                <td><code style="font-size:0.75rem">${opp.skills}</code></td>
                <td>${opp.duration}</td>
                <td>${detailsText}</td>
                <td class="action-column">
                    <button class="action-btn ${opp.applied ? 'outline-btn' : 'primary-btn'}" onclick="applyToOpportunity(${opp.id})" ${opp.applied ? 'disabled' : ''}>
                        ${opp.applied ? '<i class="fa-solid fa-circle-check"></i> Applied' : '<i class="fa-solid fa-paper-plane"></i> Apply'}
                    </button>
                </td>
            `;
            listContainer.appendChild(tr);
        });

    } else if (role === 'researcher') {
        document.querySelector('#opportunities-table thead').innerHTML = `
            <tr>
                <th>APPLICANT NAME</th>
                <th>PROJECT / POSITION</th>
                <th>AFFILIATION</th>
                <th>APPLIED ROLE</th>
                <th>STATUS</th>
                <th class="action-column">ACTION</th>
            </tr>
        `;

        STATE.applicants.forEach(app => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${app.name}</strong></td>
                <td>${app.project}</td>
                <td>${app.college}</td>
                <td><span class="badge-tag">${app.role}</span></td>
                <td>
                    <span class="badge-tag" style="background-color:${app.status === 'Approved' ? 'var(--color-emerald-bg)' : 'var(--color-yellow-bg)'}; color:${app.status === 'Approved' ? 'var(--color-emerald)' : 'var(--color-yellow)'}">
                        ${app.status}
                    </span>
                </td>
                <td class="action-column" style="display: flex; gap: 6px; align-items: center; justify-content: flex-end;">
                    <button class="action-btn outline-btn" onclick="window.viewApplicantResume(${app.id})" style="font-size: 0.75rem; padding: 4px 8px; margin-bottom: 0;">
                        <i class="fa-solid fa-file-pdf"></i> Resume
                    </button>
                    ${app.status === 'Pending' ? `
                        <button class="action-btn primary-btn" style="background-color:var(--color-emerald); font-size: 0.75rem; padding: 4px 8px; margin-bottom: 0;" onclick="approveApplicant(${app.id})">Approve</button>
                        <button class="action-btn outline-btn" style="color:var(--color-red); border-color:var(--color-red); font-size: 0.75rem; padding: 4px 8px; margin-bottom: 0;" onclick="rejectApplicant(${app.id})">Decline</button>
                    ` : `
                        <button class="action-btn outline-btn" style="font-size: 0.75rem; padding: 4px 8px; margin-bottom: 0;" disabled>Processed</button>
                    `}
                </td>
            `;
            listContainer.appendChild(tr);
        });

    } else if (role === 'mentor') {
        document.querySelector('#opportunities-table thead').innerHTML = `
            <tr>
                <th>STUDENT MATCH</th>
                <th>SESSION TOPIC</th>
                <th>DATE & TIME</th>
                <th>MEDIUM</th>
                <th>STATUS</th>
                <th class="action-column">ACTION</th>
            </tr>
        `;

        STATE.sessions.forEach(sess => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${sess.student}</strong></td>
                <td>${sess.topic}</td>
                <td><i class="fa-regular fa-clock"></i> ${sess.date}</td>
                <td><span class="badge-tag label-blue">${sess.platform}</span></td>
                <td><span class="badge-tag text-green" style="background-color:var(--color-emerald-bg)">${sess.status}</span></td>
                <td class="action-column">
                    <button class="action-btn primary-btn" onclick="startSession(${sess.id})">Join Video Room</button>
                </td>
            `;
            listContainer.appendChild(tr);
        });

    } else if (role === 'admin') {
        document.querySelector('#opportunities-table thead').innerHTML = `
            <tr>
                <th>SUBMITTER</th>
                <th>ROLE REQUEST</th>
                <th>INSTITUTION / LABORATORY</th>
                <th>BIO SUMMARY</th>
                <th>VERIFICATION DATA</th>
                <th class="action-column">ACTION</th>
            </tr>
        `;

        STATE.verifications.forEach(ver => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${ver.name}</strong></td>
                <td><span class="badge-tag label-blue">${ver.type}</span></td>
                <td>${ver.affiliation}</td>
                <td><em style="font-size:0.75rem; color:var(--text-muted)">"${ver.bio}"</em></td>
                <td><a href="#" style="color:var(--color-primary); font-size:0.75rem"><i class="fa-solid fa-file-pdf"></i> Verification Docs.pdf</a></td>
                <td class="action-column">
                    <button class="action-btn primary-btn" style="background-color:var(--color-emerald)" onclick="adminVerifyUser(${ver.id}, true)">Verify</button>
                    <button class="action-btn outline-btn" style="color:var(--color-red); border-color:var(--color-red)" onclick="adminVerifyUser(${ver.id}, false)">Decline</button>
                </td>
            `;
            listContainer.appendChild(tr);
        });
    }
}

function renderDashboardDirectory() {
    const gridContainer = DOM.directoryList;
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const role = STATE.activeRole;

    if (role === 'admin') {
        const unapprovedShowcases = STATE.showcases.filter(s => !s.approved);
        
        if (unapprovedShowcases.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted);">
                    <i class="fa-solid fa-circle-check" style="font-size: 2.5rem; color: var(--color-emerald); margin-bottom: 10px; display: block;"></i>
                    <p>All project showcases have been approved! No pending reviews.</p>
                </div>
            `;
            return;
        }

        unapprovedShowcases.forEach(s => {
            const card = document.createElement('div');
            card.className = 'showcase-card';
            card.style.border = '1px solid var(--border-color)';
            card.style.padding = '15px';
            card.style.borderRadius = 'var(--radius-md)';
            card.style.background = 'var(--bg-card)';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.gap = '10px';

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 5px;">
                    <h3 style="font-size:1.1rem; margin:0; color:var(--text-main); font-weight:700;">${s.title}</h3>
                    <span class="badge-tag label-blue" style="font-size: 0.72rem; padding: 2px 6px;">${s.domain}</span>
                </div>
                <p style="font-size:0.82rem; color:var(--text-muted); margin:0; line-height:1.4;">${s.description}</p>
                <div style="font-size:0.75rem; color:var(--text-main); display: flex; flex-direction: column; gap: 4px; border-top: 1px dashed var(--border-color); padding-top: 8px; margin-top: 5px;">
                    <div><strong>Supervising Mentor:</strong> ${s.mentor} (${s.institution})</div>
                    <div><strong>Published In:</strong> ${s.publisher || 'N/A'}</div>
                </div>
                <div style="display:flex; gap:10px; margin-top:10px; border-top: 1px dashed var(--border-color); padding-top: 10px;">
                    <button class="action-btn primary-btn" style="background-color:var(--color-emerald); font-size:0.75rem; padding:4px 10px;" onclick="adminApproveShowcase(${s.id}, true)">
                        <i class="fa-solid fa-check"></i> Approve
                    </button>
                    <button class="action-btn outline-btn" style="color:var(--color-red); border-color:var(--color-red); font-size:0.75rem; padding:4px 10px;" onclick="adminApproveShowcase(${s.id}, false)">
                        <i class="fa-solid fa-xmark"></i> Decline
                    </button>
                </div>
            `;
            gridContainer.appendChild(card);
        });
    } else {
        let filteredDir = STATE.directory;

        if (STATE.searchQuery) {
            filteredDir = filteredDir.filter(person => 
                person.name.toLowerCase().includes(STATE.searchQuery) ||
                person.institution.toLowerCase().includes(STATE.searchQuery)
            );
        }

        filteredDir.forEach(person => {
            gridContainer.innerHTML += getMentorCardHtml(person);
        });
    }
}

function renderDashboardFeed() {
    const feedList = DOM.postsList;
    if (!feedList) return;
    feedList.innerHTML = '';

    STATE.feed.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-card';

        card.innerHTML = `
            <div class="post-author-info">
                ${getAvatarHtml(post.author, post.role, "width:30px; height:30px; font-size:0.85rem")}
                <div class="post-meta-details">
                    <span class="post-author-name">${post.author}</span>
                    <span class="post-time">${post.time}</span>
                </div>
            </div>
            <div class="post-content-body">${post.body}</div>
            <div class="post-interactions">
                <button class="inter-btn ${post.liked ? 'active' : ''}" onclick="likePost(${post.id})">
                    <i class="fa-solid fa-thumbs-up"></i> ${post.likes}
                </button>
            </div>
        `;
        feedList.appendChild(card);
    });
}

function renderDashboardLearning() {
    const grid = DOM.learningCoursesList;
    if (!grid) return;
    grid.innerHTML = '';

    STATE.courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';

        const isPaidAndLocked = course.is_paid && course.progress === 0;

        card.innerHTML = `
            <span class="tel-category-row" style="display:flex; justify-content:space-between; align-items:center; width:100%; margin-bottom:5px;">
                <span class="course-cat">${course.category}</span>
                ${course.is_paid ? `<span class="badge-tel label-orange" style="font-size:0.65rem; padding: 2px 6px; border-radius:10px; font-weight:bold;">PREMIUM: ${course.price_credits} CR</span>` : `<span class="badge-tel label-green" style="font-size:0.65rem; padding: 2px 6px; border-radius:10px; font-weight:bold;">FREE</span>`}
            </span>
            <h4 class="course-title">${course.title}</h4>
            <div class="course-meta">
                <span>${course.duration}</span>
                <span>${course.modules} Modules</span>
            </div>
            <div class="course-progress-container">
                <div class="course-progress-lbl">
                    <span>Progress</span>
                    <span>${course.progress}%</span>
                </div>
                <div class="tel-progress-container">
                    <div class="tel-progress-bar bg-teal" style="width: ${course.progress}%"></div>
                </div>
            </div>
            <button class="action-btn ${course.progress === 100 ? 'outline-btn' : 'primary-btn'} course-btn" onclick="startCourse(${course.id})">
                ${course.progress === 100 ? 'Review Certificate' : (isPaidAndLocked ? `<i class="fa-solid fa-lock"></i> Unlock (${course.price_credits} Credits)` : 'Resume Learning')}
            </button>
        `;
        grid.appendChild(card);
    });
}

// --- DYNAMIC ACTIONS TRIGGERS ---
window.applyToOpportunity = async (id) => {
    if (!requireAuth('Sign in to apply for research opportunities.')) return;

    const opp = STATE.opportunities.find(o => o.id === id);
    if (opp) {
        opp.applied = true;
        opp.status = 'Under Review';
        
        const studentName = STATE.user.name;
        const studentCollege = STATE.user.college || STATE.user.institution || "IIT Delhi";
        const studentRole = "Student Researcher";
        const projectTitle = opp.title;

        if (supabase) {
            try {
                const { data: existingApp } = await supabase.from('opportunity_applications')
                    .select('*')
                    .eq('opportunity_id', id)
                    .eq('student_name', studentName);
                
                if (!existingApp || existingApp.length === 0) {
                    const { error } = await supabase.from('opportunity_applications').insert([{
                        opportunity_id: id,
                        student_name: studentName,
                        student_college: studentCollege,
                        student_role: studentRole,
                        project_title: projectTitle,
                        status: 'Pending'
                    }]);
                    if (error) throw error;
                    
                    await supabase.from('opportunities').update({ applied: true }).eq('id', id);
                }
                await loadDataFromSupabase();
                showToast(`Successfully applied to project: "${opp.title}"`);
            } catch (err) {
                console.error("Error applying to opportunity in Supabase:", err);
            }
        } else {
            const exists = STATE.applicants.some(a => a.project === opp.title && a.name === studentName);
            if (!exists) {
                const nextId = Math.max(...STATE.applicants.map(a => a.id), 100) + 1;
                STATE.applicants.push({
                    id: nextId,
                    name: studentName,
                    project: opp.title,
                    role: studentRole,
                    college: studentCollege,
                    status: "Pending"
                });
            }
            showToast(`Successfully applied to project: "${opp.title}"`);
        }
        updateDashboardUI();
        renderAllPageContents();
    }
};

window.approveApplicant = async (id) => {
    const applicant = STATE.applicants.find(a => a.id === id);
    if (applicant) {
        if (supabase) {
            try {
                const { error } = await supabase.from('opportunity_applications').update({ status: 'Approved' }).eq('id', id);
                if (error) throw error;
                await loadDataFromSupabase();
                showToast(`Applicant ${applicant.name} approved!`);
            } catch (err) {
                console.error("Error approving applicant in Supabase:", err);
            }
        } else {
            applicant.status = 'Approved';
            const opp = STATE.opportunities.find(o => o.title === applicant.project);
            if (opp) {
                opp.status = 'Shortlisted';
            }
            showToast(`Applicant ${applicant.name} approved!`);
        }
        updateDashboardUI();
        renderAllPageContents();
    }
};

window.rejectApplicant = async (id) => {
    const applicant = STATE.applicants.find(a => a.id === id);
    if (applicant) {
        if (supabase) {
            try {
                const { error } = await supabase.from('opportunity_applications').update({ status: 'Declined' }).eq('id', id);
                if (error) throw error;
                await loadDataFromSupabase();
                showToast("Candidate application declined.");
            } catch (err) {
                console.error("Error declining applicant in Supabase:", err);
            }
        } else {
            const opp = STATE.opportunities.find(o => o.title === applicant.project);
            if (opp) {
                opp.status = 'Declined';
            }
            STATE.applicants = STATE.applicants.filter(a => a.id !== id);
            showToast("Candidate application declined.");
        }
        updateDashboardUI();
        renderAllPageContents();
    }
};

window.startSession = (id) => {
    const sess = STATE.sessions.find(s => s.id === id);
    alert(`Connecting to BioLabs Video Engine...\n\nZoom Link: https://zoom.us/j/mock-${id}\nTopic: ${sess.topic}`);
};

window.adminVerifyUser = async (id, approved) => {
    const request = STATE.verifications.find(v => v.id === id);
    if (request) {
        if (supabase) {
            try {
                if (approved) {
                    const { error: errProfile } = await supabase.from('profiles').update({ verified: true }).eq('name', request.name);
                    if (errProfile) throw errProfile;
                    showToast(`${request.type} ${request.name} verified successfully.`);
                } else {
                    showToast(`Verification for ${request.name} declined.`);
                }
                
                const { error: errVer } = await supabase.from('verifications').delete().eq('id', id);
                if (errVer) throw errVer;
                
                await loadDataFromSupabase();
            } catch (err) {
                console.error("Error verifying user in Supabase:", err);
            }
        } else {
            if (approved) {
                STATE.directory.push({
                    id: (STATE.directory.length + 1).toString(),
                    name: request.name,
                    role: request.type.toLowerCase(),
                    institution: request.affiliation,
                    domain: "Verified Scholar Network",
                    verified: true,
                    connections: 12,
                    skills: ["Research Methods"]
                });
                showToast(`${request.type} ${request.name} verified successfully.`);
            } else {
                showToast(`Verification for ${request.name} declined.`);
            }
            STATE.verifications = STATE.verifications.filter(v => v.id !== id);
        }
        updateDashboardUI();
        renderAllPageContents();
    }
};

window.adminApproveShowcase = async (id, approved) => {
    if (supabase) {
        try {
            if (approved) {
                const { error } = await supabase.from('showcases').update({ approved: true }).eq('id', id);
                if (error) throw error;
                showToast("Project showcase approved successfully!");
            } else {
                const { error } = await supabase.from('showcases').delete().eq('id', id);
                if (error) throw error;
                showToast("Project showcase review declined.");
            }
            await loadDataFromSupabase();
        } catch (e) {
            console.error("Error updating showcase approval:", e);
            showToast("Error updating showcase.");
        }
    } else {
        const s = STATE.showcases.find(item => item.id === id);
        if (s) {
            if (approved) {
                s.approved = true;
                showToast(`Showcase "${s.title}" approved successfully!`);
            } else {
                STATE.showcases = STATE.showcases.filter(item => item.id !== id);
                showToast(`Showcase "${s.title}" declined.`);
            }
        }
    }
    updateDashboardUI();
    renderAllPageContents();
};

window.connectUser = (name) => {
    const person = STATE.directory.find(p => p.name === name);
    if (person) {
        if (person.connected) {
            showToast(`Already connected with ${name}.`);
        } else {
            person.connected = true;
            showToast(`Connected successfully with ${name}!`);
            updateDashboardUI();
            renderAllPageContents();
        }
    } else {
        showToast(`Network invite sent to ${name}.`);
    }
};

window.likePost = async (id) => {
    const post = STATE.feed.find(p => p.id === id);
    if (post) {
        let nextLikes = post.likes;
        let nextLiked = !post.liked;
        if (post.liked) {
            nextLikes--;
        } else {
            nextLikes++;
        }

        // Optimistic local update
        post.likes = nextLikes;
        post.liked = nextLiked;
        renderAllPageContents();
        renderDashboardFeed();

        if (supabase) {
            try {
                const { error } = await supabase.from('feed').update({
                    likes: nextLikes,
                    liked: nextLiked
                }).eq('id', id);
                if (error) throw error;
            } catch (err) {
                console.error("Error updating feed like:", err);
                // Revert on error
                post.likes = post.liked ? nextLikes - 1 : nextLikes + 1;
                post.liked = !nextLiked;
                renderAllPageContents();
                renderDashboardFeed();
            }
        }
    }
};

window.startCourse = async (id) => {
    const course = STATE.courses.find(c => c.id === id);
    if (!course) return;

    if (course.is_paid && course.progress === 0) {
        const confirmUnlock = confirm(`This premium course costs ${course.price_credits} credits. Do you want to unlock it?`);
        if (!confirmUnlock) return;

        if (STATE.user.credits < course.price_credits) {
            showToast(`❌ Insufficient credits. You need ${course.price_credits} credits (Current balance: ${STATE.user.credits}).`);
            return;
        }

        const oldStudentCredits = STATE.user.credits;
        const newStudentCredits = oldStudentCredits - course.price_credits;
        STATE.user.credits = newStudentCredits;

        let creatorProfile = null;
        let newCreatorCredits = 0;
        if (course.creator_id) {
            creatorProfile = (STATE.allProfiles || []).find(p => p.user_id === course.creator_id);
        } else if (course.creator_name) {
            creatorProfile = (STATE.allProfiles || []).find(p => p.name === course.creator_name);
        }

        if (creatorProfile) {
            newCreatorCredits = (creatorProfile.credits || 0) + course.price_credits;
            creatorProfile.credits = newCreatorCredits;
        }

        if (supabase) {
            try {
                const { error: studentErr } = await supabase.from('profiles').update({ credits: newStudentCredits }).eq('id', STATE.user.id);
                if (studentErr) throw studentErr;

                if (creatorProfile) {
                    const { error: creatorErr } = await supabase.from('profiles').update({ credits: newCreatorCredits }).eq('id', creatorProfile.id);
                    if (creatorErr) throw creatorErr;
                }

                const { error: courseErr } = await supabase.from('courses').update({ progress: 25 }).eq('id', id);
                if (courseErr) throw courseErr;

                showToast(`✅ Unlocked course! ${course.price_credits} credits transferred to creator.`);
                await loadDataFromSupabase();
            } catch (e) {
                console.error("Error unlocking course:", e);
                showToast("❌ Transaction failed: " + e.message);
                STATE.user.credits = oldStudentCredits;
                if (creatorProfile) creatorProfile.credits -= course.price_credits;
                return;
            }
        } else {
            if (creatorProfile) {
                creatorProfile.credits = newCreatorCredits;
            }
            course.progress = 25;
            showToast(`✅ Unlocked course locally! ${course.price_credits} credits transferred.`);
        }

        renderAllPageContents();
        updateDashboardUI();
        return;
    }

    if (course.progress === 100) {
        // Populate and show certificate modal
        document.getElementById('cert-student-name').textContent = STATE.user.name || "BioLabs Student";
        document.getElementById('cert-course-title').textContent = course.title;
        
        // Format current date
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        document.getElementById('cert-date').textContent = today;
        
        // Generate pseudo-verification hash
        const pseudoInput = (STATE.user.name + course.title).toUpperCase().replace(/[^A-Z0-9]/g, '');
        let hash = 0;
        for (let i = 0; i < pseudoInput.length; i++) {
            hash = (hash << 5) - hash + pseudoInput.charCodeAt(i);
            hash |= 0;
        }
        const hashHex = "BL-" + Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
        document.getElementById('cert-hash').textContent = hashHex;
        
        openInfoModal('modal-certificate');
    } else {
        const nextProgress = Math.min(course.progress + 25, 100);
        if (supabase) {
            try {
                const { error } = await supabase.from('courses').update({ progress: nextProgress }).eq('id', id);
                if (error) throw error;
                await loadDataFromSupabase();
            } catch (e) {
                console.error("Error updating course progress in Supabase:", e);
            }
        } else {
            course.progress = nextProgress;
        }
        showToast(`Module complete! Course progress updated.`);
        renderAllPageContents();
        updateDashboardUI();
        
        if (nextProgress === 100) {
            // Populate and show certificate modal
            document.getElementById('cert-student-name').textContent = STATE.user.name || "BioLabs Student";
            document.getElementById('cert-course-title').textContent = course.title;
            
            // Format current date
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const today = new Date().toLocaleDateString('en-US', options);
            document.getElementById('cert-date').textContent = today;
            
            // Generate pseudo-verification hash
            const pseudoInput = (STATE.user.name + course.title).toUpperCase().replace(/[^A-Z0-9]/g, '');
            let hash = 0;
            for (let i = 0; i < pseudoInput.length; i++) {
                hash = (hash << 5) - hash + pseudoInput.charCodeAt(i);
                hash |= 0;
            }
            const hashHex = "BL-" + Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
            document.getElementById('cert-hash').textContent = hashHex;
            
            setTimeout(() => openInfoModal('modal-certificate'), 800);
        }
    }
};

// --- STUDENT DASHBOARD RENDERING AND UTILITIES ---
function calculateProfileStrength() {
    let score = 30;
    if (STATE.user.name && STATE.user.name !== 'Guest User') score += 15;
    const college = STATE.user.college || STATE.user.institution;
    if (college && college.trim() !== '') score += 15;
    if (STATE.user.skills && STATE.user.skills.trim() !== '') score += 15;
    if (STATE.user.interests && STATE.user.interests.trim() !== '') score += 15;
    if (STATE.user.avatarImg && STATE.user.avatarImg.trim() !== '') score += 10;
    return Math.min(score, 100);
}

function checkStudentJourneyStages() {
    const hasName = !!(STATE.user.name && STATE.user.name.trim() && STATE.user.name !== 'Guest User');
    const college = STATE.user.college || STATE.user.institution;
    const hasCollege = !!(college && college.trim() !== '');
    const hasResume = !!(STATE.user.resume_url && STATE.user.resume_url.trim());
    const hasQuiz = !!STATE.user.quiz_completed;

    const stage1Completed = hasName && hasCollege && hasResume && hasQuiz;

    // Stage 2: Learning
    const stage2Completed = STATE.courses && STATE.courses.some(c => c.progress === 100);

    // Stage 3: Networking
    const hasConnection = STATE.directory && STATE.directory.some(p => p.connected);
    const hasPosted = STATE.feed && STATE.feed.some(post => post.author === STATE.user.name);
    const stage3Completed = hasConnection || hasPosted;

    // Stage 4: Opportunities
    const stage4Completed = STATE.opportunities && STATE.opportunities.some(o => o.applied);

    // Stage 5: Career Growth
    const stage5Completed = false;

    return {
        stages: [
            { id: 1, name: 'Onboarding', completed: stage1Completed, icon: 'fa-solid fa-user-gear' },
            { id: 2, name: 'Learning', completed: stage2Completed, icon: 'fa-solid fa-book-open' },
            { id: 3, name: 'Networking', completed: stage3Completed, icon: 'fa-solid fa-paper-plane' },
            { id: 4, name: 'Opportunities', completed: stage4Completed, icon: 'fa-solid fa-user-tie' },
            { id: 5, name: 'Career Growth', completed: stage5Completed, icon: 'fa-solid fa-graduation-cap' }
        ],
        details: {
            hasName,
            hasCollege,
            hasResume,
            hasQuiz,
            stage2Completed,
            hasConnection,
            hasPosted,
            stage4Completed
        }
    };
}

window.graduateStudentToMentor = async () => {
    if (!requireAuth('Sign in to graduate your student journey.')) return;

    if (supabase) {
        try {
            const identifier = STATE.user.id;
            const { error } = await supabase.from('profiles')
                .update({ role: 'mentor' })
                .eq('id', identifier);
            if (error) throw error;
            
            STATE.user.role = 'mentor';
            switchActiveRole('mentor');
            await loadDataFromSupabase();
            showToast("🎉 Congratulations! You have graduated to Mentor status. Welcome to the Mentor workspace!");
            switchView('dashboard');
        } catch (err) {
            console.error("Error graduating student to mentor:", err);
            showToast("Error updating role in database.");
        }
    } else {
        STATE.user.role = 'mentor';
        switchActiveRole('mentor');
        showToast("🎉 (Mock) Successfully graduated to Mentor status!");
        switchView('dashboard');
    }
};

function renderStudentDashboard() {
    // 1. Profile strength
    const nameEl = document.getElementById('student-portal-name');
    const collegeEl = document.getElementById('student-portal-college');
    const pctTextEl = document.getElementById('student-profile-strength-text');
    const pctFillEl = document.getElementById('student-profile-strength-fill');
    
    if (nameEl) nameEl.textContent = STATE.user.name;
    if (collegeEl) collegeEl.textContent = STATE.user.college || STATE.user.institution || "IIT Delhi";
    
    const strength = calculateProfileStrength();
    if (pctTextEl) pctTextEl.textContent = strength + "%";
    if (pctFillEl) {
        const circumference = 251.2;
        const offset = circumference * (1 - strength / 100);
        pctFillEl.style.strokeDashoffset = offset;
    }
    
    // 2. Roadmap Steppers
    const journey = checkStudentJourneyStages();
    const steps = journey.stages;
    
    let activeStageIndex = 0;
    for (let i = 0; i < steps.length; i++) {
        if (!steps[i].completed) {
            activeStageIndex = i;
            break;
        }
        if (i === steps.length - 1) {
            activeStageIndex = steps.length - 1;
        }
    }
    
    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const isActive = (i === activeStageIndex);
        
        const node = document.getElementById(`step-${step.id}`);
        if (node) {
            node.className = 'step-node';
            if (step.completed) {
                node.classList.add('completed');
                node.querySelector('.step-circle').innerHTML = '<i class="fa-solid fa-check"></i>';
            } else {
                if (isActive) {
                    node.classList.add('active');
                }
                node.querySelector('.step-circle').innerHTML = `<i class="${step.icon}"></i>`;
            }
        }
        
        if (i < steps.length - 1) {
            const line = document.getElementById(`line-${step.id}`);
            if (line) {
                line.className = 'step-line';
                if (step.completed && steps[i + 1].completed) {
                    line.classList.add('completed');
                } else if (step.completed || isActive) {
                    line.classList.add('active');
                }
            }
        }
    }

    // Render Active Stage Actions Card
    const cardTitleEl = document.getElementById('active-stage-card-title');
    const cardBadgeEl = document.getElementById('active-stage-badge');
    const cardBodyEl = document.getElementById('active-stage-card-body');

    if (cardTitleEl && cardBadgeEl && cardBodyEl) {
        const activeStage = steps[activeStageIndex];
        cardTitleEl.textContent = `Active Stage: ${activeStage.name}`;
        cardBadgeEl.textContent = `Stage ${activeStage.id} of 5`;
        cardBadgeEl.className = 'badge-tag label-teal';

        let bodyHtml = '';
        const details = journey.details;

        if (activeStage.id === 1) {
            bodyHtml = `
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.6;">
                        Welcome to BioLabs! Complete your demographic profile, upload your resume/CV, and pass the academic skill assessment quiz to finish Stage 1 and unlock advanced learning paths.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 10px; padding: 12px; background: var(--bg-page); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem;">
                            <span style="color: var(--text-main);"><i class="fa-regular ${details.hasName && details.hasCollege ? 'fa-circle-check' : 'fa-circle'}" style="color: ${details.hasName && details.hasCollege ? 'var(--color-emerald)' : 'var(--text-muted)'}; margin-right: 6px;"></i> Academic Profile Details</span>
                            <span style="font-weight: 700; color: ${details.hasName && details.hasCollege ? 'var(--color-emerald)' : 'var(--color-red)'};">${details.hasName && details.hasCollege ? 'Completed' : 'Pending'}</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem;">
                            <span style="color: var(--text-main);"><i class="fa-regular ${details.hasResume ? 'fa-circle-check' : 'fa-circle'}" style="color: ${details.hasResume ? 'var(--color-emerald)' : 'var(--text-muted)'}; margin-right: 6px;"></i> Resume/CV Upload</span>
                            <span style="font-weight: 700; color: ${details.hasResume ? 'var(--color-emerald)' : 'var(--color-red)'};">${details.hasResume ? 'Uploaded' : 'Pending'}</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem;">
                            <span style="color: var(--text-main);"><i class="fa-regular ${details.hasQuiz ? 'fa-circle-check' : 'fa-circle'}" style="color: ${details.hasQuiz ? 'var(--color-emerald)' : 'var(--text-muted)'}; margin-right: 6px;"></i> Skill Assessment Quiz</span>
                            <span style="font-weight: 700; color: ${details.hasQuiz ? 'var(--color-emerald)' : 'var(--color-red)'};">${details.hasQuiz ? 'Passed (+15 cr)' : 'Pending'}</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; margin-top: 5px;">
                        ${!details.hasQuiz ? `
                            <button class="action-btn primary-btn" style="background: var(--color-teal); border-color: var(--color-teal); cursor: pointer; padding: 6px 14px; font-size: 0.8rem;" onclick="window.openInfoModal('modal-student-quiz')">
                                <i class="fa-solid fa-circle-question"></i> Take Skill Quiz
                            </button>
                        ` : ''}
                        <button class="action-btn outline-btn" style="cursor: pointer; padding: 6px 14px; font-size: 0.8rem;" onclick="document.getElementById('student-name')?.focus();">
                            <i class="fa-solid fa-user-pen"></i> Update Profile Details
                        </button>
                    </div>
                </div>
            `;
        } else if (activeStage.id === 2) {
            bodyHtml = `
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.6;">
                        Unlock the BioLabs curriculum! Join learning tracks, attend active workshops, and earn certificates. You must complete at least one course module to 100% to pass this stage.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 10px; padding: 12px; background: var(--bg-page); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem;">
                            <span style="color: var(--text-main);"><i class="fa-regular ${details.stage2Completed ? 'fa-circle-check' : 'fa-circle'}" style="color: ${details.stage2Completed ? 'var(--color-emerald)' : 'var(--text-muted)'}; margin-right: 6px;"></i> Complete a Course (100% progress)</span>
                            <span style="font-weight: 700; color: ${details.stage2Completed ? 'var(--color-emerald)' : 'var(--color-red)'};">${details.stage2Completed ? 'Completed' : 'In Progress'}</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; margin-top: 5px;">
                        <button class="action-btn primary-btn" style="background: var(--color-teal); border-color: var(--color-teal); cursor: pointer; padding: 6px 14px; font-size: 0.8rem;" onclick="switchView('dashboard'); switchTab('learning');">
                            <i class="fa-solid fa-graduation-cap"></i> Open Learning Center
                        </button>
                    </div>
                </div>
            `;
        } else if (activeStage.id === 3) {
            bodyHtml = `
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.6;">
                        Connect with verified researchers and mentors, join communities, or participate in discussions. You need to connect with at least one mentor OR post an update on the community feed to pass this stage.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 10px; padding: 12px; background: var(--bg-page); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem;">
                            <span style="color: var(--text-main);"><i class="fa-regular ${details.hasConnection ? 'fa-circle-check' : 'fa-circle'}" style="color: ${details.hasConnection ? 'var(--color-emerald)' : 'var(--text-muted)'}; margin-right: 6px;"></i> Connect with a Mentor</span>
                            <span style="font-weight: 700; color: ${details.hasConnection ? 'var(--color-emerald)' : 'var(--text-muted)'};">${details.hasConnection ? 'Connected' : 'Optional'}</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem;">
                            <span style="color: var(--text-main);"><i class="fa-regular ${details.hasPosted ? 'fa-circle-check' : 'fa-circle'}" style="color: ${details.hasPosted ? 'var(--color-emerald)' : 'var(--text-muted)'}; margin-right: 6px;"></i> Post in Community Feed</span>
                            <span style="font-weight: 700; color: ${details.hasPosted ? 'var(--color-emerald)' : 'var(--text-muted)'};">${details.hasPosted ? 'Posted' : 'Optional'}</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; margin-top: 5px;">
                        <button class="action-btn primary-btn" style="background: var(--color-teal); border-color: var(--color-teal); cursor: pointer; padding: 6px 14px; font-size: 0.8rem;" onclick="switchView('mentors');">
                            <i class="fa-solid fa-users"></i> Meet Mentors
                        </button>
                        <button class="action-btn outline-btn" style="cursor: pointer; padding: 6px 14px; font-size: 0.8rem;" onclick="switchView('dashboard'); switchTab('feed');">
                            <i class="fa-solid fa-comments"></i> Write Feed Post
                        </button>
                    </div>
                </div>
            `;
        } else if (activeStage.id === 4) {
            bodyHtml = `
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.6;">
                        Apply for lab projects, fellowships, or research internships. You must submit at least one active opportunity application to proceed to the final career growth stage.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 10px; padding: 12px; background: var(--bg-page); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem;">
                            <span style="color: var(--text-main);"><i class="fa-regular ${details.stage4Completed ? 'fa-circle-check' : 'fa-circle'}" style="color: ${details.stage4Completed ? 'var(--color-emerald)' : 'var(--text-muted)'}; margin-right: 6px;"></i> Submit a Research Project Application</span>
                            <span style="font-weight: 700; color: ${details.stage4Completed ? 'var(--color-emerald)' : 'var(--color-red)'};">${details.stage4Completed ? 'Submitted' : 'Pending'}</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; margin-top: 5px;">
                        <button class="action-btn primary-btn" style="background: var(--color-teal); border-color: var(--color-teal); cursor: pointer; padding: 6px 14px; font-size: 0.8rem;" onclick="switchView('opportunities');">
                            <i class="fa-solid fa-search"></i> Find Opportunities
                        </button>
                    </div>
                </div>
            `;
        } else if (activeStage.id === 5) {
            bodyHtml = `
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.6;">
                        Congratulations! You have completed the student research milestones pipeline. You can now build your research portfolio, showcase work, or transition/graduate into a Mentor workspace to guide future students.
                    </p>
                    <div style="display: flex; flex-direction: column; gap: 10px; padding: 12px; background: var(--bg-page); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem;">
                            <span style="color: var(--text-main);"><i class="fa-regular fa-circle-check" style="color: var(--color-emerald); margin-right: 6px;"></i> Complete Student Journey Roadmap</span>
                            <span style="font-weight: 700; color: var(--color-emerald);">Completed</span>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px; margin-top: 5px;">
                        <button class="action-btn primary-btn" style="background: var(--color-purple); border-color: var(--color-purple); color: #fff; cursor: pointer; padding: 8px 16px; font-size: 0.85rem; font-weight: bold; border-radius: var(--radius-sm);" onclick="window.graduateStudentToMentor()">
                            <i class="fa-solid fa-graduation-cap"></i> Graduate to Mentor Workspace
                        </button>
                    </div>
                </div>
            `;
        }

        cardBodyEl.innerHTML = bodyHtml;
    }

    
    // 3. Render applications table
    const appsListEl = document.getElementById('student-applications-tracker-list');
    const appsEmptyEl = document.getElementById('student-apps-empty-state');
    
    if (appsListEl) {
        appsListEl.innerHTML = '';
        const appliedOpps = STATE.opportunities.filter(o => o.applied);
        
        if (appliedOpps.length === 0) {
            if (appsEmptyEl) appsEmptyEl.classList.remove('hidden');
        } else {
            if (appsEmptyEl) appsEmptyEl.classList.add('hidden');
            appliedOpps.forEach(opp => {
                const status = opp.status || 'Under Review';
                let badgeClass = 'status-review';
                if (status === 'Shortlisted') badgeClass = 'status-shortlist';
                if (status === 'Declined') badgeClass = 'status-declined';
                
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${opp.title}</strong></td>
                    <td>
                        <div class="dir-title-row">
                            <span>${opp.researcher}</span>
                            <span style="font-size:0.75rem;color:var(--text-muted)">${opp.lab}</span>
                        </div>
                    </td>
                    <td><span class="badge-tag ${badgeClass}">${status}</span></td>
                    <td>
                        <button class="action-btn outline-btn" style="padding: 4px 8px; font-size: 0.72rem; color: var(--color-red); border-color: var(--color-red); cursor: pointer;" onclick="withdrawApplication(${opp.id})">
                            <i class="fa-solid fa-trash"></i> Withdraw
                        </button>
                    </td>
                `;
                appsListEl.appendChild(tr);
            });
        }
    }
    
    // 4. Render connected mentors
    const mentorsListEl = document.getElementById('student-connected-mentors-list');
    if (mentorsListEl) {
        mentorsListEl.innerHTML = '';
        const connectedMentors = STATE.directory.filter(p => p.connected);
        
        if (connectedMentors.length === 0) {
            mentorsListEl.innerHTML = `<p style="font-size: 0.78rem; color: var(--text-muted); grid-column: 1/-1;">No connected mentors yet. Connect with mentors on the Find Mentors board.</p>`;
        } else {
            connectedMentors.forEach(person => {
                const initial = person.name.charAt(0);
                mentorsListEl.innerHTML += `
                    <div class="mentor-min-card">
                        <div class="mentor-min-avatar">${initial}</div>
                        <div class="mentor-min-details">
                            <span class="mentor-min-name">${person.name}</span>
                            <span class="mentor-min-org">${person.institution}</span>
                        </div>
                    </div>
                `;
            });
        }
    }
    
    // 5. Render smart recommendations
    const recsListEl = document.getElementById('student-recommendations-list');
    if (recsListEl) {
        recsListEl.innerHTML = '';
        const userInterest = STATE.user.interests || 'AI & Deep Learning';
        const userSkills = (STATE.user.skills || '').toLowerCase();
        
        let recs = STATE.opportunities.filter(o => !o.applied);
        recs = recs.map(opp => {
            let score = 0;
            if (userInterest.toLowerCase().includes(opp.domain.toLowerCase()) || 
                opp.domain.toLowerCase().includes(userInterest.toLowerCase()) ||
                (opp.domain === 'AI' && userInterest.includes('AI'))) {
                score += 50;
            }
            const oppSkills = opp.skills.toLowerCase().split(',').map(s => s.trim());
            oppSkills.forEach(skill => {
                if (userSkills.includes(skill)) {
                    score += 25;
                }
            });
            return { opp, score };
        });
        
        recs.sort((a, b) => b.score - a.score);
        const topRecs = recs.slice(0, 3);
        
        if (topRecs.length === 0) {
            recsListEl.innerHTML = `<p style="font-size: 0.78rem; color: var(--text-muted);">No new recommendations available.</p>`;
        } else {
            topRecs.forEach(item => {
                const matchPct = item.score > 0 ? item.score : 20;
                recsListEl.innerHTML += `
                    <div class="rec-project-item">
                        <div class="rec-project-info">
                            <h5>${item.opp.title}</h5>
                            <p>${item.opp.researcher} • ${item.opp.lab}</p>
                        </div>
                        <div class="rec-meta-side">
                            <span class="rec-match-badge">${matchPct}% Match</span>
                            <button class="action-btn primary-btn" style="padding: 4px 8px; font-size: 0.72rem; cursor: pointer;" onclick="applyToOpportunity(${item.opp.id})">
                                Apply
                            </button>
                        </div>
                    </div>
                `;
            });
        }
    }
    
    // 6. Render learning modules progress
    const progressListEl = document.getElementById('student-active-learning-progress');
    if (progressListEl) {
        progressListEl.innerHTML = '';
        const activeCourses = STATE.courses.filter(c => c.progress > 0);
        
        if (activeCourses.length === 0) {
            progressListEl.innerHTML = `<p style="font-size: 0.78rem; color: var(--text-muted);">No courses started. Resume learning in the Learning Center below.</p>`;
        } else {
            activeCourses.forEach(course => {
                const row = document.createElement('div');
                row.className = 'student-learning-progress-row';
                row.innerHTML = `
                    <div class="student-learning-info-row">
                        <span>${course.title}</span>
                        <span>${course.progress}%</span>
                    </div>
                    <div class="tel-progress-container" style="background-color: var(--border-color); height: 8px; border-radius: 4px; overflow: hidden; margin-top: 4px;">
                        <div class="tel-progress-bar bg-teal" style="width: ${course.progress}%; background-color: var(--color-teal); height: 100%; border-radius: 4px;"></div>
                    </div>
                `;
                progressListEl.appendChild(row);
            });
        }
    }
    // 7. Render Ambassador Inquiries
    const inquiriesListEl = document.getElementById('student-lead-requests-list');
    const inquiriesEmptyEl = document.getElementById('student-requests-empty-state');
    
    if (inquiriesListEl) {
        inquiriesListEl.innerHTML = '';
        const inquiries = STATE.leadInquiries;
        
        if (inquiries.length === 0) {
            if (inquiriesEmptyEl) inquiriesEmptyEl.classList.remove('hidden');
        } else {
            if (inquiriesEmptyEl) inquiriesEmptyEl.classList.add('hidden');
            inquiries.forEach(inq => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${inq.leadName}</strong></td>
                    <td><span class="badge-tag" style="background-color:var(--bg-page); color:var(--text-main); border:1px solid var(--border-color);">${inq.college}</span></td>
                    <td><code style="font-size:0.75rem; color:var(--color-teal);">${inq.type}</code></td>
                    <td>
                        <span class="badge-tag status-review">
                            ${inq.status}
                        </span>
                    </td>
                `;
                inquiriesListEl.appendChild(tr);
            });
        }
    }

    // 8. Render student showcases list
    const studentShowcasesListEl = DOM.studentShowcasesList;
    const studentShowcasesEmptyEl = DOM.studentShowcasesEmptyState;
    if (studentShowcasesListEl) {
        studentShowcasesListEl.innerHTML = '';
        const myShowcases = STATE.showcases.filter(s => s.team.some(t => t.name === STATE.user.name));
        if (myShowcases.length === 0) {
            if (studentShowcasesEmptyEl) studentShowcasesEmptyEl.classList.remove('hidden');
        } else {
            if (studentShowcasesEmptyEl) studentShowcasesEmptyEl.classList.add('hidden');
            myShowcases.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${item.title}</strong></td>
                    <td>
                        <div class="dir-title-row">
                            <span>${item.mentor}</span>
                            <span style="font-size:0.72rem;color:var(--text-muted)">${item.institution}</span>
                        </div>
                    </td>
                    <td><code style="font-size:0.75rem; color:var(--color-teal);">${item.publisher}</code></td>
                    <td><span class="badge-tag status-review"><i class="fa-solid fa-thumbs-up"></i> ${item.likes}</span></td>
                    <td>
                        <button class="action-btn outline-btn" style="padding: 4px 8px; font-size: 0.72rem; cursor: pointer;" onclick="switchView('showcase')">
                            <i class="fa-solid fa-eye"></i> View
                        </button>
                    </td>
                `;
                studentShowcasesListEl.appendChild(tr);
            });
        }
    }
    
    // Render daily activities checklist and streak
    renderStreakWidget();
}

window.openStudentProfileModal = () => {
    document.getElementById('modal-student-name').value = STATE.user.name || '';
    document.getElementById('modal-student-age').value = STATE.user.age || 21;
    document.getElementById('modal-student-gender').value = STATE.user.gender || 'Male';
    document.getElementById('modal-student-college').value = STATE.user.college || STATE.user.institution || '';
    document.getElementById('modal-student-activity').value = STATE.user.interests || 'AI & Deep Learning';
    document.getElementById('modal-student-skills').value = STATE.user.skills || '';
    
    const modal = document.getElementById('student-profile-modal');
    if (modal) modal.classList.add('active');
};

window.closeStudentProfileModal = () => {
    const modal = document.getElementById('student-profile-modal');
    if (modal) modal.classList.remove('active');
};

window.withdrawApplication = (id) => {
    const opp = STATE.opportunities.find(o => o.id === id);
    if (opp) {
        opp.applied = false;
        opp.status = undefined;
        STATE.applicants = STATE.applicants.filter(a => !(a.project === opp.title && a.name === STATE.user.name));
        showToast(`Withdrew application from: "${opp.title}"`);
        updateDashboardUI();
        renderAllPageContents();
    }
};

window.openContactLeadModal = (chapterId) => {
    const chapter = STATE.collegeChapters.find(c => c.name === chapterId);
    if (!chapter) return;
    
    const lead = chapter.lead;
    document.getElementById('modal-lead-chapter-id').value = chapterId;
    document.getElementById('lead-modal-avatar').textContent = lead.avatar;
    document.getElementById('lead-modal-name').textContent = lead.name;
    document.getElementById('lead-modal-role').textContent = `${lead.role} • ${chapter.college}`;
    
    // Clear message textarea
    document.getElementById('modal-lead-message').value = '';
    
    const modal = document.getElementById('lead-contact-modal');
    if (modal) modal.classList.add('active');
};

window.closeContactLeadModal = () => {
    const modal = document.getElementById('lead-contact-modal');
    if (modal) modal.classList.remove('active');
};

function renderCollegeChaptersSidebar() {
    const listEl = document.getElementById('college-chapters-list');
    if (!listEl) return;
    
    listEl.innerHTML = '';
    
    STATE.collegeChapters.forEach(chapter => {
        const isActive = STATE.activeChannel === chapter.name;
        const btn = document.createElement('button');
        btn.className = `channel-btn ${isActive ? 'active' : ''}`;
        btn.setAttribute('data-channel', chapter.name);
        btn.innerHTML = `<i class="fa-solid fa-comments"></i> ${chapter.name}`;
        
        btn.addEventListener('click', () => {
            document.querySelectorAll('.channel-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            STATE.activeChannel = chapter.name;
            renderAllPageContents();
        });
        
        listEl.appendChild(btn);
    });
}

function renderCollegeLeadBanner() {
    const bannerContainer = document.getElementById('college-lead-banner-container');
    if (!bannerContainer) return;
    
    bannerContainer.innerHTML = '';
    
    const chapter = STATE.collegeChapters.find(c => c.name === STATE.activeChannel);
    if (chapter) {
        const lead = chapter.lead;
        bannerContainer.innerHTML = `
            <div class="college-lead-banner shadow-sm">
                <div class="lead-avatar">${lead.avatar}</div>
                <div class="lead-info">
                    <span class="lead-tag"><i class="fa-solid fa-crown"></i> College Brand Ambassador</span>
                    <h3>${lead.name}</h3>
                    <span class="lead-role">${lead.role} • ${chapter.college}</span>
                    <p class="lead-bio">${lead.bio}</p>
                    <div class="lead-stats">
                        <span><i class="fa-solid fa-industry"></i> <strong>${lead.projectsCount}</strong> Company Connections</span>
                        <span><i class="fa-solid fa-file-invoice"></i> <strong>${lead.materialsCount}</strong> Material Resources</span>
                    </div>
                </div>
                <button class="action-btn primary-btn contact-lead-btn" onclick="openContactLeadModal('${chapter.name}')">
                    <i class="fa-solid fa-envelope"></i> Contact College Lead
                </button>
            </div>
        `;
    }
}

// --- PROJECT SHOWCASE RENDERING & CONTROLLERS ---
function renderProjectShowcase() {
    const gridEl = DOM.showcaseCardsGrid;
    if (!gridEl) return;

    gridEl.innerHTML = '';
    let items = STATE.showcases;

    // Apply Search
    if (STATE.showcaseSearchQuery) {
        const query = STATE.showcaseSearchQuery;
        items = items.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.publisher.toLowerCase().includes(query) ||
            item.mentor.toLowerCase().includes(query) ||
            item.team.some(t => t.name.toLowerCase().includes(query))
        );
    }

    // Apply Domain Filter
    if (STATE.showcaseSelectedDomain !== 'all') {
        const domain = STATE.showcaseSelectedDomain.toLowerCase();
        items = items.filter(item => item.domain.toLowerCase() === domain);
    }

    // Apply Sorting
    if (STATE.showcaseSelectedSort === 'likes') {
        items.sort((a, b) => b.likes - a.likes);
    } else if (STATE.showcaseSelectedSort === 'title') {
        items.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (items.length === 0) {
        gridEl.innerHTML = `
            <div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
                <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 10px; display: block; color: var(--border-color);"></i>
                No project showcases found matching your filters.
            </div>
        `;
        return;
    }

    items.forEach((item, index) => {
        const card = document.createElement('article');
        const domainClass = item.domain.toLowerCase();
        card.className = `showcase-card shadow-sm domain-${domainClass}`;
        card.style.animationDelay = `${index * 0.06}s`;
        
        let avatarsHtml = '';
        item.team.forEach(member => {
            avatarsHtml += `<div class="avatar-pile-item" data-tooltip="${member.name} - ${member.role}">${member.avatar}</div>`;
        });

        const likedClass = item.liked ? 'liked' : '';
        
        card.innerHTML = `
            <div>
                <div class="showcase-card-header">
                    <span class="showcase-domain-tag ${domainClass}">${item.domain}</span>
                    <button class="showcase-upvote-btn ${likedClass}" onclick="likeShowcase(${item.id})">
                        <i class="fa-solid fa-thumbs-up"></i> <span class="like-count">${item.likes}</span>
                    </button>
                </div>
                <h3 class="showcase-title">${item.title}</h3>
                <p class="showcase-desc">${item.description}</p>
                
                <div class="showcase-authority-row">
                    <i class="fa-solid fa-circle-check"></i>
                    <div class="showcase-authority-info">
                        <span class="showcase-authority-label">Supervising Authority</span>
                        <span class="showcase-authority-value">${item.mentor} (${item.institution})</span>
                    </div>
                </div>
            </div>
            
            <div>
                <div class="showcase-links-row">
                    <a href="${item.paperLink}" target="_blank" class="showcase-link-btn paper">
                        <i class="fa-solid fa-file-pdf"></i> Read Paper
                    </a>
                    <a href="${item.demoLink}" target="_blank" class="showcase-link-btn demo">
                        <i class="fa-solid fa-laptop-code"></i> Try Tool / Demo
                    </a>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 10px;">
                    <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; font-family: var(--font-mono)">Team Members</span>
                    <div class="avatar-pile">
                        ${avatarsHtml}
                    </div>
                </div>
            </div>
        `;
        
        gridEl.appendChild(card);
    });
}

window.likeShowcase = async (id) => {
    const item = STATE.showcases.find(s => s.id === id);
    if (item) {
        let nextLikes = item.likes;
        let nextLiked = !item.liked;
        if (item.liked) {
            nextLikes -= 1;
            showToast(`Removed upvote from '${item.title}'`);
        } else {
            nextLikes += 1;
            showToast(`Upvoted '${item.title}'!`);
        }

        if (supabase) {
            try {
                const { error } = await supabase.from('showcases').update({
                    likes: nextLikes,
                    liked: nextLiked
                }).eq('id', id);
                if (error) throw error;
                await loadDataFromSupabase();
            } catch (err) {
                console.error("Error updating upvote in Supabase:", err);
            }
        } else {
            item.likes = nextLikes;
            item.liked = nextLiked;
        }

        renderProjectShowcase();
        updateDashboardUI();
        renderDashboardTabLists();
    }
};

window.openShowcaseSubmissionModal = () => {
    const modal = document.getElementById('showcase-project-modal');
    if (!modal) return;
    
    // Populate dropdown
    const select = document.getElementById('showcase-input-mentor');
    if (select) {
        select.innerHTML = '<option value="">Select Supervising Mentor / Investigator</option>';
        STATE.directory.forEach(p => {
            select.innerHTML += `<option value="${p.name}">${p.name} (${p.institution})</option>`;
        });
        
        // Auto select Dr. Samir Kalra as default or first
        select.value = "Dr. Samir Kalra";
        const match = STATE.directory.find(d => d.name === "Dr. Samir Kalra");
        if (match && DOM.showcaseInputInst) {
            DOM.showcaseInputInst.value = match.institution;
        }
    }
    
    // Clear and preset other fields
    document.getElementById('showcase-input-title').value = '';
    document.getElementById('showcase-input-publisher').value = '';
    document.getElementById('showcase-input-desc').value = '';
    document.getElementById('showcase-input-team').value = STATE.user.name ? `${STATE.user.name} (${STATE.activeRole === 'student' ? 'Lead Researcher' : 'Collaborator'})` : '';
    document.getElementById('showcase-input-paper').value = '';
    document.getElementById('showcase-input-demo').value = '';
    
    modal.classList.add('active');
};

window.closeShowcaseSubmissionModal = () => {
    const modal = document.getElementById('showcase-project-modal');
    if (modal) modal.classList.remove('active');
};

function renderDashboardSupervisedShowcases() {
    const listEl = DOM.supervisedShowcasesList;
    const emptyEl = DOM.supervisedShowcasesEmptyState;
    if (!listEl) return;

    listEl.innerHTML = '';
    const userMentorName = STATE.user.name;
    const matches = STATE.showcases.filter(s => s.mentor === userMentorName);

    if (matches.length === 0) {
        if (emptyEl) emptyEl.classList.remove('hidden');
        document.getElementById('supervised-showcases-table').classList.add('hidden');
    } else {
        if (emptyEl) emptyEl.classList.add('hidden');
        document.getElementById('supervised-showcases-table').classList.remove('hidden');
        matches.forEach(item => {
            const teamNames = item.team.map(t => `${t.name} (${t.role})`).join(', ');
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${item.title}</strong></td>
                <td><span style="font-size:0.78rem; color:var(--text-muted);">${teamNames}</span></td>
                <td><code style="font-size:0.75rem; color:var(--color-teal);">${item.publisher}</code></td>
                <td><span class="badge-tag status-review"><i class="fa-solid fa-thumbs-up"></i> ${item.likes}</span></td>
                <td><span class="badge-tag status-shortlist"><i class="fa-solid fa-circle-check"></i> Supervised</span></td>
            `;
            listEl.appendChild(tr);
        });
    }
}

// --- STUDENT STREAK & CREDITS SYSTEM ---
function getStreakMultiplier() {
    if (STATE.user.streak >= 7) return 1.5;
    if (STATE.user.streak >= 3) return 1.25;
    return 1.0;
}

function renderStreakWidget() {
    const streakDaysEl = document.getElementById('streak-days-display');
    const creditsBalanceEl = document.getElementById('credits-balance-display');
    const checklistContainer = document.getElementById('daily-checklist-container');
    
    if (streakDaysEl) streakDaysEl.textContent = STATE.user.streak;
    if (creditsBalanceEl) creditsBalanceEl.textContent = STATE.user.credits;
    
    if (checklistContainer) {
        checklistContainer.innerHTML = '';
        const multiplier = getStreakMultiplier();
        
        Object.keys(STATE.user.dailyTasks).forEach(taskId => {
            const task = STATE.user.dailyTasks[taskId];
            const completed = task.completed;
            
            const item = document.createElement('div');
            item.className = 'checklist-item';
            item.style.cssText = `display: flex; align-items: center; justify-content: space-between; background: var(--bg-page); padding: 10px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); opacity: ${completed ? '0.75' : '1'}; transition: all 0.2s ease;`;
            
            const leftSide = document.createElement('div');
            leftSide.style.cssText = "display: flex; align-items: center; gap: 10px;";
            
            const checkIcon = document.createElement('i');
            if (completed) {
                checkIcon.className = "fa-solid fa-square-check";
                checkIcon.style.cssText = "font-size: 1.15rem; color: #10b981; cursor: default;";
            } else {
                checkIcon.className = "fa-regular fa-square";
                checkIcon.style.cssText = "cursor: pointer; font-size: 1.15rem; color: var(--text-muted);";
                if (taskId === 'solveQuiz') {
                    checkIcon.onclick = () => openDailyQuizModal();
                } else {
                    checkIcon.onclick = () => claimTaskCredits(taskId);
                }
            }
            
            const labelSpan = document.createElement('span');
            labelSpan.className = 'task-label';
            labelSpan.style.cssText = `font-size: 0.78rem; font-weight: 600; text-decoration: ${completed ? 'line-through' : 'none'}; color: ${completed ? 'var(--text-muted)' : 'var(--text-main)'};`;
            labelSpan.textContent = task.label;
            
            leftSide.appendChild(checkIcon);
            leftSide.appendChild(labelSpan);
            
            const rewardSpan = document.createElement('span');
            rewardSpan.className = 'task-reward';
            rewardSpan.style.cssText = `font-size: 0.7rem; font-weight: 800; color: ${completed ? 'var(--text-muted)' : '#10b981'};`;
            
            const rewardVal = Math.round(task.credits * multiplier);
            rewardSpan.textContent = completed ? 'Claimed' : `+${rewardVal} Credits`;
            
            item.appendChild(leftSide);
            item.appendChild(rewardSpan);
            
            checklistContainer.appendChild(item);
        });
    }
}

window.claimTaskCredits = (taskId) => {
    const task = STATE.user.dailyTasks[taskId];
    if (task && !task.completed) {
        const multiplier = getStreakMultiplier();
        const reward = Math.round(task.credits * multiplier);
        
        // Add credits
        STATE.user.credits += reward;
        task.completed = true;
        
        // Check if this was their first task today to extend streak
        const completedTasksCount = Object.values(STATE.user.dailyTasks).filter(t => t.completed).length;
        if (completedTasksCount === 1) {
            STATE.user.streak += 1;
            showToast(`🔥 Streak Extended! You are now on a ${STATE.user.streak}-day streak!`);
        }
        
        showToast(`🪙 Claimed +${reward} Credits for: ${task.label}!`);
        
        renderStreakWidget();
        updateDashboardUI();
    }
};

window.openDailyQuizModal = () => {
    const modal = document.getElementById('daily-quiz-modal');
    const body = document.getElementById('quiz-modal-body');
    if (!modal || !body) return;
    
    body.innerHTML = '';
    
    if (STATE.user.dailyQuiz.solved) {
        body.innerHTML = `
            <div style="text-align: center; padding: 20px 0;">
                <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: #10b981; margin-bottom: 15px; display: block;"></i>
                <h4 style="font-weight: 800; color: var(--text-main); margin-bottom: 8px;">Quiz Solved Successfully!</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px;">
                    You have earned 15 credits (+ streak bonus) for today's quiz. Check back tomorrow for a new question!
                </p>
                <button class="auth-submit-btn primary" onclick="closeDailyQuizModal()" style="width: 100%;">Great, Close</button>
            </div>
        `;
    } else {
        const q = STATE.user.dailyQuiz;
        let optionsHtml = '';
        q.options.forEach((opt, idx) => {
            optionsHtml += `
                <button class="outline-action-btn" onclick="submitDailyQuiz(${idx})" style="width: 100%; text-align: left; padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-weight: 600; font-size: 0.85rem; margin-bottom: 8px; justify-content: flex-start; cursor: pointer; transition: all 0.2s ease;">
                    <span style="display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; background: var(--bg-page); border: 1px solid var(--border-color); font-size: 0.72rem; margin-right: 12px; font-weight: 800;">${String.fromCharCode(65 + idx)}</span>
                    ${opt}
                </button>
            `;
        });
        
        body.innerHTML = `
            <div style="padding-bottom: 10px;">
                <h4 style="font-weight: 800; color: var(--text-main); line-height: 1.4; margin-bottom: 16px;">
                    ${q.question}
                </h4>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${optionsHtml}
                </div>
                <div style="margin-top: 15px; text-align: center;">
                    <span style="font-size: 0.7rem; font-weight: 800; color: #ea580c; display: inline-flex; align-items: center; gap: 4px; background: #fff7ed; padding: 4px 10px; border-radius: 20px; border: 1px solid #fed7aa;">
                        <i class="fa-solid fa-coins"></i> Reward: 15 Credits + Streak Multiplier
                    </span>
                </div>
            </div>
        `;
    }
    
    modal.classList.add('active');
};

window.closeDailyQuizModal = () => {
    const modal = document.getElementById('daily-quiz-modal');
    if (modal) modal.classList.remove('active');
};

window.submitDailyQuiz = (optionIdx) => {
    const q = STATE.user.dailyQuiz;
    if (optionIdx === q.answer) {
        q.solved = true;
        
        // Claim the solveQuiz credits
        claimTaskCredits('solveQuiz');
        
        // Redraw quiz modal to solved view
        openDailyQuizModal();
    } else {
        showToast("❌ Incorrect answer! Try again.");
    }
};

function renderAdminUsers() {
    const listContainer = document.getElementById('admin-users-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    const searchQuery = (document.getElementById('admin-user-search')?.value || '').trim().toLowerCase();
    
    let filtered = STATE.allProfiles || [];
    if (searchQuery) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchQuery) ||
            p.institution.toLowerCase().includes(searchQuery) ||
            p.domain.toLowerCase().includes(searchQuery)
        );
    }
    
    if (filtered.length === 0) {
        listContainer.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:var(--text-muted);">No profiles found.</td></tr>`;
        return;
    }
    
    filtered.forEach(p => {
        const tr = document.createElement('tr');
        const badgeClass = p.role === 'admin' ? 'label-blue' : (p.role === 'researcher' ? 'text-green' : (p.role === 'mentor' ? 'label-purple' : ''));
        const linkedinVal = p.linkedin_url ? `<a href="${p.linkedin_url}" target="_blank" style="color:var(--color-primary); font-size:0.75rem;"><i class="fa-brands fa-linkedin"></i> View</a>` : '<span style="color:var(--text-muted); font-size:0.75rem;">None</span>';
        
        tr.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:8px;">
                    ${getAvatarHtml(p.name, p.role, "width:28px; height:28px; font-size:0.8rem;")}
                    <span style="font-weight:700;">${p.name}</span>
                </div>
            </td>
            <td><span class="badge-tag ${badgeClass}">${p.role.toUpperCase()}</span></td>
            <td>${p.institution}</td>
            <td>${p.domain}</td>
            <td>${linkedinVal}</td>
            <td>
                <span class="badge-tag" style="background-color:${p.verified ? 'var(--color-emerald-bg)' : 'var(--color-red-bg)'}; color:${p.verified ? 'var(--color-green)' : 'var(--color-red)'}">
                    ${p.verified ? 'Verified' : 'Unverified'}
                </span>
            </td>
            <td class="action-column">
                <div style="display:flex; gap:6px;">
                    <button class="action-btn primary-btn" style="font-size:0.75rem; padding:3px 8px;" onclick="openAdminEditProfileModal('${p.id}')">
                        <i class="fa-solid fa-pen"></i> Edit
                    </button>
                    <button class="action-btn outline-btn" style="color:var(--color-red); border-color:var(--color-red); font-size:0.75rem; padding:3px 8px;" onclick="adminDeleteUser('${p.id}')">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        `;
        listContainer.appendChild(tr);
    });
}

window.openAdminEditProfileModal = (userId) => {
    const modal = document.getElementById('admin-user-modal');
    if (!modal) return;
    
    const p = (STATE.allProfiles || []).find(item => item.id.toString() === userId.toString());
    if (!p) return;
    
    document.getElementById('admin-user-modal-title').textContent = "Edit Profile";
    document.getElementById('admin-user-id').value = p.id;
    document.getElementById('admin-user-name').value = p.name;
    document.getElementById('admin-user-role').value = p.role;
    document.getElementById('admin-user-verified').checked = p.verified;
    document.getElementById('admin-user-institution').value = p.institution;
    document.getElementById('admin-user-domain').value = p.domain;
    document.getElementById('admin-user-linkedin').value = p.linkedin_url || '';
    document.getElementById('admin-user-skills').value = (p.skills || []).join(', ');
    
    const preview = document.getElementById('admin-avatar-preview');
    if (preview) {
        if (p.avatar_url) {
            preview.innerHTML = `<img src="${p.avatar_url}" style="width:100%; height:100%; object-fit:cover;" />`;
        } else {
            const initial = p.name.charAt(0);
            preview.innerHTML = `<span class="preview-initials">${initial}</span>`;
        }
    }
    
    modal.classList.add('active');
};

window.openAdminCreateProfileModal = () => {
    const modal = document.getElementById('admin-user-modal');
    if (!modal) return;
    
    document.getElementById('admin-user-modal-title').textContent = "Create New Profile";
    document.getElementById('admin-user-id').value = '';
    document.getElementById('admin-user-form').reset();
    
    const preview = document.getElementById('admin-avatar-preview');
    if (preview) {
        preview.innerHTML = `<span class="preview-initials">U</span>`;
    }
    
    modal.classList.add('active');
};

window.closeAdminUserModal = () => {
    const modal = document.getElementById('admin-user-modal');
    if (modal) modal.classList.remove('active');
};

window.adminDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    
    if (supabase) {
        try {
            const { error } = await supabase.from('profiles').delete().eq('id', userId);
            if (error) throw error;
            showToast("Profile deleted successfully.");
            await loadDataFromSupabase();
            updateDashboardUI();
            renderAllPageContents();
        } catch (err) {
            console.error("Error deleting profile:", err);
            showToast("Error deleting profile.");
        }
    } else {
        STATE.allProfiles = (STATE.allProfiles || []).filter(item => item.id.toString() !== userId.toString());
        STATE.directory = STATE.directory.filter(item => item.id.toString() !== userId.toString());
        showToast("Profile deleted successfully.");
        updateDashboardUI();
        renderAllPageContents();
    }
};

// ─── INFO PAGE MODAL HELPERS ─────────────────────────────────────────────────
window.openInfoModal = function(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
        el.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeInfoModal = function(modalId) {
    const el = document.getElementById(modalId);
    if (el) {
        el.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Close info modals on overlay backdrop click
document.addEventListener('click', (e) => {
    const infoModals = [
        'modal-sponsors','modal-workshops','modal-university',
        'modal-hiring','modal-security','modal-terms',
        'modal-ugc','modal-partnership','modal-certificate','modal-student-quiz',
        'modal-resume-viewer'
    ];
    infoModals.forEach(id => {
        const modal = document.getElementById(id);
        if (modal && e.target === modal) {
            closeInfoModal(id);
        }
    });
});

// Partnership contact form submission
window.submitPartnershipForm = function(e) {
    e.preventDefault();
    const name    = document.getElementById('partner-name')?.value.trim() || '';
    const org     = document.getElementById('partner-org')?.value.trim() || '';
    const email   = document.getElementById('partner-email')?.value.trim() || '';
    const type    = document.getElementById('partner-type')?.value || '';
    const message = document.getElementById('partner-message')?.value.trim() || '';

    if (!name || !org || !email || !type || !message) {
        showToast('Please fill all fields before submitting.');
        return;
    }

    // In production this would POST to a backend/email service.
    // For now we show a confirmation toast and reset the form.
    showToast(`Partnership inquiry from ${name} (${org}) sent to partners@biolabs.in!`);
    document.getElementById('partnership-contact-form')?.reset();
    closeInfoModal('modal-partnership');
};

// --- STAGE 3: OPPORTUNITY TOGGLE AND TRANSACTIONS ---
window.toggleOpportunityFormFields = function() {
    const projType = document.getElementById('proj-type')?.value;
    const fellowshipExtra = document.getElementById('opp-fellowship-extra');
    const problemExtra = document.getElementById('opp-problem-extra');
    if (!projType) return;
    
    if (projType === 'fellowship') {
        if (fellowshipExtra) fellowshipExtra.style.display = 'block';
        if (problemExtra) problemExtra.style.display = 'none';
    } else if (projType === 'problem') {
        if (fellowshipExtra) fellowshipExtra.style.display = 'none';
        if (problemExtra) problemExtra.style.display = 'block';
    } else {
        if (fellowshipExtra) fellowshipExtra.style.display = 'none';
        if (problemExtra) problemExtra.style.display = 'none';
    }
};

window.filterOpportunitiesByType = function(type, btn) {
    STATE.oppTypeFilter = type;
    
    const tabs = document.querySelectorAll('.opp-type-tab');
    tabs.forEach(t => {
        if (t.getAttribute('data-type') === type) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });

    renderGlobalOpportunities();
    renderDashboardOpportunities();
};

window.viewApplicantResume = async function(appId) {
    const applicant = STATE.applicants.find(a => a.id === appId);
    if (!applicant) {
        showToast("❌ Applicant not found.");
        return;
    }
    
    let resumeUrl = '';
    const profile = (STATE.allProfiles || []).find(p => p.name === applicant.name);
    if (profile) {
        resumeUrl = profile.resume_url;
    }

    if (!resumeUrl && supabase) {
        try {
            const { data } = await supabase.from('profiles').select('resume_url').eq('name', applicant.name).single();
            if (data) resumeUrl = data.resume_url;
        } catch (e) {
            console.error("Error fetching applicant resume:", e);
        }
    }

    const bodyEl = document.getElementById('resume-viewer-body');
    const titleEl = document.getElementById('resume-viewer-title');
    
    if (titleEl) {
        titleEl.textContent = `${applicant.name}'s Resume Preview`;
    }
    
    if (bodyEl) {
        if (resumeUrl) {
            bodyEl.innerHTML = `<iframe src="${resumeUrl}" style="width: 100%; height: 100%; border: none;"></iframe>`;
        } else {
            bodyEl.innerHTML = `
                <div style="padding: 40px; text-align: center; color: var(--text-muted); display:flex; flex-direction:column; gap:10px; align-items:center; justify-content:center; width:100%; height:100%;">
                    <i class="fa-solid fa-file-excel" style="font-size: 2.5rem; color:var(--color-red);"></i>
                    <p style="margin:0; font-weight:700;">No resume uploaded by this student.</p>
                </div>
            `;
        }
    }

    window.openInfoModal('modal-resume-viewer');
};

window.bookMentorshipSession = async function(sessionId) {
    if (!requireAuth('Sign in to book mentorship sessions.')) return;

    const session = STATE.sessions.find(s => s.id === sessionId);
    if (!session) return;

    const price = session.price_credits || 0;
    const confirmBook = confirm(`Do you want to book this session for ${price > 0 ? price + ' credits' : 'free'}?`);
    if (!confirmBook) return;

    if (price > 0 && STATE.user.credits < price) {
        showToast(`❌ Insufficient credits. You need ${price} credits.`);
        return;
    }

    const oldCredits = STATE.user.credits;
    const newStudentCredits = oldCredits - price;
    
    let mentorProfile = null;
    let newMentorCredits = 0;
    
    if (session.mentor_id) {
        mentorProfile = (STATE.allProfiles || []).find(p => p.user_id === session.mentor_id);
    } else if (session.mentor_name) {
        mentorProfile = (STATE.allProfiles || []).find(p => p.name === session.mentor_name);
    }

    if (mentorProfile) {
        newMentorCredits = (mentorProfile.credits || 0) + price;
    }

    if (supabase) {
        try {
            const { error: sessionErr } = await supabase.from('mentorship_sessions')
                .update({ 
                    student: STATE.user.name, 
                    status: 'Scheduled',
                    platform: 'Google Meet / Zoom'
                })
                .eq('id', sessionId);
            if (sessionErr) throw sessionErr;

            if (price > 0) {
                const { error: studentErr } = await supabase.from('profiles').update({ credits: newStudentCredits }).eq('id', STATE.user.id);
                if (studentErr) throw studentErr;

                if (mentorProfile) {
                    const { error: mentorErr } = await supabase.from('profiles').update({ credits: newMentorCredits }).eq('id', mentorProfile.id);
                    if (mentorErr) throw mentorErr;
                }
            }

            showToast(`✅ Session booked successfully!`);
            await loadDataFromSupabase();
        } catch (e) {
            console.error("Error booking session:", e);
            showToast("❌ Booking failed: " + e.message);
            return;
        }
    } else {
        session.student = STATE.user.name;
        session.status = 'Scheduled';
        if (price > 0) {
            STATE.user.credits = newStudentCredits;
            if (mentorProfile) {
                mentorProfile.credits = newMentorCredits;
            }
        }
        showToast(`✅ Session booked locally!`);
    }

    renderAllPageContents();
    updateDashboardUI();
};

// Start execution on window load
window.onload = init;
