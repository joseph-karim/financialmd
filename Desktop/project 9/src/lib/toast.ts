/**
 * Simple toast notification system
 * This is a lightweight implementation that can be replaced with react-hot-toast
 * or any other toast library as needed
 */

interface ToastOptions {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

/**
 * Show a toast notification
 */
export function toast(options: ToastOptions) {
  const { title, description, type = 'success', duration = 3000 } = options;
  
  // Log to console for now
  console.log(`[Toast] ${type.toUpperCase()}: ${title}${description ? ` - ${description}` : ''}`);
  
  // Create a simple toast element
  const toastElement = document.createElement('div');
  toastElement.className = `toast toast-${type}`;
  toastElement.style.position = 'fixed';
  toastElement.style.bottom = '20px';
  toastElement.style.right = '20px';
  toastElement.style.padding = '12px 16px';
  toastElement.style.borderRadius = '4px';
  toastElement.style.backgroundColor = type === 'success' ? '#10B981' : '#EF4444';
  toastElement.style.color = 'white';
  toastElement.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  toastElement.style.zIndex = '9999';
  toastElement.style.maxWidth = '300px';
  
  const titleElement = document.createElement('div');
  titleElement.style.fontWeight = 'bold';
  titleElement.style.marginBottom = description ? '4px' : '0';
  titleElement.textContent = title;
  toastElement.appendChild(titleElement);
  
  if (description) {
    const descElement = document.createElement('div');
    descElement.style.fontSize = '0.875rem';
    descElement.textContent = description;
    toastElement.appendChild(descElement);
  }
  
  document.body.appendChild(toastElement);
  
  // Remove after duration
  setTimeout(() => {
    if (document.body.contains(toastElement)) {
      toastElement.style.opacity = '0';
      toastElement.style.transition = 'opacity 0.3s ease-out';
      
      setTimeout(() => {
        if (document.body.contains(toastElement)) {
          document.body.removeChild(toastElement);
        }
      }, 300);
    }
  }, duration);
}
