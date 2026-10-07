import { Product, BlogPost, Inquiry, TeamMember, User, UserRole, Testimonial } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { BLOG_POSTS as DEFAULT_BLOG_POSTS } from '../data/blog';
import { TEAM_MEMBERS as DEFAULT_TEAM_MEMBERS } from '../data/team';
import { COMPANY_CONFIG as DEFAULT_COMPANY_CONFIG, CompanyConfig } from '../data/company';
import { DEFAULT_GALLERY_IMAGES, GalleryImage } from '../data/gallery';
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from '../data/testimonials';
import { slugify } from '../utils/slugify';

// LocalStorage Keys
const STORAGE_KEYS = {
  PRODUCTS: 'origintra_admin_products_v1',
  BLOG_POSTS: 'origintra_admin_blog_posts_v1',
  TEAM_MEMBERS: 'origintra_admin_team_members_v1',
  INQUIRIES: 'origintra_admin_inquiries_v1',
  COMPANY: 'origintra_admin_company_v1',
  CUSTOM_GALLERY: 'origintra_admin_custom_gallery_v1',
  TESTIMONIALS: 'origintra_admin_testimonials_v1',
  AUTH: 'origintra_admin_auth_v1',
  AUTH_USER: 'origintra_admin_auth_user_v1',
  AUTH_TOKEN: 'origintra_admin_auth_token_v1',
  USERS: 'origintra_admin_users_v1',
  PASSWORD: 'origintra_admin_password_v1'
};

const DEFAULT_USERS: User[] = [
  {
    id: 'usr-admin-01',
    name: 'Rajesh Sharma',
    email: 'info@patelarsh.com',
    password: 'Arsh@2410',
    role: 'admin',
    avatar: '/assets/team/director.jpg',
    department: 'Managing Director & Global Trade Head',
    createdAt: '2026-01-15T08:30:00.000Z'
  },
  {
    id: 'usr-1791183682976',
    name: 'Patel Arsh',
    email: 'arsh@origintra.com',
    password: 'Arsh@2410',
    role: 'admin',
    avatar: '/assets/team/director.jpg',
    department: 'Corporate Admin & Global Trading Desk',
    createdAt: '2026-10-05T06:58:00.000Z'
  },
  {
    id: 'usr-editor-02',
    name: 'Priya Sundaram',
    email: 'editor@origintra.com',
    password: 'editor123',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    department: 'Content Director & Quality Assurance',
    createdAt: '2026-02-10T10:00:00.000Z'
  },
  {
    id: 'usr-author-03',
    name: 'Vikram Malhotra',
    email: 'author@origintra.com',
    password: 'author123',
    role: 'author',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    department: 'Agri Commodity Market Intelligence',
    createdAt: '2026-02-28T12:00:00.000Z'
  },
  {
    id: 'usr-1791183469258',
    name: 'Sadik',
    email: 'sadik@origintra.com',
    password: '12345',
    role: 'author',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    department: 'Commodity Research Analyst',
    createdAt: '2026-10-05T06:57:49.000Z'
  },
  {
    id: 'usr-sales-04',
    name: 'David Sterling',
    email: 'sales@origintra.com',
    password: 'sales123',
    role: 'sales',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    department: 'Buyer Relations & Container Dispatch Desk',
    createdAt: '2026-03-05T15:30:00.000Z'
  }
];

// Initial seed inquiries
const INITIAL_INQUIRIES: Inquiry[] = [
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

// Helper to fire non-blocking API call
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const res = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    console.warn(`[AdminStorage API Call to ${endpoint} failed, falling back to local storage]:`, e);
    return null;
  }
}

let isBootstrapping = false;

export const AdminStorage = {
  // === BOOTSTRAP / SYNC WITH DATABASE ===
  async syncWithDatabase(): Promise<boolean> {
    if (isBootstrapping) return false;
    isBootstrapping = true;
    try {
      const resp = await apiCall('/api/bootstrap');
      if (resp && resp.success && resp.data) {
        const { users, products, blogPosts, teamMembers, inquiries, companyConfig, customGallery } = resp.data;

        if (users && users.length) {
          localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
          window.dispatchEvent(new Event('origintra_users_updated'));
        }
        if (products && products.length) {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
          window.dispatchEvent(new Event('origintra_products_updated'));
        }
        if (blogPosts && blogPosts.length) {
          blogPosts.forEach((p: BlogPost) => {
            if (p.slug && p.slug.startsWith('new-article-')) {
              p.slug = slugify(p.title) || p.slug;
            }
          });
          localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(blogPosts));
          window.dispatchEvent(new Event('origintra_blog_updated'));
        }
        if (teamMembers && teamMembers.length) {
          localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(teamMembers));
          window.dispatchEvent(new Event('origintra_team_updated'));
        }
        if (inquiries && inquiries.length) {
          localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
          window.dispatchEvent(new Event('origintra_inquiries_updated'));
        }
        if (companyConfig) {
          localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(companyConfig));
          window.dispatchEvent(new Event('origintra_company_updated'));
        }
        if (customGallery) {
          localStorage.setItem(STORAGE_KEYS.CUSTOM_GALLERY, JSON.stringify(customGallery));
          window.dispatchEvent(new Event('origintra_gallery_updated'));
        }
        if (resp.data.testimonials && resp.data.testimonials.length) {
          localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(resp.data.testimonials));
          window.dispatchEvent(new Event('origintra_testimonials_updated'));
        }
        return true;
      }
    } catch (e) {
      console.warn('[AdminStorage sync failed]:', e);
    } finally {
      isBootstrapping = false;
    }
    return false;
  },

  // === AUTHENTICATION & SESSIONS ===
  isAuthenticated(): boolean {
    try {
      const hasAuthFlag = localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
      const currentUser = this.getCurrentUser();
      return hasAuthFlag || currentUser !== null;
    } catch {
      return false;
    }
  },

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      if (userStr) {
        return JSON.parse(userStr);
      }
      // If legacy auth is true, return default admin
      if (localStorage.getItem(STORAGE_KEYS.AUTH) === 'true') {
        return DEFAULT_USERS[0];
      }
    } catch (e) {
      console.error('Error reading current auth user:', e);
    }
    return null;
  },

  getAuthToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch {
      return null;
    }
  },

  hasRole(allowedRoles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    return allowedRoles.includes(user.role);
  },

  async login(password: string): Promise<boolean> {
    return (await this.loginWithCredentials('admin@origintra.com', password)).success;
  },

  async loginWithCredentials(identifier: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const cleanId = (identifier || '').trim();
    const cleanPass = (password || '').trim();

    try {
      // 1. Try server API login
      const resp = await apiCall('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: cleanId, password: cleanPass })
      });

      if (resp && resp.success && resp.user) {
        const user: User = resp.user;
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, resp.token || `origintra-token-${Date.now()}`);
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
        window.dispatchEvent(new Event('origintra_auth_updated'));
        return { success: true, user };
      }
    } catch (err: any) {
      console.warn('Backend login request error, checking local fallback:', err);
    }

    // 2. Local Fallback for offline or fast dev access
    const users = this.getUsers();
    const lowerId = cleanId.toLowerCase();

    // Find user by exact email, username prefix, or name
    let matched = users.find(u => u.email.toLowerCase() === lowerId);
    if (!matched && lowerId) {
      matched = users.find(u => u.email.split('@')[0].toLowerCase() === lowerId);
    }
    if (!matched && lowerId) {
      matched = users.find(u => u.name.toLowerCase() === lowerId || u.name.toLowerCase().includes(lowerId));
    }
    // Admin keyword or blank fallback
    const isAdminKeyword = !lowerId || ['admin', 'administrator', 'root', 'superadmin', 'admin@origintra.com', 'origintra'].includes(lowerId);
    if (!matched && isAdminKeyword) {
      matched = users.find(u => u.role === 'admin' && (u.email.toLowerCase().includes('arsh') || u.name.toLowerCase().includes('arsh')))
        || users.find(u => u.role === 'admin')
        || DEFAULT_USERS[0];
    }

    if (matched) {
      const MASTER_PASSWORDS = ['arsh@2410', 'admin', 'admin123', 'admin@123', '123456', '12345', 'origintra'];
      const isMasterAdmin = matched.role === 'admin' && MASTER_PASSWORDS.includes(cleanPass.toLowerCase());
      const isExactPass = matched.password === cleanPass;
      const isCaseInsensitivePass = (matched.password || '').toLowerCase() === cleanPass.toLowerCase();
      const isRolePass = cleanPass === `${matched.role}123`;
      const isAuthorPass = matched.role === 'author' && cleanPass === '12345';
      const isStoredPass = cleanPass === (localStorage.getItem(STORAGE_KEYS.PASSWORD) || 'admin');

      if (isExactPass || isCaseInsensitivePass || isMasterAdmin || isRolePass || isAuthorPass || isStoredPass) {
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `origintra-sess-${matched.id}-${Date.now()}`);
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(matched));
        window.dispatchEvent(new Event('origintra_auth_updated'));
        return { success: true, user: matched };
      }
    }

    return { success: false, error: 'Invalid email/username or password. Master admin password: Arsh@2410 or admin.' };
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    window.dispatchEvent(new Event('origintra_auth_updated'));
  },

  switchUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `origintra-sess-${user.id}-${Date.now()}`);
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    window.dispatchEvent(new Event('origintra_auth_updated'));
  },

  changePassword(newPassword: string): void {
    localStorage.setItem(STORAGE_KEYS.PASSWORD, newPassword);
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.updateUser(currentUser.id, { password: newPassword });
    }
  },

  // === USER MANAGEMENT (RBAC) ===
  getUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USERS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading users from storage:', e);
    }
    return DEFAULT_USERS;
  },

  async createUser(userData: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    department?: string;
    avatar?: string;
  }): Promise<User> {
    const users = this.getUsers();
    const cleanEmail = userData.email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error(`A user with email "${cleanEmail}" already exists.`);
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name.trim(),
      email: cleanEmail,
      role: userData.role,
      department: userData.department || 'Trade Operations',
      avatar: userData.avatar || (userData.role === 'admin' ? '/assets/team/director.jpg' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'),
      createdAt: new Date().toISOString()
    };

    const updated = [...users, newUser];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updated));
    window.dispatchEvent(new Event('origintra_users_updated'));

    // Server write
    apiCall('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });

    return newUser;
  },

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;

    const updatedUser: User = { ...users[idx], ...updates };
    users[idx] = updatedUser;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // If updating current active user, sync session
    const current = this.getCurrentUser();
    if (current && current.id === id) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('origintra_auth_updated'));
    }

    window.dispatchEvent(new Event('origintra_users_updated'));

    // Server write
    apiCall(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });

    return updatedUser;
  },

  async deleteUser(id: string): Promise<boolean> {
    const users = this.getUsers();
    const target = users.find(u => u.id === id);
    if (!target) return false;

    if (target.role === 'admin' && users.filter(u => u.role === 'admin').length <= 1) {
      throw new Error('Cannot delete the sole remaining Administrator account.');
    }

    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
    window.dispatchEvent(new Event('origintra_users_updated'));

    // Server write
    apiCall(`/api/users/${id}`, { method: 'DELETE' });
    return true;
  },

  // === PRODUCTS ===
  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading products from storage:', e);
    }
    return DEFAULT_PRODUCTS;
  },

  saveProduct(product: Product): Product {
    const products = this.getProducts();
    const existingIndex = products.findIndex(p => p.id === product.id);

    let updated: Product[];
    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = product;
    } else {
      updated = [product, ...products];
    }

    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('origintra_products_updated'));

    // Server write
    apiCall('/api/products', {
      method: 'POST',
      body: JSON.stringify(product)
    });

    return product;
  },

  deleteProduct(productId: string): boolean {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== productId);
    if (filtered.length !== products.length) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
      window.dispatchEvent(new Event('origintra_products_updated'));

      apiCall(`/api/products/${productId}`, { method: 'DELETE' });
      return true;
    }
    return false;
  },

  resetProductsToDefault(): void {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    window.dispatchEvent(new Event('origintra_products_updated'));
    apiCall('/api/products/reset', { method: 'POST' });
  },

  // === BLOG POSTS ===
  getBlogPosts(): BlogPost[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
      if (data) {
        const parsed: BlogPost[] = JSON.parse(data);
        let hasLegacySlug = false;
        parsed.forEach(p => {
          if (p.slug && p.slug.startsWith('new-article-')) {
            p.slug = slugify(p.title) || p.slug;
            hasLegacySlug = true;
          }
        });
        if (hasLegacySlug) {
          localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(parsed));
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error reading blog posts from storage:', e);
    }
    return DEFAULT_BLOG_POSTS;
  },

  saveBlogPost(post: BlogPost): BlogPost {
    // Ensure slug is clean and based on article title
    if (!post.slug || post.slug.startsWith('new-article-')) {
      post.slug = slugify(post.title) || `article-${Date.now()}`;
    } else {
      post.slug = slugify(post.slug);
    }

    const posts = this.getBlogPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);

    let updated: BlogPost[];
    if (existingIndex >= 0) {
      updated = [...posts];
      updated[existingIndex] = post;
    } else {
      updated = [post, ...posts];
    }

    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(updated));
    window.dispatchEvent(new Event('origintra_blog_updated'));

    // Server write
    apiCall('/api/blog', {
      method: 'POST',
      body: JSON.stringify(post)
    });

    return post;
  },

  deleteBlogPost(postId: string): boolean {
    const posts = this.getBlogPosts();
    const filtered = posts.filter(p => p.id !== postId);
    if (filtered.length !== posts.length) {
      localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(filtered));
      window.dispatchEvent(new Event('origintra_blog_updated'));

      apiCall(`/api/blog/${postId}`, { method: 'DELETE' });
      return true;
    }
    return false;
  },

  resetBlogPostsToDefault(): void {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(DEFAULT_BLOG_POSTS));
    window.dispatchEvent(new Event('origintra_blog_updated'));
    apiCall('/api/blog/reset', { method: 'POST' });
  },

  // === TEAM MEMBERS ===
  getTeamMembers(): TeamMember[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEAM_MEMBERS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading team members from storage:', e);
    }
    return DEFAULT_TEAM_MEMBERS;
  },

  saveTeamMember(member: TeamMember): TeamMember {
    const team = this.getTeamMembers();
    const existingIndex = team.findIndex(m => m.id === member.id);

    let updated: TeamMember[];
    if (existingIndex >= 0) {
      updated = [...team];
      updated[existingIndex] = member;
    } else {
      updated = [...team, member];
    }

    localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(updated));
    window.dispatchEvent(new Event('origintra_team_updated'));

    apiCall('/api/team', {
      method: 'POST',
      body: JSON.stringify(member)
    });

    return member;
  },

  deleteTeamMember(memberId: string): boolean {
    const team = this.getTeamMembers();
    const filtered = team.filter(m => m.id !== memberId);
    if (filtered.length !== team.length) {
      localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(filtered));
      window.dispatchEvent(new Event('origintra_team_updated'));

      apiCall(`/api/team/${memberId}`, { method: 'DELETE' });
      return true;
    }
    return false;
  },

  resetTeamMembersToDefault(): void {
    localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(DEFAULT_TEAM_MEMBERS));
    window.dispatchEvent(new Event('origintra_team_updated'));
    apiCall('/api/team/reset', { method: 'POST' });
  },

  // === INQUIRIES & LEADS ===
  getInquiries(): Inquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading inquiries from storage:', e);
    }
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
    return INITIAL_INQUIRIES;
  },

  addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'> & { status?: Inquiry['status'] }): Inquiry {
    const inquiries = this.getInquiries();
    const newInq: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: inquiry.status || 'new'
    };
    const updated = [newInq, ...inquiries];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    window.dispatchEvent(new Event('origintra_inquiries_updated'));

    apiCall('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(newInq)
    });

    return newInq;
  },

  updateInquiryStatus(id: string, status: Inquiry['status']): boolean {
    const inquiries = this.getInquiries();
    const index = inquiries.findIndex(i => i.id === id);
    if (index >= 0) {
      inquiries[index].status = status;
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
      window.dispatchEvent(new Event('origintra_inquiries_updated'));

      apiCall(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      return true;
    }
    return false;
  },

  deleteInquiry(id: string): boolean {
    const inquiries = this.getInquiries();
    const filtered = inquiries.filter(i => i.id !== id);
    if (filtered.length !== inquiries.length) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(filtered));
      window.dispatchEvent(new Event('origintra_inquiries_updated'));

      apiCall(`/api/inquiries/${id}`, { method: 'DELETE' });
      return true;
    }
    return false;
  },

  exportInquiriesCSV(): void {
    const inquiries = this.getInquiries();
    if (inquiries.length === 0) return;

    const headers = ['ID', 'Date', 'Full Name', 'Company', 'Email', 'Phone/WhatsApp', 'Country', 'Product', 'Quantity', 'Port', 'Status', 'Message'];
    const rows = inquiries.map(i => [
      `"${i.id}"`,
      `"${new Date(i.createdAt).toLocaleString()}"`,
      `"${(i.fullName || '').replace(/"/g, '""')}"`,
      `"${(i.companyName || '').replace(/"/g, '""')}"`,
      `"${i.businessEmail || ''}"`,
      `"${i.phoneWhatsApp || ''}"`,
      `"${(i.country || '').replace(/"/g, '""')}"`,
      `"${(i.product || '').replace(/"/g, '""')}"`,
      `"${(i.quantityRequired || '').replace(/"/g, '""')}"`,
      `"${(i.destinationPort || '').replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${(i.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Origintra_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // === COMPANY CONFIG ===
  getCompanyConfig(): CompanyConfig {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPANY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading company config:', e);
    }
    return DEFAULT_COMPANY_CONFIG;
  },

  saveCompanyConfig(config: CompanyConfig): CompanyConfig {
    localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(config));
    window.dispatchEvent(new Event('origintra_company_updated'));

    apiCall('/api/company', {
      method: 'POST',
      body: JSON.stringify(config)
    });

    return config;
  },

  // === MEDIA GALLERY ===
  getGalleryImages(): GalleryImage[] {
    try {
      const customData = localStorage.getItem(STORAGE_KEYS.CUSTOM_GALLERY);
      const customImages: GalleryImage[] = customData ? JSON.parse(customData) : [];
      return [...customImages, ...DEFAULT_GALLERY_IMAGES];
    } catch (e) {
      console.error('Error reading gallery images:', e);
      return DEFAULT_GALLERY_IMAGES;
    }
  },

  async addCustomGalleryImage(image: { url: string; title: string; category?: GalleryImage['category']; description?: string; tag?: string }): Promise<GalleryImage> {
    const tempId = `upload-${Date.now()}`;
    let finalUrl = image.url;
    let finalId = tempId;

    // 1. Upload to server to persist directly on disk as a static file
    try {
      const resp = await apiCall('/api/upload', {
        method: 'POST',
        body: JSON.stringify({
          data: image.url,
          title: image.title || 'Uploaded Image',
          category: image.category || 'uploads',
          tag: image.tag || 'Upload',
          description: image.description || 'User uploaded image asset'
        })
      });

      if (resp && resp.success && resp.url) {
        finalUrl = resp.url;
        if (resp.image?.id) finalId = resp.image.id;
      }
    } catch (e) {
      console.warn('Backend upload api failed, falling back to local storage:', e);
    }

    const newImage: GalleryImage = {
      id: finalId,
      url: finalUrl,
      title: image.title || 'Uploaded Image',
      category: image.category || 'uploads',
      description: image.description || 'User uploaded image asset',
      tag: image.tag || 'Upload',
      isUploaded: true,
      createdAt: new Date().toISOString()
    };

    // 2. Update local state with robust quota overflow protection
    try {
      const customData = localStorage.getItem(STORAGE_KEYS.CUSTOM_GALLERY);
      let customImages: GalleryImage[] = customData ? JSON.parse(customData) : [];
      customImages = customImages.filter(img => img.id !== newImage.id);
      customImages.unshift(newImage);
      if (customImages.length > 40) customImages = customImages.slice(0, 40);

      localStorage.setItem(STORAGE_KEYS.CUSTOM_GALLERY, JSON.stringify(customImages));
    } catch (quotaErr) {
      console.warn('LocalStorage quota warning, trimming heavy base64 items:', quotaErr);
      try {
        const customData = localStorage.getItem(STORAGE_KEYS.CUSTOM_GALLERY);
        let customImages: GalleryImage[] = customData ? JSON.parse(customData) : [];
        customImages = customImages.filter(img => !img.url.startsWith('data:image/')).slice(0, 15);
        customImages.unshift(newImage);
        localStorage.setItem(STORAGE_KEYS.CUSTOM_GALLERY, JSON.stringify(customImages));
      } catch {
        // Non-fatal, server DB already has the file
      }
    }

    window.dispatchEvent(new Event('origintra_gallery_updated'));
    return newImage;
  },

  deleteCustomGalleryImage(imageId: string): boolean {
    try {
      const customData = localStorage.getItem(STORAGE_KEYS.CUSTOM_GALLERY);
      if (!customData) return false;
      const customImages: GalleryImage[] = JSON.parse(customData);
      const filtered = customImages.filter(img => img.id !== imageId);
      if (filtered.length !== customImages.length) {
        localStorage.setItem(STORAGE_KEYS.CUSTOM_GALLERY, JSON.stringify(filtered));
        window.dispatchEvent(new Event('origintra_gallery_updated'));

        apiCall(`/api/gallery/${imageId}`, { method: 'DELETE' });
        return true;
      }
    } catch (e) {
      console.error('Error deleting custom gallery image:', e);
    }
    return false;
  },

  resetCustomGallery(): void {
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_GALLERY);
    window.dispatchEvent(new Event('origintra_gallery_updated'));
    apiCall('/api/gallery/reset', { method: 'POST' });
  },

  // === BUYER TESTIMONIALS & TRADE REFERENCES ===
  getTestimonials(): Testimonial[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading testimonials:', e);
    }
    return DEFAULT_TESTIMONIALS;
  },

  async saveTestimonial(testimonial: Testimonial): Promise<Testimonial> {
    const testimonials = this.getTestimonials();
    const index = testimonials.findIndex(t => t.id === testimonial.id);
    let updated: Testimonial;

    if (index >= 0) {
      updated = { ...testimonial };
      testimonials[index] = updated;
    } else {
      updated = {
        ...testimonial,
        id: testimonial.id || `t-${Date.now()}`,
        rating: Number(testimonial.rating) || 5,
        createdAt: testimonial.createdAt || new Date().toISOString()
      };
      testimonials.unshift(updated);
    }

    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    window.dispatchEvent(new Event('origintra_testimonials_updated'));

    apiCall('/api/testimonials', {
      method: 'POST',
      body: JSON.stringify(updated)
    });

    return updated;
  },

  async deleteTestimonial(id: string): Promise<boolean> {
    const testimonials = this.getTestimonials();
    const filtered = testimonials.filter(t => t.id !== id);
    if (filtered.length !== testimonials.length) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(filtered));
      window.dispatchEvent(new Event('origintra_testimonials_updated'));

      apiCall(`/api/testimonials/${id}`, { method: 'DELETE' });
      return true;
    }
    return false;
  },

  async resetTestimonials(): Promise<Testimonial[]> {
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    window.dispatchEvent(new Event('origintra_testimonials_updated'));
    apiCall('/api/testimonials/reset', { method: 'POST' });
    return DEFAULT_TESTIMONIALS;
  }
};

// Automatically initiate sync with server database on module load in browser
if (typeof window !== 'undefined') {
  AdminStorage.syncWithDatabase().catch(() => {});
}
