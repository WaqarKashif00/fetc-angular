// src/app/services/firebase.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';
import { environment } from '../../enviroments/enviroments';

export interface Blog {
  id?: string;
  title: string;
  content: string;
  createdAt: Date | Timestamp;
  imageUrl?: string;
}

export interface FAQ {
  id?: string;
  question: string;
  answer: string;
  createdAt: Date | Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);
  private db = getFirestore(this.app);
  private storage = getStorage(this.app);
  
  // Signals for reactive state
  private currentUserSignal = signal<User | null>(null);
  private blogsSignal = signal<Blog[]>([]);
  private faqsSignal = signal<FAQ[]>([]);
  private loadingSignal = signal<boolean>(false);
  private authInitializedSignal = signal<boolean>(false);
  
  // Public computed signals
  currentUser = this.currentUserSignal.asReadonly();
  isAuthenticated = computed(() => this.currentUserSignal() !== null);
  blogs = this.blogsSignal.asReadonly();
  faqs = this.faqsSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();
  authInitialized = this.authInitializedSignal.asReadonly();
  
  constructor() {
    // Set persistence to LOCAL (survives browser restarts)
    setPersistence(this.auth, browserLocalPersistence).then(() => {
      console.log('Firebase persistence set to LOCAL');
    }).catch((error) => {
      console.error('Error setting persistence:', error);
    });
    
    this.initAuthListener();
    this.initBlogsListener();
    this.initFAQsListener();
  }
  
  private initAuthListener(): void {
    onAuthStateChanged(this.auth, (user) => {
      console.log('Auth state changed:', user ? user.email : 'No user');
      this.currentUserSignal.set(user);
      this.authInitializedSignal.set(true);
    });
  }
  
  private initBlogsListener(): void {
    const blogsPath = `artifacts/${environment.appId}/public/data/blogs`;
    const blogsRef = collection(this.db, blogsPath);
    const q = query(blogsRef, orderBy('createdAt', 'desc'));
    
    onSnapshot(q, (snapshot) => {
      const blogs: Blog[] = [];
      snapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() } as Blog);
      });
      this.blogsSignal.set(blogs);
    });
  }
  
  private initFAQsListener(): void {
    const faqsPath = `artifacts/${environment.appId}/public/data/faqs`;
    const faqsRef = collection(this.db, faqsPath);
    const q = query(faqsRef, orderBy('createdAt', 'asc'));
    
    onSnapshot(q, (snapshot) => {
      const faqs: FAQ[] = [];
      snapshot.forEach((doc) => {
        faqs.push({ id: doc.id, ...doc.data() } as FAQ);
      });
      this.faqsSignal.set(faqs);
    });
  }
  
  // Authentication methods
  async login(email: string, password: string): Promise<void> {
    this.loadingSignal.set(true);
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('Login successful:', userCredential.user.email);
      this.currentUserSignal.set(userCredential.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      this.loadingSignal.set(false);
    }
  }
  
  async logout(): Promise<void> {
    this.loadingSignal.set(true);
    try {
      await signOut(this.auth);
      console.log('Logout successful');
      this.currentUserSignal.set(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      this.loadingSignal.set(false);
    }
  }
  
  // Blog management methods
  async uploadBlogImage(file: File): Promise<string> {
    try {
      console.log('Starting image upload:', file.name, 'Size:', file.size, 'Type:', file.type);
      
      const timestamp = Date.now();
      const fileName = `blog-images/${timestamp}_${file.name}`;
      const storageRef = ref(this.storage, fileName);
      
      console.log('Uploading to path:', fileName);
      const uploadResult = await uploadBytes(storageRef, file);
      console.log('Upload successful, getting download URL...');
      
      const downloadURL = await getDownloadURL(uploadResult.ref);
      console.log('Download URL obtained:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Failed to upload image. Please check Firebase Storage configuration.');
    }
  }
  
  async addBlog(blogData: Omit<Blog, 'id'>, imageFile?: File): Promise<void> {
    try {
      const blogsPath = `artifacts/${environment.appId}/public/data/blogs`;
      const blogsRef = collection(this.db, blogsPath);
      
      let imageUrl = blogData.imageUrl;
      
      if (imageFile) {
        console.log('Image file provided, uploading...');
        imageUrl = await this.uploadBlogImage(imageFile);
        console.log('Image uploaded, URL:', imageUrl);
      } else if (imageUrl) {
        console.log('Using provided image URL:', imageUrl);
      }
      
      const blogToSave = {
        title: blogData.title,
        content: blogData.content,
        imageUrl: imageUrl || '',
        createdAt: Timestamp.now()
      };
      
      console.log('Saving blog to Firestore:', blogToSave);
      await addDoc(blogsRef, blogToSave);
      console.log('Blog saved successfully');
    } catch (error) {
      console.error('Error adding blog:', error);
      throw error;
    }
  }
  
  async updateBlog(id: string, data: Partial<Blog>, imageFile?: File): Promise<void> {
    try {
      const blogsPath = `artifacts/${environment.appId}/public/data/blogs`;
      const blogRef = doc(this.db, blogsPath, id);
      
      let updateData = { ...data };
      
      if (imageFile) {
        console.log('Updating with new image file...');
        const imageUrl = await this.uploadBlogImage(imageFile);
        updateData = { ...updateData, imageUrl };
        console.log('New image URL:', imageUrl);
      }
      
      console.log('Updating blog in Firestore:', updateData);
      await updateDoc(blogRef, updateData);
      console.log('Blog updated successfully');
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  }
  
  async deleteBlog(id: string): Promise<void> {
    const blogsPath = `artifacts/${environment.appId}/public/data/blogs`;
    const blogRef = doc(this.db, blogsPath, id);
    
    await deleteDoc(blogRef);
  }
  
  // FAQ management methods
  async addFAQ(faqData: Omit<FAQ, 'id'>): Promise<void> {
    const faqsPath = `artifacts/${environment.appId}/public/data/faqs`;
    const faqsRef = collection(this.db, faqsPath);
    
    await addDoc(faqsRef, {
      ...faqData,
      createdAt: Timestamp.now()
    });
  }
  
  async updateFAQ(id: string, data: Partial<FAQ>): Promise<void> {
    const faqsPath = `artifacts/${environment.appId}/public/data/faqs`;
    const faqRef = doc(this.db, faqsPath, id);
    
    await updateDoc(faqRef, data);
  }
  
  async deleteFAQ(id: string): Promise<void> {
    const faqsPath = `artifacts/${environment.appId}/public/data/faqs`;
    const faqRef = doc(this.db, faqsPath, id);
    
    await deleteDoc(faqRef);
  }
  
  // Helper method to get a single blog by ID
  getBlogById(id: string): Blog | undefined {
    return this.blogs().find(blog => blog.id === id);
  }
}