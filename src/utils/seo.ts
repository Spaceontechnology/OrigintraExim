import { Product, BlogPost } from '../types';

export interface SeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, any>;
}

const BASE_URL = 'https://www.origintra.com';
const DEFAULT_IMAGE = `${BASE_URL}/assets/logo/logo-full-color.png`;

export function updatePageSeo(config: SeoConfig) {
  if (typeof document === 'undefined') return;

  // 1. Title
  document.title = config.title;

  // 2. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', config.description);

  // 3. Meta Title tag
  let metaTitle = document.querySelector('meta[name="title"]');
  if (!metaTitle) {
    metaTitle = document.createElement('meta');
    metaTitle.setAttribute('name', 'title');
    document.head.appendChild(metaTitle);
  }
  metaTitle.setAttribute('content', config.title);

  // 4. Robots
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', config.noIndex ? 'noindex, nofollow' : 'index, follow');

  // 5. Canonical Link
  const fullCanonicalUrl = `${BASE_URL}${config.canonicalPath.startsWith('/') ? config.canonicalPath : `/${config.canonicalPath}`}`;
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullCanonicalUrl);

  // 6. Open Graph
  const ogTags: Record<string, string> = {
    'og:title': config.title,
    'og:description': config.description,
    'og:url': fullCanonicalUrl,
    'og:type': config.ogType || 'website',
    'og:image': config.ogImage ? (config.ogImage.startsWith('http') ? config.ogImage : `${BASE_URL}${config.ogImage}`) : DEFAULT_IMAGE,
    'twitter:title': config.title,
    'twitter:description': config.description,
    'twitter:url': fullCanonicalUrl,
    'twitter:image': config.ogImage ? (config.ogImage.startsWith('http') ? config.ogImage : `${BASE_URL}${config.ogImage}`) : DEFAULT_IMAGE,
    'twitter:card': 'summary_large_image',
  };

  for (const [property, content] of Object.entries(ogTags)) {
    const selector = property.startsWith('og:') ? `meta[property="${property}"]` : `meta[name="${property}"]`;
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      if (property.startsWith('og:')) {
        el.setAttribute('property', property);
      } else {
        el.setAttribute('name', property);
      }
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  // 7. Schema.org JSON-LD
  let scriptLd = document.getElementById('dynamic-seo-ld') as HTMLScriptElement | null;
  if (config.jsonLd) {
    if (!scriptLd) {
      scriptLd = document.createElement('script');
      scriptLd.id = 'dynamic-seo-ld';
      scriptLd.type = 'application/ld+json';
      document.head.appendChild(scriptLd);
    }
    scriptLd.textContent = JSON.stringify(config.jsonLd);
  } else if (scriptLd) {
    scriptLd.remove();
  }
}

export function getProductSeo(product: Product): SeoConfig {
  const title = `${product.name} Exporter India - Specifications & Wholesale Supply | Origintra Exim`;
  const description = `${product.tagline || product.shortDescription || `Export grade ${product.name} from India`}. High purity, certified moisture specifications, seaworthy export packaging, and lab test reports for international importers.`;
  const canonicalPath = `/products/${product.slug}`;

  return {
    title,
    description,
    canonicalPath,
    ogType: 'product',
    ogImage: product.image,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.name,
      'image': product.image.startsWith('http') ? product.image : `${BASE_URL}${product.image}`,
      'description': product.shortDescription || product.tagline,
      'category': product.category,
      'brand': {
        '@type': 'Brand',
        'name': 'Origintra Exim'
      },
      'countryOfOrigin': {
        '@type': 'Country',
        'name': 'India'
      },
      'offers': {
        '@type': 'Offer',
        'priceCurrency': 'USD',
        'price': 'Upon Request',
        'availability': 'https://schema.org/InStock',
        'url': `${BASE_URL}${canonicalPath}`,
        'seller': {
          '@type': 'Organization',
          'name': 'Origintra Exim'
        }
      }
    }
  };
}

export function getBlogPostSeo(post: BlogPost): SeoConfig {
  const title = `${post.title} | Origintra Exim Blog`;
  const description = post.excerpt || post.metaDescription || `Read export intelligence and trade insights on ${post.title} from Origintra Exim.`;
  const canonicalPath = `/blog/${post.slug}`;

  return {
    title,
    description,
    canonicalPath,
    ogType: 'article',
    ogImage: post.image,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.title,
      'image': post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`,
      'description': description,
      'datePublished': post.rawDate || post.date,
      'author': {
        '@type': 'Person',
        'name': post.author || 'Origintra Commercial Research Desk'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Origintra Exim',
        'logo': {
          '@type': 'ImageObject',
          'url': `${BASE_URL}/assets/logo/logo-full-color.png`
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': `${BASE_URL}${canonicalPath}`
      }
    }
  };
}
