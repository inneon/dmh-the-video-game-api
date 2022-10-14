import DomainEvent from "./domainEvent"

type Unsubscribe = () => void

export type Subscription<T extends DomainEvent> = (event: T) => void

interface Subscribable<T extends DomainEvent> {
  subscribe: (handler: Subscription<T>) => Unsubscribe
}

export default Subscribable
