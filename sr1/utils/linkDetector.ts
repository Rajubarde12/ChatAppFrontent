export interface LinkInfo {
  text: string;
  url: string;
  type: 'url' | 'email' | 'image' | 'phone';
  startIndex: number;
  endIndex: number;
}

export interface TextSegment {
  text: string;
  isLink: boolean;
  isCodeBlock: boolean;
  linkInfo?: LinkInfo;
  codeInfo?: {
    code: string;
    language: string;
  };
}

// URL regex patterns
const URL_REGEX = /(https?:\/\/[^\s]+)/gi;
const EMAIL_REGEX = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi;
const PHONE_REGEX = /(\+?[\d\s\-\(\)]{10,})/gi;
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|bmp|webp|svg|ico|tiff|tif)(\?.*)?$/i;

// Code block patterns
const CODE_BLOCK_REGEX = /```(\w+)?\n([\s\S]*?)```/g;
const INLINE_CODE_REGEX = /`([^`\n]+)`/g;

// Common image hosting services
const IMAGE_HOSTING_SERVICES = [
  'imgur.com',
  'i.imgur.com',
  'unsplash.com',
  'images.unsplash.com',
  'pixabay.com',
  'pexels.com',
  'flickr.com',
  'photobucket.com',
  'tinypic.com',
  'postimg.cc',
  'imgbb.com',
  'gyazo.com',
  'prnt.sc',
  'prntscr.com',
];

const isImageHostingService = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    return IMAGE_HOSTING_SERVICES.some(service => hostname.includes(service));
  } catch {
    return false;
  }
};

export const detectLinks = (text: string): TextSegment[] => {
  const segments: TextSegment[] = [];
  const links: LinkInfo[] = [];
  const codeBlocks: Array<{ startIndex: number; endIndex: number; code: string; language: string }> = [];
  
  console.log('Detecting links and code in text:', text);
  
  // Find all code blocks first
  let match;
  while ((match = CODE_BLOCK_REGEX.exec(text)) !== null) {
    const language = match[1] || 'text';
    const code = match[2].trim();
    
    console.log('Found code block:', language, code.substring(0, 50) + '...');
    
    codeBlocks.push({
      startIndex: match.index,
      endIndex: match.index + match[0].length,
      code,
      language,
    });
  }
  
  // Find all URLs
  while ((match = URL_REGEX.exec(text)) !== null) {
    const url = match[1];
    const isImage = IMAGE_EXTENSIONS.test(url) || isImageHostingService(url);
    
    console.log('Found URL:', url, 'isImage:', isImage);
    
    links.push({
      text: url,
      url: url,
      type: isImage ? 'image' : 'url',
      startIndex: match.index,
      endIndex: match.index + url.length,
    });
  }
  
  // Find all emails
  while ((match = EMAIL_REGEX.exec(text)) !== null) {
    const email = match[1];
    links.push({
      text: email,
      url: `mailto:${email}`,
      type: 'email',
      startIndex: match.index,
      endIndex: match.index + email.length,
    });
  }
  
  // Find all phone numbers
  while ((match = PHONE_REGEX.exec(text)) !== null) {
    const phone = match[1];
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length >= 10) {
      links.push({
        text: phone,
        url: `tel:${cleanPhone}`,
        type: 'phone',
        startIndex: match.index,
        endIndex: match.index + phone.length,
      });
    }
  }
  
  // Combine and sort all elements by start index
  const allElements = [
    ...links.map(link => ({ ...link, type: 'link' as const })),
    ...codeBlocks.map(block => ({ ...block, type: 'code' as const })),
  ].sort((a, b) => a.startIndex - b.startIndex);
  
  // Create text segments
  let lastIndex = 0;
  
  for (const element of allElements) {
    // Add text before the element
    if (element.startIndex > lastIndex) {
      const beforeText = text.substring(lastIndex, element.startIndex);
      if (beforeText) {
        segments.push({
          text: beforeText,
          isLink: false,
          isCodeBlock: false,
        });
      }
    }
    
    // Add the element
    if (element.type === 'link') {
      segments.push({
        text: element.text,
        isLink: true,
        isCodeBlock: false,
        linkInfo: element,
      });
    } else if (element.type === 'code') {
      segments.push({
        text: '', // Empty text since we'll render CodeBlock component
        isLink: false,
        isCodeBlock: true,
        codeInfo: {
          code: element.code,
          language: element.language,
        },
      });
    }
    
    lastIndex = element.endIndex;
  }
  
  // Add remaining text after the last element
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    if (remainingText) {
      segments.push({
        text: remainingText,
        isLink: false,
        isCodeBlock: false,
      });
    }
  }
  
  console.log('Final segments:', segments);
  return segments;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getLinkDisplayText = (linkInfo: LinkInfo): string => {
  switch (linkInfo.type) {
    case 'email':
      return linkInfo.text;
    case 'phone':
      return linkInfo.text;
    case 'image':
      return '🖼️ View Image';
    case 'url':
      // Truncate long URLs for display
      if (linkInfo.text.length > 50) {
        return linkInfo.text.substring(0, 47) + '...';
      }
      return linkInfo.text;
    default:
      return linkInfo.text;
  }
};
