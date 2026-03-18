import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, increment, getDocs } from "firebase/firestore";

// Firebase configuration - Replace these with your own Firebase config
// Get this from: Firebase Console > Project Settings > General > Your Apps
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef",
};

// Initialize Firebase (only on client side)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Activity ratings collection
export interface ActivityStats {
  thumbsUp: number;
  thumbsDown: number;
  favorites: number;
  shares: number;
}

// Get activity stats from Firestore
export async function getActivityStats(activityName: string): Promise<ActivityStats | null> {
  try {
    const docRef = doc(db, "activity-stats", activityName);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as ActivityStats;
    }
    return null;
  } catch (error) {
    console.error("Error getting activity stats:", error);
    return null;
  }
}

// Get all activity stats (for leaderboard/popular)
export async function getAllActivityStats(): Promise<ActivityStats[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "activity-stats"));
    const stats: ActivityStats[] = [];
    
    querySnapshot.forEach((doc) => {
      stats.push({
        ...doc.data() as ActivityStats,
      } as ActivityStats);
    });
    
    return stats;
  } catch (error) {
    console.error("Error getting all activity stats:", error);
    return [];
  }
}

// Increment a stat (thumbsUp, thumbsDown, favorites, shares)
export async function incrementStat(activityName: string, statType: keyof ActivityStats): Promise<boolean> {
  try {
    const docRef = doc(db, "activity-stats", activityName);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Update existing document
      await updateDoc(docRef, {
        [statType]: increment(1),
      });
    } else {
      // Create new document with initial values
      const initialStats: ActivityStats = {
        thumbsUp: statType === "thumbsUp" ? 1 : 0,
        thumbsDown: statType === "thumbsDown" ? 1 : 0,
        favorites: statType === "favorites" ? 1 : 0,
        shares: statType === "shares" ? 1 : 0,
      };
      await setDoc(docRef, initialStats);
    }
    
    return true;
  } catch (error) {
    console.error("Error incrementing stat:", error);
    return false;
  }
}

// Get top rated activities
export async function getTopRatedActivities(limit: number = 10): Promise<{ activity: string; stats: ActivityStats }[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "activity-stats"));
    const activities: { activity: string; stats: ActivityStats; score: number }[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data() as ActivityStats;
      // Calculate score: thumbsUp - thumbsDown + favorites * 2
      const score = data.thumbsUp - data.thumbsDown + data.favorites * 2 + data.shares;
      activities.push({
        activity: doc.id,
        stats: data,
        score,
      });
    });
    
    // Sort by score descending
    activities.sort((a, b) => b.score - a.score);
    
    return activities.slice(0, limit).map(({ activity, stats }) => ({ activity, stats }));
  } catch (error) {
    console.error("Error getting top rated activities:", error);
    return [];
  }
}

export { db };
