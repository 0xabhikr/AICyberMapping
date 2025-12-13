"use client";

import React, { useEffect, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";

type BackendGraph = {
  elements: any[];
  summary: {
    total_nodes: number;
    total_edges: number;
    kingpins: string[];
  };
};

export default function CyberGraphsPage() {
  const [graph, setGraph] = useState<BackendGraph | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/ai-cyber-graph")
      .then((res) => {
        if (!res.ok) throw new Error("Backend error");
        return res.json();
      })
      .then(setGraph)
      .catch(() => setError("Failed to load cyber graph"));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!graph) return <p>Loading cyber graph...</p>;

  const stylesheet: any = [
    {
      selector: ".kingpin",
      style: {
        "background-color": "#dc2626",
        width: 40,
        height: 40,
        label: "data(label)",
        color: "#ffffff",
        "text-outline-color": "#dc2626",
        "text-outline-width": 2,
      },
    },
    {
      selector: ".normal",
      style: {
        "background-color": "#2563eb",
        width: 30,
        height: 30,
        label: "data(label)",
        color: "#ffffff",
        "text-outline-color": "#2563eb",
        "text-outline-width": 2,
      },
    },
    {
      selector: "edge",
      style: {
        width: 2,
        "line-color": "#9ca3af",
      },
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-3">AI Cyber Network</h1>

      <CytoscapeComponent
        elements={graph.elements}
        layout={{ name: "cose" }}
        stylesheet={stylesheet}
        style={{ width: "100%", height: "500px" }}
      />

      <div className="mt-4 text-sm">
        <p>Total Nodes: {graph.summary.total_nodes}</p>
        <p>Total Edges: {graph.summary.total_edges}</p>
        <p>Kingpins: {graph.summary.kingpins.join(", ")}</p>
      </div>
    </div>
  );
}
