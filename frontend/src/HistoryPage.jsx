import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, Trash2, ArrowLeft, Leaf, CheckCircle2, AlertCircle, AlertTriangle,
  Clock, TrendingUp, ShieldCheck, Calendar, Sparkles
} from 'lucide-react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function getClassStyle(cls) {
  if (cls?.includes('Healthy'))      return { label: 'Healthy',     color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, dot: 'bg-emerald-500' };
  if (cls?.includes('Early_blight')) return { label: 'Early Blight', color: 'text-amber-600',   bg: 'bg-amber-50 border-amber-100',     icon: <AlertCircle className="w-5 h-5 text-amber-500" />,   dot: 'bg-amber-500' };
  return                                     { label: 'Late Blight',  color: 'text-rose-600',    bg: 'bg-rose-50 border-rose-100',       icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,  dot: 'bg-rose-500' };
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function HistoryPage({ user, onBack, currentPage, onNavigate }) {
  const [records, setRecords]     = useState([]);
  const [loading, setLoading]     = useState(true);
  const [deleting, setDeleting]   = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);

  const token = localStorage.getItem('ps_token');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(data);
    } catch {
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await axios.delete(`${API}/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecords(prev => prev.filter(r => r.id !== id));
    } finally {
      setDeleting(null);
      setConfirmDel(null);
    }
  };

  // Summary stats
  const total    = records.length;
  const healthy  = records.filter(r => r.result_class?.includes('Healthy')).length;
  const diseased = total - healthy;

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 flex flex-col items-center relative w-full">

      {/* Nav reuse from App */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav px-6 py-3.5 flex justify-between items-center transition-all">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('intro')}>
          <div className="bg-gradient-to-tr from-emerald-600 to-emerald-400 p-1.5 rounded-[10px] shadow-sm flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">PotatoShield</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex bg-gray-100/60 px-4 py-1.5 rounded-full text-sm font-semibold text-gray-600 border border-gray-200/50 items-center gap-2">
            <History className="w-4 h-4" /> Analysis History
          </div>
        </div>
      </nav>

      <div className="w-full max-w-4xl z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 px-1">
          <button onClick={onBack} className="flex items-center text-gray-500 hover:text-gray-900 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="px-5 py-2 bg-gray-100/80 backdrop-blur text-gray-600 rounded-full text-xs font-bold tracking-widest uppercase border border-gray-200">
            {user?.username}'s Records
          </div>
        </div>

        {/* Stats Row */}
        {total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            {[
              { label: 'Total Analyses', value: total,    icon: <TrendingUp className="w-5 h-5 text-sky-500" />,     bg: 'bg-sky-50 border-sky-100' },
              { label: 'Healthy',        value: healthy,  icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50 border-emerald-100' },
              { label: 'Diseased',       value: diseased, icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,  bg: 'bg-rose-50 border-rose-100' },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} border rounded-3xl p-5 flex flex-col gap-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.label}</span>
                  {s.icon}
                </div>
                <span className="text-3xl font-bold text-gray-900">{s.value}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <p className="text-gray-400 font-medium text-sm">Loading your analyses...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && records.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-6 border border-gray-200">
              <History className="w-9 h-9 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">No analyses yet</h3>
            <p className="text-gray-500 font-medium max-w-xs leading-relaxed mb-6">
              Run your first leaf analysis and your results will appear here automatically.
            </p>
            <button
              onClick={() => onNavigate('analyzer')}
              className="ios-button px-6 py-3 flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4" /> Start Analysis
            </button>
          </motion.div>
        )}

        {/* Records grid */}
        {!loading && records.length > 0 && (
          <div className="space-y-3">
            <AnimatePresence>
              {records.map((record, idx) => {
                const style = getClassStyle(record.result_class);
                const isDeleting = deleting === record.id;
                const isConfirm  = confirmDel === record.id;

                return (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className={`glass-panel rounded-[2rem] p-5 sm:p-6 border ${style.bg} flex flex-col sm:flex-row sm:items-center gap-4 group`}
                  >
                    {/* Status dot + class */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${style.bg}`}>
                        {style.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                          <span className={`font-bold text-base ${style.color}`}>{style.label}</span>
                          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {(record.confidence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 font-medium truncate">
                          {record.image_name || 'Unknown image'}
                        </p>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(record.timestamp)}
                    </div>

                    {/* Delete */}
                    <div className="flex items-center gap-2 shrink-0">
                      {isConfirm ? (
                        <>
                          <button
                            onClick={() => handleDelete(record.id)}
                            disabled={isDeleting}
                            className="px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-xl hover:bg-rose-600 transition-colors disabled:opacity-60"
                          >
                            {isDeleting ? '...' : 'Confirm'}
                          </button>
                          <button
                            onClick={() => setConfirmDel(null)}
                            className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setConfirmDel(record.id)}
                          className="w-8 h-8 rounded-xl bg-white/60 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
