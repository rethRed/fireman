
export abstract class BaseValueObject<TProps> {
    private props: TProps

    constructor(props: TProps) {
        this.props = props
    }

    public equals(vo?: BaseValueObject<TProps>): boolean {
        if (vo === null || vo === undefined) {
            return false
        }
        if (vo.props === undefined) {
            return false
        }
        return JSON.stringify(this.props) === JSON.stringify(vo.props)
    }

    public getProps(): TProps {
        return this.props
    }

    
}
