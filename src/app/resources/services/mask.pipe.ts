// mask.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskMiddle',
  standalone: true
})
export class MaskMiddlePipe implements PipeTransform {
  transform(value: string, visibleChars: number = 2): string {
    if (!value) return '';

    // Handle email addresses
    const atIndex = value.indexOf('@');
    if (atIndex > -1) {
      const username = value.substring(0, atIndex);
      const domain = value.substring(atIndex);
      return `${this.maskPart(username, visibleChars)}${domain}`;
    }

    // Handle regular usernames
    return this.maskPart(value, visibleChars);
  }

  private maskPart(str: string, visibleChars: number): string {
    if (str.length <= visibleChars * 2) {
      return str.charAt(0) + '*'.repeat(Math.max(0, str.length - 1));
    }
    return `${str.substring(0, visibleChars)}***${
      str.substring(str.length - visibleChars)
    }`;
  }
}
