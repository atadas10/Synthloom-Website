/* ============================================================
   Synthloom Chatbot — NLP-Based Intent Classification
   Smart question understanding with intent-based responses
   ============================================================ */

(function () {
  'use strict';

  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-chat');
  const toggleBtn = document.getElementById('chat-toggle');
  const closeBtn = document.getElementById('close-chat');
  const chatContainer = document.getElementById('chat-bubble');

  // ── INTENT-BASED KNOWLEDGE BASE ────────────────────────────
  const intents = {
    GREETING: {
      name: 'greeting',
      keywords: ['hello', 'hi', 'hey', 'start', 'help', 'greet', 'introduction', 'welcome'],
      response: 'Hi there! 👋 I can help you with:\n\n• **Provisioning** — Get set up with Synthloom\n• **Getting Access** — Log in and start\n• **Generate Data** — Create synthetic records\n• **Data Modeling** — Design Studio & entities\n• **Validation** — Check data quality\n• **Output** — Export formats\n\nWhat would you like to know?'
    },
    PROVISIONING: {
      name: 'provisioning',
      keywords: ['provision', 'setup', 'get started', 'onboard', 'install', 'configure', 'initial', 'first', 'quickstart', 'begin', 'account'],
      response: '🎯 **Getting Started:**\n\n**1. Get access**\n   Visit synthloom.atanuconsulting.in/ and sign in, or book a demo to receive credentials.\n\n**2. Create a workspace**\n   Click "New Workspace" and give it a name.\n\n**3. Design your data model**\n   Open Design Studio, add entities and configure fields.\n\n**4. Generate & download**\n   Run your job, then download as CSV, JSON or Parquet.\n\n💡 Start with 100–1 000 rows to validate your structure quickly.'
    },
    GET_ACCESS: {
      name: 'get_access',
      keywords: ['access', 'login', 'sign in', 'credentials', 'password', 'username', 'open app', 'launch', 'where', 'url', 'link'],
      response: '🔑 **Access & Login:**\n\n**Live App URL:**\nhttps://synthloom.atanuconsulting.in/\n\n**Steps to access:**\n1. Go to the link above\n2. Enter your username & password\n3. Select or create a workspace\n4. Start generating data!\n\n**Don\'t have credentials?**\n📅 Book a demo: https://info-synthloom.atanuconsulting.in/#book-demo\nWe\'ll set you up with access!\n\n**Forgot password?**\nContact support or book a demo for help.'
    },
    GENERATE_DATA: {
      name: 'generate_data',
      keywords: ['generate', 'generation', 'create data', 'run', 'execute', 'start job', 'produce', 'output', 'records', 'run generation', 'start generating'],
      response: '▶️ **Generating Data:**\n\n**Before you start:**\n1. Open **Design Studio**\n2. Add entities (Customer, Order, etc.)\n3. Configure fields and types\n4. Set record counts\n5. Check the **Pipeline View** for ordering\n\n**To run:**\n1. Click **Generate**\n2. Choose output format — CSV, JSON, Parquet or SQL\n3. Click **Start Job**\n4. Watch live progress\n5. Download when complete\n\n⚡ Independent entities run in parallel for speed.\n✅ A validation report is always included.'
    },
    DATA_MODEL: {
      name: 'data_model',
      keywords: ['model', 'design studio', 'entity', 'entities', 'field', 'fields', 'schema', 'structure', 'table', 'column', 'configure', 'add entity', 'add field'],
      response: '📐 **Data Modeling in Design Studio:**\n\n**Three core concepts:**\n\n1️⃣ **Entities** (Tables)\n   • Customer, Order, Product, etc.\n   • Each entity = one output file\n   • Add with "+ Add Entity"\n   • Set record count\n\n2️⃣ **Fields** (Columns)\n   • Define data: name, type, constraints\n   • Types: String, Integer, Email, Phone, Date, UUID, etc.\n   • Add with "+ Add Field"\n   • Set min/max, unique, nullable, etc.\n\n3️⃣ **Relationships** (Foreign Keys)\n   • Link entities (Order → Customer)\n   • Automatic referential integrity\n   • Type: Foreign Key\n\n**Workflow:**\n1. New Config → Add Entity → Add Fields → Define FK → Check Pipeline → Generate\n\n💡 The Pipeline shows your entity dependency order visually!'
    },
    FIELD_TYPES: {
      name: 'field_types',
      keywords: ['type', 'field type', 'types', 'available types', 'uuid', 'email', 'phone', 'date', 'integer', 'string', 'enum'],
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
      response: '📤 **Output Formats:**\n\n**Available formats:**\n\n📄 **CSV** (Comma-Separated Values)\n  • Excel-friendly\n  • Universal support\n  • Good for small-medium datasets\n\n📋 **JSON** (JavaScript Object Notation)\n  • Flexible structure\n  • Per-entity files or merged\n  • API-friendly\n\n🗄️ **Parquet** (Columnar Storage)\n  • Big data pipelines (Spark, Arrow)\n  • Most efficient for large datasets\n  • Compressed\n\n🛢️ **SQL** (Direct Database Write)\n  • Write to MySQL, PostgreSQL, etc.\n  • Automatic table creation\n  • No intermediate files\n\n**How to export:**\n1. Generation completes\n2. Go to "Output & Download"\n3. Choose format\n4. Click Download\n5. Use in your pipeline!\n\n💡 **Pro tip:** Use Parquet for 1M+ records'
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
    addMessage('Hi there 👋\n\nWhat can I help you with?\n\n• Getting started & access\n• Generating synthetic data\n• Data modeling & field types\n• Exports, validation & more', 'bot');
  }, 500);
})();
