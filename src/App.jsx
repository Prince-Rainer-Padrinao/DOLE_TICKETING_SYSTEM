import React, { useState, useEffect } from 'react';
import { 
  Building2, Users, FileText, CheckCircle, XCircle, 
  Clock, ShieldAlert, PlusCircle, MessageSquare, Calendar,
  LayoutDashboard, List, FileSignature, Shield, ChevronDown, ChevronRight,
  User, Check, X, ExternalLink, Mail, Key, LogOut, Trash2, ClipboardList, Edit, CheckSquare
} from 'lucide-react';
import { supabase } from './supabaseClient';

// --- INITIAL BLANK RFA DATA ---
const INITIAL_RFA_DATA = {
  firstName: '', middleName: '', lastName: '', extension: '', birthdate: '', mobileNoModal: '',
  filerType: 'Individual worker', companyNameRequesting: '', reqName: '', reqSex: '', reqBirthday: '', reqAge: '', reqRegion: '', reqProvince: '', reqCity: '', reqBarangay: '', reqStreet: '', reqAddress: '', reqTelNo: '', reqMobileNo: '', reqEmail: '', reqDateHired: '', reqEmploymentType: '', reqNatureOfWork: '', reqStatusEmployment: '', reqYearsService: '', reqAgencyEmployed: 'No',
  resCompanyNameHeader: '', resContactPerson: '', resPosition: '', resSex: '', resTelNo: '', resMobileNo: '', resEmail: '', resCompanyName: '', resAddress: '', resRegion: '', resProvince: '', resMunicipality: '', resBarangay: '', resStreet: '', resContactNo: '', resEmailCompany: '', resUnionized: 'Non-Unionized', resNatureOfBusiness: '', resMaleWorkers: '', resFemaleWorkers: '', resTotalEmployees: '',
  claimLastSalary: false, issuanceOfCert: false, narration: '', office: 'DOLE Regional Office', regionalOffice: 'DOLE-RO-III', satelliteOffice: 'Field Office-Bulacan'
};

const DOLE_SERVICES = [
  'SEnA', 'TUPAD', 'DILEEP', 'OSH Registration', 'General Inquiry',
  'CHSP', 'OSH', 'INSPECTION', 'LIVELIHOOD', 'GIP', 'SPES', 'RWA',
  'TRAINING', 'JOB FAIR PERMIT', 'LEES', 'TAV'
];

// --- LOGIN SCREEN COMPONENT ---
const LoginScreen = ({ onLogin, onGoogleLogin }) => {
  const [loginMode, setLoginMode] = useState('client'); 
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await onLogin(identifier, password, 'manual'); 
    if (error) setAuthError(error);
  };

  const handleGuestLogin = async () => {
    const guestEmail = `client_${Math.floor(Math.random() * 10000)}@guest.com`;
    const error = await onLogin(guestEmail, null, 'guest');
    if (error) setAuthError(error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4">
      <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl border border-slate-100 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto bg-blue-100 text-blue-800 w-16 h-16 flex items-center justify-center rounded-full mb-4">
            <Building2 size={32} />
          </div>
          <h1 className="text-3xl font-black text-blue-900 tracking-tight mb-2">DOLE Helpdesk</h1>
          <p className="text-slate-500 font-medium">Authentication Portal</p>
        </div>

        {/* Toggle Switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
          <button 
            type="button"
            onClick={() => { setLoginMode('client'); setAuthError(''); }} 
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${loginMode === 'client' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Client Portal
          </button>
          <button 
            type="button"
            onClick={() => { setLoginMode('user'); setAuthError(''); }} 
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${loginMode === 'user' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            User
          </button>
        </div>

        {authError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl mb-6 text-sm font-bold text-rose-600 text-center animate-in zoom-in-95">
            {authError}
          </div>
        )}

        {loginMode === 'user' ? (
          <div className="animate-in fade-in slide-in-from-bottom-2">
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Email Address or Username" 
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 font-medium"
                />
              </div>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700 font-medium"
                />
              </div>
              <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200 mt-2">
                Sign In to Dashboard
              </button>
            </form>

            <div className="relative flex items-center py-2 mb-6">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Or</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <button 
              onClick={onGoogleLogin} 
              type="button" 
              className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <button 
              onClick={handleGuestLogin} 
              type="button" 
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
            >
              Enter Client Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  
  const [tickets, setTickets] = useState([]);
  const [view, setView] = useState('dashboard');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [statusUpdateChoice, setStatusUpdateChoice] = useState('Ongoing');
  
  const [isListingsOpen, setIsListingsOpen] = useState(false);
  const [serviceFilter, setServiceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); 

  const [timeframe, setTimeframe] = useState('daily');

  const [rfaStep, setRfaStep] = useState(-1);
  const [rfaFormData, setRfaFormData] = useState(INITIAL_RFA_DATA);
  const [editingUser, setEditingUser] = useState(null);

  // Load App Data from Supabase and Handle Google Redirects
  useEffect(() => {
    const fetchDatabase = async () => {
      const { data: userData } = await supabase.from('dole_users').select('*');
      
      if (userData && userData.length > 0) {
        setRegisteredUsers(userData);
      } else {
        const defaultAdmin = { email: 'admin@dole.gov.ph', password: 'admin', role: 'admin', name: 'System Administrator' };
        await supabase.from('dole_users').insert([defaultAdmin]);
        setRegisteredUsers([defaultAdmin]);
      }

      const { data: ticketData } = await supabase.from('dole_tickets').select('*').order('created_at', { ascending: false });
      if (ticketData) {
        setTickets(ticketData);
      }
    };

    fetchDatabase();

    const initAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || (session && session.expires_at && session.expires_at < Math.floor(Date.now() / 1000))) {
        await supabase.auth.signOut();
        localStorage.clear();
        setCurrentUser(null);
      } else if (session) {
        await handleAuthSession(session);
      }
    };

    const handleAuthSession = async (session) => {
      window.history.replaceState({}, document.title, window.location.pathname);
      const userEmail = session.user.email.toLowerCase();
      const { data: dbUser } = await supabase.from('dole_users').select('*').eq('email', userEmail).maybeSingle();
      
      if (dbUser && (dbUser.role === 'admin' || dbUser.role === 'employee')) {
        setCurrentUser(dbUser);
        setView('dashboard');
      } else {
        await supabase.auth.signOut();
        localStorage.clear();
        setCurrentUser(null);
        window.location.href = window.location.origin;
        alert("Access Denied: This Google account is not registered as a System User.");
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) handleAuthSession(session);
      if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        setView('dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- REAL GOOGLE API LOGIN ---
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: window.location.origin,
        queryParams: { prompt: 'select_account' } 
      }
    });
    if (error) alert("Google Login Error: " + error.message);
  };

  // --- MANUAL AUTHENTICATION LOGIC ---
  const handleLogin = async (identifier, password, provider) => {
    await supabase.auth.signOut();
    localStorage.clear();

    const lowerIdentifier = identifier.toLowerCase();
    
    const user = registeredUsers.find(
      u => u.email.toLowerCase() === lowerIdentifier || 
           u.name.toLowerCase() === lowerIdentifier
    );

    if (provider === 'manual') {
      if (user) {
        if (user.password !== password) return "Invalid credentials.";
        if (user.role === 'client') return "Client accounts must use the Client Portal."; 
        
        setCurrentUser(user);
        setView('dashboard');
        return null;
      } else {
        return "Account not found. Access denied.";
      }
    } 
    else if (provider === 'guest') {
      const newUser = {
        email: lowerIdentifier,
        password: 'guest-account',
        role: 'client',
        name: `Guest (${identifier.split('_')[1].split('@')[0]})`
      };
      
      const { data, error } = await supabase.from('dole_users').insert([newUser]).select();
      
      if (error) return `Database Error: ${error.message}`;
      
      const createdUser = data[0];
      setRegisteredUsers([...registeredUsers, createdUser]);
      setCurrentUser(createdUser);
      setView('form');
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Supabase logout error:", e);
    } finally {
      localStorage.clear(); 
      setCurrentUser(null);
      window.location.href = window.location.origin; 
    }
  };

  // --- ADMIN MANAGEMENT LOGIC ---
  const handleAddUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const identifier = formData.get('email').toLowerCase().trim();
    
    if (registeredUsers.some(u => u.email === identifier || u.name.toLowerCase() === identifier)) {
      alert("This email or username is already registered.");
      return;
    }

    const newUser = {
      email: identifier, 
      password: formData.get('password'),
      role: formData.get('role'),
      name: formData.get('name')
    };

    const { data, error } = await supabase.from('dole_users').insert([newUser]).select();
    if (error) {
      alert("Error adding account: " + error.message);    
    } else {
      setRegisteredUsers([...registeredUsers, data[0]]);
      e.target.reset();
      alert("Account successfully registered!");
    }
  };

  const handleDeleteUser = async (id, email) => {
    if (email === currentUser.email) {
      alert("You cannot delete your own account while logged in.");
      return;
    }
    if (window.confirm(`Are you sure you want to revoke access for ${email}?`)) {
      const { error } = await supabase.from('dole_users').delete().eq('id', id);
      if (!error) {
        setRegisteredUsers(registeredUsers.filter(u => u.id !== id));
      }
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      email: formData.get('email').toLowerCase().trim(),
      password: formData.get('password'),
      role: formData.get('role'),
      name: formData.get('name')
    };

    const { error } = await supabase.from('dole_users').update(updatedUser).eq('id', editingUser.id);
    
    if (error) {
      alert("Error updating account: " + error.message);
    } else {
      setRegisteredUsers(registeredUsers.map(u => u.id === editingUser.id ? { ...u, ...updatedUser } : u));
      setEditingUser(null);
      alert("Account successfully updated!");
    }
  };
  
  // --- STANDARD TICKETING LOGIC ---
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const refNo = Math.floor(100000 + Math.random() * 900000).toString();

    const newTicket = {
      reference_no: `BUL-${refNo}`,
      client_name: formData.get('client_name'),
      contact_no: formData.get('contact_no'),
      address: formData.get('address'),
      company_name: formData.get('company_name'),
      service_type: formData.get('service_type'),
      subject: formData.get('subject'),
      description: formData.get('description'),
      status: 'Open',
      assigned_to: null,
      created_at: Date.now(),
      updates: []
    };

    const { data, error } = await supabase.from('dole_tickets').insert([newTicket]).select();
    if (!error && data) {
      setTickets([data[0], ...tickets]);
      setSelectedTicket(data[0]); 
      setView('client_success'); 
    }
  };

  const handleValidationAndAssignment = async (e, ticketId) => {
    e.preventDefault();
    if (currentUser.role !== 'admin') return;

    const formData = new FormData(e.target);
    const assignee = formData.get('assignee');
    const action = e.nativeEvent.submitter?.value || 'accept';
    
    let updatePayload = {};
    if (action === 'reject') {
      updatePayload = { status: 'Rejected' };
    } else {
      updatePayload = {
        status: assignee === 'later' ? 'Accepted - Pending Assignment' : 'Ongoing',
        assigned_to: assignee === 'later' ? null : assignee,
        date_assigned: assignee === 'later' ? null : Date.now(),
        assigned_by: assignee === 'later' ? null : currentUser.name
      };
    }

    const { error } = await supabase.from('dole_tickets').update(updatePayload).eq('id', ticketId);
    if (!error) {
      setTickets(tickets.map(t => t.id === ticketId ? { ...t, ...updatePayload } : t));
      setSelectedTicket(null);
      setView('dashboard');
    }
  };

  const handleUpdateTicket = async (e, ticket) => {
    e.preventDefault();
    
    const isAssignedUser = currentUser.id === ticket.assigned_to;
    const isAdmin = currentUser.role === 'admin';
    
    if (!isAssignedUser && !isAdmin) return;

    const formData = new FormData(e.target);
    const newStatus = formData.get('status_update');
    const scheduledDate = formData.get('scheduled_date');

    let actionText = formData.get('action_taken');
    if (newStatus === 'Pending' && scheduledDate) {
      actionText += ` (Scheduled for: ${new Date(scheduledDate).toLocaleDateString()})`;
    }

    const newUpdate = {
      action_taken: actionText,
      remarks: formData.get('remarks'),
      updated_by_name: currentUser.name,
      updated_at: Date.now()
    };

    const newUpdatesArray = [...(ticket.updates || []), newUpdate];

    const { error } = await supabase.from('dole_tickets').update({
      status: newStatus,
      updates: newUpdatesArray
    }).eq('id', ticket.id);

    if (!error) {
      setTickets(tickets.map(t => t.id === ticket.id ? { ...t, status: newStatus, updates: newUpdatesArray } : t));
      setSelectedTicket(null);
      setView('dashboard');
    }
  };

  const handleReopenTicket = async (ticketId, currentUpdates) => {
    if (currentUser.role !== 'admin') return;
    
    const newUpdate = {
      action_taken: "Admin Override: Ticket Reopened",
      remarks: "Status reverted from Resolved back to Ongoing for further action.",
      updated_by_name: currentUser.name,
      updated_at: Date.now()
    };
    const newUpdatesArray = [...(currentUpdates || []), newUpdate];

    const { error } = await supabase.from('dole_tickets').update({
      status: 'Ongoing',
      updates: newUpdatesArray
    }).eq('id', ticketId);

    if (!error) {
      setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'Ongoing', updates: newUpdatesArray } : t));
      setSelectedTicket(null);
      setView('dashboard');
    }
  };

  const handleReopenRejectedTicket = async (ticketId, currentUpdates) => {
    if (currentUser.role !== 'admin') return;
    
    const newUpdate = {
      action_taken: "Admin Override: Reverted Rejection",
      remarks: "Rejection undone. Ticket is back to Open status for validation and assignment.",
      updated_by_name: currentUser.name,
      updated_at: Date.now()
    };
    const newUpdatesArray = [...(currentUpdates || []), newUpdate];

    const { error } = await supabase.from('dole_tickets').update({
      status: 'Open',
      updates: newUpdatesArray
    }).eq('id', ticketId);

    if (!error) {
      setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'Open', updates: newUpdatesArray } : t));
      setSelectedTicket(null);
      setView('dashboard');
    }
  };

  // --- RFA LOGIC ---
  const handleRfaChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRfaFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextRfaStep = () => setRfaStep(prev => prev + 1);
  const prevRfaStep = () => setRfaStep(prev => prev - 1);

  const handleInitialProceed = () => {
    const fullName = `${rfaFormData.firstName} ${rfaFormData.middleName} ${rfaFormData.lastName} ${rfaFormData.extension}`.replace(/\s+/g, ' ').trim();
    
    let age = '';
    if (rfaFormData.birthdate) {
       const birthDateObj = new Date(rfaFormData.birthdate);
       const today = new Date();
       let calcAge = today.getFullYear() - birthDateObj.getFullYear();
       if (today.getMonth() < birthDateObj.getMonth() || (today.getMonth() === birthDateObj.getMonth() && today.getDate() < birthDateObj.getDate())) {
           calcAge--;
       }
       age = calcAge.toString();
    }

    setRfaFormData(prev => ({
      ...prev,
      reqName: fullName,
      reqBirthday: rfaFormData.birthdate,
      reqAge: age,
      reqMobileNo: rfaFormData.mobileNoModal
    }));
    
    setRfaStep(1);
  };

  const getStatusColor = (status) => {
    if (status === 'Open') return 'bg-red-100 text-red-800 border-red-200';
    if (status === 'Ongoing') return 'bg-slate-200 text-slate-800 border-slate-300';
    if (status === 'Accepted - Pending Assignment') return 'bg-blue-100 text-blue-800 border-blue-200';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (status === 'Resolved') return 'bg-green-100 text-green-800 border-green-200';
    if (status === 'Rejected') return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // --- RENDERS ---
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />;
  }

  const renderRfaModule = () => {
    if (rfaStep === -1) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50">
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center max-w-lg">
            <FileSignature size={48} className="text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Request for Assistance (RFA)</h2>
            <p className="text-gray-600 mb-6">
              Welcome to the DOLE ARMS module. If you need to file a formal request for assistance regarding labor issues, you can start the process here or visit the official portal.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setRfaStep(0)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors"
              >
                Submit a Request (Prototype)
              </button>
              
              <a 
                href="http://arms.dole.gov.ph/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Go to Official ARMS Website
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gray-50 text-sm font-sans pb-10 min-h-full">
        <header className="bg-white border-b shadow-sm p-4 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Filer Unique Identifier</span>
              <div className="flex items-center space-x-1 mb-1">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className={`h-8 bg-black ${i % 3 === 0 ? 'w-1' : i % 2 === 0 ? 'w-0.5' : 'w-1.5'}`}></div>
                ))}
              </div>
              <span className="text-[10px] text-gray-500 tracking-widest">6e0d9f4810c5588d1308c36f471a6715</span>
            </div>
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-blue-800 tracking-wide mt-2">DOLE ARMS</h1>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-blue-800 text-2xl font-bold mb-1">
                <User size={32} className="mr-2" fill="currentColor" />
                Individual Worker
              </div>
              <p className="text-red-600 font-semibold text-xs">* Denotes Required Field</p>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-4 bg-white shadow mt-4 rounded-md">
          {rfaStep > 0 && rfaStep < 6 && <Stepper currentStep={rfaStep} />}
          
          <div className="mt-6">
            {rfaStep === 0 && <InitialModal formData={rfaFormData} handleChange={handleRfaChange} onProceed={handleInitialProceed} onClose={() => setRfaStep(-1)} />}
            {rfaStep === 1 && <Step1RequestingParty formData={rfaFormData} handleChange={handleRfaChange} nextStep={nextRfaStep} />}
            {rfaStep === 2 && <Step2RespondingParty formData={rfaFormData} handleChange={handleRfaChange} nextStep={nextRfaStep} prevStep={prevRfaStep} />}
            {rfaStep === 3 && <Step3Claims formData={rfaFormData} handleChange={handleRfaChange} nextStep={nextRfaStep} prevStep={prevRfaStep} />}
            {rfaStep === 4 && <Step4PrayedRelief formData={rfaFormData} handleChange={handleRfaChange} nextStep={nextRfaStep} prevStep={prevRfaStep} />}
            {rfaStep === 5 && <Step5Confirm formData={rfaFormData} nextStep={() => setRfaStep(6)} prevStep={prevRfaStep} />}
            {rfaStep === 6 && (
              <OtpModal 
                onVerify={() => { 
                  setRfaStep(-1);
                  setRfaFormData(INITIAL_RFA_DATA);
                }} 
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderClientForm = () => {
    const handleAutoFill = () => {
      const form = document.getElementById('client-inquiry-form');
      if (!form) return;
      form.client_name.value = 'Juan Dela Cruz';
      form.contact_no.value = '0912 345 6789';
      form.address.value = 'Malolos, Bulacan';
      form.company_name.value = 'Acme Corp';
      form.service_type.value = 'SEnA';
      form.subject.value = 'Delayed Final Pay';
      form.description.value = 'I resigned 2 months ago but have not received my final pay despite multiple follow-ups with HR.';
    };

    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-slate-200 mt-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b pb-2 flex items-center gap-2">
          <FileText /> Step 1: Submit Inquiry
        </h2>
        <form id="client-inquiry-form" onSubmit={handleClientSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input name="client_name" required type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input name="contact_no" required type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address (Bulacan)</label>
              <input name="address" required type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company/Employer Name (If applicable)</label>
              <input name="company_name" type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select name="service_type" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500">
                {DOLE_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input name="subject" required type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
              <textarea name="description" required rows="4" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
          </div>
          <div className="flex justify-between items-center border-t pt-4 mt-6">
            <button type="button" onClick={handleAutoFill} className="text-sm bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-100 transition flex items-center gap-1 font-medium">
              ✨ Auto Fill (Test)
            </button>
            <div className="flex gap-3">
              <button type="button" onClick={currentUser?.role === 'client' ? handleLogout : () => setView('dashboard')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium shadow-sm">Submit Inquiry</button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  const renderClientSuccess = () => {
    if (!selectedTicket) return null;

    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-slate-200 mt-6 animate-in fade-in">
        <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-6">
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <CheckCircle size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-700">Inquiry Submitted Successfully!</h2>
            <p className="text-slate-500 text-sm mt-1">Please take a photo or screenshot of this page for your records. Your reference number is <strong>{selectedTicket.reference_no}</strong>.</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-slate-700 text-lg uppercase tracking-wider text-sm">Submitted Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100 text-sm">
            <div><span className="text-slate-400 font-bold block mb-1 text-xs uppercase">Full Name</span><strong className="text-slate-800 text-base">{selectedTicket.client_name}</strong></div>
            <div><span className="text-slate-400 font-bold block mb-1 text-xs uppercase">Contact Number</span><strong className="text-slate-800 text-base">{selectedTicket.contact_no}</strong></div>
            <div className="md:col-span-2"><span className="text-slate-400 font-bold block mb-1 text-xs uppercase">Address</span><strong className="text-slate-800 text-base">{selectedTicket.address}</strong></div>
            <div><span className="text-slate-400 font-bold block mb-1 text-xs uppercase">Company/Employer</span><strong className="text-slate-800 text-base">{selectedTicket.company_name || 'N/A'}</strong></div>
            <div><span className="text-slate-400 font-bold block mb-1 text-xs uppercase">Service Type</span><strong className="text-slate-800 text-base">{selectedTicket.service_type}</strong></div>
            <div className="md:col-span-2"><span className="text-slate-400 font-bold block mb-1 text-xs uppercase">Subject</span><strong className="text-slate-800 text-base">{selectedTicket.subject}</strong></div>
            <div className="md:col-span-2">
              <span className="text-slate-400 font-bold block mb-2 text-xs uppercase">Detailed Description</span>
              <p className="text-slate-800 whitespace-pre-wrap bg-white p-4 rounded-lg border border-slate-200">{selectedTicket.description}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button 
            onClick={handleLogout} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-md shadow-blue-200 transition-all flex items-center gap-2"
          >
            <Check size={18} /> Done
          </button>
        </div>
      </div>
    );
  };

  const renderLeesModule = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50 animate-in fade-in">
        <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center max-w-lg">
          <FileText size={48} className="text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Labor & Employment Education Services (LEES)</h2>
          <p className="text-gray-600 mb-6">
            Welcome to the LEES module. Please proceed to the official portal to fill out your seminar evaluation form.
          </p>
          <div className="flex flex-col gap-3">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSecJ18BcQiXPAXCtZdCzlnPIzBFKmnkjcjrE9SmsK9vjSP4Jw/viewform?pli=1&pli=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              Open Seminar Evaluation Form <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboardStats = () => {
    const now = new Date();
    let startTime = 0;

    if (timeframe === 'daily') {
      startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); 
    } else if (timeframe === 'weekly') {
      const firstDay = now.getDate() - now.getDay();
      startTime = new Date(now.getFullYear(), now.getMonth(), firstDay).getTime(); 
    } else if (timeframe === 'monthly') {
      startTime = new Date(now.getFullYear(), now.getMonth(), 1).getTime(); 
    }

    const resolvedCounts = {};
    DOLE_SERVICES.forEach(s => resolvedCounts[s] = 0); 

    tickets.forEach(ticket => {
      const actionTime = ticket.updates && ticket.updates.length > 0 
        ? ticket.updates[ticket.updates.length - 1].updated_at 
        : ticket.created_at;

      if (ticket.status === 'Resolved' && actionTime >= startTime) {
        if (resolvedCounts[ticket.service_type] !== undefined) {
          resolvedCounts[ticket.service_type]++;
        }
      }
    });

    const palette = [
      'bg-slate-100 text-slate-800 border-slate-200', 'bg-stone-100 text-stone-800 border-stone-200', 
      'bg-zinc-100 text-zinc-800 border-zinc-200', 'bg-blue-50 text-blue-900 border-blue-200', 
      'bg-sky-50 text-sky-900 border-sky-200', 'bg-gray-100 text-gray-800 border-gray-200'
    ];

    return (
      <div className="max-w-[95%] mx-auto mt-6 animate-in fade-in">
        <div className="flex justify-between items-center mb-8 bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <LayoutDashboard size={24} className="text-blue-600" /> System Analytics
          </h2>
          <div className="flex items-center gap-3">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Filter By:</label>
            <select 
              value={timeframe} 
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="daily">Daily Resolved</option>
              <option value="weekly">Weekly Resolved</option>
              <option value="monthly">Monthly Resolved</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {DOLE_SERVICES.map((service, index) => {
            const count = resolvedCounts[service];
            const colorClass = palette[index % palette.length];
            return (
              <div key={service} className={`aspect-square rounded-2xl border shadow-sm flex flex-col items-center justify-center p-4 transition-transform hover:-translate-y-1 ${colorClass}`}>
                <span className="text-5xl font-black mb-2">{count}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-center opacity-80">{service}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderValidationTable = () => {
    if (currentUser.role !== 'admin') {
      return (
        <div className="max-w-2xl mx-auto mt-16 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-rose-200 text-center">
            <div className="w-20 h-20 bg-rose-50 text-rose-600 flex items-center justify-center rounded-full mx-auto mb-6">
              <ShieldAlert size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Admin Access Required</h2>
            <p className="text-slate-500 font-medium mb-8">
              The ticket validation board is restricted to System Administrators only.
            </p>
            <button 
              onClick={() => { setView('dashboard'); setServiceFilter('All'); }}
              className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors shadow-sm"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      );
    }

    const validationStatuses = ['Open', 'Rejected'];
    let displayTickets = tickets.filter(t => validationStatuses.includes(t.status));
    if (serviceFilter !== 'All') {
      displayTickets = displayTickets.filter(t => t.service_type === serviceFilter);
    }
    if (statusFilter !== 'All') {
      displayTickets = displayTickets.filter(t => t.status === statusFilter);
    }

    return (
      <div className="max-w-[95%] mx-auto mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 shrink-0">
            Pending Validations
          </h2>
          
          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 text-sm border border-slate-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select 
              value={serviceFilter} 
              onChange={(e) => setServiceFilter(e.target.value)}
              className="p-2 text-sm border border-slate-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Services</option>
              {DOLE_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <button 
              onClick={() => setView('form')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-sm shrink-0"
            >
              <PlusCircle size={18} /> New Inquiry
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b text-sm">
                  <th className="p-3 font-medium">Ref No.</th>
                  <th className="p-3 font-medium">Client Name</th>
                  <th className="p-3 font-medium">Subject</th>
                  <th className="p-3 font-medium">Service</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Date Filled</th>
                  <th className="p-3 font-medium">Mobile No.</th>
                  <th className="p-3 font-medium">Assigned To</th>
                  <th className="p-3 font-medium">Date Assigned</th>
                  <th className="p-3 font-medium">Assigned By</th>
                  <th className="p-3 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayTickets.length === 0 ? (
                  <tr><td colSpan="11" className="p-8 text-center text-gray-500">No tickets match your filters.</td></tr>
                ) : (
                  displayTickets.map(ticket => (
                    <tr key={ticket.id} className="border-b hover:bg-slate-50 transition-colors text-sm">
                      <td className="p-3 font-medium text-gray-800">{ticket.reference_no || 'N/A'}</td>
                      <td className="p-3 font-medium text-gray-800">{ticket.client_name}</td>
                      <td className="p-3 font-medium text-blue-900 truncate max-w-[150px]" title={ticket.subject}>{ticket.subject}</td>
                      <td className="p-3"><span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded text-xs">{ticket.service_type}</span></td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{new Date(ticket.created_at).toLocaleDateString()}</td>
                      <td className="p-3 text-gray-600">{ticket.contact_no}</td>
                      <td className="p-3 text-gray-600">
                        {ticket.assigned_to ? registeredUsers.find(u => u.id === ticket.assigned_to)?.name : 'Unassigned'}
                      </td>
                      <td className="p-3 text-gray-600">
                        {ticket.date_assigned ? new Date(ticket.date_assigned).toLocaleDateString() : '-'}
                      </td>
                      <td className="p-3 text-gray-600">{ticket.assigned_by || '-'}</td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-1.5 items-center">
                          <button 
                            onClick={() => { setSelectedTicket(ticket); setStatusUpdateChoice('Ongoing'); setView('ticket_detail'); }}
                            className="relative bg-[#ffc107] text-black px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-500 transition-colors shadow-sm"
                          >
                            {ticket.updates && ticket.updates.length > 0 && (
                              <span className="absolute -top-1.5 -left-1.5 bg-[#dc3545] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm leading-none flex items-center justify-center min-w-[16px] h-[16px]">
                                {ticket.updates.length}
                              </span>
                            )}
                            Notes
                          </button>
                          <button 
                            onClick={() => { setSelectedTicket(ticket); setStatusUpdateChoice('Ongoing'); setView('ticket_detail'); }}
                            className="bg-[#198754] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#157347] transition-colors shadow-sm"
                          >
                            Validate
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderValidatedTasks = () => {
    const validStatuses = ['Ongoing', 'Pending', 'Resolved', 'Accepted - Pending Assignment'];
    let displayTickets = tickets.filter(t => validStatuses.includes(t.status));

    if (serviceFilter !== 'All') {
      displayTickets = displayTickets.filter(t => t.service_type === serviceFilter);
    }
    if (statusFilter !== 'All') {
      displayTickets = displayTickets.filter(t => t.status === statusFilter);
    }

    return (
      <div className="max-w-[95%] mx-auto mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 shrink-0">
            Validated Tasks
          </h2>
          
          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 text-sm border border-slate-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Validated</option>
              <option value="Accepted - Pending Assignment">Pending Assignment</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select 
              value={serviceFilter} 
              onChange={(e) => setServiceFilter(e.target.value)}
              className="p-2 text-sm border border-slate-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Services</option>
              {DOLE_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b text-sm">
                  <th className="p-3 font-medium">Ref No.</th>
                  <th className="p-3 font-medium">Client Name</th>
                  <th className="p-3 font-medium">Subject</th>
                  <th className="p-3 font-medium">Service</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Assigned To</th>
                  <th className="p-3 font-medium">Date Assigned</th>
                  <th className="p-3 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayTickets.length === 0 ? (
                  <tr><td colSpan="8" className="p-8 text-center text-gray-500">No validated tasks found.</td></tr>
                ) : (
                  displayTickets.map(ticket => (
                    <tr key={ticket.id} className="border-b hover:bg-slate-50 transition-colors text-sm">
                      <td className="p-3 font-medium text-gray-800">{ticket.reference_no || 'N/A'}</td>
                      <td className="p-3 font-medium text-gray-800">{ticket.client_name}</td>
                      <td className="p-3 font-medium text-blue-900 truncate max-w-[200px]" title={ticket.subject}>{ticket.subject}</td>
                      <td className="p-3"><span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded text-xs">{ticket.service_type}</span></td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">
                        {ticket.assigned_to ? registeredUsers.find(u => u.id === ticket.assigned_to)?.name : 'Unassigned'}
                      </td>
                      <td className="p-3 text-gray-600">
                        {ticket.date_assigned ? new Date(ticket.date_assigned).toLocaleDateString() : '-'}
                      </td>
                      <td className="p-3 text-center">
                        {currentUser.role === 'admin' ? (
                          <div className="flex justify-center gap-1.5 items-center">
                            <button 
                              onClick={() => { setSelectedTicket(ticket); setStatusUpdateChoice(ticket.status === 'Open' ? 'Ongoing' : ticket.status); setView('ticket_detail'); }}
                              className="relative bg-[#ffc107] text-black px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-500 transition-colors shadow-sm"
                            >
                              {ticket.updates && ticket.updates.length > 0 && (
                                <span className="absolute -top-1.5 -left-1.5 bg-[#dc3545] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm leading-none flex items-center justify-center min-w-[16px] h-[16px]">
                                  {ticket.updates.length}
                                </span>
                              )}
                              Edit / Notes
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => { setSelectedTicket(ticket); setView('ticket_detail'); }}
                            className="bg-slate-200 text-slate-800 px-4 py-1 rounded-full text-xs font-medium hover:bg-slate-300 transition-colors shadow-sm"
                          >
                            View Details
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderEmployeeTasks = () => {
    let displayTickets = tickets.filter(t => t.assigned_to === currentUser.id);

    if (serviceFilter !== 'All') {
      displayTickets = displayTickets.filter(t => t.service_type === serviceFilter);
    }
    if (statusFilter !== 'All') {
      displayTickets = displayTickets.filter(t => t.status === statusFilter);
    }

    return (
      <div className="max-w-[95%] mx-auto mt-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 shrink-0">
            My Assigned Tasks
          </h2>
          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 text-sm border border-slate-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
            <select 
              value={serviceFilter} 
              onChange={(e) => setServiceFilter(e.target.value)}
              className="p-2 text-sm border border-slate-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Services</option>
              {DOLE_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b text-sm">
                  <th className="p-3 font-medium">Ref No.</th>
                  <th className="p-3 font-medium">Client Name</th>
                  <th className="p-3 font-medium">Subject</th>
                  <th className="p-3 font-medium">Service</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Date Assigned</th>
                  <th className="p-3 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayTickets.length === 0 ? (
                  <tr><td colSpan="7" className="p-8 text-center text-gray-500">No tasks assigned to you currently.</td></tr>
                ) : (
                  displayTickets.map(ticket => (
                    <tr key={ticket.id} className="border-b hover:bg-slate-50 transition-colors text-sm">
                      <td className="p-3 font-medium text-gray-800">{ticket.reference_no || 'N/A'}</td>
                      <td className="p-3 font-medium text-gray-800">{ticket.client_name}</td>
                      <td className="p-3 font-medium text-blue-900 truncate max-w-[200px]" title={ticket.subject}>{ticket.subject}</td>
                      <td className="p-3"><span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-1 rounded text-xs">{ticket.service_type}</span></td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">
                        {ticket.date_assigned ? new Date(ticket.date_assigned).toLocaleDateString() : '-'}
                      </td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => { setSelectedTicket(ticket); setStatusUpdateChoice(ticket.status === 'Open' ? 'Ongoing' : ticket.status); setView('ticket_detail'); }}
                          className="bg-[#198754] text-white px-4 py-1 rounded-full text-xs font-medium hover:bg-[#157347] transition-colors shadow-sm"
                        >
                          View / Update
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderTicketDetail = () => {
    if (!selectedTicket) return null;

    const isAssigned = currentUser.id === selectedTicket.assigned_to;
    const isAdmin = currentUser.role === 'admin';
    const canEdit = isAssigned || isAdmin;

    return (
      <div className="max-w-5xl mx-auto mt-6 px-4">
        <button onClick={() => setView('dashboard')} className="mb-4 text-blue-600 hover:underline flex items-center gap-1 text-sm">
          &larr; Back to Dashboard
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedTicket.subject}</h2>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <Users size={14}/> {selectedTicket.client_name} | <Clock size={14}/> {new Date(selectedTicket.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {selectedTicket.service_type}
                </span>
              </div>
              
              <div className="prose max-w-none text-gray-700 bg-slate-50 p-4 rounded mt-4 text-sm border border-slate-100">
                <strong>Description:</strong><br/>
                {selectedTicket.description}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm bg-gray-50 p-4 rounded border border-slate-100">
                <div><span className="text-gray-500">Contact:</span> {selectedTicket.contact_no}</div>
                <div><span className="text-gray-500">Address:</span> {selectedTicket.address}</div>
                <div className="col-span-2"><span className="text-gray-500">Company:</span> {selectedTicket.company_name || 'N/A'}</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><MessageSquare size={18}/> Action History</h3>
              {(!selectedTicket.updates || selectedTicket.updates.length === 0) ? (
                <p className="text-gray-500 text-sm italic">No actions recorded yet.</p>
              ) : (
                <div className="space-y-4">
                  {selectedTicket.updates.map((update, idx) => (
                    <div key={idx} className={`border-l-4 pl-4 py-1 ${update.action_taken.includes('Admin Override') ? 'border-purple-500 bg-purple-50 p-2 rounded-r' : 'border-blue-500'}`}>
                      <div className="flex justify-between">
                        <span className="font-semibold text-sm">{update.updated_by_name}</span>
                        <span className="text-xs text-gray-500">{new Date(update.updated_at).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-800 mt-1"><strong>Action:</strong> {update.action_taken}</p>
                      <p className="text-sm text-gray-600 mt-1 italic">"{update.remarks}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {isAdmin && (selectedTicket.status === 'Open' || selectedTicket.status === 'Accepted - Pending Assignment') && (
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 text-sm border-b pb-2 flex items-center gap-2">
                  <CheckCircle size={16} className="text-blue-600"/> Validate & Assign
                </h3>
                <form onSubmit={(e) => handleValidationAndAssignment(e, selectedTicket.id)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Assign To Employee</label>
                    <select name="assignee" required className="w-full p-2 text-sm border rounded bg-gray-50">
                      {selectedTicket.status === 'Open' && <option value="later">-- Assign Later (Pending) --</option>}
                      {registeredUsers.filter(u => u.role === 'employee').map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <button type="submit" name="action" value="accept" className="w-full bg-green-600 text-white py-2 rounded shadow hover:bg-green-700 text-sm font-medium flex justify-center items-center gap-2">
                      <CheckCircle size={16}/> {selectedTicket.status === 'Open' ? 'Accept & Assign' : 'Confirm Assignment'}
                    </button>
                    {selectedTicket.status === 'Open' && (
                      <button type="submit" name="action" value="reject" className="w-full bg-red-100 text-red-700 py-2 rounded hover:bg-red-200 flex justify-center items-center gap-2 text-sm font-medium">
                        <XCircle size={16}/> Reject Inquiry
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {(selectedTicket.status === 'Ongoing' || selectedTicket.status === 'Pending') && (
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 text-sm border-b pb-2">Step 4: Update Status</h3>
                
                {canEdit ? (
                  <form onSubmit={(e) => handleUpdateTicket(e, selectedTicket)} className="space-y-4 mt-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Action Taken</label>
                      <input name="action_taken" required type="text" placeholder="e.g. Contacted employer..." className="w-full p-2 text-sm border rounded" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Internal Remarks</label>
                      <textarea name="remarks" required rows="2" className="w-full p-2 text-sm border rounded"></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">New Status</label>
                      <select 
                        name="status_update" 
                        className="w-full p-2 text-sm border rounded"
                        value={statusUpdateChoice}
                        onChange={(e) => setStatusUpdateChoice(e.target.value)}
                      >
                        <option value="Ongoing">Ongoing (Still Processing)</option>
                        <option value="Pending">Pending (Scheduled Action)</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                    
                    {statusUpdateChoice === 'Pending' && (
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                        <label className="block text-xs font-medium text-yellow-800 mb-1 flex items-center gap-1">
                          <Calendar size={12}/> Select Scheduled Date
                        </label>
                        <input name="scheduled_date" type="date" required className="w-full p-2 text-sm border rounded" />
                      </div>
                    )}

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700 text-sm font-medium">
                      Submit Update
                    </button>
                  </form>
                ) : (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200 flex items-start gap-2">
                    <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                    <p><strong>Locked:</strong> You are not authorized to modify this task. Only <strong>{registeredUsers.find(u => u.id === selectedTicket.assigned_to)?.name}</strong> can update this.</p>
                  </div>
                )}
              </div>
            )}

            {selectedTicket.status === 'Resolved' && (
              <div className="bg-green-50 p-5 rounded-lg border border-green-200 shadow-sm">
                <h3 className="font-bold text-green-800 mb-2 text-sm border-b border-green-200 pb-2 flex items-center gap-2">
                  <CheckCircle size={16} /> Ticket Resolved
                </h3>
                <p className="text-sm text-green-700 mb-4">This inquiry has been successfully resolved.</p>
                
                {isAdmin && (
                  <button 
                    onClick={() => handleReopenTicket(selectedTicket.id, selectedTicket.updates)}
                    className="w-full bg-slate-800 text-white py-2 rounded shadow hover:bg-slate-700 text-sm font-medium flex justify-center items-center gap-2 transition"
                  >
                    <ShieldAlert size={14}/> Reopen Ticket (Admin Override)
                  </button>
                )}
              </div>
            )}

            {selectedTicket.status === 'Rejected' && (
              <div className="bg-red-50 p-5 rounded-lg border border-red-200 shadow-sm">
                <h3 className="font-bold text-red-800 mb-2 text-sm border-b border-red-200 pb-2 flex items-center gap-2">
                  <XCircle size={16} /> Ticket Rejected
                </h3>
                <p className="text-sm text-red-700 mb-4">This inquiry was rejected and closed.</p>
                
                {isAdmin && (
                  <button 
                    onClick={() => handleReopenRejectedTicket(selectedTicket.id, selectedTicket.updates)}
                    className="w-full bg-slate-800 text-white py-2 rounded shadow hover:bg-slate-700 text-sm font-medium flex justify-center items-center gap-2 transition"
                  >
                    <ShieldAlert size={14}/> Undo Rejection (Admin Override)
                  </button>
                )}
              </div>
            )}

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
              <span className="text-gray-500 block mb-1">Currently Assigned To:</span>
              <span className="font-bold text-gray-800">
                {selectedTicket.assigned_to ? registeredUsers.find(u => u.id === selectedTicket.assigned_to)?.name : 'Pending Assignment'}
              </span>
            </div>

          </div>
        </div>
      </div>
    );
  };

  const renderAdministration = () => {
    return (
      <div className="max-w-5xl mx-auto mt-6 space-y-6 animate-in fade-in pb-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-black text-blue-900 mb-2">Manage System Accounts</h3>
          <p className="text-slate-500 font-medium mb-8">Add or remove Administrator and Employee accounts that are authorized to access the DOLE Helpdesk backend.</p>
          
          <form onSubmit={handleAddUser} className="flex flex-col md:flex-row gap-4 items-end mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-sm font-bold text-slate-600 ml-1">Email or Username</label>
              <input name="email" type="text" required placeholder="name@dole.gov.ph or admin123" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700" />
            </div>
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-sm font-bold text-slate-600 ml-1">Full Name</label>
              <input name="name" type="text" required placeholder="Juan Dela Cruz" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700" />
            </div>
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-sm font-bold text-slate-600 ml-1">Role</label>
              <select name="role" required className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700">
                <option value="employee">Employee</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-sm font-bold text-slate-600 ml-1">Temporary Password</label>
              <input name="password" type="text" required placeholder="Temporary pass" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700" />
            </div>
            <button type="submit" className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-sm">
              <PlusCircle size={18} /> Register Account
            </button>
          </form>

          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider">
                  <th className="p-5 font-bold">Name & Email</th>
                  <th className="p-5 font-bold">Role</th>
                  <th className="p-5 font-bold">Password</th>
                  <th className="p-5 font-bold text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody>
                {registeredUsers.filter(u => u.role !== 'client').map(user => (
                  <tr key={user.id} className="border-b border-slate-50 hover:bg-blue-50/50 transition-colors">
                    <td className="p-5">
                      <p className="font-bold text-slate-800">{user.name}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-5 text-slate-500 text-sm">{user.password}</td>
                    <td className="p-5 text-center flex justify-center gap-2">
                      <button 
                        onClick={() => setEditingUser(user)} 
                        className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors" 
                        title="Edit Details"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id, user.email)} 
                        className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors" 
                        title="Revoke Access"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EDIT USER MODAL */}
          {editingUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
                <div className="border-b px-6 py-4 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-lg text-slate-800">Edit User Account</h3>
                  <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
                </div>
                <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-bold text-slate-600">Email or Username</label>
                    <input name="email" type="text" required defaultValue={editingUser.email} className="w-full px-4 py-2 mt-1 bg-white border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-600">Full Name</label>
                    <input name="name" type="text" required defaultValue={editingUser.name} className="w-full px-4 py-2 mt-1 bg-white border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-600">Role</label>
                    <select name="role" required defaultValue={editingUser.role} className="w-full px-4 py-2 mt-1 bg-white border border-slate-200 rounded-xl">
                      <option value="employee">Employee</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-600">Password</label>
                    <input name="password" type="text" required defaultValue={editingUser.password} className="w-full px-4 py-2 mt-1 bg-white border border-slate-200 rounded-xl" />
                  </div>
                  <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={() => setEditingUser(null)} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-sm hover:bg-blue-700">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    if (currentUser.role === 'client') return null;

    return (
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col min-h-screen shrink-0">
        <div className="p-5 flex items-center gap-3 text-white font-bold text-lg border-b border-slate-700">
          <Building2 size={24} className="text-blue-400" />
          DOLE Bulacan
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-3 overflow-y-auto">
          <button 
            onClick={() => { setView('dashboard'); setServiceFilter('All'); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${view === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          {/* Validated Tasks Tab for Admins & Employees */}
          {(currentUser.role === 'admin' || currentUser.role === 'employee') && (
            <button 
              onClick={() => { setView('validated_tasks'); setServiceFilter('All'); setStatusFilter('All'); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${view === 'validated_tasks' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <CheckSquare size={18} /> Validated Tasks
            </button>
          )}

          {/* New My Tasks Tab for Employees */}
          {currentUser.role === 'employee' && (
            <button 
              onClick={() => { setView('tasks'); setServiceFilter('All'); setStatusFilter('All'); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${view === 'tasks' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <ClipboardList size={18} /> My Tasks
            </button>
          )}

          {/* For Validation visible for Admins */}
          {currentUser.role === 'admin' && (
            <button 
              onClick={() => { setView('validation'); setServiceFilter('All'); setStatusFilter('All'); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${view === 'validation' && serviceFilter === 'All' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <CheckCircle size={18} /> For Validation
            </button>
          )}

          {/* Listings Dropdown */}
          <div>
            <button 
              onClick={() => setIsListingsOpen(!isListingsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-slate-800 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <List size={18} /> Listings
              </div>
              {isListingsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {isListingsOpen && (
              <div className="ml-7 mt-1 flex flex-col gap-1 border-l border-slate-700 pl-2">
                {DOLE_SERVICES.map(service => {
                  if (service === 'LEES') {
                    return (
                      <button 
                        key={service}
                        onClick={() => { setView('lees_portal'); setServiceFilter(service); }}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${view === 'lees_portal' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                      >
                        {service}
                      </button>
                    );
                  }
                  
                  return (
                    <button 
                      key={service}
                      onClick={() => { setView('validation'); setServiceFilter(service); setStatusFilter('All'); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${serviceFilter === service && view === 'validation' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button 
            onClick={() => { setView('rfa'); setRfaStep(-1); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${view === 'rfa' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <FileSignature size={18} /> RFA
          </button>
        </nav>

        {currentUser.role === 'admin' && (
          <div className="p-3 border-t border-slate-700 mt-auto">
            <button 
              onClick={() => setView('administration')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors text-sm ${view === 'administration' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              <Shield size={18} /> Administration
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {renderSidebar()}
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP HEADER STATUS BAR */}
        <div className="bg-slate-800 text-white p-3 flex justify-between items-center text-sm shrink-0 shadow-md z-20">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-yellow-400" />
            <span className="font-semibold text-yellow-400">PROTOTYPE MODE: Test Features</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300 hidden sm:inline">
              Logged in as: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})
            </span>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-bold bg-slate-700 px-3 py-1 rounded transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
        
        {currentUser.role === 'client' && view !== 'rfa' && (
          <header className="bg-blue-900 text-white p-4 shadow-md shrink-0">
            <div className="max-w-6xl mx-auto flex items-center gap-3">
              <Building2 size={28} />
              <div>
                <h1 className="text-xl font-bold leading-tight">DOLE Bulacan Helpdesk</h1>
                <p className="text-blue-200 text-xs">Provincial Field Office • Inquiry Routing System</p>
              </div>
            </div>
          </header>
        )}

        <main className="flex-1 overflow-y-auto">
          {view === 'form' && <div className="pb-12">{renderClientForm()}</div>}
          {view === 'client_success' && <div className="pb-12">{renderClientSuccess()}</div>}
          
          {/* UPDATED ROUTES HERE */}
          {view === 'dashboard' && <div className="pb-12">{renderDashboardStats()}</div>}
          {view === 'validation' && <div className="pb-12">{renderValidationTable()}</div>}
          {view === 'tasks' && <div className="pb-12">{renderEmployeeTasks()}</div>}
          {view === 'validated_tasks' && <div className="pb-12">{renderValidatedTasks()}</div>}
          
          {view === 'ticket_detail' && <div className="pb-12">{renderTicketDetail()}</div>}
          {view === 'administration' && renderAdministration()}
          {view === 'rfa' && renderRfaModule()}
          {view === 'lees_portal' && renderLeesModule()}
        </main>
      </div>
    </div>
  );
}

// --- RFA SUB-COMPONENTS ---

function Stepper({ currentStep }) {
  const steps = [
    { num: 1, label: 'Requesting Party' },
    { num: 2, label: 'Responding Party' },
    { num: 3, label: 'Claims /Issues' },
    { num: 4, label: 'Prayed Relief' },
    { num: 5, label: 'Confirm' }
  ];

  return (
    <div className="flex items-center justify-between w-full relative pt-4 pb-8">
      <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
      {steps.map((step, index) => {
        const isActive = currentStep === step.num;
        const isCompleted = currentStep > step.num;
        
        let colorClass = 'bg-yellow-400 text-white';
        let lineColor = 'bg-yellow-400';
        if (isCompleted || isActive) {
          colorClass = 'bg-green-600 text-white';
          lineColor = 'bg-green-600';
        }

        return (
          <div key={step.num} className="flex flex-col items-center relative z-0 flex-1">
             {index !== 0 && (
              <div className={`absolute top-4 right-[50%] w-full h-0.5 ${isCompleted || isActive ? 'bg-green-600' : 'bg-yellow-400'} -z-10`}></div>
            )}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm ${colorClass}`}>
              {isCompleted ? <Check size={16} /> : step.num}
            </div>
            <span className="text-xs mt-2 text-gray-700 absolute -bottom-6 w-32 text-center">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function InitialModal({ formData, handleChange, onProceed, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="bg-blue-900 text-white px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-bold">Submit a Request for Assistance</h2>
          <button onClick={onClose} className="text-white hover:text-gray-300"><X size={20} /></button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Middle Name</label>
              <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Extension <span className="text-blue-500 text-[10px]">(if applicable)</span></label>
              <input type="text" name="extension" value={formData.extension} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Birthdate</label>
              <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Mobile No</label>
              <input type="text" name="mobileNoModal" value={formData.mobileNoModal} onChange={handleChange} className="w-full border rounded p-2 bg-blue-50 border-blue-200" />
            </div>
          </div>
          
          <div className="space-y-2 mb-8">
            <label className="flex items-center text-sm text-blue-700">
              <input type="checkbox" className="mr-2 rounded" defaultChecked />
              I have read the <span className="underline ml-1 cursor-pointer">Privacy Policy.</span>
            </label>
            <label className="flex items-center text-sm text-blue-700">
              <input type="checkbox" className="mr-2 rounded" defaultChecked />
              I accept the <span className="underline ml-1 cursor-pointer">Terms of Service.</span>
            </label>
          </div>

          <div className="flex flex-col md:flex-row justify-between md:items-center text-xs text-gray-500 gap-4">
            <span>2024 © DOLE Assistance for Request Management System (DOLE ARMS)</span>
            <div className="space-x-2 flex">
              <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Close</button>
              <button onClick={onProceed} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium shadow">Proceed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1RequestingParty({ formData, handleChange, nextStep }) {
  const radioOptions = ['Individual worker', 'Group of workers', 'Union', 'Employer', 'Kasambahay', 'OFW'];
  
  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <p className="mb-2 text-sm">Choose if you are:</p>
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          {radioOptions.map(opt => (
            <label key={opt} className="flex items-center cursor-pointer">
              <input 
                type="radio" 
                name="filerType" 
                value={opt} 
                checked={formData.filerType === opt}
                onChange={handleChange}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="border border-blue-200 rounded p-4">
        <label className="block text-sm text-blue-800 font-semibold mb-2">Company Name <span className="italic font-normal">(Pangalan ng kompanya na pinapasukan )</span><span className="text-red-500">*</span></label>
        <input type="text" className="w-full border rounded p-2" name="companyNameRequesting" value={formData.companyNameRequesting} onChange={handleChange} />
      </div>

      <div className="bg-yellow-50 rounded border border-yellow-100 overflow-hidden">
        <div className="bg-yellow-100 p-2 border-b border-yellow-200 flex items-center font-bold text-gray-800">
          <User size={18} className="mr-2" /> Requesting Party (Dumudulog na Partido)
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs mb-1">Name <span className="italic text-blue-600">(Pangalan)</span><span className="text-red-500">*</span></label>
              <input type="text" name="reqName" value={formData.reqName} onChange={handleChange} className="w-full border rounded p-2 bg-gray-50"/>
            </div>
            <div>
               <label className="block text-xs mb-1">Sex <span className="italic text-blue-600">(Kasarian)</span><span className="text-red-500">*</span></label>
               <div className="flex space-x-4 mt-2">
                 <label className="flex items-center"><input type="radio" name="reqSex" value="Male" onChange={handleChange} className="mr-1"/> Male</label>
                 <label className="flex items-center"><input type="radio" name="reqSex" value="Female" onChange={handleChange} className="mr-1"/> Female</label>
               </div>
            </div>
            <div>
              <label className="block text-xs mb-1">Birthday <span className="italic text-blue-600">(Kapanganakan)</span><span className="text-red-500">*</span></label>
              <input type="date" name="reqBirthday" value={formData.reqBirthday} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-xs mb-1">Age <span className="italic text-blue-600">(Edad)</span><span className="text-red-500">*</span></label>
              <input type="text" name="reqAge" value={formData.reqAge} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
              <label className="block text-xs mb-1">Region <span className="italic text-blue-600">(Rehiyon)</span><span className="text-red-500">*</span></label>
              <select name="reqRegion" value={formData.reqRegion} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--Select Region--</option></select>
            </div>
            <div>
              <label className="block text-xs mb-1">Province <span className="italic text-blue-600">(Lalawigan)</span><span className="text-red-500">*</span></label>
              <select name="reqProvince" value={formData.reqProvince} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--Select Province--</option></select>
            </div>
            <div>
              <label className="block text-xs mb-1">City/Municipality <span className="italic text-blue-600">(Munisipalidad)</span><span className="text-red-500">*</span></label>
              <select name="reqCity" value={formData.reqCity} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--City/Municipality--</option></select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className="block text-xs mb-1">Barangay<span className="text-red-500">*</span></label>
              <select name="reqBarangay" value={formData.reqBarangay} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--Select Barangay--</option></select>
            </div>
            <div>
              <label className="block text-xs mb-1">Street/Unit/Bldg No.<span className="text-red-500">*</span></label>
              <input type="text" name="reqStreet" value={formData.reqStreet} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>
          <div className="flex">
            <span className="border rounded-l p-2 bg-gray-100 text-gray-600 text-sm">Address</span>
            <input type="text" name="reqAddress" value={formData.reqAddress} onChange={handleChange} className="w-full border rounded-r p-2 bg-gray-50"/>
          </div>
        </div>
      </div>

       <div className="bg-yellow-50 rounded border border-yellow-100 overflow-hidden mt-4">
        <div className="bg-yellow-100 p-2 border-b border-yellow-200 flex items-center font-bold text-gray-800">
           Contact Details
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs mb-1">Telephone No. <span className="italic text-blue-600">(Telepono)</span></label>
            <input type="text" name="reqTelNo" value={formData.reqTelNo} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-xs mb-1">Mobile No. <span className="italic text-blue-600">(9xxxxxxxxx)</span><span className="text-red-500">*</span></label>
            <div className="flex">
              <span className="border rounded-l p-2 bg-gray-100 text-gray-600 text-sm">+63</span>
              <input type="text" name="reqMobileNo" value={formData.reqMobileNo} onChange={handleChange} className="w-full border rounded-r p-2 bg-gray-50" />
            </div>
          </div>
          <div>
            <label className="block text-xs mb-1">Email Address<span className="text-red-500">*</span></label>
            <input type="email" name="reqEmail" value={formData.reqEmail} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
        </div>
       </div>

        <div className="bg-yellow-50 rounded border border-yellow-100 overflow-hidden mt-4">
        <div className="bg-yellow-100 p-2 border-b border-yellow-200 flex items-center font-bold text-gray-800">
           Employment Details
        </div>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs mb-1">Date Hired <span className="italic text-blue-600">(Petsa na nagsimula sa trabaho)</span><span className="text-red-500">*</span></label>
              <input type="date" name="reqDateHired" value={formData.reqDateHired} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-xs mb-1">Type of Employment <span className="italic text-blue-600">(Estado ng trabaho)</span><span className="text-red-500">*</span></label>
              <select name="reqEmploymentType" value={formData.reqEmploymentType} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--Select--</option></select>
            </div>
            <div>
              <label className="block text-xs mb-1">Nature of Work /Position <span className="italic text-blue-600">(Uri ng trabaho)</span></label>
              <input type="text" name="reqNatureOfWork" value={formData.reqNatureOfWork} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-xs mb-1">Status of Employment <span className="italic text-blue-600">(Katayuan ng trabaho)</span><span className="text-red-500">*</span></label>
              <select name="reqStatusEmployment" value={formData.reqStatusEmployment} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--Select--</option></select>
            </div>
            <div>
              <label className="block text-xs mb-1">Years of Service</label>
              <input type="text" name="reqYearsService" value={formData.reqYearsService} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Are you employed under an agency, contractor or sub-contractor? <span className="italic text-blue-600">(Ikaw ba ay empleyado ng agency, contractor or sub-contractor)</span></label>
            <div className="flex space-x-4 mt-2">
                 <label className="flex items-center"><input type="radio" name="reqAgencyEmployed" value="No" checked={formData.reqAgencyEmployed === 'No'} onChange={handleChange} className="mr-1"/> No</label>
                 <label className="flex items-center"><input type="radio" name="reqAgencyEmployed" value="Yes" checked={formData.reqAgencyEmployed === 'Yes'} onChange={handleChange} className="mr-1"/> Yes</label>
            </div>
          </div>
        </div>
       </div>

      <div className="flex justify-end pt-4">
        <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full shadow">Next</button>
      </div>
    </div>
  );
}

function Step2RespondingParty({ formData, handleChange, nextStep, prevStep }) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="bg-green-100 p-2 font-bold text-green-900 border border-green-200 rounded flex items-center">
        <User size={18} className="mr-2" /> Responding Party
      </div>

      <div>
        <label className="block text-sm mb-1 text-gray-800">Name of Responding Company<span className="italic text-blue-600">(Pangalan ng Kompanyang Inirereklamo)</span><span className="text-red-500">*</span></label>
        <input type="text" name="resCompanyNameHeader" value={formData.resCompanyNameHeader} onChange={handleChange} className="w-full border rounded p-2 uppercase" />
      </div>

      <div className="bg-green-50 rounded border border-green-100 overflow-hidden">
        <div className="bg-green-100 p-2 border-b border-green-200 flex items-center font-bold text-gray-800">
           Contact Person Details
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
            <label className="block text-xs mb-1">Contact Person <span className="italic text-blue-600">(Taong kakausapin)</span><span className="text-red-500">*</span></label>
            <input type="text" name="resContactPerson" value={formData.resContactPerson} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-xs mb-1">Position <span className="italic text-blue-600">(Katungkulan)</span><span className="text-red-500">*</span></label>
            <input type="text" name="resPosition" value={formData.resPosition} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
           <div>
               <label className="block text-xs mb-1">Sex <span className="italic text-blue-600">(Kasarian)</span><span className="text-red-500">*</span></label>
               <div className="flex space-x-4 mt-2">
                 <label className="flex items-center"><input type="radio" name="resSex" value="Male" onChange={handleChange} className="mr-1"/> Male</label>
                 <label className="flex items-center"><input type="radio" name="resSex" value="Female" onChange={handleChange} className="mr-1"/> Female</label>
               </div>
            </div>
             <div>
            <label className="block text-xs mb-1">Telephone No.</label>
            <input type="text" name="resTelNo" value={formData.resTelNo} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-xs mb-1">Mobile No.</label>
            <div className="flex">
              <span className="border rounded-l p-2 bg-gray-100 text-gray-600 text-sm">+63</span>
              <input type="text" name="resMobileNo" value={formData.resMobileNo} onChange={handleChange} className="w-full border rounded-r p-2 bg-white" placeholder="9XXXXXXXXX" />
            </div>
          </div>
          <div>
            <label className="block text-xs mb-1">Email Address</label>
            <input type="email" name="resEmail" value={formData.resEmail} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
        </div>
      </div>

       <div className="bg-green-50 rounded border border-green-100 overflow-hidden">
        <div className="bg-green-100 p-2 border-b border-green-200 flex items-center font-bold text-gray-800">
           Company Details
        </div>
        <div className="p-4 space-y-4">
           <div className="flex">
            <span className="border rounded-l p-2 bg-gray-100 text-gray-600 text-sm whitespace-nowrap">Company Name</span>
            <input type="text" name="resCompanyName" value={formData.resCompanyName} onChange={handleChange} className="w-full border rounded-r p-2 bg-gray-50 uppercase" />
          </div>
           <div className="flex">
            <span className="border rounded-l p-2 bg-gray-100 text-gray-600 text-sm whitespace-nowrap">Address</span>
            <input type="text" name="resAddress" value={formData.resAddress} onChange={handleChange} className="w-full border rounded-r p-2 bg-gray-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
              <label className="block text-xs mb-1">Region <span className="italic text-blue-600">(Rehiyon)</span><span className="text-red-500">*</span></label>
              <select name="resRegion" value={formData.resRegion} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--Select Region--</option></select>
            </div>
            <div>
              <label className="block text-xs mb-1">Province <span className="italic text-blue-600">(Lalawigan)</span><span className="text-red-500">*</span></label>
              <select name="resProvince" value={formData.resProvince} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--Select Province--</option></select>
            </div>
            <div>
              <label className="block text-xs mb-1">Municipality <span className="italic text-blue-600">(Munisipalidad)</span><span className="text-red-500">*</span></label>
              <select name="resMunicipality" value={formData.resMunicipality} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--City/Municipality--</option></select>
            </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className="block text-xs mb-1">Barangay<span className="text-red-500">*</span></label>
              <select name="resBarangay" value={formData.resBarangay} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--Select Barangay--</option></select>
            </div>
            <div>
              <label className="block text-xs mb-1">Street/Unit/Bldg No.<span className="text-red-500">*</span></label>
              <input type="text" name="resStreet" value={formData.resStreet} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs mb-1">Contact No.</label>
              <input type="text" name="resContactNo" value={formData.resContactNo} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-xs mb-1">Email</label>
              <input type="email" name="resEmailCompany" value={formData.resEmailCompany} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
             <div>
               <label className="block text-xs mb-1">Please Check</label>
               <div className="flex space-x-4 mt-2">
                 <label className="flex items-center"><input type="radio" name="resUnionized" value="Non-Unionized" checked={formData.resUnionized === 'Non-Unionized'} onChange={handleChange} className="mr-1 accent-purple-600"/> Non-Unionized</label>
                 <label className="flex items-center"><input type="radio" name="resUnionized" value="Unionized" checked={formData.resUnionized === 'Unionized'} onChange={handleChange} className="mr-1"/> Unionized</label>
               </div>
            </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs mb-1">Nature of Business<span className="italic text-blue-600">(Uri ng negosyo)</span><span className="text-red-500">*</span></label>
               <select name="resNatureOfBusiness" value={formData.resNatureOfBusiness} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>--Select Business Section--</option></select>
            </div>
            <div>
              <label className="block text-xs mb-1">No. of Male Workers</label>
              <input type="number" name="resMaleWorkers" value={formData.resMaleWorkers} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
             <div>
              <label className="block text-xs mb-1">No. of Female Workers</label>
              <input type="number" name="resFemaleWorkers" value={formData.resFemaleWorkers} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
             <div>
              <label className="block text-xs mb-1">Total Employees</label>
              <input type="number" name="resTotalEmployees" value={formData.resTotalEmployees} onChange={handleChange} className="w-full border rounded p-2 bg-gray-50"/>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button onClick={prevStep} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full shadow">Previous</button>
        <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full shadow">Next</button>
      </div>
    </div>
  );
}

function Step3Claims({ formData, handleChange, nextStep, prevStep }) {
  return (
    <div className="space-y-6 animate-in fade-in">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          <div className="space-y-4">
            <div>
              <label className="flex items-start text-sm text-gray-700 mb-2">1. Labor Standard Violations</label>
              <div className="ml-4 space-y-2">
                {['Minimum Wage', 'COLA', 'Night Shift Differential', 'Overtime Pay', 'Holiday Pay', 'Premium Pay for Special Day', 'Premium Pay for Rest Day'].map(item => (
                   <label key={item} className="flex items-center text-sm text-gray-600">
                     <input type="checkbox" className="mr-2 rounded border-gray-300" /> {item}
                   </label>
                ))}
              </div>
            </div>
             <label className="flex items-center text-sm text-gray-700 mt-4">
                <input type="checkbox" className="mr-2 rounded border-gray-300" /> 2. CBA Violations
             </label>
             <label className="flex items-center text-sm text-gray-700">
                <input type="checkbox" className="mr-2 rounded border-gray-300" /> 3. Delayed in Payment/ Time of Payment
             </label>
             <label className="flex items-center text-sm text-gray-700">
                <input type="checkbox" className="mr-2 rounded border-gray-300" /> 4. Others (Please Specify)
             </label>
          </div>

           <div className="space-y-2 pt-6">
              {['Service Charge', 'Service Incentive Leave', '13th Month Pay', 'Maternity Leave', 'Paternity Leave', 'Leave For Solo Parent'].map(item => (
                   <label key={item} className="flex items-center text-sm text-gray-600">
                     <input type="checkbox" className="mr-2 rounded border-gray-300" /> {item}
                   </label>
                ))}
           </div>

            <div className="space-y-2 pt-6">
              <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" /> Leave for Victims of VAWC
              </label>
               <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" /> Special Leave for Women
              </label>
               <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" /> Illegal Deductions
              </label>
               <label className="flex items-center text-sm text-gray-600 font-semibold">
                  <input type="checkbox" name="claimLastSalary" checked={formData.claimLastSalary} onChange={handleChange} className="mr-2 rounded border-gray-300 accent-blue-600" /> Claim for Last Salary
              </label>
               <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" /> Claim for Separation Pay
              </label>
               <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" /> Claim for Retirement Benefits
              </label>

              <div className="pt-4 space-y-2">
                 {['5. Non-issuance of Certificate of Employment', '6. Illegal Dismissal', '7. Constructive Dismissal', '8. Other Personnel Actions', '9. Occupational Safety & Health Violations', '10. Regularization/ Contractualization', '11. Maltreatment/ Harrassment', '12. Sexual Harrassment'].map(item => (
                   <label key={item} className="flex items-center text-sm text-gray-600">
                     <input type="checkbox" className="mr-2 rounded border-gray-300" /> {item}
                   </label>
                ))}
              </div>
           </div>

       </div>
       <div className="flex justify-between pt-4 mt-8 border-t">
        <button onClick={prevStep} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full shadow">Previous</button>
        <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full shadow">Next</button>
      </div>
    </div>
  )
}

function Step4PrayedRelief({ formData, handleChange, nextStep, prevStep }) {
  return (
     <div className="space-y-6 animate-in fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 mb-4">
           <div className="space-y-2">
             <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" /> Payment of Money Claims
              </label>
               <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" /> Reinstatement
              </label>
               <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" /> Restitution/Correction of OSH Violations
              </label>
           </div>
           <div className="space-y-2">
             <label className="flex items-center text-sm text-gray-600 font-semibold">
                  <input type="checkbox" name="issuanceOfCert" checked={formData.issuanceOfCert} onChange={handleChange} className="mr-2 rounded border-gray-300 accent-blue-600" /> Issuance of Certificate of Employment
              </label>
               <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" /> Payment of Separation Claims
              </label>
               <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300" /> Others (Please Specify)
              </label>
           </div>
        </div>

        <div className="border border-gray-300 rounded overflow-hidden mb-6">
          <div className="bg-gray-50 p-2 text-sm text-gray-700 border-b">
            Brief Narration of Issues<span className="italic text-gray-500 text-xs ml-1">(Maikling salaysay ng reklamo)</span><span className="text-red-500">*</span>
          </div>
          <textarea 
            name="narration" 
            value={formData.narration} 
            onChange={handleChange} 
            className="w-full h-32 p-3 text-sm focus:outline-none" 
            placeholder="Enter details here..."
          ></textarea>
        </div>

        <p className="text-red-600 text-sm font-semibold mb-4">NOTE : Please fill up the short narrative box in order to choose the office. <span className="text-gray-600 italic font-normal">( Mangyaring punan ang maikling kahon ng salaysay upang makapili ng opisina. )</span></p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-xs font-bold mb-1">Office</label>
              <select name="office" value={formData.office} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>DOLE Regional Office</option></select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Regional Office</label>
              <select name="regionalOffice" value={formData.regionalOffice} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>DOLE-RO-III</option></select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Satellite/Field Office</label>
              <select name="satelliteOffice" value={formData.satelliteOffice} onChange={handleChange} className="w-full border rounded p-2 bg-white"><option>Field Office-Bulacan</option></select>
            </div>
        </div>

       <div className="flex justify-between pt-4 border-t mt-4">
        <button onClick={prevStep} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full shadow">Previous</button>
        <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full shadow">Next</button>
      </div>
     </div>
  )
}

function Step5Confirm({ formData, nextStep, prevStep }) {
  const Row = ({ label, value }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 border-b border-gray-100 last:border-0 hover:bg-gray-50">
      <div className="p-3 text-sm text-gray-600 bg-gray-50 md:bg-white">{label}</div>
      <div className="p-3 text-sm font-medium col-span-3">{value || '-'}</div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in">
       <div className="border border-blue-200 rounded overflow-hidden">
         <div className="bg-blue-600 text-white p-2 text-sm font-bold">Brief Narration</div>
         <div className="p-3 text-sm bg-blue-50/50">{formData.narration || '-'}</div>
       </div>

       <div className="border border-blue-200 rounded overflow-hidden">
         <div className="bg-blue-600 text-white p-2 text-sm font-bold">Requesting Party</div>
         <div className="bg-white">
           <Row label="SEAD Office" value={formData.satelliteOffice} />
           <Row label="Filer Type" value={formData.filerType} />
           <Row label="Name" value={`${formData.firstName} ${formData.lastName}`.trim()} />
           <Row label="Age" value={formData.reqAge} />
           <Row label="Sex" value={formData.reqSex} />
           <Row label="MobileNumber" value={formData.reqMobileNo} />
           <Row label="Email" value={formData.reqEmail} />
         </div>
         
         <div className="bg-green-700 text-white p-2 text-sm font-bold">Employment Details</div>
         <div className="bg-white">
           <Row label="Employment Type" value={formData.reqEmploymentType} />
           <Row label="Date Hired" value={formData.reqDateHired} />
           <Row label="Nature of Work" value={formData.reqNatureOfWork} />
           <Row label="Address" value={formData.reqAddress} />
           <Row label="Employment Status" value={formData.reqStatusEmployment} />
         </div>
       </div>

        <div className="border border-blue-200 rounded overflow-hidden">
         <div className="bg-blue-600 text-white p-2 text-sm font-bold">Responding Party</div>
         <div className="bg-white">
           <Row label="Name" value={formData.resCompanyNameHeader} />
           <Row label="Address" value={formData.resAddress} />
           <Row label="Email" value={formData.resEmailCompany} />
           <Row label="Contact No." value={formData.resContactNo} />
           <Row label="Nature of Business" value={formData.resNatureOfBusiness} />
           <Row label="Contact Person" value={formData.resContactPerson} />
           <Row label="Position" value={formData.resPosition} />
           <Row label="Mobile No." value={formData.resMobileNo} />
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-blue-200 rounded overflow-hidden h-full">
            <div className="bg-blue-600 text-white p-2 text-sm font-bold">Issues</div>
            <div className="p-3 text-sm bg-white h-full">
              <ul className="list-disc pl-5">
                {formData.claimLastSalary && <li>Claim for Last Salary</li>}
              </ul>
            </div>
          </div>
           <div className="border border-blue-200 rounded overflow-hidden h-full">
            <div className="bg-blue-600 text-white p-2 text-sm font-bold">Relief Prayed</div>
            <div className="p-3 text-sm bg-white h-full">
               <ul className="list-disc pl-5">
                {formData.issuanceOfCert && <li>Issuance of Certificate of Employment</li>}
              </ul>
            </div>
          </div>
       </div>

       <div className="flex justify-between pt-4 mt-4 border-t">
        <button onClick={prevStep} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full shadow">Previous</button>
        <button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full shadow">Submit</button>
      </div>
    </div>
  )
}

function OtpModal({ onVerify }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
        <div className="border-b px-4 py-3 text-gray-700 font-semibold text-lg flex justify-between">
          DOLE ARMS OTP Verification
        </div>
        <div className="p-8 flex flex-col items-center">
          <p className="text-center text-sm text-gray-600 mb-6 w-3/4">
            Your mobile number and email will receive an OTP code to verify your request.
          </p>
          
          <div className="flex items-center space-x-2 mb-4">
             <span className="font-bold text-lg mr-2">OTP-</span>
             {[1,2,3,4,5,6].map(i => (
               <input key={i} type="text" maxLength={1} className="w-10 h-10 border rounded text-center text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
             ))}
          </div>

          <div className="w-full text-left text-xs text-gray-500 mb-6 pl-10">
            Time Remaining 4:47
          </div>

          <button onClick={onVerify} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-12 rounded shadow">
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
}
