import React, { useEffect, useState } from "react";
import "./App.css";
import ReminderList from "./components/ReminderList";
import Reminder from "./models/reminder";
import reminderService from "./services/reminder";
import NewReminder from "./components/NewReminder";

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const reminders = await reminderService.getReminders();
    setReminders(reminders);
  };

  const removeReminder = async (id: number) => {
    await reminderService.removeReminder(id);
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const addReminder = async (title: string) => {
    const newReminder: Reminder = await reminderService.addReminder(title);
    setReminders([newReminder, ...reminders]);
  }

  return (
 <div className="App">
  <NewReminder onAddReminder={addReminder} />
  <ReminderList items = {reminders} onRemoveReminder={removeReminder} />
 </div>
  );
}

export default App;
