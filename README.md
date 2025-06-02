# Analyze-360

Analyze-360 is a full-stack, AI-driven due diligence tool designed to perform comprehensive company research, generate structured reports, and deliver professional-grade PDFs. It features a modular research pipeline, real-time status updates, MongoDB persistence, and a modern React-based frontend.

---

## 📁 Repository Contents

- **Backend (FastAPI, Python)**
  - `application.py`: FastAPI entrypoint (routes, WebSocket manager)
  - `backend/graph.py`: Builds and executes the directed research graph
  - `backend/nodes/`: Individual researcher node implementations (company overview, financial analysis, news aggregation, etc.)
  - `backend/utils/`: Markdown helpers, PDF conversion utilities, reference parsing
  - `backend/services/`: `MongoDBService`, `PDFService`, `WebSocketService`, and related helpers

- **Frontend (React, TypeScript, Vite, Tailwind CSS)**
  - `ui/src/`: React components, pages, and WebSocket client logic
  - `ui/public/`: Static HTML, icons, manifest
  - `ui/package.json`: Frontend dependencies & scripts

- **Configuration & Scripts**
  - `langgraph.json`: JSON schema defining researcher nodes and edges
  - `langgraph_entry.py`: CLI entrypoint to run the research graph from the command line
  - `requirements.txt`: Python package dependencies
  - `setup.sh`: Initialization script (virtual environment and environment variables)
  - `.env.example`: Template for environment variable configuration

- **Demo Video**
  - `demo/Analyze-360-demo.mp4`: A concise, 5-minute walkthrough of system setup, key features, and error handling

- **Documentation & Metadata**
  - `README.md`: This file (setup, architecture, API docs, running instructions, bonus features, notes)
  - `LICENSE`: MIT License
  - `.gitignore`: Standard ignores for Python, Node, and IDE artifacts

---

## 🚀 Setup Instructions

All commands assume you are in the project’s root directory. Adjust paths if needed.

### 1. Clone & Enter the Repository

```bash
git clone https://github.com/rithiksingh/Analyze-360.git
cd Analyze-360

2. Backend Setup
Create a Python Virtual Environment

bash
Copy
Edit
python3 -m venv .venv
source .venv/bin/activate          # macOS/Linux
# .\.venv\Scripts\activate         # Windows PowerShell
Install Python Dependencies

bash
Copy
Edit
pip install --upgrade pip
pip install -r requirements.txt
Configure Environment Variables
Copy .env.example to .env and populate:

ini
Copy
Edit
OPENAI_API_KEY=<your_openai_api_key>
TAVILY_API_KEY=<your_tavily_api_key>      # Only if using Tavily
GEMINI_API_KEY=<your_gemini_api_key>      # Only if using Google Gemini
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/yourdbname
Note: If MONGODB_URI is omitted or left blank, jobs run without persistence (in-memory only).

Start the FastAPI Backend

bash
Copy
Edit
uvicorn application:app --reload --port 8000
Backend URL: http://localhost:8000

Swagger UI: http://localhost:8000/docs

WebSocket endpoint: ws://localhost:8000/ws/status

3. Frontend Setup
Open a New Terminal & Navigate to ui/

bash
Copy
Edit
cd ui
Install Frontend Dependencies

bash
Copy
Edit
npm install
Configure Frontend Environment
Create ui/.env with:

ini
Copy
Edit
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws/status
Start the React Dev Server

bash
Copy
Edit
npm run dev
Frontend URL: http://localhost:5173 (or as displayed by Vite)
🏗 Architecture Overview
graphql
Copy
Edit
Analyze-360/
├── application.py            # FastAPI entrypoint: HTTP routes + WebSocket manager
├── backend/                  # Core research engine and utilities
│   ├── graph.py              # Builds & executes the research graph based on langgraph.json
│   ├── nodes/                # Researcher node modules (company, industry, financials, news, etc.)
│   ├── utils/                # Markdown formatting, PDF conversion, reference parsing
│   └── services/             # MongoDBService, PDFService, WebSocketService, etc.
├── ui/                       # React + TypeScript frontend
│   ├── src/                  # Components, pages, WebSocket client logic
│   ├── public/               # Static HTML, icons, manifest
│   └── package.json          # Frontend dependencies & scripts
├── langgraph.json            # Defines researcher nodes, prompts, and execution edges
├── langgraph_entry.py        # CLI entrypoint to run the full graph from command line
├── requirements.txt          # Python dependencies for backend
├── setup.sh                  # Script to initialize virtual environment & environment variables
├── .env.example              # Template for environment variables
├── LICENSE                   # MIT License
├── .gitignore                # Standard ignores for Python, Node, and IDEs
└── README.md                 # This file
Key Components
FastAPI Backend (application.py)

Routes:

POST /research/start : Initiate a new due diligence job.

GET /research/{job_id} : Fetch job status, intermediate outputs.

GET /research/{job_id}/report : Retrieve the consolidated Markdown report.

POST /research/{job_id}/generate-pdf : Generate and retrieve a PDF version of the report.

WebSocket:

Endpoint: /ws/status

Broadcasts real-time node execution statuses (in progress, completed, failed).

Persistence:

If MONGODB_URI is set, connects to MongoDB to store job metadata, node outputs, and final reports.

Otherwise, all data remains in memory for the lifecycle of the server process.

Research Graph (backend/graph.py)

Loads langgraph.json to construct a directed acyclic graph of researcher nodes.

Each node corresponds to a research task (company overview, industry analysis, financial summary, news aggregation, etc.).

Nodes can run sequentially or in parallel (topologically sorted).

Upon completion, node outputs are formatted into Markdown sections and optionally persisted.

Researcher Nodes (backend/nodes/)

Examples:

company_researcher.py: Generates a high-level overview using LLM calls.

industry_researcher.py: Analyzes industry trends and competitive landscape.

financial_researcher.py: Summarizes financial statements, key ratios, and performance metrics.

news_researcher.py: Aggregates recent news headlines and market sentiment.

Each node invokes one or more LLM/API calls (OpenAI, Tavily, or Google Gemini), processes results, and returns structured JSON/Markdown.

Utilities (backend/utils/)

Markdown Helpers: Functions to assemble node outputs into a unified Markdown document with headings, bullet points, and tables.

PDF Conversion: Uses a lightweight library (e.g., ReportLab or WeasyPrint) to render the final Markdown into a styled PDF with headers, footers, and pagination.

Reference Parsing: Extracts and formats citations, links, and footnotes from raw LLM responses.

Services (backend/services/)

WebSocketService: Manages client connections, subscriptions, and broadcasts status updates (JSON messages containing job_id, node_name, status, and timestamp).

MongoDBService: Connects to a MongoDB cluster when MONGODB_URI is provided, storing documents under collections such as jobs, node_outputs, and reports.

PDFService: Exposes a method to convert Markdown → PDF, save to disk under reports/{job_id}.pdf, and return a download link.

CLI Entrypoint (langgraph_entry.py)

Allows running the full research pipeline without starting the HTTP server.

Usage:

bash
Copy
Edit
python langgraph_entry.py --company AAPL --config langgraph.json
Outputs the final Markdown to stdout or writes a PDF file to reports/.

React Frontend (ui/)

Form: Input field to enter a company identifier (e.g., stock ticker or company name) and a “Start Research” button.

WebSocket Listener: Subscribes to /ws/status to receive live status messages and updates a timeline component.

Progress Timeline: Displays each node’s name, status icon (in progress, completed, failed), and timestamp in a vertical list.

Markdown Report Panel: Renders the consolidated Markdown as scrollable content once the pipeline completes.

Download PDF Button: Sends a request to POST /research/{job_id}/generate-pdf and triggers the file download of the generated PDF.

📜 API Documentation
All endpoints are documented via Swagger UI. Visit http://localhost:8000/docs after starting the backend. Below is a summary of the main routes:

POST /research/start
Description: Begin a new due diligence research job.

Request Body (JSON):

json
Copy
Edit
{
  "company_identifier": "string",   // e.g., "AAPL" or "Apple Inc."
  "graph_config": { /* optional overrides: prompts, model, node inclusion/exclusion */ }
}
Response (JSON):

json
Copy
Edit
{
  "job_id": "string",        // Unique identifier for the job
  "status": "queued"         // Initial status
}
GET /research/{job_id}
Description: Retrieve metadata, statuses, and intermediate summaries for a given job.

Response (JSON):

json
Copy
Edit
{
  "job_id": "string",
  "status": "running" | "completed" | "failed",
  "nodes": [
    {
      "name": "company_overview",
      "status": "completed",
      "output_summary": "Short summary or snippet"
    },
    /* …other nodes… */
  ],
  "started_at": "ISO8601 timestamp",
  "completed_at": "ISO8601 timestamp or null"
}
GET /research/{job_id}/report
Description: Fetch the consolidated Markdown report for a completed job.

Response:

Content-Type: text/markdown

Body: Full Markdown document, including headings, subheadings, bullet points, tables, and citations.

POST /research/{job_id}/generate-pdf
Description: Generate a PDF from the current Markdown report (if not already generated) and return a download URL.

Response (JSON):

json
Copy
Edit
{
  "pdf_url": "/reports/{job_id}.pdf"
}
WebSocket /ws/status
Description: Real-time updates of node execution status.

Client Handshake:

json
Copy
Edit
{ 
  "action": "subscribe", 
  "job_id": "optional" 
}
Server Messages (JSON):

json
Copy
Edit
{
  "job_id": "string",
  "node_name": "company_overview",
  "status": "in_progress" | "completed" | "failed",
  "timestamp": "ISO8601"
}
▶️ Running Instructions
Ensure the backend (port 8000) and frontend (port 5173) are both running using the Setup Instructions above.

Navigate to http://localhost:5173 in your browser.

Enter a valid company identifier (e.g., “AAPL” or “Tesla Inc.”) and click Start Research.

Observe the “Research Status” timeline—each node’s progress will appear in real time.

When the pipeline completes, the full Markdown report renders in the UI.

Click “Download PDF” to download the professional-grade PDF.

Optional REST interaction: Use a tool like Postman or curl to:

Fetch job status: GET http://localhost:8000/research/{job_id}

Retrieve Markdown report: GET http://localhost:8000/research/{job_id}/report

Generate PDF: POST http://localhost:8000/research/{job_id}/generate-pdf



🏅 Bonus Features
Several optional enhancements have been implemented to showcase extensibility and robustness:

Real-Time Status Updates

A WebSocket endpoint (/ws/status) broadcasts each node’s execution status (in-progress → completed/failed) with timestamps.

The React frontend subscribes to that WebSocket and renders a live progress timeline.

MongoDB Persistence Layer

If MONGODB_URI is set, every job’s metadata, each node’s intermediate output, and the final Markdown report are stored in MongoDB collections (jobs, node_outputs, reports).

You can query past job records via REST (e.g. GET /research/{job_id}) without re-running the pipeline.

Downloadable Output (PDF Generation)

After the graph finishes, the consolidated Markdown report is converted to a styled PDF via the PDFService, saved to /reports/{job_id}.pdf, and returned by POST /research/{job_id}/generate-pdf.

The frontend “Download PDF” button hits that endpoint and triggers the file download.

Error Handling & Monitoring

Each researcher node is wrapped in try/catch so that failures are caught, logged (console + MongoDB “errors” collection), and a “failed” status is broadcast via WebSocket.

The frontend shows clear error messages (e.g., invalid company input, missing API key, MongoDB connection errors) and allows the user to retry.

Scalability Considerations

The “research graph” is defined in langgraph.json and executed dynamically in backend/graph.py, making it trivial to add/remove/parallelize nodes.


Security Considerations

Environment variables (no hard-coded API keys) are loaded from .env.

CORS is restricted in application.py to only the trusted frontend origin(s).

All incoming requests are validated via Pydantic models (no unvalidated JSON bodies or query params).

Creative UI/UX

The frontend is fully responsive (Tailwind CSS) and supports both desktop and mobile.

The progress timeline uses collapsible panels so you can expand each node’s output.

A “Research Chat” component shows the history of user inputs and LLM replies (chat-style UI), stored in browser state.

📝 Notes & Assumptions
Assumptions Made
Company Identifier Flexibility:

Input may be a stock ticker (e.g., “AAPL”) or a full company name (e.g., “Apple Inc.”).

If ambiguous, the “Company Overview” node uses OpenAI prompts to infer the correct entity.

Data Sources:

Financial and industry data are synthesized via LLM prompts (OpenAI/Tavily/Gemini), not a dedicated financial API.

Future iterations could integrate a financial data service (e.g., Alpha Vantage, Yahoo Finance API) for higher accuracy.

Persistence:

MongoDB is the primary storage for jobs, node outputs, and final reports.

If MONGODB_URI is not set, all data persists only in-memory (until server restart).

Technical Decisions
FastAPI:

Chosen for its performance, async support, built-in OpenAPI docs, and first-class WebSocket integration.

React + Vite + Tailwind CSS:

Provides a fast development workflow, hot module replacement, and a lightweight styling framework.

MongoDB:

Document-based storage fits the varied and unstructured outputs from LLM calls (JSON, Markdown segments).

PDF Generation:

Utilizes a Markdown → PDF library (e.g., ReportLab or WeasyPrint) to ensure consistent formatting across sections.

WebSocket Streaming:

Real-time status updates improve user experience and allow users to monitor long-running research tasks.

Future Improvement Suggestions
Integrate a dedicated financial data API (e.g., Alpha Vantage, IEX Cloud) for precise earnings, ratios, and stock metrics.

Introduce a caching layer to reuse LLM responses and reduce API costs for repeated queries.

Implement automated integration tests (e.g., Cypress for frontend, pytest for backend) to ensure end-to-end stability.

Support multi-user roles and permissions (e.g., admin, user, viewer) to control access to job data.

Add a scheduler (e.g., cron-based) to run recurring research tasks on a predefined interval.

Extend the graph with additional nodes for ESG scoring, management background checks, and peer comparison tables.

Deploy microservices (e.g., separate LLM worker service) to scale research nodes horizontally.

