export function generateRandomString(lettrCount: number, digitCount: number): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
  
    const randomLetters = Array.from({ length: lettrCount }, () => letters[Math.floor(Math.random() * letters.length)]);
    const randomDigits = Array.from({ length: digitCount }, () => digits[Math.floor(Math.random() * digits.length)]);
  
    return randomLetters.concat(randomDigits).join('');
  }