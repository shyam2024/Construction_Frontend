import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, FileText, CheckSquare, HardHat, DollarSign, Landmark, LayoutDashboard,
  FolderGit2, Gavel, ClipboardCheck, Ruler, Receipt, ShieldAlert, Bell, Search, 
  Filter, Plus, Eye, ChevronRight, Check, X, ArrowRight, CornerUpLeft, AlertCircle,
  FileDown, Printer, MapPin, UserCheck, Clock, CheckCircle2, AlertTriangle, XCircle,
  BarChart3, PieChart, TrendingUp, Users, ChevronDown, ChevronUp, Download, RefreshCw,
  MoreVertical, Shield, Send, MessageSquare, History, Paperclip, ExternalLink, Menu,
  X as CloseIcon, SlidersHorizontal, Info, Award, HelpCircle, FileSpreadsheet, Lock
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart as RePieChart, Pie, Cell, LineChart, Line, AreaChart, Area 
} from 'recharts';

// Gujarat Departments & Projects Mock Data
const GUJARAT_DEPARTMENTS = [
  'Roads & Buildings Department (R&B)',
  'Narmada, Water Resources, Water Supply and Kalpsar',
  'Urban Development & Urban Housing Department',
  'Gujarat Maritime Board (GMB)',
  'Energy & Petrochemicals Department'
];

const ROLES = {
  SUPER_ADMIN: { label: 'Super Admin', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  GOVERNMENT_OFFICER: { label: 'Govt Officer (Secretary)', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  EXECUTIVE_ENGINEER: { label: 'Executive Engineer', color: 'bg-teal-100 text-teal-800 border-teal-300' },
  PROCUREMENT_OFFICER: { label: 'Procurement Officer', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  CONTRACTOR: { label: 'L&T Infrastructure (Contractor)', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  FINANCE_OFFICER: { label: 'Finance Officer', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  TREASURY_OFFICER: { label: 'Treasury Officer', color: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
  QUALITY_INSPECTOR: { label: 'Quality Inspector', color: 'bg-rose-100 text-rose-800 border-rose-300' }
};

const INITIAL_PROJECTS = [
  {
    id: 'PRJ-GJR-2026-001',
    name: 'Surat-Hazira Multi-Modal Expressway Expansion',
    department: 'Roads & Buildings Department (R&B)',
    budget: 4500000000, // ₹450 Cr
    spent: 2850000000,
    status: 'IN_PROGRESS',
    contractor: 'Larsen & Toubro Ltd',
    location: 'Surat district',
    lat: 21.1702,
    lng: 72.8311,
    completionPercentage: 63,
    startDate: '2024-04-15',
    targetDate: '2026-11-30',
    district: 'Surat',
    packagesCount: 4
  },
  {
    id: 'PRJ-GJR-2026-002',
    name: 'Sabarmati Riverfront Phase II Promenade Extension',
    department: 'Urban Development & Urban Housing Department',
    budget: 1200000000, // ₹120 Cr
    spent: 980000000,
    status: 'IN_PROGRESS',
    contractor: 'Adani Infra Tech',
    location: 'Ahmedabad North',
    lat: 23.0300,
    lng: 72.5800,
    completionPercentage: 81,
    startDate: '2024-01-10',
    targetDate: '2026-06-30',
    district: 'Ahmedabad',
    packagesCount: 2
  },
  {
    id: 'PRJ-GJR-2026-003',
    name: 'GIFT City Smart Underground Utility Ducting Phase III',
    department: 'Energy & Petrochemicals Department',
    budget: 850000000, // ₹85 Cr
    spent: 850000000,
    status: 'COMPLETED',
    contractor: 'Tata Projects Infrastructure',
    location: 'Gandhinagar SEZ',
    lat: 23.1600,
    lng: 72.6800,
    completionPercentage: 100,
    startDate: '2023-08-01',
    targetDate: '2025-12-15',
    district: 'Gandhinagar',
    packagesCount: 3
  },
  {
    id: 'PRJ-GJR-2026-004',
    name: 'Saurashtra Narmada Avtaran Irrigation (SAUNI) Canal Link 4',
    department: 'Narmada, Water Resources, Water Supply and Kalpsar',
    budget: 6800000000, // ₹680 Cr
    spent: 2100000000,
    status: 'IN_PROGRESS',
    contractor: 'Patel Engineering Ltd',
    location: 'Rajkot - Jamnagar Stretch',
    lat: 22.3039,
    lng: 70.8022,
    completionPercentage: 31,
    startDate: '2025-02-01',
    targetDate: '2027-08-30',
    district: 'Rajkot',
    packagesCount: 6
  },
  {
    id: 'PRJ-GJR-2026-005',
    name: 'Bhavnagar Port Breakwater Dredging & Jetty Modernization',
    department: 'Gujarat Maritime Board (GMB)',
    budget: 3100000000, // ₹310 Cr
    spent: 450000000,
    status: 'TENDERING',
    contractor: 'Pending Award',
    location: 'Gulf of Khambhat',
    lat: 21.7645,
    lng: 72.1519,
    completionPercentage: 5,
    startDate: '2026-01-15',
    targetDate: '2028-03-31',
    district: 'Bhavnagar',
    packagesCount: 2
  }
];

const INITIAL_WORKFLOW_FILES = [
  {
    id: 'FILE-GJR-2026-8801',
    fileNumber: 'WRD/2026/SWR/4492-A',
    subject: 'RA Bill #04 Clearance for Saurashtra Narmada Avtaran Link 4',
    projectId: 'PRJ-GJR-2026-004',
    projectName: 'Saurashtra Narmada Avtaran Irrigation Link 4',
    stage: 'Engineer Review', // Submitted, Engineer Review, Finance Review, Treasury, Completed
    priority: 'HIGH',
    currentHolder: 'Er. Rajesh Vaghela (Executive Engineer)',
    daysPending: 2,
    amount: 142500000, // ₹14.25 Cr
    submittedBy: 'Patel Engineering Ltd (Contractor)',
    notings: [
      {
        id: 'n1',
        officer: 'Patel Engineering Ltd',
        designation: 'EPC Contractor',
        department: 'Private Vendor',
        action: 'SUBMITTED',
        timestamp: '2026-09-18 10:30 AM',
        remarks: 'Submitting RA Bill No. 04 along with verified digital Measurement Book entries for earthwork excavation and PCC lining work completed between July-August 2026.'
      },
      {
        id: 'n2',
        officer: 'Er. Rajesh Vaghela',
        designation: 'Executive Engineer',
        department: 'Narmada Water Resources Dept',
        action: 'VERIFYING',
        timestamp: '2026-09-19 02:15 PM',
        remarks: 'Joint site measurement conducted on 17-Sept. Quality inspector NCR #02 resolved satisfactorily. Measurement entries cross-checked against BOQ item 4.2.'
      }
    ]
  },
  {
    id: 'FILE-GJR-2026-8802',
    fileNumber: 'RBD/2026/EXPR/1029-B',
    subject: 'Revised Structural Design Sanction for Surat Expressway Flyover Pier 14',
    projectId: 'PRJ-GJR-2026-001',
    projectName: 'Surat-Hazira Multi-Modal Expressway Expansion',
    stage: 'Submitted',
    priority: 'URGENT',
    currentHolder: 'Shri A.K. Solanki (Superintending Engineer)',
    daysPending: 1,
    amount: 32000000,
    submittedBy: 'Larsen & Toubro Ltd',
    notings: [
      {
        id: 'n3',
        officer: 'Larsen & Toubro Ltd',
        designation: 'Lead Engineer',
        department: 'R&B Infrastructure Wing',
        action: 'SUBMITTED',
        timestamp: '2026-09-19 11:00 AM',
        remarks: 'Enclosing modified foundation drawing for Pier 14 due to unexpected high water table encountered during piling.'
      }
    ]
  },
  {
    id: 'FILE-GJR-2026-8803',
    fileNumber: 'FIN/2026/UDD/9012',
    subject: 'Treasury Disbursement - Sabarmati Riverfront Phase II Milestone 3',
    projectId: 'PRJ-GJR-2026-002',
    projectName: 'Sabarmati Riverfront Phase II Extension',
    stage: 'Finance Review',
    priority: 'MEDIUM',
    currentHolder: 'Smt. Minaxi Patel (Finance Officer)',
    daysPending: 4,
    amount: 87500000,
    submittedBy: 'Urban Development Dept',
    notings: [
      {
        id: 'n4',
        officer: 'Er. D.M. Shah',
        designation: 'Deputy Executive Engineer',
        department: 'Urban Development',
        action: 'FORWARDED',
        timestamp: '2026-09-15 04:45 PM',
        remarks: 'RA Bill #06 verified and audit checked. Net payable after 5% retention and GST withholding is ₹8.75 Cr. Recommended for disbursement release.'
      }
    ]
  },
  {
    id: 'FILE-GJR-2026-8804',
    fileNumber: 'TRS/2026/GMB/0041',
    subject: 'Final Treasury Sanction - GIFT City Ducting Completion Certificate Release',
    projectId: 'PRJ-GJR-2026-003',
    projectName: 'GIFT City Underground Utility Ducting',
    stage: 'Treasury',
    priority: 'HIGH',
    currentHolder: 'Shri Vikram Desai (Treasury Officer)',
    daysPending: 2,
    amount: 45000000,
    submittedBy: 'Finance Dept',
    notings: [
      {
        id: 'n5',
        officer: 'Smt. Minaxi Patel',
        designation: 'Finance Officer',
        department: 'Finance Dept',
        action: 'APPROVED',
        timestamp: '2026-09-17 01:20 PM',
        remarks: 'Final bill audit verified. Retention money release cleared following completion of 12-month defect liability period.'
      }
    ]
  }
];

const INITIAL_MEASUREMENTS = [
  { id: 'MB-001', boqCode: 'BOQ-101', description: 'Excavation in hard rock with hydraulic breaker', unit: 'Cum', quantity: 1250, rate: 850, amount: 1062500 },
  { id: 'MB-002', boqCode: 'BOQ-102', description: 'Plain Cement Concrete (PCC) Grade M15 base lining', unit: 'Cum', quantity: 420, rate: 4200, amount: 1764000 },
  { id: 'MB-003', boqCode: 'BOQ-103', description: 'Reinforced Cement Concrete (RCC) M35 in superstructure', unit: 'Cum', quantity: 890, rate: 8700, amount: 7743000 },
  { id: 'MB-004', boqCode: 'BOQ-104', description: 'Fe-550 TMT Steel Reinforcement cutting & fixing', unit: 'MT', quantity: 95, rate: 68000, amount: 6460000 }
];

const INITIAL_INSPECTIONS = [
  {
    id: 'INSP-2026-101',
    projectId: 'PRJ-GJR-2026-001',
    projectName: 'Surat-Hazira Expressway Expansion',
    location: 'Chainage KM 14+200 to 16+500',
    inspector: 'Er. Hardik Mehta (Quality Inspector)',
    type: 'Bituminous Concrete Compaction & Core Test',
    date: '2026-09-16',
    status: 'PASS',
    remarks: 'Field density test achieved 98.4% compaction against minimum required 98%. Bitumen content test 5.2% conforms to MORTH specifications.',
    ncrIssued: false,
    photos: ['/api/placeholder/400/300', '/api/placeholder/400/300']
  },
  {
    id: 'INSP-2026-102',
    projectId: 'PRJ-GJR-2026-004',
    projectName: 'Saurashtra Narmada Irrigation Link 4',
    location: 'Canal Structure Section B-2',
    inspector: 'Er. Hardik Mehta (Quality Inspector)',
    type: 'RCC Slump & Concrete Cube Strength Check',
    date: '2026-09-14',
    status: 'FAIL',
    remarks: 'Honeycombing observed in Pier wall #03 pouring due to inadequate needle vibration. 7-day cube strength fell short by 12%. NCR-2026-09 issued.',
    ncrIssued: true,
    ncrDetails: 'NCR-2026-09: Honeycombing in Pier 3. Chipping, polymer repair and ultrasonic pulse test mandatory before proceeding.',
    photos: ['/api/placeholder/400/300']
  },
  {
    id: 'INSP-2026-103',
    projectId: 'PRJ-GJR-2026-002',
    projectName: 'Sabarmati Riverfront Phase II',
    location: 'Diaphragm Wall Block 7',
    inspector: 'Er. S.K. Joshi (Senior Quality Consultant)',
    type: 'Steel Alignment & Epoxy Coating Check',
    date: '2026-09-19',
    status: 'PENDING',
    remarks: 'Rebar spacing verified. Lab test report for anti-corrosive epoxy coating pending approval from SVNIT Surat laboratory.',
    ncrIssued: false,
    photos: []
  }
];

const INITIAL_TENDERS = [
  {
    id: 'TND-GJR-2026-90',
    title: 'Construction of 6-Lane Flyover at Varachha Junction, Surat',
    department: 'Roads & Buildings Department (R&B)',
    estimatedCost: 1850000000,
    submissionDeadline: '2026-10-15',
    status: 'EVALUATION',
    bidsCount: 3,
    bids: [
      { id: 'BID-1', contractor: 'Larsen & Toubro Ltd', technicalScore: 94, financialBid: 1820000000, status: 'L1 Qualified' },
      { id: 'BID-2', contractor: 'Dilip Buildcon Ltd', technicalScore: 88, financialBid: 1845000000, status: 'L2 Eligible' },
      { id: 'BID-3', contractor: 'IRB Infrastructure', technicalScore: 82, financialBid: 1890000000, status: 'L3 Disqualified' }
    ]
  },
  {
    id: 'TND-GJR-2026-91',
    title: 'Smart Metering & Underground Cabling for Dholera SIR Zone 1',
    department: 'Energy & Petrochemicals Department',
    estimatedCost: 650000000,
    submissionDeadline: '2026-10-30',
    status: 'PUBLISHED',
    bidsCount: 0,
    bids: []
  }
];

const formatINR = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  if (amount >= 1000007) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, color = 'blue', subtext }) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    teal: 'bg-teal-50 text-teal-600 border-teal-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    rose: 'bg-rose-50 text-rose-600 border-rose-200'
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
        <div className={`p-2.5 rounded-lg border ${colorMap[color] || colorMap.blue}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        {trend && (
          <div className="mt-2 flex items-center text-xs font-medium">
            <span className={trend > 0 ? 'text-emerald-600 flex items-center' : 'text-rose-600 flex items-center'}>
              <TrendingUp className={`w-3.5 h-3.5 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
              {trend > 0 ? `+${trend}%` : `${trend}%`}
            </span>
            <span className="text-slate-500 ml-1.5">{trendLabel}</span>
          </div>
        )}
        {subtext && <p className="mt-1 text-xs text-slate-500">{subtext}</p>}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    IN_PROGRESS: 'bg-blue-50 text-blue-700 border-blue-200',
    COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    TENDERING: 'bg-purple-50 text-purple-700 border-purple-200',
    PASS: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    FAIL: 'bg-rose-50 text-rose-700 border-rose-200',
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
    HIGH: 'bg-rose-100 text-rose-800 border-rose-300',
    URGENT: 'bg-rose-600 text-white border-rose-700',
    MEDIUM: 'bg-amber-100 text-amber-800 border-amber-300',
    LOW: 'bg-slate-100 text-slate-700 border-slate-300'
  };

  const labels = {
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    TENDERING: 'Tendering',
    PASS: 'Passed (QA)',
    FAIL: 'Failed (NCR)',
    PENDING: 'Pending',
    HIGH: 'High Priority',
    URGENT: 'URGENT',
    MEDIUM: 'Medium',
    LOW: 'Normal'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || 'bg-slate-100 text-slate-700 border-slate-300'}`}>
      {labels[status] || status}
    </span>
  );
};

const AppHeader = ({ activeRole, setActiveRole, currentTab, setCurrentTab, notifications, unreadCount, setNotifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Gujarat Emblem Brand */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-xl w-10 h-10 rounded-lg flex items-center justify-center border border-amber-400 shadow-inner">
            GJ
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">Government of Gujarat</span>
              <span className="px-1.5 py-0.2 bg-blue-600 text-[10px] uppercase font-mono font-bold rounded text-white">e-Office v3.4</span>
            </div>
            <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
              GovInfra Gujarat
              <span className="text-slate-400 text-xs font-normal hidden sm:inline">| Infrastructure Lifecycle Portal</span>
            </h1>
          </div>
        </div>

        {/* Right Header Navigation & Interactive Role Switcher */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Quick Switch Role Switcher Banner */}
          <div className="relative">
            <button
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline text-slate-300">View as:</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold border ${ROLES[activeRole].color}`}>
                {ROLES[activeRole].label}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleSelector && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select User Role Persona
                </div>
                {Object.keys(ROLES).map((roleKey) => (
                  <button
                    key={roleKey}
                    onClick={() => {
                      setActiveRole(roleKey);
                      setShowRoleSelector(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${activeRole === roleKey ? 'bg-blue-50/80 font-bold text-blue-700' : 'text-slate-700'}`}
                  >
                    <span>{ROLES[roleKey].label}</span>
                    {activeRole === roleKey && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Notifications ({notifications.length})</span>
                  <button 
                    onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`p-3 hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-blue-50/40' : ''}`}>
                      <div className="flex items-start justify-between">
                        <p className="text-xs font-bold text-slate-900">{notif.title}</p>
                        <span className="text-[10px] text-slate-400">{notif.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Thumbnail */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center border border-blue-400">
              GJ
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-200">Govt of Gujarat</p>
              <p className="text-[10px] text-slate-400">Gandhinagar HQ</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const AppSidebar = ({ currentTab, setCurrentTab, activeRole }) => {
  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'GOVERNMENT_OFFICER', 'EXECUTIVE_ENGINEER', 'CONTRACTOR', 'FINANCE_OFFICER', 'TREASURY_OFFICER', 'QUALITY_INSPECTOR'] },
    { id: 'workflow', label: 'Workflow e-Office Inbox', icon: FolderGit2, badge: '4 Pending', roles: ['SUPER_ADMIN', 'GOVERNMENT_OFFICER', 'EXECUTIVE_ENGINEER', 'FINANCE_OFFICER', 'TREASURY_OFFICER'] },
    { id: 'projects', label: 'Projects & Map View', icon: Building2, roles: ['SUPER_ADMIN', 'GOVERNMENT_OFFICER', 'EXECUTIVE_ENGINEER', 'CONTRACTOR', 'FINANCE_OFFICER', 'QUALITY_INSPECTOR'] },
    { id: 'measurements', label: 'Digital Measurement Book', icon: Ruler, roles: ['SUPER_ADMIN', 'EXECUTIVE_ENGINEER', 'CONTRACTOR', 'QUALITY_INSPECTOR'] },
    { id: 'billing', label: 'RA Bills & Financials', icon: Receipt, roles: ['SUPER_ADMIN', 'GOVERNMENT_OFFICER', 'EXECUTIVE_ENGINEER', 'CONTRACTOR', 'FINANCE_OFFICER', 'TREASURY_OFFICER'] },
    { id: 'inspections', label: 'Quality Inspection & NCR', icon: ClipboardCheck, roles: ['SUPER_ADMIN', 'EXECUTIVE_ENGINEER', 'CONTRACTOR', 'QUALITY_INSPECTOR'] },
    { id: 'tenders', label: 'Tenders & Bid Evaluation', icon: Gavel, roles: ['SUPER_ADMIN', 'GOVERNMENT_OFFICER', 'PROCUREMENT_OFFICER', 'CONTRACTOR'] },
    { id: 'analytics', label: 'SLA Analytics & Recharts', icon: BarChart3, roles: ['SUPER_ADMIN', 'GOVERNMENT_OFFICER', 'FINANCE_OFFICER'] },
    { id: 'documentation', label: 'PCC Architecture & Docs', icon: FileText, roles: ['SUPER_ADMIN', 'GOVERNMENT_OFFICER', 'EXECUTIVE_ENGINEER', 'CONTRACTOR', 'FINANCE_OFFICER', 'TREASURY_OFFICER', 'QUALITY_INSPECTOR'] }
  ];

  const filteredNav = navItems.filter(item => item.roles.includes(activeRole));

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 min-h-[calc(100vh-57px)] border-r border-slate-800">
      <div className="p-4 border-b border-slate-800/80">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Navigation Menu</p>
      </div>

      <nav className="p-3 space-y-1">
        {filteredNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white text-blue-700' : 'bg-slate-800 text-amber-400 border border-amber-500/30'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Gujarat State Secretariat Help Widget */}
      <div className="m-3 p-3 bg-slate-800/50 rounded-xl border border-slate-800 text-xs">
        <div className="flex items-center space-x-2 text-amber-400 font-bold mb-1">
          <Landmark className="w-4 h-4" />
          <span>NIC Gujarat Support</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Need workflow assistance? Direct hotline: <span className="text-slate-200 font-mono">1800-233-5500</span>
        </p>
      </div>
    </aside>
  );
};

const DashboardView = ({ activeRole, projects, workflowFiles, inspections, setCurrentTab }) => {
  // Recharts Data Aggregations
  const departmentBudgetData = [
    { name: 'R&B Dept', budget: 450, spent: 285 },
    { name: 'Water Resources', budget: 680, spent: 210 },
    { name: 'Urban Dev', budget: 120, spent: 98 },
    { name: 'Maritime Board', budget: 310, spent: 45 },
    { name: 'Energy & Petro', budget: 85, spent: 85 }
  ];

  const monthlyPaymentsData = [
    { month: 'Apr', release: 42 },
    { month: 'May', release: 58 },
    { month: 'Jun', release: 75 },
    { month: 'Jul', release: 110 },
    { month: 'Aug', release: 95 },
    { month: 'Sep', release: 142 }
  ];

  const workflowStateDistribution = [
    { name: 'Submitted', value: 3, color: '#3B82F6' },
    { name: 'Engineer Review', value: 4, color: '#0F766E' },
    { name: 'Finance Review', value: 2, color: '#7C3AED' },
    { name: 'Treasury Queue', value: 2, color: '#F59E0B' },
    { name: 'Disbursed', value: 12, color: '#16A34A' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Context Header */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-xs text-blue-300 font-semibold uppercase tracking-wider mb-2">
            <span>State Secretariat Hub</span>
            <span>•</span>
            <span className="text-amber-400">PCC v3 Active Workflow</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            GovInfra Gujarat Infrastructure Command Dashboard
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-3xl">
            Real-time monitoring of major capital expenditure projects, electronic Measurement Book clears, multi-level file notings, and treasury payment disbursements across Gujarat state departments.
          </p>
        </div>
      </div>

      {/* Dynamic Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Capital Outlay"
          value="₹16,450 Cr"
          icon={Building2}
          trend={12.4}
          trendLabel="vs last FY"
          color="blue"
          subtext="across 18 active state schemes"
        />
        <StatCard
          title="Workflow Files Pending"
          value={workflowFiles.length}
          icon={FolderGit2}
          trend={-5}
          trendLabel="faster clearance"
          color="amber"
          subtext="Avg clearance time: 2.4 days"
        />
        <StatCard
          title="RA Bills Processed"
          value="₹242.5 Cr"
          icon={Receipt}
          trend={8.2}
          trendLabel="this month"
          color="teal"
          subtext="100% digital MB validation"
        />
        <StatCard
          title="Quality Compliance"
          value="96.2%"
          icon={ShieldAlert}
          trend={1.5}
          trendLabel="quality index"
          color="purple"
          subtext="1 NCR pending resolution"
        />
      </div>

      {/* Visual Analytics Recharts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Budget Allocation vs Expenditure */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Departmental Outlay vs Spent (₹ Crores)</h3>
              <p className="text-xs text-slate-500">FY 2026-27 Allocation performance</p>
            </div>
            <button 
              onClick={() => setCurrentTab('analytics')}
              className="text-xs text-blue-600 hover:underline font-semibold flex items-center"
            >
              Full SLA Analytics <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentBudgetData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val) => [`₹${val} Cr`, '']} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="budget" name="Sanctioned Budget" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" name="Expended to Date" fill="#0F766E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workflow File State Distribution Pie */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-1">e-Office File Stage Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">Live stage of active files</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={workflowStateDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {workflowStateDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
            {workflowStateDistribution.map((st) => (
              <div key={st.name} className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.color }} />
                <span className="text-slate-600 truncate">{st.name}: <strong className="text-slate-900">{st.value}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Priority Action Items & Recent File Notings Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Action Inbox Preview */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-blue-600" />
              Active Files Requiring Action ({workflowFiles.length})
            </h3>
            <button 
              onClick={() => setCurrentTab('workflow')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View Kanban Board
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {workflowFiles.map((file) => (
              <div key={file.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{file.fileNumber}</span>
                    <StatusBadge status={file.priority} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{file.subject}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Holder: {file.currentHolder} • Pending: {file.daysPending} days</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900">{formatINR(file.amount)}</span>
                  <button 
                    onClick={() => setCurrentTab('workflow')}
                    className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Inspection & Field Alert Widget */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-teal-600" />
                Latest Field Quality Checks
              </h3>
            </div>
            <div className="space-y-3">
              {inspections.map((insp) => (
                <div key={insp.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <StatusBadge status={insp.status} />
                    <span className="text-[10px] text-slate-400">{insp.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 mt-1.5">{insp.type}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{insp.location}</p>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setCurrentTab('inspections')}
            className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors text-center"
          >
            Log New Site Inspection
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkflowView = ({ workflowFiles, setWorkflowFiles, activeRole }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [newRemark, setNewRemark] = useState('');

  const columns = ['Submitted', 'Engineer Review', 'Finance Review', 'Treasury', 'Completed'];

  const moveFileStage = (fileId, newStage) => {
    setWorkflowFiles(prev => prev.map(f => {
      if (f.id === fileId) {
        const updatedNotings = [
          ...f.notings,
          {
            id: `n-${Date.now()}`,
            officer: ROLES[activeRole]?.label || 'State Officer',
            designation: activeRole,
            department: 'Government Secretariat',
            action: newStage === 'Completed' ? 'APPROVED & CLOSED' : `TRANSITIONED TO ${newStage.toUpperCase()}`,
            timestamp: new Date().toLocaleString(),
            remarks: newRemark || `File moved to stage: ${newStage}`
          }
        ];
        return { ...f, stage: newStage, notings: updatedNotings };
      }
      return f;
    }));
    setNewRemark('');
    if (selectedFile) {
      setSelectedFile(prev => prev ? { ...prev, stage: newStage } : null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-blue-600" />
            e-Office File Movement Engine (Kanban Inbox)
          </h2>
          <p className="text-xs text-slate-500">
            Digital file movement, green-note digital signatures, and administrative sanctions.
          </p>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map((colName) => {
          const filesInCol = workflowFiles.filter(f => f.stage === colName);
          return (
            <div key={colName} className="bg-slate-100/70 rounded-xl p-3 border border-slate-200/80 min-w-[220px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">{colName}</span>
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center">
                  {filesInCol.length}
                </span>
              </div>

              <div className="space-y-3">
                {filesInCol.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                        {file.fileNumber}
                      </span>
                      <StatusBadge status={file.priority} />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">{file.subject}</h4>
                    <p className="text-[11px] text-slate-500 mt-2">{file.projectName}</p>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800">{formatINR(file.amount)}</span>
                      <span className="text-amber-600 font-semibold">{file.daysPending}d pending</span>
                    </div>
                  </div>
                ))}
                {filesInCol.length === 0 && (
                  <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center text-xs text-slate-400">
                    No files in stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* File Drawer & Green Note Notings Modal View */}
      {selectedFile && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right">
            {/* Drawer Header */}
            <div className="p-5 bg-slate-900 text-white border-b border-slate-800 flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono bg-blue-600 text-white px-2 py-0.5 rounded font-bold">{selectedFile.fileNumber}</span>
                  <StatusBadge status={selectedFile.stage} />
                </div>
                <h3 className="text-base font-bold text-white mt-2">{selectedFile.subject}</h3>
                <p className="text-xs text-slate-400 mt-1">Project: {selectedFile.projectName}</p>
              </div>
              <button onClick={() => setSelectedFile(null)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white">
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Notings Timeline Section */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4 bg-slate-50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                Office Notings & Digital Signatures Timeline
              </h4>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                {selectedFile.notings.map((note) => (
                  <div key={note.id} className="relative pl-8">
                    <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold ring-4 ring-slate-50">
                      ✓
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{note.officer}</p>
                          <p className="text-[10px] text-slate-500">{note.designation} • {note.department}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{note.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{note.remarks}</p>
                      <div className="mt-2 pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-[10px] text-emerald-700 font-semibold">
                        <span className="flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Digitally Signed (NIC e-Sign Standard)
                        </span>
                        <span className="font-mono text-slate-400">HASH: 0x8f2...a4e</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Official Note */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 mt-4 shadow-sm">
                <label className="block text-xs font-bold text-slate-800 mb-1">Add Note / Escalation Remark</label>
                <textarea
                  value={newRemark}
                  onChange={(e) => setNewRemark(e.target.value)}
                  placeholder="Enter official observation, BOQ verification, or treasury check note..."
                  rows={3}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Drawer Action Bar */}
            <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap gap-2 justify-end">
              <button 
                onClick={() => moveFileStage(selectedFile.id, 'Engineer Review')}
                className="px-3 py-2 bg-teal-700 text-white rounded-lg text-xs font-semibold hover:bg-teal-800 transition-colors"
              >
                Forward to Engineer
              </button>
              <button 
                onClick={() => moveFileStage(selectedFile.id, 'Finance Review')}
                className="px-3 py-2 bg-purple-700 text-white rounded-lg text-xs font-semibold hover:bg-purple-800 transition-colors"
              >
                Forward to Finance
              </button>
              <button 
                onClick={() => moveFileStage(selectedFile.id, 'Treasury')}
                className="px-3 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold hover:bg-amber-700 transition-colors"
              >
                Send to Treasury
              </button>
              <button 
                onClick={() => moveFileStage(selectedFile.id, 'Completed')}
                className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                Sanction & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectsView = ({ projects, setProjects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === 'ALL' || p.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            Infrastructure Projects & Geospatial Tracking
          </h2>
          <p className="text-xs text-slate-500">Live physical progress and GIS coordinates across Gujarat state.</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by project name, ID, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="w-full sm:w-64 py-2 px-3 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="ALL">All Gujarat Departments</option>
          {GUJARAT_DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Projects Table Data View */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 font-extrabold uppercase text-slate-500 text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5">Project Details</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Outlay / Spent</th>
                <th className="p-3.5">Progress %</th>
                <th className="p-3.5">Contractor</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5">
                    <p className="font-bold text-slate-900">{proj.name}</p>
                    <p className="text-[10px] font-mono text-blue-600 mt-0.5">{proj.id} • {proj.district}</p>
                  </td>
                  <td className="p-3.5 text-slate-600">{proj.department}</td>
                  <td className="p-3.5">
                    <p className="font-bold text-slate-900">{formatINR(proj.budget)}</p>
                    <p className="text-[10px] text-slate-500">Spent: {formatINR(proj.spent)}</p>
                  </td>
                  <td className="p-3.5 w-40">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full" 
                          style={{ width: `${proj.completionPercentage}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-900 text-[11px]">{proj.completionPercentage}%</span>
                    </div>
                  </td>
                  <td className="p-3.5 font-medium text-slate-800">{proj.contractor}</td>
                  <td className="p-3.5">
                    <StatusBadge status={proj.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geospatial Map Visual Simulation Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-rose-600" />
          Gujarat State OpenStreetMap GIS Integration
        </h3>
        <div className="h-64 bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 relative overflow-hidden border border-slate-800">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 text-center p-6">
            <MapPin className="w-8 h-8 text-rose-500 mx-auto animate-bounce mb-2" />
            <p className="text-xs font-bold text-white">Geospatial Engine Active (Gujarat Coordinates Lat 21.17° to 23.16°)</p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-md mx-auto">
              Real-time map markers synchronized with project GPS tags: Surat Expressway, Sabarmati Riverfront, GIFT City Ducting, Saurashtra Narmada Link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MeasurementBookView = () => {
  const [measurements, setMeasurements] = useState(INITIAL_MEASUREMENTS);
  const [newItem, setNewItem] = useState({ description: '', unit: 'Cum', quantity: '', rate: '' });

  const totalAmount = useMemo(() => {
    return measurements.reduce((acc, curr) => acc + curr.amount, 0);
  }, [measurements]);

  const addLineItem = () => {
    if (!newItem.description || !newItem.quantity || !newItem.rate) return;
    const qty = parseFloat(newItem.quantity);
    const rate = parseFloat(newItem.rate);
    const item = {
      id: `MB-00${measurements.length + 1}`,
      boqCode: `BOQ-10${measurements.length + 1}`,
      description: newItem.description,
      unit: newItem.unit,
      quantity: qty,
      rate: rate,
      amount: qty * rate
    };
    setMeasurements([...measurements, item]);
    setNewItem({ description: '', unit: 'Cum', quantity: '', rate: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-teal-600" />
            Electronic Measurement Book (e-MB Sheet)
          </h2>
          <p className="text-xs text-slate-500">Official site measurements, BOQ rate calculations, and engineer verifications.</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="px-3.5 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" /> Print Official MB Sheet
        </button>
      </div>

      {/* MB Header Metadata Info Box */}
      <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <span className="text-slate-500 font-semibold block">Project:</span>
          <span className="font-bold text-slate-900">Saurashtra Narmada Irrigation Link 4</span>
        </div>
        <div>
          <span className="text-slate-500 font-semibold block">Executing Officer:</span>
          <span className="font-bold text-slate-900">Er. Rajesh Vaghela (Exec Engineer)</span>
        </div>
        <div>
          <span className="text-slate-500 font-semibold block">Contractor:</span>
          <span className="font-bold text-slate-900">Patel Engineering Ltd</span>
        </div>
        <div>
          <span className="text-slate-500 font-semibold block">MB Document Hash:</span>
          <span className="font-mono font-bold text-blue-700">0x99482A-GJ-2026</span>
        </div>
      </div>

      {/* BOQ Line Items Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">Verified Line Measurements</h3>
          <span className="text-xs font-bold text-slate-900">Total: {formatINR(totalAmount)}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-extrabold uppercase text-slate-500 text-[10px]">
              <tr>
                <th className="p-3">BOQ Code</th>
                <th className="p-3">Work Item Description</th>
                <th className="p-3">Unit</th>
                <th className="p-3 text-right">Measured Qty</th>
                <th className="p-3 text-right">Sanction Rate (₹)</th>
                <th className="p-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {measurements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-700">{m.boqCode}</td>
                  <td className="p-3 font-medium text-slate-800">{m.description}</td>
                  <td className="p-3 text-slate-500">{m.unit}</td>
                  <td className="p-3 text-right font-mono font-bold">{m.quantity.toLocaleString()}</td>
                  <td className="p-3 text-right font-mono">₹{m.rate.toLocaleString()}</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">{formatINR(m.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Measurement Entry Form */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Add Verified Measurement Entry</h3>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-5">
            <input
              type="text"
              placeholder="Item Work Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <select
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="Cum">Cum (m³)</option>
              <option value="Sqm">Sqm (m²)</option>
              <option value="MT">MT (Tonne)</option>
              <option value="Rmt">Rmt (Meter)</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <input
              type="number"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <input
              type="number"
              placeholder="Rate (₹)"
              value={newItem.rate}
              onChange={(e) => setNewItem({ ...newItem, rate: e.target.value })}
              className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-1">
            <button
              onClick={addLineItem}
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BillingView = () => {
  const grossAmount = 142500000; // ₹14.25 Cr
  const gst = grossAmount * 0.18; // 18% GST
  const retention = grossAmount * 0.05; // 5% Retention
  const securityDeposit = grossAmount * 0.02; // 2% SD
  const netPayable = grossAmount + gst - retention - securityDeposit;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-600" />
            Running Account (RA) Bills & Treasury Disbursement
          </h2>
          <p className="text-xs text-slate-500">Automated statutory deductions, GST tax calculations, and IFMS payment clearing.</p>
        </div>
      </div>

      {/* RA Bill Summary Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Gross MB Claim</span>
          <p className="text-xl font-black text-slate-900 mt-1">{formatINR(grossAmount)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GST Add-on (18%)</span>
          <p className="text-xl font-black text-emerald-600 mt-1">+{formatINR(gst)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Retention & SD (7%)</span>
          <p className="text-xl font-black text-rose-600 mt-1">-{formatINR(retention + securityDeposit)}</p>
        </div>
        <div className="bg-gradient-to-tr from-emerald-700 to-teal-800 p-4 rounded-xl text-white shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Net Treasury Disbursement</span>
          <p className="text-xl font-black text-white mt-1">{formatINR(netPayable)}</p>
        </div>
      </div>

      {/* Stage Approval Process Progress Bar */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">RA Bill #04 Workflow Status</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
          {[
            { label: 'Contractor Draft', date: '18 Sep', status: 'done' },
            { label: 'Engineer Audit', date: '19 Sep', status: 'done' },
            { label: 'Finance Sanction', date: '20 Sep', status: 'active' },
            { label: 'Treasury Release', date: 'Pending', status: 'upcoming' },
            { label: 'Bank Disbursed', date: 'Pending', status: 'upcoming' }
          ].map((step, idx) => (
            <div key={idx} className="flex items-center space-x-3 w-full md:w-auto">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step.status === 'done' ? 'bg-emerald-600 text-white' :
                step.status === 'active' ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                'bg-slate-200 text-slate-500'
              }`}>
                {step.status === 'done' ? '✓' : idx + 1}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{step.label}</p>
                <p className="text-[10px] text-slate-400">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InspectionsView = ({ inspections, setInspections }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-purple-600" />
            Quality Inspection Logs & Non-Conformity Reports (NCR)
          </h2>
          <p className="text-xs text-slate-500">Site quality audits, concrete cube test results, and corrective actions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inspections.map((insp) => (
          <div key={insp.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400">{insp.id}</span>
              <StatusBadge status={insp.status} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{insp.type}</h4>
              <p className="text-[11px] text-slate-500 mt-1">{insp.projectName}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Location: {insp.location}</p>
            </div>
            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
              "{insp.remarks}"
            </p>
            {insp.ncrIssued && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px]">
                <strong className="block text-rose-900 mb-0.5 font-bold">Non-Conformity Notice Active:</strong>
                {insp.ncrDetails}
              </div>
            )}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Inspector: {insp.inspector}</span>
              <span>{insp.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TendersView = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Gavel className="w-5 h-5 text-indigo-600" />
            E-Tendering & Automated Bid Evaluation Engine
          </h2>
          <p className="text-xs text-slate-500">Technical score weighting and financial L1 bidder selection.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              TND-GJR-2026-90
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-1">Construction of 6-Lane Flyover at Varachha Junction, Surat</h3>
          </div>
          <StatusBadge status="HIGH" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-extrabold uppercase text-slate-500 text-[10px]">
              <tr>
                <th className="p-3">Bidding Vendor</th>
                <th className="p-3">Technical Score (/100)</th>
                <th className="p-3">Financial Bid Amount</th>
                <th className="p-3">Qualification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {INITIAL_TENDERS[0].bids.map((bid) => (
                <tr key={bid.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{bid.contractor}</td>
                  <td className="p-3">
                    <span className="font-bold text-teal-700">{bid.technicalScore}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-900">{formatINR(bid.financialBid)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      bid.status.includes('L1') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {bid.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AnalyticsView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          SLA Compliance & Financial Analytics
        </h2>
        <p className="text-xs text-slate-500">Turnaround metrics and department SLA clearance speeds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Monthly Treasury Releases (₹ Cr)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { month: 'Apr', release: 42 },
                { month: 'May', release: 58 },
                { month: 'Jun', release: 75 },
                { month: 'Jul', release: 110 },
                { month: 'Aug', release: 95 },
                { month: 'Sep', release: 142 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="release" stroke="#2563EB" fill="#3B82F6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Avg File Clearance Time (Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={[
                { dept: 'R&B Dept', days: 2.1 },
                { dept: 'Narmada Water', days: 3.4 },
                { dept: 'Urban Dev', days: 1.8 },
                { dept: 'GMB Maritime', days: 2.9 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="dept" type="category" tick={{ fontSize: 10 }} width={90} />
                <Tooltip />
                <Bar dataKey="days" fill="#0F766E" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocumentationView = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          Project Context Contract (PCC v3) Architecture Document
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          GovInfra Gujarat is the centralized Government e-Office and Infrastructure Lifecycle Portal designed for direct integration with backend REST API endpoints (`/api/v1`).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900">Locked Tech Stack Standards</h4>
            <p className="text-slate-600">• React 19 + TypeScript + Vite</p>
            <p className="text-slate-600">• Tailwind CSS + Lucide React</p>
            <p className="text-slate-600">• Recharts Visual Analytics</p>
            <p className="text-slate-600">• Leaflet OpenStreetMap GIS</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900">Supported Government Role Personas</h4>
            <p className="text-slate-600">• Government Officer / Executive Engineer</p>
            <p className="text-slate-600">• Quality Inspector / Finance Officer</p>
            <p className="text-slate-600">• Treasury Officer / Procurement Officer</p>
            <p className="text-slate-600">• L&T Infrastructure (Contractor)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeRole, setActiveRole] = useState('SUPER_ADMIN');
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [workflowFiles, setWorkflowFiles] = useState(INITIAL_WORKFLOW_FILES);
  const [inspections, setInspections] = useState(INITIAL_INSPECTIONS);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'RA Bill #04 Submitted', message: 'Patel Engineering submitted bill for Saurashtra Canal Link 4.', time: '10m ago', read: false },
    { id: 2, title: 'Quality Alert (NCR Issued)', message: 'NCR-2026-09 logged for Pier wall honeycombing.', time: '1h ago', read: false }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col antialiased">
      {/* Top Navigation Header */}
      <AppHeader
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        notifications={notifications}
        unreadCount={unreadCount}
        setNotifications={setNotifications}
      />

      {/* Main Content Area with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          activeRole={activeRole}
        />

        {/* Dynamic Workspace Container */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {currentTab === 'dashboard' && (
            <DashboardView
              activeRole={activeRole}
              projects={projects}
              workflowFiles={workflowFiles}
              inspections={inspections}
              setCurrentTab={setCurrentTab}
            />
          )}

          {currentTab === 'workflow' && (
            <WorkflowView
              workflowFiles={workflowFiles}
              setWorkflowFiles={setWorkflowFiles}
              activeRole={activeRole}
            />
          )}

          {currentTab === 'projects' && (
            <ProjectsView
              projects={projects}
              setProjects={setProjects}
            />
          )}

          {currentTab === 'measurements' && <MeasurementBookView />}
          {currentTab === 'billing' && <BillingView />}
          {currentTab === 'inspections' && <InspectionsView inspections={inspections} setInspections={setInspections} />}
          {currentTab === 'tenders' && <TendersView />}
          {currentTab === 'analytics' && <AnalyticsView />}
          {currentTab === 'documentation' && <DocumentationView />}
        </main>
      </div>
    </div>
  );
}
