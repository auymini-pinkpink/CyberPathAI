// Career Pathways
const paths = {
  "Penetration testing": [
    "Networking fundamentals",
    "Linux fundamentals",
    "Web application security",
    "Python & scripting",
    "Hands-on labs",
    "Junior penetration testing roles"
  ],
  "Networking": [
    "TCP/IP & subnetting",
    "Switching & routing",
    "Linux",
    "Network troubleshooting",
    "Security fundamentals",
    "Network/security support roles"
  ],
  "Cloud security": [
    "Networking",
    "Linux",
    "Cloud fundamentals",
    "Identity & access management",
    "Cloud security controls",
    "Cloud security roles"
  ],
  "SOC / Blue team": [
    "Networking",
    "Linux & Windows security",
    "SIEM fundamentals",
    "Log analysis",
    "Incident response",
    "Junior SOC roles"
  ],
  "GRC": [
    "Security fundamentals",
    "Risk management",
    "Policies & controls",
    "Privacy & compliance",
    "Audit fundamentals",
    "GRC/security roles"
  ],
  "Cybersecurity": [
    "Networking",
    "Operating systems",
    "Security fundamentals",
    "Linux",
    "Hands-on security labs",
    "Entry-level cybersecurity roles"
  ]
};

// Generate Pathway
function generatePath() {
  const interest = document.getElementById("interest").value;
  const hours = document.getElementById("hours").value;
  const exp = document.getElementById("exp").value;

  const plan = paths[interest] || paths["Cybersecurity"];

  const html = `
    <p>
      <span class="pill">${exp}</span>
      <span class="pill">${interest}</span>
      <span class="pill">${hours} hrs/week</span>
    </p>
    <div class="result">
      <h3>Your 6-step plan</h3>
      <ol>${plan.map(step => `<li>${step}</li>`).join("")}</ol>
    </div>
  `;

  const box = document.getElementById("pathText");
  box.innerHTML = html;

  document.getElementById("path").classList.remove("hidden");
}

// Job Analyzer
function analyseJob() {
  const text = document.getElementById("job").value.toLowerCase().trim();
  const result = document.getElementById("jobResult");

  if (!text) {
    result.innerHTML = `<p class="small">Paste a job description first.</p>`;
    return;
  }

  const skills = [
    "networking", "linux", "python", "siem", "sentinel", "splunk",
    "incident response", "active directory", "cloud", "aws", "azure",
    "microsoft", "powershell", "cybersecurity"
  ];

  const found = skills.filter(s => text.includes(s));
  const missing = skills.filter(s => !text.includes(s)).slice(0, 5);

  result.innerHTML = `
    <div class="result">
      <h3>Quick skill scan</h3>
      <p><strong>${found.length}</strong> common cybersecurity skills detected.</p>
      <p><strong>Detected:</strong> ${
        found.length ? found.map(s => `<span class="pill">${s}</span>`).join(" ") : "None yet"
      }</p>
      <p><strong>Skills worth checking:</strong> ${
        missing.map(s => `<span class="pill">${s}</span>`).join(" ")
      }</p>
      <p class="small">This is a prototype keyword scan, not a real hiring assessment.</p>
    </div>
  `;
}

// Interview Questions
const questions = [
  "Tell me about yourself and why you're interested in cybersecurity.",
  "Tell me about a cybersecurity topic you have recently studied.",
  "How would you troubleshoot a computer that cannot connect to a network?",
  "Why do you want this cybersecurity role?",
  "Tell me about a time you solved a difficult problem."
];

let qIndex = 0;

function nextQuestion() {
  qIndex = (qIndex + 1) % questions.length;
  document.getElementById("question").textContent = questions[qIndex];
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerHTML = "";
}

// Score Answer
function scoreAnswer() {
  const answer = document.getElementById("answer").value.trim();
  const feedback = document.getElementById("feedback");

  if (!answer) {
    feedback.innerHTML = `<p class="small">Write an answer first.</p>`;
    return;
  }

  const words = answer.split(/\s+/).length;
  const bonus = /example|because|learned|experience|problem|result/i.test(answer) ? 20 : 0;

  const score = Math.min(95, 45 + Math.min(25, words / 4) + bonus);

  feedback.innerHTML = `
    <div class="result">
      <h3>Practice feedback</h3>
      <p><strong>Prototype score: ${Math.round(score)}/100</strong></p>
      <div class="progress"><div class="bar" style="width:${score}%"></div></div>
      <p>Try to give a clear <strong>situation → action → result</strong> story and connect your answer to the role.</p>
      <p class="small">This prototype uses simple rules. The production version would use an AI model for detailed feedback.</p>
    </div>
  `;
}

