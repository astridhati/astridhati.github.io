export function mailtoLink(email: string): string {
  return `mailto:${email}`;
}

export function gmailComposeLink(email: string): string {
  return `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}`;
}
