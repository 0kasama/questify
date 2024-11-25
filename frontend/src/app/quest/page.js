import QuestList from "@/components/QuestList";
import Navbar from "@/components/Navbar";
import AddQuest from "@/components/AddQuest";

export default function QuestPage() {
  return (
    <div>
      <Navbar />
      <AddQuest />
      <QuestList />
    </div>
  );
}
