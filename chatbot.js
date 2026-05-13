/* ============================================================
   Synthloom Chatbot — NLP-Based Intent Classification
   Smart question understanding with intent-based responses
   ============================================================ */

(function () {
  'use strict';

  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-chat') || document.getElementById('chat-send');
  const toggleBtn = document.getElementById('chat-toggle');
  const closeBtn = document.getElementById('close-chat') || document.getElementById('chat-close');
  const chatContainer = document.getElementById('chat-bubble');

  // ── INTENT-BASED KNOWLEDGE BASE ────────────────────────────
  const intents = {
    ABOUT: {
      name: 'about',
      keywords: ['about', 'what is synthloom', 'tell me about', 'who are you', 'features', 'benefits', 'purpose', 'what do you do', 'what can you do'],
      response: '🌟 **About Synthloom:**\n\nSynthloom is an **intelligent synthetic data generation platform** that creates realistic, privacy-safe test data at scale.\n\n**What we do:**\n• Generate millions of realistic data records in minutes\n• Maintain perfect referential integrity with relationships & foreign keys\n• Support 100+ field types (Customer, Order, Product, etc.)\n• Export as CSV, JSON, Parquet, or SQL\n• Optional AI enrichment for natural descriptions\n\n**Why Synthloom?**\n✅ **Privacy** — No real data needed\n✅ **Speed** — Generate 1M+ records instantly\n✅ **Flexibility** — Design any data model visually\n✅ **Quality** — 100% referentially intact\n✅ **Compliance** — GDPR & privacy-ready\n\n**Use cases:**\n• Testing & QA\n• Development databases\n• ML/AI training data\n• Performance benchmarking\n• Demo environments\n\n**Get started free:**\n→ Visit: https://app.synthloom.atanuconsulting.in/'
    },
    BENEFITS: {
      name: 'benefits',
      keywords: ['help me', 'how can it help', 'benefit', 'advantage', 'solve', 'problem', 'use case', 'why should', 'value'],
      response: '💡 **How Synthloom Helps You:**\n\n**For Developers & QA:**\n• Instant test data without manual setup\n• Realistic scenarios for testing\n• No need to copy production data\n\n**For Data Teams:**\n• Perfect ML/AI training datasets\n• Privacy-compliant alternatives to production\n• 100% relational integrity maintained\n\n**For DevOps & Architects:**\n• Load testing with realistic scale\n• Demo environments in seconds\n• Self-hosted or SaaS options\n\n**For Everyone:**\n💪 **Faster Development** — No manual data creation\n🔒 **Complete Privacy** — No sensitive data exposure\n⚡ **Instant Scale** — 1M+ records in minutes\n✅ **High Quality** — Perfect data relationships\n🎯 **Any Model** — Design exactly what you need\n\n**Start for free:**\n→ 10 data models, unlimited generations: https://app.synthloom.atanuconsulting.in/'
    },
    GREETING: {
      name: 'greeting',
      keywords: ['hello', 'hi', 'hey', 'greet', 'introduction', 'welcome'],
      response: 'Hi there! 👋 I can help you with:\n\n• **About Synthloom** — Learn what we do\n• **Getting Started** — Setup & first steps\n• **Getting Access** — Login & credentials\n• **Generate Data** — Create synthetic records\n• **Data Modeling** — Design Studio & entities\n• **Field Types** — Available data types\n• **Validation & Quality** — Check your data\n• **Export Formats** — CSV, JSON, Parquet, SQL\n\nWhat would you like to know?'
    },
    PROVISIONING: {
      name: 'provisioning',
      keywords: ['get started', 'getting started', 'how do i get started', 'setup', 'onboard', 'install', 'configure', 'initial', 'first', 'quickstart', 'begin', 'start', 'provision', 'account'],
      response: '🎯 **Getting Started with Synthloom:**\n\n**Step 1: Get Access**\n   Visit: https://app.synthloom.atanuconsulting.in/\n   Sign up for free OR book a demo for credentials\n\n**Step 2: Create Workspace**\n   Click "New Workspace" and name it\n\n**Step 3: Design Your Data Model**\n   • Go to "Design Studio"\n   • Click "+ Add Entity" (Customer, Order, Product, etc.)\n   • For each entity, add fields\n   • Set data types & constraints\n   • Define relationships (foreign keys)\n\n**Step 4: Generate Data**\n   • Click "Generate"\n   • Choose output format (CSV, JSON, Parquet)\n   • Set record count\n   • Click "Start Job"\n\n**Step 5: Download & Use**\n   • Wait for completion\n   • Click "Download"\n   • Use in your app, tests, or pipeline!\n\n💡 **Pro tip:** Start small (100–1,000 rows) to validate your model first.'
    },
    GET_ACCESS: {
      name: 'get_access',
      keywords: ['access', 'login', 'sign in', 'credentials', 'password', 'username', 'open app', 'launch', 'where', 'url', 'link', 'how do i access'],
      response: '🔑 **Access & Login:**\n\n**Live App URL:**\nhttps://app.synthloom.atanuconsulting.in/\n\n**Steps to access:**\n1. Go to the link above\n2. Sign up (free tier) or use your credentials\n3. Select or create a workspace\n4. Start generating data!\n\n**Free Tier Includes:**\n• Up to 10 data models\n• 2 generations per model\n• Unlimited entities & fields\n• All export formats\n\n**Don\'t have credentials?**\n📅 **Book a Demo:** https://info-synthloom.atanuconsulting.in/#book-demo\nWe\'ll provide instant access!\n\n**Forgot password?**\nEmail support through the app or book a demo.'
    },
    GENERATE_DATA: {
      name: 'generate_data',
      keywords: ['generate', 'generation', 'create data', 'run', 'execute', 'start job', 'produce', 'output', 'records', 'run generation', 'start generating'],
      response: '▶️ **Generating Data:**\n\n**Before you start:**\n1. Open **Design Studio**\n2. Add entities (Customer, Order, Product, etc.)\n3. Configure fields and types\n4. Set record counts\n5. Check the **Pipeline View** for ordering\n\n**To run:**\n1. Click **Generate**\n2. Choose output format — CSV, JSON, Parquet or SQL\n3. Click **Start Job**\n4. Watch live progress\n5. Download when complete\n\n⚡ Independent entities run in parallel for speed.\n✅ A validation report is always included.\n\n**Typical times:**\n• 1,000 records: <1 second\n• 100,000 records: 5–10 seconds\n• 1M+ records: 30–60 seconds'
    },
    DATA_MODEL: {
      name: 'data_model',
      keywords: ['model', 'design studio', 'entity', 'entities', 'field', 'fields', 'schema', 'structure', 'table', 'column', 'configure', 'add entity', 'add field'],
      response: '📐 **Data Modeling in Design Studio:**\n\n**Three core concepts:**\n\n1️⃣ **Entities** (Tables)\n   • Customer, Order, Product, Invoice, etc.\n   • Each entity = one output file\n   • Add with "+ Add Entity"\n   • Set record count per entity\n\n2️⃣ **Fields** (Columns)\n   • Define data: name, type, constraints\n   • Types: String, Integer, Email, Phone, Date, UUID, etc.\n   • Add with "+ Add Field"\n   • Set min/max, unique, nullable, format, etc.\n\n3️⃣ **Relationships** (Foreign Keys)\n   • Link entities (Order.customer_id → Customer.id)\n   • Automatic referential integrity\n   • Type: Foreign Key\n   • Synthloom ensures every FK is valid\n\n**Workflow:**\n1. New Config → Add Entities → Add Fields → Define FKs → Preview Pipeline → Generate\n\n💡 The Pipeline shows your entity dependency order visually!'
    },
    FIELD_TYPES: {
      name: 'field_types',
      keywords: ['type', 'field type', 'types', 'available types', 'uuid', 'email', 'phone', 'date', 'integer', 'string', 'enum', 'what types'],
      response: '📋 **Field Types Available:**\n\n**🆔 Identity**\n  UUID, Integer ID, Auto Increment, ULID\n\n**👤 Personal**\n  Full Name, First/Last Name, Email, Phone, Username\n  Password Hash, Avatar URL\n\n**🏠 Location**\n  Street Address, City, State, Country, Zip Code\n  Latitude, Longitude, Timezone\n\n**📅 Date & Time**\n  Date, DateTime, Timestamp (Unix), Time\n  Year, Month, Day, Hour\n\n**💰 Finance**\n  Currency, Credit Card, Bank Account, IBAN, BIC\n  Stock Ticker, Cryptocurrency\n\n**📊 Numeric**\n  Integer, Float, Decimal, Boolean, Percentage\n\n**📝 Text**\n  String, Paragraph, Slug, URL, JSON, Markdown\n\n**🎲 Other**\n  Enum (custom values), Color, Hex, Binary\n\n**Constraints** (all types):\n• Unique, Nullable, Min/Max\n• Format, Prefix/Suffix, Text Enrichment'
    },
    VALIDATION: {
      name: 'validation',
      keywords: ['validation', 'validate', 'check', 'quality', 'verify', 'test data', 'integrity', 'constraints', 'rules'],
      response: '✅ **Data Validation:**\n\n**Automatic checks after generation:**\n• Foreign key constraints ✓\n• Unique field values ✓\n• Min/max ranges ✓\n• Data type compliance ✓\n• Custom business rules ✓\n• Referential integrity ✓\n\n**View validation results:**\n1. After generation completes\n2. Go to "Output & Download"\n3. Preview data table\n4. Click "Validation Results"\n5. Review any warnings/errors\n\n**If issues found:**\n• Fix your Design Studio config\n• Regenerate with corrected rules\n• Re-validate\n\n💡 All generated data is 100% referentially intact by default!'
    },
    OUTPUTS: {
      name: 'outputs',
      keywords: ['output', 'export', 'download', 'format', 'csv', 'json', 'parquet', 'sql', 'database', 'file'],
      response: '📤 **Output Formats:**\n\n**Available formats:**\n\n📄 **CSV** (Comma-Separated Values)\n  • Excel-friendly\n  • Universal support\n  • Good for small-medium datasets\n\n📋 **JSON** (JavaScript Object Notation)\n  • Flexible structure\n  • Per-entity files or merged\n  • API-friendly\n\n🗄️ **Parquet** (Columnar Storage)\n  • Big data pipelines (Spark, Arrow)\n  • Most efficient for large datasets\n  • Compressed\n\n🛢️ **SQL** (Direct Database Write) *Coming Soon*\n  • Write to MySQL, PostgreSQL, etc.\n  • Automatic table creation\n  • No intermediate files\n\n**How to export:**\n1. Generation completes\n2. Go to "Output & Download"\n3. Choose format\n4. Click Download\n5. Use in your pipeline!\n\n💡 **Pro tip:** Use Parquet for 1M+ records'
    },
    AI_ENRICHMENT: {
      name: 'ai_enrichment',
      keywords: ['ai', 'enrichment', 'enrich', 'gpt', 'claude', 'openai', 'anthropic', 'llm', 'text generation', 'descriptions'],
      response: '✨ **Text Enrichment (Optional):**\n\nConnect a language model to auto-generate realistic, context-aware text for selected fields.\n\n**Setup:**\n1. In Design Studio, mark fields as "Enrich"\n2. Go to Settings → Enrichment Settings\n3. Enter your API key\n4. Enable result caching to reduce usage\n\n**Great for:**\n• Product descriptions\n• Customer reviews\n• Marketing copy\n• Email templates\n• Narrative text\n\n💡 Caching means only new values are generated — repeated runs cost less.'
    },
    RELATIONSHIPS: {
      name: 'relationships',
      keywords: ['relationship', 'foreign key', 'fk', 'link', 'connect', 'relationship', 'referential', 'parent', 'child', 'join'],
      response: '🔗 **Relationships & Foreign Keys:**\n\n**What are foreign keys?**\n• Link child records to parent records\n• Example: Order.customer_id → Customer.id\n• Ensures referential integrity\n\n**How to define:**\n1. In child entity, add field: "customer_id"\n2. Set type: "Foreign Key"\n3. Select parent entity: "Customer"\n4. Select parent field: "id"\n5. Save\n\n**Synthloom guarantees:**\n✓ Every FK references valid parent record\n✓ Parents generated before children\n✓ No orphaned records\n✓ 100% referential integrity\n✓ Can run in parallel when independent\n\n**Example structure:**\n  Customers (parent) → Orders (child)\n  Customers (parent) → Invoices (child)\n  Orders (parent) → OrderItems (child)\n\n💡 The Pipeline shows dependency order visually!'
    },
    PIPELINE: {
      name: 'pipeline',
      keywords: ['pipeline', 'dag', 'dependency', 'order', 'parallel', 'graph', 'execution', 'flow', 'dependencies'],
      response: '📊 **Pipeline & DAG Engine:**\n\n**What it does:**\nShows entity generation order and which can run in parallel.\n\n**View the Pipeline:**\n1. After designing in Design Studio\n2. Click "Pipeline View"\n3. See your dependency graph\n4. Green = ready, Red = issues\n\n**Key features:**\n• **Topological sort** — Parents before children\n• **Parallel groups** — Independent entities run together\n• **Circular detection** — Catches loops\n• **Memory streaming** — Efficient for billions of records\n\n**Example:**\n```\nCustomers (independent)\n    ↓\n  Orders (depends on Customers)\n    ↓\n  OrderItems (depends on Orders)\n```\n\n**Optimization:**\n• More parallel groups = faster generation\n• Synthloom auto-optimizes for you\n• Independent branches run simultaneously\n\n⚡ **Result:** Million-record generation in minutes!'
    },
    BOOK_DEMO: {
      name: 'book_demo',
      keywords: ['demo', 'book', 'schedule', 'meeting', 'call', 'talk', 'support', 'help', 'team'],
      response: '📅 **Book a Demo:**\n\n**Direct link:** https://info-synthloom.atanuconsulting.in/#book-demo\n\n**What we cover:**\n✓ Live Demo Studio walkthrough\n✓ Pipeline & DAG visualization\n✓ AI enrichment & validation\n✓ Real-world use cases\n✓ Your specific needs\n✓ Pricing & access\n\n**Perfect for:**\n• First-time users\n• Complex data models\n• Enterprise scaling (millions of records)\n• Custom integration questions\n• Team training\n\n**After booking:**\n• You\'ll get login credentials\n• Access to live app\n• Support email\n• Documentation access\n\n🎯 **Need help now?** Chat here or visit docs!'
    },
    DOCUMENTATION: {
      name: 'documentation',
      keywords: ['documentation', 'docs', 'tutorial', 'guide', 'help', 'learn', 'read', 'resource', 'manual'],
      response: '📚 **Documentation & Resources:**\n\n**Full docs:** https://info-synthloom.atanuconsulting.in/docs.html\n\n**Sections covered:**\n📖 Step-by-step tutorials\n🎯 Quick start (5 minutes)\n🔧 Design Studio deep dive\n📊 Pipeline explanation\n🚀 Advanced features\n✅ Validation rules\n🎬 Video walkthroughs\n\n**Key guides:**\n• Getting Started → Provisioning\n• First Data Model → Data Modeling\n• Running Your First Job → Generate Data\n• Validation & Output → Validation, Outputs\n\n**YouTube:**\n• Quick starter video (3 min)\n• Full walkthrough available\n\n💡 **Still stuck?** Book a demo or chat here!'
    },
    DEFAULT: {
      name: 'default',
      keywords: [],
      response: 'Great question! 🤔\n\nI can help with:\n\n• **Provisioning** — Get set up & account setup\n• **Get Access** — Login, credentials, app URL\n• **Generate Data** — Run generation jobs\n• **Data Model** — Design Studio, entities, fields\n• **Field Types** — Available data types\n• **Validation** — Check data quality\n• **Outputs** — Export formats (CSV, JSON, Parquet, SQL)\n• **AI Enrichment** — GPT-4 & Claude integration\n• **Relationships** — Foreign keys & linking\n• **Pipeline** — DAG engine & parallelization\n\n**Need more?** Visit docs: https://info-synthloom.atanuconsulting.in/docs.html'
    },
    PRICING: {
      name: 'pricing',
      keywords: ['pricing', 'price', 'cost', 'plans', 'subscription', 'free', 'paid', 'pro', 'enterprise', 'saas', 'self hosted'],
      response: '💸 **Pricing Plans**\n\n**Individual — Free** (SaaS)\n• Up to **10 data models**\n• Storage for **2 generations per model**\n• No limit on number of entities\n• No limit on number of generations\n\n**Individual — Pro** (Self Hosted)\n• Self-hosted via Docker\n• All features of SaaS version\n• Contact us for pricing\n\n**Enterprise — Paid** (Self Hosted)\n• Self-hosted via Docker\n• Enterprise features & support\n• Contact us for pricing\n\n📅 View full details: https://info-synthloom.atanuconsulting.in/pricing.html'
    }
  };

  // ── SIMPLE NLP: STRING SIMILARITY & INTENT MATCHING ────────
  function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  function getEditDistance(s1, s2) {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  function classifyIntent(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Handle number shortcuts
    const numberMap = {
      '1': intents.ABOUT,
      '2': intents.PROVISIONING,
      '3': intents.GENERATE_DATA,
      '4': intents.DATA_MODEL,
      '5': intents.OUTPUTS
    };
    
    if (numberMap[input]) {
      return numberMap[input];
    }
    
    let bestMatch = { intent: intents.DEFAULT, score: 0 };

    // Check each intent
    for (const [key, intent] of Object.entries(intents)) {
      if (key === 'DEFAULT') continue;
      
      for (const keyword of intent.keywords) {
        // Exact substring match (highest priority)
        if (input.includes(keyword)) {
          return intent;
        }
        
        // Fuzzy match for typos
        const similarity = calculateSimilarity(input, keyword);
        if (similarity > 0.75 && similarity > bestMatch.score) {
          bestMatch = { intent, score: similarity };
        }
      }
    }

    // If fuzzy match found above threshold
    if (bestMatch.score > 0.75) {
      return bestMatch.intent;
    }

    // Return default
    return intents.DEFAULT;
  }

  // Add message to chat
  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg chat-msg-${sender}`;
    msgDiv.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Send message
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    chatInput.value = '';
    
    // Simulate thinking delay
    setTimeout(() => {
      const intent = classifyIntent(text);
      addMessage(intent.response, 'bot');
    }, 500);
  }

  // Toggle chat bubble
  toggleBtn.addEventListener('click', () => {
    chatContainer.classList.toggle('open');
    toggleBtn.style.display = chatContainer.classList.contains('open') ? 'none' : 'block';
    if (chatContainer.classList.contains('open')) {
      setTimeout(() => chatInput.focus({ preventScroll: true }), 300);
    }
  });

  // Close chat
  closeBtn.addEventListener('click', () => {
    chatContainer.classList.remove('open');
    toggleBtn.style.display = 'block';
  });

  // Send handlers
  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Welcome message
  setTimeout(() => {
    addMessage('Hi there 👋\n\nWhat can I help you with?\n\n**Type a number or ask anything:**\n1️⃣ About Synthloom — Learn what we do & benefits\n2️⃣ Getting started & access — Setup & login\n3️⃣ Generating synthetic data — Run generation jobs\n4️⃣ Data modeling & field types — Design Studio & entities\n5️⃣ Exports, validation & more — Quality checks & formats\n\nOr just type your question naturally!', 'bot');
  }, 500);
})();
