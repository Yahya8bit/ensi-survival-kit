import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import PdfViewer from "@site/src/components/PdfViewer";
import DijkstraVisualizer from "@site/src/components/DijkstraVisualizer";
import KruskalVisualizer from "@site/src/components/KruskalVisualizer";
import PrimVisualizer from "@site/src/components/PrimVisualizer";
import MPMVisualizer from "@site/src/components/MPMVisualizer";
import BellmanVisualizer from "@site/src/components/BellmanVisualizer";
import FloydWarshallVisualizer from "@site/src/components/FloydWarshallVisualizer";
import DiskCalculator from "@site/src/components/DiskCalculator";
import AutomatonSimulator from "@site/src/components/AutomatonSimulator";
import LogicGateSimulator from "@site/src/components/LogicGateSimulator";

export default {
  ...MDXComponents,
  PdfViewer,
  DijkstraVisualizer,
  KruskalVisualizer,
  PrimVisualizer,
  MPMVisualizer,
  BellmanVisualizer,
  FloydWarshallVisualizer,
  DiskCalculator,
  AutomatonSimulator,
  LogicGateSimulator,
};
