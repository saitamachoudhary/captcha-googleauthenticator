const base64UrlDecode = (str) => {
    try {
      const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Failed to decode JWT:', e);
      return null;
    }
  };
  
  const decodeJWT = (token) => {
    const payload = token.split('.')[1];
    return base64UrlDecode(payload);
  };
  
  export { decodeJWT };
  