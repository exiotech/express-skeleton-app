import EventLog from 'model/EventLog';

export function createLog(data) {
  const log = new EventLog(data);
  return log.save();
}
