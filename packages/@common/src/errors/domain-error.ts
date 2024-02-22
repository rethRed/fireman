
export abstract class DomainError extends Error {
    
    aditionalInfo?: any

    constructor(message?: string, aditionalInfo?: any) {
        super(message ?? "");
        this.name = this.constructor.name;
        this.aditionalInfo = aditionalInfo
    }
}

