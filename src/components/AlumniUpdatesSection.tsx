import React, { useState, useMemo, useEffect } from 'react';
import { User, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.ts';
import { EVENT_CONFIG } from '../config/eventConfig.ts';
import {
  AlumniJourneyRecord,
  PURSUIT_CATEGORIES,
  PursuitCategory,
  saveAlumniJourney,
  deleteAlumniJourney,
} from '../services/alumniJourneyService.ts';
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  LogIn,
  LogOut,
  Search,
  UserPlus,
  Users,
  Send,
  Pencil,
  Trash2,
  ArrowUpRight,
  Layers,
} from 'lucide-react';

interface AlumniUpdatesSectionProps {
  user: User | null;
  authReady: boolean;
  journeys: AlumniJourneyRecord[];
  onNavigateToDirectory: () => void;
}

const COMMON_BATCHES = [
  '2013-14',
  '2014-15',
  '2015-16',
  '2016-17',
  '2017-18',
  '2018-19',
  '2019-20',
  '2020-21',
  '2021-22',
  '2022-23',
  '2023-24',
  '2024-25',
  '2025-26',
  '2026-27',
  '2027-28',
];

export const AlumniUpdatesSection: React.FC<AlumniUpdatesSectionProps> = ({
  user,
  authReady,
  journeys,
  onNavigateToDirectory,
}) => {
  const [identityMode, setIdentityMode] = useState<'registered' | 'new'>('registered');
  const [directorySearch, setDirectorySearch] = useState('');
  const [selectedAlumniId, setSelectedAlumniId] = useState<string>('');
  const [alumniName, setAlumniName] = useState('');
  const [batchYear, setBatchYear] = useState('2019-20');
  const [pursuitCategory, setPursuitCategory] = useState<PursuitCategory>('Working Professional');
  const [professionOrRole, setProfessionOrRole] = useState('');
  const [collegeOrOrganization, setCollegeOrOrganization] = useState('');
  const [streamOrField, setStreamOrField] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [whatImDoing, setWhatImDoing] = useState('');

  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Auto-match logged-in Google user email to registered alumni list if nothing selected yet
  useEffect(() => {
    if (user?.email && !selectedAlumniId && !editingDocId && identityMode === 'registered') {
      const matched = EVENT_CONFIG.alumniProfiles.find(
        (a) => a.email.toLowerCase() === user.email?.toLowerCase()
      );
      if (matched) {
        setSelectedAlumniId(matched.id);
        setAlumniName(matched.name);
        setBatchYear(matched.batchYear);
      }
    }
  }, [user, selectedAlumniId, editingDocId, identityMode]);

  const matchingRegisteredAlumni = useMemo(() => {
    const q = directorySearch.toLowerCase().trim();
    const list = EVENT_CONFIG.alumniProfiles;
    if (!q) return list.slice(0, 12);
    return list
      .filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.batchYear.toLowerCase().includes(q)
      )
      .slice(0, 18);
  }, [directorySearch]);

  const selectedRegisteredProfile = useMemo(
    () => EVENT_CONFIG.alumniProfiles.find((a) => a.id === selectedAlumniId) || null,
    [selectedAlumniId]
  );

  const mySubmissions = useMemo(
    () => (user ? journeys.filter((j) => j.authorUid === user.uid) : []),
    [journeys, user]
  );

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setAuthLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to sign in with Google.';
      if (!msg.includes('popup-closed-by-user')) {
        setErrorMsg(`Sign-in issue: ${msg}`);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    await signOut(auth);
  };

  const handleSelectRegistered = (id: string) => {
    const found = EVENT_CONFIG.alumniProfiles.find((a) => a.id === id);
    if (found) {
      setSelectedAlumniId(found.id);
      setAlumniName(found.name);
      setBatchYear(found.batchYear);
      setErrorMsg('');
    }
  };

  const resetForm = () => {
    setEditingDocId(null);
    setSelectedAlumniId('');
    setDirectorySearch('');
    setAlumniName('');
    setBatchYear('2019-20');
    setPursuitCategory('Working Professional');
    setProfessionOrRole('');
    setCollegeOrOrganization('');
    setStreamOrField('');
    setCurrentLocation('');
    setWhatImDoing('');
  };

  const handleStartEdit = (record: AlumniJourneyRecord) => {
    setSuccessMsg('');
    setErrorMsg('');
    setEditingDocId(record.id);
    if (record.alumniId !== 'community') {
      setIdentityMode('registered');
      setSelectedAlumniId(record.alumniId);
    } else {
      setIdentityMode('new');
      setSelectedAlumniId('');
    }
    setAlumniName(record.alumniName);
    setBatchYear(record.batchYear);
    setPursuitCategory(record.pursuitCategory);
    setProfessionOrRole(record.professionOrRole);
    setCollegeOrOrganization(record.collegeOrOrganization);
    setStreamOrField(record.streamOrField);
    setCurrentLocation(record.currentLocation);
    setWhatImDoing(record.whatImDoing);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (docId: string) => {
    setErrorMsg('');
    setDeletingId(docId);
    try {
      await deleteAlumniJourney(docId);
      if (editingDocId === docId) {
        resetForm();
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Could not delete submission.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!user) {
      setErrorMsg('Please sign in with Google first so your submission can be securely recorded.');
      return;
    }

    const effectiveAlumniId = identityMode === 'registered' ? selectedAlumniId : 'community';
    const effectiveName =
      identityMode === 'registered' && selectedRegisteredProfile
        ? selectedRegisteredProfile.name
        : alumniName;
    const effectiveBatch =
      identityMode === 'registered' && selectedRegisteredProfile
        ? selectedRegisteredProfile.batchYear
        : batchYear;

    if (identityMode === 'registered' && !selectedRegisteredProfile) {
      setErrorMsg('Please select your name from the registered alumni list, or switch to "Add as New Alumnus".');
      return;
    }

    setSubmitting(true);
    try {
      await saveAlumniJourney(
        {
          alumniId: effectiveAlumniId,
          alumniName: effectiveName,
          batchYear: effectiveBatch,
          pursuitCategory,
          professionOrRole,
          collegeOrOrganization,
          streamOrField,
          currentLocation,
          whatImDoing,
        },
        user,
        editingDocId || undefined
      );

      setSuccessMsg(
        editingDocId
          ? `Updated! "${effectiveName}" (Batch ${effectiveBatch}) has been updated in the Alumni Directory.`
          : `Recorded! "${effectiveName}" (Batch ${effectiveBatch}) is now live on the Alumni Directory.`
      );
      resetForm();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save your alumni update.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="updates" className="relative py-16 sm:py-24 px-4 sm:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.2em] text-[#C9A227] uppercase">
              <Briefcase className="w-3.5 h-3.5" />
              <span>ALUMNI PATHWAYS &amp; CAREERS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial font-bold text-[#FAFAFA]">
              Share Your Profession, College &amp; Stream
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-2 max-w-2xl font-light leading-relaxed">
              Let fellow Shalomites and current students know what you are doing today — your profession, university, academic stream, startup, or current pursuit. All submissions are immediately recorded on the{' '}
              <button
                type="button"
                onClick={onNavigateToDirectory}
                className="text-[#E8D9A8] underline underline-offset-4 hover:text-[#C9A227] cursor-pointer"
              >
                Alumni Directory
              </button>
              .
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToDirectory}
            className="self-start lg:self-auto px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-[#C9A227]/35 text-xs font-medium text-[#E8D9A8] flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <Users className="w-4 h-4 text-[#C9A227]" />
            <span>View Alumni Directory ({journeys.length} Updates Recorded)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Auth Status Bar */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#111114]/85 backdrop-blur-md border border-[#C9A227]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          {!authReady ? (
            <div className="text-xs text-[#A1A1AA]">Checking authentication status...</div>
          ) : user ? (
            <>
              <div className="flex items-center gap-3.5">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Alumnus'}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border border-[#C9A227]/50 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center text-[#E8D9A8] font-bold">
                    {(user.displayName || user.email || 'A').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="text-xs font-semibold text-[#FAFAFA] flex items-center gap-2">
                    <span>Signed in as {user.displayName || 'Shalom Alumnus'}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px]">
                      Verified
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] font-mono">{user.email}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="self-start sm:self-auto px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#A1A1AA] hover:text-[#FAFAFA] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <div className="text-sm font-serif-editorial font-bold text-[#FAFAFA] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C9A227]" />
                  <span>Sign in with Google to Submit or Update Your Profile</span>
                </div>
                <p className="text-xs text-[#A1A1AA]">
                  Quick one-click verification ensures authentic submissions and lets you edit your directory entry anytime.
                </p>
              </div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={authLoading}
                className="self-start sm:self-auto px-5 py-2.5 rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] hover:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 shrink-0"
              >
                <LogIn className="w-4 h-4" />
                <span>{authLoading ? 'Signing in...' : 'Sign in with Google'}</span>
              </button>
            </>
          )}
        </div>

        {/* Submission Form Card */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-xl bg-[#111114]/90 backdrop-blur-md border border-white/10 shadow-2xl space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif-editorial font-bold text-[#FAFAFA]">
                {editingDocId ? 'Edit Your Recorded Alumni Update' : 'Record Your Current Profession / College / Stream'}
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Fill in whichever fields apply to what you are currently pursuing.
              </p>
            </div>

            {editingDocId && (
              <button
                type="button"
                onClick={resetForm}
                className="self-start px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#A1A1AA] hover:text-[#FAFAFA] cursor-pointer"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {/* Step 1: Identity Mode Selector */}
          <div className="space-y-4">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#C9A227]">
              1. Identify Yourself in the Directory
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIdentityMode('registered')}
                className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  identityMode === 'registered'
                    ? 'bg-[#C9A227]/15 border-[#C9A227]/60 text-[#FAFAFA]'
                    : 'bg-white/[0.02] border-white/10 text-[#A1A1AA] hover:border-white/25'
                }`}
              >
                <Users className="w-4 h-4 text-[#C9A227] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold">I’m Already in the Alumni Directory</div>
                  <div className="text-[11px] text-[#A1A1AA] mt-0.5">
                    Select your name from the 125 registered alumni to attach your update to your card.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIdentityMode('new');
                  setSelectedAlumniId('');
                }}
                className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  identityMode === 'new'
                    ? 'bg-[#C9A227]/15 border-[#C9A227]/60 text-[#FAFAFA]'
                    : 'bg-white/[0.02] border-white/10 text-[#A1A1AA] hover:border-white/25'
                }`}
              >
                <UserPlus className="w-4 h-4 text-[#C9A227] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold">Add My Name as a New Alumnus</div>
                  <div className="text-[11px] text-[#A1A1AA] mt-0.5">
                    Not listed yet? Enter your name and batch to add yourself directly to the directory.
                  </div>
                </div>
              </button>
            </div>

            {identityMode === 'registered' ? (
              <div className="space-y-3 pt-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={directorySearch}
                    onChange={(e) => setDirectorySearch(e.target.value)}
                    placeholder="Type your name or graduation batch (e.g., 2018-19) to find your card..."
                    className="w-full bg-[#16161A] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                {selectedRegisteredProfile && (
                  <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-[#FAFAFA]">{selectedRegisteredProfile.name}</span>
                        <span className="text-[#A1A1AA] ml-2 font-mono">
                          (Batch {selectedRegisteredProfile.batchYear})
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAlumniId('');
                        setAlumniName('');
                      }}
                      className="text-[11px] text-[#A1A1AA] hover:text-[#FAFAFA] underline cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                )}

                {!selectedRegisteredProfile && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
                    {matchingRegisteredAlumni.map((alum) => (
                      <button
                        key={alum.id}
                        type="button"
                        onClick={() => handleSelectRegistered(alum.id)}
                        className="p-2.5 rounded-lg bg-[#16161A] hover:bg-[#C9A227]/15 border border-white/10 hover:border-[#C9A227]/40 text-left transition-all cursor-pointer"
                      >
                        <div className="text-xs font-medium text-[#FAFAFA] truncate">{alum.name}</div>
                        <div className="text-[10px] font-mono text-[#C9A227] mt-0.5">
                          Batch {alum.batchYear}
                        </div>
                      </button>
                    ))}
                    {matchingRegisteredAlumni.length === 0 && (
                      <div className="col-span-full p-4 text-center text-xs text-[#A1A1AA] bg-white/[0.02] rounded-lg border border-white/5">
                        No matching name found.{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setIdentityMode('new');
                            setAlumniName(directorySearch);
                          }}
                          className="text-[#E8D9A8] underline cursor-pointer"
                        >
                          Add “{directorySearch || 'yourself'}” as a new alumnus
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={alumniName}
                    onChange={(e) => setAlumniName(e.target.value)}
                    placeholder="e.g., Aarav Sharma"
                    className="w-full bg-[#16161A] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A1A1AA] mb-1.5">Graduation Batch *</label>
                  <div className="flex gap-2">
                    <select
                      value={COMMON_BATCHES.includes(batchYear) ? batchYear : 'custom'}
                      onChange={(e) => {
                        if (e.target.value === 'custom') {
                          setBatchYear('');
                        } else {
                          setBatchYear(e.target.value);
                        }
                      }}
                      className="bg-[#16161A] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-[#FAFAFA] focus:outline-none focus:border-[#C9A227] flex-1"
                    >
                      {COMMON_BATCHES.map((b) => (
                        <option key={b} value={b} className="bg-[#16161A]">
                          Batch {b}
                        </option>
                      ))}
                      <option value="custom" className="bg-[#16161A]">
                        Other / Custom Batch
                      </option>
                    </select>
                    {!COMMON_BATCHES.includes(batchYear) && (
                      <input
                        type="text"
                        required
                        maxLength={20}
                        value={batchYear}
                        onChange={(e) => setBatchYear(e.target.value)}
                        placeholder="e.g., 2012-13"
                        className="w-32 bg-[#16161A] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Current Pursuit Category */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#C9A227] pt-2">
              2. What Best Describes What You’re Doing Right Now?
            </label>
            <div className="flex flex-wrap gap-2">
              {PURSUIT_CATEGORIES.map((category) => {
                const active = pursuitCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setPursuitCategory(category)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                      active
                        ? 'bg-[#C9A227] text-[#080808] border-[#C9A227] font-semibold shadow-md shadow-[#C9A227]/20'
                        : 'bg-[#16161A] text-[#A1A1AA] border-white/10 hover:text-[#FAFAFA] hover:border-white/25'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Profession / College / Stream / Details */}
          <div className="space-y-4 pt-2 border-t border-white/10">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#C9A227] pt-2">
              3. Profession, College, Stream &amp; Details
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs text-[#FAFAFA] mb-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Profession / Role / Degree Program</span>
                </label>
                <input
                  type="text"
                  maxLength={150}
                  value={professionOrRole}
                  onChange={(e) => setProfessionOrRole(e.target.value)}
                  placeholder="e.g., Software Engineer, MBBS Intern, B.Tech Student, Advocate"
                  className="w-full bg-[#16161A] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs text-[#FAFAFA] mb-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>College / University / Company / Venture</span>
                </label>
                <input
                  type="text"
                  maxLength={180}
                  value={collegeOrOrganization}
                  onChange={(e) => setCollegeOrOrganization(e.target.value)}
                  placeholder="e.g., IIT Delhi, Delhi University, Google, AIIMS, Independent Studio"
                  className="w-full bg-[#16161A] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs text-[#FAFAFA] mb-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Academic Stream / Specialization / Industry</span>
                </label>
                <input
                  type="text"
                  maxLength={150}
                  value={streamOrField}
                  onChange={(e) => setStreamOrField(e.target.value)}
                  placeholder="e.g., Computer Science, Commerce & Finance, Medicine, Law, Design"
                  className="w-full bg-[#16161A] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs text-[#FAFAFA] mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Current City / Location (Optional)</span>
                </label>
                <input
                  type="text"
                  maxLength={120}
                  value={currentLocation}
                  onChange={(e) => setCurrentLocation(e.target.value)}
                  placeholder="e.g., Gurugram, Bengaluru, Mumbai, London"
                  className="w-full bg-[#16161A] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="flex items-center gap-1.5 text-xs text-[#FAFAFA]">
                  <Layers className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>What Else Are You Working On or Pursuing? (Optional)</span>
                </label>
                <span className="text-[10px] font-mono text-[#71717A]">{whatImDoing.length}/600</span>
              </div>
              <textarea
                rows={3}
                maxLength={600}
                value={whatImDoing}
                onChange={(e) => setWhatImDoing(e.target.value)}
                placeholder="Share anything about your current job, college life, competitive exam prep, startup, research, or creative work..."
                className="w-full bg-[#16161A] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#C9A227] resize-none"
              />
            </div>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>{successMsg}</span>
              </div>
              <button
                type="button"
                onClick={onNavigateToDirectory}
                className="self-start sm:self-auto px-3.5 py-1.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 font-medium flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Open Alumni Directory</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <span className="text-[11px] text-[#71717A]">
              Submissions appear publicly in the Alumni Directory (no phone or email is added by this form).
            </span>

            {user ? (
              <button
                type="submit"
                disabled={submitting}
                className="px-7 py-3 rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] hover:shadow-[0_0_25px_rgba(201,162,39,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Send className="w-3.5 h-3.5" />
                <span>
                  {submitting
                    ? 'Recording...'
                    : editingDocId
                    ? 'Save Updated Profile'
                    : 'Record to Alumni Directory'}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={authLoading}
                className="px-7 py-3 rounded-lg text-xs font-poppins font-semibold uppercase tracking-wider text-[#080808] bg-gradient-to-r from-[#E8D9A8] via-[#C9A227] to-[#B38F1F] hover:shadow-[0_0_25px_rgba(201,162,39,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{authLoading ? 'Signing in...' : 'Sign in with Google to Record'}</span>
              </button>
            )}
          </div>
        </form>

        {/* My Submissions (if logged in & has any) */}
        {user && mySubmissions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-serif-editorial font-bold text-[#E8D9A8]">
              Your Recorded Submissions ({mySubmissions.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mySubmissions.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-[#111114]/85 border border-[#C9A227]/30 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#C9A227]/15 text-[#E8D9A8] border border-[#C9A227]/30 text-[10px] font-mono font-semibold">
                        Batch {item.batchYear}
                      </span>
                      <span className="text-[10px] text-[#C9A227] uppercase tracking-wider font-mono">
                        {item.pursuitCategory}
                      </span>
                    </div>
                    <h4 className="text-base font-serif-editorial font-bold text-[#FAFAFA]">
                      {item.alumniName}
                    </h4>
                    <div className="text-xs text-[#A1A1AA] space-y-1">
                      {item.professionOrRole && (
                        <div>
                          <span className="text-[#71717A]">Role / Program:</span>{' '}
                          <span className="text-[#FAFAFA]">{item.professionOrRole}</span>
                        </div>
                      )}
                      {item.collegeOrOrganization && (
                        <div>
                          <span className="text-[#71717A]">College / Org:</span>{' '}
                          <span className="text-[#FAFAFA]">{item.collegeOrOrganization}</span>
                        </div>
                      )}
                      {item.streamOrField && (
                        <div>
                          <span className="text-[#71717A]">Stream / Field:</span>{' '}
                          <span className="text-[#FAFAFA]">{item.streamOrField}</span>
                        </div>
                      )}
                      {item.currentLocation && (
                        <div>
                          <span className="text-[#71717A]">Location:</span>{' '}
                          <span className="text-[#FAFAFA]">{item.currentLocation}</span>
                        </div>
                      )}
                      {item.whatImDoing && (
                        <p className="text-[#A1A1AA] pt-1 italic">“{item.whatImDoing}”</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(item)}
                      className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs text-[#E8D9A8] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      disabled={deletingId === item.id}
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-xs text-red-300 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{deletingId === item.id ? 'Removing...' : 'Delete'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recently Recorded Directory Updates Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-serif-editorial font-bold text-[#FAFAFA]">
                Recently Recorded on the Alumni Directory
              </h3>
              <p className="text-xs text-[#A1A1AA]">
                Live updates shared by Shalom alumni across batches.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E8D9A8]">
              {journeys.length} {journeys.length === 1 ? 'Submission' : 'Submissions'}
            </span>
          </div>

          {journeys.length === 0 ? (
            <div className="p-10 rounded-xl bg-[#111114]/70 border border-white/10 text-center space-y-2">
              <Sparkles className="w-6 h-6 text-[#C9A227] mx-auto opacity-80" />
              <div className="text-sm font-serif-editorial font-semibold text-[#FAFAFA]">
                Be the first alumnus to record your current profession, college, or stream!
              </div>
              <p className="text-xs text-[#71717A]">
                Your update will appear right here and on your Alumni Directory card.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {journeys.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-[#111114]/80 backdrop-blur-md border border-white/10 hover:border-[#C9A227]/40 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#C9A227]/15 text-[#E8D9A8] border border-[#C9A227]/30 font-semibold">
                      Batch {item.batchYear}
                    </span>
                    <span className="text-[#C9A227] uppercase tracking-wider truncate">
                      {item.pursuitCategory}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-serif-editorial font-bold text-[#FAFAFA]">
                      {item.alumniName}
                    </h4>
                    {item.professionOrRole && (
                      <div className="text-xs text-[#E8D9A8] font-medium mt-0.5">
                        {item.professionOrRole}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-[#A1A1AA]">
                    {item.collegeOrOrganization && (
                      <div className="flex items-start gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                        <span>{item.collegeOrOrganization}</span>
                      </div>
                    )}
                    {item.streamOrField && (
                      <div className="flex items-start gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                        <span>{item.streamOrField}</span>
                      </div>
                    )}
                    {item.currentLocation && (
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C9A227] shrink-0 mt-0.5" />
                        <span>{item.currentLocation}</span>
                      </div>
                    )}
                  </div>

                  {item.whatImDoing && (
                    <p className="text-[11px] text-[#A1A1AA] border-t border-white/5 pt-2.5 leading-relaxed">
                      {item.whatImDoing}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
