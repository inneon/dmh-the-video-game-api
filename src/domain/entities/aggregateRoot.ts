import { DomainEvent } from "../events"

abstract class AggregateRoot<T> {
  protected _id: T

  public get id() {
    return this._id
  }

  public constructor(id: T) {
    this._id = id
  }

  private _events: DomainEvent[] = []
  public get events(): readonly DomainEvent[] {
    return this._events
  }

  protected AddEvent(event: DomainEvent) {
    this.IncrementVersion()
    this._events.push(event)
  }

  public ClearEvents = () => {
    this._events = []
  }

  protected version: number = 0
  private _versionIncremented: boolean = false

  protected IncrementVersion() {
    if (this._versionIncremented) {
      return
    }

    this.version++
    this._versionIncremented = true
  }
}

export default AggregateRoot
