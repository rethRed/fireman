import { AbortTransactionDecorator } from "./abort-transaction.decorator";
import { OptimisticLockDecorator } from "./optimistic-lock.decorator";
import { AbortTransactionError } from "../application/errors";
import { TypeORM } from "@common/providers/typeorm";


function transactionWithOptimistLockingAndAbortTransactionIfError(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        return await AbortTransactionDecorator.handle( async() => {
            return await OptimisticLockDecorator.handle( async() => {
                return await  TypeORM.em.transaction("READ COMMITTED", async (em) => {
                    const result = await originalMethod.apply(this, [...args, em])
                    if(typeof result?.isFailure === "function"){
                        if(result?.isFailure()) throw new AbortTransactionError(result)
                    }
                    return result
                })
            })
        })
    };
    return descriptor;
}

function transactionWithOptimistLocking(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        return await OptimisticLockDecorator.handle( async() => {
            return await TypeORM.em.transaction("READ COMMITTED", async (em) => {
                const result = await originalMethod.apply(this, [...args, em])
                return result
            })
        })
    };
    return descriptor;
}

function optimisticLockDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        return await OptimisticLockDecorator.handle( async() => {
            const result = await originalMethod.apply(this, [...args, TypeORM.em])
            return result
        })
    };
    return descriptor;
}

function consultOperations(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        const result = await originalMethod.apply(this, [ ...args, TypeORM.em ])
        return result
    };

    return descriptor;
}

type TransactionOptions = {
    abortTransactionWhenError?: boolean
}

function transactionOptions(options?: TransactionOptions) {
    if(options?.abortTransactionWhenError === false) return transactionWithOptimistLocking
    return transactionWithOptimistLockingAndAbortTransactionIfError
}

function consultOptions() {
    return consultOperations

}

function optimisticLockDecoratorOptions() {
    return optimisticLockDecorator
}

export const TypeORMDecorator = {
    transaction: transactionOptions,
    consult: consultOptions,
    optimisticLock: optimisticLockDecoratorOptions
}