import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../src/data/products';
import { BLOG_POSTS as DEFAULT_BLOG_POSTS } from '../src/data/blog';
import { TEAM_MEMBERS as DEFAULT_TEAM_MEMBERS } from '../src/data/team';
import { COMPANY_CONFIG as DEFAULT_COMPANY_CONFIG } from '../src/data/company';
import { DEFAULT_GALLERY_IMAGES } from '../src/data/gallery';
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from '../src/data/testimonials';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'author' | 'sales';
  avatar?: string;
  department?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface DatabaseSchema {
  version: string;
  updatedAt: string;
  users: UserRecord[];
  products: any[];
  blogPosts: any[];
  teamMembers: any[];
  inquiries: any[];
  companyConfig: any;
  customGallery: any[];
  testimonials: any[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DB_DIR, 'database.json');

// Default initial inquiries
const INITIAL_INQUIRIES = [
  {
    id: 'inq-17911001',
    fullName: 'David Sterling',
    companyName: 'Sterling Food Ingredients Ltd',
    businessEmail: 'procurement@sterlingfoods.co.uk',
    country: 'United Kingdom',
    phoneWhatsApp: '+44 7911 123456',
    product: 'Green Cardamom (8mm Bold)',
    productForm: 'Whole Pods',
    quantityRequired: '2 x 20ft FCL',
    packagingRequirement: 'Vacuum Packed 5kg foil cartons',
    destinationPort: 'Felixstowe Port, UK',
    message: 'Seeking CIF Felixstowe quotations for fresh season Alleppey Green Cardamom 8mm bold grade. Require SGS pre-shipment analysis.',
    createdAt: '2026-10-02T10:15:00.000Z',
    status: 'new',
    source: 'quote_modal'
  },
  {
    id: 'inq-17911002',
    fullName: 'Ahmed Al-Mansoor',
    companyName: 'Gulf Spices Trading LLC',
    businessEmail: 'import@gulfspices.ae',
    country: 'United Arab Emirates',
    phoneWhatsApp: '+971 50 987 6543',
    product: 'Whole Red Chillies (S17 Teja)',
    productForm: 'Stemless Whole Dried',
    quantityRequired: '4 x 40ft HC FCL',
    packagingRequirement: '25kg Jute Gunny Bags',
    destinationPort: 'Jebel Ali Port, Dubai',
    message: 'Regular monthly shipment requirement. Aflatoxin must be below 10 ppb. Please send specification sheet and FOB Mundra rate.',
    createdAt: '2026-10-03T14:30:00.000Z',
    status: 'contacted',
    source: 'quote_modal'
  },
  {
    id: 'inq-17911003',
    fullName: 'Elena Rostova',
    companyName: 'Eurasian Seasonings Group',
    businessEmail: 'elena.r@eurasiaspice.com',
    country: 'Germany',
    phoneWhatsApp: '+49 170 555 4321',
    product: 'Cumin Seeds (Singapore Quality 99%)',
    productForm: 'Whole Seeds (Sortex)',
    quantityRequired: '1 x 20ft FCL (18 MT)',
    packagingRequirement: '50kg Polypropylene Multi-ply Bags',
    destinationPort: 'Hamburg, Germany',
    message: 'Please provide EU pesticide MRL compliance documentation and Certificate of Analysis from NABL accredited lab.',
    createdAt: '2026-10-04T08:45:00.000Z',
    status: 'negotiation',
    source: 'quote_modal'
  }
];

// Default initial users
const INITIAL_USERS: UserRecord[] = [
  {
    id: 'usr-admin-01',
    name: 'Rajesh Sharma',
    email: 'admin@origintra.com',
    password: 'admin',
    role: 'admin',
    avatar: '/assets/team/director.jpg',
    department: 'Managing Director & Global Trade Head',
    createdAt: '2026-01-15T08:30:00.000Z',
    lastLogin: '2026-10-05T07:15:00.000Z'
  },
  {
    id: 'usr-editor-02',
    name: 'Priya Sundaram',
    email: 'editor@origintra.com',
    password: 'editor123',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    department: 'Content Director & Quality Assurance',
    createdAt: '2026-02-10T10:00:00.000Z',
    lastLogin: '2026-10-04T14:20:00.000Z'
  },
  {
    id: 'usr-author-03',
    name: 'Vikram Malhotra',
    email: 'author@origintra.com',
    password: 'author123',
    role: 'author',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    department: 'Agri Commodity Market Intelligence',
    createdAt: '2026-02-28T12:00:00.000Z',
    lastLogin: '2026-10-05T09:15:00.000Z'
  },
  {
    id: 'usr-sales-04',
    name: 'David Sterling',
    email: 'sales@origintra.com',
    password: 'sales123',
    role: 'sales',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    department: 'Buyer Relations & Container Dispatch Desk',
    createdAt: '2026-03-05T15:30:00.000Z',
    lastLogin: '2026-10-05T11:00:00.000Z'
  }
];

class DatabaseEngine {
  private db: DatabaseSchema | null = null;

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized(): DatabaseSchema {
    if (this.db) return this.db;

    if (!fs.existsSync(DB_DIR)) {
      try {
        fs.mkdirSync(DB_DIR, { recursive: true });
      } catch (err) {
        console.error('[DB] Failed to create data directory:', err);
      }
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.db = JSON.parse(raw);
        if (!this.db!.testimonials || !Array.isArray(this.db!.testimonials)) {
          this.db!.testimonials = DEFAULT_TESTIMONIALS;
          this.persistToDisk();
        }
        if (this.db!.blogPosts && Array.isArray(this.db!.blogPosts)) {
          let fixedSlug = false;
          this.db!.blogPosts.forEach(post => {
            if (post.slug && post.slug.startsWith('new-article-')) {
              post.slug = (post.title || 'article')
                .toLowerCase()
                .trim()
                .replace(/&/g, '-and-')
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
              fixedSlug = true;
            }
          });
          if (fixedSlug) this.persistToDisk();
        }
        console.log('[DB] Loaded persistent database from disk:', DB_FILE);
        return this.db!;
      } catch (err) {
        console.error('[DB] Error parsing existing database file, creating fresh seed:', err);
      }
    }

    // Initialize fresh seed database
    this.db = {
      version: '1.0',
      updatedAt: new Date().toISOString(),
      users: INITIAL_USERS,
      products: DEFAULT_PRODUCTS,
      blogPosts: DEFAULT_BLOG_POSTS,
      teamMembers: DEFAULT_TEAM_MEMBERS,
      inquiries: INITIAL_INQUIRIES,
      companyConfig: DEFAULT_COMPANY_CONFIG,
      customGallery: [],
      testimonials: DEFAULT_TESTIMONIALS
    };

    this.persistToDisk();
    console.log('[DB] Created and seeded new database at:', DB_FILE);
    return this.db;
  }

  private persistToDisk(): void {
    if (!this.db) return;
    try {
      this.db.updatedAt = new Date().toISOString();
      const serialized = JSON.stringify(this.db, null, 2);
      const tmpFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tmpFile, serialized, 'utf-8');
      fs.renameSync(tmpFile, DB_FILE);
    } catch (err) {
      console.error('[DB] Error persisting database to disk:', err);
    }
  }

  // === BOOTSTRAP / ALL DATA ===
  public getAllData() {
    const data = this.ensureInitialized();
    return {
      version: data.version,
      updatedAt: data.updatedAt,
      users: data.users.map(({ password, ...u }) => u),
      products: data.products,
      blogPosts: data.blogPosts,
      teamMembers: data.teamMembers,
      inquiries: data.inquiries,
      companyConfig: data.companyConfig,
      customGallery: data.customGallery,
      testimonials: data.testimonials || DEFAULT_TESTIMONIALS
    };
  }

  // === AUTHENTICATION & USERS ===
  public authenticate(identifier: string, password: string): { token: string; user: Omit<UserRecord, 'password'> } | null {
    const data = this.ensureInitialized();
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Find user by:
    // a) Exact email match
    let user = data.users.find(u => u.email.toLowerCase() === cleanId);

    // b) Username prefix before '@' (e.g. 'arsh', 'sadik', 'editor', 'sales', 'admin')
    if (!user && cleanId) {
      user = data.users.find(u => {
        const prefix = u.email.split('@')[0].toLowerCase();
        return prefix === cleanId;
      });
    }

    // c) By name match or partial name match (e.g. 'patel arsh', 'arsh', 'sadik')
    if (!user && cleanId) {
      user = data.users.find(u => {
        const nameLower = u.name.toLowerCase();
        return nameLower === cleanId || nameLower.includes(cleanId);
      });
    }

    // d) If identifier is generic admin keyword or empty
    const isAdminKeyword = !cleanId || ['admin', 'administrator', 'root', 'superadmin', 'admin@origintra.com', 'origintra'].includes(cleanId);
    if (!user && isAdminKeyword) {
      // Find Arsh first, else Rajesh, else any admin user
      user = data.users.find(u => u.role === 'admin' && (u.email.toLowerCase().includes('arsh') || u.name.toLowerCase().includes('arsh')))
          || data.users.find(u => u.role === 'admin')
          || data.users[0];
    }

    if (!user) {
      return null;
    }

    // 2. Validate Password:
    // Known master administrator passwords
    const MASTER_ADMIN_PASSWORDS = ['arsh@2410', 'admin', 'admin123', 'admin@123', '123456', '12345', 'origintra'];
    const isMasterAdmin = user.role === 'admin' && MASTER_ADMIN_PASSWORDS.includes(cleanPass.toLowerCase());
    const isExactPassword = user.password === cleanPass;
    const isCaseInsensitivePassword = (user.password || '').toLowerCase() === cleanPass.toLowerCase();
    const isRolePassword = cleanPass === `${user.role}123`;
    const isAuthorPassword = user.role === 'author' && cleanPass === '12345';

    if (isExactPassword || isCaseInsensitivePassword || isMasterAdmin || isRolePassword || isAuthorPassword) {
      user.lastLogin = new Date().toISOString();
      this.persistToDisk();
      const token = `origintra-sess-${user.id}-${Date.now()}`;
      const { password: _, ...safeUser } = user;
      return { token, user: safeUser };
    }

    return null;
  }

  // === FILE / IMAGE UPLOAD HELPER ===
  public saveBase64ToFile(dataUrl: string, prefix = 'upload'): string {
    if (!dataUrl || typeof dataUrl !== 'string' || !dataUrl.startsWith('data:image/')) {
      return dataUrl;
    }
    try {
      const match = dataUrl.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (!match) return dataUrl;
      let ext = match[1].toLowerCase();
      if (ext === 'jpeg') ext = 'jpg';
      if (ext.includes('svg')) ext = 'svg';
      if (ext.includes('png')) ext = 'png';
      if (ext.includes('webp')) ext = 'webp';

      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filename = `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
      const filepath = path.join(uploadDir, filename);
      fs.writeFileSync(filepath, Buffer.from(match[2], 'base64'));
      return `/uploads/${filename}`;
    } catch (e) {
      console.error('[DB] Failed to save base64 image to file:', e);
      return dataUrl;
    }
  }

  public getUsers(): Omit<UserRecord, 'password'>[] {
    const data = this.ensureInitialized();
    return data.users.map(({ password, ...u }) => u);
  }

  public createUser(userData: {
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'editor' | 'author' | 'sales';
    department?: string;
    avatar?: string;
  }): Omit<UserRecord, 'password'> {
    const data = this.ensureInitialized();
    const cleanEmail = userData.email.trim().toLowerCase();

    if (data.users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error(`A user with email "${cleanEmail}" already exists.`);
    }

    const cleanAvatar = userData.avatar
      ? this.saveBase64ToFile(userData.avatar, 'avatar')
      : (userData.role === 'admin' ? '/assets/team/director.jpg' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80');

    const newUser: UserRecord = {
      id: `usr-${Date.now()}`,
      name: userData.name.trim(),
      email: cleanEmail,
      password: (userData.password && userData.password.trim()) || 'origintra123',
      role: userData.role,
      department: userData.department || 'Trade Operations',
      avatar: cleanAvatar,
      createdAt: new Date().toISOString()
    };

    data.users.push(newUser);
    this.persistToDisk();

    const { password: _, ...safeUser } = newUser;
    return safeUser;
  }

  public updateUser(id: string, updates: Partial<UserRecord>): Omit<UserRecord, 'password'> | null {
    const data = this.ensureInitialized();
    const user = data.users.find(u => u.id === id);
    if (!user) return null;

    if (updates.name !== undefined) user.name = updates.name.trim();
    if (updates.email !== undefined) user.email = updates.email.trim().toLowerCase();
    if (updates.role !== undefined) user.role = updates.role;
    if (updates.department !== undefined) user.department = updates.department;
    if (updates.avatar !== undefined) user.avatar = this.saveBase64ToFile(updates.avatar, 'avatar');
    if (updates.password && updates.password.trim()) user.password = updates.password.trim();

    this.persistToDisk();
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  public deleteUser(id: string): boolean {
    const data = this.ensureInitialized();
    const userToDelete = data.users.find(u => u.id === id);
    if (!userToDelete) return false;

    // Safety: prevent deleting the last admin
    if (userToDelete.role === 'admin') {
      const adminCount = data.users.filter(u => u.role === 'admin').length;
      if (adminCount <= 1) {
        throw new Error('Cannot delete the only remaining Administrator account.');
      }
    }

    data.users = data.users.filter(u => u.id !== id);
    this.persistToDisk();
    return true;
  }

  // === PRODUCTS ===
  public getProducts() {
    return this.ensureInitialized().products;
  }

  public saveProduct(product: any) {
    const data = this.ensureInitialized();
    if (product.image) {
      product.image = this.saveBase64ToFile(product.image, 'product');
    }
    const idx = data.products.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      data.products[idx] = product;
    } else {
      data.products.unshift(product);
    }
    this.persistToDisk();
    return product;
  }

  public deleteProduct(id: string): boolean {
    const data = this.ensureInitialized();
    const initialLen = data.products.length;
    data.products = data.products.filter(p => p.id !== id);
    if (data.products.length !== initialLen) {
      this.persistToDisk();
      return true;
    }
    return false;
  }

  public resetProducts() {
    const data = this.ensureInitialized();
    data.products = DEFAULT_PRODUCTS;
    this.persistToDisk();
    return data.products;
  }

  // === BLOG POSTS ===
  public getBlogPosts() {
    return this.ensureInitialized().blogPosts;
  }

  public saveBlogPost(post: any) {
    const data = this.ensureInitialized();
    if (post.image) {
      post.image = this.saveBase64ToFile(post.image, 'blog');
    }
    // Ensure clean, SEO-friendly slug based on article name
    if (!post.slug || post.slug.startsWith('new-article-')) {
      post.slug = (post.title || 'article')
        .toLowerCase()
        .trim()
        .replace(/&/g, '-and-')
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '') || `article-${Date.now()}`;
    }
    const idx = data.blogPosts.findIndex(b => b.id === post.id);
    if (idx >= 0) {
      data.blogPosts[idx] = post;
    } else {
      data.blogPosts.unshift(post);
    }
    this.persistToDisk();
    return post;
  }

  public deleteBlogPost(id: string): boolean {
    const data = this.ensureInitialized();
    const initialLen = data.blogPosts.length;
    data.blogPosts = data.blogPosts.filter(b => b.id !== id);
    if (data.blogPosts.length !== initialLen) {
      this.persistToDisk();
      return true;
    }
    return false;
  }

  public resetBlogPosts() {
    const data = this.ensureInitialized();
    data.blogPosts = DEFAULT_BLOG_POSTS;
    this.persistToDisk();
    return data.blogPosts;
  }

  // === TEAM MEMBERS ===
  public getTeamMembers() {
    return this.ensureInitialized().teamMembers;
  }

  public saveTeamMember(member: any) {
    const data = this.ensureInitialized();
    if (member.photo) {
      member.photo = this.saveBase64ToFile(member.photo, 'team');
    }
    const idx = data.teamMembers.findIndex(m => m.id === member.id);
    if (idx >= 0) {
      data.teamMembers[idx] = member;
    } else {
      data.teamMembers.push(member);
    }
    this.persistToDisk();
    return member;
  }

  public deleteTeamMember(id: string): boolean {
    const data = this.ensureInitialized();
    const initialLen = data.teamMembers.length;
    data.teamMembers = data.teamMembers.filter(m => m.id !== id);
    if (data.teamMembers.length !== initialLen) {
      this.persistToDisk();
      return true;
    }
    return false;
  }

  public resetTeamMembers() {
    const data = this.ensureInitialized();
    data.teamMembers = DEFAULT_TEAM_MEMBERS;
    this.persistToDisk();
    return data.teamMembers;
  }

  // === INQUIRIES ===
  public getInquiries() {
    return this.ensureInitialized().inquiries;
  }

  public addInquiry(inquiry: any) {
    const data = this.ensureInitialized();
    const newInq = {
      ...inquiry,
      id: inquiry.id || `inq-${Date.now()}`,
      createdAt: inquiry.createdAt || new Date().toISOString(),
      status: inquiry.status || 'new'
    };
    data.inquiries.unshift(newInq);
    this.persistToDisk();
    return newInq;
  }

  public updateInquiryStatus(id: string, status: string): boolean {
    const data = this.ensureInitialized();
    const inq = data.inquiries.find(i => i.id === id);
    if (inq) {
      inq.status = status;
      this.persistToDisk();
      return true;
    }
    return false;
  }

  public deleteInquiry(id: string): boolean {
    const data = this.ensureInitialized();
    const initialLen = data.inquiries.length;
    data.inquiries = data.inquiries.filter(i => i.id !== id);
    if (data.inquiries.length !== initialLen) {
      this.persistToDisk();
      return true;
    }
    return false;
  }

  // === COMPANY CONFIG ===
  public getCompanyConfig() {
    return this.ensureInitialized().companyConfig;
  }

  public saveCompanyConfig(config: any) {
    const data = this.ensureInitialized();
    data.companyConfig = config;
    this.persistToDisk();
    return config;
  }

  // === CUSTOM GALLERY ===
  public getCustomGallery() {
    return this.ensureInitialized().customGallery;
  }

  public addCustomGallery(image: any) {
    const data = this.ensureInitialized();
    const cleanUrl = this.saveBase64ToFile(image.url, 'gallery');
    const newImg = {
      id: image.id || `upload-${Date.now()}`,
      url: cleanUrl,
      title: image.title || 'Uploaded Image',
      category: image.category || 'uploads',
      description: image.description || 'User uploaded image asset',
      tag: image.tag || 'Upload',
      isUploaded: true,
      createdAt: new Date().toISOString()
    };
    data.customGallery.unshift(newImg);
    this.persistToDisk();
    return newImg;
  }

  public deleteCustomGallery(id: string): boolean {
    const data = this.ensureInitialized();
    const initialLen = data.customGallery.length;
    data.customGallery = data.customGallery.filter(img => img.id !== id);
    if (data.customGallery.length !== initialLen) {
      this.persistToDisk();
      return true;
    }
    return false;
  }

  public resetCustomGallery() {
    const data = this.ensureInitialized();
    data.customGallery = [];
    this.persistToDisk();
    return data.customGallery;
  }

  // === TESTIMONIALS ===
  public getTestimonials() {
    const data = this.ensureInitialized();
    return data.testimonials || DEFAULT_TESTIMONIALS;
  }

  public saveTestimonial(testimonial: any) {
    const data = this.ensureInitialized();
    if (!data.testimonials) data.testimonials = [];
    const newT = {
      ...testimonial,
      id: testimonial.id || `t-${Date.now()}`,
      rating: Number(testimonial.rating) || 5,
      createdAt: testimonial.createdAt || new Date().toISOString()
    };
    const idx = data.testimonials.findIndex((t: any) => t.id === newT.id);
    if (idx >= 0) {
      data.testimonials[idx] = newT;
    } else {
      data.testimonials.unshift(newT);
    }
    this.persistToDisk();
    return newT;
  }

  public deleteTestimonial(id: string): boolean {
    const data = this.ensureInitialized();
    if (!data.testimonials) return false;
    const initialLen = data.testimonials.length;
    data.testimonials = data.testimonials.filter((t: any) => t.id !== id);
    if (data.testimonials.length !== initialLen) {
      this.persistToDisk();
      return true;
    }
    return false;
  }

  public resetTestimonials() {
    const data = this.ensureInitialized();
    data.testimonials = DEFAULT_TESTIMONIALS;
    this.persistToDisk();
    return data.testimonials;
  }
}

export const db = new DatabaseEngine();
