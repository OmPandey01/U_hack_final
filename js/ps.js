


const problemButtons = document.querySelectorAll('.prblm_btn');
const problemDialog = document.getElementById('problemDialog');
const descriptionDialog = document.getElementById('descriptionDialog');
const problemContent = document.getElementById('problemContent');
const descriptionTable = document.getElementById('descriptionTable');
const closeButtons = document.querySelectorAll('.close');

problemButtons.forEach(button => {
    button.addEventListener('click', () => {
        const problemId = button.getAttribute('data-problem');
        const theme = problemData[problemId];

        if (!theme) {
            console.error(`No theme found for ${problemId}`);
            alert(`No theme found for this problem.`);
            return;
        }

        let problems = [];
        for (let subdomain in theme.subdomains) {
            problems = problems.concat(theme.subdomains[subdomain]);
        }

        if (problems.length === 0) {
            console.error(`No problems found for Theme ${problemId}`);
            alert(`No problems found for this theme.`);
            return;
        }

        let content = '';
        problems.forEach((problem, index) => {
            content += `<p><span class="prblm_color" data-problem="${problemId}" data-index="${index}">${problem.title}</span></p>`;
        });
        problemContent.innerHTML = content;
        problemDialog.style.display = 'block';
    });
});
problemContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('prblm_color')) {
        const problemId = e.target.getAttribute('data-problem');
        const problemIndex = parseInt(e.target.getAttribute('data-index'));
        const theme = problemData[problemId];

        if (!theme) {
            console.error('Theme not found');
            return;
        }

        let problems = [];
        for (let subdomain in theme.subdomains) {
            problems = problems.concat(theme.subdomains[subdomain]);
        }

        const problem = problems[problemIndex];

        if (!problem) {
            console.error('Problem not found');
            return;
        }


        let tableContent = `
            <tr><th>Problem Statement ID</th><td>${problem.id}</td></tr>
            <tr><th>Problem Context</th><td>${problem.ProblemContext}</td></tr>
            <tr><th>Challenge Statement</th><td>${problem.ChallengeStatement}</td></tr>
            <tr><th>Expected Features</th><td>${problem.ExpectedFeatures}</td></tr>
            <tr><th>Evaluation Criteria</th><td>${problem.EvaluationCriteria}</td></tr>
            <tr><th>Expected Impact</th><td>${problem.ExpectedImpact}</td></tr>
        `;

        // let tableContent = `
        //     <tr><th>Problem Statement ID</th><td>${problem.id}</td></tr>
        //     <tr><th>Problem Statement Title</th><td>${problem.title}</td></tr>
        //     <tr><th>Problem Context</th><td>${problem.ProblemContext}</td></tr>
        //     <tr><th>Challenge Statement</th><td>${problem.ChallengeStatement}</td></tr>
        //     <tr><th>Expected Features</th><td>${problem.ExpectedFeatures}</td></tr>
        //     <tr><th>Evaluation Criteria</th><td>${problem.EvaluationCriteria}</td></tr>
        //     <tr><th>Expected Impact</th><td>${problem.ExpectedImpact}</td></tr>
        // `;


        descriptionTable.innerHTML = tableContent;
        descriptionDialog.style.display = 'block';
    }
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const dialog = button.closest('.dialog');
        dialog.style.display = 'none';
    });
});

const problemData = {
    1: {
      name: "Agriculture & Farming",
      subdomains: {
        "Farm Management": [
          {
            title: "Precision Farming",
            id: "D01-S01",
            ProblemContext: "Farmers rely on intuition; rainfall variability and soil degradation reduce yields.",
            ChallengeStatement: "Build an AI + IoT system for real-time irrigation, fertilizer, and pesticide optimization.",
            ExpectedFeatures: "Multi-sensor soil/weather data, predictive irrigation, drone pest detection, local-language dashboard, offline mode.",
            EvaluationCriteria: "Accuracy, affordability, localization, sustainability.",
            ExpectedImpact: "Higher yields, water savings, farmer profitability."
          },
          {
            title: "Sustainable Water Use",
            id: "D01-S04",
            ProblemContext: "Over-irrigation wastes water.",
            ChallengeStatement: "IoT-enabled smart irrigation.",
            ExpectedFeatures: "Soil moisture sensors, predictive water scheduling, low-power devices.",
            EvaluationCriteria: "Water savings, rural deployment readiness.",
            ExpectedImpact: "Efficient water use, climate resilience."
          }
        ],
        "Supply Chain & Health": [
          {
            title: "Agri Supply Chain",
            id: "D01-S02",
            ProblemContext: "Post-harvest losses due to poor logistics and cold-chain gaps.",
            ChallengeStatement: "AI-driven supply chain optimization for storage, transport, and pricing.",
            ExpectedFeatures: "IoT cold-chain monitoring, demand forecasting, blockchain traceability.",
            EvaluationCriteria: "Efficiency, scalability, cost-effectiveness.",
            ExpectedImpact: "Reduced waste, better farmer income."
          },
          {
            title: "Crop Health & Pest Management",
            id: "D01-S03",
            ProblemContext: "Pest outbreaks cause major losses.",
            ChallengeStatement: "Drone/camera-based early pest and disease detection.",
            ExpectedFeatures: "Image-based ML models, automated alerts, treatment recommendations.",
            EvaluationCriteria: "Detection accuracy, usability, and affordability.",
            ExpectedImpact: "Reduced crop loss, sustainable farming."
          }
        ]
      }
    },
    2: {
      name: "AI & Industry 4.0",
      subdomains: {
        "Predictive Systems": [
          {
            title: "Predictive Analytics",
            id: "D02-S01",
            ProblemContext: "Equipment downtime is costly.",
            ChallengeStatement: "Predictive maintenance with explainable AI.",
            ExpectedFeatures: "Anomaly detection, RUL estimation, SHAP/LIME explainability, ERP integration.",
            EvaluationCriteria: "Accuracy, interpretability, scalability.",
            ExpectedImpact: "Reduced downtime, cost savings."
          },
          {
            title: "AI for Business Intelligence",
            id: "D02-S03",
            ProblemContext: "Businesses need real-time insights.",
            ChallengeStatement: "Demand forecasting & optimization.",
            ExpectedFeatures: "ML-driven forecasting, visualization dashboards, ERP integration.",
            EvaluationCriteria: "Accuracy, scalability, usability.",
            ExpectedImpact: "Smarter decisions, efficiency."
          }
        ],
        "Responsible AI": [
          {
            title: "Responsible AI",
            id: "D02-S02",
            ProblemContext: "AI bias reduces trust.",
            ChallengeStatement: "Build fairness-aware ML pipelines.",
            ExpectedFeatures: "Bias detection, explainability dashboards, ethical compliance.",
            EvaluationCriteria: "Fairness, transparency, usability.",
            ExpectedImpact: "Trustworthy AI adoption."
          },
          {
            title: "AI for Social Good",
            id: "D02-S04",
            ProblemContext: "Disasters need fast response.",
            ChallengeStatement: "AI for disaster prediction & humanitarian aid.",
            ExpectedFeatures: "Satellite data analysis, risk forecasting, alert systems.",
            EvaluationCriteria: "Accuracy, accessibility, impact.",
            ExpectedImpact: "Saved lives, better preparedness."
          }
        ]
      }
    },
    3: {
      name: "AR/VR & Immersive Tech",
      subdomains: {
        "Education & Training": [
          {
            title: "Immersive Education",
            id: "D03-S01",
            ProblemContext: "STEM lacks visualization.",
            ChallengeStatement: "AR/VR STEM classrooms.",
            ExpectedFeatures: "3D modules, teacher dashboards, offline coaching.",
            EvaluationCriteria: "Educational accuracy, low-cost usability.",
            ExpectedImpact: "Better comprehension, engagement."
          },
          {
            title: "Industrial Training",
            id: "D03-S03",
            ProblemContext: "Workers need safe training.",
            ChallengeStatement: "AR/VR skill training.",
            ExpectedFeatures: "Simulations, cross-platform support.",
            EvaluationCriteria: "Usability, scalability, realism.",
            ExpectedImpact: "Safer, faster workforce training."
          }
        ],
        "Healthcare & Culture": [
          {
            title: "Virtual Healthcare",
            id: "D03-S02",
            ProblemContext: "Therapy access is limited.",
            ChallengeStatement: "VR-based therapy & rehab.",
            ExpectedFeatures: "Immersive rehab modules, progress tracking.",
            EvaluationCriteria: "Accessibility, clinical effectiveness.",
            ExpectedImpact: "Affordable, engaging healthcare."
          },
          {
            title: "Cultural Heritage",
            id: "D03-S04",
            ProblemContext: "Heritage sites are inaccessible.",
            ChallengeStatement: "Virtual museums & preservation.",
            ExpectedFeatures: "3D reconstructions, multilingual guides.",
            EvaluationCriteria: "Cultural accuracy, accessibility.",
            ExpectedImpact: "Global cultural access."
          }
        ]
      }
    },
    4: {
      name: "Healthcare & Medical Tech",
      subdomains: {
        "Diagnostics & Treatment": [
          {
            title: "AI Diagnostics",
            id: "D04-S01",
            ProblemContext: "Delayed or inaccurate diagnoses reduce patient outcomes.",
            ChallengeStatement: "Develop AI-driven diagnostic support for imaging and vitals.",
            ExpectedFeatures: "ML for X-ray/MRI/ECG interpretation, explainability, doctor dashboards.",
            EvaluationCriteria: "Diagnostic accuracy, compliance with medical standards, usability.",
            ExpectedImpact: "Faster, more accurate diagnoses and improved patient care."
          },
          {
            title: "Preventive Healthcare",
            id: "D04-S04",
            ProblemContext: "Lifestyle diseases are rising globally.",
            ChallengeStatement: "Enable early detection through wearables and AI.",
            ExpectedFeatures: "Continuous monitoring, anomaly detection, personalized alerts.",
            EvaluationCriteria: "Accuracy, privacy, usability.",
            ExpectedImpact: "Early intervention and healthier populations."
          }
        ],
        "Access & Management": [
          {
            title: "Telemedicine",
            id: "D04-S02",
            ProblemContext: "Rural and underserved areas lack access to doctors.",
            ChallengeStatement: "Build secure, scalable telemedicine platforms.",
            ExpectedFeatures: "IoT vitals monitoring, secure video consultations, multilingual support.",
            EvaluationCriteria: "Accessibility, security, scalability.",
            ExpectedImpact: "Expanded healthcare access and reduced inequality."
          },
          {
            title: "Hospital Resource Management",
            id: "D04-S03",
            ProblemContext: "ICU and bed shortages strain hospitals.",
            ChallengeStatement: "Predict and optimize hospital resource allocation.",
            ExpectedFeatures: "Demand forecasting, dashboards for staff, integration with hospital systems.",
            EvaluationCriteria: "Forecast accuracy, usability, scalability.",
            ExpectedImpact: "Optimized hospital operations and reduced patient wait times."
          }
        ]
      }
    },
    5: {
      name: "Cybersecurity",
      subdomains: {
        "Threat Detection": [
          {
            title: "Intelligent Defense",
            id: "D05-S01",
            ProblemContext: "Zero-day attacks bypass traditional defenses.",
            ChallengeStatement: "Build AI-driven intrusion detection and automated response.",
            ExpectedFeatures: "ML anomaly detection, automated workflows, SIEM/SOAR integration.",
            EvaluationCriteria: "Detection accuracy, latency, automation effectiveness.",
            ExpectedImpact: "Faster detection and reduced breaches."
          },
          {
            title: "Cloud & Hybrid Security",
            id: "D05-S02",
            ProblemContext: "Multi-cloud environments increase attack surfaces.",
            ChallengeStatement: "Implement Zero Trust security for hybrid infrastructures.",
            ExpectedFeatures: "Identity-based access, continuous monitoring, compliance checks.",
            EvaluationCriteria: "Compliance, scalability, adaptability.",
            ExpectedImpact: "Secure cloud adoption and reduced enterprise risk."
          }
        ],
        "Privacy & Neural Security": [
          {
            title: "BCI & Neuro security",
            id: "D05-S03",
            ProblemContext: "Brain-computer interfaces are vulnerable to misuse.",
            ChallengeStatement: "Secure neural data and BCI systems.",
            ExpectedFeatures: "Neural hashing, anomaly detection, privacy enforcement.",
            EvaluationCriteria: "Security robustness, ethics, usability.",
            ExpectedImpact: "Safe adoption of neurotechnology."
          },
          {
            title: "Privacy & Data Protection",
            id: "D05-S04",
            ProblemContext: "Data misuse erodes trust in digital systems.",
            ChallengeStatement: "Build privacy-preserving AI frameworks.",
            ExpectedFeatures: "Federated learning, encryption, anonymization.",
            EvaluationCriteria: "Privacy compliance, usability, scalability.",
            ExpectedImpact: "Secure, ethical AI adoption."
          }
        ]
      }
    },
    6: {
      name: "Smart Cities & Urban Tech",
      subdomains: {
        "Infrastructure & Mobility": [
          {
            title: "Urban Infrastructure",
            id: "D06-S01",
            ProblemContext: "Manual monitoring of utilities is inefficient.",
            ChallengeStatement: "IoT-based monitoring of urban infrastructure.",
            ExpectedFeatures: "Real-time data ingestion, predictive maintenance, digital twins.",
            EvaluationCriteria: "Scalability, visualization quality, interoperability.",
            ExpectedImpact: "Efficient, resilient cities."
          },
          {
            title: "Smart Mobility",
            id: "D06-S02",
            ProblemContext: "Traffic congestion increases pollution and delays.",
            ChallengeStatement: "AI-driven traffic optimization.",
            ExpectedFeatures: "Smart traffic signals, predictive routing, multimodal transport integration.",
            EvaluationCriteria: "Efficiency, usability, scalability.",
            ExpectedImpact: "Reduced congestion and emissions."
          }
        ],
        "Sustainability & Safety": [
          {
            title: "Waste & Water Management",
            id: "D06-S03",
            ProblemContext: "Inefficient waste and water systems harm sustainability.",
            ChallengeStatement: "IoT-enabled waste segregation and water management platforms.",
            ExpectedFeatures: "Smart bins, recycling analytics, water quality sensors.",
            EvaluationCriteria: "Sustainability, scalability, usability.",
            ExpectedImpact: "Cleaner, greener, and resource-efficient cities."
          },
          {
            title: "Public Safety",
            id: "D06-S04",
            ProblemContext: "Delayed disaster response and poor hazard detection put urban populations at risk.",
            ChallengeStatement: "Build AI-based hazard and disaster detection systems with real-time alerts.",
            ExpectedFeatures: "Sensor integration, predictive analytics, citizen alert systems, mobile dashboards.",
            EvaluationCriteria: "Accuracy, latency, usability, scalability.",
            ExpectedImpact: "Safer communities, faster emergency response, reduced casualties."
          }
        ]
      }
    },
    7: {
      name: "Fintech & Digital Finance",
      subdomains: {
        "Security & Payments": [
          {
            title: "Fraud & Risk Analytics",
            id: "D07-S01",
            ProblemContext: "Adaptive fraud patterns bypass rule-based systems.",
            ChallengeStatement: "Build AI-enabled fraud detection and risk analytics.",
            ExpectedFeatures: "ML anomaly detection, blockchain trails, risk scoring dashboards.",
            EvaluationCriteria: "Detection accuracy, false-positive reduction, compliance.",
            ExpectedImpact: "Safer transactions and stronger trust in digital finance."
          },
          {
            title: "Digital Payments",
            id: "D07-S02",
            ProblemContext: "Micropayments and cross-border transactions need secure, low-cost solutions.",
            ChallengeStatement: "Develop secure, inclusive digital payment systems.",
            ExpectedFeatures: "Blockchain wallets, multilingual/voice interfaces, real-time settlement.",
            EvaluationCriteria: "Security, usability, scalability.",
            ExpectedImpact: "Inclusive digital economy and financial accessibility."
          }
        ],
        "Inclusion & Compliance": [
          {
            title: "Financial Inclusion",
            id: "D07-S03",
            ProblemContext: "Unbanked populations lack access to credit and financial services.",
            ChallengeStatement: "AI-driven credit scoring for underserved groups.",
            ExpectedFeatures: "Alternative data analysis, mobile-first design, micro-lending integration.",
            EvaluationCriteria: "Fairness, accuracy, accessibility.",
            ExpectedImpact: "Wider financial access and empowerment."
          },
          {
            title: "RegTech",
            id: "D07-S04",
            ProblemContext: "Compliance is complex and costly for financial institutions.",
            ChallengeStatement: "Automate regulatory compliance and monitoring.",
            ExpectedFeatures: "AML/KYC automation, adaptive rule engines, compliance dashboards.",
            EvaluationCriteria: "Compliance readiness, efficiency, scalability.",
            ExpectedImpact: "Easier regulation adherence and reduced compliance costs."
          }
        ]
      }
    },
    8: {
      name: "Quantum & Emerging Computing",
      subdomains: {
        "Quantum Security": [
          {
            title: "Post-Quantum Security",
            id: "D08-S01",
            ProblemContext: "Quantum computing threatens classical cryptography.",
            ChallengeStatement: "Build quantum-resilient encryption frameworks.",
            ExpectedFeatures: "Lattice/hash algorithms, PQC compliance, hybrid encryption.",
            EvaluationCriteria: "Robustness, efficiency, scalability.",
            ExpectedImpact: "Quantum-safe networks and secure communications."
          },
          {
            title: "Quantum Communication",
            id: "D08-S03",
            ProblemContext: "Sensitive data requires unbreakable security.",
            ChallengeStatement: "Build secure quantum communication systems.",
            ExpectedFeatures: "Quantum key distribution, secure APIs, interoperability with 5G/IoT.",
            EvaluationCriteria: "Security, interoperability, scalability.",
            ExpectedImpact: "Unbreakable communications for critical infrastructure."
          }
        ],
        "Advanced Computing": [
          {
            title: "Quantum ML",
            id: "D08-S02",
            ProblemContext: "Classical ML struggles with complex, high-dimensional data.",
            ChallengeStatement: "Develop hybrid quantum-classical ML models.",
            ExpectedFeatures: "Quantum simulators, hybrid pipelines, benchmarking.",
            EvaluationCriteria: "Accuracy, scalability, innovation.",
            ExpectedImpact: "Faster insights and breakthroughs in AI."
          },
          {
            title: "Neuromorphic Computing",
            id: "D08-S04",
            ProblemContext: "AI hardware consumes too much energy.",
            ChallengeStatement: "Develop brain-inspired AI accelerators.",
            ExpectedFeatures: "Neuromorphic chips, low-power ML, adaptive architectures.",
            EvaluationCriteria: "Efficiency, scalability, innovation.",
            ExpectedImpact: "Energy-efficient AI hardware for the future."
          }
        ]
      }
    },
    9: {
      name: "Sustainability & Climate",
      subdomains: {
        "Carbon & Energy": [
          {
            title: "Carbon Monitoring",
            id: "D09-S01",
            ProblemContext: "Lack of real-time carbon data delays climate action.",
            ChallengeStatement: "Build AI-driven carbon/resource tracking platforms.",
            ExpectedFeatures: "IoT sensors, predictive analytics, ESG reporting.",
            EvaluationCriteria: "Accuracy, compliance, usability.",
            ExpectedImpact: "Net-zero planning and accountability."
          },
          {
            title: "Renewable Energy",
            id: "D09-S02",
            ProblemContext: "Energy grids are inefficient and wasteful.",
            ChallengeStatement: "Optimize renewable energy integration.",
            ExpectedFeatures: "Smart grid optimization, demand forecasting, renewable integration.",
            EvaluationCriteria: "Efficiency, scalability, sustainability.",
            ExpectedImpact: "Clean energy adoption and reduced emissions."
          }
        ],
        "Circular Economy & Risk": [
          {
            title: "Circular Economy",
            id: "D09-S03",
            ProblemContext: "Waste mismanagement harms sustainability.",
            ChallengeStatement: "AI for waste-to-resource conversion.",
            ExpectedFeatures: "Recycling analytics, material recovery optimization, supply chain integration.",
            EvaluationCriteria: "Sustainability, innovation, scalability.",
            ExpectedImpact: "Sustainable production and reduced waste."
          },
          {
            title: "Climate Risk Analytics",
            id: "D09-S04",
            ProblemContext: "Poor climate forecasting hinders resilience.",
            ChallengeStatement: "Predictive climate impact modeling.",
            ExpectedFeatures: "Climate data analytics, risk dashboards, scenario simulations.",
            EvaluationCriteria: "Accuracy, usability, scalability.",
            ExpectedImpact: "Better preparedness and resilience."
          }
        ]
      }
    },
    10: {
      name: "EdTech & Learning",
      subdomains: {
        "Personalized Learning": [
          {
            title: "Adaptive Learning",
            id: "D10-S01",
            ProblemContext: "Uniform content reduces engagement and retention.",
            ChallengeStatement: "Build personalized AI learning companions.",
            ExpectedFeatures: "User profiling, adaptive recommendations, gamified assessments.",
            EvaluationCriteria: "Personalization accuracy, inclusivity, accessibility.",
            ExpectedImpact: "Improved learning outcomes and engagement."
          },
          {
            title: "Gamified Learning",
            id: "D10-S02",
            ProblemContext: "Traditional e-learning lacks motivation.",
            ChallengeStatement: "Create game-based STEM education platforms.",
            ExpectedFeatures: "Gamified modules, progress tracking, rewards.",
            EvaluationCriteria: "Engagement, usability, scalability.",
            ExpectedImpact: "Higher motivation and retention."
          }
        ],
        "Accessibility & Support": [
          {
            title: "Accessibility in Education",
            id: "D10-S03",
            ProblemContext: "Differently abled learners face barriers.",
            ChallengeStatement: "Build AI tools for inclusive education.",
            ExpectedFeatures: "Speech-to-text, text-to-speech, adaptive content.",
            EvaluationCriteria: "Accessibility, inclusivity, usability.",
            ExpectedImpact: "Equal learning opportunities."
          },
          {
            title: "Teacher Support",
            id: "D10-S04",
            ProblemContext: "Teachers face heavy workloads.",
            ChallengeStatement: "AI-driven grading and feedback systems.",
            ExpectedFeatures: "Automated grading, feedback dashboards, analytics.",
            EvaluationCriteria: "Accuracy, usability, scalability.",
            ExpectedImpact: "Reduced teacher workload, better student support."
          }
        ]
      }
    },
    11: {
      name: "Space & Defense",
      subdomains: {
        "Space Operations": [
          {
            title: "Satellite Security",
            id: "D11-S01",
            ProblemContext: "Satellite constellations face risks from debris, cyber intrusions, and hostile interference.",
            ChallengeStatement: "Build an AI-driven autonomous monitoring system for satellite threat detection.",
            ExpectedFeatures: "ML anomaly detection in orbital parameters, predictive collision avoidance, cybersecurity layers, visualization dashboards.",
            EvaluationCriteria: "Detection accuracy, autonomy, integration feasibility.",
            ExpectedImpact: "Safer, more resilient space operations."
          },
          {
            title: "Space Debris Management",
            id: "D11-S02",
            ProblemContext: "Space debris threatens satellites and future missions.",
            ChallengeStatement: "Develop AI systems for debris tracking and collision avoidance.",
            ExpectedFeatures: "Orbital modeling, predictive analytics, visualization of risk zones.",
            EvaluationCriteria: "Accuracy, scalability, usability.",
            ExpectedImpact: "Reduced collision risks and sustainable space exploration."
          }
        ],
        "Defense Systems": [
          {
            title: "Defence AI",
            id: "D11-S03",
            ProblemContext: "Defence operations require rapid, data-driven decision-making.",
            ChallengeStatement: "Create AI-driven battlefield simulations and decision support systems.",
            ExpectedFeatures: "Real-time simulations, predictive modeling, secure integration with command systems.",
            EvaluationCriteria: "Accuracy, security, usability.",
            ExpectedImpact: "Enhanced defence readiness and strategic advantage."
          },
          {
            title: "Secure Communications",
            id: "D11-S04",
            ProblemContext: "Defence communications are vulnerable to interception and disruption.",
            ChallengeStatement: "Build quantum-safe satellite communication systems.",
            ExpectedFeatures: "Quantum key distribution, secure protocols, interoperability with existing systems.",
            EvaluationCriteria: "Security, scalability, compliance.",
            ExpectedImpact: "Unbreakable, resilient defence communications."
          }
        ]
      }
    },
    12: {
  "name": "Open Innovation & Ethics",
  "subdomains": {
    "Collaborative Innovation": [
      {
        "title": "Open Innovation Ecosystems",
        "id": "D12-S01",
        "ProblemContext": "Many innovative ideas fail to scale due to fragmented collaboration between startups, academia, and industry.",
        "ChallengeStatement": "Design open innovation platforms or ecosystems that enable co-creation between corporates, startups, and research institutions.",
        "ExpectedFeatures": "Collaborative platform design, IP-sharing framework, transparent communication models.",
        "EvaluationCriteria": "Innovation in collaboration models, scalability, stakeholder engagement.",
        "ExpectedImpact": "Accelerated innovation cycles and stronger industry–academia–startup partnerships."
      },
    ],
    
  }
  }

};



