import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Task = {
  id: number;
  title: string;
  status: "todo" | "done";
  category: "Mobile" | "RPL" | "IoT";
};

const tasks: Task[] = [
  { id: 1, title: "Belajar React Native", status: "todo", category: "Mobile" },
  { id: 2, title: "Buat modul RPL", status: "done", category: "RPL" },
  { id: 3, title: "Rancang sensor IoT", status: "todo", category: "IoT" },
];

type FilterType = "all" | "todo" | "done";

const Index = () => {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <View style={styles.container}>
      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {["all", "todo", "done"].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f as FilterType)}
            style={[
              styles.button,
              filter === f && styles.buttonActive,
            ]}
          >
            <Text style={filter === f ? styles.textActive : styles.text}>
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Task List */}
      {filteredTasks.map((task) => (
        <View key={task.id} style={styles.taskItem}>
          <Text>{task.title}</Text>
          <View
            style={[
              styles.badge,
              task.category === "Mobile"
                ? styles.mobile
                : task.category === "RPL"
                ? styles.rpl
                : styles.iot,
            ]}
          >
            <Text style={styles.badgeText}>{task.category}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { padding: 16 },
  filterRow: { flexDirection: "row", marginBottom: 16, gap: 8 },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  buttonActive: { backgroundColor: "#3b82f6" },
  text: { color: "#000" },
  textActive: { color: "#fff" },
  taskItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { color: "#fff", fontSize: 12 },
  mobile: { backgroundColor: "green" },
  rpl: { backgroundColor: "purple" },
  iot: { backgroundColor: "orange" },
});
