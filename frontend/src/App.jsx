import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, CheckCircle2, AlertCircle, Sparkles, X, Leaf, ShieldCheck, 
  ChevronRight, Activity, AlertTriangle, Globe, Target, Camera, Cpu, Zap, ArrowLeft, Shield, Download, Layers,
  Database, Code, Terminal, Server, Layout
} from 'lucide-react';
import axios from 'axios';

// ==========================================
// 1. NAV BAR
// ==========================================
function NavBar({ currentPage = 'intro', onNavigate }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav px-6 py-3.5 flex justify-between items-center transition-all">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate && onNavigate('intro')}>
        <div className="bg-gradient-to-tr from-emerald-600 to-emerald-400 p-1.5 rounded-[10px] shadow-sm flex items-center justify-center">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900">PotatoShield</span>
      </div>
      <div className="hidden md:flex items-center bg-gray-100/50 rounded-full px-1 border border-gray-200/50">
        <button onClick={() => onNavigate && onNavigate('intro')} className={`px-5 py-1.5 text-sm font-semibold rounded-full m-1 transition-all ${currentPage === 'intro' || currentPage === 'analyzer' ? 'text-gray-900 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Overview</button>
        <button onClick={() => onNavigate && onNavigate('technology')} className={`px-5 py-1.5 text-sm font-semibold rounded-full m-1 transition-all ${currentPage === 'technology' ? 'text-gray-900 bg-white shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Technology</button>
        <button className="px-5 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-all">PWA App</button>
      </div>
      <div>
        <button className="w-10 h-10 flex justify-center items-center bg-gray-100/80 rounded-full md:hidden hover:bg-gray-200 transition-colors">
          <Layers className="w-5 h-5 text-gray-600"/>
        </button>
      </div>
    </nav>
  );
}

// ==========================================
// 2. INTRO / LANDING PAGE COMPONENT
// ==========================================
function IntroPage({ onStart, currentPage, onNavigate }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const handleDownloadApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert("To install: Tap 'Share' > 'Add to Home Screen' on iOS or Safari.\n\nOn Windows/Android, select 'Install App' from the browser menu (or the icon in the address bar).");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-32 pb-24 px-6 relative w-full">
      <NavBar currentPage={currentPage} onNavigate={onNavigate} />
      
      <div className="w-full max-w-5xl z-10 flex flex-col items-center">
        
        {/* Dynamic Hero */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-28 mt-8 w-full">
          <div className="inline-flex items-center justify-center py-1.5 px-4 bg-emerald-50 text-emerald-700 rounded-full mb-8 font-semibold text-sm border border-emerald-100/60 shadow-sm">
            <Sparkles className="w-4 h-4 mr-2" /> Universal Diagnostic Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-gray-900 tracking-[-0.04em] mb-8 leading-[1.05]">
            Precision agriculture. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-500">Beautifully engineered.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed mb-10 tracking-tight">
            Protect your harvest instantly. PotatoShield runs flawlessly on iOS, Android, and Windows, turning any device into an institutional-grade crop scanner.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <button onClick={onStart} className="ios-button px-8 py-4 text-lg w-full sm:w-auto flex justify-center items-center group">
              Open Scanner
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={handleDownloadApp} className="ios-secondary-button px-8 py-4 text-lg w-full sm:w-auto flex justify-center items-center bg-white">
              Install App
              <Download className="w-5 h-5 ml-2 text-gray-500" />
            </button>
          </div>
        </motion.div>

        {/* Bento Grid Features */}
        <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-32 w-full">
          <div className="bento-grid">
            
            {/* Large Bento Item */}
            <div className="bento-card col-span-1 md:col-span-2 p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-end min-h-[400px]">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.05] translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10 max-w-md">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100"><Cpu className="w-7 h-7 text-gray-900"/></div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Neural Engine</h3>
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  Powered by a heavily optimized Convolutional Neural Network. Accurately identifies Early Blight, Late Blight, and Healthy foliage in milliseconds, directly from your browser.
                </p>
              </div>
            </div>

            {/* Small Bento Item */}
            <div className="bento-card p-8 md:p-10 flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 text-rose-500"><AlertTriangle className="w-7 h-7"/></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">The Threat</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Phytophthora infestans spreads rapidly in damp conditions, capable of near-total crop destruction if left undetected.
                </p>
              </div>
              <div className="mt-8 bg-gray-50/50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center text-sm font-semibold text-gray-900 mb-3"><span className="w-2.5 h-2.5 bg-rose-500 rounded-full mr-2"></span> High Contagion</div>
                <div className="w-full h-2 bg-gray-200/50 rounded-full overflow-hidden"><div className="w-[85%] h-full bg-rose-500 rounded-full"></div></div>
              </div>
            </div>
            
            {/* Small Bento Item 2 */}
            <div className="bento-card p-8 md:p-10 flex flex-col justify-between min-h-[400px]">
              <div>
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 text-sky-500"><Globe className="w-7 h-7"/></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Cross Platform</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  Designed natively for Windows, Android, and iOS. Add to your homescreen for a completely native, full-screen app experience.
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                 <div className="flex-1 bg-gray-50/50 py-4 rounded-[1rem] flex items-center justify-center border border-gray-100">
                    <span className="font-bold text-gray-900 tracking-tight text-sm">iOS</span>
                 </div>
                 <div className="flex-1 bg-gray-50/50 py-4 rounded-[1rem] flex items-center justify-center border border-gray-100">
                    <span className="font-bold text-gray-900 tracking-tight text-sm">Android</span>
                 </div>
                 <div className="flex-1 bg-gray-50/50 py-4 rounded-[1rem] flex items-center justify-center border border-gray-100">
                    <span className="font-bold text-gray-900 tracking-tight text-sm">Windows</span>
                 </div>
              </div>
            </div>

            {/* Large Bento Item 2 */}
            <div className="bento-card col-span-1 md:col-span-2 p-8 md:p-12 relative overflow-hidden bg-gray-900 border-none flex flex-col justify-center min-h-[400px] text-white">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full mix-blend-screen filter blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
              <div className="relative z-10 max-w-2xl">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-[-0.03em] leading-tight">Instant diagnosis.<br/><span className="text-gray-400">Zero lag.</span></h3>
                <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10 max-w-xl">
                  Upload high-resolution field captures instantly. Our specialized multi-part parsing eliminates system indexing delays on Windows and Android.
                </p>
                <button onClick={onStart} className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold shadow-xl shadow-white/10 hover:scale-105 transition-transform flex items-center w-max">
                  <Camera className="w-5 h-5 mr-3" /> Start Analysis
                </button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center pb-8 border-t border-gray-200/50 pt-8 w-full">
           <p className="text-gray-400 font-medium text-sm">Engineered for absolute accuracy. Powered by Fast API & React.</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. SECURE ANALYZER COMPONENT
// ==========================================
function AnalyzerComponent({ onBack, currentPage, onNavigate }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('IDLE'); // IDLE, SCANNING, COMPLETE, ERROR
  const [result, setResult] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const selected = acceptedFiles[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setStatus('IDLE');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'], 'image/webp': ['.webp'] }, multiple: false
  });

  const clearSession = (e) => {
    if (e) e.stopPropagation();
    setFile(null); setPreview(null); setResult(null); setStatus('IDLE');
  };

  const startAnalysis = async () => {
    if (!file) return;
    setStatus('SCANNING');
    
    // Simulating iOS/Native camera feel delay
    await new Promise(r => setTimeout(r, 600));

    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:8000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      if (response.data && response.data.class) {
         setResult(response.data);
         setStatus('COMPLETE');
      } else {
         throw new Error("Invalid response format from FastAPI");
      }
    } catch (error) {
      console.error(error);
      setStatus('ERROR');
    }
  };

  const isHealthy = result?.class?.includes("Healthy");
  const isEarly = result?.class?.includes("Early_blight");
  
  const getOutcomeColors = () => {
    if (status === 'ERROR') return 'from-rose-50 to-white border-rose-100 text-rose-600';
    if (!result) return 'from-gray-50 to-white border-gray-100 text-gray-600';
    if (isHealthy) return 'from-emerald-50 to-white border-emerald-100 text-emerald-600';
    if (isEarly) return 'from-amber-50 to-white border-amber-100 text-amber-600';
    return 'from-rose-50 to-white border-rose-100 text-rose-600';
  };

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 flex flex-col items-center relative w-full">
      <NavBar currentPage={currentPage} onNavigate={onNavigate} />

      <div className="w-full max-w-4xl z-10">
        
        {/* Top Control */}
        <div className="flex items-center justify-between mb-8 px-2">
          <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="px-5 py-2 bg-gray-100/80 backdrop-blur text-gray-600 rounded-full text-xs font-bold tracking-widest uppercase border border-gray-200">
             Live Diagnostic
          </div>
        </div>

        {/* Dynamic Studio Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="glass-panel ultra-rounded p-3 sm:p-4 shadow-xl shadow-gray-200/40">
          <div className="flex flex-col md:flex-row gap-4 h-full">
            
            {/* Viewfinder Dropzone */}
            <div className={`w-full ${file ? 'md:w-[55%]' : 'h-[450px]'} transition-all duration-700 ease-[0.16,1,0.3,1] relative overflow-hidden ultra-rounded`}>
              {!preview ? (
                <div 
                  {...getRootProps()} 
                  className={`h-full border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50/40 hover:bg-gray-50
                      ${isDragActive ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-200'}`}
                >
                  <input {...getInputProps()} />
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-white shadow-sm border border-gray-100 transition-transform ${isDragActive ? 'scale-110' : ''}`}>
                    <Camera className="w-6 h-6 text-gray-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Capture Subject</h3>
                  <p className="text-gray-500 font-medium text-center px-8 text-[15px] leading-relaxed">
                    Drag media here or tap to select from local device storage.
                  </p>
                </div>
              ) : (
                <div className="relative h-full min-h-[350px] rounded-[2rem] overflow-hidden bg-gray-900 group border border-gray-100">
                  <motion.img 
                    initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                    src={preview} alt="Subject" 
                    className={`w-full h-full object-cover transition-all duration-1000 ${status === 'SCANNING' ? 'scale-110 filter blur-xl brightness-[0.3]' : 'brightness-100'}`}
                  />
                  
                  {/* Subject Controls overlay */}
                  <div className="absolute top-4 right-4 flex space-x-2 z-20">
                    <button onClick={clearSession} disabled={status === 'SCANNING'} className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-black/50 transition-all disabled:opacity-0 shadow-sm border border-white/10">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scanning Overlay */}
                  {status === 'SCANNING' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-[3px] border-white/20 border-t-white animate-spin mb-6"></div>
                      <span className="text-white font-semibold text-sm bg-black/40 px-5 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-2xl">Analyzing biological signatures...</span>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Results / Action Panel */}
            <AnimatePresence mode="popLayout">
              {file && (
                <motion.div 
                  initial={{ opacity: 0, x: 20, width: 0 }} 
                  animate={{ opacity: 1, x: 0, width: '100%', flex: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }} 
                  transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
                  className="flex flex-col min-w-[300px]"
                >
                  <div className={`flex-1 rounded-[2rem] bg-gradient-to-br ${getOutcomeColors()} border p-8 flex flex-col shadow-sm relative overflow-hidden transition-colors duration-700`}>
                    
                    {status === 'IDLE' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex flex-col justify-center">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100"><ShieldCheck className="w-7 h-7 text-gray-900"/></div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Ready</h3>
                        <p className="text-[15px] font-medium mb-10 text-gray-500 leading-relaxed">System initialized. Awaiting user command to commence CNN inference on the subject image.</p>
                        <button onClick={startAnalysis} className="ios-button py-4 px-6 w-full text-center flex justify-center items-center text-lg">
                          Analyze Now <Zap className="w-5 h-5 ml-2" />
                        </button>
                      </motion.div>
                    )}

                    {status === 'ERROR' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex flex-col justify-center">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-rose-100"><AlertTriangle className="w-7 h-7 text-rose-500"/></div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Failure</h3>
                        <p className="text-[15px] font-medium mb-10 text-gray-500 leading-relaxed">Ensure backend server is running and port 8000 is accessible. Inference aborted.</p>
                        <button onClick={() => setStatus('IDLE')} className="ios-secondary-button py-4 px-6 w-full text-center flex justify-center items-center bg-white text-lg">
                          Dismiss
                        </button>
                      </motion.div>
                    )}

                    {status === 'SCANNING' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex flex-col justify-center items-center text-center">
                        <p className="font-semibold text-gray-900 animate-pulse text-lg tracking-tight">Computing tensors...</p>
                      </motion.div>
                    )}

                    {status === 'COMPLETE' && result && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-8">
                           <div>
                             <span className="text-xs uppercase tracking-widest font-black opacity-40 mb-2 block">Diagnosis</span>
                             <h2 className={`text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-none text-gray-900`}>
                               {result.class.replace(/_/g, ' ')}
                             </h2>
                           </div>
                           <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-current/10 shrink-0">
                             {isHealthy ? <CheckCircle2 className="w-7 h-7 text-emerald-500" /> : <AlertCircle className="w-7 h-7 text-current" />}
                           </div>
                        </div>

                        <div className="bg-white/60 rounded-2xl p-5 mb-4 shadow-sm backdrop-blur-md border border-white/60">
                           <div className="flex justify-between items-end mb-3">
                             <span className="text-[11px] font-bold uppercase tracking-widest opacity-50">Confidence Level</span>
                             <span className="font-bold text-gray-900 tracking-tight text-xl">{(result.confidence * 100).toFixed(1)}%</span>
                           </div>
                           <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(result.confidence * 100, 100)}%` }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="h-full bg-current rounded-full opacity-80"></motion.div>
                           </div>
                        </div>

                        {!isHealthy && (
                          <div className="bg-white/60 rounded-2xl p-5 shadow-sm backdrop-blur-md border border-white/60 text-[15px] font-medium mt-auto group hover:bg-white/80 transition-colors">
                            <span className="font-bold text-gray-900 mb-1.5 flex items-center tracking-tight"><Shield className="w-4 h-4 mr-2"/> Recommended Action</span>
                            <span className="opacity-70 leading-relaxed block">Apply targeted fungicide immediately and observe standard quarantine protocols.</span>
                          </div>
                        )}
                        {isHealthy && (
                          <div className="bg-white/60 rounded-2xl p-5 shadow-sm backdrop-blur-md border border-white/60 text-[15px] font-medium mt-auto group hover:bg-white/80 transition-colors">
                            <span className="font-bold text-gray-900 mb-1.5 flex items-center tracking-tight"><ShieldCheck className="w-4 h-4 mr-2"/> Recommended Action</span>
                            <span className="opacity-70 leading-relaxed block">Maintain standard regimen. No biological intervention required.</span>
                          </div>
                        )}
                      </motion.div>
                    )}

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ==========================================
// 4. TECHNOLOGY PAGE COMPONENT
// ==========================================
function TechnologyPage({ currentPage, onNavigate }) {
  const techStack = [
    {
      title: "Frontend Experience",
      name: "React & Vite",
      icon: <Layout className="w-8 h-8 text-sky-500" />,
      desc: "Architected for silky-smooth 60fps interactions using heavily optimized React 18 concurrent rendering and Framer Motion physics.",
      color: "from-sky-50 to-sky-100 border-sky-200"
    },
    {
      title: "Inference Engine",
      name: "FastAPI",
      icon: <Zap className="w-8 h-8 text-emerald-500" />,
      desc: "Ultra-high performance asynchronous Python backend, pushing raw diagnostic models with sub-millisecond overhead.",
      color: "from-emerald-50 to-emerald-100 border-emerald-200"
    },
    {
      title: "Neural Vision",
      name: "MobileNet V2",
      icon: <Cpu className="w-8 h-8 text-amber-500" />,
      desc: "Specialized Convolutional Neural Network trained specifically for phytopathology, optimized for low-latency edge inference.",
      color: "from-amber-50 to-amber-100 border-amber-200"
    },
    {
      title: "Design System",
      name: "Tailwind CSS",
      icon: <Code className="w-8 h-8 text-indigo-500" />,
      desc: "Custom utility-first styling pipeline generating the proprietary Apple-style glassmorphism and bento grids.",
      color: "from-indigo-50 to-indigo-100 border-indigo-200"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center relative w-full overflow-hidden">
      <NavBar currentPage={currentPage} onNavigate={onNavigate} />
      
      {/* Background glow for aesthetics */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-sky-400/10 to-emerald-400/10 rounded-full blur-[120px] -z-10 mix-blend-multiply"></div>

      <div className="w-full max-w-5xl z-10 flex flex-col items-center">
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-20 w-full relative">
          <div className="inline-flex items-center justify-center py-1.5 px-4 bg-gray-100 text-gray-700 rounded-full mb-6 font-semibold text-sm border border-gray-200/60 shadow-sm">
            <Server className="w-4 h-4 mr-2 text-gray-500" /> Advanced Architecture
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
            Built for scale.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-400">Engineered for precision.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
            A seamless fusion of modern web technologies and deep learning, designed to deliver instantaneous agricultural diagnostics.
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
          {techStack.map((tech, idx) => (
            <div key={idx} className="bento-card p-8 group relative overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-200/60 transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-100 to-transparent opacity-[0.2] group-hover:opacity-[0.5] transition-opacity rounded-bl-full"></div>
              <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gradient-to-br ${tech.color} shadow-sm border`}>
                {tech.icon}
              </div>
              <p className="relative z-10 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{tech.title}</p>
              <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-4 tracking-tight">{tech.name}</h3>
              <p className="relative z-10 text-gray-500 font-medium leading-relaxed">
                {tech.desc}
              </p>
            </div>
          ))}
        </motion.div>
        
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-20 flex flex-col items-center">
            <button onClick={() => onNavigate('analyzer')} className="ios-button px-8 py-4 text-lg flex items-center shadow-xl shadow-gray-200">
               Experience the Tech <ChevronRight className="w-5 h-5 ml-2" />
            </button>
        </motion.div>

      </div>
    </div>
  );
}

// ==========================================
// 5. MAIN ROUTING COMPONENT
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('intro'); // 'intro', 'analyzer', 'technology'

  return (
    <>
      <div className="ambient-bg"></div>
      <AnimatePresence mode="wait">
        {currentPage === 'intro' && (
          <motion.div key="intro" exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }} initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }} animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <IntroPage onStart={() => setCurrentPage('analyzer')} currentPage={currentPage} onNavigate={setCurrentPage} />
          </motion.div>
        )}
        {currentPage === 'analyzer' && (
          <motion.div key="analyzer" initial={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }} animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }} exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <AnalyzerComponent onBack={() => setCurrentPage('intro')} currentPage={currentPage} onNavigate={setCurrentPage} />
          </motion.div>
        )}
        {currentPage === 'technology' && (
          <motion.div key="technology" initial={{ opacity: 0, filter: "blur(10px)", y: 20 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} exit={{ opacity: 0, filter: "blur(10px)", y: 20 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <TechnologyPage currentPage={currentPage} onNavigate={setCurrentPage} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
