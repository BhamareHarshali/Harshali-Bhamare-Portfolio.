import { ProjectItem, SkillCategory, EducationItem, ExperienceItem, AchievementItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Harshali Bhamare',
  role: 'Python & Full-Stack Developer',
  titles: [
    'Python Developer',
    'Full-Stack Developer',
    'Computer Science Engineer',
  ],
  tagline: 'Building practical applications with Python and modern web technologies.',
  email: 'harshalibhamare729@gmail.com',
  location: 'Nashik, Maharashtra, India',
  educationSummary: 'B.Tech in Computer Science (CGPA: 8.93)',
  // Public downloadable resume path (actual uploaded PDF)
  resumeUrl: '/Harshali_Bhamare_Resume.pdf',
  resumeFilename: 'Harshali_Bhamare_Resume.pdf',
  // Official social profile links
  githubUrl: 'https://github.com/BhamareHarshali',
  githubToolkitUrl: 'https://github.com/BhamareHarshali/Python-Toolkit',
  linkedinUrl: 'https://www.linkedin.com/in/harshalibhamare/',
  about: `I am a Computer Science graduate with a strong foundation in Python, web development, SQL, and software development. I have hands-on experience building Python applications, Flask-based web applications, and interactive chatbot interfaces. With a focus on clean Object-Oriented design, efficient algorithms, and robust CRUD architectures, I enjoy developing practical software solutions and continuously expanding my technical capabilities.`,
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Core languages utilized for application logic, scripting, and system algorithms',
    skills: [
      { name: 'Python', description: 'Core Python, OOP, scripting, data handling & automation', featured: true },
      { name: 'JavaScript', description: 'Modern ES6+, DOM manipulation & interactive client logic' },
      { name: 'HTML5', description: 'Semantic, accessible, and structured markup' },
      { name: 'CSS3', description: 'Responsive layouts, modern styling & animations' },
    ],
  },
  {
    title: 'Backend Development',
    description: 'Server architectures, RESTful API design, and routing mechanisms',
    skills: [
      { name: 'Python', description: 'Backend service logic and server-side computations', featured: true },
      { name: 'Flask', description: 'Microframework for lightweight RESTful web services & APIs', featured: true },
      { name: 'REST APIs', description: 'Designing clean endpoints, JSON payloads & HTTP methods' },
    ],
  },
  {
    title: 'Frontend Development',
    description: 'User interface design, state management, and modern component libraries',
    skills: [
      { name: 'React', description: 'Component-based architecture, hooks & responsive UIs', featured: true },
      { name: 'Next.js', description: 'Modern React framework for optimized production rendering' },
      { name: 'Tailwind CSS', description: 'Utility-first modern styling and dark mode systems' },
    ],
  },
  {
    title: 'Databases & Storage',
    description: 'Relational database schema modeling, queries, and optimization',
    skills: [
      { name: 'MySQL', description: 'Relational data modeling, foreign keys & complex queries', featured: true },
      { name: 'SQLite', description: 'Embedded lightweight relational database management' },
      { name: 'Database Indexes', description: 'Query performance indexing and data retrieval optimization' },
    ],
  },
  {
    title: 'Developer Tools',
    description: 'Version control, development environments, and ecosystem workflows',
    skills: [
      { name: 'Git', description: 'Branch management, commits & collaborative workflows', featured: true },
      { name: 'GitHub', description: 'Repository hosting, version history & open source collaboration' },
      { name: 'VS Code', description: 'Primary IDE for Python and web development' },
    ],
  },
  {
    title: 'Computer Science Fundamentals',
    description: 'Theoretical foundations applied directly to software development',
    skills: [
      { name: 'Object-Oriented Programming (OOP)', description: 'Encapsulation, inheritance, modular class design & polymorphism' },
      { name: 'Data Structures & Algorithms', description: 'Arrays, linked lists, trees, search & sorting techniques' },
      { name: 'CRUD Operations', description: 'Create, Read, Update, and Delete data lifecycle management' },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'digital-ration-card',
    title: 'Digital Ration Card Management System',
    subtitle: 'Automated citizen registration and distribution portal',
    category: 'Full-Stack',
    technologies: ['Python', 'Flask', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    description:
      'A web-based Digital Ration Card Management System created to automate ration card registration and public food distribution processes. Built with complete CRUD operations for managing citizen records, household entitlement categories, and real-time application processing.',
    highlights: [
      'Engineered automated citizen record management with full CRUD capability',
      'Integrated MySQL database for persistent household and ration allocation data',
      'Designed a clean, responsive front-end interface for streamlined user and administrator interaction',
      'Implemented secure form verification and structured status tracking',
    ],
    githubUrl: 'https://github.com/BhamareHarshali/Python-Toolkit/tree/main/Digital_ration_card-updated',
    image: '/images/project_ration_card_1793010976244.jpg',
  },
  {
    id: 'visionfly-ai',
    title: 'VisionFly AI: Gesture-Controlled Flight Interface',
    subtitle: 'Touchless aerospace flight control powered by computer vision',
    category: 'Computer Vision & AI',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
    description:
      'A real-time hand gesture recognition system designed for touchless flight control. Uses high-accuracy hand landmark tracking to translate natural hand movements into directional flight commands and motion vectors.',
    highlights: [
      'Developed real-time hand tracking utilizing Google MediaPipe landmark detection',
      'Implemented OpenCV video stream processing pipelines with minimal latency',
      'Mapped skeletal hand postures (pitch, roll, yaw) to flight trajectory controls',
      'Engineered visual feedback telemetry on live camera feeds',
    ],
    githubUrl: 'https://github.com/BhamareHarshali/Python-Toolkit/tree/main/bird-flight-project/bird-flight-project',
    image: '/images/project_visionfly_gesture_1793010976078.jpg',
  },
  {
    id: 'chatbirdie',
    title: 'ChatBirdie',
    subtitle: 'Python-based intelligent conversational desktop application',
    category: 'Python Desktop',
    technologies: ['Python', 'Tkinter'],
    description:
      'A Python-based desktop chatbot application built with a responsive graphical user interface. Designed with structured conversational flows and modular code organization for rapid question-and-answer interactions.',
    highlights: [
      'Designed an intuitive desktop GUI using Python Tkinter',
      'Implemented automated prompt matching and conversational responses',
      'Created modular message rendering with scrollable chat history',
      'Followed clean Object-Oriented architectural principles for maintainability',
    ],
    githubUrl: 'https://github.com/BhamareHarshali/practice-code-collection_python/tree/main/ChatBirdie',
    image: '/images/project_chatbirdie_gui_1793010976716.jpg',
  },
  {
    id: 'tictactoe-ai',
    title: 'Tic Tac Toe AI Game',
    subtitle: 'Gesture-interactive game powered by AI opponent logic',
    category: 'Computer Vision & AI',
    technologies: ['Python', 'Tkinter', 'MediaPipe'],
    description:
      'An interactive Tic Tac Toe game featuring touchless gesture-based grid selection and an intelligent AI opponent algorithm. Users can play through computer vision gesture detection without touching the mouse or keyboard.',
    highlights: [
      'Integrated MediaPipe computer vision to recognize gesture input for cell selection',
      'Constructed an AI opponent logic engine that calculates optimal strategic moves',
      'Built a responsive graphical board using Python Tkinter',
      'Provides real-time visual feedback on winning conditions and ties',
    ],
    githubUrl: 'https://github.com/BhamareHarshali/Python-Toolkit/tree/main/Tic_Tac_Toe_Game',
    image: '/images/project_tictactoe_ai_1793010977265.jpg',
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'btech-cs',
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Sandip University',
    location: 'Nashik, Maharashtra',
    duration: '2023 – 2026',
    scoreLabel: 'Current CGPA',
    score: '8.93 / 10',
    details: [
      'Core focus on Object-Oriented Programming, Data Structures, Relational Database Management, and Web Technologies.',
      'Active participation in national technical symposiums and university innovation hackathons.',
      'Consistently maintained top-tier academic performance with an 8.93 CGPA.',
    ],
  },
  {
    id: 'diploma-ce',
    degree: 'Diploma in Computer Engineering',
    institution: 'Rajshri Shahu Maharaj Polytechnic',
    location: 'Nashik, Maharashtra',
    duration: '2020 – 2023',
    scoreLabel: 'Score',
    score: '76%',
    details: [
      'Fundamental training in computer hardware, basic programming concepts, and operating systems.',
      'Completed foundational coursework in C/C++, HTML, and database basics.',
      'Successfully graduated with first class distinction.',
    ],
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'exp-nexanova',
    role: 'Application Development Intern',
    company: 'Nexanova Protech',
    location: 'Pune, Maharashtra',
    duration: 'Jul 2025',
    tools: ['Java', 'Android Studio', 'MySQL', 'Git'],
    points: [
      'Contributed to Android mobile application development, improving feature delivery speed by 30% through efficient testing and version control.',
      'Coordinated with cross-functional technical teams to achieve 95% on-time milestone completion.',
      'Participated in code reviews, bug fixes, and database query optimizations using MySQL.',
    ],
  },
  {
    id: 'exp-ybi',
    role: 'Python Full Stack Developer Intern',
    company: 'YBI Foundation',
    location: 'Remote',
    duration: 'Jun 2024',
    tools: ['HTML', 'CSS', 'JavaScript', 'Python'],
    points: [
      'Collaborated with a distributed engineering team to design, build, and test responsive web pages.',
      'Applied software debugging and coding best practices to improve performance and code maintainability.',
      'Built interactive frontend components connected to Python backend logic.',
    ],
  },
  {
    id: 'exp-caliber',
    role: 'Web Development Intern',
    company: 'Caliber InfoTech',
    location: 'Nashik, Maharashtra',
    duration: 'Aug 2022',
    tools: ['HTML', 'CSS', 'JavaScript', 'Python', 'MySQL'],
    points: [
      'Developed and optimized 5+ responsive web pages using HTML, CSS, and JavaScript, improving page load time by 25%.',
      'Integrated MySQL databases with dynamic front-end interfaces, enabling real-time data interaction for over 1,000 users.',
      'Constructed database schemas, wrote data retrieval queries, and ensured cross-browser compatibility.',
    ],
  },
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'ach-first-place',
    title: 'National Level Project Competition',
    category: 'Competition Award',
    organization: 'Technical Symposium',
    details: 'Secured 1st place among 200+ competitive engineering participants for innovative project design and execution.',
    verified: true,
  },
  {
    id: 'ach-deloitte',
    title: 'Deloitte Data Analytics Virtual Experience',
    category: 'Professional Experience',
    organization: 'Forage / Deloitte',
    details: 'Built interactive Tableau business intelligence dashboards and conducted rigorous analysis of system telemetry data.',
    verified: true,
  },
  {
    id: 'ach-ybi-cert',
    title: 'Web Development Internship Certification',
    category: 'Certification',
    organization: 'YBI Foundation',
    details: 'Successfully completed full-stack web development training with responsive interface design and performance optimization.',
    verified: true,
  },
  {
    id: 'ach-bharatiya-antariksha',
    title: 'Bharatiya Antariksha Hackathon',
    category: 'Hackathon Award',
    organization: 'Space & Technology Hackathon',
    details: 'Engineered an interactive satellite data visualization module for processing and interpreting spatial data streams.',
    verified: true,
  },
  {
    id: 'ach-python-cert',
    title: 'Python Programming Certification',
    category: 'Certification',
    organization: 'Technical Academy',
    details: 'Completed rigorous certification training in core Python programming, data structures, and practical data handling.',
    verified: true,
  },
];
