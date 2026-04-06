import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

let _currentWallet: string | undefined;

/** Call once when wallet state changes so events include the address. */
export function setAnalyticsWallet(address: string | undefined): void {
  _currentWallet = address;
}

/**
 * Write a silent event to the Firestore "events" collection.
 * Never throws — analytics must not break the calling code.
 */
export async function trackEvent(
  eventName: string,
  data?: Record<string, unknown>,
): Promise<void> {
  try {
    await addDoc(collection(db, 'events'), {
      eventName,
      walletAddress: _currentWallet ?? 'anonymous',
      timestamp: serverTimestamp(),
      ...(data ? { data } : {}),
    });
  } catch {
    // silent — analytics failures must never surface to the user
  }
}
