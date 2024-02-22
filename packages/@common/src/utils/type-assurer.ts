
export class TypeAssurer {
    static assureString(value: any, defaultValue?: string): string {
      return typeof value === 'string' ? value : defaultValue || '';
    }
  
    static assureNumber(value: any, defaultValue?: number): number {
      return typeof value === 'number' ? value : defaultValue || 0;
    }
  
    static assureEnumStringValue<T>(value: T, defaultValue?: any): T {
      return this.assureString(value, defaultValue) as T
    }
  
    static assureBoolean(value: any, defaultValue?: boolean): boolean {
      return typeof value === 'boolean' ? value : defaultValue || false;
    }
  
    static assureArray(value: any, defaultValue?: any[]): any[] {
      return Array.isArray(value) ? value : defaultValue || [];
    }
  
    static assureStringArray(value: any, defaultValue?: string[]): string[] {
      return Array.isArray(value) ? value.every(data => typeof data === "string") ? value : defaultValue || [] : defaultValue || [];
    }
  
    static assureObject(value: any, defaultValue?: any): any {
      return typeof value === 'object' ? value : defaultValue || {};
    }
  
    static assureStringOrUndefined(value: any): string | undefined {
      return value === undefined || value === null
        ? undefined : typeof value === "string" ? value : ""
    }
  
    static assureNumberOrUndefined(value: any): number | undefined {
      return value === undefined || value === null
        ? undefined : typeof value === "number" ? value : 0
    }
  
    static assureBooleanOrUndefined(value: any): boolean | undefined {
      return value === undefined || value === null
        ? undefined : typeof value === "boolean" ? value : false
    }
  
    static assureArrayOrUndefined(value: any): any[] | undefined {
      return value === undefined || value === null
        ? undefined : Array.isArray(value) ? value : []
    }
  
    static assureDateOrUndefined(value: any): Date | undefined {
      return value === undefined || value === null
        ? undefined : value instanceof Date ? value : new Date(value)
    }
  }