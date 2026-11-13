import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';

export const PURSUIT_CATEGORIES = [
  'Working Professional',
  'College / University Student',
  'Entrepreneur / Founder',
  'Research & Higher Studies',
  'Creative / Independent',
  'Other',
] as const;

export type PursuitCategory = (typeof PURSUIT_CATEGORIES)[number];

export interface AlumniJourneyRecord {
  id: string;
  alumniId: string;
  alumniName: string;
  batchYear: string;
  pursuitCategory: PursuitCategory;
  professionOrRole: string;
  collegeOrOrganization: string;
  streamOrField: string;
  currentLocation: string;
  whatImDoing: string;
  visibility: 'public';
  authorUid: string;
  authorDisplayName: string;
  createdAtMs: number;
  updatedAtMs: number;
}

export interface AlumniJourneyInput {
  alumniId: string;
  alumniName: string;
  batchYear: string;
  pursuitCategory: PursuitCategory;
  professionOrRole: string;
  collegeOrOrganization: string;
  streamOrField: string;
  currentLocation: string;
  whatImDoing: string;
}

const COLLECTION_NAME = 'alumni_journeys';

const LIMITS = {
  alumniId: 64,
  alumniName: 120,
  batchYear: 20,
  pursuitCategory: 50,
  professionOrRole: 150,
  collegeOrOrganization: 180,
  streamOrField: 150,
  currentLocation: 120,
  whatImDoing: 600,
  authorDisplayName: 120,
} as const;

function sanitizeText(value: string, maxLen: number): string {
  return value.trim().slice(0, maxLen);
}

function sanitizeId(value: string, fallback: string): string {
  const cleaned = value.trim().replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, LIMITS.alumniId);
  return cleaned.length > 0 ? cleaned : fallback;
}

function toMillis(ts: unknown): number {
  if (ts instanceof Timestamp) {
    return ts.toMillis();
  }
  if (ts && typeof ts === 'object' && 'toMillis' in ts && typeof (ts as { toMillis: () => number }).toMillis === 'function') {
    return (ts as { toMillis: () => number }).toMillis();
  }
  return Date.now();
}

export function subscribePublicAlumniJourneys(
  onData: (records: AlumniJourneyRecord[]) => void,
  onError?: (err: Error) => void
): () => void {
  const journeysQuery = query(
    collection(db, COLLECTION_NAME),
    where('visibility', '==', 'public')
  );

  return onSnapshot(
    journeysQuery,
    (snapshot) => {
      const items: AlumniJourneyRecord[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        const category = PURSUIT_CATEGORIES.includes(d.pursuitCategory)
          ? (d.pursuitCategory as PursuitCategory)
          : 'Other';

        return {
          id: docSnap.id,
          alumniId: typeof d.alumniId === 'string' ? d.alumniId : 'community',
          alumniName: typeof d.alumniName === 'string' ? d.alumniName : 'Shalom Alumnus',
          batchYear: typeof d.batchYear === 'string' ? d.batchYear : '',
          pursuitCategory: category,
          professionOrRole: typeof d.professionOrRole === 'string' ? d.professionOrRole : '',
          collegeOrOrganization: typeof d.collegeOrOrganization === 'string' ? d.collegeOrOrganization : '',
          streamOrField: typeof d.streamOrField === 'string' ? d.streamOrField : '',
          currentLocation: typeof d.currentLocation === 'string' ? d.currentLocation : '',
          whatImDoing: typeof d.whatImDoing === 'string' ? d.whatImDoing : '',
          visibility: 'public',
          authorUid: typeof d.authorUid === 'string' ? d.authorUid : '',
          authorDisplayName: typeof d.authorDisplayName === 'string' ? d.authorDisplayName : '',
          createdAtMs: toMillis(d.createdAt),
          updatedAtMs: toMillis(d.updatedAt),
        };
      });

      items.sort((a, b) => b.updatedAtMs - a.updatedAtMs);
      onData(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      } catch (wrapped) {
        if (onError && wrapped instanceof Error) {
          onError(wrapped);
        }
      }
    }
  );
}

export async function saveAlumniJourney(
  input: AlumniJourneyInput,
  user: User,
  existingDocId?: string
): Promise<string> {
  const alumniId = sanitizeId(input.alumniId, 'community');
  const alumniName = sanitizeText(input.alumniName, LIMITS.alumniName);
  const batchYear = sanitizeText(input.batchYear, LIMITS.batchYear);
  const pursuitCategory = PURSUIT_CATEGORIES.includes(input.pursuitCategory)
    ? input.pursuitCategory
    : 'Other';
  const professionOrRole = sanitizeText(input.professionOrRole, LIMITS.professionOrRole);
  const collegeOrOrganization = sanitizeText(input.collegeOrOrganization, LIMITS.collegeOrOrganization);
  const streamOrField = sanitizeText(input.streamOrField, LIMITS.streamOrField);
  const currentLocation = sanitizeText(input.currentLocation, LIMITS.currentLocation);
  const whatImDoing = sanitizeText(input.whatImDoing, LIMITS.whatImDoing);

  if (alumniName.length < 2) {
    throw new Error('Please enter your full name (at least 2 characters).');
  }
  if (batchYear.length < 4) {
    throw new Error('Please specify your graduation batch year (e.g., 2018-19).');
  }
  if (
    !professionOrRole &&
    !collegeOrOrganization &&
    !streamOrField &&
    !whatImDoing
  ) {
    throw new Error('Please enter at least your profession, college, stream, or what you are currently doing.');
  }

  if (existingDocId) {
    const safeDocId = sanitizeId(existingDocId, existingDocId);
    const docRef = doc(db, COLLECTION_NAME, safeDocId);
    try {
      await updateDoc(docRef, {
        alumniId,
        alumniName,
        batchYear,
        pursuitCategory,
        professionOrRole,
        collegeOrOrganization,
        streamOrField,
        currentLocation,
        whatImDoing,
        updatedAt: serverTimestamp(),
      });
      return safeDocId;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${safeDocId}`);
    }
  }

  const newId = `journey_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const docRef = doc(db, COLLECTION_NAME, newId);
  const authorDisplayName = sanitizeText(user.displayName || user.email || 'Alumnus', LIMITS.authorDisplayName);

  try {
    await setDoc(docRef, {
      alumniId,
      alumniName,
      batchYear,
      pursuitCategory,
      professionOrRole,
      collegeOrOrganization,
      streamOrField,
      currentLocation,
      whatImDoing,
      visibility: 'public',
      authorUid: user.uid,
      authorDisplayName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return newId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${COLLECTION_NAME}/${newId}`);
  }
}

export async function deleteAlumniJourney(docId: string): Promise<void> {
  const safeId = sanitizeId(docId, docId);
  const docRef = doc(db, COLLECTION_NAME, safeId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${safeId}`);
  }
}
