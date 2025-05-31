import React, { useState, useEffect, useRef } from "react";
import {
  Building2,
  Globe,
  MapPin,
  Factory,
  Search,
  Loader2,
  CheckCircle2,
  Github,
  ChevronDown,
  ChevronUp,
  Download,
  XCircle,
  Sparkles,
  Zap,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type ResearchStatus = {
  step: string;
  message: string;
};

type ResearchOutput = {
  summary: string;
  details: Record<string, any>;
};

type Query = {
  text: string;
  number: number;
  category: string;
};

type StreamingQuery = {
  text: string;
  number: number;
  category: string;
  isComplete: boolean;
};

type DocCount = {
  initial: number;
  kept: number;
};

type DocCounts = {
  company: DocCount;
  industry: DocCount;
  financial: DocCount;
  news: DocCount;
};

type BriefingStatus = {
  company: boolean;
  industry: boolean;
  financial: boolean;
  news: boolean;
};

type EnrichmentCounts = {
  company: { total: number; enriched: number };
  industry: { total: number; enriched: number };
  financial: { total: number; enriched: number };
  news: { total: number; enriched: number };
};

type ResearchState = {
  status: string;
  message: string;
  queries: Query[];
  streamingQueries: Record<string, StreamingQuery>;
  docCounts?: DocCounts;
  enrichmentCounts?: EnrichmentCounts;
  briefingStatus: BriefingStatus;
};

console.log("=== DIRECT CONSOLE TEST ===");

const API_URL = import.meta.env.VITE_API_URL;
const WS_URL = import.meta.env.VITE_WS_URL;

if (!API_URL || !WS_URL) {
  throw new Error(
    "Environment variables VITE_API_URL and VITE_WS_URL must be set"
  );
}

console.log({
  mode: import.meta.env.MODE,
  api_url: API_URL,
  ws_url: WS_URL,
});

console.log("Environment:", {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_WS_URL: import.meta.env.VITE_WS_URL,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
});

window.addEventListener("load", () => {
  console.log("=== Window Loaded ===");
  console.log("API URL (on load):", import.meta.env.VITE_API_URL);
});

// Add Floating Particles Component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, duration: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
};

function App() {
  // Add useEffect for component mount logging
  useEffect(() => {
    console.log("=== Component Mounted ===");
    console.log("Form ready for submission");
  }, []);

  const [formData, setFormData] = useState({
    companyName: "",
    companyUrl: "",
    companyHq: "",
    companyIndustry: "",
  });
  const [isResearching, setIsResearching] = useState(false);
  const [status, setStatus] = useState<ResearchStatus | null>(null);
  const [output, setOutput] = useState<ResearchOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [researchState, setResearchState] = useState<ResearchState>({
    status: "idle",
    message: "",
    queries: [],
    streamingQueries: {},
    briefingStatus: {
      company: false,
      industry: false,
      financial: false,
      news: false
    }
  });
  const [originalCompanyName, setOriginalCompanyName] = useState<string>("");
  const statusRef = useRef<HTMLDivElement>(null);
  const [hasScrolledToStatus, setHasScrolledToStatus] = useState(false);
  const [isQueriesExpanded, setIsQueriesExpanded] = useState(true);
  const [shouldShowQueries, setShouldShowQueries] = useState(false);
  const [isSearchPhase, setIsSearchPhase] = useState(false);
  const [isBriefingExpanded, setIsBriefingExpanded] = useState(true);
  const [] = useState(true);
  const [isEnrichmentExpanded, setIsEnrichmentExpanded] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<'search' | 'enrichment' | 'briefing' | 'complete' | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [, setPdfUrl] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const scrollToStatus = () => {
    if (!hasScrolledToStatus && statusRef.current) {
      const yOffset = -20;
      const y = statusRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setHasScrolledToStatus(true);
    }
  };

  const resetResearch = () => {
    setIsResetting(true);
    
    setTimeout(() => {
      setStatus(null);
      setOutput(null);
      setError(null);
      setIsComplete(false);
      setResearchState({
        status: "idle",
        message: "",
        queries: [],
        streamingQueries: {},
        briefingStatus: {
          company: false,
          industry: false,
          financial: false,
          news: false
        }
      });
      setPdfUrl(null);
      setCurrentPhase(null);
      setIsSearchPhase(false);
      setShouldShowQueries(false);
      setIsQueriesExpanded(true);
      setIsBriefingExpanded(true);
      setIsEnrichmentExpanded(true);
      setIsResetting(false);
      setHasScrolledToStatus(false);
    }, 300);
  };

  const connectWebSocket = (jobId: string) => {
    console.log("Initializing WebSocket connection for job:", jobId);
  
    const base = WS_URL.replace(/\/$/, "");
  
    const socketUrl = base.endsWith("/research/ws")
      ? `${base}/${jobId}`
      : `${base}/research/ws/${jobId}`;
  
    console.log("Connecting WebSocket to:", socketUrl);
    const ws = new WebSocket(socketUrl);
  
    ws.onopen = () => {
      console.log("WebSocket connection established for job:", jobId);
    };
    ws.onmessage = (event) => {
      const rawData = JSON.parse(event.data);
      console.log("WebSocket message received:", rawData);

      if (rawData.type === "status_update") {
        const statusData = rawData.data;
        console.log("Status update received:", statusData);

        if (statusData.result?.step) {
          const step = statusData.result.step;
          if (step === "Search" && currentPhase !== 'search') {
            setCurrentPhase('search');
            setIsSearchPhase(true);
            setShouldShowQueries(true);
            setIsQueriesExpanded(true);
          } else if (step === "Enriching" && currentPhase !== 'enrichment') {
            setCurrentPhase('enrichment');
            setIsSearchPhase(false);
            setIsQueriesExpanded(false);
            setIsEnrichmentExpanded(true);
          } else if (step === "Briefing" && currentPhase !== 'briefing') {
            setCurrentPhase('briefing');
            setIsEnrichmentExpanded(false);
            setIsBriefingExpanded(true);
          }
        }

        if (statusData.status === "completed") {
          setCurrentPhase('complete');
          setIsComplete(true);
          setIsResearching(false);
          setOutput({
            summary: "",
            details: {
              report: statusData.result.report,
            },
          });
        }

        if (statusData.status === "query_generating" && !isSearchPhase) {
          setIsSearchPhase(true);
          setShouldShowQueries(true);
          setIsQueriesExpanded(true);
        }
        
        if (statusData.result?.step && statusData.result.step !== "Search") {
          if (isSearchPhase) {
            setIsSearchPhase(false);
            setTimeout(() => {
              setIsQueriesExpanded(false);
            }, 1000);
          }
          
          if (statusData.result.step === "Enriching") {
            setIsEnrichmentExpanded(true);
            if (statusData.status === "enrichment_complete") {
              setTimeout(() => {
                setIsEnrichmentExpanded(false);
              }, 1000);
            }
          }
          
          if (statusData.result.step === "Briefing") {
            setIsBriefingExpanded(true);
            if (statusData.status === "briefing_complete" && statusData.result?.category) {
              setResearchState((prev) => {
                const newBriefingStatus = {
                  ...prev.briefingStatus,
                  [statusData.result.category]: true
                };
                
                const allBriefingsComplete = Object.values(newBriefingStatus).every(status => status);
                
                if (allBriefingsComplete) {
                  setTimeout(() => {
                    setIsBriefingExpanded(false);
                  }, 2000);
                }
                
                return {
                  ...prev,
                  briefingStatus: newBriefingStatus
                };
              });
            }
          }
        }

        if (statusData.result?.step === "Enriching") {
          console.log("Enrichment status update:", statusData);
          
          if (statusData.status === "category_start") {
            const category = statusData.result.category as keyof EnrichmentCounts;
            if (category) {
              setResearchState((prev) => ({
                ...prev,
                enrichmentCounts: {
                  ...prev.enrichmentCounts,
                  [category]: {
                    total: statusData.result.count || 0,
                    enriched: 0
                  }
                } as EnrichmentCounts
              }));
            }
          }
          else if (statusData.status === "extracted") {
            const category = statusData.result.category as keyof EnrichmentCounts;
            if (category) {
              setResearchState((prev) => {
                const currentCounts = prev.enrichmentCounts?.[category];
                if (currentCounts) {
                  return {
                    ...prev,
                    enrichmentCounts: {
                      ...prev.enrichmentCounts,
                      [category]: {
                        ...currentCounts,
                        enriched: Math.min(currentCounts.enriched + 1, currentCounts.total)
                      }
                    } as EnrichmentCounts
                  };
                }
                return prev;
              });
            }
          }
          else if (statusData.status === "extraction_error") {
            const category = statusData.result.category as keyof EnrichmentCounts;
            if (category) {
              setResearchState((prev) => {
                const currentCounts = prev.enrichmentCounts?.[category];
                if (currentCounts) {
                  return {
                    ...prev,
                    enrichmentCounts: {
                      ...prev.enrichmentCounts,
                      [category]: {
                        ...currentCounts,
                        total: Math.max(0, currentCounts.total - 1)
                      }
                    } as EnrichmentCounts
                  };
                }
                return prev;
              });
            }
          }
          else if (statusData.status === "category_complete") {
            const category = statusData.result.category as keyof EnrichmentCounts;
            if (category) {
              setResearchState((prev) => ({
                ...prev,
                enrichmentCounts: {
                  ...prev.enrichmentCounts,
                  [category]: {
                    total: statusData.result.total || 0,
                    enriched: statusData.result.enriched || 0
                  }
                } as EnrichmentCounts
              }));
            }
          }
        }

        if (statusData.result?.step === "Curation") {
          console.log("Curation status update:", {
            status: statusData.status,
            docCounts: statusData.result.doc_counts
          });
          
          if (statusData.status === "processing" && statusData.result.doc_counts) {
            setResearchState((prev) => ({
              ...prev,
              docCounts: statusData.result.doc_counts as DocCounts
            }));
          }
          else if (statusData.status === "category_start") {
            const docType = statusData.result?.doc_type as keyof DocCounts;
            if (docType) {
              setResearchState((prev) => ({
                ...prev,
                docCounts: {
                  ...prev.docCounts,
                  [docType]: {
                    initial: statusData.result.initial_count,
                    kept: 0
                  } as DocCount
                } as DocCounts
              }));
            }
          }
          else if (statusData.status === "document_kept") {
            const docType = statusData.result?.doc_type as keyof DocCounts;
            setResearchState((prev) => {
              if (docType && prev.docCounts?.[docType]) {
                return {
                  ...prev,
                  docCounts: {
                    ...prev.docCounts,
                    [docType]: {
                      initial: prev.docCounts[docType].initial,
                      kept: prev.docCounts[docType].kept + 1
                    }
                  } as DocCounts
                };
              }
              return prev;
            });
          }
          else if (statusData.status === "curation_complete" && statusData.result.doc_counts) {
            setResearchState((prev) => ({
              ...prev,
              docCounts: statusData.result.doc_counts as DocCounts
            }));
          }
        }

        if (statusData.status === "briefing_start") {
          setStatus({
            step: "Briefing",
            message: statusData.message
          });
        } else if (statusData.status === "briefing_complete" && statusData.result?.category) {
          const category = statusData.result.category;
          setResearchState((prev) => ({
            ...prev,
            briefingStatus: {
              ...prev.briefingStatus,
              [category]: true
            }
          }));
        }

        if (statusData.status === "query_generating") {
          setResearchState((prev) => {
            const key = `${statusData.result.category}-${statusData.result.query_number}`;
            return {
              ...prev,
              streamingQueries: {
                ...prev.streamingQueries,
                [key]: {
                  text: statusData.result.query,
                  number: statusData.result.query_number,
                  category: statusData.result.category,
                  isComplete: false
                }
              }
            };
          });
        } else if (statusData.status === "query_generated") {
          setResearchState((prev) => {
            const key = `${statusData.result.category}-${statusData.result.query_number}`;
            const { [key]: _, ...remainingStreamingQueries } = prev.streamingQueries;
            
            return {
              ...prev,
              streamingQueries: remainingStreamingQueries,
              queries: [
                ...prev.queries,
                {
                  text: statusData.result.query,
                  number: statusData.result.query_number,
                  category: statusData.result.category,
                },
              ],
            };
          });
        }
        else if (statusData.status === "report_chunk") {
          setOutput((prev) => ({
            summary: "Generating report...",
            details: {
              report: prev?.details?.report
                ? prev.details.report + statusData.result.chunk
                : statusData.result.chunk,
            },
          }));
        }
        else if (statusData.status === "processing") {
          setIsComplete(false);
          if (!status?.step || status.step !== "Curation" || statusData.result?.step === "Curation") {
            setStatus({
              step: statusData.result?.step || "Processing",
              message: statusData.message || "Processing...",
            });
          }
          
          if (statusData.result?.step === "Briefing") {
            setResearchState((prev) => ({
              ...prev,
              briefingStatus: {
                company: false,
                industry: false,
                financial: false,
                news: false
              }
            }));
          }
          
          scrollToStatus();
        } else if (
          statusData.status === "failed" ||
          statusData.status === "error" ||
          statusData.status === "website_error"
        ) {
          setError(statusData.error || statusData.message || "Research failed");
          if (statusData.status === "website_error" && statusData.result?.continue_research) {
            console.log("Continuing research despite website error:", statusData.error);
          } else {
            setIsResearching(false);
            setIsComplete(false);
          }
        }
      }
    };

    ws.onclose = (event) => {
      console.log("WebSocket disconnected", {
        jobId,
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean
      });
      if (isResearching) {
        setError("Research connection lost. Please try again.");
        setIsResearching(false);
      }
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", {
        jobId,
        error: event
      });
      setError("WebSocket connection error");
      setIsResearching(false);
    };

    wsRef.current = ws;
  };

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    if (isComplete) {
      resetResearch();
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setIsResearching(true);
    setOriginalCompanyName(formData.companyName);
    setHasScrolledToStatus(false);

    try {
      const url = `${API_URL}/research`;
      console.log("Attempting fetch to:", url);

      const requestData = {
        company: formData.companyName,
        company_url: formData.companyUrl || undefined,
        industry: formData.companyIndustry || undefined,
        hq_location: formData.companyHq || undefined,
      };
      console.log("Request data:", requestData);

      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }).catch((error) => {
        console.error("Fetch error:", error);
        throw error;
      });

      console.log("Response received:", {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.job_id) {
        console.log("Connecting WebSocket with job_id:", data.job_id);
        connectWebSocket(data.job_id);
      } else {
        throw new Error("No job ID received");
      }
    } catch (err) {
      console.log("Caught error:", err);
      setError(err instanceof Error ? err.message : "Failed to start research");
      setIsResearching(false);
    }
  };

  const handleGeneratePdf = async () => {
    if (!output || isGeneratingPdf) return;
    
    setIsGeneratingPdf(true);
    try {
      console.log("Generating PDF with company name:", originalCompanyName);
      const response = await fetch(`${API_URL}/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          report_content: output.details.report,
          company_name: originalCompanyName || output.details.company
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(errorData.detail || 'Failed to generate PDF');
      }
      
      const data = await response.json();
      
      const downloadUrl = `${API_URL}${data.pdf_url}`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = downloadUrl.split('/').pop() || 'research_report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate PDF');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Enhanced styles with more effects
  const glassStyle = "backdrop-filter backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/20 shadow-2xl";
  const glassCardStyle = `${glassStyle} rounded-3xl p-8 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:border-white/30`;
  const glassInputStyle = `${glassStyle} pl-12 w-full rounded-2xl py-4 px-6 text-white shadow-lg focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:shadow-cyan-400/20 placeholder-gray-400 bg-gradient-to-r from-white/5 to-white/10 transition-all duration-300`;
  const glassButtonStyle = "group relative w-full mt-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl hover:shadow-cyan-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-3xl overflow-hidden";

  const fadeInAnimation = "transition-all duration-700 ease-out transform";

  // Function to render progress components in order
  const renderProgressComponents = () => {
    const components = [];

    // Research Report (always at the top when available)
    if (output && output.details) {
      components.push(
        <div 
          key="report" 
          className={`${glassCardStyle} ${fadeInAnimation} ${isResetting ? 'opacity-0 transform -translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'} relative overflow-hidden`}
          style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 flex items-center">
                <Sparkles className="h-6 w-6 mr-3 text-cyan-400 animate-pulse" />
                Research Results
              </h2>
              {isComplete && (
                <button
                  onClick={handleGeneratePdf}
                  disabled={isGeneratingPdf}
                  className="group relative inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
                >
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center">
                    {isGeneratingPdf ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                        Download PDF
                      </>
                    )}
                  </div>
                </button>
              )}
            </div>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-gray-300">{output.summary}</p>
              <div className={`mt-6 ${glassStyle} rounded-2xl p-6 overflow-x-auto relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
                <div className="relative z-10">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      div: ({node, ...props}) => (
                        <div className="space-y-4 text-gray-200" {...props} />
                      ),
                      h1: ({node, ...props}) => (
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 animate-fade-in" {...props} />
                      ),
                      h2: ({node, ...props}) => (
                        <h2 className="text-3xl font-bold text-white first:mt-2 mt-10 mb-6 border-l-4 border-cyan-400 pl-4" {...props} />
                      ),
                      h3: ({node, ...props}) => (
                        <h3 className="text-xl font-semibold text-white mt-8 mb-4 flex items-center">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                          <span {...props} />
                        </h3>
                      ),
                      p: ({node, children, ...props}) => {
                        const text = String(children);
                        const isSubsectionHeader = (
                          text.includes('\n') === false && 
                          text.length < 50 && 
                          (text.endsWith(':') || /^[A-Z][A-Za-z\s\/]+$/.test(text))
                        );
                        
                        if (isSubsectionHeader) {
                          return (
                            <h3 className="text-xl font-semibold text-white mt-6 mb-3 flex items-center">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                              {text.endsWith(':') ? text.slice(0, -1) : text}
                            </h3>
                          );
                        }
                        
                        const isBulletLabel = text.startsWith('•') && text.includes(':');
                        if (isBulletLabel) {
                          const [label, content] = text.split(':');
                          return (
                            <div className="text-gray-200 my-3 p-3 rounded-lg bg-white/5 border-l-2 border-cyan-400">
                              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                {label.replace('•', '').trim()}:
                              </span>
                              {content}
                            </div>
                          );
                        }
                        
                        const urlRegex = /(https?:\/\/[^\s<>"]+)/g;
                        if (urlRegex.test(text)) {
                          const parts = text.split(urlRegex);
                          return (
                            <p className="text-gray-200 my-3 leading-relaxed" {...props}>
                              {parts.map((part, i) => 
                                urlRegex.test(part) ? (
                                  <a 
                                    key={i}
                                    href={part}
                                    className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400 hover:decoration-cyan-300 cursor-pointer transition-all duration-200 hover:bg-cyan-400/10 px-1 rounded"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {part}
                                  </a>
                                ) : part
                              )}
                            </p>
                          );
                        }
                        
                        return <p className="text-gray-200 my-3 leading-relaxed" {...props}>{children}</p>;
                      },
                      ul: ({node, ...props}) => (
                        <ul className="text-gray-200 space-y-2 list-none pl-0" {...props} />
                      ),
                      li: ({node, ...props}) => (
                        <li className="text-gray-200 flex items-start">
                          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span {...props} />
                        </li>
                      ),
                      a: ({node, href, ...props}) => (
                        <a 
                          href={href}
                          className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400 hover:decoration-cyan-300 cursor-pointer transition-all duration-200 hover:bg-cyan-400/10 px-1 rounded" 
                          target="_blank"
                          rel="noopener noreferrer"
                          {...props} 
                        />
                      ),
                    }}
                  >
                    {output.details.report || "No report available"}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Current phase component
    if (currentPhase === 'briefing' || (currentPhase === 'complete' && researchState.briefingStatus)) {
      components.push(
        <div 
          key="briefing" 
          className={`${glassCardStyle} ${fadeInAnimation} ${isResetting ? 'opacity-0 transform -translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-transparent to-pink-400/5 animate-pulse"></div>
          <div className="relative z-10">
            <div 
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setIsBriefingExpanded(!isBriefingExpanded)}
            >
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 flex items-center">
                <Zap className="h-6 w-6 mr-3 text-purple-400 animate-pulse" />
                Research Briefings
              </h2>
              <button className="text-gray-400 hover:text-white transition-all duration-300 group-hover:scale-110">
                {isBriefingExpanded ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </button>
            </div>

            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
              isBriefingExpanded ? 'mt-6 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="grid grid-cols-4 gap-6">
                {['company', 'industry', 'financial', 'news'].map((category, index) => (
                  <div 
                    key={category} 
                    className={`${glassStyle} rounded-2xl p-4 transition-all duration-500 hover:scale-105 hover:shadow-lg`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-sm font-medium text-gray-400 mb-3 capitalize flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                      {category}
                    </h3>
                    <div className="text-white flex justify-center">
                      {researchState.briefingStatus[category as keyof BriefingStatus] ? (
                        <div className="flex items-center justify-center text-emerald-400 animate-bounce">
                          <CheckCircle2 className="h-8 w-8" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center text-purple-400">
                          <Loader2 className="animate-spin h-8 w-8" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!isBriefingExpanded && (
              <div className="mt-3 text-sm text-gray-400 flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                {Object.values(researchState.briefingStatus).filter(Boolean).length} of {Object.keys(researchState.briefingStatus).length} briefings completed
              </div>
            )}
          </div>
        </div>
      );
    }

    if (currentPhase === 'enrichment' || currentPhase === 'briefing' || currentPhase === 'complete') {
      components.push(
        <div 
          key="enrichment" 
          className={`${glassCardStyle} ${fadeInAnimation} ${isResetting ? 'opacity-0 transform -translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-transparent to-cyan-400/5 animate-pulse"></div>
          <div className="relative z-10">
            <div 
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setIsEnrichmentExpanded(!isEnrichmentExpanded)}
            >
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center">
                <Sparkles className="h-6 w-6 mr-3 text-emerald-400 animate-pulse" />
                Content Enrichment Progress
              </h2>
              <button className="text-gray-400 hover:text-white transition-all duration-300 group-hover:scale-110">
                {isEnrichmentExpanded ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </button>
            </div>

            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
              isEnrichmentExpanded ? 'mt-6 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="grid grid-cols-4 gap-6">
                {['company', 'industry', 'financial', 'news'].map((category, index) => {
                  const counts = researchState.enrichmentCounts?.[category as keyof EnrichmentCounts];
                  return (
                    <div 
                      key={category} 
                      className={`${glassStyle} rounded-2xl p-4 transition-all duration-500 hover:scale-105 hover:shadow-lg relative overflow-hidden`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-2xl"></div>
                      <div className="relative z-10">
                        <h3 className="text-sm font-medium text-gray-400 mb-3 capitalize flex items-center">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                          {category}
                        </h3>
                        <div className="text-white">
                          <div className="text-3xl font-bold mb-2 text-center">
                            {counts ? (
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse">
                                {counts.enriched}
                              </span>
                            ) : (
                              <Loader2 className="animate-spin h-8 w-8 mx-auto text-emerald-400" />
                            )}
                          </div>
                          <div className="text-sm text-gray-400 text-center">
                            {counts ? (
                              `enriched from ${counts.total}`
                            ) : (
                              "waiting..."
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {!isEnrichmentExpanded && researchState.enrichmentCounts && (
              <div className="mt-3 text-sm text-gray-400 flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                {Object.values(researchState.enrichmentCounts).reduce((acc, curr) => acc + curr.enriched, 0)} documents enriched from {Object.values(researchState.enrichmentCounts).reduce((acc, curr) => acc + curr.total, 0)} total
              </div>
            )}
          </div>
        </div>
      );
    }

    // Queries are always at the bottom when visible
    if (shouldShowQueries && (researchState.queries.length > 0 || Object.keys(researchState.streamingQueries).length > 0)) {
      components.push(
        <div 
          key="queries" 
          className={`${glassCardStyle} ${fadeInAnimation} ${isResetting ? 'opacity-0 transform -translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-indigo-400/5 animate-pulse"></div>
          <div className="relative z-10">
            <div 
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setIsQueriesExpanded(!isQueriesExpanded)}
            >
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center">
                <Search className="h-6 w-6 mr-3 text-blue-400 animate-pulse" />
                Generated Research Queries
              </h2>
              <button className="text-gray-400 hover:text-white transition-all duration-300 group-hover:scale-110">
                {isQueriesExpanded ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </button>
            </div>
            
            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
              isQueriesExpanded ? 'mt-6 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="grid grid-cols-2 gap-6">
                {['company', 'industry', 'financial', 'news'].map((category, index) => (
                  <div 
                    key={category} 
                    className={`${glassStyle} rounded-2xl p-4 transition-all duration-500`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="text-sm font-medium text-gray-400 flex items-center mb-4">
                      <span className="mr-3 text-2xl">{
                        category === 'company' ? '🏢' :
                        category === 'industry' ? '🏭' :
                        category === 'financial' ? '💰' : '📰'
                      }</span>
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                      {category.charAt(0).toUpperCase() + category.slice(1)} Analysis
                    </h3>
                    <div className="space-y-3">
                      {/* Show streaming queries first */}
                      {Object.entries(researchState.streamingQueries)
                        .filter(([key]) => key.startsWith(`${category}_analyzer`))
                        .map(([key, query]) => (
                          <div key={key} className={`${glassStyle} rounded-xl p-3 border-blue-500/30 relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent animate-pulse"></div>
                            <div className="relative z-10">
                              <span className="text-gray-300">{query.text}</span>
                              <span className="animate-pulse ml-1 text-blue-400 font-bold">|</span>
                            </div>
                          </div>
                        ))}
                      {/* Then show completed queries */}
                      {researchState.queries
                        .filter((q) => q.category === `${category}_analyzer`)
                        .map((query, idx) => (
                          <div 
                            key={idx} 
                            className={`${glassStyle} rounded-xl p-3 transition-all duration-300 hover:scale-102 hover:shadow-lg relative overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-transparent"></div>
                            <div className="relative z-10">
                              <span className="text-gray-300">{query.text}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {!isQueriesExpanded && (
              <div className="mt-3 text-sm text-gray-400 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                {researchState.queries.length} queries generated across {['company', 'industry', 'financial', 'news'].length} categories
              </div>
            )}
          </div>
        </div>
      );
    }

    return components;
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-[#0a0f1c] via-[#1a0f2e] to-gray-900 p-8 overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Animated background gradients */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        {/* Header with GitHub Link */}
        <div className="relative mb-16">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4 animate-fade-in">
              Analyze360
            </h1>
            <div className="relative">
              <p className="text-gray-300 text-xl font-light leading-relaxed">
                Automated business intelligence at your fingertips
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="absolute top-0 right-0 flex items-center space-x-3">
            <a
              href="https://github.com/rithiksingh/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 hover:text-white transition-all duration-300 ${glassStyle} p-3 rounded-xl hover:scale-110 hover:shadow-lg group`}
              aria-label="GitHub Profile"
            >
              <Github className="h-7 w-7 group-hover:animate-pulse" />
            </a>
          </div>
        </div>

        {/* Form Section */}
        <div className={`${glassCardStyle} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-blue-400/5 to-purple-400/5 animate-pulse"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-8 flex items-center">
              <Search className="h-8 w-8 mr-4 text-cyan-400 animate-pulse" />
              Research Input
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-8">
                {/* Company Name */}
                <div className="relative group">
                  <label
                    htmlFor="companyName"
                    className=" text-lg font-medium text-gray-300 mb-3 flex items-center"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                    Company Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
                    <input
                      required
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      className={glassInputStyle}
                      placeholder="Enter company name"
                    />
                  </div>
                </div>

                {/* Company URL */}
                <div className="relative group">
                  <label
                    htmlFor="companyUrl"
                    className=" text-lg font-medium text-gray-300 mb-3 flex items-center"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></div>
                    Company URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                    <input
                      id="companyUrl"
                      type="url"
                      value={formData.companyUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyUrl: e.target.value,
                        }))
                      }
                      className={glassInputStyle}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                {/* Company HQ */}
                <div className="relative group">
                  <label
                    htmlFor="companyHq"
                    className=" text-lg font-medium text-gray-300 mb-3 flex items-center"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
                    Company HQ
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-300" />
                    <input
                      id="companyHq"
                      type="text"
                      value={formData.companyHq}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyHq: e.target.value,
                        }))
                      }
                      className={glassInputStyle}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                {/* Company Industry */}
                <div className="relative group">
                  <label
                    htmlFor="companyIndustry"
                    className=" text-lg font-medium text-gray-300 mb-3 flex items-center"
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                    Company Industry
                  </label>
                  <div className="relative">
                    <Factory className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-emerald-400 transition-colors duration-300" />
                    <input
                      id="companyIndustry"
                      type="text"
                      value={formData.companyIndustry}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          companyIndustry: e.target.value,
                        }))
                      }
                      className={glassInputStyle}
                      placeholder="e.g. Technology, Healthcare"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isResearching || !formData.companyName}
                className={glassButtonStyle}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center">
                  {isResearching ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6" />
                      Researching...
                    </>
                  ) : (
                    <>
                      <Search className="-ml-1 mr-3 h-6 w-6 group-hover:animate-pulse" />
                      Start Research
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div 
            className={`${glassCardStyle} border-red-500/40 bg-red-900/30 ${fadeInAnimation} ${isResetting ? 'opacity-0 transform -translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'} relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 animate-pulse"></div>
            <div className="relative z-10 flex items-center">
              <XCircle className="h-6 w-6 text-red-400 mr-3 animate-pulse" />
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Status Box */}
        {status && (
          <div 
            ref={statusRef} 
            className={`${glassCardStyle} ${fadeInAnimation} ${isResetting ? 'opacity-0 transform -translate-y-8 scale-95' : 'opacity-100 transform translate-y-0 scale-100'} relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-cyan-400/5 to-purple-400/5 animate-pulse"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-8 flex items-center">
                <Zap className="h-8 w-8 mr-4 text-blue-400 animate-pulse" />
                Research Status
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    {error ? (
                      <div className={`${glassStyle} p-4 rounded-2xl`}>
                        <XCircle className="h-8 w-8 text-red-400 animate-pulse" />
                      </div>
                    ) : isComplete ? (
                      <div className={`${glassStyle} p-4 rounded-2xl`}>
                        <CheckCircle2 className="h-8 w-8 text-emerald-400 animate-bounce" />
                      </div>
                    ) : (
                      <div className={`${glassStyle} p-4 rounded-2xl`}>
                        <Loader2 className="animate-spin h-8 w-8 text-cyan-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-xl">{status.step}</p>
                    <p className="text-gray-400 whitespace-pre-wrap text-lg leading-relaxed">
                      {error || status.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Components Container */}
        <div className="space-y-12 transition-all duration-700 ease-in-out">
          {renderProgressComponents()}
        </div>
      </div>
      
      {/* Custom styles for animations */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;